import React from "react";
import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const pricingData = [
  {
    category: "Esthétique",
    packs: [
      { name: "Duvet + Sourcils + Faux Cils Normal", price: "99 DH" },
      { name: "Faux Cils Normal", price: "50 DH" },
      { name: "Faux Cils Permanent", price: "200 DH" },
      { name: "La Cire Complète", price: "99 DH" },
      { name: "Soin Visage Normal", price: "99 DH" },
      { name: "Soin Hydrafacial", price: "150 DH" },
    ]
  },
  {
    category: "Onglerie",
    packs: [
      { name: "Manucure + Pédicure", price: "99 DH" },
      { name: "Gel + Pose Permanente", price: "180 DH" },
      { name: "Permanent Mains et Pieds", price: "150 DH" },
      { name: "Manucure Spa + Pédicure Spa", price: "150 DH" },
      { name: "Faux Ongles Permanents", price: "130 DH" },
    ]
  },
  {
    category: "Coiffure",
    packs: [
      { name: "Coupe + Brushing", price: "99 DH" },
      { name: "Coupe + Brushing + Coloration", price: "250 DH" },
      { name: "Balayage + Coupe + Brushing", price: "450 DH" },
      { name: "Protéine (À partir de 4)", price: "499 DH" },
      { name: "Soin Capillaire Vitamine E", price: "150 DH" },
      { name: "Soin CCRP", price: "150 DH" },
      { name: "Soin Anti-chute", price: "150 DH" },
    ]
  },
  {
    category: "Hammam & Massage",
    packs: [
      { name: "Hammam + Cire Complète", price: "180 DH" },
      { name: "Hammam + Massage Relaxant Chinois", price: "180 DH" },
      { name: "Hammam Royale + Massage Relaxent", price: "250 DH" },
    ]
  }
];

export default function Pricing() {
  return (
    <Layout>
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-20">
            <h1 className="font-heading text-7xl italic mb-4">Tarifs & Rituels</h1>
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary font-bold">Nos tarifs exclusifs</p>
          </div>

          <div className="space-y-24">
            {pricingData.map((section, idx) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-heading italic mb-10 border-b border-primary/10 pb-4">{section.category}</h2>
                <div className="grid gap-6">
                  {section.packs.map((pack) => (
                    <div key={pack.name} className="flex justify-between items-end group">
                      <div className="flex-1">
                        <span className="text-lg tracking-wider group-hover:text-primary transition-colors">{pack.name}</span>
                        <div className="h-px bg-primary/5 flex-1 mt-1 mr-4 border-dotted border-b border-primary/20" />
                      </div>
                      <span className="font-heading text-2xl italic text-primary">{pack.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 text-center p-12 bg-muted/30 organic-blob">
            <h3 className="text-3xl font-heading italic mb-6">Prête pour votre transformation ?</h3>
            <Button 
              size="lg" 
              className="bg-primary text-white px-12 py-8 rounded-full tracking-[0.2em] text-xs"
              onClick={() => window.open(`https://wa.me/212522784142`, '_blank')}
            >
              RÉSERVER SUR WHATSAPP
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
