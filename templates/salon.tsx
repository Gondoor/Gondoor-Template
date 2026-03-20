"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: salon
// sections: luxury-hero, local-services, gallery-lightbox, team-grid, pricing-packages, booking-cta, review-stars, footer-local
// theme: globals.css CSS variables
// hero-image: https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1920&q=80
// ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { name: "Haircut & Style", desc: "Precision cuts tailored to your face shape and lifestyle.", price: "From $65" },
  { name: "Color & Highlights", desc: "Vibrant, long-lasting color by expert colorists.", price: "From $120" },
  { name: "Balayage", desc: "Sun-kissed, hand-painted color for natural dimension.", price: "From $180" },
  { name: "Keratin Treatment", desc: "Smooth, frizz-free hair for up to 3 months.", price: "From $250" },
  { name: "Manicure & Pedicure", desc: "Luxurious nail care with premium products.", price: "From $55" },
  { name: "Facial", desc: "Customised skin treatments for a radiant glow.", price: "From $95" },
];

const GALLERY = [
  "Balayage transformation", "Bridal updo", "Color melt", "Precision bob",
  "Nail art design", "Classic french manicure", "Deep tissue facial", "Ombré highlight",
];

const TEAM = [
  { name: "Isabelle Moreau", role: "Master Colorist", years: "12 years exp.", img: "IM" },
  { name: "Chloe Renard", role: "Senior Stylist", years: "9 years exp.", img: "CR" },
  { name: "Naomi Dubois", role: "Nail & Beauty Specialist", years: "7 years exp.", img: "ND" },
  { name: "Sophie Laurent", role: "Skincare Therapist", years: "10 years exp.", img: "SL" },
];

const PACKAGES = [
  { name: "Essential", price: "$95", perks: ["Haircut & Blowdry", "Basic Manicure", "Scalp Massage", "Style Consultation"] },
  { name: "Signature", price: "$175", perks: ["Everything in Essential", "Color or Highlights", "Gel Manicure", "Deep Conditioning"], highlight: true },
  { name: "VIP", price: "$295", perks: ["Everything in Signature", "Balayage Treatment", "Spa Pedicure", "30-min Facial", "Champagne Welcome"] },
];

const REVIEWS = [
  { name: "Audrey K.", text: "Lumière is the only salon I trust with my hair. Isabelle is an absolute artist.", stars: 5 },
  { name: "Nina F.", text: "The Signature package was pure luxury. I left feeling completely transformed.", stars: 5 },
  { name: "Rachel B.", text: "Clean, chic, and professional. My balayage looked exactly like the inspo photo!", stars: 5 },
];

