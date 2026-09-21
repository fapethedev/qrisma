import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { QRShapePicker } from '@/components/qr/qr-shape-picker';
import { QRFinderPicker } from '@/components/qr/qr-finder-picker';
import { OverviewStatsCards } from '@/components/dashboard/overview-stats-cards';
import { QRCodeTable } from '@/components/dashboard/qr-code-table';
import { NextIntlClientProvider } from 'next-intl';
import frMessages from '@/../messages/fr.json';

describe('WCAG & Web Interface Guidelines Accessibility Compliance', () => {
  describe('QRShapePicker', () => {
    it('rend les boutons de formes avec aria-label et aria-pressed', () => {
      const html = renderToString(
        <NextIntlClientProvider locale="fr" messages={frMessages} timeZone="Europe/Paris">
          <QRShapePicker
            settings={{ style: 'rounded', size: 1 }}
            onChange={() => {}}
          />
        </NextIntlClientProvider>
      );

      // Vérifie la présence de boutons interactifs avec aria-label
      expect(html).toContain('aria-label="Carré classique"');
      expect(html).toContain('aria-label="Arrondi moderne"');
      expect(html).toContain('aria-label="Points circulaires"');

      // Vérifie aria-pressed="true" sur le style sélectionné
      expect(html).toContain('aria-pressed="true"');
      // Vérifie la présence des classes focus-visible
      expect(html).toContain('focus-visible:ring-primary');
    });
  });

  describe('QRFinderPicker', () => {
    it('rend les sélecteurs de coins avec des libellés explicites et aria-pressed', () => {
      const html = renderToString(
        <NextIntlClientProvider locale="fr" messages={frMessages} timeZone="Europe/Paris">
          <QRFinderPicker
            outerSettings={{ style: 'rounded' }}
            innerSettings={{ style: 'circle' }}
            onOuterChange={() => {}}
            onInnerChange={() => {}}
          />
        </NextIntlClientProvider>
      );

      // Vérifie les libellés descriptifs
      expect(html).toContain('aria-label="Bordure extérieure');
      expect(html).toContain('aria-label="Centre intérieur');
      expect(html).toContain('aria-pressed="true"');
      expect(html).toContain('focus-visible:ring-primary');
    });
  });

  describe('OverviewStatsCards', () => {
    it('applique la classe tabular-nums pour l\'alignement optique des métriques chiffrées', () => {
      const html = renderToString(
        <NextIntlClientProvider locale="fr" messages={frMessages} timeZone="Europe/Paris">
          <OverviewStatsCards
            totalQRCodes={42}
            totalScans={1337}
            recentScans7d={256}
            topQRCodeTitle="Menu Restaurant"
            topQRCodeScans={850}
          />
        </NextIntlClientProvider>
      );

      expect(html).toContain('tabular-nums');
      expect(html).toContain('1\u202F337'); // 1337 formaté en FR
      expect(html).toContain('Menu Restaurant');
    });
  });

  describe('QRCodeTable', () => {
    it('rend des boutons d\'actions accessibles avec aria-label explicites', () => {
      const mockItems = [
        {
          id: 'qr-1',
          title: 'Campagne Printemps',
          destinationUrl: 'https://example.com/promo',
          shortSlug: 'spring26',
          isDynamic: true,
          scanCount: 99,
          design: {},
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      const html = renderToString(
        <NextIntlClientProvider locale="fr" messages={frMessages} timeZone="Europe/Paris">
          <QRCodeTable
            items={mockItems}
            onSelectAnalytics={() => {}}
            onDelete={async () => {}}
          />
        </NextIntlClientProvider>
      );

      // Bouton Copier avec aria-label
      expect(html).toContain('aria-label="Copier le lien court"');
      // Bouton menu contextuel avec aria-label contextualisé
      expect(html).toContain('aria-label="Options pour le QR code Campagne Printemps"');
      // Alignement numérique
      expect(html).toContain('tabular-nums');
    });
  });
});
