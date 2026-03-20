"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: medical
// sections: medical-hero, medical-services, team-grid, trust-badges, review-stars, booking-cta, map-location, footer-local
// colors: primary #0EA5E9 · accent #10B981 · bg #FFFFFF · text #0F172A
// fonts: display Plus Jakarta Sans · body DM Sans
// ─────────────────────────────────────────────────────────────────────

const CONFIG = {
  colors: { primary: "#0EA5E9", accent: "#10B981", bg: "#FFFFFF", text: "#0F172A" },
  fonts: { display: "Plus Jakarta Sans", body: "DM Sans" },
};

const SERVICES = [
  { name: "Primary Care", desc: "Comprehensive health management for adults — annual exams, chronic conditions, and everything in between.", icon: "🩺" },
  { name: "Pediatrics", desc: "Dedicated, compassionate care for children from newborns through adolescence.", icon: "👶" },
  { name: "Women's Health", desc: "Gynaecological exams, reproductive health, and preventive screenings tailored to women.", icon: "💙" },
  { name: "Preventive Care", desc: "Vaccinations, screenings, and wellness plans designed to keep you healthy long-term.", icon: "🛡️" },
  { name: "Chronic Disease", desc: "Ongoing management of diabetes, hypertension, asthma, and other chronic conditions.", icon: "📋" },
  { name: "Telehealth", desc: "See a provider from home — same high-quality care, no commute required.", icon: "💻" },
];

const TEAM = [
  { name: "Dr. Alicia Moore", role: "MD, Family Medicine", specialty: "Primary & Preventive Care", initials: "AM" },
  { name: "Dr. Samuel Torres", role: "MD, Pediatrics", specialty: "Pediatric & Adolescent Health", initials: "ST" },
  { name: "Dr. Priya Patel", role: "MD, OB-GYN", specialty: "Women's Health", initials: "PP" },
];

const BADGES = ["Board Certified Physicians", "In-Network Most Insurers", "HIPAA Compliant", "Same-Day Appointments"];

const REVIEWS = [
  { name: "Rebecca N.", text: "Dr. Moore is the most attentive doctor I've had. She listens, explains, and genuinely cares. Our whole family comes here.", stars: 5 },
  { name: "Omar F.", text: "Same-day appointment for my son's fever. Dr. Torres put him at ease immediately. Fantastic team.", stars: 5 },
  { name: "Emily T.", text: "Dr. Patel is phenomenal. She made me feel safe and informed at every step. Can't recommend highly enough.", stars: 5 },
  { name: "David K.", text: "The telehealth visits are seamless. Prescription was in my pharmacy within the hour. Incredibly efficient.", stars: 5 },
];

