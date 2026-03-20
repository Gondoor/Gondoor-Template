"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: fashion-brand
// sections: luxury-hero, ecom-categories, ecom-cart-cta, review-stars, subscribe-cta, footer-minimal
// ─────────────────────────────────────────────────────────────────────

const COLLECTIONS = [
  { name: "Women's", desc: "Effortless silhouettes in organic cotton and Tencel.", emoji: "👗", count: "48 pieces" },
  { name: "Men's", desc: "Clean cuts in deadstock wool and natural linen.", emoji: "👔", count: "32 pieces" },
  { name: "Accessories", desc: "Bags, belts, and small goods in vegetable-tanned leather.", emoji: "👜", count: "24 pieces" },
  { name: "Outerwear", desc: "Coats and jackets built to last a decade, not a season.", emoji: "🧥", count: "16 pieces" },
  { name: "Activewear", desc: "Recycled-fibre performance pieces that look as good off the trail.", emoji: "🏃", count: "20 pieces" },
  { name: "Sale", desc: "Past-season pieces at up to 40% off. Same quality, better price.", emoji: "🏷️", count: "30 pieces" },
];

const PRODUCTS = [
  { name: "Linen Midi Dress", price: "$148", badge: "Bestseller", color: "Sage" },
  { name: "Heritage Wool Trousers", price: "$195", badge: "New", color: "Charcoal" },
  { name: "Waxed Canvas Tote", price: "$89", badge: null, color: "Natural" },
  { name: "Organic Cotton Overshirt", price: "$125", badge: "Low Stock", color: "Ecru" },
  { name: "Recycled Down Puffer", price: "$289", badge: "New", color: "Forest" },
  { name: "Tencel Wrap Top", price: "$98", badge: "Bestseller", color: "Rust" },
];

const SUSTAINABILITY_BADGES = ["Organic Cotton", "Fair Trade Certified", "Carbon Neutral Shipping", "B-Corp Certified"];

const REVIEWS = [
  { name: "Elise M.", text: "I've bought three items now and the quality is genuinely a step above anything else at this price point.", stars: 5 },
  { name: "Nathan R.", text: "The Heritage Trousers fit perfectly and I know they'll last years. Worth every cent.", stars: 5 },
  { name: "Amara K.", text: "Finally a brand that's actually transparent about its supply chain. The clothes are gorgeous too.", stars: 5 },
  { name: "Jules B.", text: "The packaging is minimal, the fabrics are beautiful, and returns are hassle-free. A rare combination.", stars: 5 },
];

export default function FashionBrandTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <header className="px-6 py-5 flex justify-between items-center border-b border-border max-w-7xl mx-auto">
        <p className="text-xl font-black tracking-widest uppercase text-foreground">
          Verdant<span className="text-primary">.</span>
        </p>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Women</a>
          <a href="#" className="hover:text-foreground transition-colors">Men</a>
          <a href="#" className="hover:text-foreground transition-colors">Accessories</a>
          <a href="#" className="hover:text-foreground transition-colors">Sale</a>
        </nav>
        <Button variant="outline" size="sm" className="border-border">Cart (0)</Button>
      </header>

      {/* HERO: luxury-hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1920&q=80"
          alt="Fashion brand hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24 text-center">
          <Badge className="mb-4 text-xs font-semibold uppercase tracking-widest bg-primary text-primary-foreground animate-fade-in">
            Sustainable Fashion · Est. 2019
          </Badge>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 text-background animate-fade-up [animation-delay:100ms]">
            Verdant Collective —{" "}
            <em className="text-accent">Wear your values.</em>
          </h1>
          <p className="text-xl text-background/80 max-w-xl mx-auto mb-8 animate-fade-up [animation-delay:200ms]">
            Clothing that respects the planet and the people who make it. Every piece is designed to be worn for years, not seasons.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground font-semibold px-8 hover:opacity-90 transition-all duration-300">
              Shop New Arrivals
            </Button>
            <Button size="lg" variant="outline" className="font-semibold px-8 border-border text-background hover:opacity-90 transition-all duration-300">
              Our Story
            </Button>
          </div>
        </div>
      </section>

      <Separator />

      {/* SUSTAINABILITY BADGES */}
      <section className="py-10 px-6 bg-muted">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4">
          {SUSTAINABILITY_BADGES.map((b) => (
            <div key={b} className="flex items-center gap-2 bg-background border border-border rounded-full px-5 py-2 text-sm font-medium hover:scale-105 transition-all duration-300">
              <span className="text-primary">✦</span> {b}
            </div>
          ))}
        </div>
      </section>

      {/* ECOM CATEGORIES: ecom-categories */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Shop by Collection</h2>
          <p className="text-center text-muted-foreground mb-12">Every piece made to outlast the trend cycle.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {COLLECTIONS.map((col) => (
              <div
                key={col.name}
                className="group relative rounded-2xl bg-card border border-border p-6 cursor-pointer hover:border-primary hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <div className="text-4xl mb-3">{col.emoji}</div>
                <h3 className="font-bold text-lg mb-1 text-card-foreground">{col.name}</h3>
                <p className="text-muted-foreground text-sm mb-2">{col.desc}</p>
                <span className="text-xs font-semibold text-primary">{col.count} →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ECOM CART CTA: ecom-cart-cta — featured products */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Featured Pieces</h2>
          <p className="text-center text-muted-foreground mb-12">Our community&apos;s most-loved items right now.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <Card key={product.name} className="border border-border bg-card hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="aspect-square rounded-xl bg-accent mb-3 flex items-center justify-center text-5xl">
                    🌿
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base leading-tight text-card-foreground">{product.name}</CardTitle>
                    {product.badge && (
                      <Badge className="shrink-0 text-xs bg-secondary text-secondary-foreground border border-border">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{product.color}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-foreground">{product.price}</span>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEW STARS: review-stars */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-5xl font-black text-primary">4.8★</span>
            <p className="text-muted-foreground mt-1 text-sm">from 1,600+ verified reviews</p>
          </div>
          <h2 className="text-3xl font-bold text-center mb-10">Worn &amp; Loved</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {REVIEWS.map((r) => (
              <Card key={r.name} className="border border-border bg-card hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-3 text-lg text-primary">
                    {"★".repeat(r.stars)}
                  </div>
                  <p className="text-muted-foreground text-sm italic mb-4">&ldquo;{r.text}&rdquo;</p>
                  <p className="text-sm font-semibold text-card-foreground">{r.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SUBSCRIBE CTA: subscribe-cta */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-2xl mx-auto text-center text-primary-foreground">
          <h2 className="text-4xl font-bold mb-4">Get 15% off your first order.</h2>
          <p className="mb-8 text-primary-foreground/80">
            Join 40,000+ conscious shoppers. New arrivals, sustainability stories, and exclusive offers — no spam, ever.
          </p>
          <div className="bg-background rounded-2xl p-6 shadow-xl">
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 border border-border rounded-lg px-4 py-3 text-foreground bg-background text-sm focus:outline-none"
              />
              <Button className="bg-primary text-primary-foreground font-semibold px-6 hover:opacity-90 transition-all duration-300">
                Subscribe
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground text-center">Unsubscribe anytime. Your data stays private.</p>
          </div>
        </div>
      </section>

      {/* FOOTER: footer-minimal */}
      <footer className="py-10 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="font-black tracking-widest uppercase text-foreground">
            Verdant<span className="text-primary">.</span>
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">About</a>
            <a href="#" className="hover:text-foreground transition-colors">Sustainability</a>
            <a href="#" className="hover:text-foreground transition-colors">Returns</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          </div>
          <p>© 2026 Verdant Collective. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
