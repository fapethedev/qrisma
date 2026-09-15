'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQSection() {
  const t = useTranslations('landing');

  const faqItems = [
    { q: t('faqQ1'), a: t('faqA1') },
    { q: t('faqQ2'), a: t('faqA2') },
    { q: t('faqQ3'), a: t('faqA3') },
    { q: t('faqQ4'), a: t('faqA4') },
    { q: t('faqQ5'), a: t('faqA5') },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-accent font-bold">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>{t('faqBadge')}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-foreground">
          {t('faqTitle')}
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          {t('faqSubtitle')}
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqItems.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-border/80 rounded-2xl px-5 py-1 bg-card shadow-2xs"
          >
            <AccordionTrigger className="text-sm font-heading font-semibold text-left hover:no-underline cursor-pointer">
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
