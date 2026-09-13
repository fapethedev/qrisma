import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { qrRepository } from '@/lib/db/qr-repository';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30', 10);

    const [overview, timeline, countries] = await Promise.all([
      qrRepository.getUserOverview(session.user.id),
      qrRepository.getScanTimeline({ userId: session.user.id, days }),
      qrRepository.getCountryBreakdown({ userId: session.user.id }),
    ]);

    return NextResponse.json({
      data: {
        ...overview,
        timeline,
        countries,
      },
    });
  } catch (error: any) {
    console.error('[API Analytics Overview Error]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
