"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: construction
// sections: construction-hero, agency-services, portfolio-masonry, steps-timeline, trust-badges, review-stars, booking-cta, footer-local
// colors: primary #D97706 · accent #1E3A5F · bg #FFFFFF · text #1C1917
// fonts: display Plus Jakarta Sans · body Inter
// ─────────────────────────────────────────────────────────────────────

const CONFIG = {
  colors: { primary: "#D97706", accent: "#1E3A5F", bg: "#FFFFFF", text: "#1C1917" },
  fonts: { display: "Plus Jakarta Sans", body: "Inter" },
};

const services = [
  { icon: "🏗️", title: "New Construction", desc: "Custom homes and commercial buildings from ground up, built to code and beyond." },
  { icon: "🔨", title: "Remodeling", desc: "Kitchen, bath, basement, and whole-home renovations with craftsmanship that lasts." },
  { icon: "🏠", title: "Home Additions", desc: "Seamless additions that match existing architecture and add real value." },
  { icon: "🏢", title: "Commercial Build-out", desc: "Tenant improvements and commercial fit-outs, on schedule and on budget." },
  { icon: "🏚️", title: "Roofing", desc: "Full roof replacement, repair, and installation with 10-year workmanship warranty." },
  { icon: "🧱", title: "Foundation Work", desc: "Crack repair, waterproofing, and new foundation pours done right the first time." },
];

const portfolio = [
  { title: "The Hargrove Residence", tag: "New Construction · 4,200 sq ft", year: "2025" },
  { title: "Midtown Office Renovation", tag: "Commercial Build-out · 8,000 sq ft", year: "2025" },
  { title: "Lakeside Kitchen & Bath", tag: "Full Remodel · $180K project", year: "2024" },
  { title: "Riverside Custom Home", tag: "New Construction · 3,800 sq ft", year: "2024" },
  { title: "Cedar Ridge Addition", tag: "Home Addition · 1,200 sq ft", year: "2024" },
  { title: "Summit Commercial Roof", tag: "Commercial Roofing · 22,000 sq ft", year: "2023" },
];

const steps = [
  { num: "01", title: "Free Quote", desc: "We visit your site, assess the scope, and provide a detailed written estimate — no pressure." },
  { num: "02", title: "Plan", desc: "Our team creates drawings, pulls permits, and builds a timeline with clear milestones." },
  { num: "03", title: "Build", desc: "Skilled crews on-site every day with weekly progress updates and zero surprise costs." },
  { num: "04", title: "Deliver", desc: "Final walkthrough, punch list sign-off, and handover with all warranties in hand." },
];

const trustBadges = [
  { icon: "📋", label: "Licensed & Bonded", sub: "TX Lic. #C-48220" },
  { icon: "🛡️", label: "Fully Insured", sub: "$2M general liability" },
  { icon: "⭐", label: "BBB A+ Rating", sub: "Since 2014" },
  { icon: "🦺", label: "OSHA Certified", sub: "30-hr safety trained" },
];

const reviews = [
  { name: "Tom & Linda Hargrove", rating: 5, review: "Ironwood built our dream home. Not a single surprise cost, not a single missed deadline. These guys are the best in Austin." },
  { name: "Marcus Webb, Midtown Office", rating: 5, review: "They finished our 8,000 sq ft build-out two weeks early. Our tenants were blown away. We're already planning our next project with them." },
  { name: "Karen Patel", rating: 5, review: "The kitchen remodel exceeded every expectation. The crew was respectful, clean, and professional every single day." },
  { name: "David Okafor", rating: 4, review: "The roofing crew worked fast and cleaned up perfectly. Minor scheduling delay at the start, but they made up the time. Great result overall." },
];

