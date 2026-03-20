"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: subscription-box
// sections: luxury-hero, how-it-works, ecom-cart-cta, pricing-tiers, review-stars, subscribe-cta, footer-minimal
// theme: globals.css CSS variables
// hero-image: https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1920&q=80
// ─────────────────────────────────────────────────────────────────────

const steps = [
  { step: "01", title: "Pick your plan", desc: "Choose Essential, Deluxe, or Premium. Customise your preferences so every box feels personal." },
  { step: "02", title: "We curate your box", desc: "Our team selects 5–10 full-size products tailored to your taste profile every month." },
  { step: "03", title: "Discover something new", desc: "Your box arrives beautifully packaged. Keep what you love and share the rest." },
];

const tiers = [
  { name: "Essential", price: "$29", per: "/mo", items: "5 full-size products", features: ["Monthly delivery", "Personalised selection", "Cancel any time"], highlighted: false },
  { name: "Deluxe", price: "$49", per: "/mo", items: "8 full-size products", features: ["Monthly delivery", "Personalised selection", "Members-only discounts", "Cancel any time"], highlighted: true },
  { name: "Premium", price: "$79", per: "/mo", items: "10+ full-size products", features: ["Monthly delivery", "Exclusive & luxury items", "Early access to new brands", "Free gift every 3 months", "Cancel any time"], highlighted: false },
];

const featured = [
  { name: "Artisan Face Serum", brand: "Lumière Lab", value: "$48" },
  { name: "Hand-poured Soy Candle", brand: "Ember & Wick", value: "$32" },
  { name: "Cold Brew Coffee Set", brand: "Origin Roasters", value: "$24" },
  { name: "Natural Lip Palette", brand: "Bare Beauty", value: "$36" },
  { name: "Silk Eye Mask", brand: "Dusk & Dawn", value: "$28" },
  { name: "Botanical Bath Salts", brand: "River Ritual", value: "$22" },
];

const reviews = [
  { name: "Sophie H.", text: "I've been a subscriber for 8 months. Every box genuinely surprises me. The curation is spot on for my taste.", stars: 5 },
  { name: "David W.", text: "Bought the Deluxe plan for my wife as a gift and she absolutely loves it. The packaging alone is beautiful.", stars: 5 },
  { name: "Chloe R.", text: "Discovered three brands I'd never heard of and now I order from all of them directly. The value is incredible.", stars: 5 },
];

export default function SubscriptionBoxTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO: luxury-hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1920&q=80"
          alt="Hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24">
          <Badge className="mb-4 animate-fade-in bg-primary text-primary-foreground">New boxes ship the 1st of every month</Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-background mb-6 animate-fade-up [animation-delay:100ms]">
            Discover something<br />new every month.
          </h1>
          <p className="text-xl text-background/80 mb-8 max-w-2xl animate-fade-up [animation-delay:200ms]">
            A curated monthly box of full-size products in wellness, beauty, and lifestyle — handpicked by our editors and tailored to your taste.
          </p>
          <div className="flex gap-4 animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground hover:scale-105 transition-all duration-300">
              Start your subscription
            </Button>
            <Button size="lg" variant="outline" className="border-background text-background hover:bg-background hover:text-foreground transition-all duration-300">
              See what&apos;s inside
            </Button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS: how-it-works */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 animate-fade-up">How it works</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Three simple steps to a box you will love every month.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <div key={s.step} className="text-center animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">{s.step}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED ITEMS: ecom-cart-cta */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-up">Featured this month</h2>
            <p className="text-muted-foreground text-lg">A sneak peek at what could be in your next box.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((item, i) => (
              <Card
                key={item.name}
                className="bg-card text-card-foreground border-border rounded-2xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="aspect-[4/3] bg-secondary flex items-center justify-center">
                  <span className="text-4xl text-muted-foreground">◻</span>
                </div>
                <CardContent className="pt-4 pb-5">
                  <p className="text-xs text-primary font-semibold mb-1 uppercase tracking-wide">{item.brand}</p>
                  <h3 className="font-semibold text-base mb-2">{item.name}</h3>
                  <p className="text-muted-foreground text-sm">Retail value: <span className="font-semibold text-foreground">{item.value}</span></p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING: pricing-tiers */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 animate-fade-up">Choose your box</h2>
          <p className="text-muted-foreground">All plans include free shipping. Cancel any time.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <Card
              key={tier.name}
              className={`rounded-2xl border-border hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-up ${tier.highlighted ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold mb-1">{tier.name}</CardTitle>
                <p className={`text-xs mb-3 ${tier.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{tier.items}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className={`mb-1 ${tier.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{tier.per}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm">
                      <span>✓</span> {feat}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full rounded-xl hover:scale-105 transition-all duration-300 ${tier.highlighted ? "bg-background text-foreground hover:bg-background/90" : "bg-primary text-primary-foreground"}`}
                >
                  Get this box
                </Button>
              </CardContent>
            </Card>
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
            <p className="text-5xl font-bold mb-2">4.9 / 5</p>
            <p className="text-muted-foreground mb-12">Based on 12,000+ subscriber reviews</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
                  <p className="text-sm leading-relaxed mb-4 italic">&quot;{r.text}&quot;</p>
                  <p className="text-xs font-semibold text-muted-foreground">{r.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SUBSCRIBE CTA: subscribe-cta */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4 animate-fade-up">Get early access to next month&apos;s box</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-md mx-auto">
            Join the waitlist and we will let you know the moment subscriptions open.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto animate-fade-up [animation-delay:100ms]">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-background border-background text-foreground placeholder:text-muted-foreground rounded-xl"
            />
            <Button className="bg-background text-foreground hover:bg-background/90 hover:scale-105 transition-all duration-300 px-6 shrink-0">
              Join waitlist
            </Button>
          </div>
          <p className="text-primary-foreground/60 text-xs mt-4">No spam. Unsubscribe at any time.</p>
        </div>
      </section>

      {/* FOOTER: footer-minimal */}
      <footer className="border-t border-border py-10 px-6 bg-muted">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-lg text-primary">BoxCo</span>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-all duration-300">About</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">FAQ</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Shipping</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Contact</a>
          </div>
          <p className="text-muted-foreground text-xs">© 2026 BoxCo. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
