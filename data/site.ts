import type { LucideIcon } from "lucide-react";
import {
  Award,
  Box,
  Building2,
  CheckCircle2,
  Circle,
  CircleDollarSign,
  ClipboardCheck,
  Globe2,
  HandHeart,
  HeartHandshake,
  Instagram,
  Mail,
  MapPin,
  Megaphone,
  PackageCheck,
  School,
  Send,
  ShieldCheck,
  Shirt,
  Target,
  Trophy,
  Truck,
  Users
} from "lucide-react";

export type IconContent = {
  icon: LucideIcon;
  title?: string;
  label?: string;
  description?: string;
};

export const site = {
  name: "Soccer-4-All",
  url: "https://soccer-4-all.org",
  description:
    "Empowering children through soccer by providing essential equipment to underserved communities.",
  email: "soccer4allnow@gmail.com",
  instagramHandle: "@soccer4allnow",
  instagramUrl: "https://instagram.com/soccer4allnow",
  nonprofitStatus: "Soccer-4-All is a registered 501(c)(3) nonprofit organization."
};

export const images = {
  logo:
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696ecb99327e4f4d0ee86c35/11411bf75_soccer4allLOGONOBG.png",
  icon:
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696ecb99327e4f4d0ee86c35/fd7e9421f_soccer4allnobg.png",
  homeHero:
    "https://images.unsplash.com/photo-1744565473172-a3c64b1e1bbb?auto=format&fit=crop&w=1920&q=80",
  missionHero:
    "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1920&q=80",
  impactHero:
    "https://images.unsplash.com/photo-1528115931309-a6241625e058?auto=format&fit=crop&w=1920&q=80",
  storiesHero:
    "https://images.unsplash.com/photo-1652665314612-c48e10a01598?auto=format&fit=crop&w=1920&q=80",
  getInvolvedHero:
    "https://images.unsplash.com/photo-1622659097574-c814ee26068e?auto=format&fit=crop&w=1920&q=80",
  contactHero:
    "https://images.unsplash.com/photo-1563485572254-f7726be2d989?auto=format&fit=crop&w=1920&q=80",
  donateHero:
    "https://images.unsplash.com/photo-1622659097509-4d56de14539e?auto=format&fit=crop&w=1920&q=80",
  fundingGear:
    "https://images.unsplash.com/photo-1548077880-656c402b344e?auto=format&fit=crop&w=1200&q=80",
  fundingBalls:
    "https://images.unsplash.com/photo-1746333253387-5aac26260c96?auto=format&fit=crop&w=1200&q=80",
  fundingDelivery:
    "https://images.unsplash.com/photo-1506185386801-3d7bc0ddd2bf?auto=format&fit=crop&w=1200&q=80",
  solutionGear:
    "https://images.unsplash.com/photo-1665692617577-0042afc9fb93?auto=format&fit=crop&w=1200&q=80",
  solutionDelivery:
    "https://images.unsplash.com/photo-1631218279676-47a3aaaceae2?auto=format&fit=crop&w=1200&q=80",
  story:
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696ecb99327e4f4d0ee86c35/4e50fd652_UgandaHandDelivery-02355.jpg",
  homeStory:
    "https://images.unsplash.com/photo-1771257807779-a72e74deaa11?auto=format&fit=crop&w=1400&q=80",
  problem:
    "https://images.unsplash.com/photo-1766046059655-9eeb595dc13b?auto=format&fit=crop&w=1400&q=80",
  maria:
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696ecb99327e4f4d0ee86c35/e89676dd9_image.png",
  coach:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  principal:
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop"
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Mission", href: "/mission" },
  { label: "Impact", href: "/impact" },
  { label: "Stories", href: "/stories" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Contact", href: "/contact" }
];

export const stats = [
  { icon: PackageCheck, value: "3,000+", label: "Pieces of Gear", tone: "gold" },
  { icon: Users, value: "1,000+", label: "Children Supported", tone: "green" },
  { icon: CircleDollarSign, value: "$20,000+", label: "Invested in Impact", tone: "gold" },
  { icon: Globe2, value: "8", label: "Countries Reached", tone: "green" }
];

export const fundingCategories = [
  {
    icon: Shirt,
    title: "Equipment Kits",
    description:
      "Complete gear packages including cleats, uniforms, and shin guards to outfit young players.",
    image: images.fundingGear,
    imagePosition: "center 54%"
  },
  {
    icon: Circle,
    title: "Soccer Balls",
    description:
      "Quality training and match balls that give every child the chance to practice and play.",
    image: images.fundingBalls,
    imagePosition: "center 58%"
  },
  {
    icon: Truck,
    title: "Delivery & Logistics",
    description:
      "Shipping and partnerships with local organizations to ensure gear reaches those who need it.",
    image: images.fundingDelivery,
    imagePosition: "center 50%"
  }
];

export const donationChoices = [
  {
    amount: 15,
    icon: HandHeart,
    title: "Essentials",
    description: "Helps provide socks and shin guards for young players"
  },
  {
    amount: 35,
    icon: Shirt,
    title: "Gear Support",
    description: "Supports part of a complete gear kit"
  },
  {
    amount: 75,
    icon: Box,
    title: "Uniform & Cleats",
    description: "Helps provide a uniform or cleats"
  },
  {
    amount: 120,
    icon: PackageCheck,
    title: "Full Kit",
    description: "Helps fund a complete gear kit for one child"
  }
];

export const donationAmounts = [15, 35, 75, 120, 250];

export const donationImpactText: Record<number, string> = {
  15: "Helps provide socks and shin guards",
  35: "Supports part of a gear kit",
  75: "Helps provide a uniform or cleats",
  120: "Helps fund a complete gear kit",
  250: "Helps equip 2 children with gear",
  500: "Helps sponsor a team distribution"
};

export const moneyBreakdown = [
  { icon: Box, label: "Equipment", percentage: 70 },
  { icon: Truck, label: "Delivery", percentage: 20 },
  { icon: Users, label: "Community Programs", percentage: 10 }
];

export const transparencyCards = [
  {
    icon: ClipboardCheck,
    title: "Impact Reports",
    description: "Regular updates on where gear goes and who it helps."
  },
  {
    icon: Users,
    title: "Community Partners",
    description: "Trusted local organizations ensure delivery."
  }
];

export const testimonials = [
  {
    quote:
      "Seeing my daughter's face light up when she got her first pair of cleats, that's why we donate. Soccer-4-All makes it happen.",
    author: "Maria G.",
    role: "Monthly Donor",
    image: images.maria
  },
  {
    quote:
      "As a youth coach, I've seen firsthand how proper equipment changes everything. These kids can finally focus on the game.",
    author: "Coach David",
    role: "Community Partner",
    image: images.coach
  },
  {
    quote:
      "My school sponsored 20 gear kits last year. The impact on our students' confidence was incredible.",
    author: "Principal Johnson",
    role: "School Sponsor",
    image: images.principal
  }
];

export const timeline = [
  {
    year: "September 2021",
    title: "Foundation",
    description: "Soccer-4-All was founded with a mission to provide gear to underserved youth.",
    kits: "50"
  },
  {
    year: "2022",
    title: "First Major Distribution",
    description:
      "Partnered with community organizations to deliver gear kits across multiple countries.",
    kits: "400"
  },
  {
    year: "2023",
    title: "Expansion",
    description: "Reached 8 countries and launched our monthly donor program.",
    kits: "800"
  },
  {
    year: "2024",
    title: "Growing Impact",
    description: "Equipped 1,000+ children with quality soccer gear.",
    kits: "1,000+"
  },
  {
    year: "2025",
    title: "Regional Reach",
    description:
      "Expanded partnerships across 8 countries and launched our community ambassador program.",
    kits: "1,500+"
  },
  {
    year: "2026",
    title: "Continued Growth",
    description:
      "On track to reach 3,000+ children and strengthen local community partnerships.",
    kits: "3,000+"
  }
];

export const missionPillars = [
  {
    icon: Trophy,
    title: "Confidence",
    description: "Every goal scored, every save made builds self-belief that lasts a lifetime."
  },
  {
    icon: HeartHandshake,
    title: "Teamwork",
    description: "Learning to work together, support each other, and celebrate as one."
  },
  {
    icon: Target,
    title: "Belonging",
    description: "Being part of a team means having a place where you matter."
  }
];

export const processSteps = [
  {
    step: 1,
    icon: CircleDollarSign,
    title: "Raise Funds",
    description: "Donations come in from individuals, businesses, and fundraisers."
  },
  {
    step: 2,
    icon: Box,
    title: "Purchase Gear",
    description: "We source quality cleats, uniforms, balls, and equipment."
  },
  {
    step: 3,
    icon: PackageCheck,
    title: "Pack Kits",
    description: "Complete gear kits are assembled for individual children."
  },
  {
    step: 4,
    icon: Truck,
    title: "Deliver to Communities",
    description: "Partner organizations receive and distribute gear locally."
  },
  {
    step: 5,
    icon: Send,
    title: "Share Updates",
    description: "Donors receive impact reports and photos from the field."
  }
];

export const fundraiserSteps = [
  {
    icon: Target,
    title: "Set Your Goal",
    description: "Choose how many gear kits you want to fund"
  },
  {
    icon: Megaphone,
    title: "Share Your Link",
    description: "Get a personal fundraising page to share"
  },
  {
    icon: Award,
    title: "Track Progress",
    description: "Watch your impact grow in real-time"
  },
  {
    icon: Trophy,
    title: "Celebrate Impact",
    description: "See the kids your efforts helped"
  }
];

export const partnerTypes = [
  {
    icon: Building2,
    title: "Corporate Sponsor",
    description: "Fund a gear distribution and get recognition"
  },
  {
    icon: School,
    title: "School Partner",
    description: "Nominate your school to receive gear kits"
  },
  {
    icon: HandHeart,
    title: "Community Organization",
    description: "Partner with us to distribute gear locally"
  }
];

export const donationFaqs = [
  {
    question: "Is my donation tax-deductible?",
    answer:
      "Soccer-4-All is a registered 501(c)(3) nonprofit organization. Donations may be tax-deductible to the extent permitted by law. Please consult with your tax advisor and retain your donation receipt for tax purposes."
  },
  {
    question: "Where does my money go?",
    answer:
      "Approximately 70% goes directly to purchasing gear, 20% to delivery and logistics, and 10% to community distribution programs. We prioritize getting gear to kids efficiently."
  },
  {
    question: "How do you deliver equipment?",
    answer:
      "We partner with trusted local organizations (schools, youth programs, and community centers) who know their communities and ensure gear reaches the children who need it most."
  },
  {
    question: "Can I donate monthly?",
    answer:
      "Yes! Monthly donations help us plan ahead and provide consistent support to communities. You can choose any amount and cancel anytime."
  }
];

export const featuredStory = {
  name: "Sports Charity Mwanza",
  location: "Mwanza, Tanzania",
  image: images.story,
  quote:
    "Soccer-4-All didn't just give us equipment, they gave our kids a reason to believe.",
  story:
    "Last spring, Sports Charity Mwanza received 50 complete gear kits through our partnership. For many of these children, it was the first time they had equipment of their own. The results have been remarkable: attendance is up 40%, and three players have been recruited by regional academy teams. 'These kids have so much talent,' says Program Director Emmanuel Kipanga. 'Now they have the tools to show it.'"
};

export const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: site.email,
    href: `mailto:${site.email}`
  },
  {
    icon: Instagram,
    title: "Instagram",
    value: site.instagramHandle,
    href: site.instagramUrl
  }
];

