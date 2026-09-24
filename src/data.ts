import { MenuItem, Review, GalleryItem } from './types';
import paneerSizzlerImg from './assets/images/paneer_sizzler_gourmet_1787389990165.jpg';
import trufflePastaImg from './assets/images/truffle_fettuccine_pasta_1787390008678.jpg';
import margheritaPizzaImg from './assets/images/artisan_margherita_pizza_1787390025674.jpg';
import moltenLavaImg from './assets/images/molten_lava_cake_1787390041813.jpg';
import cauliflowerSteakImg from './assets/images/grilled_cauliflower_steak_1784219998659.jpg';
import gourmetBurgerImg from './assets/images/texas_burger_1784218442622.jpg';
import garlicBreadImg from './assets/images/garlic_bread_food_1787390429116.jpg';
import stuffedMushroomsImg from './assets/images/stuffed_mushrooms_food_1787390448202.jpg';
import loadedNachosImg from './assets/images/loaded_nachos_food_1787390467201.jpg';
import berryCheesecakeImg from './assets/images/berry_cheesecake_food_1787390484121.jpg';
import vegSeekhKebabImg from './assets/images/veg_seekh_kebab_1787394430766.jpg';

export const formatINR = (amount: number): string => {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
};

export const MENU_ITEMS: MenuItem[] = [
  // Starters & Appetizers
  {
    id: 'starter-stuffed-mushrooms',
    name: 'Herbed Cream Cheese Stuffed Mushrooms',
    description: 'Plump organic button mushroom caps stuffed with a garlic-herb cream cheese filling, topped with buttered panko crumbs and baked golden.',
    price: 399,
    category: 'starters',
    image: stuffedMushroomsImg,
    tags: ["Chef's Special", 'Vegetarian'],
    isFeatured: true,
    calories: 320
  },
  {
    id: 'starter-falafel-hummus',
    name: 'Mediterranean Falafel & Hummus Platter',
    description: 'House-made crispy golden chickpea falafels served over smooth velvet hummus, garnished with extra virgin olive oil, sumac, olives, and warm pita pockets.',
    price: 449,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=1200&q=85',
    tags: ['Vegan', 'Healthy Choice'],
    isFeatured: false,
    calories: 420
  },
  {
    id: 'starter-stuffed-peppers',
    name: 'Smoked Gouda & Quinoa Stuffed Peppers',
    description: 'Sweet bell peppers stuffed with seasoned organic quinoa, roasted sweet corn, black beans, and melted smoked gouda cheese.',
    price: 429,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1200&q=85',
    tags: ['Gluten-Free', 'High-Protein'],
    isFeatured: false,
    calories: 380
  },
  {
    id: 'starter-cheese-garlic-bread',
    name: 'Wood-Fired Cheese Garlic Bread',
    description: 'Artisanal sourdough rustic loaf brushed with roasted garlic herb butter, loaded with melted mozzarella and fresh parsley, baked in our wood oven.',
    price: 329,
    category: 'starters',
    image: garlicBreadImg,
    tags: ['Must Try', 'Comfort Food'],
    isFeatured: false,
    calories: 490
  },
  {
    id: 'starter-loaded-nachos',
    name: 'Fiesta Loaded Corn Nachos',
    description: 'Crispy stone-ground corn tortilla chips smothered in warm house queso, black beans, pico de gallo, fresh jalapeños, guacamole, and cilantro cream.',
    price: 399,
    category: 'starters',
    image: loadedNachosImg,
    tags: ['Spicy', 'Vegetarian'],
    isFeatured: false,
    calories: 680
  },
  {
    id: 'starter-avocado-toast',
    name: 'Truffled Avocado Sourdough Toast',
    description: 'Toasted organic sourdough topped with whipped avocado smash, heirloom cherry tomatoes, crumbled feta, microgreens, and white truffle oil drizzle.',
    price: 389,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=1200&q=85',
    tags: ['Vegan Option', 'Healthy Choice'],
    isFeatured: false,
    calories: 360
  },

  // Wood-Fired Pizzas
  {
    id: 'pizza-margherita',
    name: 'Artisanal Margherita Pizza',
    description: 'Classic wood-fired hand-tossed crust with slow-simmered San Marzano tomato sauce, fresh buffalo mozzarella, fragrant basil leaves, and olive oil.',
    price: 549,
    category: 'pizzas',
    image: margheritaPizzaImg,
    tags: ['Must Try', 'Vegetarian'],
    isFeatured: true,
    calories: 780
  },
  {
    id: 'pizza-farmhouse',
    name: 'Garden Farmhouse Pizza',
    description: 'Wood-fired sourdough base topped with rich marinara, charred bell peppers, baby spinach, roasted garlic, black olives, wild mushrooms, and feta.',
    price: 599,
    category: 'pizzas',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=85',
    tags: ['Organic', 'Vegetarian'],
    isFeatured: false,
    calories: 820
  },
  {
    id: 'pizza-truffle-shroom',
    name: 'Truffle Wild Mushroom Pizza',
    description: 'Creamy garlic white sauce base, sautéed shiitake and cremini mushrooms, fontina cheese, fresh arugula, and a luxurious black truffle drizzle.',
    price: 649,
    category: 'pizzas',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85',
    tags: ["Chef's Special", 'Gourmet'],
    isFeatured: true,
    calories: 860
  },
  {
    id: 'pizza-pesto-goat',
    name: 'Spicy Basil Pesto & Goat Cheese Pizza',
    description: 'House-made nut-free basil pesto, sun-dried heirloom tomatoes, whipped goat cheese, red onion flakes, and toasted pine nuts on a thin crispy crust.',
    price: 599,
    category: 'pizzas',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=85',
    tags: ['Spicy', 'Vegetarian'],
    isFeatured: false,
    calories: 790
  },

  // Handcrafted Pastas
  {
    id: 'pasta-truffle-fettuccine',
    name: 'Black Truffle & Wild Mushroom Pasta',
    description: 'Handmade eggless fettuccine ribbons tossed in a velvety garlic parmesan cream sauce infused with black truffle paste and sautéed wild mushrooms.',
    price: 649,
    category: 'pastas',
    image: trufflePastaImg,
    tags: ["Chef's Special", 'Gourmet'],
    isFeatured: true,
    calories: 720
  },
  {
    id: 'pasta-spinach-ravioli',
    name: 'Organic Spinach & Ricotta Ravioli',
    description: 'Fresh pillow pasta filled with organic spinach and creamy ricotta, pan-tossed in a golden brown butter sage sauce with toasted pine nuts.',
    price: 599,
    category: 'pastas',
    image: 'https://images.unsplash.com/photo-1587740908075-9e245070dfaa?auto=format&fit=crop&w=1200&q=85',
    tags: ['Vegetarian', 'Handmade'],
    isFeatured: false,
    calories: 650
  },
  {
    id: 'pasta-veg-lasagna',
    name: 'Classic House Vegetable Lasagna',
    description: 'Layers of fresh pasta sheets, slow-cooked roasted zucchini, eggplant, bell peppers, zesty marinara, ricotta, and bubbling golden mozzarella.',
    price: 549,
    category: 'pastas',
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=1200&q=85',
    tags: ['Comfort Food', 'Vegetarian'],
    isFeatured: false,
    calories: 780
  },
  {
    id: 'pasta-tomato-gnocchi',
    name: 'Creamy Roasted Tomato Potato Gnocchi',
    description: 'Light fluffy potato gnocchi tossed in a creamy slow-roasted tomato basil sauce, finished with shaved parmesan and cracked black pepper.',
    price: 499,
    category: 'pastas',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85',
    tags: ['Vegetarian', 'Comfort Food'],
    isFeatured: false,
    calories: 610
  },

  // Gourmet Veg Burgers & Wraps
  {
    id: 'burger-maverick-veg',
    name: 'The Maverick Black Bean & Quinoa Burger',
    description: 'House-crafted roasted black bean, walnut, and quinoa patty, grilled and topped with melted sharp cheddar, crispy fried onions, pickled jalapeños, and smoky barbecue glaze on a brioche bun.',
    price: 449,
    category: 'burgers',
    image: gourmetBurgerImg,
    tags: ['Must Try', 'Spicy', 'Vegetarian'],
    isFeatured: true,
    calories: 780
  },
  {
    id: 'burger-paneer-tikka',
    name: 'Flame-Grilled Paneer Tikka Burger',
    description: 'Thick slab of cottage cheese marinated in aromatic tandoori spices, flame-seared and layered with mint chutney mayo, crisp onion rings, and tomatoes.',
    price: 479,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85',
    tags: ['Spicy', 'High-Protein'],
    isFeatured: false,
    calories: 740
  },
  {
    id: 'burger-beetroot-walnut',
    name: 'Smoked Beetroot & Walnut Burger',
    description: 'Savory organic beetroot, brown rice, and roasted walnut patty topped with avocado smash, baby arugula, vegan cheddar, and house garlic aioli.',
    price: 429,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=1200&q=85',
    tags: ['Vegan', 'Healthy Choice'],
    isFeatured: false,
    calories: 620
  },
  {
    id: 'wrap-falafel-tahini',
    name: 'Crispy Falafel & Tahini Wrap',
    description: 'Warm whole wheat tortilla packed with crisp falafels, cucumber tomato salad, pickled red onions, mint, and rich garlic tahini drizzle.',
    price: 399,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1200&q=85',
    tags: ['Vegan', 'Healthy Choice'],
    isFeatured: false,
    calories: 580
  },

  // Mains & Sizzlers
  {
    id: 'main-paneer-sizzler',
    name: 'Signature Paneer Steak Sizzler',
    description: 'Thick center-cut herb marinated paneer steak served sizzling on a hot iron skillet with garlic butter, roasted seasonal vegetables, and rosemary potatoes.',
    price: 699,
    category: 'mains',
    image: paneerSizzlerImg,
    tags: ["Chef's Special", 'High-Protein', 'Gluten-Free'],
    isFeatured: true,
    calories: 680
  },
  {
    id: 'main-cauliflower-steak',
    name: 'The Outlaw Flame-Grilled Cauliflower Steak',
    description: 'Thick center-cut cauliflower slab marinated in smoked paprika and lime, flame-seared on the grill and served over smooth cauliflower puree with green chimichurri.',
    price: 549,
    category: 'mains',
    image: cauliflowerSteakImg,
    tags: ['Vegan', 'Gluten-Free'],
    isFeatured: false,
    calories: 410
  },
  {
    id: 'main-eggplant-parm',
    name: 'Tuscan Stuffed Eggplant Parmesan',
    description: 'Roasted heirloom eggplant stuffed with seasoned ricotta, mozzarella, basil, and slow-cooked marinara sauce, baked until bubbling and golden.',
    price: 579,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?auto=format&fit=crop&w=1200&q=85',
    tags: ['Vegetarian', 'Gluten-Free'],
    isFeatured: false,
    calories: 550
  },
  {
    id: 'main-burrito-bowl',
    name: 'Mexican Fiesta Burrito Bowl',
    description: 'Coriander lime basmati rice topped with seasoned black beans, grilled corn, fajita bell peppers, fresh guacamole, pico de gallo, and sour cream.',
    price: 499,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1200&q=85',
    tags: ['Gluten-Free', 'Vegan Option'],
    isFeatured: false,
    calories: 590
  },
  {
    id: 'main-thai-green-curry',
    name: 'Thai Green Curry with Jasmine Rice',
    description: 'Fresh broccoli, snap peas, bell peppers, and tofu simmered in an aromatic coconut green curry broth with lemongrass and basil. Served with steamed jasmine rice.',
    price: 549,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=85',
    tags: ['Vegan', 'Spicy', 'Gluten-Free'],
    isFeatured: false,
    calories: 540
  },

  // Indian & Fusion Specials
  {
    id: 'indian-paneer-tikka',
    name: 'Tandoori Paneer Tikka',
    description: 'Cubes of fresh artisanal paneer, bell peppers, and sweet onions marinated in spiced Greek yogurt and mustard oil, roasted to charred perfection in clay oven.',
    price: 499,
    category: 'indian',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1200&q=85',
    tags: ['Gluten-Free', 'Spicy', 'High-Protein'],
    isFeatured: true,
    calories: 520
  },
  {
    id: 'indian-veg-seekh',
    name: 'Chef\'s Special Veg Seekh Kebab',
    description: 'Skewered kebabs crafted from finely minced seasonal vegetables, cottage cheese, fresh coriander, and warm aromatic spices, clay-roasted and served with mint chutney.',
    price: 469,
    category: 'indian',
    image: vegSeekhKebabImg,
    tags: ["Chef's Special", 'Vegetarian'],
    isFeatured: false,
    calories: 450
  },
  {
    id: 'indian-paneer-butter-masala',
    name: 'Royal Paneer Butter Masala',
    description: 'Soft cottage cheese cubes simmered in a rich, velvety tomato and cashew gravy, finished with butter, fresh cream, and dried fenugreek leaves.',
    price: 529,
    category: 'indian',
    image: paneerSizzlerImg,
    tags: ['Must Try', 'Vegetarian'],
    isFeatured: false,
    calories: 680
  },
  {
    id: 'indian-dal-makhani',
    name: 'Dal Makhani with Garlic Naan',
    description: 'Slow-simmered black lentils and red kidney beans cooked overnight with butter, ginger, and garlic. Served with a piping hot wood-fired garlic butter naan.',
    price: 469,
    category: 'indian',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85',
    tags: ['Comfort Food', 'Vegetarian'],
    isFeatured: false,
    calories: 710
  },
  {
    id: 'indian-dum-biryani',
    name: 'Fragrant Vegetable Dum Biryani',
    description: 'Long-grain basmati rice cooked on dum with marinated seasonal vegetables, saffron, caramelized onions, mint, and rose water. Served with cooling cucumber raita.',
    price: 499,
    category: 'indian',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=85',
    tags: ['Vegetarian', 'Gluten-Free'],
    isFeatured: false,
    calories: 640
  },

  // House Sides
  {
    id: 'side-mac-cheese',
    name: 'Smoked Gouda Mac & Cheese',
    description: 'Elbow macaroni tossed in a rich, creamy blend of smoked Gouda, sharp cheddar, and Monterey Jack, topped with buttered panko crumbs and baked.',
    price: 269,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?auto=format&fit=crop&w=1200&q=85',
    tags: ['Vegetarian', 'Must Try'],
    isFeatured: false,
    calories: 580
  },
  {
    id: 'side-truffle-fries',
    name: 'Loaded Truffle & Parmesan Fries',
    description: 'Hand-cut golden fries tossed in white truffle oil, shaved aged parmesan cheese, and fresh Italian parsley, served with garlic aioli.',
    price: 249,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=85',
    tags: ['Vegetarian', 'Gourmet'],
    isFeatured: false,
    calories: 480
  },
  {
    id: 'side-sweet-potato-fries',
    name: 'Texas Spiced Sweet Potato Wedges',
    description: 'Crispy sweet potato wedges dusted with chili-maple seasoning, served with a creamy cinnamon marshmallow dipping cream.',
    price: 219,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1200&q=85',
    tags: ['Vegetarian', 'Gluten-Free'],
    isFeatured: false,
    calories: 390
  },
  {
    id: 'side-cornbread',
    name: 'Honey-Butter Skillet Cornbread',
    description: 'Warm, golden sweet cornmeal baked in a cast-iron skillet, brushed with melting whipped honey-butter and sprinkled with sea salt.',
    price: 199,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=85',
    tags: ['Vegetarian', 'Warm'],
    isFeatured: false,
    calories: 380
  },
  {
    id: 'side-asparagus',
    name: 'Grilled Heirloom Asparagus',
    description: 'Fresh asparagus spears lightly tossed in olive oil, seared on the grill, and finished with fresh lemon zest and toasted almonds.',
    price: 229,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=85',
    tags: ['Vegan', 'Gluten-Free', 'Healthy Choice'],
    isFeatured: false,
    calories: 140
  },

  // Artisanal Desserts
  {
    id: 'dessert-molten-lava',
    name: 'Sizzling Chocolate Lava Cake',
    description: 'Rich dark chocolate cake with a molten fudge center, served sizzling on an iron plate with fresh strawberries and vanilla bean gelato.',
    price: 329,
    category: 'desserts',
    image: moltenLavaImg,
    tags: ["Chef's Special", 'Sweet Accent'],
    isFeatured: true,
    calories: 820
  },
  {
    id: 'dessert-cheesecake',
    name: 'New York Style Berry Cheesecake',
    description: 'Dense, velvety cheesecake over a graham cracker crust, topped with hand-crafted fresh raspberry and blackberry reduction.',
    price: 299,
    category: 'desserts',
    image: berryCheesecakeImg,
    tags: ['Vegetarian', 'Classic'],
    isFeatured: false,
    calories: 640
  },
  {
    id: 'dessert-peach-cobbler',
    name: 'Warm Southern Peach Cobbler',
    description: 'Sweet Texas peaches stewed with cinnamon and nutmeg, topped with a golden flaky buttermilk biscuit crust and vanilla ice cream.',
    price: 269,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=1200&q=85',
    tags: ['Vegetarian', 'Must Try'],
    isFeatured: false,
    calories: 550
  },
  {
    id: 'dessert-tiramisu',
    name: 'Traditional Espresso Tiramisu',
    description: 'Italian ladyfingers soaked in dark espresso and marsala, layered with whipped mascarpone cream and dusted with cocoa powder.',
    price: 289,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=85',
    tags: ['Vegetarian', 'Gourmet'],
    isFeatured: false,
    calories: 510
  },
  {
    id: 'dessert-brownie',
    name: 'Fudgy Dark Chocolate Brownie',
    description: 'Warm walnut dark chocolate brownie served with warm salted caramel sauce and a scoop of artisanal Madagascar vanilla ice cream.',
    price: 259,
    category: 'desserts',
    image: moltenLavaImg,
    tags: ['Vegetarian', 'Sweet Accent'],
    isFeatured: false,
    calories: 690
  },

  // Fresh Juices & Drinks
  {
    id: 'drink-green-detox',
    name: 'Cold-Pressed Green Detox Juice',
    description: 'Freshly cold-pressed cucumber, granny smith apple, celery, spinach, ginger, and fresh lemon for a refreshing nutrient boost.',
    price: 219,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=1200&q=85',
    tags: ['100% Organic', 'Non-Alcoholic'],
    isFeatured: false,
    calories: 120
  },
  {
    id: 'drink-berry-smoothie',
    name: 'Wild Berry & Greek Yogurt Smoothie',
    description: 'Blend of fresh strawberries, blueberries, raspberries, organic Greek yogurt, and wild honey, topped with chia seeds.',
    price: 239,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1200&q=85',
    tags: ['Refreshing', 'Non-Alcoholic'],
    isFeatured: false,
    calories: 220
  },
  {
    id: 'drink-jalapeno-mocktail',
    name: 'Smoked Jalapeño & Lime Mocktail',
    description: 'Hand-pressed lime juice, organic agave nectar, fresh muddled mint, and smoked jalapeño wheels served over crushed ice with a tajín chili rim.',
    price: 269,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=1200&q=85',
    tags: ['Signature Mocktail', 'Spicy'],
    isFeatured: false,
    calories: 110
  },
  {
    id: 'drink-lavender-lemonade',
    name: 'Texas Blueberry Lavender Lemonade',
    description: 'Hand-pressed lemons, fresh muddled Texas hill-country blueberries, organic agave syrup, infused with culinary lavender buds.',
    price: 189,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=85',
    tags: ['Refreshing', 'Non-Alcoholic'],
    isFeatured: false,
    calories: 130
  },
  {
    id: 'drink-peach-iced-tea',
    name: 'Texas Peach Cold Brew Iced Tea',
    description: 'Brewed black tea infused with fresh Texas hill-country peaches and cane sugar, served ice-cold with fresh mint leaves.',
    price: 169,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1200&q=85',
    tags: ['Refreshing', 'Non-Alcoholic'],
    isFeatured: false,
    calories: 110
  }
];

