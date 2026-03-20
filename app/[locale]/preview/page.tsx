import Link from "next/link";

const TEMPLATES = [
  { slug: "agency", label: "Agency", emoji: "🏢" },
  { slug: "ai-automation", label: "AI Automation", emoji: "🤖" },
  { slug: "automotive", label: "Automotive", emoji: "🚗" },
  { slug: "bakery", label: "Bakery", emoji: "🍞" },
  { slug: "bar-nightlife", label: "Bar & Nightlife", emoji: "🍸" },
  { slug: "catering", label: "Catering", emoji: "🍽️" },
  { slug: "church", label: "Church", emoji: "⛪" },
  { slug: "coaching", label: "Coaching", emoji: "🎯" },
  { slug: "community", label: "Community", emoji: "🤝" },
  { slug: "construction", label: "Construction", emoji: "🏗️" },
  { slug: "content-creator", label: "Content Creator", emoji: "🎬" },
  { slug: "dental", label: "Dental", emoji: "🦷" },
  { slug: "dev-tools", label: "Dev Tools", emoji: "🛠️" },
  { slug: "digital-products", label: "Digital Products", emoji: "💾" },
  { slug: "dropshipping", label: "Dropshipping", emoji: "📦" },
  { slug: "ecommerce", label: "E-Commerce", emoji: "🛒" },
  { slug: "entertainment", label: "Entertainment", emoji: "🎭" },
  { slug: "event-planning", label: "Event Planning", emoji: "🎉" },
  { slug: "fashion-brand", label: "Fashion Brand", emoji: "👗" },
  { slug: "finance", label: "Finance", emoji: "💰" },
  { slug: "fitness", label: "Fitness", emoji: "💪" },
  { slug: "food-delivery", label: "Food Delivery", emoji: "🛵" },
  { slug: "freelance", label: "Freelance", emoji: "💻" },
  { slug: "hotel", label: "Hotel", emoji: "🏨" },
  { slug: "legal", label: "Legal", emoji: "⚖️" },
  { slug: "local-service", label: "Local Service", emoji: "🔧" },
  { slug: "marketplace", label: "Marketplace", emoji: "🏪" },
  { slug: "medical", label: "Medical", emoji: "🏥" },
  { slug: "mobile-app", label: "Mobile App", emoji: "📱" },
  { slug: "newsletter", label: "Newsletter", emoji: "📰" },
  { slug: "nonprofit", label: "Nonprofit", emoji: "❤️" },
  { slug: "online-course", label: "Online Course", emoji: "🎓" },
  { slug: "pet-services", label: "Pet Services", emoji: "🐾" },
  { slug: "photography", label: "Photography", emoji: "📷" },
  { slug: "portfolio-personal", label: "Portfolio / Personal", emoji: "🙋" },
  { slug: "property-management", label: "Property Management", emoji: "🏘️" },
  { slug: "real-estate", label: "Real Estate", emoji: "🏠" },
  { slug: "restaurant", label: "Restaurant", emoji: "🍴" },
  { slug: "retail", label: "Retail", emoji: "🏬" },
  { slug: "saas", label: "SaaS", emoji: "☁️" },
  { slug: "salon", label: "Salon", emoji: "💇" },
  { slug: "startup", label: "Startup", emoji: "🚀" },
  { slug: "subscription-box", label: "Subscription Box", emoji: "🎁" },
  { slug: "tech-company", label: "Tech Company", emoji: "💡" },
  { slug: "therapy", label: "Therapy", emoji: "🧠" },
  { slug: "tour-travel", label: "Tour & Travel", emoji: "✈️" },
  { slug: "trades", label: "Trades", emoji: "⚡" },
  { slug: "tutoring", label: "Tutoring", emoji: "📚" },
  { slug: "wellness", label: "Wellness", emoji: "🌿" },
  { slug: "yoga-studio", label: "Yoga Studio", emoji: "🧘" },
];

export default function PreviewIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Template Gallery</h1>
          <p className="text-muted-foreground text-lg">
            {TEMPLATES.length} landing page templates — click any to preview
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {TEMPLATES.map(({ slug, label, emoji }) => (
            <Link
              key={slug}
              href={`./preview/${slug}`}
              className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center hover:border-primary hover:shadow-md transition-all duration-200"
            >
              <span className="text-3xl">{emoji}</span>
              <span className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors leading-tight">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
