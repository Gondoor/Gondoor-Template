"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent } from "@/components/ui/card";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: dropshipping
// sections: luxury-hero, ecom-categories, ecom-cart-cta, trust-badges, review-stars, footer-minimal
// theme: globals.css CSS variables
// hero-image: https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1920&q=80
// ─────────────────────────────────────────────────────────────────────

const categories = [
  { name: "Tech & Gadgets", count: "120+ products" },
  { name: "Home & Kitchen", count: "95+ products" },
  { name: "Fitness & Sports", count: "78+ products" },
  { name: "Beauty & Personal Care", count: "64+ products" },
  { name: "Outdoor & Adventure", count: "52+ products" },
  { name: "Kids & Family", count: "47+ products" },
];

const products = [
  { name: "Wireless Earbuds Pro", price: "$39.99", badge: "Top Seller", rating: "4.8" },
  { name: "Portable Blender", price: "$29.99", badge: "New Arrival", rating: "4.7" },
  { name: "LED Desk Lamp", price: "$24.99", badge: "", rating: "4.9" },
  { name: "Resistance Band Set", price: "$19.99", badge: "Best Value", rating: "4.6" },
  { name: "Smart Watch Band", price: "$14.99", badge: "", rating: "4.7" },
  { name: "Kitchen Organiser Set", price: "$34.99", badge: "Top Seller", rating: "4.8" },
];

const trustBadges = [
  { icon: "🔒", title: "Secure Checkout", desc: "SSL encrypted payments via Stripe and PayPal." },
  { icon: "🚚", title: "Fast Shipping", desc: "Most orders delivered within 5–9 business days." },
  { icon: "↩️", title: "Easy Returns", desc: "30-day hassle-free return policy on all items." },
  { icon: "🌟", title: "Quality Guaranteed", desc: "Every product is vetted and reviewed before listing." },
];

const reviews = [
  { name: "Karen P.", text: "The earbuds arrived in 6 days and sound incredible. Way better than expected for the price.", stars: 5 },
  { name: "Derek S.", text: "Ordered the kitchen organiser set and it transformed my pantry. Great quality, fast delivery.", stars: 5 },
  { name: "Michelle R.", text: "The resistance bands are solid. Perfect for my home workouts. Will definitely order again.", stars: 4 },
  { name: "Luis F.", text: "The LED lamp is bright and adjustable. Delivery was faster than the estimate. Very happy.", stars: 5 },
];

export default function DropshippingTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO: luxury-hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1920&q=80"
          alt="Hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24">
          <Badge className="mb-4 animate-fade-in bg-primary text-primary-foreground">Free shipping on orders over $50</Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-background mb-6 animate-fade-up [animation-delay:100ms]">
            Quality products.<br />Fast shipping.
          </h1>
          <p className="text-xl text-background/80 mb-8 max-w-2xl animate-fade-up [animation-delay:200ms]">
            Hundreds of hand-selected products across tech, home, fitness, and more. Delivered to your door quickly and reliably.
          </p>
          <div className="flex gap-4 animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground hover:scale-105 transition-all duration-300">
              Shop now
            </Button>
            <Button size="lg" variant="outline" className="border-background text-background hover:bg-background hover:text-foreground transition-all duration-300">
              View all categories
            </Button>
          </div>
        </div>
      </section>

      {/* CATEGORIES: ecom-categories */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 animate-fade-up">Shop by category</h2>
          <p className="text-muted-foreground text-lg">Find exactly what you are looking for.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              className="bg-muted border border-border rounded-2xl p-8 text-center cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <h3 className="font-semibold text-base mb-1">{cat.name}</h3>
              <p className="text-muted-foreground text-sm">{cat.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS: ecom-cart-cta */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-up">Trending right now</h2>
            <p className="text-muted-foreground text-lg">Our top-rated products this week.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <Card
                key={product.name}
                className="bg-card text-card-foreground border-border rounded-2xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="aspect-[4/3] bg-secondary flex items-center justify-center relative">
                  <span className="text-4xl text-muted-foreground">◻</span>
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs">{product.badge}</Badge>
                  )}
                </div>
                <CardContent className="pt-4 pb-5">
                  <h3 className="font-semibold text-base mb-1">{product.name}</h3>
                  <p className="text-muted-foreground text-xs mb-3">★ {product.rating} · Verified reviews</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-primary">{product.price}</span>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:scale-105 transition-all duration-300">
                      Add to cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BADGES: trust-badges */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 animate-fade-up">Why shop with us</h2>
          <p className="text-muted-foreground text-lg">We stand behind every order we ship.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustBadges.map((badge, i) => (
            <div
              key={badge.title}
              className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl mb-4">{badge.icon}</div>
              <h3 className="font-semibold text-base mb-2">{badge.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{badge.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS: review-stars */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-1 mb-4">
              {Array(5).fill(0).map((_, i) => <span key={i} className="text-2xl text-primary">★</span>)}
            </div>
            <p className="text-5xl font-bold mb-2">4.7 / 5</p>
            <p className="text-muted-foreground mb-12">Based on 8,400+ customer reviews</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {reviews.map((r, i) => (
              <Card
                key={r.name}
                className="bg-card text-card-foreground border-border rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="flex gap-0.5 mb-3">
                    {Array(r.stars).fill(0).map((_, j) => <span key={j} className="text-primary text-sm">★</span>)}
                  </div>
                  <p className="text-sm leading-relaxed mb-4">&quot;{r.text}&quot;</p>
                  <p className="text-xs font-semibold text-muted-foreground">{r.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER: footer-minimal */}
      <footer className="border-t border-border py-10 px-6 bg-muted">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-lg text-primary">ShopZone</span>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-all duration-300">Shipping</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Returns</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Track Order</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Contact</a>
          </div>
          <p className="text-muted-foreground text-xs">© 2026 ShopZone. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
