"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: bar-nightlife
// sections: event-hero, restaurant-menu, gallery-lightbox, reservation-cta, review-stars, footer-local
// ─────────────────────────────────────────────────────────────────────

const menuCategories = [
  {
    name: "Signature Cocktails",
    items: [
      { name: "Amber Old Fashioned", desc: "Bourbon, house bitters, smoked orange peel", price: "$17" },
      { name: "The Velvet Hour", desc: "Aged rum, falernum, lime, activated charcoal", price: "$16" },
      { name: "Garden Negroni", desc: "Gin, Campari, rosemary vermouth, cucumber", price: "$15" },
    ],
  },
  {
    name: "Classics",
    items: [
      { name: "Manhattan", desc: "Rye whiskey, sweet vermouth, Angostura bitters", price: "$14" },
      { name: "Paloma", desc: "Blanco tequila, grapefruit, lime, salt", price: "$13" },
      { name: "Espresso Martini", desc: "Vodka, cold brew, coffee liqueur", price: "$15" },
    ],
  },
  {
    name: "Spirits",
    items: [
      { name: "Whiskey Selection", desc: "American, Scotch, Japanese — ask your bartender", price: "$12–$22" },
      { name: "Mezcal Flight", desc: "Three artisanal mezcals, served with orange & sal de gusano", price: "$28" },
      { name: "Gin Tasting Board", desc: "Four craft gins, tonic, botanicals", price: "$26" },
    ],
  },
  {
    name: "Wine",
    items: [
      { name: "Champagne", desc: "Billecart-Salmon Brut Réserve by the glass", price: "$19" },
      { name: "Natural Red", desc: "Rotating selection — ask your server", price: "$13" },
      { name: "Orange Wine", desc: "Skin-contact white, rotating producer", price: "$14" },
    ],
  },
  {
    name: "Mocktails",
    items: [
      { name: "Zero Proof Mule", desc: "Ginger brew, lime, mint, soda", price: "$9" },
      { name: "Spiced Hibiscus Fizz", desc: "Hibiscus syrup, lemon, soda, rosemary", price: "$10" },
      { name: "Cold Brew Tonic", desc: "Single origin cold brew, tonic, citrus", price: "$8" },
    ],
  },
  {
    name: "Bites",
    items: [
      { name: "Truffle Fries", desc: "Parmesan, chive, black truffle oil", price: "$14" },
      { name: "Burrata Crostini", desc: "Heirloom tomato, basil, aged balsamic", price: "$16" },
      { name: "Wagyu Sliders", desc: "Two mini wagyu burgers, special sauce", price: "$22" },
    ],
  },
];

const galleryItems = [
  "Main Bar at Golden Hour",
  "Rooftop Terrace — Friday Night",
  "Craft Cocktail in Progress",
  "VIP Booth Experience",
  "Amber Room Interior",
  "Live DJ Set — Saturday",
];

const hours = [
  { day: "Mon–Wed", hours: "5pm – 1am" },
  { day: "Thu", hours: "5pm – 2am" },
  { day: "Fri–Sat", hours: "4pm – 3am" },
  { day: "Sun", hours: "5pm – 12am" },
];

