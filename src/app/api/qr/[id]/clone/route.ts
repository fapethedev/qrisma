import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { qrRepository } from '@/lib/db/qr-repository';
import { checkQRCodeCreationQuota } from '@/lib/auth/permissions';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(
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
    const sourceQR = await qrRepository.findById(id);

    if (!sourceQR) {
      return NextResponse.json({ error: 'QR code source introuvable' }, { status: 404 });
    }

    if (sourceQR.userId !== session.user.id) {
      return NextResponse.json({ error: 'Accès non autorisé' }, { status: 403 });
    }

    // Contrôle des quotas Freemium
    const existingUserQRs = await qrRepository.listByUser(session.user.id);
    const userPlan = (session.user as any).plan || 'free';
    const quotaCheck = checkQRCodeCreationQuota(userPlan, existingUserQRs.length);

    if (!quotaCheck.allowed) {
      return NextResponse.json(
        {
          error: quotaCheck.message,
          limit: quotaCheck.limit,
          currentCount: quotaCheck.currentCount,
        },
        { status: 403 }
      );
    }

    // Génération d'un slug aléatoire unique
    let newSlug = crypto.randomBytes(4).toString('hex');
    let exists = await qrRepository.findBySlug(newSlug);
    while (exists) {
      newSlug = crypto.randomBytes(4).toString('hex');
      exists = await qrRepository.findBySlug(newSlug);
    }

    // Création de la copie
    const cloned = await qrRepository.create({
      title: `${sourceQR.title} (Copie)`,
      shortSlug: newSlug,
      destinationUrl: sourceQR.destinationUrl,
      isDynamic: sourceQR.isDynamic,
      design: sourceQR.design,
      userId: session.user.id,
      organizationId: sourceQR.organizationId,
    });

    return NextResponse.json({ data: cloned }, { status: 201 });
  } catch (error: any) {
    console.error('[API QR Clone Error]', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors du clonage du QR code' },
      { status: 500 }
    );
  }
}
