import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { type Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

type ProductModalProps = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
};

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCart();

  // Reset state when a new product is selected
  if (!product && isOpen) {
    onClose();
    return null;
  }

  const images = product ? [product.mainImage, ...product.altImages].filter(Boolean) : [];
  
  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.mainImage,
    });
    onClose();
    // Reset for next time
    setTimeout(() => {
      setQuantity(1);
      setCurrentImageIndex(0);
    }, 300);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-card w-full max-w-5xl max-h-full rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl pointer-events-auto border border-border"
              data-testid={`modal-product-${product.id}`}
            >
              {/* Close Button Mobile (Absolute Top Right) */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 md:hidden z-20 p-2 bg-background/50 backdrop-blur-md rounded-full text-foreground/80 hover:text-primary border border-border"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 relative bg-background/50 h-[40vh] md:h-[80vh] min-h-[300px]">
                {product.isPlaceholder || images.length === 0 ? (
                   <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-card to-background p-6">
                     <span className="font-serif text-3xl text-foreground/10 italic text-center leading-relaxed">
                       {product.name}
                     </span>
                   </div>
                ) : (
                  <>
                    <img
                      src={images[currentImageIndex]}
                      alt={`${product.name} view ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {images.length > 1 && (
                      <>
                        <button 
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/50 backdrop-blur-md rounded-full hover:bg-background/80 transition-colors border border-border text-foreground hover:text-primary"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button 
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/50 backdrop-blur-md rounded-full hover:bg-background/80 transition-colors border border-border text-foreground hover:text-primary"
                        >
                          <ChevronRight size={20} />
                        </button>
                        
                        {/* Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-y-1/2 flex gap-2">
                          {images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                currentImageIndex === idx ? 'bg-primary w-4' : 'bg-white/50 hover:bg-white'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
                
                {/* Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-background/80 backdrop-blur-md border border-primary/30 text-primary text-[10px] tracking-widest uppercase font-medium">
                  Unstitched 3-Piece
                </div>
              </div>

              {/* Details Section */}
              <div className="w-full md:w-1/2 flex flex-col h-auto md:h-[80vh] overflow-y-auto">
                <div className="p-6 md:p-10 flex-1 flex flex-col">
                  {/* Close Button Desktop */}
                  <div className="hidden md:flex justify-end mb-4">
                    <button
                      onClick={onClose}
                      className="text-foreground/50 hover:text-primary transition-colors"
                      aria-label="Close modal"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <h2 className="font-serif text-2xl md:text-4xl text-foreground mb-4 leading-tight">
                    {product.name}
                  </h2>
                  
                  <p className="text-xl text-primary font-medium tracking-wide mb-8">
                    Rs. {product.price.toLocaleString()}
                  </p>

                  <div className="h-px w-full bg-border/50 mb-8" />

                  <div className="prose prose-invert prose-p:text-foreground/70 prose-p:leading-relaxed max-w-none mb-10">
                    <p>{product.description}</p>
                    <p className="text-sm uppercase tracking-wider text-foreground/50 mt-4">
                      Fabric Details
                    </p>
                    <ul className="list-disc pl-4 text-foreground/70 marker:text-primary mt-2">
                      <li>Premium Unstitched Lawn Shirt</li>
                      <li>Dyed Cambric Trouser</li>
                      <li>Luxury Printed/Embroidered Dupatta</li>
                    </ul>
                  </div>

                  <div className="mt-auto space-y-6 pt-6">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm uppercase tracking-widest text-foreground/70">Quantity</span>
                      <div className="flex items-center border border-border rounded-sm">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-3 text-foreground/70 hover:text-primary transition-colors disabled:opacity-50"
                          disabled={quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-medium">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-3 text-foreground/70 hover:text-primary transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="w-full py-4 bg-primary text-primary-foreground text-sm tracking-[0.2em] font-medium uppercase hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                      data-testid="button-modal-add-cart"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
