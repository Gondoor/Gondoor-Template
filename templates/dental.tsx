"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: dental
// sections: medical-hero, medical-services, team-grid, trust-badges, review-stars, booking-cta, map-location, footer-local
// ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { name: "Cleaning & Exam", desc: "Comprehensive checkup, professional polish, and X-rays as needed.", icon: "🦷" },
  { name: "Teeth Whitening", desc: "In-office whitening that delivers visibly brighter results in one visit.", icon: "✨" },
  { name: "Invisalign", desc: "Clear aligner therapy for a straight, confident smile — no metal brackets.", icon: "😁" },
  { name: "Dental Implants", desc: "Permanent, natural-looking tooth replacements anchored directly to the jaw.", icon: "🔩" },
  { name: "Veneers", desc: "Custom porcelain veneers crafted to reshape, whiten, and perfect your smile.", icon: "💎" },
  { name: "Emergency Dental", desc: "Same-day appointments for pain, chips, broken restorations, and more.", icon: "🚨" },
];

const TEAM = [
  { name: "Dr. Sarah Kim, DDS", role: "General & Cosmetic Dentist · 14 yrs exp", emoji: "👩‍⚕️" },
  { name: "Dr. James Okafor, DMD", role: "Implant & Oral Surgery Specialist", emoji: "👨‍⚕️" },
  { name: "Dr. Priya Nair, DDS", role: "Invisalign Certified · Pediatric-friendly", emoji: "👩‍⚕️" },
  { name: "Rachel Cho, RDH", role: "Lead Dental Hygienist · 10 yrs exp", emoji: "🧑‍⚕️" },
];

const BADGES = ["ADA Member Practice", "Sedation Available", "In-Network Insurance", "Same-Day Emergency"];

const REVIEWS = [
  { name: "Lisa P.", text: "Dr. Kim is the most gentle, thorough dentist I've ever had. No more dental anxiety for me!", stars: 5 },
  { name: "Eduardo S.", text: "Got my implants done here. The results look completely natural. Absolutely worth it.", stars: 5 },
  { name: "Yuki T.", text: "My Invisalign finished 2 months early. The whole team tracked my progress every step of the way.", stars: 5 },
  { name: "Ann M.", text: "Called at 8am with a cracked tooth. They got me in by 10am and fixed it same-day. Amazing.", stars: 5 },
];

export default function DentalTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO: medical-hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1588776814546-1ffdd429bb71?auto=format&fit=crop&w=1920&q=80"
          alt="Dental hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24 text-center">
          <Badge className="mb-4 text-sm font-semibold bg-primary text-primary-foreground animate-fade-in">
            Accepting New Patients · In-Network Insurance
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-background animate-fade-up [animation-delay:100ms]">
            Bright Smiles Dental —{" "}
            <span className="text-accent">A healthier smile starts here.</span>
          </h1>
          <p className="text-xl text-background/80 max-w-2xl mx-auto mb-8 animate-fade-up [animation-delay:200ms]">
            Comprehensive, compassionate dental care for the whole family — from routine cleanings to smile transformations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground font-semibold px-8 hover:opacity-90 transition-all duration-300">
              Book an Appointment
            </Button>
            <Button size="lg" variant="outline" className="font-semibold px-8 border-border text-background hover:opacity-90 transition-all duration-300">
              Call (206) 555-0174
            </Button>
          </div>
          <p className="mt-4 text-sm text-background/60 animate-fade-up [animation-delay:300ms]">New patient special: Exam + X-rays + Cleaning from $99</p>
        </div>
      </section>

      <Separator />

      {/* TRUST BADGES: trust-badges */}
      <section className="py-10 px-6 bg-muted">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4">
          {BADGES.map((b) => (
            <div key={b} className="flex items-center gap-2 bg-background border border-border rounded-full px-5 py-2 text-sm font-medium hover:scale-105 transition-all duration-300">
              <span className="text-primary">✔</span> {b}
            </div>
          ))}
        </div>
      </section>

      {/* MEDICAL SERVICES: medical-services */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Dental Services</h2>
          <p className="text-center text-muted-foreground mb-12">From prevention to transformation — we cover every aspect of your oral health.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <Card key={s.name} className="border border-border bg-card hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <CardHeader>
                  <span className="text-3xl mb-2">{s.icon}</span>
                  <CardTitle className="text-lg text-card-foreground">{s.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{s.desc}</p>
                  <Button variant="link" className="mt-3 px-0 text-sm font-semibold text-primary">
                    Learn more →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM GRID: team-grid */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Meet Your Care Team</h2>
          <p className="text-center text-muted-foreground mb-12">Highly trained, deeply caring professionals dedicated to your comfort.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <Card key={member.name} className="border border-border bg-card text-center hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <CardContent className="pt-8 pb-6">
                  <div className="text-6xl mb-4">{member.emoji}</div>
                  <h3 className="font-bold text-base mb-1 text-card-foreground">{member.name}</h3>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEW STARS: review-stars */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-5xl font-black text-primary">4.9★</span>
            <p className="text-muted-foreground mt-1 text-sm">from 700+ verified patient reviews</p>
          </div>
          <h2 className="text-3xl font-bold text-center mb-10">Patients for Life</h2>
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

      {/* BOOKING CTA: booking-cta */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-2xl mx-auto text-center text-primary-foreground">
          <h2 className="text-4xl font-bold mb-4">Ready for Your Best Smile?</h2>
          <p className="mb-8 text-primary-foreground/80">New patients receive a complimentary consultation. Same-day emergency slots available.</p>
          <div className="bg-background rounded-2xl p-6 text-left shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Appointment Type</label>
                <select className="w-full border border-border rounded-lg px-3 py-2 text-foreground bg-background text-sm focus:outline-none">
                  <option>New Patient Exam</option>
                  <option>Cleaning</option>
                  <option>Whitening Consult</option>
                  <option>Invisalign Consult</option>
                  <option>Emergency</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Preferred Date</label>
                <input type="date" className="w-full border border-border rounded-lg px-3 py-2 text-foreground bg-background text-sm focus:outline-none" />
              </div>
            </div>
            <Button className="w-full bg-primary text-primary-foreground font-semibold py-3 hover:opacity-90 transition-all duration-300">
              Request Appointment
            </Button>
          </div>
        </div>
      </section>

      {/* MAP LOCATION: map-location */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Visit Our Practice</h2>
            <p className="text-muted-foreground mb-6">Conveniently located in Capitol Hill with free parking. Wheelchair accessible.</p>
            <div className="space-y-2 text-sm text-foreground">
              <p>📍 812 E Pike St, Suite 200, Seattle, WA 98122</p>
              <p>📞 (206) 555-0174</p>
              <p>✉️ hello@brightsmilesdental.com</p>
              <p>🕗 Mon–Thu: 8am – 6pm · Fri: 8am – 4pm · Sat: 9am – 2pm</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border h-64 bg-muted flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Map embed placeholder</p>
          </div>
        </div>
      </section>

      {/* FOOTER: footer-local */}
      <footer className="py-10 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="font-bold text-foreground">Bright Smiles Dental</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Services</a>
            <a href="#" className="hover:text-foreground transition-colors">Our Team</a>
            <a href="#" className="hover:text-foreground transition-colors">Insurance</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <p>© 2026 Bright Smiles Dental. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
