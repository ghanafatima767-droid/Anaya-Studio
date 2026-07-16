import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { AnimatePresence, motion } from 'framer-motion';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { itemCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md py-3 shadow-sm shadow-black/20 border-b border-border/40'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex-1 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-foreground hover:text-primary transition-colors"
              aria-label="Open menu"
              data-testid="button-menu-open"
            >
              <Menu size={24} />
            </button>
          </div>

          <div className="flex-1 md:flex-none flex justify-center md:justify-start">
            <Link href="/" className="group" data-testid="link-home-logo">
              <span className="font-serif text-2xl tracking-wider text-primary group-hover:text-primary/80 transition-colors uppercase">
                Anaya Studio
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex flex-1 items-center justify-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm tracking-widest uppercase transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:bg-primary after:transition-all after:duration-300 ${
                  location === link.href
                    ? 'text-primary after:w-full'
                    : 'text-foreground/80 hover:text-primary after:w-0 hover:after:w-full'
                }`}
                data-testid={`link-nav-${link.name.toLowerCase()}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex-1 flex justify-end">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-foreground hover:text-primary transition-colors group"
              aria-label="Open cart"
              data-testid="button-cart-open"
            >
              <ShoppingBag size={24} className="group-hover:scale-105 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-card border-r border-border z-50 flex flex-col p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="font-serif text-xl tracking-wider text-primary uppercase">
                  Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-foreground/70 hover:text-primary transition-colors"
                  aria-label="Close menu"
                  data-testid="button-menu-close"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg tracking-widest uppercase transition-colors w-fit ${
                      location === link.href ? 'text-primary' : 'text-foreground hover:text-primary'
                    }`}
                    data-testid={`link-mobile-nav-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pt-8 border-t border-border/50">
                <p className="text-sm text-foreground/60 mb-2">Contact Us</p>
                <a href="tel:03099812648" className="text-sm hover:text-primary transition-colors">
                  0309 9812648
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
