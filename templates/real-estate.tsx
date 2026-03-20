"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: real-estate
// sections: luxury-hero, ecom-categories, gallery-lightbox, testimonial-cards, team-grid, booking-cta, footer-minimal
// ─────────────────────────────────────────────────────────────────────

const categories = [
  { name: "Residential", count: "240 listings", desc: "Single-family homes from starter to luxury.", icon: "🏡" },
  { name: "Commercial", count: "85 listings", desc: "Office, retail, and mixed-use opportunities.", icon: "🏢" },
  { name: "Luxury Estates", count: "32 listings", desc: "Exceptional homes in the most coveted neighborhoods.", icon: "✨" },
  { name: "Condos & Lofts", count: "118 listings", desc: "Urban living with premium amenities.", icon: "🏙️" },
  { name: "New Developments", count: "14 projects", desc: "Pre-construction and newly completed builds.", icon: "🏗️" },
  { name: "Investment", count: "62 listings", desc: "Multi-family and income-producing properties.", icon: "📈" },
];

const properties = [
  { name: "The Meridian Penthouse", type: "Luxury Condo", price: "$4.2M", beds: 4, baths: 3 },
  { name: "Oakwood Estate", type: "Single Family", price: "$2.8M", beds: 6, baths: 5 },
  { name: "Harbor View Loft", type: "Urban Loft", price: "$1.1M", beds: 2, baths: 2 },
  { name: "Ridgeline Villa", type: "Luxury Estate", price: "$6.5M", beds: 8, baths: 7 },
  { name: "The Carrington", type: "Condominium", price: "$895K", beds: 3, baths: 2 },
  { name: "Elm Street Townhome", type: "Townhouse", price: "$740K", beds: 3, baths: 3 },
  { name: "Westview Bungalow", type: "Residential", price: "$620K", beds: 3, baths: 2 },
  { name: "Summit Office Park", type: "Commercial", price: "$3.4M", beds: 0, baths: 8 },
];

const testimonials = [
  { name: "Richard & Anne H.", role: "Buyers — Oakwood Estate", quote: "Crestview found us our dream home in under 30 days. Their knowledge of the luxury market is unmatched. We couldn't be happier." },
  { name: "Pamela J.", role: "Seller — Ridgeline Villa", quote: "We received four offers above asking price within 72 hours of listing. Crestview's marketing strategy was exceptional." },
  { name: "Marcus D.", role: "Investor", quote: "Three properties acquired, all below-market. Their off-market network is unlike anything I've seen in 20 years of investing." },
];

const agents = [
  { name: "Victoria Holt", role: "Principal Broker", years: "18 years", sales: "$320M+" },
  { name: "James Carlisle", role: "Senior Listing Agent", years: "12 years", sales: "$180M+" },
  { name: "Sophia Chen", role: "Buyer's Specialist", years: "8 years", sales: "$95M+" },
  { name: "Rafael Santos", role: "Commercial Lead", years: "10 years", sales: "$140M+" },
  { name: "Claire Whitmore", role: "Luxury Estates Agent", years: "6 years", sales: "$75M+" },
];

export default function RealEstateTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* REAL-ESTATE-HERO: luxury-hero — full-bleed image */}
      <section className="relative overflow-hidden min-h-[620px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80"
          alt="Real estate hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-28 max-w-6xl text-center animate-fade-in">
          <p className="text-sm tracking-widest uppercase mb-6 font-medium text-primary">Luxury Real Estate</p>
          <h1 className="text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Find your<br />perfect place.
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Crestview Properties is the region&apos;s most trusted luxury real estate agency. Whether you&apos;re buying, selling, or investing, we deliver results with discretion and expertise.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground px-8 py-3 text-base font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Browse Properties
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground px-8 py-3 text-base hover:scale-105 transition-all duration-300">
              Book a Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* REAL-ESTATE-CATEGORIES: ecom-categories */}
      <section className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Explore by Category</h2>
          <p className="text-muted-foreground text-lg">From starter homes to landmark estates — we cover every market segment.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((c, i) => (
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

      <Separator className="border-border" />

      {/* REAL-ESTATE-GALLERY: gallery-lightbox */}
      <section className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Featured Properties</h2>
          <p className="text-muted-foreground text-lg">A curated selection of our most distinguished listings.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {properties.map((p, i) => (
            <Card
              key={p.name}
              className="border border-border bg-card overflow-hidden group cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="h-44 flex items-center justify-center text-primary-foreground text-4xl bg-primary/80">🏠</div>
              <CardContent className="p-4">
                <Badge className="text-xs mb-2 bg-primary/10 text-primary border-0">{p.type}</Badge>
                <h3 className="font-semibold text-sm mb-1 text-card-foreground">{p.name}</h3>
                <p className="text-lg font-bold text-primary">{p.price}</p>
                {p.beds > 0 && <p className="text-xs text-muted-foreground mt-1">{p.beds} bd · {p.baths} ba</p>}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button variant="outline" className="px-8 border-primary text-primary hover:scale-105 transition-all duration-300">
            View All Listings
          </Button>
        </div>
      </section>

      {/* REAL-ESTATE-TESTIMONIALS: testimonial-cards */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-bold mb-14 text-center text-foreground animate-fade-up">Client Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card
                key={t.name}
                className="border border-border bg-card hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="p-8">
                  <p className="mb-2 text-lg text-primary">★★★★★</p>
                  <p className="text-muted-foreground italic text-sm leading-relaxed mb-6">&quot;{t.quote}&quot;</p>
                  <p className="font-semibold text-sm text-primary">{t.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* REAL-ESTATE-TEAM: team-grid */}
      <section className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Our Agents</h2>
          <p className="text-muted-foreground text-lg">A team of specialists with deep local knowledge and proven track records.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {agents.map((a, i) => (
            <Card
              key={a.name}
              className="border border-border bg-card text-center hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardContent className="p-5">
                <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center bg-primary text-primary-foreground font-bold">
                  {a.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <h3 className="font-semibold text-sm mb-1 text-card-foreground">{a.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{a.role}</p>
                <Badge variant="secondary" className="text-xs">{a.sales}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* REAL-ESTATE-BOOKING: booking-cta */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-4 text-primary-foreground">Schedule a Property Tour</h2>
          <p className="text-primary-foreground/80 text-lg mb-8">Our agents are available 7 days a week for private showings and consultations.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-background text-foreground px-8 font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Book a Tour
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground px-8 hover:scale-105 transition-all duration-300">
              Call (555) 400-7890
            </Button>
          </div>
        </div>
      </section>

      {/* REAL-ESTATE-FOOTER: footer-minimal */}
      <footer className="py-10 border-t border-border">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground">
          <p className="font-bold text-xl text-primary">Crestview Properties</p>
          <p className="text-sm">© 2026 Crestview Properties. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">MLS Disclosure</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
