import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI client lazily with telemetry headers
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

// System prompt grounding the AI with Texas Taste restaurant knowledge
const TEXAS_TASTE_SYSTEM_INSTRUCTION = `You are Aura, the dedicated AI concierge and sommelier for Texas Taste Restaurant — Austin's premier 100% organic vegetarian fine dining restaurant and lounge located at 401 E 6th St, Austin, TX 78701.

Your role:
- Answer questions about the menu
- Recommend dishes with exact pricing and pairings
- Help with table reservations and dining information
- Explain ingredients, preparations, and culinary techniques
- Suggest vegetarian, vegan, gluten-free, and Jain/Swaminarayan options
- Answer naturally, warmly, and knowledgeably like an experienced fine dining restaurant staff member

Strict Concierge Directives:
1. Always answer the user's question directly and concisely.
2. Never repeat, echo, or mirror the user's question (do NOT start with "You asked for...", "Regarding your question...", or restating their query).
3. Recommend specific dishes from the menu catalog below with prices and thoughtful pairings.
4. Keep the tone warm, welcoming, elegant, and professional.

Key Restaurant Details:
- Concept: 100% Pure Organic Vegetarian Fine Dining with farm-to-table culinary craftsmanship, smoking cast-iron sizzlers, fresh hand-rolled pastas, wood-fired sourdough pizzas, artisanal plant burgers, royal tandoori Indian specialties, handcrafted mocktails, and decadent desserts.
- Location: 401 E 6th St, Austin, TX 78701, United States.
- Direct Contact: Phone: +1 (512) 555-8278 | Email: reservations@texastaste.com.
- Dining Hours:
  * Monday - Thursday: 11:30 AM - 10:00 PM
  * Friday - Saturday: 11:00 AM - 11:30 PM
  * Sunday: 10:30 AM - 9:30 PM (featuring Sunday Artisan Brunch)

Signature Menu Highlights:
- Starters:
  * Herbed Cream Cheese Stuffed Mushrooms ($13.99) — baked cremini mushrooms with garlic herb crumb.
  * Mediterranean Falafel & Hummus Platter ($15.50) — crispy herb falafel, roasted garlic hummus, warm pita (Vegan).
  * Truffled Avocado Sourdough Toast ($13.50) — organic avocado, microgreens, black truffle drizzle.
  * Wood-Fired Cheesy Garlic Bread ($11.50) — artisanal sourdough, roasted garlic herb butter, bubbling mozzarella.
- Wood-Fired Sourdough Pizzas:
  * Artisanal Margherita ($18.99) — San Marzano tomato sauce, fresh buffalo mozzarella, organic basil.
  * Truffle Wild Mushroom & Fontina ($22.99) — wild forest mushrooms, fontina cheese, white truffle essence.
  * Spicy Basil Pesto & Goat Cheese ($21.00) — house nut-free pesto, sun-dried tomatoes, creamy goat cheese.
- Fresh Hand-Crafted Pastas:
  * Black Truffle & Wild Mushroom Fettuccine ($22.50) — handmade fettuccine in rich truffle butter reduction.
  * Organic Spinach & Ricotta Ravioli ($20.99) — sage brown butter sauce with roasted pine nuts.
  * Fire-Roasted Vegetable Lasagna ($19.99) — layered organic vegetables, béchamel, house marinara.
- Sizzlers & Main Courses:
  * Signature Paneer Steak Sizzler ($23.99) — herb-marinated cottage cheese on smoking cast-iron with peppercorn gravy and charred seasonal vegetables.
  * The Outlaw Flame-Grilled Cauliflower Steak ($19.99) — chimichurri spiced cauliflower over cilantro-lime quinoa (Vegan, GF).
  * Fragrant Thai Green Curry Bowl ($19.50) — organic coconut milk, lemongrass, jasmine rice (Vegan, GF).
- Artisanal Burgers:
  * The Maverick Black Bean & Quinoa Burger ($16.99) — house-crafted patty, avocado, chipotle aioli, brioche.
  * Flame-Grilled Paneer Tikka Burger ($17.50) — tandoori spiced paneer, mint coriander glaze, crisp pickled onions.
- Indian Heritage Fusion:
  * Tandoori Paneer Tikka Platter ($18.50) — clay-oven charred cottage cheese with bell peppers.
  * Royal Paneer Butter Masala ($19.99) — velvety cashew tomato sauce with fenugreek.
  * Dal Makhani with Garlic Naan ($17.50) — slow-simmered black lentils in artisanal butter.
  * Hyderabadi Vegetable Dum Biryani ($18.99) — saffron basmati rice, layered spiced organic vegetables (GF).
- Handcrafted Mocktails & Beverages:
  * Smoked Jalapeño & Lime Mocktail ($8.50) — charred jalapeño, fresh lime juice, agave, smoked sea salt.
  * Texas Blueberry Lavender Lemonade ($5.99) — Hill Country blueberries with organic lavender infusion.
  * Cold-Pressed Green Detox Juice ($6.99) — cucumber, green apple, ginger, kale, lemon.
  * Wild Berry Smoothie ($7.50) — blended antioxidant organic berries, almond milk.
  * Texas Peach Cold Brew Iced Tea ($4.99) — steeped black tea with fresh peach nectar.
- Decadent Desserts:
  * Sizzling Chocolate Lava Cake ($10.99) — molten Belgian dark chocolate center with Madagascar vanilla gelato.
  * Warm Southern Peach Cobbler ($8.99) — Texas peaches spiced with cinnamon and oat crumble.
  * Traditional Espresso Tiramisu ($9.50) — mascarpone cream, savoiardi soaked in organic espresso.
  * New York Style Berry Cheesecake ($9.99) — creamy cheesecake with seasonal berry coulis.

Dietary Accreditations:
- 100% Vegetarian (strictly zero meat, poultry, or seafood).
- Extensive Vegan (VG), Gluten-Free (GF), Nut-Free, and High-Protein options.
- Complete Jain & Swaminarayan menu prepared without onion, garlic, or root vegetables upon request.

Reservations:
- Tables can be reserved online via the Reservations tab or by calling our concierge directly at +1 (512) 555-8278.`;

