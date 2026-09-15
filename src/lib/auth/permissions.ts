/**
 * Gestionnaire de rôles et de permissions Freemium pour QRCraft
 * Définit les quotas, fonctionnalités autorisées et limites par plan
 */

export type UserPlan = 'free' | 'pro' | 'enterprise' | 'admin';

export interface PlanLimits {
  maxQRCodes: number;
  allowDynamic: boolean;
  allowCustomLogo: boolean;
  allowSvgExport: boolean;
  allowHighResExport: boolean; // Résolutions >= 2048px (2x, 4x / 4096px)
  hasWatermark: boolean;
  maxBatchSize: number;
}

export const PLAN_LIMITS: Record<UserPlan, PlanLimits> = {
  free: {
    maxQRCodes: 5,
    allowDynamic: true,
    allowCustomLogo: true,
    allowSvgExport: true,
    allowHighResExport: false, // Seules les tailles 512px et 1024px sont autorisées sans filigrane
    hasWatermark: true,
    maxBatchSize: 1,
  },
  pro: {
    maxQRCodes: Infinity,
    allowDynamic: true,
    allowCustomLogo: true,
    allowSvgExport: true,
    allowHighResExport: true,
    hasWatermark: false,
    maxBatchSize: 50,
  },
  enterprise: {
    maxQRCodes: Infinity,
    allowDynamic: true,
    allowCustomLogo: true,
    allowSvgExport: true,
    allowHighResExport: true,
    hasWatermark: false,
    maxBatchSize: 500,
  },
  admin: {
    maxQRCodes: Infinity,
    allowDynamic: true,
    allowCustomLogo: true,
    allowSvgExport: true,
    allowHighResExport: true,
    hasWatermark: false,
    maxBatchSize: 1000,
  },
};

/**
 * Vérifie si l'utilisateur est autorisé à créer un nouveau QR code selon son plan et quota actuel
 */
export function checkQRCodeCreationQuota(
  plan: string = 'free',
  currentCount: number
): { allowed: boolean; limit: number; currentCount: number; message?: string } {
  const normalizedPlan = (plan.toLowerCase() as UserPlan) in PLAN_LIMITS
    ? (plan.toLowerCase() as UserPlan)
    : 'free';

  const limits = PLAN_LIMITS[normalizedPlan];

  if (currentCount >= limits.maxQRCodes) {
    return {
      allowed: false,
      limit: limits.maxQRCodes,
      currentCount,
      message: `Vous avez atteint la limite de ${limits.maxQRCodes} QR codes pour le forfait ${normalizedPlan.toUpperCase()}. Passez à la formule Pro pour débloquer les créations illimitées.`,
    };
  }

  return {
    allowed: true,
    limit: limits.maxQRCodes,
    currentCount,
  };
}

/**
 * Vérifie si l'utilisateur a accès aux résolutions d'export haute définition (2048px et 4096px)
 */
export function canExportHighRes(plan: string = 'free'): boolean {
  const normalizedPlan = (plan.toLowerCase() as UserPlan) in PLAN_LIMITS
    ? (plan.toLowerCase() as UserPlan)
    : 'free';
  return PLAN_LIMITS[normalizedPlan].allowHighResExport;
}

/**
 * Détermine si le filigrane de marque doit être appliqué aux exports
 */
export function shouldApplyWatermark(plan: string = 'free'): boolean {
  const normalizedPlan = (plan.toLowerCase() as UserPlan) in PLAN_LIMITS
    ? (plan.toLowerCase() as UserPlan)
    : 'free';
  return PLAN_LIMITS[normalizedPlan].hasWatermark;
}
