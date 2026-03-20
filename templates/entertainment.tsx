"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent } from "@/components/ui/card";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: entertainment
// sections: event-hero, gallery-lightbox, tech-stats, testimonial-cards, booking-cta, footer-minimal
// ─────────────────────────────────────────────────────────────────────

const galleryItems = [
  { label: "Arena Concert · 2,000 cap", size: "wide" },
  { label: "Corporate Gala · Rooftop", size: "tall" },
  { label: "Festival Stage · Outdoor", size: "wide" },
  { label: "Private Party · Club Night", size: "tall" },
  { label: "Wedding Reception · DJ Set", size: "wide" },
  { label: "Brand Activation · Pop-Up", size: "tall" },
];

const stats = [
  ["500+", "Events Performed"],
  ["8 Years", "In the Game"],
  ["50+", "Artists on Roster"],
  ["4.9★", "Average Rating"],
];

const testimonials = [
  { name: "Tasha Omoruyi", role: "Event Director, Nova Corp", quote: "Neon Sound turned our company gala into the most talked-about night of the year. Absolute professionals." },
  { name: "Diego Fuentes", role: "Wedding Client", quote: "Our guests danced until midnight. The DJ read the room perfectly — every song was exactly right." },
  { name: "Priya Kapoor", role: "Festival Organizer, Luminos", quote: "Seamless from load-in to breakdown. They delivered exactly what they promised, on time, every time." },
];

export default function EntertainmentTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO: event-hero */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1493225255440-a57f9e23e4ab?auto=format&fit=crop&w=1920&q=80"
          alt="Entertainment hero"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 max-w-4xl animate-fade-in">
          <Badge className="mb-8 px-4 py-1.5 text-xs uppercase tracking-widest rounded-full border border-primary-foreground/60 text-primary-foreground bg-transparent [animation-delay:100ms]">
            Live Entertainment · DJ Services · Event Production
          </Badge>
          <h1 className="text-7xl md:text-9xl font-black leading-none mb-4 tracking-wider text-primary-foreground animate-fade-up [animation-delay:100ms]">
            NEON SOUND<br />
            <span className="text-primary-foreground/80">ENTERTAINMENT</span>
          </h1>
          <p className="text-primary-foreground/80 text-xl mb-4 animate-fade-up [animation-delay:200ms]">WE MAKE THE NIGHT.</p>
          <p className="text-primary-foreground/60 text-base max-w-lg mx-auto mb-10 leading-relaxed animate-fade-up [animation-delay:200ms]">
            NYC&apos;s premier live entertainment company — DJ bookings, full event production, and a roster of 50+ world-class artists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="px-10 rounded-none font-semibold text-base tracking-widest uppercase bg-primary text-primary-foreground hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Book Now
            </Button>
            <Button size="lg" variant="outline" className="px-10 rounded-none font-semibold text-base tracking-widest uppercase border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:scale-105 transition-all duration-300">
              Our Artists
            </Button>
          </div>
        </div>
      </section>

      {/* GALLERY: gallery-lightbox */}
      <section className="container mx-auto px-6 py-24">
        <h2 className="text-5xl md:text-6xl font-black text-center mb-14 tracking-wider text-foreground">
          RECENT EVENTS
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`relative overflow-hidden cursor-pointer group hover:scale-105 transition-all duration-300 ${item.size === "tall" ? "row-span-2" : ""} bg-muted`}
              style={{ aspectRatio: item.size === "tall" ? "3/4" : "16/9" }}
            >
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <span className="text-5xl opacity-20">🎵</span>
              </div>
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-all duration-300 flex items-end p-4">
                <p className="text-background text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity font-medium">{item.label}</p>
              </div>
              <div className="absolute inset-0 pointer-events-none border border-border/20" />
            </div>
          ))}
        </div>
      </section>

      {/* STATS: tech-stats */}
      <section className="py-16 border-y border-border">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(([val, label]) => (
            <div key={label} className="hover:scale-105 transition-all duration-300">
              <p className="text-5xl font-black mb-2 tracking-wider text-primary">{val}</p>
              <p className="text-muted-foreground text-sm uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS: testimonial-cards */}
      <section className="container mx-auto px-6 py-24">
        <h2 className="text-5xl font-black text-center mb-14 tracking-wider text-foreground">
          WHAT CLIENTS SAY
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} className="rounded-none border border-border bg-card hover:shadow-lg hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((s) => <span key={s} className="text-primary">★</span>)}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-none flex items-center justify-center text-sm font-bold bg-primary text-primary-foreground">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* BOOKING: booking-cta */}
      <section className="py-24 px-6 bg-primary">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-6xl font-black mb-5 tracking-wider text-primary-foreground">
            BOOK YOUR EVENT
          </h2>
          <p className="text-primary-foreground/70 mb-10 text-base">Tell us about your event and we&apos;ll send a custom quote within 24 hours.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 max-w-xl mx-auto">
            <input type="text" placeholder="Your Name" className="px-4 py-3 rounded-none border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary-foreground" />
            <input type="email" placeholder="Email Address" className="px-4 py-3 rounded-none border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary-foreground" />
            <input type="text" placeholder="Event Type" className="px-4 py-3 rounded-none border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary-foreground" />
            <input type="text" placeholder="Event Date" className="px-4 py-3 rounded-none border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary-foreground" />
          </div>
          <Button size="lg" className="px-12 rounded-none font-semibold tracking-widest uppercase bg-background text-foreground hover:scale-105 transition-all duration-300 hover:shadow-lg">
            Request a Quote
          </Button>
        </div>
      </section>

      {/* FOOTER: footer-minimal */}
      <footer className="border-t border-border py-10 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-black text-2xl tracking-widest text-primary">NEON SOUND</span>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
            <a href="#" className="hover:text-foreground transition-colors">SoundCloud</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <p className="text-muted-foreground text-xs">© 2026 Neon Sound Entertainment. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