export default function MedicalTemplate() {
  return (
    <div className="min-h-screen" style={{ background: CONFIG.colors.bg, color: CONFIG.colors.text }}>

      {/* NAV */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-slate-100 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: CONFIG.colors.primary }}>CW</div>
          <div>
            <p className="font-bold text-sm" style={{ fontFamily: CONFIG.fonts.display }}>Clearwater Medical Group</p>
            <p className="text-xs text-slate-400">Family Practice</p>
          </div>
        </div>
        <div className="hidden md:flex gap-8 text-sm text-slate-500">
          <a href="#" className="hover:text-slate-900">Services</a>
          <a href="#" className="hover:text-slate-900">Providers</a>
          <a href="#" className="hover:text-slate-900">Patient Portal</a>
        </div>
        <Button size="sm" className="text-white text-xs font-semibold" style={{ background: CONFIG.colors.primary }}>Book Appointment</Button>
      </nav>

      {/* HERO: medical-hero */}
      <section className="px-6 py-24 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <Badge className="mb-5 text-xs font-semibold" style={{ background: "#ECFDF5", color: CONFIG.colors.accent }}>
            Now accepting new patients
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-5" style={{ fontFamily: CONFIG.fonts.display }}>
            Compassionate care for{" "}
            <span style={{ color: CONFIG.colors.primary }}>every stage of life.</span>
          </h1>
          <p className="text-lg text-slate-500 mb-8" style={{ fontFamily: CONFIG.fonts.body }}>
            Clearwater Medical Group is a full-service family practice committed to evidence-based medicine and genuine, patient-first care for the whole family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-white font-semibold px-8" style={{ background: CONFIG.colors.primary }}>
              Book an Appointment
            </Button>
            <Button size="lg" variant="outline" className="border-slate-200 px-8">
              Telehealth Visit
            </Button>
          </div>
        </div>
        <div className="rounded-3xl p-10 text-center" style={{ background: "#F0F9FF" }}>
          <div className="text-6xl mb-4">🏥</div>
          <p className="font-semibold text-slate-700 mb-1">Same-Day Availability</p>
          <p className="text-sm text-slate-400">Call by 10am for a same-day appointment</p>
          <Separator className="my-4 border-slate-200" />
          <p className="font-semibold text-slate-700 mb-1">After-Hours Line</p>
          <p className="text-sm text-slate-400">(503) 555-0196 · 24/7 for urgent needs</p>
        </div>
      </section>

      {/* MEDICAL SERVICES: medical-services */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-3" style={{ fontFamily: CONFIG.fonts.display }}>Our Specialties</h2>
          <p className="text-center text-slate-400 mb-12 text-sm">Comprehensive primary care under one roof.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <Card key={s.name} className="border border-slate-200 bg-white hover:shadow-md transition-shadow">
                <CardHeader>
                  <span className="text-3xl mb-2">{s.icon}</span>
                  <CardTitle className="text-base font-semibold" style={{ fontFamily: CONFIG.fonts.display }}>{s.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500 text-sm">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM GRID: team-grid */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-14" style={{ fontFamily: CONFIG.fonts.display }}>Meet Your Providers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {TEAM.map((m) => (
              <div key={m.name} className="text-center border border-slate-100 rounded-2xl p-8 hover:shadow-md transition-shadow">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold" style={{ background: CONFIG.colors.primary }}>
                  {m.initials}
                </div>
                <h3 className="font-semibold">{m.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{m.role}</p>
                <Badge className="mt-3 text-xs" style={{ background: "#ECFDF5", color: CONFIG.colors.accent }}>{m.specialty}</Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BADGES: trust-badges */}
      <section className="py-12 px-6 border-y border-slate-100 bg-sky-50">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
          {BADGES.map((b) => (
            <div key={b} className="flex items-center gap-2 bg-white border border-sky-200 rounded-full px-5 py-2.5 text-sm font-medium shadow-sm">
              <span style={{ color: CONFIG.colors.accent }}>✓</span> {b}
            </div>
          ))}
        </div>
      </section>

      {/* REVIEW STARS: review-stars */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-5xl font-black mb-1" style={{ color: CONFIG.colors.accent }}>4.9★</div>
          <p className="text-slate-400 text-sm mb-12">from 800+ patient reviews on Google &amp; Healthgrades</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
            {REVIEWS.map((r) => (
              <Card key={r.name} className="border border-slate-100">
                <CardContent className="pt-6">
                  <div className="text-sm mb-2" style={{ color: CONFIG.colors.accent }}>{"★".repeat(r.stars)}</div>
                  <p className="text-slate-600 text-sm italic mb-3">&quot;{r.text}&quot;</p>
                  <p className="text-sm font-semibold">{r.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING CTA: booking-cta */}
      <section className="py-20 px-6 text-center" style={{ background: CONFIG.colors.primary }}>
        <div className="max-w-xl mx-auto text-white">
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: CONFIG.fonts.display }}>Ready to Book Your Visit?</h2>
          <p className="mb-8 text-sky-200">In-person or telehealth — same-day appointments available.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white font-bold px-8" style={{ color: CONFIG.colors.primary }}>
              Book In-Person
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
              Start Telehealth
            </Button>
          </div>
          <p className="text-xs text-sky-300 mt-5">New patients welcome · Most major insurance accepted</p>
        </div>
      </section>

      {/* MAP LOCATION: map-location */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: CONFIG.fonts.display }}>Find Our Clinic</h2>
            <p className="text-slate-500 mb-6">Conveniently located in downtown Clearwater with ample parking and public transit access.</p>
            <div className="space-y-2 text-sm text-slate-700">
              <p>📍 305 Medical Plaza Drive, Suite 200, Portland, OR 97204</p>
              <p>📞 (503) 555-0196</p>
              <p>✉️ appointments@clearwatermedical.com</p>
              <p>🕗 Mon–Fri: 7:30am – 6pm · Sat: 9am – 1pm</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 h-64 bg-slate-100 flex items-center justify-center">
            <p className="text-slate-400 text-sm">Map embed placeholder</p>
          </div>
        </div>
      </section>

      {/* FOOTER: footer-local */}
      <footer className="py-10 px-8 border-t border-slate-200">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p className="font-bold text-slate-800" style={{ fontFamily: CONFIG.fonts.display }}>Clearwater Medical Group</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-800">Services</a>
            <a href="#" className="hover:text-slate-800">Providers</a>
            <a href="#" className="hover:text-slate-800">Portal</a>
            <a href="#" className="hover:text-slate-800">Privacy</a>
          </div>
          <p>© 2026 Clearwater Medical Group. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
