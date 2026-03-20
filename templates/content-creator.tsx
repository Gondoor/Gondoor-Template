"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: content-creator
// sections: editorial-hero, ecom-cart-cta, tech-stats, subscribe-cta, footer-minimal
// ─────────────────────────────────────────────────────────────────────

const products = [
  { name: "YouTube Thumbnail Pack", price: "$29", desc: "50 editable Canva templates proven to boost CTR.", badge: "Best Seller" },
  { name: "Video Script Templates", price: "$49", desc: "30 fill-in-the-blank script frameworks for any niche.", badge: "New" },
  { name: "Social Media Calendar", price: "$19", desc: "90-day posting strategy with done-for-you captions.", badge: null },
  { name: "Creator Toolkit Bundle", price: "$79", desc: "All three products plus exclusive bonus training.", badge: "Best Value" },
];

const stats = [
  ["520K", "Subscribers"],
  ["12M+", "Total views"],
  ["4 Years", "Creating"],
  ["47", "Countries reached"],
];

export default function ContentCreatorTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO: editorial-hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1611162617213-7d7a2a7e5b9c?auto=format&fit=crop&w=1920&q=80"
          alt="Content creator hero"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="max-w-2xl animate-fade-in">
            <Badge className="mb-5 px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full border border-primary-foreground text-primary-foreground bg-transparent [animation-delay:100ms]">
              Creator Resources
            </Badge>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-primary-foreground animate-fade-up [animation-delay:100ms]">
              Alex Rivera<br />
              <span className="text-primary">Creates.</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-4 max-w-md animate-fade-up [animation-delay:200ms]">
              Helping 500K creators level up their content, grow their channels, and turn views into real income.
            </p>
            <p className="text-sm text-primary-foreground/60 mb-8 animate-fade-up [animation-delay:200ms]">
              YouTube · Podcasts · Digital Products · Newsletter
            </p>
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-up [animation-delay:300ms]">
              <Button size="lg" className="px-8 rounded-xl font-semibold bg-primary text-primary-foreground hover:scale-105 transition-all duration-300 hover:shadow-lg">
                Shop Digital Products
              </Button>
              <Button size="lg" variant="outline" className="px-8 rounded-xl font-semibold border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:scale-105 transition-all duration-300">
                Watch on YouTube
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-border" />

      {/* PRODUCTS: ecom-cart-cta */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold mb-3 text-foreground">Digital Products</h2>
          <p className="text-muted-foreground text-lg">Tools I personally use — now available for you.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Card key={p.name} className="rounded-2xl border border-border bg-card hover:shadow-lg hover:scale-105 transition-all duration-300">
              <CardHeader className="pb-2">
                {p.badge && (
                  <Badge className="mb-2 self-start text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                    {p.badge}
                  </Badge>
                )}
                <CardTitle className="text-base font-bold leading-snug text-card-foreground">{p.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{p.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-primary">{p.price}</span>
                  <Button size="sm" className="rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:scale-105 transition-all duration-300 hover:shadow-lg">
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* STATS: tech-stats */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(([val, label]) => (
            <div key={label} className="hover:scale-105 transition-all duration-300">
              <p className="text-4xl font-extrabold text-primary-foreground mb-1">{val}</p>
              <p className="text-primary-foreground/70 text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SUBSCRIBE: subscribe-cta */}
      <section className="container mx-auto px-6 py-24 max-w-2xl text-center">
        <Badge className="mb-5 px-3 py-1 text-xs uppercase tracking-widest rounded-full border border-primary text-primary bg-transparent">
          Free Resource
        </Badge>
        <h2 className="text-4xl font-extrabold mb-4 text-foreground">
          Get the Free 30-Day<br />Content Calendar
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          Join 50,000+ creators who get weekly strategies, templates, and insider tips straight to their inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground"
          />
          <Button className="px-6 rounded-xl font-semibold whitespace-nowrap bg-primary text-primary-foreground hover:scale-105 transition-all duration-300 hover:shadow-lg">
            Send it to me →
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-3">No spam. Unsubscribe any time.</p>
      </section>

      {/* FOOTER: footer-minimal */}
      <footer className="border-t border-border py-10 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-extrabold text-xl text-primary">Alex Rivera Creates</span>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">YouTube</a>
            <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
          <p className="text-muted-foreground text-xs">© 2026 Alex Rivera. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
