import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { qrRepository } from '@/lib/db/qr-repository';
import crypto from 'crypto';

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
    const orgId = searchParams.get('orgId') || session.session.activeOrganizationId;
    const search = searchParams.get('search')?.toLowerCase();

    let qrCodes = orgId
      ? await qrRepository.listByOrganization(orgId)
      : await qrRepository.listByUser(session.user.id);

    if (search) {
      qrCodes = qrCodes.filter(
        (q) =>
          q.title.toLowerCase().includes(search) ||
          q.shortSlug.toLowerCase().includes(search) ||
          q.destinationUrl.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({ data: qrCodes });
  } catch (error: any) {
    console.error('[API QR GET Error]', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des QR codes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const body = await request.json();
    const { title, destinationUrl, shortSlug, isDynamic, design, organizationId } = body;

    if (!destinationUrl) {
      return NextResponse.json(
        { error: "L'URL de destination est requise" },
        { status: 400 }
      );
    }

    // Génération automatique d'un slug aléatoire si non fourni
    const finalSlug = shortSlug && shortSlug.trim().length > 0
      ? shortSlug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-')
      : crypto.randomBytes(4).toString('hex');

    // Vérification de l'unicité du slug
    const existing = await qrRepository.findBySlug(finalSlug);
    if (existing) {
      return NextResponse.json(
        { error: 'Ce lien court (slug) est déjà utilisé. Veuillez en choisir un autre.' },
        { status: 409 }
      );
    }

    const qr = await qrRepository.create({
      title: title || 'Mon QR Code',
      shortSlug: finalSlug,
      destinationUrl,
      isDynamic: isDynamic ?? true,
      design: design || {},
      userId: session.user.id,
      organizationId: organizationId || session.session.activeOrganizationId || null,
    });

    return NextResponse.json({ data: qr }, { status: 201 });
  } catch (error: any) {
    console.error('[API QR POST Error]', error);
    return NextResponse.json(
      { error: "Erreur lors de la création du QR code: " + (error.message || 'Erreur interne') },
      { status: 500 }
    );
  }
}
