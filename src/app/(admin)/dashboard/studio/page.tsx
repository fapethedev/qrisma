import { QRStudioView } from '@/components/qr/qr-studio-view';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('studio');
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  };
}

export default function StudioPage() {
  return <QRStudioView />;
}