// API Health Check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString()
  });
});

// AI Assistant Chat Route
app.post("/api/chat", async (req: Request, res: Response) => {
  const { message, conversationHistory = [] } = req.body;

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return res.status(400).json({ error: "A valid non-empty message is required." });
  }

  const cleanMessage = message.trim();
  const ai = getGenAI();

  if (!ai) {
    console.warn("[Aura Concierge] GEMINI_API_KEY is not configured in process.env.");
    return res.status(503).json({
      error: "The AI Concierge service is currently initializing or awaiting API credentials. Please ensure GEMINI_API_KEY is set in your environment.",
    });
  }

  // Build clean, well-formed conversation contents
  const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

  if (Array.isArray(conversationHistory)) {
    for (const msg of conversationHistory.slice(-6)) {
      if (msg && typeof msg === 'object' && msg.content && typeof msg.content === 'string') {
        const textContent = msg.content.trim();
        if (textContent.length > 0) {
          const role: 'user' | 'model' = (msg.role === 'assistant' || msg.role === 'model') ? 'model' : 'user';
          
          // Avoid consecutive identical roles in contents to ensure compliant turn structure
          const lastTurn = contents[contents.length - 1];
          if (lastTurn && lastTurn.role === role) {
            lastTurn.parts[0].text += `\n${textContent}`;
          } else {
            contents.push({
              role,
              parts: [{ text: textContent }],
            });
          }
        }
      }
    }
  }

  // Ensure current user message is appended cleanly
  const lastTurn = contents[contents.length - 1];
  if (lastTurn && lastTurn.role === 'user') {
    lastTurn.parts[0].text += `\n${cleanMessage}`;
  } else {
    contents.push({
      role: 'user',
      parts: [{ text: cleanMessage }],
    });
  }

  // Model cascade for high availability: Try primary 3.7-flash, then fallback to fast 3.1-flash-lite
  const modelsToTry = ['gemini-3.7-flash', 'gemini-3.1-flash-lite'];
  let lastError: any = null;

  for (const modelName of modelsToTry) {
    try {
      console.log(`[Aura Concierge] Calling model: ${modelName} with ${contents.length} turn(s)...`);
      
      const response = await ai.models.generateContent({
        model: modelName,
        contents,
        config: {
          systemInstruction: TEXAS_TASTE_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const replyText = response.text ? response.text.trim() : null;

      if (replyText && replyText.length > 0) {
        console.log(`[Aura Concierge] Successfully generated response via ${modelName} (${replyText.length} chars)`);
        return res.json({
          reply: replyText,
          model: modelName,
        });
      }
    } catch (err: any) {
      console.warn(`[Aura Concierge] Model ${modelName} encountered an error:`, {
        status: err?.status,
        message: err?.message,
        code: err?.code,
      });
      lastError = err;
    }
  }

  // If all models failed in the cascade, log and return descriptive JSON error
  console.error("[Aura Concierge] All Gemini models in cascade failed:", lastError);
  return res.status(502).json({
    error: "The AI concierge is currently experiencing upstream network congestion. Please try your question again in a moment.",
    details: lastError?.message || "Upstream Gemini model unavailable",
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Texas Taste Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
