"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: church
// sections: nonprofit-hero, local-services, gallery-lightbox, impact-stats, donate-cta, map-location, footer-local
// colors: primary #6D28D9 · accent #D4A017 · bg #FEFDF5 · text #1C1917
// fonts: display EB Garamond · body Lora
// ─────────────────────────────────────────────────────────────────────

const CONFIG = {
  colors: { primary: "#6D28D9", accent: "#D4A017", bg: "#FEFDF5", text: "#1C1917" },
  fonts: { display: "EB Garamond", body: "Lora" },
};

const ministries = [
  { icon: "🙏", title: "Sunday Worship", desc: "Vibrant Sunday services at 9am and 11am. All are welcome, exactly as they are." },
  { icon: "✝️", title: "Youth Ministry", desc: "Engaging programs for teens 12–18 — Wednesday nights and Sunday mornings." },
  { icon: "🌟", title: "Children's Church", desc: "Fun, age-appropriate teaching for kids from nursery through 6th grade." },
  { icon: "👨‍👩‍👧", title: "Life Groups", desc: "38 small groups meeting weekly for Bible study, prayer, and community." },
  { icon: "🤝", title: "Community Outreach", desc: "Serving our city through food pantries, homeless ministry, and local partnerships." },
  { icon: "💜", title: "Women's Ministry", desc: "Monthly gatherings, retreats, and Bible studies for women of all ages." },
];

const galleryItems = [
  "Sunday Morning Worship Service",
  "Youth Camp 2025",
  "Community Thanksgiving Dinner",
  "Life Group Gathering",
  "Outreach Day at City Park",
  "Women's Retreat Weekend",
];

const stats = [
  ["2,400+", "Members"],
  ["38", "Life Groups"],
  ["12 Years", "Serving Our City"],
  ["6", "Campuses"],
];

const serviceTimes = [
  { day: "Sunday", times: ["9:00 AM", "11:00 AM", "6:00 PM"], note: "Main Campus + All Locations" },
  { day: "Wednesday", times: ["7:00 PM"], note: "Midweek Service + Youth" },
  { day: "Online", times: ["Live & On Demand"], note: "GraceCC.org/live" },
];

const locations = [
  { name: "Main Campus", address: "1420 Covenant Way, Nashville, TN 37201", phone: "(615) 555-0184" },
  { name: "East Campus", address: "825 Harmony Blvd, Nashville, TN 37210", phone: "(615) 555-0237" },
  { name: "West Campus", address: "540 Grace Park Dr, Brentwood, TN 37027", phone: "(615) 555-0312" },
];

