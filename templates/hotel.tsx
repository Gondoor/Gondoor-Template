"use client";


import { Button } from "@/components/ui/button";
import { Card,CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: hotel
// sections: luxury-hero, gallery-lightbox, local-services, review-stars, reservation-cta, map-location, footer-local
// ─────────────────────────────────────────────────────────────────────

const galleryItems = [
  { label: "The Grand Suite", desc: "King bed, city views, private terrace" },
  { label: "Infinity Pool Deck", desc: "Heated year-round, open sunrise to midnight" },
  { label: "The Drawing Room Bar", desc: "Curated cocktails & afternoon tea daily" },
  { label: "Executive Deluxe Room", desc: "Double king with garden-view balcony" },
  { label: "The Ashmore Spa", desc: "Full-service treatments & hot stone therapy" },
  { label: "Private Dining Room", desc: "Chef's table for up to 12 guests" },
  { label: "Garden Courtyard", desc: "Al fresco breakfast & evening receptions" },
  { label: "Rooftop Terrace", desc: "Panoramic skyline views, exclusive access" },
];

const amenities = [
  { name: "Spa & Wellness Center", desc: "Full-service spa with massages, facials, saunas, and steam rooms.", icon: "🌿" },
  { name: "Fine Dining Restaurant", desc: "Chef-curated seasonal menus with local ingredients.", icon: "🍽️" },
  { name: "Infinity Pool", desc: "Heated rooftop pool open year-round with cabana service.", icon: "🏊" },
  { name: "Fitness Studio", desc: "State-of-the-art equipment and daily yoga & pilates classes.", icon: "💪" },
  { name: "Concierge Services", desc: "Private transfers, curated city tours, and exclusive reservations.", icon: "🗝️" },
  { name: "Event Spaces", desc: "Intimate meeting rooms and grand ballroom for weddings & galas.", icon: "🎊" },
];

const reviews = [
  "The Ashmore is simply the best hotel I've stayed in anywhere in the world. Every detail is exquisite.",
  "From arrival to departure, every interaction felt personal and warm. We will return every year.",
  "The spa and breakfast alone are worth every penny. An extraordinary experience.",
];

export default function HotelTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HOTEL-HERO: luxury-hero — full-bleed image */}
      <section className="relative overflow-hidden min-h-[640px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1920&q=80"
          alt="The Ashmore Hotel"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-28 max-w-5xl text-center animate-fade-in">
          <p className="text-sm tracking-widest uppercase mb-6 font-medium text-primary">Boutique Luxury Hotel</p>
          <h1 className="text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Where luxury<br />meets intimacy.
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            The Ashmore Hotel — an intimate collection of 48 rooms and suites crafted for those who demand exceptional experiences in every detail.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground px-8 py-3 text-base font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Check Availability
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground px-8 py-3 text-base hover:scale-105 transition-all duration-300">
              Explore the Hotel
            </Button>
          </div>
        </div>
      </section>

      <Separator className="border-border" />

      {/* HOTEL-GALLERY: gallery-lightbox */}
      <section className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Rooms &amp; Experiences</h2>
          <p className="text-muted-foreground text-lg">Every space designed to inspire — from the suites to the rooftop.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryItems.map((g, i) => (
            <div
              key={g.label}
              className="rounded-lg overflow-hidden cursor-pointer group hover:shadow-lg hover:scale-105 transition-all duration-300 bg-card border border-border animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="h-40 flex items-center justify-center text-4xl bg-primary/10 text-primary">🏨</div>
              <div className="p-3">
                <p className="text-xs font-semibold text-card-foreground">{g.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOTEL-AMENITIES: local-services */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14 animate-fade-up">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Hotel Amenities</h2>
            <p className="text-muted-foreground text-lg">Everything you need for an extraordinary stay.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((a, i) => (
              <Card
                key={a.name}
                className="border border-border bg-card hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">{a.icon}</div>
                  <h3 className="font-semibold text-lg mb-2 text-primary">{a.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{a.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOTEL-REVIEWS: review-stars */}
      <section className="container mx-auto px-6 py-20 max-w-4xl text-center">
        <div className="text-5xl mb-4 text-primary animate-fade-in">★★★★★</div>
        <p className="text-3xl font-bold mb-2 text-foreground">4.9 on TripAdvisor</p>
        <p className="text-muted-foreground text-lg mb-8">Ranked #1 Boutique Hotel — 850+ reviews</p>
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
      </section>

      {/* HOTEL-RESERVATION: reservation-cta */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-4 text-primary-foreground">Reserve Your Stay</h2>
          <p className="text-primary-foreground/80 text-lg mb-10">Select your dates and we&apos;ll confirm availability within 2 hours. Best rate guaranteed direct.</p>
          <div className="flex flex-col gap-4 max-w-lg mx-auto">
            <div className="grid grid-cols-2 gap-4">
              <input className="border border-border bg-background text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground" placeholder="Check-in date" />
              <input className="border border-border bg-background text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground" placeholder="Check-out date" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input className="border border-border bg-background text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground" placeholder="Guests" />
              <input className="border border-border bg-background text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground" placeholder="Room type" />
            </div>
            <Button size="lg" className="bg-background text-foreground w-full py-4 text-base font-semibold rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Check Availability
            </Button>
          </div>
        </div>
      </section>

      {/* HOTEL-MAP: map-location */}
      <section className="container mx-auto px-6 py-20 max-w-5xl">
        <div className="text-center mb-10 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Find Us</h2>
          <p className="text-muted-foreground text-lg">Steps from the city&apos;s finest dining, galleries, and cultural landmarks.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="bg-muted border border-border rounded-xl h-64 flex items-center justify-center">
            <div className="text-center">
              <p className="text-4xl mb-3">📍</p>
              <p className="font-semibold text-foreground">The Ashmore Hotel</p>
              <p className="text-muted-foreground text-sm">12 Ashmore Place, City Centre</p>
            </div>
          </div>
          <div className="space-y-4 animate-fade-up" style={{ animationDelay: "100ms" }}>
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-1">Address</h3>
              <p className="text-muted-foreground text-sm">12 Ashmore Place, City Centre</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-1">Nearby</h3>
              <p className="text-muted-foreground text-sm">5 min walk to cultural district</p>
              <p className="text-muted-foreground text-sm">10 min to central train station</p>
              <p className="text-muted-foreground text-sm">25 min from international airport</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-1">Contact</h3>
              <p className="text-muted-foreground text-sm">(555) 920-4400</p>
              <p className="text-muted-foreground text-sm">reservations@theashmorehotel.com</p>
            </div>
            <Button className="bg-primary text-primary-foreground hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Get Directions
            </Button>
          </div>
        </div>
      </section>

      {/* HOTEL-FOOTER: footer-local */}
      <footer className="py-12 border-t border-border bg-foreground text-background">
        <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3 text-background">The Ashmore Hotel</h3>
            <p className="text-sm leading-relaxed text-background/70">Where luxury meets intimacy. 48 rooms &amp; suites in the heart of the city.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-background">Check-In / Check-Out</h4>
            <p className="text-sm text-background/70">Check-in: 3:00 PM</p>
            <p className="text-sm text-background/70">Check-out: 12:00 PM</p>
            <p className="text-sm text-background/70">Early/late available on request</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-background">Contact</h4>
            <p className="text-sm text-background/70">12 Ashmore Place, City Centre</p>
            <p className="text-sm text-background/70">(555) 920-4400</p>
            <p className="text-sm text-background/70">reservations@theashmorehotel.com</p>
          </div>
        </div>
        <div className="container mx-auto px-6 max-w-6xl mt-8 pt-6 border-t border-background/20 text-center text-xs text-background/50">
          © 2026 The Ashmore Hotel. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
