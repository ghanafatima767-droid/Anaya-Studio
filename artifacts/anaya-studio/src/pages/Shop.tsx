import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';
import { products, placeholderProducts, type Product } from '@/data/products';

export default function Shop() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Combine real and placeholder products for the full shop view
  const allProducts = [...products, ...placeholderProducts];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 flex flex-col">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6">
            The Collection
          </h1>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto font-light">
            Explore our curated selection of premium unstitched lawn fabrics. 
            Designed to empower your personal style with exquisite embroidery, 
            rich hues, and unparalleled quality.
          </p>
          <div className="w-16 h-px bg-primary mx-auto mt-10" />
        </motion.div>

        {/* Filters (Visual only for aesthetic) */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-16 border-y border-border/40 py-6">
          <span className="text-sm tracking-widest uppercase text-primary font-medium cursor-pointer relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:bg-primary">
            All Styles
          </span>
          <span className="text-sm tracking-widest uppercase text-foreground/50 hover:text-foreground transition-colors cursor-pointer">
            Embroidered
          </span>
          <span className="text-sm tracking-widest uppercase text-foreground/50 hover:text-foreground transition-colors cursor-pointer">
            Printed
          </span>
          <span className="text-sm tracking-widest uppercase text-foreground/50 hover:text-foreground transition-colors cursor-pointer">
            Silk Blend
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-16">
          {allProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onClick={setSelectedProduct}
            />
          ))}
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}
