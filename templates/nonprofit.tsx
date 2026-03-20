"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: nonprofit
// sections: nonprofit-hero, agency-services, impact-stats, gallery-lightbox, testimonial-cards, donate-cta, footer-minimal
// colors: primary #059669 · accent #2563EB · bg #F0FDF4 · text #1C1917
// fonts: display General Sans · body Source Serif 4
// ─────────────────────────────────────────────────────────────────────

const CONFIG = {
  colors: { primary: "#059669", accent: "#2563EB", bg: "#F0FDF4", text: "#1C1917" },
  fonts: { display: "General Sans", body: "Source Serif 4" },
};

const programs = [
  { icon: "🏗️", title: "Well Drilling", desc: "Installing deep wells in remote communities without access to clean groundwater." },
  { icon: "🧪", title: "Water Purification", desc: "Deploying solar-powered filtration systems for immediate safe water access." },
  { icon: "📖", title: "Community Training", desc: "Teaching local technicians to maintain and repair water infrastructure long-term." },
  { icon: "🏫", title: "School Programs", desc: "Clean water and hygiene stations in 300+ rural schools across 12 countries." },
  { icon: "🚨", title: "Emergency Relief", desc: "Rapid-response water kits deployed within 72 hours of natural disasters." },
  { icon: "🔬", title: "Research", desc: "Partnering with universities to study waterborne illness and prevention strategies." },
];

const impactStats = [
  ["250K+", "People Helped"],
  ["180+", "Wells Built"],
  ["42", "Countries"],
  ["$0.91", "Per $1 to Mission"],
];

const galleryItems = [
  "Well construction site, Kenya",
  "Clean water distribution, Bangladesh",
  "School hygiene program, Peru",
  "Community training session, Nigeria",
  "Emergency relief, Philippines",
  "Filtration installation, Guatemala",
];

const testimonials = [
  { name: "Dr. Amara Diallo", role: "Field Director, West Africa", quote: "We've seen child illness rates drop by 60% in villages where Clean Water Initiative has installed wells. The numbers speak for themselves." },
  { name: "Carlos Medina", role: "Mayor, San Marcos Village", quote: "Before the well, our children walked 4 kilometers for water every day. Now they go to school. This organization changed our community's future." },
  { name: "Sarah Ling", role: "Major Donor, San Francisco", quote: "I've vetted dozens of charities. CWI has the most transparent financials and measurable impact I've ever seen. 91 cents of every dollar to the field." },
];

const donationTiers = [
  { amount: "$25", impact: "Provides clean water for 1 person for 5 years" },
  { amount: "$50", impact: "Delivers a hygiene kit to one family" },
  { amount: "$100", impact: "Installs a water purification filter at a school" },
  { amount: "$250", impact: "Funds one month of community training" },
  { amount: "Custom", impact: "Your choice — every amount makes a difference" },
];

