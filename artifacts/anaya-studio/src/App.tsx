import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';

import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import Contact from '@/pages/Contact';

const queryClient = new QueryClient();

function NotFound() {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center bg-background text-foreground">
      <div className="text-center flex flex-col items-center">
        <h1 className="font-serif text-6xl text-primary mb-6">404</h1>
        <p className="text-xl mb-8 font-light text-foreground/70">The page you are looking for has vanished.</p>
        <a href="/" className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors uppercase tracking-widest text-sm">
          Return to Atelier
        </a>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1">
              <Router />
            </div>
            <Footer />
            <CartDrawer />
          </div>
        </WouterRouter>
        <Toaster position="bottom-right" theme="dark" />
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