export default function ConstructionTemplate() {
  return (
    <div className="min-h-screen" style={{ background: CONFIG.colors.bg, color: CONFIG.colors.text, fontFamily: CONFIG.fonts.body }}>

      {/* HERO: construction-hero */}
      <section className="relative overflow-hidden" style={{ background: CONFIG.colors.accent }}>
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="container mx-auto px-6 py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <Badge className="mb-5 px-3 py-1 text-xs uppercase tracking-widest rounded-full border border-amber-400 text-amber-400 bg-transparent">
              Austin, TX · Licensed &amp; Insured
            </Badge>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-5 text-white" style={{ fontFamily: CONFIG.fonts.display }}>
              Built to last.<br />
              <span style={{ color: CONFIG.colors.primary }}>Built right.</span>
            </h1>
            <p className="text-blue-200 text-lg mb-8 max-w-md leading-relaxed">
              Ironwood Construction delivers exceptional craftsmanship on every project — from custom homes to commercial build-outs. 400+ satisfied clients. 10-year workmanship warranty.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="px-8 rounded-xl font-semibold" style={{ background: CONFIG.colors.primary, color: "#fff" }}>
                Get a Free Quote
              </Button>
              <Button size="lg" variant="outline" className="px-8 rounded-xl font-semibold border-blue-400 text-blue-100 hover:bg-blue-800">
                View Projects
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <div className="flex">
                {[1,2,3,4,5].map(s => <span key={s} className="text-amber-400 text-lg">★</span>)}
              </div>
              <span className="text-blue-200 text-sm font-semibold">4.8 · 400+ verified reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["🏗️", "🔨", "🏠", "🏢"].map((icon, i) => (
              <div key={i} className="aspect-square rounded-2xl flex items-center justify-center text-5xl" style={{ background: i % 2 === 0 ? `${CONFIG.colors.primary}30` : "rgba(255,255,255,0.08)" }}>
                {icon}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES: agency-services */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold mb-3" style={{ fontFamily: CONFIG.fonts.display }}>What We Build</h2>
          <p className="text-stone-500 max-w-md mx-auto">Full-service general contracting for residential and commercial clients.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl border border-stone-200 bg-white p-6 hover:border-amber-400 hover:shadow-md transition-all group">
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-bold text-base mb-2 group-hover:text-amber-700 transition-colors">{s.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="bg-stone-100" />

      {/* PORTFOLIO: portfolio-masonry */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold mb-3" style={{ fontFamily: CONFIG.fonts.display }}>Recent Projects</h2>
          <p className="text-stone-500">Our work speaks for itself.</p>
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {portfolio.map((item, i) => (
            <div key={i} className={`break-inside-avoid rounded-2xl overflow-hidden relative group cursor-pointer ${i % 3 === 0 ? "aspect-[4/3]" : "aspect-video"}`} style={{ background: `hsl(${30 + i * 18}, ${35 - i * 2}%, ${75 - i * 4}%)` }}>
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <span className="text-6xl">🏗️</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white font-bold text-sm">{item.title}</p>
                <p className="text-white/60 text-xs">{item.tag} · {item.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS: steps-timeline */}
      <section className="py-20" style={{ background: "#F9F5F0" }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold mb-3" style={{ fontFamily: CONFIG.fonts.display }}>How We Work</h2>
            <p className="text-stone-500">Predictable. Transparent. Stress-free.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <div key={step.num} className="text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-extrabold mx-auto mb-4" style={{ background: i % 2 === 0 ? CONFIG.colors.primary : CONFIG.colors.accent, color: "#fff", fontFamily: CONFIG.fonts.display }}>
                  {step.num}
                </div>
                <h3 className="font-bold text-base mb-2">{step.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustBadges.map((badge) => (
            <div key={badge.label} className="rounded-2xl border-2 border-stone-200 bg-white p-5 text-center hover:border-amber-400 transition-colors">
              <div className="text-3xl mb-2">{badge.icon}</div>
              <p className="font-bold text-sm">{badge.label}</p>
              <p className="text-stone-400 text-xs mt-1">{badge.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS: review-stars */}
      <section className="py-20" style={{ background: CONFIG.colors.accent }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-3">
              {[1,2,3,4,5].map(s => <span key={s} className="text-3xl" style={{ color: CONFIG.colors.primary }}>★</span>)}
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-2" style={{ fontFamily: CONFIG.fonts.display }}>4.8 Stars · 400+ Reviews</h2>
            <p className="text-blue-300 text-sm">Verified Google &amp; BBB reviews</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {reviews.map((r) => (
              <Card key={r.name} className="rounded-2xl border-0" style={{ background: "rgba(255,255,255,0.08)" }}>
                <CardContent className="p-5">
                  <div className="flex mb-3">
                    {Array.from({ length: r.rating }).map((_, i) => <span key={i} style={{ color: CONFIG.colors.primary }}>★</span>)}
                  </div>
                  <p className="text-blue-100 text-sm leading-relaxed mb-4">&quot;{r.review}&quot;</p>
                  <p className="text-blue-300 text-xs font-semibold">{r.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING: booking-cta */}
      <section className="container mx-auto px-6 py-24 max-w-2xl text-center">
        <h2 className="text-4xl font-extrabold mb-4" style={{ fontFamily: CONFIG.fonts.display }}>
          Ready to start your project?
        </h2>
        <p className="text-stone-500 mb-10 text-lg">Get a free, no-obligation estimate from Austin&apos;s most trusted general contractor.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input type="text" placeholder="Your Name" className="px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
          <input type="tel" placeholder="Phone Number" className="px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
          <input type="email" placeholder="Email Address" className="px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
          <select className="px-4 py-3 rounded-xl border border-stone-300 text-sm text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white">
            <option>Project Type</option>
            <option>New Construction</option>
            <option>Remodeling</option>
            <option>Addition</option>
            <option>Commercial</option>
            <option>Roofing</option>
          </select>
        </div>
        <Button size="lg" className="px-12 rounded-xl font-semibold w-full sm:w-auto" style={{ background: CONFIG.colors.primary, color: "#fff" }}>
          Request Free Estimate
        </Button>
        <p className="text-xs text-stone-400 mt-4">We respond within 1 business day. No hard sell, ever.</p>
      </section>

      {/* FOOTER: footer-local */}
      <footer className="border-t border-stone-200 py-10 px-6" style={{ background: "#FAFAF9" }}>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-extrabold text-lg block" style={{ fontFamily: CONFIG.fonts.display, color: CONFIG.colors.accent }}>Ironwood Construction</span>
            <span className="text-stone-400 text-xs">Austin, TX · (512) 555-0192 · Licensed &amp; Insured</span>
          </div>
          <div className="flex gap-6 text-sm text-stone-500">
            <a href="#" className="hover:text-stone-800 transition-colors">Services</a>
            <a href="#" className="hover:text-stone-800 transition-colors">Projects</a>
            <a href="#" className="hover:text-stone-800 transition-colors">Reviews</a>
            <a href="#" className="hover:text-stone-800 transition-colors">Contact</a>
          </div>
          <p className="text-stone-400 text-xs">© 2026 Ironwood Construction LLC. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
