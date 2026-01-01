import React, { useState } from 'react';
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Instagram, Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [showWhatsAppPopup, setShowWhatsAppPopup] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Tarifs', href: '/tarifs' },
    { label: 'Services', href: '/#services' },
    { label: 'Contact', href: '/#contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (id.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleWhatsAppChat = () => {
    const message = "Bonjour, j'aimerais avoir plus d'informations.";
    window.open(`https://wa.me/212522784142?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4 border-gray-100" : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between max-w-[1600px]">
          <Link href="/">
            <a className="group">
              <h1 className="text-4xl md:text-5xl font-decorative text-primary group-hover:opacity-90 transition-opacity">
                Perla
              </h1>
              <p className="text-xs md:text-sm font-light tracking-widest text-foreground uppercase mt-1">
                Beauty Center
              </p>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href.replace('/', ''))}
                className="text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
            <Button variant="outline" size="sm" className="hidden lg:flex border-primary text-primary hover:bg-primary hover:text-white transition-colors uppercase text-xs tracking-wider">
              Book Now
            </Button>
          </nav>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-10">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href.replace('/', ''))}
                    className="text-2xl font-decorative text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      {/* WhatsApp Sticky Button */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
        <AnimatePresence>
          {showWhatsAppPopup && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="mb-4 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
            >
              <div className="bg-[#075e54] p-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <h1 className="font-decorative text-xl">P</h1>
                  </div>
                  <div>
                    <p className="text-sm font-bold">Perla Beauty</p>
                    <p className="text-[10px] opacity-80">En ligne</p>
                  </div>
                </div>
                <button onClick={() => setShowWhatsAppPopup(false)}>
                  <X className="w-4 h-4 opacity-70 hover:opacity-100" />
                </button>
              </div>
              <div className="p-4 bg-[#e5ddd5] min-h-[100px] relative">
                <div className="bg-white p-3 rounded-lg shadow-sm max-w-[85%] text-xs relative after:content-[''] after:absolute after:left-[-8px] after:top-2 after:border-8 after:border-transparent after:border-r-white">
                  <p className="font-bold mb-1">Perla Center</p>
                  <p className="text-gray-600 mb-1">Bonjour ! 👋</p>
                  <p className="text-gray-600">Comment pouvons-nous vous aider ?</p>
                  <span className="text-[9px] text-gray-400 absolute bottom-1 right-2">
                    {new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-white">
                <Button 
                  onClick={handleWhatsAppChat}
                  className="w-full bg-[#25d366] hover:bg-[#128c7e] text-white rounded-full gap-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Démarrer le chat
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setShowWhatsAppPopup(!showWhatsAppPopup)}
          className="w-16 h-16 bg-[#25d366] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform relative group"
        >
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          <MessageCircle className="w-8 h-8" />
          <span className="absolute right-20 bg-white text-gray-800 py-2 px-4 rounded-lg shadow-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-gray-100">
            Contactez-nous
          </span>
        </button>
      </div>

      <footer className="bg-secondary text-secondary-foreground py-16">
        <div className="container mx-auto px-6 max-w-[1600px]">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h2 className="text-3xl font-decorative mb-6 text-white">Perla Beauty</h2>
              <p className="text-gray-400 mb-6 max-w-sm">
                Votre sanctuaire de beauté à Sidi Maarouf. Découvrez nos services premium dans un cadre raffiné et élégant.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-heading text-white mb-6 uppercase tracking-wider">Contact</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                  <span>Sidi Maarouf, Casablanca,<br />Maroc</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>+212 522 78 41 42</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-heading text-white mb-6 uppercase tracking-wider">Horaires</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex justify-between">
                  <span>Lundi - Samedi</span>
                  <span>10:00 - 20:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Dimanche</span>
                  <span>Sur rendez-vous</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Perla Beauty Center. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
