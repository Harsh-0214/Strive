"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ShoppingBag, X, Plus, Minus, ArrowRight } from "lucide-react";
import { getPrototype } from "@/lib/prototypes";
import { PrototypeBadge, PrototypeCtaBar } from "@/components/PrototypeChrome";

const proto = getPrototype("ecommerce")!;
const RED = proto.accent;

const products = [
  { id: 1, name: "Oversized Wool Coat", price: 248, tone: "linear-gradient(160deg,#3a3a3a,#111)" },
  { id: 2, name: "Structured Blazer", price: 189, tone: "linear-gradient(160deg,#5a4a3a,#1a1410)" },
  { id: 3, name: "Relaxed Denim", price: 128, tone: "linear-gradient(160deg,#3a4a5a,#10161c)" },
  { id: 4, name: "Ribbed Knit Tee", price: 58, tone: "linear-gradient(160deg,#4a4a4a,#161616)" },
  { id: 5, name: "Cropped Trench", price: 214, tone: "linear-gradient(160deg,#5a3a3a,#1c1010)" },
  { id: 6, name: "Pleated Midi Skirt", price: 142, tone: "linear-gradient(160deg,#3a3a4a,#101018)" },
];

const sizes = ["XS", "S", "M", "L", "XL"];

interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  qty: number;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProductCard({ p }: { p: (typeof products)[number] }) {
  const [size, setSize] = useState("M");
  const [added, setAdded] = useState(false);

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4" style={{ background: p.tone }}>
        <button
          onClick={() => {
            const evt = new CustomEvent("nova-add-to-cart", { detail: { id: p.id, name: p.name, price: p.price, size } });
            window.dispatchEvent(evt);
            setAdded(true);
            setTimeout(() => setAdded(false), 1200);
          }}
          className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 active:scale-[0.97]"
          style={{ background: added ? "#16a34a" : "#fff", color: "#111" }}
        >
          {added ? "Added ✓" : "Quick Add"}
        </button>
      </div>
      <p className="font-semibold text-sm" style={{ color: "#111" }}>{p.name}</p>
      <div className="flex items-center justify-between mt-1 mb-3">
        <span className="text-sm" style={{ color: "#666" }}>${p.price}</span>
      </div>
      <div className="flex gap-1.5">
        {sizes.map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className="w-7 h-7 rounded-full text-[11px] font-bold flex items-center justify-center transition-all duration-150 active:scale-90"
            style={{
              background: size === s ? "#111" : "transparent",
              color: size === s ? "#fff" : "#111",
              border: "1px solid #111",
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function EcommerceContent() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const handler = ((e: CustomEvent) => {
      const { id, name, price, size } = e.detail;
      setCart((prev) => {
        const existing = prev.find((i) => i.id === id && i.size === size);
        if (existing) {
          return prev.map((i) => (i.id === id && i.size === size ? { ...i, qty: i.qty + 1 } : i));
        }
        return [...prev, { id, name, price, size, qty: 1 }];
      });
    }) as EventListener;
    window.addEventListener("nova-add-to-cart", handler);
    return () => window.removeEventListener("nova-add-to-cart", handler);
  }, []);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div style={{ background: "#FFFFFF", color: "#111111" }} className="min-h-dvh flex flex-col font-body">
      <PrototypeBadge proto={proto} dark={false} />

      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-6 sm:px-12 lg:px-20 py-5 bg-white" style={{ borderBottom: "1px solid #eee" }}>
        <span className="font-heading font-black text-xl tracking-[0.15em] uppercase">NOVA</span>
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-widest" aria-label="Shop navigation">
          <a href="#new">New</a>
          <a href="#shop">Shop</a>
          <a href="#" style={{ color: RED }}>Sale</a>
        </nav>
        <button
          onClick={() => setCartOpen(true)}
          className="relative flex items-center gap-2 active:scale-95 transition-transform duration-150"
          aria-label={`Open cart, ${count} items`}
        >
          <ShoppingBag size={20} aria-hidden="true" />
          {count > 0 && (
            <span
              className="absolute -top-2 -right-2 w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold text-white"
              style={{ background: RED }}
            >
              {count}
            </span>
          )}
        </button>
      </header>

      {/* Hero */}
      <section id="new" className="relative flex flex-col items-center justify-center text-center px-6 py-28 lg:py-36" style={{ background: "#111111" }}>
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-bold uppercase tracking-[0.35em] mb-6"
          style={{ color: RED }}
        >
          Fall Drop, 01
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
          className="font-heading font-black uppercase tracking-tight text-white"
          style={{ fontSize: "clamp(2.75rem, 9vw, 6.5rem)", lineHeight: 0.95 }}
        >
          Wear the
          <br />
          Edit.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease: [0.23, 1, 0.32, 1] }}
          className="mt-8"
        >
          <a
            href="#shop"
            className="inline-flex items-center gap-2.5 px-8 py-4 font-bold text-xs uppercase tracking-widest active:scale-[0.97] transition-transform duration-150"
            style={{ background: "#fff", color: "#111" }}
          >
            Shop the Collection
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </motion.div>
      </section>

      {/* Product grid */}
      <section id="shop" className="py-20 px-6 sm:px-12 lg:px-20">
        <Reveal className="flex items-end justify-between mb-10">
          <h2 className="font-heading font-black uppercase tracking-tight" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
            New Arrivals
          </h2>
          <span className="text-sm font-semibold" style={{ color: "#888" }}>{products.length} items</span>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <ProductCard p={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Banner strip */}
      <section className="py-16 px-6 text-center" style={{ background: RED }}>
        <Reveal>
          <p className="font-heading font-black uppercase tracking-tight text-white" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
            Free shipping over $150 · Easy 30-day returns
          </p>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-16 px-6 sm:px-12 lg:px-20" style={{ background: "#111", color: "#999" }}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-6xl mx-auto">
          <span className="font-heading font-black text-lg tracking-[0.15em] uppercase text-white">NOVA</span>
          <p className="text-xs uppercase tracking-widest">A Strive Commerce Prototype</p>
        </div>
      </footer>

      {/* Cart drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[70]"
              style={{ background: "rgba(0,0,0,0.4)" }}
              onClick={() => setCartOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[71] w-full max-w-sm bg-white flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Shopping cart"
            >
              <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid #eee" }}>
                <h2 className="font-heading font-bold uppercase tracking-widest text-sm">Your Bag ({count})</h2>
                <button onClick={() => setCartOpen(false)} aria-label="Close cart" className="active:scale-90 transition-transform duration-150">
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                {cart.length === 0 ? (
                  <p className="text-sm mt-8 text-center" style={{ color: "#999" }}>Your bag is empty. Add something you love.</p>
                ) : (
                  <ul className="flex flex-col gap-5" role="list">
                    {cart.map((item) => (
                      <li key={`${item.id}-${item.size}`} className="flex items-center gap-4">
                        <div className="w-16 h-20 rounded-lg shrink-0" style={{ background: "linear-gradient(160deg,#3a3a3a,#111)" }} />
                        <div className="flex-1">
                          <p className="text-sm font-semibold">{item.name}</p>
                          <p className="text-xs mt-0.5" style={{ color: "#999" }}>Size {item.size}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() =>
                                setCart((prev) =>
                                  prev
                                    .map((i) => (i.id === item.id && i.size === item.size ? { ...i, qty: Math.max(0, i.qty - 1) } : i))
                                    .filter((i) => i.qty > 0)
                                )
                              }
                              className="w-6 h-6 rounded-full flex items-center justify-center border active:scale-90 transition-transform duration-150"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="text-xs font-semibold w-4 text-center">{item.qty}</span>
                            <button
                              onClick={() =>
                                setCart((prev) => prev.map((i) => (i.id === item.id && i.size === item.size ? { ...i, qty: i.qty + 1 } : i)))
                              }
                              className="w-6 h-6 rounded-full flex items-center justify-center border active:scale-90 transition-transform duration-150"
                              aria-label="Increase quantity"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                        </div>
                        <span className="text-sm font-semibold">${item.price * item.qty}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="px-6 py-5" style={{ borderTop: "1px solid #eee" }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold">Subtotal</span>
                  <span className="text-lg font-bold">${total}</span>
                </div>
                <a
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 font-bold text-xs uppercase tracking-widest text-white active:scale-[0.97] transition-transform duration-150"
                  style={{ background: "#111" }}
                >
                  Checkout
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <PrototypeCtaBar proto={proto} />
    </div>
  );
}