export const trustPoints = [
  { icon: ShieldCheck, label: "Secure donations" },
  { icon: Target, label: "Direct impact" },
  { icon: CheckCircle2, label: "Transparent mission" }
];

export const donationProvides = [
  {
    icon: Shirt,
    title: "Quality Uniforms",
    description: "Jerseys, shorts, and socks"
  },
  {
    icon: Circle,
    title: "Soccer Balls",
    description: "Training & match quality"
  },
  {
    icon: PackageCheck,
    title: "Complete Gear Kits",
    description: "Cleats, shin guards & more"
  }
];

export const contactSubjectOptions = [
  "General Inquiry",
  "Donation Question",
  "Partnership Inquiry",
  "Volunteer Interest",
  "Media/Press",
  "Other"
];

export const pageMetadata = {
  mission:
    "Ensuring every child has the gear they need to play soccer because the game should be for everyone.",
  impact:
    "Every donation creates ripples of change. See how Soccer-4-All gets kids in the game.",
  stories:
    "Real kids. Real change. Read Soccer-4-All stories from the field.",
  getInvolved:
    "Donate directly, start a fundraiser, or partner with Soccer-4-All to provide soccer gear to underserved children.",
  donate:
    "Make a one-time or monthly donation to help Soccer-4-All provide quality soccer gear to children who need it most.",
  contact:
    "Contact Soccer-4-All about donations, partnerships, volunteering, press, or general questions."
};

export { MapPin };
