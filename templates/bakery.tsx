"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: bakery
// sections: restaurant-hero, restaurant-menu, gallery-lightbox, review-stars, booking-cta, map-location, footer-local
// ─────────────────────────────────────────────────────────────────────

const MENU_CATEGORIES = [
  {
    category: "Sourdough & Breads",
    items: [
      { name: "Classic Country Sourdough", price: "$12", desc: "Open crumb, crisp crust, 48-hr cold ferment." },
      { name: "Seeded Rye Loaf", price: "$11", desc: "Caraway, sunflower, and pumpkin seeds." },
      { name: "Focaccia al Rosmarino", price: "$9", desc: "Rosemary, fleur de sel, extra-virgin olive oil." },
    ],
  },
  {
    category: "Pastries & Croissants",
    items: [
      { name: "Butter Croissant", price: "$4.50", desc: "27 layers of French-style laminated dough." },
      { name: "Almond Croissant", price: "$5.50", desc: "Twice-baked with frangipane and sliced almonds." },
      { name: "Pain au Chocolat", price: "$5", desc: "Two batons of Valrhona dark chocolate." },
    ],
  },
  {
    category: "Cakes & Tarts",
    items: [
      { name: "Lemon Tart", price: "$7", desc: "Silky curd in a buttery pâte sablée shell." },
      { name: "Seasonal Fruit Galette", price: "$8", desc: "Rustic free-form tart with local stone fruit." },
      { name: "Basque Burnt Cheesecake", price: "$9", desc: "Caramelized exterior, creamy molten center." },
    ],
  },
  {
    category: "Cookies & Bars",
    items: [
      { name: "Brown Butter Chocolate Chip", price: "$3.50", desc: "Crisp edge, chewy center, sea salt finish." },
      { name: "Tahini Blondie", price: "$4", desc: "Nutty, caramel-forward bar with sesame swirl." },
      { name: "Shortbread Fingers", price: "$3", desc: "Buttery, crumbly Scottish-style shortbread." },
    ],
  },
  {
    category: "Custom Cakes",
    items: [
      { name: "Birthday Cake (6-inch)", price: "From $85", desc: "Choose your flavour, filling, and decoration." },
      { name: "Wedding Tier Cake", price: "From $320", desc: "Consultation included. Delivery available." },
      { name: "Celebration Smash Cake", price: "$45", desc: "Mini cake designed to be gloriously destroyed." },
    ],
  },
  {
    category: "Seasonal Specials",
    items: [
      { name: "Kouign-Amann", price: "$6", desc: "Caramelized Breton pastry — seasonal weekends only." },
      { name: "Cardamom Bun", price: "$4.50", desc: "Scandinavian-style, sugar-crusted and fragrant." },
      { name: "Pistachio Eclair", price: "$6", desc: "Choux filled with pistachio cream, glazed green." },
    ],
  },
];

const GALLERY = [
  "Fresh sourdough just out of the oven",
  "Golden butter croissants on a rack",
  "Layered lemon curd tart",
  "Artisan loaves on wooden shelves",
  "Custom wedding cake with dried florals",
  "Almond croissants dusted with powdered sugar",
  "Seasonal berry galette",
  "Espresso and pastry morning spread",
];

const REVIEWS = [
  { name: "Claire B.", text: "Their sourdough is the best bread I've eaten outside of Paris. I order two loaves every Saturday.", stars: 5 },
  { name: "Oliver T.", text: "The almond croissant alone is worth crossing the city for. Perfectly laminated, never greasy.", stars: 5 },
  { name: "Yuki P.", text: "Ordered a custom birthday cake and was absolutely floored by the detail and flavor. 10/10.", stars: 5 },
  { name: "Maria G.", text: "Basque cheesecake, lemon tart, pain au chocolat — I've worked through most of the menu and everything is exceptional.", stars: 5 },
];

