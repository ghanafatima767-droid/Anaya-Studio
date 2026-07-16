import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import hero1 from '@assets/1_1784216835283.jpeg';
import hero2 from '@assets/picture_fir_websites_1784216835287.jpeg';

const slides = [
  {
    id: 1,
    image: hero1,
    title: 'The Eid Edit',
    subtitle: 'Where tradition meets contemporary grace',
  },
  {
    id: 2,
    image: hero2,
    title: 'Unstitched Elegance',
    subtitle: 'Craft your own narrative with our premium lawn',
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-background">
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Image */}
          <div className="absolute inset-0">
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-background/90 via-black/40 to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center z-10 px-4">
        <div className="max-w-3xl flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${current}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 leading-tight drop-shadow-xl"
            >
              {slides[current].title}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`subtitle-${current}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-foreground/90 text-lg md:text-xl font-light tracking-wide mb-12 drop-shadow-md"
            >
              {slides[current].subtitle}
            </motion.p>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link href="/shop">
              <span className="inline-block border border-primary text-primary px-10 py-4 text-sm font-semibold tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] cursor-pointer">
                Order Now
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1 transition-all duration-500 ${
              current === index ? 'w-12 bg-primary' : 'w-4 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
