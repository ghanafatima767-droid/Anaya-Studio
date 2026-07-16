import { useState } from 'react';
import { motion } from 'framer-motion';
import { HeroSlider } from '@/components/HeroSlider';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';
import { products, type Product } from '@/data/products';
import { Link } from 'wouter';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <HeroSlider />

      {/* Brand Intro Section */}
      <section className="py-24 md:py-32 px-4 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden">
          <span className="font-serif text-[20vw] leading-none whitespace-nowrap text-primary">Anaya</span>
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="h-px w-20 bg-primary mb-8" />
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-8 leading-tight">
              Crafting Elegance in Every Thread
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed mb-8">
              Step into a world where subtle meets trendy, and tradition embraces the contemporary. 
              Anaya Studio presents an exclusive unstitched lawn collection designed for the modern, composed woman. 
              Every piece is a canvas awaiting your unique story.
            </p>
            <div className="h-px w-20 bg-primary mt-4" />
          </motion.div>
        </div>
      </section>

      {/* New Arrivals Grid */}
      <section className="py-16 md:py-24 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl md:text-4xl text-foreground"
            >
              New Arrivals
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-6 md:mt-0"
            >
              <Link href="/shop">
                <span className="text-sm font-medium tracking-[0.2em] uppercase text-primary hover:text-foreground transition-colors border-b border-primary hover:border-foreground pb-1 cursor-pointer">
                  View All Collection
                </span>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-16">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onClick={setSelectedProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}
