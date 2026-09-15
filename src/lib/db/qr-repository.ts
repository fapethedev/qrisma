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
   * Mise à jour d'un QR code existant
   */
  async update(
    id: string,
    userId: string,
    params: {
      title?: string;
      destinationUrl?: string;
      isDynamic?: boolean;
      design?: Record<string, any> | string;
    }
  ): Promise<DbQRCode | null> {
    const existing = await this.findById(id);
    if (!existing || existing.userId !== userId) {
      return null;
    }

    const updates: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (params.title !== undefined) {
      updates.push(`"title" = $${idx++}`);
      values.push(params.title);
    }
    if (params.destinationUrl !== undefined) {
      updates.push(`"destinationUrl" = $${idx++}`);
      values.push(params.destinationUrl);
    }
    if (params.isDynamic !== undefined) {
      updates.push(`"isDynamic" = $${idx++}`);
      values.push(params.isDynamic);
    }
    if (params.design !== undefined) {
      const designStr =
        typeof params.design === 'string' ? params.design : JSON.stringify(params.design);
      updates.push(`"design" = $${idx++}`);
      values.push(designStr);
    }

    updates.push(`"updatedAt" = $${idx++}`);
    values.push(new Date());

    values.push(id);
    values.push(userId);

    const rows = await query<DbQRCode>(
      `UPDATE "qrCode" 
       SET ${updates.join(', ')} 
       WHERE "id" = $${idx++} AND "userId" = $${idx++} 
       RETURNING *;`,
      values
    );

    return rows[0] || null;
  },

  /**
   * Vue d'ensemble globale de l'utilisateur (KPIs du Dashboard)
   */
  async getUserOverview(userId: string) {
    // 1. Total QR codes et total scans
    const qrStatsQuery = query<{ total_qr: string; total_scans: string }>(
      `SELECT 
        COUNT(*) as total_qr, 
        COALESCE(SUM("scanCount"), 0) as total_scans 
       FROM "qrCode" 
       WHERE "userId" = $1;`,
      [userId]
    );

    // 2. Scans des 7 derniers jours
    const sevenDaysQuery = query<{ count: string }>(
      `SELECT COUNT(s.*) as count 
       FROM "scanEvent" s
       JOIN "qrCode" q ON s."qrCodeId" = q."id"
       WHERE q."userId" = $1 AND s."scannedAt" >= NOW() - INTERVAL '7 days';`,
      [userId]
    );

    // 3. Meilleur QR Code (le plus scanné)
    const topQrQuery = query<DbQRCode>(
      `SELECT * FROM "qrCode" 
       WHERE "userId" = $1 
       ORDER BY "scanCount" DESC 
       LIMIT 1;`,
      [userId]
    );

    const [qrStats, sevenDays, topQr] = await Promise.all([
      qrStatsQuery,
      sevenDaysQuery,
      topQrQuery,
    ]);

    return {
      totalQRCodes: parseInt(qrStats[0]?.total_qr || '0', 10),
      totalScans: parseInt(qrStats[0]?.total_scans || '0', 10),
      recentScans7d: parseInt(sevenDays[0]?.count || '0', 10),
      topQRCode: topQr[0] || null,
    };
  },

  /**
   * Évolution temporelle des scans journaliers (pour graphiques Recharts)
   */
  async getScanTimeline(params: { userId?: string; qrCodeId?: string; days?: number }) {
    const days = params.days || 30;
    let sql = ``;
    let queryParams: any[] = [];

    if (params.qrCodeId) {
      sql = `
        SELECT 
          to_char("scannedAt", 'YYYY-MM-DD') as date,
          COUNT(*) as scans
        FROM "scanEvent"
        WHERE "qrCodeId" = $1 AND "scannedAt" >= NOW() - ($2 || ' days')::INTERVAL
        GROUP BY date
        ORDER BY date ASC;
      `;
      queryParams = [params.qrCodeId, days];
    } else if (params.userId) {
      sql = `
        SELECT 
          to_char(s."scannedAt", 'YYYY-MM-DD') as date,
          COUNT(s.*) as scans
        FROM "scanEvent" s
        JOIN "qrCode" q ON s."qrCodeId" = q."id"
        WHERE q."userId" = $1 AND s."scannedAt" >= NOW() - ($2 || ' days')::INTERVAL
        GROUP BY date
        ORDER BY date ASC;
      `;
      queryParams = [params.userId, days];
    } else {
      return [];
    }

    const rows = await query<{ date: string; scans: string }>(sql, queryParams);
    return rows.map((r) => ({
      date: r.date,
      scans: parseInt(r.scans, 10),
    }));
  },

  /**
   * Répartition géographique des scans par pays
   */
  async getCountryBreakdown(params: { userId?: string; qrCodeId?: string }) {
    let sql = ``;
    let queryParams: any[] = [];

    if (params.qrCodeId) {
      sql = `
        SELECT COALESCE("country", 'Inconnu') as country, COUNT(*) as count 
        FROM "scanEvent" 
        WHERE "qrCodeId" = $1 
        GROUP BY country 
        ORDER BY count DESC 
        LIMIT 10;
      `;
      queryParams = [params.qrCodeId];
    } else if (params.userId) {
      sql = `
        SELECT COALESCE(s."country", 'Inconnu') as country, COUNT(s.*) as count 
        FROM "scanEvent" s
        JOIN "qrCode" q ON s."qrCodeId" = q."id"
        WHERE q."userId" = $1 
        GROUP BY country 
        ORDER BY count DESC 
        LIMIT 10;
      `;
      queryParams = [params.userId];
    } else {
      return [];
    }

    const rows = await query<{ country: string; count: string }>(sql, queryParams);
    return rows.map((r) => ({
      country: r.country,
      count: parseInt(r.count, 10),
    }));
  },

  /**
   * Récupère les informations publiques d'un utilisateur par son ID
   */
  async findUserById(userId: string): Promise<{ id: string; email: string; name: string | null } | null> {
    const rows = await query<{ id: string; email: string; name: string | null }>(
      `SELECT "id", "email", "name" FROM "user" WHERE "id" = $1 LIMIT 1;`,
      [userId]
    );
    return rows[0] || null;
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
