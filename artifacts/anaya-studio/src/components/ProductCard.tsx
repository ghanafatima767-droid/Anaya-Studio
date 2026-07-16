import { motion } from 'framer-motion';
import { type Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

type ProductCardProps = {
  product: Product;
  index?: number;
  onClick: (product: Product) => void;
};

export function ProductCard({ product, index = 0, onClick }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.mainImage,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer flex flex-col h-full"
      onClick={() => onClick(product)}
      data-testid={`product-card-${product.id}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-card rounded-sm">
        {/* Unstitched Badge */}
        <div className="absolute top-3 left-3 z-20 px-3 py-1 bg-background/80 backdrop-blur-md border border-primary/30 text-primary text-[10px] tracking-widest uppercase font-medium">
          Unstitched
        </div>

        {/* Image / Placeholder */}
        {product.isPlaceholder || !product.mainImage ? (
          <div className="absolute inset-0 bg-gradient-to-br from-card to-background flex items-center justify-center p-6 text-center">
            <span className="font-serif text-2xl text-foreground/20 italic">Anaya</span>
          </div>
        ) : (
          <>
            <motion.img
              src={product.mainImage}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Dark gradient overlay on hover for better button contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
          </>
        )}

        {/* Quick Add Button (visible on hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
          <button
            onClick={handleAddToCart}
            className="w-full py-3 bg-primary text-primary-foreground text-xs font-semibold tracking-widest uppercase hover:bg-primary/90 transition-colors shadow-lg"
            data-testid={`button-add-cart-${product.id}`}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-1 text-center px-2">
        <h3 className="font-serif text-lg tracking-wide text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="text-primary mt-2 font-medium tracking-wider">
          Rs. {product.price.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}
