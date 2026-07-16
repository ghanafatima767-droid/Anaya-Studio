import { Link } from 'wouter';
import { MapPin, Phone, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background pt-20 pb-10 border-t border-border/40">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div className="flex flex-col space-y-6">
            <h3 className="font-serif text-2xl tracking-wider text-primary uppercase">
              Anaya Studio
            </h3>
            <p className="text-foreground/70 text-sm max-w-sm leading-relaxed">
              Style for every occasion. Stitched & unstitched collections for the modern, subtle, trendy & composed.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/anayastudio.official"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-all hover:-translate-y-1"
                aria-label="Instagram"
                data-testid="link-instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/share/1b2zMXs7KE/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-all hover:-translate-y-1"
                aria-label="Facebook"
                data-testid="link-facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col space-y-6 md:pl-12">
            <h4 className="font-serif text-lg tracking-widest text-foreground uppercase">
              Explore
            </h4>
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-sm text-foreground/70 hover:text-primary transition-colors w-fit">
                Home
              </Link>
              <Link href="/shop" className="text-sm text-foreground/70 hover:text-primary transition-colors w-fit">
                Shop Collection
              </Link>
              <Link href="/contact" className="text-sm text-foreground/70 hover:text-primary transition-colors w-fit">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col space-y-6">
            <h4 className="font-serif text-lg tracking-widest text-foreground uppercase">
              Visit Us
            </h4>
            <div className="flex flex-col space-y-4">
              <div className="flex items-start space-x-3 text-sm text-foreground/70 leading-relaxed">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>
                  Plot #106, Saima Defence Mall,
                  <br />
                  9th St E, D.H.A. Phase 1 Defence,
                  <br />
                  Shop #UG34, Karachi, Pakistan
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-foreground/70">
                <Phone size={18} className="text-primary shrink-0" />
                <a href="tel:03099812648" className="hover:text-primary transition-colors">
                  0309 9812648
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8" />

        <div className="text-center text-xs text-foreground/50">
          <p>&copy; {new Date().getFullYear()} Anaya Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
