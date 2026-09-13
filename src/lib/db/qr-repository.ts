import { query } from './index';
import crypto from 'crypto';

export interface DbQRCode {
  id: string;
  title: string;
  shortSlug: string;
  destinationUrl: string;
  isDynamic: boolean;
  design: string; // JSON string
  scanCount: number;
  userId: string;
  organizationId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DbScanEvent {
  id: string;
  qrCodeId: string;
  deviceType: string | null;
  os: string | null;
  browser: string | null;
  country: string | null;
  city: string | null;
  ipHash: string | null;
  referer: string | null;
  scannedAt: Date;
}

export interface CreateQRCodeParams {
  id?: string;
  title?: string;
  shortSlug: string;
  destinationUrl: string;
  isDynamic?: boolean;
  design: Record<string, any> | string;
  userId: string;
  organizationId?: string | null;
}

export interface RecordScanParams {
  qrCodeId: string;
  deviceType?: string | null;
  os?: string | null;
  browser?: string | null;
  country?: string | null;
  city?: string | null;
  ip?: string | null;
  referer?: string | null;
}

export const qrRepository = {
  /**
   * Création d'un nouveau QR code
   */
  async create(params: CreateQRCodeParams): Promise<DbQRCode> {
    const id = params.id || crypto.randomUUID();
    const now = new Date();
    const designStr =
      typeof params.design === 'string' ? params.design : JSON.stringify(params.design);

    const rows = await query<DbQRCode>(
      `INSERT INTO "qrCode" (
        "id", "title", "shortSlug", "destinationUrl", "isDynamic", "design", "scanCount", "userId", "organizationId", "createdAt", "updatedAt"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;`,
      [
        id,
        params.title || 'Mon QR Code',
        params.shortSlug,
        params.destinationUrl,
        params.isDynamic ?? true,
        designStr,
        0,
        params.userId,
        params.organizationId || null,
        now,
        now,
      ]
    );

    return rows[0];
  },

  /**
   * Récupération d'un QR code par son slug court pour la redirection
   */
  async findBySlug(shortSlug: string): Promise<DbQRCode | null> {
    const rows = await query<DbQRCode>(
      `SELECT * FROM "qrCode" WHERE "shortSlug" = $1 LIMIT 1;`,
      [shortSlug]
    );
    return rows[0] || null;
  },

  /**
   * Récupération d'un QR code par son ID
   */
  async findById(id: string): Promise<DbQRCode | null> {
    const rows = await query<DbQRCode>(
      `SELECT * FROM "qrCode" WHERE "id" = $1 LIMIT 1;`,
      [id]
    );
    return rows[0] || null;
  },

  /**
   * Liste des QR codes d'un utilisateur
   */
  async listByUser(userId: string): Promise<DbQRCode[]> {
    return query<DbQRCode>(
      `SELECT * FROM "qrCode" WHERE "userId" = $1 ORDER BY "createdAt" DESC;`,
      [userId]
    );
  },

  /**
   * Liste des QR codes d'une organisation
   */
  async listByOrganization(organizationId: string): Promise<DbQRCode[]> {
    return query<DbQRCode>(
      `SELECT * FROM "qrCode" WHERE "organizationId" = $1 ORDER BY "createdAt" DESC;`,
      [organizationId]
    );
  },

  /**
   * Enregistre un scan et incrémente le compteur atomiquement
   */
  async recordScan(params: RecordScanParams): Promise<DbScanEvent> {
    const id = crypto.randomUUID();
    const now = new Date();

    // Hachage anonymisé de l'IP pour le respect de la vie privée (RGPD)
    const ipHash = params.ip
      ? crypto.createHash('sha256').update(params.ip + 'qrcraft_salt').digest('hex').substring(0, 16)
      : null;

    // Enregistrement de l'événement de scan
    const rows = await query<DbScanEvent>(
      `INSERT INTO "scanEvent" (
        "id", "qrCodeId", "deviceType", "os", "browser", "country", "city", "ipHash", "referer", "scannedAt"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;`,
      [
        id,
        params.qrCodeId,
        params.deviceType || 'Inconnu',
        params.os || 'Inconnu',
        params.browser || 'Inconnu',
        params.country || null,
        params.city || null,
        ipHash,
        params.referer || null,
        now,
      ]
    );

    // Incrémentation du compteur total de scans
    await query(
      `UPDATE "qrCode" SET "scanCount" = COALESCE("scanCount", 0) + 1, "updatedAt" = $1 WHERE "id" = $2;`,
      [now, params.qrCodeId]
    );

    return rows[0];
  },

  /**
   * Statistiques agrégées pour un QR code
   */
  async getAnalytics(qrCodeId: string) {
    const totalScansQuery = query<{ count: string }>(
      `SELECT COUNT(*) as count FROM "scanEvent" WHERE "qrCodeId" = $1;`,
      [qrCodeId]
    );

    const deviceBreakdownQuery = query<{ deviceType: string; count: string }>(
      `SELECT "deviceType", COUNT(*) as count FROM "scanEvent" WHERE "qrCodeId" = $1 GROUP BY "deviceType" ORDER BY count DESC;`,
      [qrCodeId]
    );

    const osBreakdownQuery = query<{ os: string; count: string }>(
      `SELECT "os", COUNT(*) as count FROM "scanEvent" WHERE "qrCodeId" = $1 GROUP BY "os" ORDER BY count DESC;`,
      [qrCodeId]
    );

    const browserBreakdownQuery = query<{ browser: string; count: string }>(
      `SELECT "browser", COUNT(*) as count FROM "scanEvent" WHERE "qrCodeId" = $1 GROUP BY "browser" ORDER BY count DESC;`,
      [qrCodeId]
    );

    const [total, devices, os, browsers] = await Promise.all([
      totalScansQuery,
      deviceBreakdownQuery,
      osBreakdownQuery,
      browserBreakdownQuery,
    ]);

    return {
      totalScans: parseInt(total[0]?.count || '0', 10),
      devices,
      os,
      browsers,
    };
  },

  /**
   * Suppression d'un QR code
   */
  async delete(id: string, userId: string): Promise<boolean> {
    const res = await query(
      `DELETE FROM "qrCode" WHERE "id" = $1 AND "userId" = $2;`,
      [id, userId]
    );
    return true;
  },
};