export default function BakeryTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO: restaurant-hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1920&q=80"
          alt="Bakery hero"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24 text-center">
          <Badge className="mb-4 text-sm font-semibold bg-primary text-primary-foreground animate-fade-in">
            Artisan Bakery · Open Tue–Sun 7am – 3pm
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-background animate-fade-up [animation-delay:100ms]">
            Flour &amp; Stone Bakery —{" "}
            <span className="text-accent">Baked with love. Every single day.</span>
          </h1>
          <p className="text-xl text-background/80 max-w-2xl mx-auto mb-8 animate-fade-up [animation-delay:200ms]">
            Handmade breads, pastries, and cakes using heritage grains, local dairy, and time-honored techniques. No shortcuts, ever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground font-semibold px-8 hover:opacity-90 transition-all duration-300">
              Pre-Order Now
            </Button>
            <Button size="lg" variant="outline" className="font-semibold px-8 border-border text-background hover:opacity-90 transition-all duration-300">
              View Full Menu
            </Button>
          </div>
          <p className="mt-4 text-sm text-background/60 animate-fade-up [animation-delay:300ms]">Pre-orders close Thursday midnight for weekend pickup</p>
        </div>
      </section>

      <Separator />

      {/* RESTAURANT MENU: restaurant-menu */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-3">Today&apos;s Bake</h2>
          <p className="text-center text-muted-foreground mb-12">Made fresh each morning. Quantities are limited — pre-order to guarantee your favorites.</p>
          <div className="space-y-12">
            {MENU_CATEGORIES.map((cat) => (
              <div key={cat.category}>
                <h3 className="text-2xl font-bold mb-6 pb-2 border-b border-border text-primary">
                  {cat.category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {cat.items.map((item) => (
                    <Card key={item.name} className="border border-border bg-card hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start gap-2">
                          <CardTitle className="text-base text-card-foreground">{item.name}</CardTitle>
                          <span className="font-bold text-base shrink-0 text-primary">{item.price}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY LIGHTBOX: gallery-lightbox */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-3">From Our Oven</h2>
          <p className="text-center text-muted-foreground mb-10">A glimpse into the early morning magic.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {GALLERY.map((caption, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-accent border border-border flex items-end overflow-hidden cursor-pointer hover:opacity-90 transition-all duration-300 hover:scale-105 relative"
              >
                <div className="absolute inset-0 flex items-center justify-center text-5xl">
                  {["🍞", "🥐", "🍋", "🧺", "🎂", "🥐", "🫐", "☕"][i]}
                </div>
                <p className="relative z-10 text-xs text-foreground bg-background/80 w-full px-2 py-1 truncate">{caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEW STARS: review-stars */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-5xl font-black text-primary">4.9★</span>
            <p className="text-muted-foreground mt-1 text-sm">from 800+ verified reviews</p>
          </div>
          <h2 className="text-4xl font-bold text-center mb-10">A Neighborhood Staple</h2>
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

      {/* BOOKING / PRE-ORDER CTA: booking-cta */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-2xl mx-auto text-center text-primary-foreground">
          <h2 className="text-4xl font-bold mb-4">Never Miss Your Favourite Loaf</h2>
          <p className="mb-8 text-primary-foreground/80">Pre-orders guarantee your items. We sell out most Saturdays by 10am.</p>
          <div className="bg-background rounded-2xl p-6 text-left shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Pickup Date</label>
                <input type="date" className="w-full border border-border rounded-lg px-3 py-2 text-foreground bg-background text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Your Name</label>
                <input type="text" placeholder="Jane Smith" className="w-full border border-border rounded-lg px-3 py-2 text-foreground bg-background text-sm focus:outline-none" />
              </div>
            </div>
            <Button className="w-full bg-primary text-primary-foreground font-semibold py-3 hover:opacity-90 transition-all duration-300">
              Start Pre-Order
            </Button>
          </div>
        </div>
      </section>

      {/* MAP LOCATION: map-location */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Find Us</h2>
            <p className="text-muted-foreground mb-6">Located in the heart of Montrose. Street parking available. Cash and card accepted.</p>
            <div className="space-y-2 text-sm text-foreground">
              <p>📍 2219 Montrose Blvd, Houston, TX 77006</p>
              <p>📞 (713) 555-0261</p>
              <p>✉️ hello@flourandstone.com</p>
              <p>🕗 Tue–Sun: 7am – 3pm (or until sold out)</p>
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
          <p className="font-bold text-foreground text-lg">Flour &amp; Stone Bakery</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Menu</a>
            <a href="#" className="hover:text-foreground transition-colors">Pre-Order</a>
            <a href="#" className="hover:text-foreground transition-colors">Custom Cakes</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <p>© 2026 Flour &amp; Stone Bakery. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
