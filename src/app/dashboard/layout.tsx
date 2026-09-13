import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tableau de bord & Analytiques',
  description: 'Gérez votre bibliothèque de QR codes personnalisés, surveillez vos statistiques de scans en direct et éditez vos redirections dynamiques.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
