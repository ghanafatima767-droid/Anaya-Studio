import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Link } from 'wouter';
import { CheckoutForm } from '@/components/CheckoutForm';

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, total } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[400px] bg-card border-l border-border z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <h2 className="font-serif text-xl tracking-wider text-primary uppercase flex items-center gap-3">
                  <ShoppingBag size={20} />
                  Your Cart
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 -mr-2 text-foreground/70 hover:text-primary transition-colors"
                  aria-label="Close cart"
                  data-testid="button-cart-close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-foreground/30">
                      <ShoppingBag size={32} />
                    </div>
                    <p className="text-foreground/70">Your cart is beautifully empty.</p>
                    <Link href="/shop" onClick={() => setIsCartOpen(false)}>
                      <span className="inline-block mt-4 px-6 py-2 border border-primary text-primary text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                        Explore Collection
                      </span>
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4" data-testid={`cart-item-${item.id}`}>
                      <div className="w-20 h-24 rounded overflow-hidden shrink-0 bg-muted/30">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                            Image
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col flex-1 py-1">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-sm font-medium line-clamp-2">{item.name}</h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                            aria-label="Remove item"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-primary text-sm mt-1">Rs. {item.price.toLocaleString()}</p>

                        <div className="mt-auto flex items-center border border-border rounded-sm w-fit">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-foreground/70 hover:text-primary transition-colors disabled:opacity-50"
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-foreground/70 hover:text-primary transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-border/50 bg-background/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/80 tracking-wide uppercase text-sm">Subtotal</span>
                    <span className="font-serif text-xl tracking-wider text-primary">
                      Rs. {total.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-primary text-primary-foreground text-sm tracking-[0.2em] font-medium uppercase hover:bg-primary/90 transition-colors relative overflow-hidden group"
                    data-testid="button-checkout"
                  >
                    <span className="relative z-10">Proceed to Checkout</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout form — rendered outside the drawer so it sits above everything */}
      <CheckoutForm isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
}