export default function ChurchTemplate() {
  return (
    <div className="min-h-screen" style={{ background: CONFIG.colors.bg, color: CONFIG.colors.text, fontFamily: CONFIG.fonts.body }}>

      {/* HERO: nonprofit-hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to bottom, ${CONFIG.colors.primary}10 0%, transparent 80%)` }} />
        <div className="container mx-auto px-6 py-28 text-center max-w-4xl">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl" style={{ background: `${CONFIG.colors.primary}18` }}>
              ✞
            </div>
          </div>
          <Badge className="mb-5 px-3 py-1 text-xs uppercase tracking-widest rounded-full border" style={{ borderColor: CONFIG.colors.accent, color: CONFIG.colors.accent, background: "transparent" }}>
            Nashville, TN · 6 Campuses
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6" style={{ fontFamily: CONFIG.fonts.display }}>
            Grace Community<br />Church
          </h1>
          <p className="text-xl text-stone-500 mb-5 italic" style={{ fontFamily: CONFIG.fonts.display }}>
            &quot;A place to belong.&quot;
          </p>
          <p className="text-stone-600 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            We are a multi-generational church family devoted to Jesus, committed to each other, and sent into our city with love and purpose.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="px-8 rounded-xl font-semibold" style={{ background: CONFIG.colors.primary, color: "#fff" }}>
              Plan Your Visit
            </Button>
            <Button size="lg" variant="outline" className="px-8 rounded-xl font-semibold border-stone-300 text-stone-700 hover:bg-purple-50">
              Watch Online
            </Button>
          </div>
        </div>
      </section>

      {/* MINISTRIES: local-services */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: CONFIG.fonts.display }}>Our Ministries</h2>
          <p className="text-stone-500 max-w-md mx-auto">Every ministry is a doorway — come as you are and find where you belong.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministries.map((m) => (
            <Card key={m.title} className="rounded-2xl border border-purple-100 bg-white hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl mb-3">{m.icon}</div>
                <h3 className="font-bold text-base mb-2">{m.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{m.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* GALLERY: gallery-lightbox */}
      <section className="py-20" style={{ background: "#F5F0FF" }}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ fontFamily: CONFIG.fonts.display }}>Life at Grace</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryItems.map((caption, i) => (
              <div key={i} className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group" style={{ background: `hsl(${265 + i * 15}, ${35 - i * 3}%, ${85 - i * 4}%)` }}>
                <div className="absolute inset-0 flex items-center justify-center opacity-25">
                  <span className="text-5xl">✞</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs font-medium">{caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS: impact-stats */}
      <section className="py-16" style={{ background: CONFIG.colors.primary }}>
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(([val, label]) => (
            <div key={label}>
              <p className="text-4xl font-bold text-white mb-1" style={{ fontFamily: CONFIG.fonts.display }}>{val}</p>
              <p className="text-purple-200 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DONATE: donate-cta */}
      <section className="container mx-auto px-6 py-24 max-w-2xl text-center">
        <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: CONFIG.fonts.display }}>Give</h2>
        <p className="text-stone-500 mb-10 leading-relaxed">Your generosity fuels our ministries, community programs, and our mission to serve Nashville and beyond.</p>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[["$50", "Feeds one family for a week"], ["$100", "Resources for one Life Group"], ["$250", "Youth camp scholarship"]].map(([amt, note]) => (
            <button key={amt} className="rounded-2xl border-2 border-purple-200 bg-white p-4 text-center hover:border-purple-500 hover:bg-purple-50 transition-all group">
              <p className="font-bold text-xl group-hover:text-purple-700" style={{ color: CONFIG.colors.primary }}>{amt}</p>
              <p className="text-xs text-stone-400 mt-1 leading-tight">{note}</p>
            </button>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" className="px-10 rounded-xl font-semibold" style={{ background: CONFIG.colors.primary, color: "#fff" }}>
            Give Online
          </Button>
          <Button size="lg" variant="outline" className="px-10 rounded-xl font-semibold border-stone-300 text-stone-700 hover:bg-purple-50">
            Set Up Recurring
          </Button>
        </div>
        <p className="text-xs text-stone-400 mt-4">Grace Community Church is a registered 501(c)(3) nonprofit organization.</p>
      </section>

      <Separator className="bg-purple-100" />

      {/* SERVICE TIMES + MAP: map-location */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: CONFIG.fonts.display }}>Service Times</h2>
            <div className="space-y-5">
              {serviceTimes.map((s) => (
                <div key={s.day} className="rounded-2xl border border-purple-100 bg-white p-5">
                  <p className="font-bold text-base mb-1" style={{ color: CONFIG.colors.primary }}>{s.day}</p>
                  <p className="font-semibold text-stone-800 text-sm">{s.times.join(" · ")}</p>
                  <p className="text-stone-400 text-xs mt-1">{s.note}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: CONFIG.fonts.display }}>Locations</h2>
            <div className="rounded-2xl overflow-hidden border border-purple-100 mb-5 aspect-video bg-purple-50 flex items-center justify-center">
              <div className="text-center text-stone-400">
                <span className="text-5xl block mb-2">📍</span>
                <p className="text-sm font-medium">Interactive Map</p>
                <p className="text-xs">Nashville, TN &amp; Surrounding Areas</p>
              </div>
            </div>
            <div className="space-y-3">
              {locations.map((loc) => (
                <div key={loc.name} className="rounded-xl border border-purple-100 bg-white p-4">
                  <p className="font-bold text-sm" style={{ color: CONFIG.colors.primary }}>{loc.name}</p>
                  <p className="text-stone-600 text-xs">{loc.address}</p>
                  <p className="text-stone-400 text-xs">{loc.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER: footer-local */}
      <footer className="border-t border-purple-100 py-10 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-lg block" style={{ fontFamily: CONFIG.fonts.display, color: CONFIG.colors.primary }}>Grace Community Church</span>
            <span className="text-stone-400 text-xs">Nashville, TN · (615) 555-0184</span>
          </div>
          <div className="flex gap-6 text-sm text-stone-500">
            <a href="#" className="hover:text-stone-800 transition-colors">Sermons</a>
            <a href="#" className="hover:text-stone-800 transition-colors">Events</a>
            <a href="#" className="hover:text-stone-800 transition-colors">Ministries</a>
            <a href="#" className="hover:text-stone-800 transition-colors">Contact</a>
          </div>
          <p className="text-stone-400 text-xs">© 2026 Grace Community Church.</p>
        </div>
      </footer>

    </div>
  );
}
