"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: retail
// sections: luxury-hero, ecom-categories, ecom-cart-cta, review-stars, map-location, footer-local
// theme: globals.css CSS variables
// hero-image: https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=1920&q=80
// ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { name: "Furniture", desc: "Timeless pieces built to last a lifetime.", icon: "🛋️", count: "48 pieces" },
  { name: "Textiles", desc: "Linen, cotton, and cashmere for every room.", icon: "🧵", count: "60 items" },
  { name: "Ceramics", desc: "Handmade pottery from local artisans.", icon: "🏺", count: "32 items" },
  { name: "Lighting", desc: "Ambient and task lighting for every mood.", icon: "💡", count: "27 items" },
  { name: "Plants", desc: "Curated indoor plants and planters.", icon: "🌿", count: "41 items" },
  { name: "Kitchen", desc: "Tools and tableware that make cooking a joy.", icon: "🍳", count: "55 items" },
];

const FEATURED = [
  { name: "Linen Throw Blanket", price: "$79", tag: "Bestseller" },
  { name: "Walnut Side Table", price: "$249", tag: "New Arrival" },
  { name: "Matte Ceramic Vase Set", price: "$65", tag: "" },
  { name: "Brass Pendant Light", price: "$195", tag: "Staff Pick" },
  { name: "Monstera Deliciosa", price: "$48", tag: "" },
  { name: "Cast Iron Skillet", price: "$89", tag: "Bestseller" },
];

const REVIEWS = [
  { name: "Lydia H.", text: "Haven is my favourite store in the city. Every piece feels considered and beautiful.", stars: 5 },
  { name: "Omar W.", text: "Redecorated my entire living room with things from Haven. It finally feels like home.", stars: 5 },
  { name: "Sarah K.", text: "The ceramics collection is stunning. Bought three pieces and they're perfect gifts too.", stars: 5 },
  { name: "Evan T.", text: "Staff is wonderful and helpful. Never felt rushed. Went in for one plant, left with five.", stars: 5 },
];

export default function RetailTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-border bg-background">
        <p className="text-2xl font-semibold italic text-foreground">Haven</p>
        <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Shop</a>
          <a href="#" className="hover:text-foreground transition-colors">Collections</a>
          <a href="#" className="hover:text-foreground transition-colors">About</a>
          <a href="#" className="hover:text-foreground transition-colors">Visit</a>
        </div>
        <Button size="sm" variant="outline" className="border-border">Cart (0)</Button>
      </nav>

      {/* HERO: luxury-hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=1920&q=80"
          alt="Hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-28 text-center">
          <Badge className="mb-5 text-xs uppercase tracking-widest bg-accent text-accent-foreground animate-fade-in">
            Now open in Portland
          </Badge>
          <h1 className="text-6xl md:text-8xl font-semibold italic mb-6 leading-tight text-background animate-fade-up">
            Your home should <span className="text-primary">feel like you.</span>
          </h1>
          <p className="text-lg text-background/80 max-w-xl mx-auto mb-10 animate-fade-up [animation-delay:150ms]">
            Haven is a curated home goods and lifestyle store. We source beautiful, durable objects that bring warmth and intention to every space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground px-10 font-medium hover:scale-105 transition-all duration-300">
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="border-background text-background hover:bg-background/10 px-10 transition-all duration-300">
              Visit the Store
            </Button>
          </div>
        </div>
      </section>

      <Separator className="border-border" />

      {/* ECOM CATEGORIES: ecom-categories */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-semibold italic text-center mb-3 animate-fade-up">Shop by Category</h2>
          <p className="text-center text-muted-foreground mb-12 text-sm animate-fade-up [animation-delay:100ms]">Everything your home could need, beautifully made.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((c, i) => (
              <div
                key={c.name}
                className="text-center p-5 rounded-2xl border border-border bg-card hover:shadow-lg hover:scale-[1.02] cursor-pointer transition-all duration-300"
                style={{ animationDelay: `${i * 75}ms` }}
              >
                <span className="text-4xl mb-3 block">{c.icon}</span>
                <h3 className="font-semibold text-sm mb-1 text-card-foreground">{c.name}</h3>
                <p className="text-xs text-muted-foreground">{c.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-4 px-6 pb-20 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-semibold italic text-center mb-10 animate-fade-up">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED.map((p, i) => (
              <Card
                key={p.name}
                className="border border-border bg-card text-card-foreground overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-48 flex items-center justify-center bg-muted">
                  <span className="text-muted-foreground text-sm">Product photo</span>
                </div>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">{p.name}</p>
                      <p className="font-semibold mt-1 text-primary">{p.price}</p>
                    </div>
                    {p.tag && (
                      <Badge className="text-xs bg-accent text-accent-foreground">{p.tag}</Badge>
                    )}
                  </div>
                  <Button className="w-full mt-4 text-sm border-border hover:scale-105 transition-all duration-300" variant="outline">Add to Cart</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ECOM CART CTA: ecom-cart-cta */}
      <section className="py-16 px-6 text-center bg-muted">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-semibold italic mb-4 animate-fade-up">Free shipping on orders over $150</h2>
          <p className="text-muted-foreground mb-8 text-sm animate-fade-up [animation-delay:100ms]">Same-day dispatch on in-stock items. Free returns within 30 days.</p>
          <Button size="lg" className="bg-primary text-primary-foreground px-12 font-medium hover:scale-105 transition-all duration-300 animate-fade-up [animation-delay:200ms]">
            Browse Full Collection
          </Button>
        </div>
      </section>

      {/* REVIEW STARS: review-stars */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-5xl font-bold mb-1 text-accent-foreground animate-fade-up">4.7★</div>
          <p className="text-muted-foreground text-sm mb-10 animate-fade-up [animation-delay:100ms]">from 850+ verified customers</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {REVIEWS.map((r, i) => (
              <Card
                key={r.name}
                className="border border-border bg-card text-card-foreground hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="text-sm mb-2 text-accent-foreground">{"★".repeat(r.stars)}</div>
                  <p className="text-muted-foreground text-sm italic mb-3">&quot;{r.text}&quot;</p>
                  <p className="text-sm font-semibold">{r.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* MAP LOCATION: map-location */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <h2 className="text-3xl font-semibold italic mb-4">Visit Us In-Store</h2>
            <p className="text-muted-foreground mb-6">Our flagship store is open daily and features our full catalogue plus exclusive in-store-only collections.</p>
            <div className="space-y-2 text-sm text-foreground">
              <p>📍 822 NW 23rd Ave, Portland, OR 97210</p>
              <p>📞 (503) 555-0211</p>
              <p>✉️ hello@havenhome.co</p>
              <p>🕗 Mon–Sun: 10am – 7pm</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border h-64 bg-background flex items-center justify-center animate-fade-up [animation-delay:150ms]">
            <p className="text-muted-foreground text-sm">Map embed placeholder</p>
          </div>
        </div>
      </section>

      {/* FOOTER: footer-local */}
      <footer className="py-10 px-6 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="font-semibold italic text-lg text-foreground">Haven</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Shop</a>
            <a href="#" className="hover:text-foreground transition-colors">Collections</a>
            <a href="#" className="hover:text-foreground transition-colors">About</a>
            <a href="#" className="hover:text-foreground transition-colors">Stockists</a>
          </div>
          <p>© 2026 Haven. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
