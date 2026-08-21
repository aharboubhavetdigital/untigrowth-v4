import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, CheckCircle2, Quote, Sparkles, Building2, UserCheck, ShieldCheck } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
  location: string;
  tag: string;
  badge: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Grâce au Private Talent Cloud d'IAweb.dev, nous avons staffé notre projet d'agent IA avec 2 freelances seniors qualifiés en moins de 48h. Le cadrage était impeccable.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    name: "Sarah El Mansouri",
    role: "Directrice Digitale",
    company: "Fintech Casablanca",
    location: "🇲🇦 Casablanca",
    tag: "Agent IA & Automation",
    badge: "Client Grand Compte",
    rating: 5,
  },
  {
    quote:
      "La présélection technique via QCM IA et l'encadrement par le responsable métier me garantissent des missions à forte valeur ajoutée. Je me concentre uniquement sur le code.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    name: "Mehdi Benjelloun",
    role: "Lead Fullstack & IA",
    company: "Freelance Senior Validé",
    location: "🇲🇦 Rabat",
    tag: "Développement Fullstack",
    badge: "Talent Certifié Unitgrowth",
    rating: 5,
  },
  {
    quote:
      "Le modèle au forfait avec paiements sécurisés et jalons clairs élimine tout risque. On sait exactement ce qu'on paie et la livraison respecte scrupuleusement le calendrier.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
    name: "Aina Rakotomalala",
    role: "Chief Product Officer",
    company: "Tech Hub Madagascar",
    location: "🇲🇬 Antananarivo",
    tag: "Mobile & Back-Office",
    badge: "Projet Livré au Forfait",
    rating: 5,
  },
];

const stats = [
  { value: "4.9/5", label: "Satisfaction globale clients & freelances" },
  { value: "48h", label: "Délai moyen de staffing qualifié" },
  { value: "100%", label: "Missions cadrées et livrées au forfait" },
  { value: "120+", label: "Talents certifiés au Maroc & Madagascar" },
];

export function TestimonialsSection() {
  return (
    <section className="bg-[#0B0D10] py-24 sm:py-32 border-b border-white/10 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-[#A8E635]/10 via-[#A8E635]/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#A8E635]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15181D] border border-white/10 text-xs font-mono font-bold tracking-wider text-[#A8E635] uppercase mb-5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#A8E635] animate-pulse" />
            TÉMOIGNAGES & RETOURS D&apos;EXPÉRIENCE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ils propulsent leurs projets avec le Private Talent Cloud
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#98A2B3] leading-relaxed">
            Entreprises, startups et freelances d&apos;élite témoignent de l&apos;efficacité du modèle au forfait encadré par IAweb.dev.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, i) => {
            return (
              <div
                key={i}
                className="bg-[#13161C] border border-white/10 rounded-2xl p-5 text-center relative group hover:border-[#A8E635]/40 transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight group-hover:text-[#A8E635] transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs text-[#98A2B3] font-medium mt-1">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, index) => (
            <TestimonialCard key={index} testimonial={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
  key?: React.Key;
}) {
  const { quote, name, role, company, image, location, tag, badge, rating } = testimonial;

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between bg-[#13161C] border-2 border-white/60 hover:border-[#A8E635] rounded-3xl p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden",
        "bg-gradient-to-b from-black via-[#13161C] to-black"
      )}
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#A8E635] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Card Header: Tag & Badge */}
        <div className="flex items-center justify-between gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8E635]/10 border border-[#A8E635]/30 text-[11px] font-mono font-bold text-[#A8E635] uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {badge}
          </span>
          <span className="text-xs font-mono text-white/50 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
            {location}
          </span>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#A8E635] text-[#A8E635]" />
          ))}
        </div>

        {/* Quote Content */}
        <blockquote className="relative space-y-3">
          <Quote className="w-8 h-8 text-[#A8E635]/20 rotate-180 absolute -top-2 -left-2 pointer-events-none" />
          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal pt-2 group-hover:text-white transition-colors">
            &ldquo;{quote}&rdquo;
          </p>
        </blockquote>
      </div>

      {/* Footer / Author info */}
      <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="size-11 rounded-full ring-2 ring-[#A8E635]/50 ring-offset-2 ring-offset-black">
            <AvatarImage alt={name} src={image} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-white text-sm group-hover:text-[#A8E635] transition-colors">
              {name}
            </span>
            <span className="text-xs text-[#98A2B3]">
              {role} · <strong className="text-white/80 font-medium">{company}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialsSection;
