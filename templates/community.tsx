"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: community
// sections: marketplace-hero, saas-features, tech-stats, testimonial-cards, pricing-tiers, subscribe-cta, footer-minimal
// colors: primary #6366F1 · accent #EC4899 · bg #0F0F14 · text #F1F5F9
// fonts: display Cabinet Grotesk · body DM Sans
// ─────────────────────────────────────────────────────────────────────

const CONFIG = {
  colors: { primary: "#6366F1", accent: "#EC4899", bg: "#0F0F14", text: "#F1F5F9" },
  fonts: { display: "Cabinet Grotesk", body: "DM Sans" },
};

const features = [
  { icon: "💬", title: "Private Forums", desc: "Organized discussion spaces by topic, interest, or expertise level." },
  { icon: "🎥", title: "Live Events", desc: "Host and attend live workshops, AMAs, and virtual meetups weekly." },
  { icon: "📚", title: "Resource Library", desc: "Curated templates, guides, and playbooks contributed by the community." },
  { icon: "👥", title: "Member Directory", desc: "Searchable profiles to find collaborators, mentors, and clients." },
  { icon: "✉️", title: "Direct Messaging", desc: "Private and group DMs to keep your conversations organized." },
  { icon: "🔗", title: "Subgroups", desc: "Niche communities within the community for focused discussions." },
];

const stats = [
  ["12K+", "Active Members"],
  ["40+", "Events / Month"],
  ["98%", "Retention Rate"],
  ["4.9★", "Member Rating"],
];

const testimonials = [
  { name: "Kendall Brooks", role: "Indie Founder", quote: "Nexus is the only place online where I've made real friends and real business partners at the same time." },
  { name: "Yuna Sato", role: "Designer & Creator", quote: "The live events alone are worth the Pro subscription. I've learned more here in 3 months than in a year of courses." },
  { name: "Raj Mehta", role: "Growth Consultant", quote: "My first client from Nexus turned into a $40K contract. The member directory is pure gold." },
];

const tiers = [
  { name: "Free", price: "Free", per: "", features: ["Browse public forums", "Attend 2 events/mo", "Basic profile", "Community newsletter"] },
  { name: "Pro", price: "$19", per: "/mo", features: ["Full forum access", "Unlimited events", "Resource library", "Direct messaging", "Member directory", "Subgroups"], highlighted: true },
  { name: "Business", price: "$49", per: "/mo", features: ["Everything in Pro", "Host your own events", "Branded subgroup", "Team seats (5)", "Priority support", "Analytics dashboard"] },
];

