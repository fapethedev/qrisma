import { QRStudioView } from '@/components/qr/qr-studio-view';

export const metadata = {
  title: 'Studio de Création QR Code | QRCraft',
  description:
    'Studio de personnalisation de QR codes en temps réel : formes, dégradés, logos, yeux et exports SVG/PNG 4K/PDF.',
};

export default function StudioPage() {
  return <QRStudioView />;
}
