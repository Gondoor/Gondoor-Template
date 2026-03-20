"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: catering
// sections: restaurant-hero, restaurant-menu, gallery-lightbox, pricing-packages, review-stars, booking-cta, footer-local
// ─────────────────────────────────────────────────────────────────────

const menuPackages = [
  { name: "Breakfast & Brunch", desc: "Artisan pastries, egg stations, smoked salmon boards, seasonal fruit.", icon: "🥞" },
  { name: "Corporate Lunch", desc: "Buffet-style platters, gourmet sandwiches, grain bowls, and dessert.", icon: "🥗" },
  { name: "Cocktail Reception", desc: "Passed hors d'oeuvres, charcuterie displays, and signature drinks.", icon: "🍾" },
  { name: "Plated Dinner", desc: "Multi-course chef-curated dinners for weddings and galas.", icon: "🍽️" },
  { name: "BBQ & Outdoor", desc: "Live fire stations, smoked meats, seasonal sides, and desserts.", icon: "🔥" },
  { name: "Dessert & Sweet Table", desc: "Custom cakes, macarons, petit fours, and interactive dessert bars.", icon: "🎂" },
];

const galleryItems = [
  { label: "Coastal Wedding Reception", guests: "320 guests" },
  { label: "Corporate Annual Gala", guests: "500 guests" },
  { label: "Intimate Garden Party", guests: "75 guests" },
  { label: "Tech Conference Lunch", guests: "800 guests" },
  { label: "Rooftop Cocktail Hour", guests: "150 guests" },
  { label: "Holiday Company Dinner", guests: "200 guests" },
  { label: "Vineyard Wedding Dinner", guests: "180 guests" },
  { label: "Non-Profit Fundraiser Gala", guests: "450 guests" },
];

const packages = [
  { name: "Starter", price: "$35", unit: "per person", desc: "Buffet setup, service staff, basic rentals. Perfect for corporate events.", highlight: false },
  { name: "Classic", price: "$55", unit: "per person", desc: "Plated or stations, full-service staff, linens & rentals, menu customization.", highlight: true },
  { name: "Premium", price: "$85", unit: "per person", desc: "Chef-attended stations, premium décor, full event management, custom menu.", highlight: false },
];

const reviews = [
  "Golden Table catered our 300-person wedding and every single guest raved about the food. Flawless execution.",
  "Our corporate gala had guests asking for the caterer's card all night. Professional, delicious, and stress-free.",
  "The dessert spread alone was worth every cent. A true culinary experience from start to finish.",
];

export default function CateringTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* CATERING-HERO: restaurant-hero — full-bleed image */}
      <section className="relative overflow-hidden min-h-[620px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1555244162-06a7e5b1e1a1?auto=format&fit=crop&w=1920&q=80"
          alt="Catering hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-28 max-w-5xl text-center animate-fade-in">
          <Badge className="mb-6 text-sm px-4 py-1 bg-primary/30 text-primary-foreground border border-primary-foreground/30">
            Event Catering &amp; Fine Dining
          </Badge>
          <h1 className="text-6xl font-bold mb-6 leading-tight text-primary-foreground">
            Extraordinary meals<br />
            <span className="text-primary">for unforgettable events.</span>
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Golden Table Catering crafts bespoke culinary experiences for weddings, corporate events, galas, and private gatherings of any size.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-base hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Request a Quote
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground px-8 py-3 rounded-full text-base hover:scale-105 transition-all duration-300">
              View Menus
            </Button>
          </div>
        </div>
      </section>

      <Separator className="border-border" />

      {/* CATERING-MENU: restaurant-menu */}
      <section className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Menu Collections</h2>
          <p className="text-muted-foreground text-lg">Six culinary experiences tailored to your event type and vision.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuPackages.map((m, i) => (
            <Card
              key={m.name}
              className="border border-border bg-card hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="text-3xl mb-3">{m.icon}</div>
                <h3 className="font-semibold text-lg mb-2 text-primary">{m.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CATERING-GALLERY: gallery-lightbox */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14 animate-fade-up">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Events We&apos;ve Catered</h2>
            <p className="text-muted-foreground text-lg">A glimpse into our portfolio of extraordinary occasions.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryItems.map((g, i) => (
              <div
                key={g.label}
                className="rounded-lg overflow-hidden cursor-pointer group relative hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-up bg-card border border-border"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-36 flex items-center justify-center text-4xl bg-primary/10 text-primary">🍽️</div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-card-foreground">{g.label}</p>
                  <p className="text-xs text-muted-foreground">{g.guests}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATERING-PRICING: pricing-packages */}
      <section className="container mx-auto px-6 py-24 max-w-5xl">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Catering Packages</h2>
          <p className="text-muted-foreground text-lg">Transparent pricing — customized to your guest count and vision.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {packages.map((p, i) => (
            <Card
              key={p.name}
              className={`border-2 border-border bg-card hover:shadow-lg transition-all duration-300 animate-fade-up ${p.highlight ? "scale-105 border-primary shadow-xl" : ""}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardHeader className="pb-2">
                {p.highlight && (
                  <Badge className="w-fit mb-2 text-xs bg-primary text-primary-foreground">Most Popular</Badge>
                )}
                <CardTitle className="text-xl text-card-foreground">{p.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-3">
                  <span className="text-4xl font-bold text-primary">{p.price}</span>
                  <span className="text-muted-foreground text-sm ml-1">{p.unit}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{p.desc}</p>
                <Button className={`w-full ${p.highlight ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"} hover:scale-105 transition-all duration-300`}>
                  Get a Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CATERING-REVIEWS: review-stars */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="text-5xl mb-4 text-primary animate-fade-in">★★★★★</div>
          <p className="text-3xl font-bold mb-2 text-foreground">4.8 out of 5</p>
          <p className="text-muted-foreground text-lg mb-8">From 300+ events catered across the region</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((q, i) => (
              <Card
                key={i}
                className="border border-border bg-card hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="p-5 text-sm text-muted-foreground italic">&quot;{q}&quot;</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CATERING-BOOKING: booking-cta */}
      <section className="container mx-auto px-6 py-24 max-w-2xl text-center">
        <h2 className="text-4xl font-bold mb-4 text-foreground animate-fade-up">Let&apos;s Plan Your Event</h2>
        <p className="text-muted-foreground text-lg mb-8">Tell us about your event and we&apos;ll craft the perfect menu. Free consultation, no obligation.</p>
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <input className="border border-border bg-card text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your name" />
          <input className="border border-border bg-card text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Event date" />
          <input className="border border-border bg-card text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Expected guest count" />
          <Button size="lg" className="bg-primary text-primary-foreground w-full py-3 rounded-full text-base hover:scale-105 transition-all duration-300 hover:shadow-lg">
            Request My Quote
          </Button>
        </div>
      </section>

      {/* CATERING-FOOTER: footer-local */}
      <footer className="py-12 border-t border-border bg-foreground text-background">
        <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3 text-background">Golden Table Catering</h3>
            <p className="text-sm leading-relaxed text-background/70">Extraordinary meals for every occasion. Serving the greater metro area.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-background">Service Area</h4>
            <p className="text-sm text-background/70">Metro area &amp; surrounding regions</p>
            <p className="text-sm text-background/70">Travel available for destination events</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-background">Contact</h4>
            <p className="text-sm text-background/70">(555) 710-2200</p>
            <p className="text-sm text-background/70">events@goldentablecatering.com</p>
          </div>
        </div>
        <div className="container mx-auto px-6 max-w-6xl mt-8 pt-6 border-t border-background/20 text-center text-xs text-background/50">
          © 2026 Golden Table Catering. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
