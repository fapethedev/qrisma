import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET as listQR, POST as createQR } from '@/app/api/qr/route';
import { GET as getSingleQR, PUT as updateQR, DELETE as deleteQR } from '@/app/api/qr/[id]/route';
import { auth } from '@/lib/auth/auth';
import { qrRepository } from '@/lib/db/qr-repository';

describe('QR Management API Routes (/api/qr)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('rejects unauthenticated requests with 401', async () => {
    vi.spyOn(auth.api, 'getSession').mockResolvedValueOnce(null as any);

    const req = new NextRequest('http://localhost:3000/api/qr');
    const res = await listQR(req);

    expect(res.status).toBe(401);
  });

  it('lists QR codes for authenticated user', async () => {
    vi.spyOn(auth.api, 'getSession').mockResolvedValueOnce({
      user: { id: 'user-test', email: 'test@example.com' },
      session: { activeOrganizationId: null },
    } as any);

    const mockQRs = [
      {
        id: 'qr-1',
        title: 'Portfolio',
        shortSlug: 'portfolio',
        destinationUrl: 'https://dev.io',
        isDynamic: true,
        design: '{}',
        scanCount: 10,
        userId: 'user-test',
        organizationId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    vi.spyOn(qrRepository, 'listByUser').mockResolvedValueOnce(mockQRs);

    const req = new NextRequest('http://localhost:3000/api/qr');
    const res = await listQR(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data).toHaveLength(1);
    expect(json.data[0].title).toBe('Portfolio');
  });

  it('creates a new QR code via POST', async () => {
    vi.spyOn(auth.api, 'getSession').mockResolvedValueOnce({
      user: { id: 'user-test', email: 'test@example.com' },
      session: { activeOrganizationId: null },
    } as any);

    vi.spyOn(qrRepository, 'findBySlug').mockResolvedValueOnce(null);
    vi.spyOn(qrRepository, 'create').mockResolvedValueOnce({
      id: 'qr-new',
      title: 'Mon Nouveau QR',
      shortSlug: 'mon-slug',
      destinationUrl: 'https://mysite.com',
      isDynamic: true,
      design: '{}',
      scanCount: 0,
      userId: 'user-test',
      organizationId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const req = new NextRequest('http://localhost:3000/api/qr', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Mon Nouveau QR',
        destinationUrl: 'https://mysite.com',
        shortSlug: 'mon-slug',
      }),
    });

    const res = await createQR(req);
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.data.id).toBe('qr-new');
    expect(json.data.shortSlug).toBe('mon-slug');
  });

  it('prevents creating QR code with duplicate slug', async () => {
    vi.spyOn(auth.api, 'getSession').mockResolvedValueOnce({
      user: { id: 'user-test', email: 'test@example.com' },
      session: { activeOrganizationId: null },
    } as any);

    vi.spyOn(qrRepository, 'findBySlug').mockResolvedValueOnce({
      id: 'qr-existing',
      shortSlug: 'taken-slug',
    } as any);

    const req = new NextRequest('http://localhost:3000/api/qr', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Duplicate',
        destinationUrl: 'https://mysite.com',
        shortSlug: 'taken-slug',
      }),
    });

    const res = await createQR(req);
    expect(res.status).toBe(409);
  });

  it('deletes a QR code when owned by authenticated user', async () => {
    vi.spyOn(auth.api, 'getSession').mockResolvedValueOnce({
      user: { id: 'user-test', email: 'test@example.com' },
      session: { activeOrganizationId: null },
    } as any);

    vi.spyOn(qrRepository, 'findById').mockResolvedValueOnce({
      id: 'qr-del',
      userId: 'user-test',
    } as any);

    const deleteSpy = vi.spyOn(qrRepository, 'delete').mockResolvedValueOnce(true);

    const req = new NextRequest('http://localhost:3000/api/qr/qr-del', {
      method: 'DELETE',
    });

    const res = await deleteQR(req, {
      params: Promise.resolve({ id: 'qr-del' }),
    });

    expect(res.status).toBe(200);
    expect(deleteSpy).toHaveBeenCalledWith('qr-del', 'user-test');
  });
});
