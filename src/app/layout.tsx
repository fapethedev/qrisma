import type { Metadata } from "next";
import { fontQuantico, fontDynaPuff, fontSourceCodePro } from "./font";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "QRCraft - Générateur de QR Codes Artistiques, 3D & Dynamiques",
    template: "%s | QRCraft",
  },
  description:
    "Concevez des QR codes uniques, esthétiques et traçables. Personnalisation avancée des formes et couleurs, simulation 3D interactive, exports vectoriels SVG & print 300 DPI, et analytiques en temps réel.",
  keywords: [
    "QR code",
    "générateur QR code",
    "QR code artistique",
    "QR code personnalisé",
    "QR code 3D",
    "QR code dynamique",
    "analytics scans QR",
    "export vectoriel SVG",
  ],
  authors: [{ name: "QRCraft Team" }],
  creator: "QRCraft",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    url: "/",
    siteName: "QRCraft",
    title: "QRCraft - Générateur de QR Codes Artistiques, 3D & Dynamiques",
    description:
      "Concevez des QR codes uniques, esthétiques et traçables avec prévisualisation 3D et suivi analytique en temps réel.",
  },
  twitter: {
    card: "summary_large_image",
    title: "QRCraft - QR Codes Artistiques & Dynamiques",
    description:
      "Générez des QR codes haut de gamme personnalisables avec prévisualisation 3D et analytics en direct.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = await getTranslations('common');

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontQuantico.variable,
        fontDynaPuff.variable,
        fontSourceCodePro.variable,
        "font-sans",
      )}
    >
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:font-semibold focus:outline-hidden"
        >
          {t('skipToContent')}
        </a>
        <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Paris">
          <ThemeProvider>
            {children}
            <Toaster position="bottom-right" />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
