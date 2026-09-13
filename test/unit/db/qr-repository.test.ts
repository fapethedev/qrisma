import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as dbModule from '@/lib/db/index';
import { qrRepository } from '@/lib/db/qr-repository';

describe('QR Code Repository', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('creates a QR code with valid defaults', async () => {
    const mockRow = {
      id: 'qr-123',
      title: 'Mon Super QR',
      shortSlug: 'demo-slug',
      destinationUrl: 'https://qrcraft.app',
      isDynamic: true,
      design: JSON.stringify({ fgColor: '#000000' }),
      scanCount: 0,
      userId: 'user-1',
      organizationId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.spyOn(dbModule, 'query').mockResolvedValueOnce([mockRow]);

    const result = await qrRepository.create({
      title: 'Mon Super QR',
      shortSlug: 'demo-slug',
      destinationUrl: 'https://qrcraft.app',
      design: { fgColor: '#000000' },
      userId: 'user-1',
    });

    expect(result.id).toBe('qr-123');
    expect(result.shortSlug).toBe('demo-slug');
    expect(result.destinationUrl).toBe('https://qrcraft.app');
  });

  it('finds a QR code by short slug', async () => {
    const mockRow = {
      id: 'qr-123',
      title: 'Test',
      shortSlug: 'find-me',
      destinationUrl: 'https://example.com',
      isDynamic: true,
      design: '{}',
      scanCount: 12,
      userId: 'user-1',
      organizationId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.spyOn(dbModule, 'query').mockResolvedValueOnce([mockRow]);

    const result = await qrRepository.findBySlug('find-me');
    expect(result).not.toBeNull();
    expect(result?.shortSlug).toBe('find-me');
    expect(result?.destinationUrl).toBe('https://example.com');
  });

  it('returns null when slug does not exist', async () => {
    vi.spyOn(dbModule, 'query').mockResolvedValueOnce([]);

    const result = await qrRepository.findBySlug('unknown-slug');
    expect(result).toBeNull();
  });

  it('records a scan and updates scan count', async () => {
    const mockScanEvent = {
      id: 'scan-1',
      qrCodeId: 'qr-123',
      deviceType: 'Mobile',
      os: 'iOS',
      browser: 'Safari',
      country: 'FR',
      city: 'Paris',
      ipHash: 'abc123hash',
      referer: 'https://google.com',
      scannedAt: new Date(),
    };

    const querySpy = vi.spyOn(dbModule, 'query');
    querySpy
      .mockResolvedValueOnce([mockScanEvent]) // INSERT scanEvent
      .mockResolvedValueOnce([]); // UPDATE qrCode

    const result = await qrRepository.recordScan({
      qrCodeId: 'qr-123',
      deviceType: 'Mobile',
      os: 'iOS',
      browser: 'Safari',
      country: 'FR',
      city: 'Paris',
      ip: '192.168.1.1',
      referer: 'https://google.com',
    });

    expect(result.qrCodeId).toBe('qr-123');
    expect(result.deviceType).toBe('Mobile');
    expect(querySpy).toHaveBeenCalledTimes(2);
  });
});