export default function CommunityTemplate() {
  return (
    <div className="min-h-screen" style={{ background: CONFIG.colors.bg, color: CONFIG.colors.text, fontFamily: CONFIG.fonts.body }}>

      {/* HERO: marketplace-hero */}
      <section className="relative container mx-auto px-6 py-28 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${CONFIG.colors.primary}28 0%, transparent 65%)` }} />
        <Badge className="mb-6 px-4 py-1.5 text-xs uppercase tracking-widest rounded-full border" style={{ borderColor: CONFIG.colors.primary, color: CONFIG.colors.primary, background: "transparent" }}>
          12,000 Members · Growing Daily
        </Badge>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 max-w-4xl mx-auto relative" style={{ fontFamily: CONFIG.fonts.display }}>
          Where your<br />
          <span style={{ color: CONFIG.colors.primary }}>people are.</span>
        </h1>
        <p className="text-slate-400 text-xl max-w-xl mx-auto mb-10 leading-relaxed relative">
          Nexus Community is a private platform for entrepreneurs, creators, and builders who want to learn, collaborate, and grow together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
          <Button size="lg" className="px-10 rounded-xl font-semibold" style={{ background: CONFIG.colors.primary, color: "#fff" }}>
            Join the Community
          </Button>
          <Button size="lg" variant="outline" className="px-10 rounded-xl font-semibold border-slate-700 text-slate-300 hover:bg-slate-800">
            See What&apos;s Inside
          </Button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-slate-500 relative">
          <span>✓ No algorithm. Real conversations.</span>
          <span>✓ Cancel anytime</span>
          <span>✓ Free tier available</span>
        </div>
      </section>

      {/* FEATURES: saas-features */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold mb-3" style={{ fontFamily: CONFIG.fonts.display }}>Everything in one place</h2>
          <p className="text-slate-400 max-w-md mx-auto">Built for deep connection, real collaboration, and continuous learning.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <Card key={f.title} className="rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-colors" style={{ background: "#16161f" }}>
              <CardContent className="p-6">
                <div className="text-2xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-base mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* STATS: tech-stats */}
      <section className="border-y border-slate-800 py-16">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(([val, label]) => (
            <div key={label}>
              <p className="text-4xl font-extrabold mb-1" style={{ color: CONFIG.colors.primary, fontFamily: CONFIG.fonts.display }}>{val}</p>
              <p className="text-slate-500 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS: testimonial-cards */}
      <section className="container mx-auto px-6 py-24">
        <h2 className="text-4xl font-extrabold text-center mb-14" style={{ fontFamily: CONFIG.fonts.display }}>
          Members love it
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} className="rounded-2xl border border-slate-800" style={{ background: "#16161f" }}>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: CONFIG.colors.accent }}>★</span>)}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: `linear-gradient(135deg, ${CONFIG.colors.primary}, ${CONFIG.colors.accent})` }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* PRICING: pricing-tiers */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold mb-3" style={{ fontFamily: CONFIG.fonts.display }}>Choose your membership</h2>
          <p className="text-slate-400">Start free. Upgrade when you&apos;re ready.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <Card key={tier.name} className={`rounded-2xl border ${tier.highlighted ? "" : "border-slate-800"}`} style={tier.highlighted ? { background: `${CONFIG.colors.primary}15`, border: `1px solid ${CONFIG.colors.primary}` } : { background: "#16161f" }}>
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-bold mb-2">{tier.name}</CardTitle>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold" style={{ color: tier.highlighted ? CONFIG.colors.primary : CONFIG.colors.text }}>{tier.price}</span>
                  <span className="text-slate-500 mb-1">{tier.per}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5 mb-7">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-slate-300">
                      <span style={{ color: tier.highlighted ? CONFIG.colors.primary : CONFIG.colors.accent }}>✓</span> {feat}
                    </li>
                  ))}
                </ul>
                <Button className="w-full rounded-xl font-semibold" style={tier.highlighted ? { background: CONFIG.colors.primary, color: "#fff" } : { background: "#2a2a38", color: "#f1f5f9" }}>
                  {tier.price === "Free" ? "Join Free" : `Get ${tier.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SUBSCRIBE: subscribe-cta */}
      <section className="container mx-auto px-6 pb-24 max-w-2xl text-center">
        <div className="rounded-3xl p-12" style={{ background: `linear-gradient(135deg, ${CONFIG.colors.primary}20, ${CONFIG.colors.accent}15)`, border: `1px solid ${CONFIG.colors.primary}40` }}>
          <h2 className="text-3xl font-extrabold mb-3" style={{ fontFamily: CONFIG.fonts.display }}>Get a free weekly digest</h2>
          <p className="text-slate-400 mb-7 text-sm">Top discussions, upcoming events, and community highlights — straight to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-3 rounded-xl border border-slate-700 bg-slate-900 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:ring-2" style={{ "--tw-ring-color": CONFIG.colors.primary } as React.CSSProperties} />
            <Button className="rounded-xl font-semibold" style={{ background: CONFIG.colors.primary, color: "#fff" }}>Subscribe</Button>
          </div>
        </div>
      </section>

      {/* FOOTER: footer-minimal */}
      <footer className="border-t border-slate-800 py-10 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-extrabold text-xl" style={{ fontFamily: CONFIG.fonts.display, color: CONFIG.colors.primary }}>Nexus Community</span>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">Twitter</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Discord</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
          </div>
          <p className="text-slate-600 text-xs">© 2026 Nexus Community. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
