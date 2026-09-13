'use client';

import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ_ITEMS = [
  {
    q: 'Quelle est la différence entre un QR code statique et un QR code dynamique ?',
    a: 'Un QR code statique encode définitivement vos informations (texte, Wi-Fi, URL fixe) dans la matrice géométrique : il ne peut plus être modifié après impression. Un QR code dynamique pointe vers un lien court sécurisé (/s/mon-lien) qui redirige vers votre site : vous pouvez modifier la destination à tout moment sans réimprimer vos supports, et vous bénéficiez de statistiques de scans détaillées.',
  },
  {
    q: 'Mes QR codes sont-ils compatibles avec tous les smartphones ?',
    a: 'Absolument. Nos QR codes respectent à 100% la norme internationale ISO/IEC 18004. Ils sont immédiatement reconnus par l’appareil photo natif d’iOS (iPhone) et Android, sans aucune application tierce nécessaire.',
  },
  {
    q: 'Comment garantir une impression papier parfaite sans pixellisation ?',
    a: 'Pour l’impression professionnelle (affiches, packaging, vitrines), téléchargez votre QR code au format SVG vectoriel ou en PNG 4096 px à 300 DPI. Le format vectoriel conserve une netteté mathématique infinie quelle que soit la taille d’agrandissement.',
  },
  {
    q: 'L’ajout d’un logo risque-t-il d’empêcher la lecture du QR code ?',
    a: 'Non, car QRCraft intègre un algorithme d’excavation automatique qui dégage les modules situés sous votre logo, et augmente automatiquement le niveau de correction d’erreur (Reed-Solomon) à 25% (Q) ou 30% (H). Même avec un logo central, le QR code reste parfaitement lisible.',
  },
  {
    q: 'Les QR codes créés avec le plan gratuit ont-ils une date d’expiration ?',
    a: 'Non, vos QR codes statiques restent valides à vie sans aucune date d’expiration. Vos liens directs continueront de fonctionner indéfiniment.',
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 md:py-28 max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Foire Aux Questions</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Questions fréquemment posées
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Tout ce que vous devez savoir pour créer et déployer vos QR codes en toute confiance.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-2">
        {FAQ_ITEMS.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-border/80 rounded-2xl px-5 py-1 bg-card shadow-2xs"
          >
            <AccordionTrigger className="text-sm font-semibold text-left hover:no-underline cursor-pointer">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1 pb-4">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
