import { notFound } from "next/navigation";
import AgencyTemplate from "@/templates/agency";
import AiAutomationTemplate from "@/templates/ai-automation";
import AutomotiveTemplate from "@/templates/automotive";
import BakeryTemplate from "@/templates/bakery";
import BarNightlifeTemplate from "@/templates/bar-nightlife";
import CateringTemplate from "@/templates/catering";
import ChurchTemplate from "@/templates/church";
import CoachingTemplate from "@/templates/coaching";
import CommunityTemplate from "@/templates/community";
import ConstructionTemplate from "@/templates/construction";
import ContentCreatorTemplate from "@/templates/content-creator";
import DentalTemplate from "@/templates/dental";
import DevToolsTemplate from "@/templates/dev-tools";
import DigitalProductsTemplate from "@/templates/digital-products";
import DropshippingTemplate from "@/templates/dropshipping";
import EcommerceTemplate from "@/templates/ecommerce";
import EntertainmentTemplate from "@/templates/entertainment";
import EventPlanningTemplate from "@/templates/event-planning";
import FashionBrandTemplate from "@/templates/fashion-brand";
import FinanceTemplate from "@/templates/finance";
import FitnessTemplate from "@/templates/fitness";
import FoodDeliveryTemplate from "@/templates/food-delivery";
import FreelanceTemplate from "@/templates/freelance";
import HotelTemplate from "@/templates/hotel";
import LegalTemplate from "@/templates/legal";
import LocalServiceTemplate from "@/templates/local-service";
import MarketplaceTemplate from "@/templates/marketplace";
import MedicalTemplate from "@/templates/medical";
import MobileAppTemplate from "@/templates/mobile-app";
import NewsletterTemplate from "@/templates/newsletter";
import NonprofitTemplate from "@/templates/nonprofit";
import OnlineCourseTemplate from "@/templates/online-course";
import PetServicesTemplate from "@/templates/pet-services";
import PhotographyTemplate from "@/templates/photography";
import PortfolioPersonalTemplate from "@/templates/portfolio-personal";
import PropertyManagementTemplate from "@/templates/property-management";
import RealEstateTemplate from "@/templates/real-estate";
import RestaurantTemplate from "@/templates/restaurant";
import RetailTemplate from "@/templates/retail";
import SaasTemplate from "@/templates/saas";
import SalonTemplate from "@/templates/salon";
import StartupTemplate from "@/templates/startup";
import SubscriptionBoxTemplate from "@/templates/subscription-box";
import TechCompanyTemplate from "@/templates/tech-company";
import TherapyTemplate from "@/templates/therapy";
import TourTravelTemplate from "@/templates/tour-travel";
import TradesTemplate from "@/templates/trades";
import TutoringTemplate from "@/templates/tutoring";
import WellnessTemplate from "@/templates/wellness";
import YogaStudioTemplate from "@/templates/yoga-studio";

const TEMPLATES: Record<string, React.ComponentType> = {
  "agency": AgencyTemplate,
  "ai-automation": AiAutomationTemplate,
  "automotive": AutomotiveTemplate,
  "bakery": BakeryTemplate,
  "bar-nightlife": BarNightlifeTemplate,
  "catering": CateringTemplate,
  "church": ChurchTemplate,
  "coaching": CoachingTemplate,
  "community": CommunityTemplate,
  "construction": ConstructionTemplate,
  "content-creator": ContentCreatorTemplate,
  "dental": DentalTemplate,
  "dev-tools": DevToolsTemplate,
  "digital-products": DigitalProductsTemplate,
  "dropshipping": DropshippingTemplate,
  "ecommerce": EcommerceTemplate,
  "entertainment": EntertainmentTemplate,
  "event-planning": EventPlanningTemplate,
  "fashion-brand": FashionBrandTemplate,
  "finance": FinanceTemplate,
  "fitness": FitnessTemplate,
  "food-delivery": FoodDeliveryTemplate,
  "freelance": FreelanceTemplate,
  "hotel": HotelTemplate,
  "legal": LegalTemplate,
  "local-service": LocalServiceTemplate,
  "marketplace": MarketplaceTemplate,
  "medical": MedicalTemplate,
  "mobile-app": MobileAppTemplate,
  "newsletter": NewsletterTemplate,
  "nonprofit": NonprofitTemplate,
  "online-course": OnlineCourseTemplate,
  "pet-services": PetServicesTemplate,
  "photography": PhotographyTemplate,
  "portfolio-personal": PortfolioPersonalTemplate,
  "property-management": PropertyManagementTemplate,
  "real-estate": RealEstateTemplate,
  "restaurant": RestaurantTemplate,
  "retail": RetailTemplate,
  "saas": SaasTemplate,
  "salon": SalonTemplate,
  "startup": StartupTemplate,
  "subscription-box": SubscriptionBoxTemplate,
  "tech-company": TechCompanyTemplate,
  "therapy": TherapyTemplate,
  "tour-travel": TourTravelTemplate,
  "trades": TradesTemplate,
  "tutoring": TutoringTemplate,
  "wellness": WellnessTemplate,
  "yoga-studio": YogaStudioTemplate,
};

export function generateStaticParams() {
  return Object.keys(TEMPLATES).map((template) => ({ template }));
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ template: string }>;
}) {
  const { template } = await params;
  const Component = TEMPLATES[template];
  if (!Component) notFound();
  return <Component />;
}
