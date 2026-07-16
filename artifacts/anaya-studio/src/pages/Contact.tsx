import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Instagram, Facebook, Mail, Clock } from 'lucide-react';

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6">
            Get in Touch
          </h1>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto font-light">
            We are here to assist you with inquiries about our collections, bespoke sizing, or order updates.
            Reach out to our atelier.
          </p>
          <div className="w-16 h-px bg-primary mx-auto mt-10" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col space-y-12"
          >
            <div>
              <h2 className="font-serif text-2xl tracking-wide text-primary uppercase mb-8">
                Visit Our Store
              </h2>
              <div className="flex items-start space-x-6 text-foreground/80 group">
                <div className="p-4 rounded-full bg-card border border-border group-hover:border-primary transition-colors shrink-0">
                  <MapPin size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-2 text-foreground">Karachi Outlet</h3>
                  <p className="leading-relaxed text-foreground/70 font-light">
                    Plot #106, Saima Defence Mall,<br />
                    9th St E, D.H.A. Phase 1 Defence,<br />
                    Shop #UG34, Karachi, Pakistan
                  </p>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-border/50" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex items-start space-x-4 group">
                <div className="p-3 rounded-full bg-card border border-border group-hover:border-primary transition-colors shrink-0">
                  <Phone size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-sm tracking-widest uppercase text-foreground/50 mb-2">Phone</h4>
                  <a href="tel:03099812648" className="text-lg hover:text-primary transition-colors">
                    0309 9812648
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="p-3 rounded-full bg-card border border-border group-hover:border-primary transition-colors shrink-0">
                  <Clock size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-sm tracking-widest uppercase text-foreground/50 mb-2">Hours</h4>
                  <p className="text-foreground/80">Mon-Sat: 11am - 9pm<br/>Sun: Closed</p>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-border/50" />

            <div>
              <h2 className="text-sm tracking-widest uppercase text-foreground/50 mb-6">Connect Socially</h2>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/anayastudio.official"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-sm border border-border flex items-center space-x-3 text-foreground hover:text-primary hover:border-primary transition-all bg-card"
                >
                  <Instagram size={20} />
                  <span className="text-sm font-medium">Instagram</span>
                </a>
                <a
                  href="https://www.facebook.com/share/1b2zMXs7KE/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-sm border border-border flex items-center space-x-3 text-foreground hover:text-primary hover:border-primary transition-all bg-card"
                >
                  <Facebook size={20} />
                  <span className="text-sm font-medium">Facebook</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-[500px] lg:h-auto rounded-sm overflow-hidden border border-border relative group"
          >
            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none z-10 mix-blend-overlay" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1s0x3eb33fdbbb8f5473%3A0xc3cfc324c58df189!2sSaima%20Defence%20Mall!5e0!3m2!1sen!2s!4v1714421832000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Anaya Studio Location Map"
              className="group-hover:filter-none transition-all duration-700"
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
