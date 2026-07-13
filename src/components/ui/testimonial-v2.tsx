import React from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";

// --- Types ---
interface Testimonial {
  text: string;
  name: string;
  role: string;
  stars: number;
}

// --- Data ---
const testimonials: Testimonial[] = [
  {
    text: "Ich war anfangs sehr skeptisch, aber Rijam hat mir die Augen geöffnet. Die Legung war so detailreich, das konnte niemand vorher wissen. Jetzt sehe ich wieder klarer.",
    name: "Silvia M.",
    role: "Verifiziert über Trustpilot",
    stars: 5,
  },
  {
    text: "Danke für die tolle Begleitung in meiner schwersten Zeit! Er hat eine wahnsinnig beruhigende Art. Die Energiearbeit hat mir geholfen, endlich wieder durchzuatmen.",
    name: "Patrick K.",
    role: "Kunde via WhatsApp",
    stars: 5,
  },
  {
    text: "Sehr einfühlsam und sympathisch. Es hat etwas gedauert, aber die energetische Blockadenlösung ist spürbar. Eine echte Hilfe.",
    name: "Lara",
    role: "Bewertung über Kleinanzeigen",
    stars: 4,
  },
  {
    text: "Nach der Trennung war ich am Boden zerstört. Dank Rijams einfühlsamer Beratung und Energiearbeit haben mein Partner und ich wieder einen Weg zueinander gefunden. Unendlich dankbar!",
    name: "Andreas H.",
    role: "Verifiziert über Trustpilot",
    stars: 5,
  },
  {
    text: "Ehrliche Beratung ohne falsche Hoffnungen. Rijam sagt einem wirklich, was er sieht, auch wenn es manchmal wehtut. Genau das hat mir geholfen, die richtige Entscheidung zu treffen.",
    name: "Melanie S.",
    role: "Klientin via WhatsApp",
    stars: 5,
  },
  {
    text: "Ich habe mich nach Jahren voller energetischer Blockaden endlich getraut, eine Reinigung machen zu lassen. Der Unterschied ist wie Tag und Nacht, ich fühle mich wieder frei.",
    name: "Christian P.",
    role: "Bewertung über Kleinanzeigen",
    stars: 5,
  },
  {
    text: "Sehr sympathischer Kontakt und schnelle Hilfe bei dringenden Fragen. Seine Audio-Analysen auf WhatsApp sind Gold wert, man kann sie sich immer wieder anhören.",
    name: "Sarah & Tom",
    role: "Verifiziert über Trustpilot",
    stars: 5,
  },
  {
    text: "Absolut ehrliche und kompetente Beratung. Rijam redet nichts schön, sondern hilft wirklich, den eigenen Weg wiederzufinden. Sehr professionell.",
    name: "Sabine B.",
    role: "Klientin via WhatsApp",
    stars: 4,
  },
  {
    text: "Alles eingetroffen wie vorhergesagt! Ich bin fassungslos, wie präzise seine Hellsichtigkeit ist. Absolute Herzensempfehlung für alle, die Klarheit suchen.",
    name: "Thomas M.",
    role: "Bewertung über Kleinanzeigen",
    stars: 5,
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- Sub-Components ---
const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, name, role, stars }, i) => (
                <motion.li 
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{ 
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(222, 219, 200, 0.15)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  whileFocus={{ 
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(222, 219, 200, 0.15)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  className="p-8 rounded-3xl border border-white/5 shadow-2xl max-w-xs w-full bg-[#101010] hover:bg-[#151515] hover:border-primary/25 transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-primary/30" 
                >
                  <blockquote className="m-0 p-0">
                    {/* Star Rating for Spiritual Vibe */}
                    <div className="flex text-amber-500 gap-1 mb-4">
                      {[...Array(5)].map((_, starIdx) => (
                        <Star 
                          key={starIdx} 
                          size={14} 
                          fill={starIdx < stars ? "currentColor" : "none"} 
                          className={starIdx < stars ? "text-amber-500" : "text-gray-600"} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-300 leading-relaxed font-light text-sm m-0 transition-colors duration-300">
                      „{text}“
                    </p>
                    <footer className="flex items-center gap-3 mt-6 border-t border-white/5 pt-4">
                      <div className="flex flex-col">
                        <cite className="font-semibold not-italic tracking-tight leading-5 text-[#E1E0CC] transition-colors duration-300">
                          {name}
                        </cite>
                        <span className="text-[11px] leading-5 tracking-tight text-gray-500 mt-0.5 transition-colors duration-300">
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

export default function TestimonialsSection() {
  return (
    <section 
      aria-labelledby="testimonials-heading"
      className="bg-transparent py-16 md:py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl px-4 z-10 mx-auto">
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto mb-12 text-center">
          <span className="text-primary text-xs font-semibold tracking-widest uppercase mb-4 block">
            Kundenstimmen
          </span>

          <h2 id="testimonials-heading" className="text-3xl sm:text-4xl md:text-5xl text-[#E1E0CC] tracking-tight">
            Echte Erfahrungen von zufriedenen Kunden
          </h2>
          <div className="w-16 h-[1px] bg-primary/40 mx-auto mt-6 mb-4" />
          <p className="text-center text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg">
            Höchste Zufriedenheit steht für mich an erster Stelle. Das sagen Menschen, die ich feinfühlig begleiten durfte.
          </p>
        </div>

        <div 
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[640px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={22} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={20} />
        </div>
      </div>
    </section>
  );
}