export default function SalonTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO: luxury-hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1920&q=80"
          alt="Hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24 text-center">
          <p className="text-sm uppercase tracking-widest mb-4 font-medium text-background/70 animate-fade-in">
            A boutique experience
          </p>
          <h1 className="text-6xl md:text-8xl font-light italic mb-6 leading-tight text-background animate-fade-up">
            Beauty <span className="text-primary">elevated.</span>
          </h1>
          <p className="text-lg text-background/80 max-w-xl mx-auto mb-10 animate-fade-up [animation-delay:150ms]">
            Lumière is a premium beauty salon where artistry meets self-care. Step in and let our expert team create your signature look.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground px-10 font-medium hover:scale-105 transition-all duration-300">
              Book an Appointment
            </Button>
            <Button size="lg" variant="outline" className="border-background text-background hover:bg-background/10 px-10 transition-all duration-300">
              View Services
            </Button>
          </div>
        </div>
      </section>

      <Separator className="border-border" />

      {/* LOCAL SERVICES: local-services */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-light italic text-center mb-3 animate-fade-up">Our Services</h2>
          <p className="text-center text-muted-foreground mb-12 text-sm animate-fade-up [animation-delay:100ms]">Crafted for every version of you.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <Card
                key={s.name}
                className="border border-border bg-card text-card-foreground hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-primary">{s.name}</CardTitle>
                  <p className="text-xs font-medium text-accent-foreground">{s.price}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY LIGHTBOX: gallery-lightbox */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-light italic text-center mb-10 animate-fade-up">Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {GALLERY.map((label, i) => (
              <div
                key={label}
                className="aspect-square rounded-xl overflow-hidden flex items-end p-3 cursor-pointer bg-secondary hover:opacity-90 hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${i * 75}ms` }}
              >
                <span className="text-xs text-secondary-foreground font-medium leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM GRID: team-grid */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-light italic text-center mb-10 animate-fade-up">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((m, i) => (
              <div key={m.name} className="text-center animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center bg-primary text-primary-foreground text-lg font-bold">
                  {m.img}
                </div>
                <h3 className="font-semibold text-sm">{m.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{m.role}</p>
                <Badge className="mt-2 text-xs" variant="outline">{m.years}</Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PACKAGES: pricing-packages */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-light italic text-center mb-10 animate-fade-up">Packages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PACKAGES.map((p, i) => (
              <Card
                key={p.name}
                className={`border border-border bg-card text-card-foreground transition-all duration-300 hover:shadow-lg ${p.highlight ? "shadow-xl scale-105" : ""}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardHeader className="text-center">
                  {p.highlight && <Badge className="mx-auto mb-2 text-xs bg-primary text-primary-foreground">Most Popular</Badge>}
                  <CardTitle className="text-primary">{p.name}</CardTitle>
                  <p className="text-3xl font-bold mt-2">{p.price}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {p.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2">
                        <span className="text-primary">✓</span> {perk}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-6 font-medium transition-all duration-300 hover:scale-105 ${p.highlight ? "bg-primary text-primary-foreground" : "border-border"}`}
                    variant={p.highlight ? "default" : "outline"}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING CTA: booking-cta */}
      <section className="py-20 px-6 text-center bg-primary">
        <div className="max-w-xl mx-auto text-primary-foreground">
          <h2 className="text-4xl font-light italic mb-4 animate-fade-up">Reserve Your Moment</h2>
          <p className="mb-8 text-primary-foreground/80 animate-fade-up [animation-delay:100ms]">New clients receive 20% off their first visit. No code needed — just book.</p>
          <div className="bg-background rounded-2xl p-6 text-left shadow-xl animate-fade-up [animation-delay:200ms]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Your Name</label>
                <input type="text" placeholder="Jane Smith" className="w-full border border-border rounded-lg px-3 py-2 text-foreground text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Email</label>
                <input type="email" placeholder="jane@email.com" className="w-full border border-border rounded-lg px-3 py-2 text-foreground text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Preferred Date</label>
                <input type="date" className="w-full border border-border rounded-lg px-3 py-2 text-foreground text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Service</label>
                <select className="w-full border border-border rounded-lg px-3 py-2 text-foreground text-sm bg-background focus:outline-none">
                  <option>Haircut &amp; Style</option>
                  <option>Color &amp; Highlights</option>
                  <option>Balayage</option>
                  <option>Keratin Treatment</option>
                  <option>Manicure &amp; Pedicure</option>
                  <option>Facial</option>
                </select>
              </div>
            </div>
            <Button className="w-full bg-primary text-primary-foreground font-semibold hover:scale-105 transition-all duration-300">
              Book Online Now
            </Button>
          </div>
          <p className="mt-4 text-xs text-primary-foreground/60">Or call us at (416) 555-0183</p>
        </div>
      </section>

      {/* REVIEW STARS: review-stars */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl font-bold mb-1 text-accent-foreground animate-fade-up">4.9★</div>
          <p className="text-muted-foreground text-sm mb-10 animate-fade-up [animation-delay:100ms]">Average from 600+ Google &amp; Yelp reviews</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <Card
                key={r.name}
                className="border border-border bg-card text-card-foreground text-left hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
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

      {/* FOOTER: footer-local */}
      <footer className="py-10 px-6 border-t border-border bg-background">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="font-semibold text-lg italic text-primary">Lumière</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Services</a>
            <a href="#" className="hover:text-foreground transition-colors">Gallery</a>
            <a href="#" className="hover:text-foreground transition-colors">Team</a>
            <a href="#" className="hover:text-foreground transition-colors">Book</a>
          </div>
          <p>© 2026 Lumière Salon. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
