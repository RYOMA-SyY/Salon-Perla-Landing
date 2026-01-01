import React from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Sparkles, 
  Scissors, 
  Crown, 
  Hand, 
  Eye, 
  Star, 
  Calendar,
  Check,
  Phone,
  MapPin
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

// Assets
import heroBg from "@assets/generated_images/luxury_spa_interior_hero_background.png";
import hammamImg from "@assets/generated_images/hammam_spa_treatment_detail.png";
import facialImg from "@assets/generated_images/facial_beauty_treatment_close_up.png";
import nailsImg from "@assets/generated_images/elegant_manicure_nail_art.png";

const services = [
  {
    id: 'hammam',
    name: 'Hammam',
    icon: Sparkles,
    description: 'Expérience de spa traditionnel marocain avec gommage et soins du corps pour une détente absolue',
    price: 'À partir de 180 DH',
    duration: '60-90 min',
    image: hammamImg
  },
  {
    id: 'coiffure',
    name: 'Coiffure',
    icon: Scissors,
    description: 'Coupe, coloration, brushing et soins capillaires professionnels adaptés à votre style',
    price: 'À partir de 99 DH',
    duration: '45-120 min',
    image: null
  },
  {
    id: 'esthetique',
    name: 'Esthétique',
    icon: Crown,
    description: 'Soins du visage, masques purifiants, épilation et traitements beauté personnalisés',
    price: 'À partir de 99 DH',
    duration: '30-90 min',
    image: facialImg
  },
  {
    id: 'onglerie',
    name: 'Onglerie',
    icon: Hand,
    description: 'Manucure, pédicure, pose de vernis semi-permanent et nail art créatif',
    price: 'À partir de 99 DH',
    duration: '45-60 min',
    image: nailsImg
  },
  {
    id: 'microblading',
    name: 'Microblading',
    icon: Eye,
    description: 'Restructuration des sourcils avec technique semi-permanente pour un regard naturel',
    price: 'À partir de 800 DH',
    duration: '120-180 min',
    image: null
  },
  {
    id: 'cils',
    name: 'Cils',
    icon: Star,
    description: 'Extensions de cils volume russe, rehaussement et teinture pour un regard intense',
    price: 'À partir de 250 DH',
    duration: '60-90 min',
    image: null
  }
];

