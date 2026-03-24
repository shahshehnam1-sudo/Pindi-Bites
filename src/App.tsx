/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu as MenuIcon, 
  X, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  ShoppingCart
} from 'lucide-react';
import { MENU_ITEMS, WHATSAPP_NUMBER, MenuItem } from './constants';

type Page = 'home' | 'menu' | 'about' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<MenuItem['category']>('Burgers');

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const navigate = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    scrollToTop();
  };

  const handleOrder = (item?: MenuItem) => {
    const message = item 
      ? `Hello Pindi Bites! I would like to order: ${item.name} (Rs. ${item.price})`
      : `Hello Pindi Bites! I want to place an order. Please send me the menu.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigate('home')}
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-display font-bold text-xl text-center">PB</span>
            </div>
            <span className="font-display text-2xl font-bold tracking-tight">Pindi Bites</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate('home')} className={`nav-link ${currentPage === 'home' ? 'text-primary' : ''}`}>Home</button>
            <button onClick={() => navigate('menu')} className={`nav-link ${currentPage === 'menu' ? 'text-primary' : ''}`}>Menu</button>
            <button onClick={() => navigate('about')} className={`nav-link ${currentPage === 'about' ? 'text-primary' : ''}`}>About Us</button>
            <button onClick={() => navigate('contact')} className={`nav-link ${currentPage === 'contact' ? 'text-primary' : ''}`}>Contact</button>
            <button 
              onClick={() => handleOrder()}
              className="btn-primary flex items-center gap-2 py-2"
            >
              <ShoppingCart size={18} />
              Order Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-dark" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-20 left-0 w-full bg-white border-t border-gray-100 shadow-xl p-6 flex flex-col gap-4"
            >
              <button onClick={() => navigate('home')} className="text-left text-lg font-medium py-2 border-b border-gray-50">Home</button>
              <button onClick={() => navigate('menu')} className="text-left text-lg font-medium py-2 border-b border-gray-50">Menu</button>
              <button onClick={() => navigate('about')} className="text-left text-lg font-medium py-2 border-b border-gray-50">About Us</button>
              <button onClick={() => navigate('contact')} className="text-left text-lg font-medium py-2 border-b border-gray-50">Contact</button>
              <button 
                onClick={() => handleOrder()}
                className="btn-primary w-full mt-2 flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                WhatsApp Order
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && <HomePage key="home" onOrder={() => navigate('menu')} />}
          {currentPage === 'menu' && (
            <MenuPage 
              key="menu" 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
              onOrderItem={handleOrder}
            />
          )}
          {currentPage === 'about' && <AboutPage key="about" />}
          {currentPage === 'contact' && <ContactPage key="contact" />}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">PB</span>
              </div>
              <span className="font-display text-xl font-bold">Pindi Bites</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Serving the most delicious and hygienic burgers and pizzas in the heart of Rawalpindi. Quality you can trust, taste you'll love.
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li><button onClick={() => navigate('home')} className="hover:text-primary transition-colors">Home</button></li>
              <li><button onClick={() => navigate('menu')} className="hover:text-primary transition-colors">Our Menu</button></li>
              <li><button onClick={() => navigate('about')} className="hover:text-primary transition-colors">Our Story</button></li>
              <li><button onClick={() => navigate('contact')} className="hover:text-primary transition-colors">Contact Us</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg font-bold mb-6">Connect With Us</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Phone size={16} />
              <span>+92 300 1234567</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Pindi Bites. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function HomePage({ onOrder }: { onOrder: () => void, key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1920&q=80" 
            alt="Delicious Burger" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-white">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-primary px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-6 inline-block">
              Now Open in Pindi
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-extrabold mb-6 leading-tight">
              Best Burgers in <br />
              <span className="text-primary italic">Rawalpindi</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl leading-relaxed">
              Experience the perfect blend of juicy patties, fresh ingredients, and artisanal buns. Your search for the ultimate burger ends here.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onOrder}
                className="btn-primary text-lg px-10 py-4 flex items-center gap-2"
              >
                Order Now
                <ChevronRight size={20} />
              </button>
              <button 
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-bold hover:bg-white/20 transition-all"
              >
                View Menu
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center p-8 rounded-3xl bg-secondary/50 border border-secondary">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles size={32} />
            </div>
            <h3 className="font-display text-2xl font-bold mb-4">Premium Quality</h3>
            <p className="text-gray-600">We use only the finest cuts of meat and freshest local produce for every order.</p>
          </div>
          <div className="text-center p-8 rounded-3xl bg-secondary/50 border border-secondary">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="font-display text-2xl font-bold mb-4">100% Hygienic</h3>
            <p className="text-gray-600">Our kitchen follows strict international hygiene standards for your safety.</p>
          </div>
          <div className="text-center p-8 rounded-3xl bg-secondary/50 border border-secondary">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clock size={32} />
            </div>
            <h3 className="font-display text-2xl font-bold mb-4">Fast Delivery</h3>
            <p className="text-gray-600">Hot and fresh food delivered to your doorstep in record time across Rawalpindi.</p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function MenuPage({ 
  activeCategory, 
  setActiveCategory, 
  onOrderItem 
}: { 
  activeCategory: MenuItem['category'], 
  setActiveCategory: (c: MenuItem['category']) => void,
  onOrderItem: (item: MenuItem) => void,
  key?: string
}) {
  const categories: MenuItem['category'][] = ['Burgers', 'Pizza', 'Deals'];
  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 py-12"
    >
      <h2 className="section-title">Our Delicious Menu</h2>
      
      {/* Category Tabs */}
      <div className="flex justify-center gap-4 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-3 rounded-full font-bold transition-all ${
              activeCategory === cat 
                ? 'bg-primary text-white shadow-lg scale-105' 
                : 'bg-white text-dark hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="h-64 overflow-hidden relative">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-primary text-white font-bold px-4 py-1 rounded-full shadow-md">
                Rs. {item.price}
              </div>
            </div>
            <div className="p-8">
              <h3 className="font-display text-2xl font-bold mb-3">{item.name}</h3>
              <p className="text-gray-500 mb-6 line-clamp-2">{item.description}</p>
              <button 
                onClick={() => onOrderItem(item)}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Order via WhatsApp
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function AboutPage({ key }: { key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80" 
            alt="Our Kitchen" 
            className="rounded-3xl shadow-2xl z-10 relative"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary rounded-3xl -z-0"></div>
        </div>
        <div>
          <span className="text-primary font-bold tracking-widest uppercase mb-4 block">Our Story</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">Crafting Taste with Love and Trust</h2>
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              Founded in 2020, Pindi Bites started with a simple mission: to bring authentic, high-quality fast food to the streets of Rawalpindi. We believe that a great burger is more than just food—it's an experience.
            </p>
            <p>
              Our commitment to quality starts with our ingredients. We source our meat from certified local suppliers and bake our buns fresh every morning. Every pizza is hand-tossed and topped with our signature tomato sauce.
            </p>
            <p>
              <strong className="text-dark">Cleanliness is our priority.</strong> We maintain a state-of-the-art, open-concept kitchen where you can see the magic happen. Our staff is trained in the highest standards of food safety and hygiene, ensuring that every bite you take is safe and delicious.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-primary font-display text-3xl font-bold mb-1">10k+</div>
              <div className="text-gray-500 text-sm">Happy Customers</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-primary font-display text-3xl font-bold mb-1">50+</div>
              <div className="text-gray-500 text-sm">Menu Items</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ContactPage({ key }: { key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 py-12"
    >
      <h2 className="section-title">Get In Touch</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
        <div className="bg-white p-10 rounded-3xl shadow-sm text-center border border-gray-50">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Phone size={32} />
          </div>
          <h4 className="font-display text-xl font-bold mb-2">Call Us</h4>
          <p className="text-gray-500 mb-4">Available 12 PM - 12 AM</p>
          <a href="tel:+923001234567" className="text-primary font-bold text-lg">+92 300 1234567</a>
        </div>
        
        <div className="bg-white p-10 rounded-3xl shadow-sm text-center border border-gray-50">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle size={32} />
          </div>
          <h4 className="font-display text-xl font-bold mb-2">WhatsApp</h4>
          <p className="text-gray-500 mb-4">Fastest way to order</p>
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER}`} 
            className="bg-green-600 text-white px-6 py-2 rounded-full font-bold inline-block hover:bg-green-700 transition-colors"
          >
            Chat Now
          </a>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-sm text-center border border-gray-50">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin size={32} />
          </div>
          <h4 className="font-display text-xl font-bold mb-2">Visit Us</h4>
          <p className="text-gray-500 mb-4">Saddar, Rawalpindi</p>
          <span className="text-dark font-bold">Main Mall Road, Pindi</span>
        </div>
      </div>

      {/* Map Section */}
      <div className="rounded-3xl overflow-hidden shadow-2xl h-[450px] relative border-8 border-white">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.784566236967!2d73.0544!3d33.5950!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df948974419ac1%3A0x984357ad7b81cb4b!2sSaddar%2C%20Rawalpindi%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1648123456789!5m2!1sen!2s" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy"
          title="Google Maps Location"
        ></iframe>
      </div>
    </motion.div>
  );
}
