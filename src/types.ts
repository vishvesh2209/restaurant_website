export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'pizzas' | 'pastas' | 'burgers' | 'mains' | 'indian' | 'desserts' | 'drinks' | 'sides';
  image: string;
  tags?: string[]; // e.g. ["Chef's Special", "Spicy", "Gluten-Free"]
  isFeatured?: boolean;
  calories?: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  seatingPreference?: 'indoor' | 'outdoor' | 'bar' | 'no-preference';
  createdAt: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl?: string;
  location?: string;
  isCustom?: boolean; // added by current user
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: 'food' | 'interior' | 'events' | 'drinks';
}
