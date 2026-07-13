import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { 
  ArrowRight, 
  Check, 
  X, 
  Sparkles, 
  Brain, 
  Phone, 
  MessageSquare, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  User, 
  Calendar, 
  Mail, 
  Send, 
  FileText, 
  Heart, 
  Moon, 
  Compass, 
  AlertCircle,
  Star,
  Activity,
  ChevronRight,
  ShieldAlert,
  HeartHandshake,
  Sun,
  Unlock
} from "lucide-react";
import { WordsPullUp } from "./components/WordsPullUp";
import { WordsPullUpMultiStyle } from "./components/WordsPullUpMultiStyle";
import { ScrollRevealText } from "./components/ScrollRevealText";
import TestimonialsSection from "./components/ui/testimonial-v2";
import { TiltCard } from "./components/TiltCard";

type PageType = "home" | "about" | "contact";

interface Testimonial {
  text: string;
  author: string;
  rating: number;
  source: "Trustpilot" | "Kleinanzeigen" | "WhatsApp";
  date: string;
}

interface Service {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  text: string;
  details: string[];
}

export default function App() {
  const [activePage, setActivePage] = useState<PageType>("home");
  const [hoveredNav, setHoveredNav] = useState<number | null>(null);
  const [scrollTarget, setScrollTarget] = useState<"services" | "testimonials" | null>(null);
  
  // Selection state for interactive analyzer
  const [selectedArea, setSelectedArea] = useState<string>("Partnerrückführung");
  
  // Inquiry form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [gdprAccepted, setGdprAccepted] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Legal modal states
  const [legalModalType, setLegalModalType] = useState<"impressum" | "widerruf" | "agb" | null>(null);

  // Scroll references for homepage sections
  const servicesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  // List of services
  const services: Service[] = [
    {
      id: "Partnerrückführung",
      title: "Partnerrückführung",
      icon: Heart,
      text: "Die Partnerrückführung ist ein kraftvoller Prozess, der dir hilft, verloren geglaubte Beziehungen wiederherzustellen. Ich unterstütze dich dabei, die emotionalen und energetischen Verbindungen zu deinem Seelenpartner zu stärken, damit ihr wieder zueinander findet. Mit meiner einfühlsamen Anleitung erforschen wir gemeinsam, wie alte Muster durchbrochen werden können, um eine liebevolle und harmonische Wiedervereinigung zu ermöglichen.",
      details: ["Lösung von Trennungsursachen", "Emotionale Blockaden abbauen", "Energetische Wiederannäherung", "Nachhaltige Beziehungsstabilisierung"]
    },
    {
      id: "Partnerzusammenführung",
      title: "Partnerzusammenführung",
      icon: HeartHandshake,
      text: "Die Partnerzusammenführung zielt darauf ab, dich mit deinem Wunschpartner zusammenzubringen und eine glückliche, harmonische Beziehung zu ermöglichen. Ich arbeite mit verschiedenen spirituellen Techniken, um die energetischen Blockaden zu identifizieren, die zwischen euch stehen könnten. Gemeinsam schaffen wir die Voraussetzungen für eine tiefe Verbindung und eine erfüllte Partnerschaft, die auf Liebe und Vertrauen basiert.",
      details: ["Seelenpartner-Verbindung", "Kommunikation harmonisieren", "Schutz vor äußeren Störungen", "Vertrauensbasis neu aufbauen"]
    },
    {
      id: "Kartenlegen",
      title: "Kartenlegen",
      icon: Compass,
      text: "Beim Kartenlegen erhalte ich wertvolle Einblicke in deine Lebenssituation und die Herausforderungen, vor denen du stehst. Die Karten bieten eine klare Perspektive auf deine Fragen und helfen dir, Entscheidungen mit mehr Klarheit zu treffen. Ich begleite dich durch die Deutung der Karten und enthülle die Botschaften, die das Universum für dich bereithält. Lass uns gemeinsam die Antworten finden, die du suchst.",
      details: ["Detaillierte Zukunftsprognosen", "Klarheit bei Lebensentscheidungen", "Liebe & Partnerschafts-Analysen", "Ursachenforschung bei Stagnation"]
    },
    {
      id: "Blockadenauflösung",
      title: "Blockadenauflösung",
      icon: Unlock,
      text: "Die Blockadenauflösung ist ein entscheidender Schritt, um emotionale und energetische Hindernisse in deinem Leben zu beseitigen. Ich helfe dir, die Ursachen dieser Blockaden zu identifizieren und zu transformieren, damit du wieder frei und unbeschwert leben kannst. Mit gezielten Methoden unterstütze ich dich, um alte Muster loszulassen und Raum für neues Wachstum und positive Veränderungen zu schaffen.",
      details: ["Karmische Verstrickungen lösen", "Ängste & Glaubenssätze auflösen", "Aktivierung der Selbstheilung", "Chakra-Harmonisierung"]
    },
    {
      id: "Handlesung",
      title: "Handlesung",
      icon: Sparkles,
      text: "Das Handlesen ist eine alte Kunst, die dir wertvolle Informationen über deine Lebenslinie und deine zukünftigen Möglichkeiten bietet. Durch die Analyse deiner Handlinien und -merkmale erkenne ich wichtige Aspekte deiner Persönlichkeit und deines Lebensweges. Diese Einblicke können dir helfen, besser zu verstehen, wo deine Stärken und Herausforderungen liegen und wie du dein volles Potenzial entfalten kannst.",
      details: ["Charakteranalyse & Potenziale", "Erkennung von Lebenswenden", "Liebes- & Herzlinien-Deutung", "Individuelle Lebenspfad-Orientierung"]
    }
  ];

  // Testimonials
  const testimonials: Testimonial[] = [
    {
      text: "Sehr zufrieden, hat alles super geklappt! Ich habe meinen Partner nach 6 Monaten Funkstille endlich wieder zurückgewonnen. Unglaublich dankbar.",
      author: "Silvia M.",
      rating: 5,
      source: "Trustpilot",
      date: "03.07.2026"
    },
    {
      text: "Vielen Dank für die ehrliche und kompetente Beratung. Rijam hat Dinge gesehen, die niemand sonst wissen konnte. Die Blockadenlösung war sofort spürbar.",
      author: "Patrick K.",
      rating: 5,
      source: "WhatsApp",
      date: "14.06.2026"
    },
    {
      text: "Sehr einfühlsam und sympathisch. Absolut zu empfehlen. Es tut so gut, endlich wieder frei atmen zu können nach der energetischen Reinigung.",
      author: "Lara",
      rating: 5,
      source: "Kleinanzeigen",
      date: "28.05.2026"
    }
  ];

  // Handle CTA inside Hero
  const handleHeroCTA = () => {
    setActivePage("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Scroll target hook
  useEffect(() => {
    if (activePage === "home" && scrollTarget) {
      const timer = setTimeout(() => {
        if (scrollTarget === "services") {
          servicesRef.current?.scrollIntoView({ behavior: "smooth" });
        } else if (scrollTarget === "testimonials") {
          testimonialsRef.current?.scrollIntoView({ behavior: "smooth" });
        }
        setScrollTarget(null);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [activePage, scrollTarget]);

  // Nav item click handler
  const handleNavClick = (label: string) => {
    if (label === "Startseite") {
      setScrollTarget(null);
      setActivePage("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (label === "Über mich") {
      setScrollTarget(null);
      setActivePage("about");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (label === "Leistungen") {
      if (activePage !== "home") {
        setScrollTarget("services");
        setActivePage("home");
      } else {
        servicesRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    } else if (label === "Kundenstimmen") {
      if (activePage !== "home") {
        setScrollTarget("testimonials");
        setActivePage("home");
      } else {
        testimonialsRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    } else if (label === "Kontakt") {
      setScrollTarget(null);
      setActivePage("contact");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Submit contact/analysis form
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gdprAccepted) return;
    setSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
    }, 1500);
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setBirthDate("");
    setEmail("");
    setPhone("");
    setMessage("");
    setGdprAccepted(false);
    setFormSubmitted(false);
  };

  // Stagger entry variables
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridInView = useInView(gridRef, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: (customIndex: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: customIndex * 0.12,
      },
    }),
  };

  return (
    <div className="bg-[#000000] min-h-screen text-gray-300 relative select-none selection:bg-primary selection:text-black">
      
      {/* HEADER / NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div className="pointer-events-auto flex items-center cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => handleNavClick("Startseite")}>
            <img 
              src="https://rijam.de/wp-content/plugins/phastpress/phast.php/c2VydmljZT1pbWFnZXMmc3JjPWh0dHBzJTNBJTJGJTJGcmlqYW0uZGUlMkZ3cC1jb250ZW50JTJGdXBsb2FkcyUyRjIwMjQlMkYwOSUyRmxvZ28tcmlqYW0ucG5nJmNhY2hlTWFya2VyPTE3MjgxNDE0MDUtODg4ODMmdG9rZW49NjAwMzg1MDBiZjI4NGVkNQ.q.png" 
              alt="Medium Rijam Logo" 
              className="h-12 sm:h-16 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Navigation Pill */}
          <nav className="hidden lg:flex pointer-events-auto bg-black/85 backdrop-blur-md rounded-full px-8 py-2.5 border border-white/5 shadow-2xl">
            <div className="flex items-center gap-8 xl:gap-10">
              {["Startseite", "Über mich", "Leistungen", "Kundenstimmen", "Kontakt"].map((label, i) => {
                const isPageActive = 
                  (label === "Startseite" && activePage === "home") ||
                  (label === "Über mich" && activePage === "about") ||
                  (label === "Kontakt" && activePage === "contact");

                return (
                  <button
                    key={i}
                    onClick={() => handleNavClick(label)}
                    onMouseEnter={() => setHoveredNav(i)}
                    onMouseLeave={() => setHoveredNav(null)}
                    style={{
                      color: isPageActive 
                        ? "#DEDBC8" 
                        : hoveredNav === i 
                          ? "#E1E0CC" 
                          : "rgba(225, 224, 204, 0.7)",
                      transition: "color 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
                    }}
                    className={`text-xs md:text-sm font-medium tracking-wide cursor-pointer transition-all relative py-1`}
                  >
                    {label}
                    {isPageActive && (
                      <motion.span 
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-1 right-1 h-[1.5px] bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* CTA Header Button */}
          <div className="pointer-events-auto">
            <button
              onClick={() => {
                setSelectedArea("Kartenlegen"); // default or active
                setActivePage("contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-primary hover:bg-[#E1E0CC] text-black font-semibold text-xs sm:text-sm px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 flex items-center gap-1.5 shadow-lg shadow-primary/10 active:scale-95 cursor-pointer"
            >
              <span className="hidden sm:inline">Kostenlose</span> Erstanalyse
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          </div>

        </div>

        {/* Mobile Navigation Bar - Fixed Bottom for exceptional UX */}
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm pointer-events-auto">
          <div className="bg-black/95 backdrop-blur-lg rounded-full py-2.5 px-4 border border-white/10 shadow-3xl flex items-center justify-around">
            {[
              { label: "Start", action: () => handleNavClick("Startseite"), active: activePage === "home" },
              { label: "Über mich", action: () => handleNavClick("Über mich"), active: activePage === "about" },
              { label: "Leistungen", action: () => handleNavClick("Leistungen"), active: false },
              { label: "Kontakt", action: () => handleNavClick("Kontakt"), active: activePage === "contact" }
            ].map((item, i) => (
              <button
                key={i}
                onClick={item.action}
                className={`text-[10px] sm:text-xs uppercase font-semibold tracking-wider px-2.5 py-1.5 rounded-full transition-all ${
                  item.active 
                    ? "text-black bg-primary font-bold" 
                    : "text-[#DEDBC8]/70 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* CORE PAGE CONTENT SWITCHER */}
      <AnimatePresence mode="wait">
        
        {/* HOMEPAGE VIEW */}
        {activePage === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* HERO SECTION */}
            <section className="min-h-screen w-full p-4 md:p-6 flex flex-col justify-between relative pt-24 md:pt-28">
              <div className="rounded-2xl md:rounded-[2.5rem] overflow-hidden relative w-full flex-grow flex flex-col justify-between bg-neutral-950 p-6 md:p-12 min-h-[680px] border border-white/5">
                
                {/* Background Video */}
                <video
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                />

                {/* Noise Overlay */}
                <div className="noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none absolute inset-0" />

                {/* Gradient Overlay */}
                <div className="bg-gradient-to-b from-black/50 via-black/20 to-black/90 absolute inset-0" />

                {/* Hero Title */}
                <div className="relative z-10 w-full max-w-5xl mx-auto mt-8 md:mt-12">
                  <div className="max-w-3xl">
                    <span className="text-primary text-xs font-semibold tracking-widest uppercase mb-3 block animate-pulse">
                      Spirituelle Beratung & Seelenarbeit
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-tight text-[#E1E0CC] mb-6">
                      Medium Rijam – Praxis für <span className="font-serif italic text-primary">spirituelle</span> & <span className="font-serif italic text-primary">psychologische</span> Arbeiten
                    </h1>
                    <p className="text-[#DEDBC8]/80 text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-2xl">
                      Dein Weg zu Liebe und Offenbarung. Ich helfe dir dabei, Blockaden zu lösen, Partnerschaften zu harmonisieren und deine Lebenskraft zurückzugewinnen.
                    </p>
                  </div>
                </div>

                {/* Interactive Analyse-Formular Inset Block */}
                <div className="relative z-10 w-full max-w-4xl mx-auto mt-12 mb-6">
                  <div className="bg-black/85 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl">
                    <h3 className="text-[#E1E0CC] text-base md:text-lg font-medium tracking-wide mb-5 flex items-center gap-2">
                      <Sparkles strokeWidth={1.5} className="text-primary w-5 h-5" />
                      In welchem Bereich benötigst du Unterstützung?
                    </h3>
                    
                    {/* Interactive Selection Tiles */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mb-6">
                      {services.map((service) => {
                        const IconComponent = service.icon;
                        const isSelected = selectedArea === service.id;
                        return (
                          <button
                            key={service.id}
                            onClick={() => setSelectedArea(service.id)}
                            className={`p-3 md:p-4 rounded-xl border text-center transition-all duration-300 flex flex-col items-center justify-center gap-2 group cursor-pointer ${
                              isSelected
                                ? "bg-[#212121] border-primary text-primary shadow-lg shadow-primary/5 scale-[1.02]"
                                : "bg-[#101010]/50 border-white/5 text-gray-400 hover:border-white/20 hover:text-[#E1E0CC]"
                            }`}
                          >
                            <IconComponent strokeWidth={1.5} className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isSelected ? 'text-primary' : 'text-gray-500'}`} />
                            <span className="text-[10px] sm:text-xs font-medium tracking-wide leading-tight break-words hyphens-auto max-w-full">
                              {service.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* CTA to complete */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
                      <p className="text-xs text-gray-400 font-light flex items-center gap-2">
                        <Lock strokeWidth={1.5} className="text-primary/70 w-3.5 h-3.5" />
                        100% diskret & absolut vertrauliche Datenübermittlung
                      </p>
                      <button
                        onClick={handleHeroCTA}
                        className="group flex items-center gap-2.5 bg-primary hover:bg-[#E1E0CC] text-black rounded-full pl-6 pr-1.5 py-1.5 transition-all duration-300 hover:gap-4 active:scale-95 self-stretch sm:self-auto justify-between cursor-pointer shadow-lg shadow-primary/5"
                      >
                        <span className="font-semibold text-xs sm:text-sm tracking-wide">
                          Jetzt kostenfreie Erstanalyse anfordern
                        </span>
                        <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                          <ArrowRight strokeWidth={1.5} className="text-primary w-4 h-4" />
                        </div>
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            </section>

            {/* SEKTION 2: VERTRAUENS-BAR */}
            <section ref={trustRef} className="bg-black border-y border-white/5 py-8 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 lg:gap-16">
                  
                  {/* Trust 1 */}
                  <div className="flex items-center gap-2 md:gap-3 bg-white/2 px-4 py-2 rounded-full border border-white/5">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-[#E1E0CC]">
                      Ausgezeichnet: <strong className="text-white font-semibold">4.6/5</strong> Sterne bei Trustpilot
                    </span>
                  </div>

                  {/* Trust 2 */}
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 strokeWidth={1.5} className="text-primary w-4 h-4 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-[#DEDBC8]">
                      100% Zufriedenheitsgarantie
                    </span>
                  </div>

                  {/* Trust 3 */}
                  <div className="flex items-center gap-2.5">
                    <Award strokeWidth={1.5} className="text-primary w-4 h-4 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-[#DEDBC8]">
                      Über 15 Jahre Erfahrung
                    </span>
                  </div>

                  {/* Trust 4 */}
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck strokeWidth={1.5} className="text-primary w-4 h-4 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-[#DEDBC8]">
                      Seriös & Ehrlich
                    </span>
                  </div>

                  {/* Trust 5 */}
                  <div className="flex items-center gap-2.5">
                    <Check strokeWidth={1.5} className="text-primary w-4 h-4 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-[#DEDBC8]">
                      Angemeldetes Gewerbe & Verbandsmitglied
                    </span>
                  </div>

                </div>
              </div>
            </section>

            {/* SEKTION 3: PROBLEM-LÖSUNG */}
            <section className="bg-[#101010] py-20 md:py-32 px-4 border-b border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/2 rounded-full blur-[120px] pointer-events-none" />
              
              <div className="max-w-4xl mx-auto text-center relative z-10">
                <span className="text-primary text-xs font-semibold tracking-widest uppercase mb-4 block">
                  Klarheit & Neuanfang
                </span>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#E1E0CC] tracking-tight mb-8">
                  Bereit für den nächsten Schritt?
                </h2>
                
                <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed font-light mb-10 max-w-3xl mx-auto">
                  Manchmal gerät das Leben aus den Fugen. Krisen in der Partnerschaft, tiefsitzende emotionale Blockaden oder das Gefühl, von negativen Energien blockiert zu werden, lasten schwer auf dem Alltag. Du musst diesen Weg nicht alleine gehen. Mit meiner langjährigen Erfahrung und feinfühligen medialen Arbeit helfe ich dir, die verborgenen Ursachen deiner Probleme zu ergründen. Gemeinsam schaffen wir Klarheit, lösen energetische Verstrickungen und ebnen den Weg für einen Neuanfang voller Liebe und Harmonie.
                </p>

                <button
                  onClick={handleHeroCTA}
                  className="bg-primary hover:bg-[#E1E0CC] text-black font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-300 shadow-xl shadow-primary/5 active:scale-95 inline-flex items-center gap-2.5 cursor-pointer"
                >
                  <span>Jetzt kostenfreie Erstanalyse anfordern</span>
                  <ArrowRight size={16} strokeWidth={1.5} />
                </button>
              </div>
            </section>

            {/* SEKTION 4: DAS LEISTUNGS-PORTFOLIO */}
            <section ref={servicesRef} className="bg-black py-20 md:py-32 px-4 relative">
              
              {/* Subtle background noise */}
              <div className="absolute inset-0 bg-noise opacity-[0.1] pointer-events-none" />

              <div className="max-w-7xl mx-auto relative z-10">
                
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-24">
                  <span className="text-primary text-xs font-semibold tracking-widest uppercase mb-4 block">
                    Professionelle Seelenarbeit
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#E1E0CC] tracking-tight">
                    Meine Leistungen für deine Seele
                  </h2>
                  <div className="w-16 h-[1px] bg-primary/40 mx-auto mt-6" />
                </div>

                {/* 5-Column Grid representing the 5 Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                  {services.map((service, index) => {
                    const IconComponent = service.icon;
                    return (
                      <TiltCard
                        key={service.id}
                        className="p-6 md:p-8 flex flex-col justify-between h-full"
                      >
                        <div>
                          {/* Header of card */}
                          <div className="flex justify-between items-start mb-6">
                            <div className="bg-neutral-900 p-3 rounded-xl border border-white/5 text-primary group-hover:scale-110 transition-transform duration-300">
                              <IconComponent strokeWidth={1.5} className="w-6 h-6" />
                            </div>
                            <span className="font-mono text-xs text-[#DEDBC8]/40 tracking-wider font-light">
                              0{index + 1}
                            </span>
                          </div>

                          <h3 className="text-xl font-medium text-[#E1E0CC] mb-4 tracking-tight group-hover:text-primary transition-colors">
                            {service.title}
                          </h3>

                          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                            {service.text}
                          </p>

                          {/* Quick details */}
                          <div className="border-t border-white/5 pt-4 space-y-2">
                            {service.details.map((detail, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <Check strokeWidth={1.5} className="text-primary w-3.5 h-3.5 shrink-0" />
                                <span className="text-xs text-gray-500 font-light">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Card Action */}
                        <button
                          onClick={() => {
                            setSelectedArea(service.id);
                            setActivePage("contact");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="mt-8 flex items-center gap-1.5 text-xs text-primary font-medium hover:text-white transition-colors self-start group/btn cursor-pointer"
                        >
                          <span>Analyse starten</span>
                          <ArrowRight size={14} strokeWidth={1.5} className="transform -rotate-45 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                        </button>

                      </TiltCard>
                    );
                  })}

                  {/* Trust Promo Card to balance layout */}
                  <TiltCard
                    containerClassName="lg:col-span-1 md:col-span-2"
                    className="p-8 flex flex-col justify-between h-full bg-gradient-to-br from-neutral-950 to-[#101010] border border-primary/20 hover:border-primary/40"
                  >
                    <div>
                      <div className="bg-primary/10 p-3.5 rounded-xl text-primary w-fit mb-6">
                        <Lock strokeWidth={1.5} className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-medium text-white tracking-tight mb-4">
                        Absolute Diskretion & Transparenz
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed font-light mb-6">
                        Jedes Gespräch, jede Auswertung und alle spirituellen Arbeiten unterliegen strengstem Datenschutz und absoluter Schweigepflicht. Deine Seele ist bei mir in sicheren Händen.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 bg-white/2 p-3 rounded-xl border border-white/5">
                      <ShieldCheck strokeWidth={1.5} className="text-primary w-5 h-5 shrink-0" />
                      <span className="text-xs text-[#DEDBC8] font-light">Verifiziertes & angemeldetes Gewerbe</span>
                    </div>
                  </TiltCard>

                </div>

                {/* Big CTA below grid */}
                <div className="text-center">
                  <button
                    onClick={handleHeroCTA}
                    className="bg-primary hover:bg-[#E1E0CC] text-black font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-300 inline-flex items-center gap-2.5 shadow-xl shadow-primary/5 active:scale-95 cursor-pointer"
                  >
                    <span>Analyse für meine Situation starten</span>
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </button>
                </div>

              </div>
            </section>

            {/* LANDINGPAGE ÜBER MICH TEASER */}
            <section className="bg-gradient-to-b from-neutral-950 to-black py-20 md:py-28 px-4 border-t border-white/5 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-primary/2 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                  
                  {/* Left Column: Image with sophisticated frame */}
                  <div className="md:col-span-5 flex justify-center">
                    <div className="relative group max-w-sm w-full">
                      {/* Artistic backdrops */}
                      <div className="absolute -inset-1.5 bg-gradient-to-r from-primary/30 via-amber-500/10 to-transparent rounded-[2rem] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                      
                      <div className="relative bg-black rounded-[2rem] p-3 border border-white/10 overflow-hidden shadow-2xl">
                        <img 
                          src="https://s1.directupload.eu/images/260713/kgthlxbv.webp" 
                          alt="Medium Rijam" 
                          className="w-full aspect-[4/5] object-cover rounded-[1.5rem] grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 ease-in-out hover:scale-[1.02]"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Introduction */}
                  <div className="md:col-span-7 space-y-6">
                    <span className="text-primary text-xs font-semibold tracking-widest uppercase block">
                      Persönliche Begleitung
                    </span>
                    
                    <h2 className="text-3xl sm:text-4xl font-normal text-[#E1E0CC] tracking-tight leading-tight">
                      Lerne mich kennen – <br />
                      <span className="font-serif italic text-primary">Medium Rijam</span>
                    </h2>
                    
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                      Als spirituelles Medium und Buchautor mit über 15 Jahren Erfahrung begleite ich Menschen feinfühlig auf ihrem einzigartigen Lebensweg. Meine Reise führte mich über die Jahre ins Ausland – von der Türkei über die Philippinen bis nach Bulgarien, wo ich heute lebe. Diese Reisen haben meinen Horizont erweitert und meine mediale Gabe tiefgreifend bereichert.
                    </p>

                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light">
                      Zusätzlich absolviere ich aktuell eine Ausbildung zum Heilpraktiker für Psychotherapie, um meine spirituelle Arbeit künftig durch fundierte psychologische Ansätze zu ergänzen.
                    </p>

                    <div className="pt-4 flex flex-wrap gap-4">
                      <button
                        onClick={() => {
                          setActivePage("about");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="bg-white/5 hover:bg-white/10 text-[#E1E0CC] border border-white/10 hover:border-white/20 px-6 py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
                      >
                        <span>Vollständige Story lesen</span>
                        <ArrowRight size={14} strokeWidth={1.5} />
                      </button>

                      <button
                        onClick={handleHeroCTA}
                        className="bg-primary hover:bg-[#E1E0CC] text-black px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer inline-flex items-center gap-2 shadow-lg shadow-primary/5"
                      >
                        <span>Jetzt Erstanalyse anfordern</span>
                        <ArrowRight size={14} strokeWidth={1.5} />
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            </section>

            {/* SEKTION 5: VERBANDSMITGLIEDSCHAFTEN */}
            <section className="bg-[#101010] py-20 px-4 border-t border-white/5">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <span className="text-primary text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-3 block">
                    Garantierte Seriosität
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-medium text-[#E1E0CC]">
                    Geprüfte Qualität & Seriöse Arbeit
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Association 1 */}
                  <div className="bg-black/40 border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center hover:border-primary/25 transition-colors">
                    <div className="bg-neutral-900 w-12 h-12 rounded-full flex items-center justify-center border border-white/10 mb-4">
                      <Award strokeWidth={1.5} className="text-primary w-6 h-6" />
                    </div>
                    <h4 className="text-white text-sm font-semibold mb-2">DAV e.V.</h4>
                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                      Mitglied im Deutschen Astrologen-Verband e.V.
                    </p>
                  </div>

                  {/* Association 2 */}
                  <div className="bg-black/40 border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center hover:border-primary/25 transition-colors">
                    <div className="bg-neutral-900 w-12 h-12 rounded-full flex items-center justify-center border border-white/10 mb-4">
                      <Brain strokeWidth={1.5} className="text-primary w-6 h-6" />
                    </div>
                    <h4 className="text-white text-sm font-semibold mb-2">VFP e.V.</h4>
                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                      Mitglied im Verband Freier Psychotherapeuten, Heilpraktiker für Psychotherapie und Psychologischer Berater e.V.
                    </p>
                  </div>

                  {/* Association 3 */}
                  <div className="bg-black/40 border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center hover:border-primary/25 transition-colors">
                    <div className="bg-neutral-900 w-12 h-12 rounded-full flex items-center justify-center border border-white/10 mb-4">
                      <ShieldCheck strokeWidth={1.5} className="text-primary w-6 h-6" />
                    </div>
                    <h4 className="text-white text-sm font-semibold mb-2">VUH e.V.</h4>
                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                      Mitglied im Verband Unabhängiger Heilpraktiker e.V.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SEKTION 6: SOCIAL PROOF */}
            <div ref={testimonialsRef}>
              <TestimonialsSection />
            </div>

          </motion.div>
        )}

        {/* ABOUT ME VIEW */}
        {activePage === "about" && (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="pt-32 pb-24 px-4 md:px-8 max-w-5xl mx-auto relative z-10"
          >
            {/* Header */}
            <div className="text-center mb-16">
              <span className="text-primary text-xs font-semibold tracking-widest uppercase mb-3 block">
                Meine Reise & Expertise
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#E1E0CC] tracking-tight mb-6">
                Über mich – <span className="font-serif italic text-primary">Spirituelles Medium</span> & Buchautor
              </h1>
              <div className="w-20 h-[1.5px] bg-primary/40 mx-auto" />
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-16">
              
              {/* Left Column: Visual decoration / text info card */}
              <div className="md:col-span-5 space-y-6">
                
                {/* Visual Avatar Card */}
                <div className="bg-[#101010] border border-white/5 rounded-3xl p-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-transparent" />
                  
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-primary/20 mx-auto overflow-hidden mb-6 relative shadow-inner">
                    <img 
                      src="https://s1.directupload.eu/images/260713/kgthlxbv.webp" 
                      alt="Medium Rijam" 
                      className="w-full h-full object-cover object-top scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <h3 className="text-white text-lg font-semibold tracking-wide">Medium Rijam</h3>
                  <span className="text-primary text-xs tracking-wider">Ausbildung & Mediale Führung</span>
                  
                  <div className="mt-6 pt-6 border-t border-white/5 text-left space-y-4">
                    <div className="flex items-center gap-3">
                      <Award strokeWidth={1.5} className="text-primary w-4 h-4 shrink-0" />
                      <span className="text-xs text-gray-400 font-light">15+ Jahre professionelle Seelenbegleitung</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Brain strokeWidth={1.5} className="text-primary w-4 h-4 shrink-0" />
                      <span className="text-xs text-gray-400 font-light">In Ausbildung zum Heilpraktiker f. Psychotherapie</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ShieldCheck strokeWidth={1.5} className="text-primary w-4 h-4 shrink-0" />
                      <span className="text-xs text-gray-400 font-light">Absolute Schweigepflicht & Diskretion</span>
                    </div>
                  </div>
                </div>

                {/* Bullets box */}
                <div className="bg-[#212121]/40 border border-white/5 rounded-2xl p-6">
                  <h4 className="text-[#E1E0CC] text-sm font-semibold mb-3">Ausbildungsschwerpunkte</h4>
                  <ul className="space-y-2 text-xs text-gray-400 font-light">
                    <li className="flex items-center gap-2">
                      <Check strokeWidth={1.5} className="text-primary w-3.5 h-3.5" /> Mediale & sensitive Heilarbeit
                    </li>
                    <li className="flex items-center gap-2">
                      <Check strokeWidth={1.5} className="text-primary w-3.5 h-3.5" /> Tiefenpsychologische Blockadenauflösung
                    </li>
                    <li className="flex items-center gap-2">
                      <Check strokeWidth={1.5} className="text-primary w-3.5 h-3.5" /> Energetische Reinigung & Aura-Schutz
                    </li>
                    <li className="flex items-center gap-2">
                      <Check strokeWidth={1.5} className="text-primary w-3.5 h-3.5" /> Karmische Konfliktlösungen
                    </li>
                  </ul>
                </div>

              </div>

              {/* Right Column: Story Narrative */}
              <div className="md:col-span-7 space-y-8 text-gray-300">
                
                {/* The Story */}
                <div className="space-y-6">
                  <h3 className="text-[#E1E0CC] text-lg sm:text-xl font-medium tracking-wide">Über mich</h3>
                  
                  <p className="text-sm sm:text-base leading-relaxed text-gray-300 font-light">
                    Als spirituelles Medium und Buchautor mit über 15 Jahren Erfahrung begleite ich Menschen auf ihrem einzigartigen spirituellen Weg. Vor einigen Jahren bin ich ins Ausland ausgewandert – zunächst in die Türkei, dann auf die Philippinen und jetzt in Bulgarien, wo ich meinen festen Wohnsitz habe.
                  </p>

                  <p className="text-sm sm:text-base leading-relaxed text-gray-300 font-light">
                    Diese Reise hat meine Sichtweise auf das Leben erweitert und meine Fähigkeit, Menschen in ihrer spirituellen Entwicklung zu unterstützen, bereichert. Ich freue mich darauf, dich auf deiner Reise zu begleiten und dir wertvolle Einsichten zu bieten!
                  </p>

                  <div className="bg-[#101010]/60 border border-white/5 rounded-2xl p-6">
                    <p className="text-xs sm:text-sm leading-relaxed text-gray-400 font-light">
                      Aktuell absolviere ich eine Ausbildung zum <span className="font-serif italic text-primary">Heilpraktiker für Psychotherapie</span> und werde nach Erhalt der Erlaubnisurkunde mein Angebot um psychotherapeutische Tätigkeiten erweitern.
                    </p>
                  </div>
                </div>

                {/* Mein Versprechen */}
                <div className="border-l-2 border-primary pl-4 py-1 italic">
                  <p className="text-xs sm:text-sm text-[#DEDBC8] leading-relaxed">
                    „Mein Versprechen: Vertrauen, absolute Diskretion und Transparenz sind das Fundament meiner Praxis. Jede Sitzung ist individuell und streng vertraulich.“
                  </p>
                </div>

                {/* CTA to Inquiry */}
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setActivePage("contact");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-primary hover:bg-[#E1E0CC] text-black font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg shadow-primary/5"
                  >
                    <span>Kostenlose Erstanalyse anfragen</span>
                    <ArrowRight size={14} strokeWidth={1.5} />
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* CONTACT & ERSTANALYSE VIEW */}
        {activePage === "contact" && (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="pt-32 pb-24 px-4 max-w-4xl mx-auto relative z-10"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <span className="text-primary text-xs font-semibold tracking-widest uppercase mb-3 block">
                Dein Weg zu mir
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#E1E0CC] tracking-tight mb-3">
                Dein Weg zu mir beginnt hier
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
                Lass uns gemeinsam einen Blick auf deine Situation werfen. Ich bin für dich da.
              </p>
              <div className="w-16 h-[1.5px] bg-primary/40 mx-auto mt-6" />
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Contact Information Sidebar */}
              <div className="md:col-span-4 space-y-6">
                
                {/* Immediate Contact Box */}
                <div className="bg-[#101010] border border-white/5 rounded-2xl p-6">
                  <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
                    Direkter Kontakt
                  </h3>
                  
                  <div className="space-y-4">
                    
                    {/* Phone */}
                    <div className="flex items-start gap-3">
                      <div className="bg-neutral-900 p-2.5 rounded-lg border border-white/5 text-primary">
                        <Phone size={16} strokeWidth={1.5} />
                      </div>
                      <div>
                        <span className="text-gray-500 text-[10px] uppercase font-mono">Telefon</span>
                        <p className="text-white text-xs sm:text-sm font-medium hover:text-primary transition-colors">
                          <a href="tel:+4915734404851">+49 1573 4404851</a>
                        </p>
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-start gap-3">
                      <div className="bg-neutral-900 p-2.5 rounded-lg border border-white/5 text-primary">
                        <MessageSquare size={16} strokeWidth={1.5} />
                      </div>
                      <div>
                        <span className="text-gray-500 text-[10px] uppercase font-mono">WhatsApp</span>
                        <p className="text-white text-xs sm:text-sm font-medium hover:text-primary transition-colors">
                          <a href="https://wa.me/4915510582407" target="_blank" rel="noreferrer">+49 1551 0582407</a>
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Important Notice Box */}
                <div className="bg-[#212121]/40 border border-white/5 rounded-2xl p-6">
                  <h4 className="text-[#DEDBC8] text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles strokeWidth={1.5} className="w-3.5 h-3.5 text-primary" />
                    Wie geht es weiter?
                  </h4>
                  <ol className="space-y-3 text-xs text-gray-400 font-light list-decimal pl-4 mt-3">
                    <li>Du sendest deine Erstanalyse über das Formular ein.</li>
                    <li>Ich werfe einen tiefen energetischen Blick auf deine Daten.</li>
                    <li>Du erhältst innerhalb von 24–48 Std. ein absolut kostenloses Feedback per E-Mail oder WhatsApp.</li>
                  </ol>
                </div>

              </div>

              {/* Inquiry Form Card */}
              <div className="md:col-span-8">
                <div className="bg-[#101010] border border-white/5 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-transparent" />

                  <AnimatePresence mode="wait">
                    {!formSubmitted ? (
                      <motion.form
                        key="contact-form"
                        onSubmit={handleFormSubmit}
                        className="space-y-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {/* Selected Support Area */}
                        <div>
                          <label className="block text-[10px] font-medium tracking-widest text-gray-400 uppercase mb-2">
                            Gewünschter Bereich
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                            {services.map((s) => (
                              <button
                                key={s.id}
                                type="button"
                                onClick={() => setSelectedArea(s.id)}
                                className={`py-2.5 px-2 text-[10px] sm:text-xs font-medium rounded-lg border transition-all text-center flex items-center justify-center min-h-[44px] break-words hyphens-auto leading-tight ${
                                  selectedArea === s.id
                                    ? "bg-primary text-black border-primary font-semibold"
                                    : "bg-black/50 text-gray-400 border-white/5 hover:border-white/10"
                                }`}
                              >
                                {s.title}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Name Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-medium tracking-widest text-gray-400 uppercase mb-1.5">
                              Vorname *
                            </label>
                            <input
                              type="text"
                              required
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              placeholder="z.B. Maria"
                              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-700"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium tracking-widest text-gray-400 uppercase mb-1.5">
                              Nachname *
                            </label>
                            <input
                              type="text"
                              required
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              placeholder="z.B. Schmidt"
                              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-700"
                            />
                          </div>
                        </div>

                        {/* Birth & Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-medium tracking-widest text-gray-400 uppercase mb-1.5">
                              Geburtsdatum *
                            </label>
                            <input
                              type="text"
                              required
                              value={birthDate}
                              onChange={(e) => setBirthDate(e.target.value)}
                              placeholder="TT.MM.JJJJ"
                              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-700"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium tracking-widest text-gray-400 uppercase mb-1.5">
                              E-Mail-Adresse *
                            </label>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="maria.schmidt@mail.com"
                              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-700"
                            />
                          </div>
                        </div>

                        {/* Phone Number */}
                        <div>
                          <label className="block text-[10px] font-medium tracking-widest text-gray-400 uppercase mb-1.5">
                            WhatsApp / Telefonnummer *
                          </label>
                          <input
                            type="text"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="z.B. +49 1551 0582407"
                            className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-700"
                          />
                        </div>

                        {/* Story Textarea */}
                        <div>
                          <label className="block text-[10px] font-medium tracking-widest text-gray-400 uppercase mb-1.5">
                            Deine Nachricht / Dein Anliegen
                          </label>
                          <textarea
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Beschreibe mir kurz deine aktuelle Situation. Wer ist involviert? Welche Blockaden spürst du?"
                            className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-gray-700"
                          />
                        </div>

                        {/* Datenschutz Checkbox */}
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            id="gdpr"
                            required
                            checked={gdprAccepted}
                            onChange={(e) => setGdprAccepted(e.target.checked)}
                            className="mt-1 accent-primary rounded cursor-pointer"
                          />
                          <label htmlFor="gdpr" className="text-[10px] sm:text-xs text-gray-400 leading-normal cursor-pointer select-none">
                            Ich bin damit einverstanden, dass meine Daten zur Kontaktaufnahme verarbeitet werden. Ich verstehe, dass alle Informationen streng vertraulich behandelt werden. *
                          </label>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full bg-primary hover:bg-[#E1E0CC] text-black font-semibold text-xs sm:text-sm py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow-lg shadow-primary/10 cursor-pointer disabled:opacity-50"
                        >
                          <span>{submitting ? "Übertrage Daten..." : "Kostenfreie Erstanalyse jetzt absenden"}</span>
                          <Send size={14} strokeWidth={1.5} className={submitting ? "animate-pulse" : ""} />
                        </button>

                      </motion.form>
                    ) : (
                      <motion.div
                        key="form-success"
                        className="py-16 text-center flex flex-col items-center justify-center"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6 relative">
                          <Check strokeWidth={1.5} className="text-primary w-8 h-8" />
                          <div className="absolute inset-0 rounded-full border border-primary/40 animate-ping opacity-70" />
                        </div>
                        <h3 className="text-xl font-medium text-white tracking-tight">Erfolgreich übermittelt</h3>
                        <p className="text-xs sm:text-sm text-gray-400 mt-3 max-w-sm leading-relaxed mx-auto">
                          Vielen Dank, <strong className="text-[#DEDBC8]">{firstName}</strong>! Deine Anfrage zur Erstanalyse im Bereich <strong className="text-primary">{selectedArea}</strong> wurde verschlüsselt an mich übertragen.
                        </p>
                        <p className="text-xs text-gray-500 mt-4 leading-relaxed max-w-xs mx-auto italic">
                          Ich werde mich innerhalb der nächsten 24 bis 48 Stunden mit einer ersten Einschätzung direkt bei dir melden.
                        </p>

                        <button
                          onClick={resetForm}
                          className="mt-8 border border-white/10 text-xs text-[#DEDBC8] hover:text-white hover:border-white/20 px-5 py-2 rounded-full transition-all cursor-pointer"
                        >
                          Weiteres Anliegen senden
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/5 pt-16 pb-28 lg:pb-12 px-4 relative z-20">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            
            {/* Column 1: Slogan */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => handleNavClick("Startseite")}>
                <img 
                  src="https://rijam.de/wp-content/plugins/phastpress/phast.php/c2VydmljZT1pbWFnZXMmc3JjPWh0dHBzJTNBJTJGJTJGcmlqYW0uZGUlMkZ3cC1jb250ZW50JTJGdXBsb2FkcyUyRjIwMjQlMkYwOSUyRmxvZ28tcmlqYW0ucG5nJmNhY2hlTWFya2VyPTE3MjgxNDE0MDUtODg4ODMmdG9rZW49NjAwMzg1MDBiZjI4NGVkNQ.q.png" 
                  alt="Medium Rijam Logo" 
                  className="h-10 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light max-w-md">
                Medium Rijam – Praxis für spirituelle & psychologische Arbeiten. Dein vertrauenswürdiger Begleiter für Neuanfang, Partnerschafts-Harmonie und seelische Befreiung.
              </p>
            </div>

            {/* Column 2: Contact Numbers */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-[#E1E0CC] text-xs font-semibold uppercase tracking-wider">
                Kontaktangaben
              </h4>
              <ul className="space-y-2.5 text-xs text-gray-400 font-light">
                <li className="flex items-center gap-2.5">
                  <Phone size={13} strokeWidth={1.5} className="text-primary" />
                  <span>Telefon: <a href="tel:+4915734404851" className="text-white hover:text-primary transition-colors">+49 1573 4404851</a></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <MessageSquare size={13} strokeWidth={1.5} className="text-primary" />
                  <span>WhatsApp: <a href="https://wa.me/4915510582407" target="_blank" rel="noreferrer" className="text-white hover:text-primary transition-colors">+49 1551 0582407</a></span>
                </li>
              </ul>
            </div>

            {/* Column 3: Social Links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-[#E1E0CC] text-xs font-semibold uppercase tracking-wider">
                Social Media Links
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "WhatsApp", url: "https://wa.me/4915510582407" },
                  { name: "Telegram", url: "https://t.me/medium_rijam" },
                  { name: "Viber", url: "viber://add?number=4915510582407" },
                  { name: "TikTok", url: "https://www.tiktok.com/@medium.rijam" }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-neutral-900 border border-white/5 text-gray-400 text-xs px-3 py-1.5 rounded-lg hover:border-primary hover:text-primary transition-all duration-300"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Legal / Rights row */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs text-gray-500 font-light">
            <div>
              © 2026 Medium Rijam. Alle Rechte vorbehalten.
            </div>
            
            {/* Legal trigger links */}
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
              <button 
                onClick={() => setLegalModalType("impressum")}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Impressum & Datenschutz
              </button>
              <button 
                onClick={() => setLegalModalType("widerruf")}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Widerrufsbelehrung
              </button>
              <button 
                onClick={() => setLegalModalType("agb")}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Allgemeine Geschäftsbedingungen (AGB)
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* PORTALS / POPUP MODALS FOR LEGAL TEXTS */}
      <AnimatePresence>
        {legalModalType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#101010] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden relative shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-[#E1E0CC] text-base sm:text-lg font-semibold tracking-wide uppercase">
                  {legalModalType === "impressum" && "Impressum & Datenschutz"}
                  {legalModalType === "widerruf" && "Widerrufsbelehrung"}
                  {legalModalType === "agb" && "Allgemeine Geschäftsbedingungen (AGB)"}
                </h3>
                <button
                  onClick={() => setLegalModalType(null)}
                  className="text-gray-400 hover:text-white p-1.5 hover:bg-white/5 rounded-full transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-gray-400 font-light leading-relaxed select-text">
                
                {legalModalType === "impressum" && (
                  <>
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold">1. Angaben gemäß § 5 TMG</h4>
                      <p>
                        Medium Rijam<br />
                        Praxis für spirituelle & psychologische Arbeiten<br />
                        Telefon: +49 1573 4404851<br />
                        WhatsApp: +49 1551 0582407<br />
                        E-Mail: info@medium-rijam.de
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-white font-semibold">2. Gewerbeanmeldung</h4>
                      <p>
                        Angemeldetes Gewerbe gemäß deutschem Recht.<br />
                        Mitglied im Verband Freier Psychotherapeuten (VFP) e.V.<br />
                        Mitglied im Deutschen Astrologen-Verband (DAV) e.V.<br />
                        Mitglied im Verband Unabhängiger Heilpraktiker (VUH) e.V.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-white font-semibold">3. Haftungsausschluss</h4>
                      <p>
                        Spirituelle Arbeiten, energetische Reinigungen, Blockadenlösungen sowie das Kartenlegen beruhen auf feinstofflichen Gesetzmäßigkeiten und sind wissenschaftlich nicht anerkannt. Sie ersetzen keine ärztliche Diagnose, psychotherapeutische Behandlung oder medizinischen Rat.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-white font-semibold">4. Datenschutzhinweis (DSGVO)</h4>
                      <p>
                        Deine Daten (Name, Geburtsdatum, Anliegen, E-Mail, Telefonnummer) werden ausschließlich für die Erstellung der kostenfreien Erstanalyse und die Kontaktaufnahme verwendet. Wir geben keine Daten an unbefugte Dritte weiter. Die Übertragung erfolgt verschlüsselt und absolut diskret. Du hast jederzeit das Recht auf Auskunft, Berichtigung und Löschung deiner gespeicherten Daten.
                      </p>
                    </div>
                  </>
                )}

                {legalModalType === "widerruf" && (
                  <>
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold">Widerrufsrecht für Verbraucher</h4>
                      <p>
                        Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
                      </p>
                      <p>
                        Um dein Widerrufsrecht auszuüben, musst du uns (Medium Rijam, Telefon: +49 1573 4404851, E-Mail: info@medium-rijam.de) mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief, Telefax oder E-Mail) über deinen Entschluss, diesen Vertrag zu widerrufen, informieren.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-white font-semibold">Vorzeitiges Erlöschen des Widerrufsrechts</h4>
                      <p>
                        Das Widerrufsrecht erlischt vorzeitig bei Verträgen zur Erbringung von Dienstleistungen, wenn wir die Dienstleistung vollständig erbracht haben und mit der Ausführung der Dienstleistung erst begonnen haben, nachdem du deine ausdrückliche Zustimmung dazu erteilt hast und gleichzeitig deine Kenntnis davon bestätigt hast, dass du dein Widerrufsrecht bei vollständiger Vertragserfüllung durch uns verlierst.
                      </p>
                    </div>
                  </>
                )}

                {legalModalType === "agb" && (
                  <>
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold">§ 1 Geltungsbereich & Allgemeines</h4>
                      <p>
                        Diese Allgemeinen Geschäftsbedingungen gelten für alle Dienstleistungen, Beratungen und spirituellen Analysen, die durch Medium Rijam angeboten werden. Mit der Beauftragung erklärst du dich mit diesen AGB einverstanden.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-white font-semibold">§ 2 Leistungsumfang</h4>
                      <p>
                        Gegenstand des Vertrages ist die Durchführung von spiritueller Beratung, Seelenarbeit, Kartenlegen, Blockadenlösungen sowie Liebeszusammenführungen. Ein bestimmtes Ergebnis oder ein garantierter Erfolg kann aus metaphysischen Gründen nicht zugesagt werden, da spirituelle Kräfte und menschliche Willensfreiheit zusammenwirken.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-white font-semibold">§ 3 Mindestalter & Verhaltenspflichten</h4>
                      <p>
                        Beratungen und Dienstleistungen werden ausschließlich für Personen erbracht, die das 18. Lebensjahr vollendet haben (volljährig sind). Alle Angaben des Klienten müssen wahrheitsgemäß sein.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-white font-semibold">§ 4 Medizinischer Vorbehalt</h4>
                      <p>
                        Unsere Dienstleistungen sind keine Therapien im medizinischen oder klinisch-psychotherapeutischen Sinne. Wir stellen keine medizinischen Diagnosen. Klienten mit psychischen Erkrankungen werden gebeten, sich an qualifizierte Ärzte oder Therapeuten zu wenden.
                      </p>
                    </div>
                  </>
                )}

              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/5 bg-black/40 flex justify-end">
                <button
                  onClick={() => setLegalModalType(null)}
                  className="bg-primary hover:bg-[#E1E0CC] text-black font-semibold text-xs px-5 py-2 rounded-lg cursor-pointer"
                >
                  Schließen
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