export default function Home() {
  const [hovered, setHovered] = React.useState(false);
  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 });
  const [selectedServices, setSelectedServices] = React.useState<string[]>([]);

  React.useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  const handleWhatsAppBooking = (serviceName?: string) => {
    const message = serviceName 
      ? `Bonjour, je souhaite réserver un rendez-vous pour ${serviceName}.`
      : `Bonjour, je souhaite réserver un rendez-vous.`;
    
    window.open(
      `https://wa.me/212522784142?text=${encodeURIComponent(message)}`, 
      '_blank'
    );
  };

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <Layout>
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/30 pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: cursorPos.x - 16,
          y: cursorPos.y - 16,
          scale: hovered ? 2.5 : 1,
          backgroundColor: hovered ? "rgba(92, 52, 116, 0.1)" : "transparent"
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.5 }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={heroBg} 
            alt="Luxury Spa Interior" 
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center pt-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <span className="text-[10px] tracking-[0.4em] uppercase text-primary mb-8 block font-medium">
              Sanctuaire de Sérénité
            </span>
            <h1 className="font-heading text-[12vw] leading-none text-foreground mb-8 font-light italic">
              Ethereal <br />
              <span className="not-italic font-bold">Luxury</span>
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-12">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white px-12 py-8 text-sm tracking-[0.3em] rounded-full min-w-[220px] transition-all duration-500 hover:scale-105"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => handleWhatsAppBooking()}
              >
                RÉSERVER
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section - Horizontal Marquee */}
      <section id="services" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6 mb-16">
          <h2 className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4 text-center">Nos Expériences</h2>
          <h3 className="text-5xl md:text-7xl font-heading text-center italic">Le Menu des Soins</h3>
        </div>
        
        <div className="flex overflow-hidden group">
          <motion.div 
            className="flex whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...services, ...services].map((service, idx) => (
              <div 
                key={`${service.id}-${idx}`}
                className="w-[400px] h-[500px] mx-4 relative overflow-hidden organic-blob group/card"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <img 
                  src={service.image || heroBg} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  alt={service.name}
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-8 text-center text-white">
                  <h4 className="text-4xl font-heading italic mb-2">{service.name}</h4>
                  <p className="text-[10px] tracking-widest uppercase mb-4 opacity-0 group-hover/card:opacity-100 transition-opacity">{service.price}</p>
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-black opacity-0 group-hover/card:opacity-100 transition-opacity"
                    onClick={() => handleWhatsAppBooking(service.name)}
                  >
                    RÉSERVER
                  </Button>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Package Builder Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4">Votre Rituel</h2>
            <h3 className="text-5xl font-heading italic">Package Builder</h3>
            <p className="mt-4 text-gray-500 italic">Composez votre moment d'exception et découvrez votre tarif préférentiel.</p>
          </div>
          
          <div className="bg-white/50 backdrop-blur-xl border border-white/20 p-12 organic-blob shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {services.slice(0, 6).map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    const current = selectedServices.includes(service.id)
                      ? selectedServices.filter(id => id !== service.id)
                      : [...selectedServices, service.id];
                    setSelectedServices(current);
                  }}
                  className={`p-4 border transition-all duration-500 text-sm tracking-widest uppercase ${
                    selectedServices.includes(service.id)
                      ? "bg-primary text-white border-primary scale-105"
                      : "bg-white/50 text-primary border-primary/10 hover:border-primary/30"
                  }`}
                >
                  {service.name}
                </button>
              ))}
            </div>
            
            <div className="text-center border-t border-primary/10 pt-12">
              <span className="text-[10px] tracking-[0.3em] uppercase opacity-50">Total Estimation</span>
              <div className="text-6xl font-heading mt-2 relative inline-block">
                <motion.span
                  key={selectedServices.length}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative z-10"
                >
                  {selectedServices.length > 0 
                    ? `${selectedServices.reduce((acc, id) => {
                        const s = services.find(serv => serv.id === id);
                        const price = parseInt(s?.price.match(/\d+/)?.[0] || "0");
                        return acc + price;
                      }, 0)} DH`
                    : "0 DH"}
                </motion.span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer pointer-events-none" />
              </div>
              <div className="mt-8">
                <Button 
                  className="bg-primary text-white px-12 py-8 rounded-full tracking-[0.2em] text-xs"
                  onClick={() => handleWhatsAppBooking(`un package personnalisé (${selectedServices.join(', ')})`)}
                >
                  RÉSERVER CE RITUEL
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Wall of Love */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { name: "Sarah B.", text: "Une expérience hors du temps. Le Hammam est tout simplement divin." },
              { name: "Leila M.", text: "Le meilleur salon de Sidi Maarouf. L'accueil et le professionnalisme sont au rendez-vous." },
              { name: "Yasmine K.", text: "Mon rituel mensuel. Je ne confie mes cils à personne d'autre !" }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="text-center p-12 border border-primary/5 hover:border-primary/20 transition-all duration-700"
              >
                <p className="text-2xl font-heading italic mb-6">"{t.text}"</p>
                <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold">{t.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-secondary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform translate-x-20" />
        
        <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary-foreground/60 text-sm font-bold tracking-widest uppercase mb-2 block">
                Prendre Rendez-vous
              </span>
              <h2 className="text-4xl md:text-6xl font-heading mb-8">
                Besoin d'un moment <br /> de détente ?
              </h2>
              <p className="text-gray-400 mb-10 max-w-md text-lg">
                Contactez-nous pour réserver votre séance ou pour toute demande d'information. Notre équipe est à votre écoute.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wider">Téléphone</p>
                    <p className="text-xl">+212 522 78 41 42</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wider">Adresse</p>
                    <p className="text-xl">Sidi Maarouf, Casablanca</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <Button 
                  size="lg" 
                  className="bg-white text-secondary hover:bg-gray-100 px-8 py-6 text-base tracking-widest rounded-none w-full sm:w-auto"
                  onClick={() => handleWhatsAppBooking()}
                >
                  CONTACTER SUR WHATSAPP
                </Button>
              </div>
            </div>
            
            <div className="relative h-[400px] bg-white/5 rounded-lg border border-white/10 p-8 flex flex-col justify-center">
               <h3 className="text-2xl font-decorative mb-6 text-center">Horaires d'ouverture</h3>
               <ul className="space-y-4">
                 <li className="flex justify-between items-center border-b border-white/10 pb-4">
                   <span>Lundi - Samedi</span>
                   <span className="font-bold">10:00 - 20:00</span>
                 </li>
                 <li className="flex justify-between items-center border-b border-white/10 pb-4">
                   <span>Dimanche</span>
                   <span className="text-primary-foreground/60">Sur rendez-vous</span>
                 </li>
               </ul>
               <div className="mt-8 text-center">
                 <p className="italic text-gray-400">"La beauté commence au moment où vous décidez d'être vous-même."</p>
                 <p className="mt-2 text-sm text-primary-foreground/60">- Coco Chanel</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
