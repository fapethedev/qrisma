import { NextRequest, NextResponse } from 'next/server';
import { qrRepository } from '@/lib/db/qr-repository';
import { parseUserAgent } from '@/lib/utils/ua-parser';
import { sendScanMilestoneNotification } from '@/lib/email/resend';

export const dynamic = 'force-dynamic';

const SCAN_MILESTONES = [10, 50, 100, 500, 1000, 5000, 10000];

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  if (!slug) {
    return NextResponse.json({ error: 'Slug manquant' }, { status: 400 });
  }

  try {
    const qr = await qrRepository.findBySlug(slug);

    if (!qr) {
      return NextResponse.redirect(new URL('/404', request.url), { status: 302 });
    }

    // Extraction des métadonnées analytiques
    const userAgentHeader = request.headers.get('user-agent') || '';
    const referer = request.headers.get('referer') || null;
    const country =
      request.headers.get('x-vercel-ip-country') ||
      request.headers.get('cf-ipcountry') ||
      request.headers.get('x-country-code') ||
      null;
    const city =
      request.headers.get('x-vercel-ip-city') ||
      request.headers.get('cf-ipcity') ||
      null;
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      null;

    const { deviceType, os, browser } = parseUserAgent(userAgentHeader);

    // Enregistrement asynchrone du scan
    try {
      await qrRepository.recordScan({
        qrCodeId: qr.id,
        deviceType,
        os,
        browser,
        country,
        city,
        ip,
        referer,
      });

      // Notification par email en arrière-plan si un jalon est franchi
      const newScanCount = (qr.scanCount || 0) + 1;
      if (SCAN_MILESTONES.includes(newScanCount)) {
        (async () => {
          try {
            const user = await qrRepository.findUserById(qr.userId);
            if (user && user.email) {
              await sendScanMilestoneNotification(
                { id: user.id, email: user.email, name: user.name },
                { id: qr.id, name: qr.title },
                newScanCount
              );
            }
          } catch (milestoneErr) {
            console.error('[Scan Milestone Email Error]', milestoneErr);
          }
        })();
      }
    } catch (scanError) {
      console.error('[Scan Record Error]', scanError);
      // Ne pas bloquer la redirection si l'enregistrement de l'analytique échoue
    }

    // Redirection 302 avec interdiction de mise en cache pour garantir le comptage de chaque scan
    const response = NextResponse.redirect(qr.destinationUrl, { status: 302 });
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  } catch (error) {
    console.error('[Redirect Handler Error]', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
