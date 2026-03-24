export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Burgers' | 'Pizza' | 'Deals';
  image: string;
}

export const MENU_ITEMS: MenuItem[] = [
  // Burgers
  {
    id: 'b1',
    name: 'Classic Beef Burger',
    description: 'Juicy beef patty with lettuce, tomato, and our secret sauce.',
    price: 450,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'b2',
    name: 'Zinger Burger',
    description: 'Crispy chicken breast with spicy mayo and fresh lettuce.',
    price: 380,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1513185158878-8d8c196b7c8c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'b3',
    name: 'Double Cheese Burger',
    description: 'Two beef patties with double cheddar cheese and pickles.',
    price: 650,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80'
  },
  // Pizza
  {
    id: 'p1',
    name: 'Chicken Tikka Pizza',
    description: 'Spicy chicken tikka chunks with onions and green peppers.',
    price: 850,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p2',
    name: 'Fajita Passion',
    description: 'Marinated chicken fajita, onions, and bell peppers.',
    price: 900,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p3',
    name: 'Veggie Delight',
    description: 'Fresh mushrooms, olives, onions, and green peppers.',
    price: 750,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80'
  },
  // Deals
  {
    id: 'd1',
    name: 'Student Deal',
    description: '1 Zinger Burger + Fries + 250ml Drink.',
    price: 550,
    category: 'Deals',
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'd2',
    name: 'Family Feast',
    description: '1 Large Pizza + 2 Burgers + 1.5L Drink.',
    price: 1850,
    category: 'Deals',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  }
];

export const WHATSAPP_NUMBER = '923001234567'; // Placeholder