export default function NonprofitTemplate() {
  return (
    <div className="min-h-screen" style={{ background: CONFIG.colors.bg, color: CONFIG.colors.text, fontFamily: CONFIG.fonts.body }}>

      {/* HERO: nonprofit-hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(135deg, ${CONFIG.colors.primary}15 0%, ${CONFIG.colors.accent}08 100%)` }} />
        <div className="container mx-auto px-6 py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-2xl">💧</span>
              <Badge className="px-3 py-1 text-xs uppercase tracking-widest rounded-full border" style={{ borderColor: CONFIG.colors.primary, color: CONFIG.colors.primary, background: "transparent" }}>
                501(c)(3) Nonprofit
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-5" style={{ fontFamily: CONFIG.fonts.display }}>
              Clean water for<br />
              <span style={{ color: CONFIG.colors.primary }}>every community.</span>
            </h1>
            <p className="text-stone-600 text-lg mb-8 max-w-md leading-relaxed">
              Clean Water Initiative has brought safe drinking water to 250,000+ people across 42 countries since 2008. Help us reach the next million.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="px-8 rounded-xl font-semibold" style={{ background: CONFIG.colors.primary, color: "#fff" }}>
                Donate Now
              </Button>
              <Button size="lg" variant="outline" className="px-8 rounded-xl font-semibold border-stone-300 text-stone-700 hover:bg-green-50">
                Our Impact
              </Button>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden aspect-square flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${CONFIG.colors.primary}20, ${CONFIG.colors.accent}15)` }}>
            <div className="text-center p-8">
              <span className="text-8xl block mb-4">💧</span>
              <p className="text-2xl font-extrabold" style={{ color: CONFIG.colors.primary }}>250,000+</p>
              <p className="text-stone-500 text-sm">lives changed</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS: agency-services */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold mb-3" style={{ fontFamily: CONFIG.fonts.display }}>Our Programs</h2>
          <p className="text-stone-500 max-w-md mx-auto">Six interconnected programs that deliver lasting change, not just short-term relief.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p) => (
            <Card key={p.title} className="rounded-2xl border border-green-100 bg-white hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-bold text-base mb-2">{p.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="py-16" style={{ background: CONFIG.colors.primary }}>
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {impactStats.map(([val, label]) => (
            <div key={label}>
              <p className="text-4xl font-extrabold text-white mb-1" style={{ fontFamily: CONFIG.fonts.display }}>{val}</p>
              <p className="text-green-200 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY: gallery-lightbox */}
      <section className="container mx-auto px-6 py-24">
        <h2 className="text-4xl font-extrabold text-center mb-12" style={{ fontFamily: CONFIG.fonts.display }}>Work in the Field</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {galleryItems.map((caption, i) => (
            <div key={i} className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group" style={{ background: `hsl(${145 + i * 20}, ${40 - i * 3}%, ${75 - i * 5}%)` }}>
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <span className="text-5xl">💧</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs font-medium">{caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS: testimonial-cards */}
      <section className="py-20" style={{ background: "#E6FFF5" }}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-12" style={{ fontFamily: CONFIG.fonts.display }}>Voices from the Field</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <Card key={t.name} className="rounded-2xl border border-green-100 bg-white">
                <CardContent className="p-6">
                  <p className="text-stone-600 text-sm leading-relaxed mb-5 italic">&quot;{t.quote}&quot;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: CONFIG.colors.primary }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-800">{t.name}</p>
                      <p className="text-xs text-stone-400">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* DONATE: donate-cta */}
      <section className="container mx-auto px-6 py-24 max-w-3xl text-center">
        <h2 className="text-4xl font-extrabold mb-4" style={{ fontFamily: CONFIG.fonts.display }}>Make a Difference Today</h2>
        <p className="text-stone-500 mb-10 text-lg">100% secure. Tax-deductible. Every dollar tracked and reported.</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {donationTiers.map((tier) => (
            <button key={tier.amount} className="rounded-2xl border-2 border-green-200 bg-white p-3 text-center hover:border-green-500 hover:bg-green-50 transition-all group">
              <p className="font-extrabold text-lg group-hover:text-green-700" style={{ color: CONFIG.colors.primary }}>{tier.amount}</p>
              <p className="text-xs text-stone-400 mt-1 leading-tight">{tier.impact}</p>
            </button>
          ))}
        </div>
        <Button size="lg" className="px-12 rounded-xl font-semibold mt-4" style={{ background: CONFIG.colors.primary, color: "#fff" }}>
          Donate Now
        </Button>
        <p className="text-xs text-stone-400 mt-4">Clean Water Initiative is a registered 501(c)(3). EIN: 47-1234567.</p>
      </section>

      <Separator className="bg-green-100" />

      {/* FOOTER: footer-minimal */}
      <footer className="py-10 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-extrabold text-lg" style={{ fontFamily: CONFIG.fonts.display, color: CONFIG.colors.primary }}>Clean Water Initiative</span>
          <div className="flex gap-6 text-sm text-stone-500">
            <a href="#" className="hover:text-stone-800 transition-colors">Our Work</a>
            <a href="#" className="hover:text-stone-800 transition-colors">Financials</a>
            <a href="#" className="hover:text-stone-800 transition-colors">Press</a>
            <a href="#" className="hover:text-stone-800 transition-colors">Contact</a>
          </div>
          <p className="text-stone-400 text-xs">© 2026 Clean Water Initiative. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
