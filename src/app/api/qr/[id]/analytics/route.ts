import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { qrRepository } from '@/lib/db/qr-repository';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const { id } = await context.params;
    const qr = await qrRepository.findById(id);

    if (!qr) {
      return NextResponse.json({ error: 'QR code introuvable' }, { status: 404 });
    }

    if (qr.userId !== session.user.id) {
      return NextResponse.json({ error: 'Accès non autorisé' }, { status: 403 });
    }

    const [analytics, timeline, countries] = await Promise.all([
      qrRepository.getAnalytics(id),
      qrRepository.getScanTimeline({ qrCodeId: id, days: 30 }),
      qrRepository.getCountryBreakdown({ qrCodeId: id }),
    ]);

    return NextResponse.json({
      data: {
        qrCode: qr,
        ...analytics,
        timeline,
        countries,
      },
    });
  } catch (error: any) {
    console.error('[API QR Analytics Error]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
