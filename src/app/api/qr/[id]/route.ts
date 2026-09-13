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

    return NextResponse.json({ data: qr });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
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
    const body = await request.json();

    const updated = await qrRepository.update(id, session.user.id, {
      title: body.title,
      destinationUrl: body.destinationUrl,
      isDynamic: body.isDynamic,
      design: body.design,
    });

    if (!updated) {
      return NextResponse.json(
        { error: 'QR code introuvable ou modification non autorisée' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
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

    await qrRepository.delete(id, session.user.id);
    return NextResponse.json({ success: true, message: 'QR code supprimé avec succès' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
