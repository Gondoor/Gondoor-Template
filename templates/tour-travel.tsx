"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: tour-travel
// sections: event-hero, ecom-categories, gallery-lightbox, how-it-works, review-stars, booking-cta, footer-minimal
// ─────────────────────────────────────────────────────────────────────

const tourCategories = [
  { name: "Adventure & Hiking", count: "42 tours", desc: "Treks through mountains, jungles, and wild coastlines.", icon: "🏔️" },
  { name: "Cultural Immersion", count: "38 tours", desc: "Local guides, hidden gems, and authentic experiences.", icon: "🏛️" },
  { name: "Beach & Island", count: "55 tours", desc: "Private islands, snorkeling, and sunset catamarans.", icon: "🏝️" },
  { name: "City Escapes", count: "30 tours", desc: "Weekend getaways to the world's most vibrant cities.", icon: "🌆" },
  { name: "Wildlife & Safari", count: "24 tours", desc: "African safaris, whale watching, and eco-lodges.", icon: "🦁" },
  { name: "Culinary & Wine", count: "19 tours", desc: "Farm-to-table journeys, vineyard tours, and cooking classes.", icon: "🍷" },
];

const destinations = [
  { name: "Patagonia Trek", country: "Argentina & Chile", duration: "12 days", from: "From $3,800" },
  { name: "Amalfi Coast", country: "Italy", duration: "8 days", from: "From $2,400" },
  { name: "Bali & Lombok", country: "Indonesia", duration: "10 days", from: "From $1,900" },
  { name: "Serengeti Safari", country: "Tanzania", duration: "9 days", from: "From $4,200" },
  { name: "Kyoto & Beyond", country: "Japan", duration: "11 days", from: "From $3,100" },
  { name: "Greek Islands", country: "Greece", duration: "7 days", from: "From $2,100" },
  { name: "Machu Picchu", country: "Peru", duration: "8 days", from: "From $2,600" },
  { name: "Northern Lights", country: "Iceland", duration: "6 days", from: "From $2,900" },
];

const steps = [
  { num: "01", title: "Browse", icon: "🔍", desc: "Explore our curated catalogue of 200+ journeys across 60+ countries. Filter by destination, duration, style, or budget." },
  { num: "02", title: "Book", icon: "📋", desc: "Reserve your spot with a simple deposit. Our travel specialists handle every detail — flights, stays, transfers, and guides." },
  { num: "03", title: "Explore", icon: "✈️", desc: "Show up and experience it. We handle the logistics, you collect the memories. 24/7 support throughout your journey." },
];

const reviews = [
  "Wanderlust took care of absolutely everything. The Patagonia trek was the best experience of my life.",
  "From the moment I inquired to the last day of the trip, every interaction was professional and warm.",
  "The local guides they select are extraordinary. I felt like an insider everywhere we went.",
];

export default function TourTravelTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* TOUR-TRAVEL-HERO: event-hero — full-bleed image */}
      <section className="relative overflow-hidden min-h-[640px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1920&q=80"
          alt="Tour travel hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-28 max-w-5xl text-center animate-fade-in">
          <Badge className="mb-6 text-xs px-4 py-1 uppercase tracking-widest bg-primary/30 text-primary-foreground border border-primary-foreground/30">
            Curated World Travel
          </Badge>
          <h1 className="text-6xl font-extrabold mb-6 leading-tight text-primary-foreground">
            The world is waiting.<br />
            <span className="text-primary">Let&apos;s go.</span>
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Wanderlust Expeditions designs extraordinary journeys to every corner of the globe. 200+ tours. 60+ countries. 1,500+ happy travelers.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground px-8 py-3 text-base font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Browse Tours
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground px-8 py-3 text-base hover:scale-105 transition-all duration-300">
              Plan My Trip
            </Button>
          </div>
        </div>
      </section>

      <Separator className="border-border" />

      {/* TOUR-TRAVEL-CATEGORIES: ecom-categories */}
      <section className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Explore by Style</h2>
          <p className="text-muted-foreground text-lg">Find the journey that matches your spirit of adventure.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tourCategories.map((c, i) => (
            <div
              key={c.name}
              className="group p-6 border border-border bg-card hover:border-primary hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer rounded-lg animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="text-3xl mb-3">{c.icon}</div>
              <h3 className="font-semibold text-lg mb-1 text-primary">{c.name}</h3>
              <p className="text-xs font-medium mb-2 text-muted-foreground">{c.count}</p>
              <p className="text-muted-foreground text-sm">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TOUR-TRAVEL-GALLERY: gallery-lightbox */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14 animate-fade-up">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Featured Destinations</h2>
            <p className="text-muted-foreground text-lg">A handpicked selection of our most beloved journeys this season.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {destinations.map((d, i) => (
              <Card
                key={d.name}
                className="border border-border bg-card overflow-hidden cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-40 flex items-center justify-center text-4xl bg-primary/10 text-primary">🗺️</div>
                <CardContent className="p-4">
                  <Badge className="text-xs mb-2 bg-primary/10 text-primary border-0">{d.duration}</Badge>
                  <h3 className="font-semibold text-sm mb-0.5 text-card-foreground">{d.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{d.country}</p>
                  <p className="font-bold text-sm text-primary">{d.from}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" className="px-8 border-primary text-primary hover:scale-105 transition-all duration-300">
              View All Tours
            </Button>
          </div>
        </div>
      </section>

      {/* TOUR-TRAVEL-HOW-IT-WORKS: how-it-works */}
      <section className="container mx-auto px-6 py-24 max-w-4xl">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 text-foreground">How It Works</h2>
          <p className="text-muted-foreground text-lg">Three steps to the adventure of a lifetime.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-2xl mx-auto mb-4 hover:scale-105 transition-all duration-300">
                {s.icon}
              </div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{s.num}</p>
              <h3 className="text-xl font-bold mb-3 text-foreground">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TOUR-TRAVEL-REVIEWS: review-stars */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="text-5xl mb-4 text-primary animate-fade-in">★★★★★</div>
          <p className="text-3xl font-bold mb-2 text-foreground">4.8 out of 5</p>
          <p className="text-muted-foreground text-lg mb-8">Rated by 1,500+ travelers worldwide</p>
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

      {/* TOUR-TRAVEL-BOOKING: booking-cta */}
      <section className="container mx-auto px-6 py-24 max-w-2xl text-center">
        <h2 className="text-4xl font-bold mb-4 text-foreground animate-fade-up">Tell Us Your Dream Trip</h2>
        <p className="text-muted-foreground text-lg mb-8">Our travel specialists will design a custom itinerary just for you — free of charge, no obligation.</p>
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <input className="border border-border bg-card text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your name" />
          <input className="border border-border bg-card text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Destination in mind" />
          <div className="grid grid-cols-2 gap-4">
            <input className="border border-border bg-card text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Travel dates" />
            <input className="border border-border bg-card text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Group size" />
          </div>
          <Button size="lg" className="bg-primary text-primary-foreground w-full py-3 rounded-lg text-base font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg">
            Send My Inquiry
          </Button>
        </div>
        <p className="mt-4 text-muted-foreground text-sm">We respond within 24 hours with a custom proposal.</p>
      </section>

      {/* TOUR-TRAVEL-FOOTER: footer-minimal */}
      <footer className="py-10 border-t border-border">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground">
          <p className="font-bold text-lg text-primary">Wanderlust Expeditions</p>
          <p className="text-sm">© 2026 Wanderlust Expeditions. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