export default function BarNightlifeTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* BAR-HERO: event-hero — full-bleed image */}
      <section className="relative overflow-hidden min-h-[620px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1546038050-1f86dd2baf7c?auto=format&fit=crop&w=1920&q=80"
          alt="The Amber Room bar"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-28 max-w-5xl text-center animate-fade-in">
          <Badge className="mb-6 text-xs px-4 py-1 uppercase tracking-widest bg-primary/30 text-primary-foreground border border-primary-foreground/30">
            Craft Cocktail Bar &amp; Lounge
          </Badge>
          <h1 className="text-7xl font-black mb-6 leading-tight tracking-tight text-primary-foreground uppercase">
            The Amber Room
          </h1>
          <p className="text-2xl font-semibold tracking-widest text-primary mb-8 uppercase">
            Craft Cocktails. Good Vibes.
          </p>
          <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto mb-10">
            An intimate cocktail bar where every drink tells a story. Live music Thursdays, DJ sets Fri–Sat.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground px-8 py-3 text-base font-bold uppercase tracking-wider hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Reserve a Table
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground px-8 py-3 text-base hover:scale-105 transition-all duration-300">
              View Menu
            </Button>
          </div>
        </div>
      </section>

      <Separator className="border-border" />

      {/* BAR-MENU: restaurant-menu */}
      <section className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Our Menu</h2>
          <p className="text-muted-foreground text-lg">Craft cocktails, curated spirits, and elevated bites.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuCategories.map((cat, ci) => (
            <div
              key={cat.name}
              className="animate-fade-up"
              style={{ animationDelay: `${ci * 100}ms` }}
            >
              <h3 className="font-bold text-lg text-primary mb-4 pb-2 border-b border-border uppercase tracking-wider">{cat.name}</h3>
              <div className="space-y-4">
                {cat.items.map((item) => (
                  <div key={item.name} className="flex justify-between items-start gap-3 group">
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{item.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                    <p className="font-bold text-sm text-primary shrink-0">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BAR-GALLERY: gallery-lightbox */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14 animate-fade-up">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Inside The Amber Room</h2>
            <p className="text-muted-foreground text-lg">The ambiance is everything. Come see for yourself.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryItems.map((label, i) => (
              <div
                key={label}
                className="rounded-lg overflow-hidden cursor-pointer group hover:shadow-lg hover:scale-105 transition-all duration-300 bg-card border border-border animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-44 flex items-center justify-center text-4xl bg-primary/10 text-primary">🍸</div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-card-foreground">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BAR-RESERVATION: reservation-cta */}
      <section className="container mx-auto px-6 py-24 max-w-2xl text-center">
        <h2 className="text-4xl font-bold mb-4 text-foreground animate-fade-up">Reserve Your Table</h2>
        <p className="text-muted-foreground text-lg mb-8">Tables held for 15 minutes. Walk-ins always welcome based on availability.</p>
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <input className="border border-border bg-card text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your name" />
          <div className="grid grid-cols-2 gap-4">
            <input className="border border-border bg-card text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Date" />
            <input className="border border-border bg-card text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Time" />
          </div>
          <input className="border border-border bg-card text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Party size" />
          <Button size="lg" className="bg-primary text-primary-foreground w-full py-3 text-base font-bold uppercase tracking-wider hover:scale-105 transition-all duration-300 hover:shadow-lg">
            Confirm Reservation
          </Button>
        </div>
      </section>

      {/* BAR-REVIEWS: review-stars */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <div className="text-5xl mb-4 text-primary animate-fade-in">★★★★★</div>
          <p className="text-3xl font-bold mb-2 text-foreground">4.7 on Yelp</p>
          <p className="text-muted-foreground text-lg mb-8">500+ reviews from our regulars</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "Best craft cocktail bar in the city. The Amber Old Fashioned is a revelation.",
              "Incredible atmosphere, knowledgeable bartenders, and the mocktails are creative and delicious.",
              "The wagyu sliders paired with the espresso martini is the move. This place never disappoints.",
            ].map((q, i) => (
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

      {/* BAR-FOOTER: footer-local */}
      <footer className="py-12 border-t border-border bg-foreground text-background">
        <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3 text-background uppercase tracking-widest">The Amber Room</h3>
            <p className="text-sm leading-relaxed text-background/70">Craft cocktails and good vibes — every night of the week.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-background">Hours</h4>
            {hours.map((h) => (
              <p key={h.day} className="text-sm text-background/70">{h.day}: {h.hours}</p>
            ))}
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-background">Find Us</h4>
            <p className="text-sm text-background/70">72 Craft Street, Downtown</p>
            <p className="text-sm text-background/70">(555) 830-4411</p>
            <p className="text-sm text-background/70">hello@theamberroom.com</p>
          </div>
        </div>
        <div className="container mx-auto px-6 max-w-6xl mt-8 pt-6 border-t border-background/20 text-center text-xs text-background/50">
          © 2026 The Amber Room. All rights reserved. Please drink responsibly.
        </div>
      </footer>
    </div>
  );
}
