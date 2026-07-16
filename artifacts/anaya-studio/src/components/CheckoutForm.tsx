import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, MessageCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

type CheckoutFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormData = {
  name: string;
  phone: string;
  address: string;
  city: string;
};

type FormErrors = Partial<FormData>;

const WHATSAPP_NUMBER = '923099812648';

function buildWhatsAppMessage(form: FormData, items: ReturnType<typeof useCart>['items'], total: number): string {
  const orderLines = items
    .map(
      (item) =>
        `• ${item.name} (Unstitched) x${item.quantity} — Rs. ${(item.price * item.quantity).toLocaleString()}`
    )
    .join('\n');

  return [
    '🛍 New Order from Anaya Studio Website',
    '',
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Address: ${form.address}, ${form.city}`,
    '',
    'Order Details:',
    orderLines,
    '',
    `Total: Rs. ${total.toLocaleString()}`,
    '',
    '——————————————',
    'Kindly confirm availability and share payment details. Thank you!',
  ].join('\n');
}

export function CheckoutForm({ isOpen, onClose }: CheckoutFormProps) {
  const { items, total, setIsCartOpen } = useCart();

  const [form, setForm] = useState<FormData>({ name: '', phone: '', address: '', city: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState<'form' | 'confirming' | 'done'>('form');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[\d\s\-+()]{7,15}$/.test(form.phone.trim())) newErrors.phone = 'Enter a valid phone number';
    if (!form.address.trim()) newErrors.address = 'Delivery address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setStep('confirming');

    setTimeout(() => {
      const message = buildWhatsAppMessage(form, items, total);
      const encoded = encodeURIComponent(message);
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      setStep('done');
    }, 1800);
  };

  const handleClose = () => {
    setForm({ name: '', phone: '', address: '', city: '' });
    setErrors({});
    setStep('form');
    onClose();
  };

  const handleDone = () => {
    handleClose();
    setIsCartOpen(false);
  };

  const inputClass = (field: keyof FormErrors) =>
    [
      'w-full bg-background border px-4 py-3 text-sm text-foreground placeholder:text-foreground/30',
      'focus:outline-none focus:border-primary transition-colors duration-200',
      errors[field] ? 'border-red-500/70' : 'border-border/60',
    ].join(' ');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="checkout-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={step === 'form' ? handleClose : undefined}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[70]"
          />

          {/* Panel */}
          <motion.div
            key="checkout-panel"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-[480px] bg-card border border-border/60 z-[80] shadow-2xl"
          >
            {/* ── FORM STEP ── */}
            <AnimatePresence mode="wait">
              {step === 'form' && (
                <motion.div key="form-step" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
                    <div>
                      <h2 className="font-serif text-lg tracking-wider text-primary uppercase">Checkout</h2>
                      <p className="text-xs text-foreground/50 mt-0.5 tracking-wide">
                        Complete your details to order via WhatsApp
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="p-2 -mr-2 text-foreground/50 hover:text-primary transition-colors"
                      aria-label="Close"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Fields */}
                  <div className="px-6 py-5 space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-foreground/60 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Fatima Khan"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClass('name')}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-foreground/60 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="e.g. 03001234567"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputClass('phone')}
                      />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-foreground/60 mb-1.5">Delivery Address</label>
                      <input
                        type="text"
                        placeholder="House/Flat, Street, Area"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        className={inputClass('address')}
                      />
                      {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-foreground/60 mb-1.5">City</label>
                      <input
                        type="text"
                        placeholder="e.g. Karachi"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className={inputClass('city')}
                      />
                      {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                    </div>
                  </div>

                  {/* Order summary */}
                  <div className="px-6 pb-2 space-y-1">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-xs text-foreground/60">
                        <span>{item.name} × {item.quantity}</span>
                        <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm font-medium text-primary pt-2 border-t border-border/40 mt-2">
                      <span className="tracking-wide uppercase text-xs">Total</span>
                      <span className="font-serif">Rs. {total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="px-6 py-5">
                    <button
                      onClick={handleSubmit}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-[#25D366] text-white text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#1ebe5d] transition-colors duration-200 relative overflow-hidden group"
                    >
                      <MessageCircle size={16} />
                      <span>Place Order via WhatsApp</span>
                      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── CONFIRMING STEP ── */}
              {step === 'confirming' && (
                <motion.div
                  key="confirming-step"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center px-8 py-16 text-center gap-5"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  >
                    <Loader2 size={36} className="text-primary" />
                  </motion.div>
                  <div className="space-y-2">
                    <p className="font-serif text-lg text-primary tracking-wide">Preparing Your Order</p>
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      Redirecting you to WhatsApp to confirm your order with Anaya Studio...
                    </p>
                  </div>
                  <motion.div
                    className="flex gap-1.5 mt-2"
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                        variants={{
                          hidden: { opacity: 0.2, y: 0 },
                          visible: { opacity: [0.2, 1, 0.2], y: [0, -5, 0], transition: { repeat: Infinity, duration: 0.9, delay: i * 0.15 } },
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* ── DONE STEP ── */}
              {step === 'done' && (
                <motion.div
                  key="done-step"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center px-8 py-14 text-center gap-5"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 14, stiffness: 200 }}
                  >
                    <CheckCircle2 size={48} className="text-[#25D366]" />
                  </motion.div>
                  <div className="space-y-2">
                    <p className="font-serif text-xl text-primary tracking-wide">Order Sent!</p>
                    <p className="text-sm text-foreground/60 leading-relaxed max-w-xs">
                      Your order details have been sent to WhatsApp. Our team will confirm shortly.
                    </p>
                  </div>
                  <button
                    onClick={handleDone}
                    className="mt-2 px-8 py-3 border border-primary text-primary text-xs tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  >
                    Back to Shop
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
