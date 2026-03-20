"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: food-delivery
// sections: marketplace-hero, ecom-categories, how-it-works, tech-stats, review-stars, download-cta, footer-minimal
// ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { name: "Pizza", emoji: "🍕", count: "34 restaurants" },
  { name: "Burgers", emoji: "🍔", count: "28 restaurants" },
  { name: "Sushi", emoji: "🍱", count: "19 restaurants" },
  { name: "Thai", emoji: "🍜", count: "15 restaurants" },
  { name: "Mexican", emoji: "🌮", count: "22 restaurants" },
  { name: "Healthy", emoji: "🥗", count: "31 restaurants" },
];

const STEPS = [
  { n: "01", icon: "📱", title: "Open the app", desc: "Browse 200+ local restaurants filtered by cuisine, rating, price, and delivery time." },
  { n: "02", icon: "🛒", title: "Choose your meal", desc: "Customize your order, add extras, and check out in under 60 seconds." },
  { n: "03", icon: "🛵", title: "Track your delivery", desc: "Watch your driver in real-time on the map. Your food arrives hot, fresh, and on time." },
];

const STATS = [
  { value: "200+", label: "Local restaurants" },
  { value: "30 min", label: "Avg delivery time" },
  { value: "50K+", label: "Orders delivered" },
  { value: "4.8★", label: "App store rating" },
];

const REVIEWS = [
  { name: "Carmen D.", text: "Dash Eats is the only delivery app I use now. The tracking is accurate and food always arrives warm.", stars: 5 },
  { name: "Ben H.", text: "So many local restaurants I never knew about. Discovered my new favourite Thai place through Dash.", stars: 5 },
  { name: "Sofia L.", text: "30-minute delivery is not an exaggeration. I&apos;ve timed it — consistently under 28 minutes.", stars: 5 },
  { name: "Raj M.", text: "Clean app, zero unnecessary steps to checkout, and the drivers are always polite and professional.", stars: 5 },
];

export default function FoodDeliveryTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <header className="px-6 py-4 flex justify-between items-center border-b border-border max-w-7xl mx-auto sticky top-0 bg-background z-10">
        <p className="font-black text-xl tracking-tight text-foreground">
          <span className="text-primary">Dash</span>Eats
        </p>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Restaurants</a>
          <a href="#" className="hover:text-foreground transition-colors">Offers</a>
          <a href="#" className="hover:text-foreground transition-colors">For Business</a>
        </nav>
        <Button size="sm" className="bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all duration-300">
          Get the App
        </Button>
      </header>

      {/* HERO: marketplace-hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1920&q=80"
          alt="Food delivery hero"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24 text-center">
          <Badge className="mb-4 text-sm font-semibold bg-primary text-primary-foreground animate-fade-in">
            200+ Restaurants · Fast Delivery
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-background animate-fade-up [animation-delay:100ms]">
            Dash Eats —{" "}
            <span className="text-accent">Your favorites, delivered fast.</span>
          </h1>
          <p className="text-xl text-background/80 max-w-2xl mx-auto mb-8 animate-fade-up [animation-delay:200ms]">
            Connects you with 200+ local restaurants for delivery in 30 minutes or less. Real food from real kitchens — no ghost restaurants, no surprises.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 animate-fade-up [animation-delay:300ms]">
            <div className="flex bg-background border border-border rounded-xl overflow-hidden shadow-sm w-full max-w-md">
              <input
                type="text"
                placeholder="Enter your delivery address..."
                className="flex-1 px-4 py-3 text-sm text-foreground bg-background focus:outline-none"
              />
              <Button className="rounded-none rounded-r-xl bg-primary text-primary-foreground font-semibold px-5 hover:opacity-90 transition-all duration-300">
                Find Food
              </Button>
            </div>
          </div>
          <p className="text-sm text-background/60 animate-fade-up [animation-delay:300ms]">Join 50,000+ happy customers in your city</p>
        </div>
      </section>

      <Separator />

      {/* ECOM CATEGORIES: ecom-categories */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-3">What are you craving?</h2>
          <p className="text-center text-muted-foreground mb-12">Browse by cuisine and find your next favourite restaurant.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className="group flex flex-col items-center gap-2 p-5 rounded-2xl border border-border bg-card cursor-pointer hover:border-primary hover:shadow-lg hover:scale-105 transition-all duration-300 text-center"
              >
                <span className="text-5xl">{cat.emoji}</span>
                <h3 className="font-bold text-sm text-card-foreground">{cat.name}</h3>
                <p className="text-xs text-muted-foreground">{cat.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS: how-it-works */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-3">How Dash Eats works</h2>
          <p className="text-center text-muted-foreground mb-14">From hungry to happy in three simple steps.</p>
          <div className="flex flex-col md:flex-row gap-8">
            {STEPS.map((step, i) => (
              <div key={step.n} className="flex-1 text-center relative">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 bg-accent border border-border shadow-sm">
                  {step.icon}
                </div>
                <div className="text-xs font-black mb-2 tracking-widest uppercase text-primary">{step.n}</div>
                <h3 className="font-black text-lg mb-2 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-muted-foreground text-2xl">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STATS: tech-stats */}
      <section className="py-16 px-6 border-y border-border">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-black mb-1 text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEW STARS: review-stars */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-5xl font-black text-primary">4.8★</span>
            <p className="text-muted-foreground mt-1 text-sm">rated on App Store &amp; Google Play · 50,000+ reviews</p>
          </div>
          <h2 className="text-3xl font-black text-center mb-10">Customers love Dash Eats</h2>
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

      {/* DOWNLOAD CTA: download-cta */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-primary-foreground">
            <h2 className="text-4xl font-black mb-4">Get the Dash Eats app.</h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              Download free on iOS and Android. Your first delivery is fee-free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-background text-foreground font-semibold hover:opacity-90 transition-all duration-300">
                ⬇ App Store
              </Button>
              <Button size="lg" className="bg-background text-foreground font-semibold hover:opacity-90 transition-all duration-300">
                ⬇ Google Play
              </Button>
            </div>
            <p className="mt-4 text-sm text-primary-foreground/60">No sign-up required to browse restaurants.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-40 h-40 bg-background rounded-2xl flex items-center justify-center shadow-lg">
              <div className="w-28 h-28 bg-muted rounded-lg flex items-center justify-center text-4xl">📱</div>
            </div>
            <p className="text-primary-foreground/70 text-sm text-center">Scan QR code to download</p>
          </div>
        </div>
      </section>

      {/* FOOTER: footer-minimal */}
      <footer className="py-10 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="font-black text-foreground">
            <span className="text-primary">Dash</span>Eats
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Restaurants</a>
            <a href="#" className="hover:text-foreground transition-colors">Partner With Us</a>
            <a href="#" className="hover:text-foreground transition-colors">Careers</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          </div>
          <p>© 2026 Dash Eats. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
