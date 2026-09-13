import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as dbModule from '@/lib/db/index';
import { qrRepository } from '@/lib/db/qr-repository';

describe('QR Repository - Analytics & Management', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('calculates user overview stats correctly', async () => {
    vi.spyOn(dbModule, 'query')
      .mockResolvedValueOnce([{ total_qr: '5', total_scans: '142' }]) // total qr and scans
      .mockResolvedValueOnce([{ count: '38' }]) // 7d scans
      .mockResolvedValueOnce([
        {
          id: 'qr-top',
          title: 'Top Flyer',
          shortSlug: 'flyer',
          destinationUrl: 'https://example.com/flyer',
          isDynamic: true,
          design: '{}',
          scanCount: 95,
          userId: 'user-1',
          organizationId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]); // top qr

    const overview = await qrRepository.getUserOverview('user-1');

    expect(overview.totalQRCodes).toBe(5);
    expect(overview.totalScans).toBe(142);
    expect(overview.recentScans7d).toBe(38);
    expect(overview.topQRCode?.title).toBe('Top Flyer');
    expect(overview.topQRCode?.scanCount).toBe(95);
  });

  it('aggregates daily scan timeline correctly', async () => {
    const mockTimeline = [
      { date: '2026-09-10', scans: '12' },
      { date: '2026-09-11', scans: '25' },
      { date: '2026-09-12', scans: '40' },
    ];

    vi.spyOn(dbModule, 'query').mockResolvedValueOnce(mockTimeline);

    const timeline = await qrRepository.getScanTimeline({ userId: 'user-1', days: 7 });

    expect(timeline).toHaveLength(3);
    expect(timeline[0].date).toBe('2026-09-10');
    expect(timeline[0].scans).toBe(12);
    expect(timeline[2].scans).toBe(40);
  });

  it('aggregates country breakdown correctly', async () => {
    const mockCountries = [
      { country: 'FR', count: '85' },
      { country: 'US', count: '30' },
      { country: 'DE', count: '15' },
    ];

    vi.spyOn(dbModule, 'query').mockResolvedValueOnce(mockCountries);

    const countries = await qrRepository.getCountryBreakdown({ userId: 'user-1' });

    expect(countries).toHaveLength(3);
    expect(countries[0].country).toBe('FR');
    expect(countries[0].count).toBe(85);
  });

  it('updates QR code destination and title', async () => {
    const existingQR = {
      id: 'qr-edit',
      title: 'Ancien Titre',
      shortSlug: 'slug-edit',
      destinationUrl: 'https://old.com',
      isDynamic: true,
      design: '{}',
      scanCount: 10,
      userId: 'user-1',
      organizationId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedQR = {
      ...existingQR,
      title: 'Nouveau Titre',
      destinationUrl: 'https://new.com',
      updatedAt: new Date(),
    };

    vi.spyOn(qrRepository, 'findById').mockResolvedValueOnce(existingQR);
    vi.spyOn(dbModule, 'query').mockResolvedValueOnce([updatedQR]);

    const result = await qrRepository.update('qr-edit', 'user-1', {
      title: 'Nouveau Titre',
      destinationUrl: 'https://new.com',
    });

    expect(result?.title).toBe('Nouveau Titre');
    expect(result?.destinationUrl).toBe('https://new.com');
  });

  it('prevents update by a different user', async () => {
    const existingQR = {
      id: 'qr-edit',
      title: 'Titre',
      shortSlug: 'slug',
      destinationUrl: 'https://old.com',
      isDynamic: true,
      design: '{}',
      scanCount: 0,
      userId: 'user-owner',
      organizationId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.spyOn(qrRepository, 'findById').mockResolvedValueOnce(existingQR);

    const result = await qrRepository.update('qr-edit', 'attacker-user', {
      title: 'Hacked',
    });

    expect(result).toBeNull();
  });
});
