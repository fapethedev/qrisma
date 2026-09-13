import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '@/app/s/[slug]/route';
import { qrRepository } from '@/lib/db/qr-repository';

describe('Dynamic QR Redirection Route (/s/[slug])', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('redirects with 302 to destinationUrl and sets no-cache headers when QR is found', async () => {
    const mockQR = {
      id: 'qr-abc',
      title: 'Redirection Test',
      shortSlug: 'my-link',
      destinationUrl: 'https://destination.example.com',
      isDynamic: true,
      design: '{}',
      scanCount: 5,
      userId: 'user-1',
      organizationId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.spyOn(qrRepository, 'findBySlug').mockResolvedValueOnce(mockQR);
    const recordSpy = vi.spyOn(qrRepository, 'recordScan').mockResolvedValueOnce({
      id: 'scan-1',
      qrCodeId: 'qr-abc',
      deviceType: 'Mobile',
      os: 'iOS',
      browser: 'Safari',
      country: 'FR',
      city: 'Paris',
      ipHash: 'abc',
      referer: null,
      scannedAt: new Date(),
    });

    const request = new NextRequest('http://localhost:3000/s/my-link', {
      headers: {
        'user-agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        'x-vercel-ip-country': 'FR',
      },
    });

    const response = await GET(request, {
      params: Promise.resolve({ slug: 'my-link' }),
    });

    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toBe('https://destination.example.com/');
    expect(response.headers.get('cache-control')).toContain('no-store');
    expect(recordSpy).toHaveBeenCalled();
  });

  it('redirects to 404 if slug is not found in database', async () => {
    vi.spyOn(qrRepository, 'findBySlug').mockResolvedValueOnce(null);

    const request = new NextRequest('http://localhost:3000/s/non-existent');
    const response = await GET(request, {
      params: Promise.resolve({ slug: 'non-existent' }),
    });

    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toContain('/404');
  });
});