export const TESTIMONIALS: Review[] = [
  {
    id: 'rev-1',
    name: 'Aisha Patel',
    rating: 5,
    comment: 'The Signature Paneer Steak Sizzler is an absolute game changer! It arrives piping hot with garlic herb butter and tender roasted veggies. Texas Taste sets the new standard for fine dining vegetarian cuisine.',
    location: 'Austin, TX',
    date: '2026-06-15',
    avatarUrl: 'A'
  },
  {
    id: 'rev-2',
    name: 'Marcus Vance',
    rating: 5,
    comment: 'The Black Truffle & Wild Mushroom Pasta was pure luxury on a plate. Immaculate presentation, incredible depth of flavor, and exceptionally attentive service. A must-visit dining room!',
    location: 'Houston, TX',
    date: '2026-07-02',
    avatarUrl: 'M'
  },
  {
    id: 'rev-3',
    name: 'Elena Rostova',
    rating: 5,
    comment: 'Finally a 100% pure vegetarian restaurant with a sophisticated atmosphere! The Artisanal Margherita Pizza and Smoked Jalapeño Mocktail were world class.',
    location: 'Dallas, TX',
    date: '2026-07-18',
    avatarUrl: 'E'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    url: paneerSizzlerImg,
    title: 'Signature Paneer Sizzler Platter',
    category: 'food'
  },
  {
    id: 'gal-2',
    url: trufflePastaImg,
    title: 'Handcrafted Truffle Wild Mushroom Pasta',
    category: 'food'
  },
  {
    id: 'gal-3',
    url: margheritaPizzaImg,
    title: 'Wood-Fired Artisanal Margherita Pizza',
    category: 'food'
  },
  {
    id: 'gal-4',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
    title: 'Luxury Dining Lounge & Ambience',
    category: 'interior'
  },
  {
    id: 'gal-5',
    url: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=1200&q=85',
    title: 'Cold-Pressed Organic Fresh Juice Bar',
    category: 'drinks'
  },
  {
    id: 'gal-6',
    url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85',
    title: 'Vibrant Evening Atmosphere at Texas Taste',
    category: 'events'
  }
];

export const RESTAURANT_INFO = {
  address: '401 E 6th St, Austin, TX 78701, United States',
  phone: '+1 (512) 555-8278',
  email: 'reservations@texastaste.com',
  hours: [
    { days: 'Monday - Thursday', hours: '11:30 AM - 10:00 PM' },
    { days: 'Friday - Saturday', hours: '11:00 AM - 11:30 PM' },
    { days: 'Sunday Brunch & Dinner', hours: '10:30 AM - 9:30 PM' }
  ],
  coordinates: { lat: 30.2669, lng: -97.7392 }
};
