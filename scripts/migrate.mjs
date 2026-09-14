import { execSync } from 'node:child_process';

const databaseUrl = process.env.DATABASE_URL?.trim();

if (databaseUrl && !databaseUrl.startsWith('memory:')) {
  console.log('🚀 [Better Auth] DATABASE_URL détectée, synchronisation des tables de la base de données...');
  try {
    execSync('better-auth migrate --config src/lib/auth/auth.ts --yes', {
      stdio: 'inherit',
      env: process.env,
    });
    console.log('✅ [Better Auth] Tables synchronisées avec succès.');
  } catch (error) {
    console.error('❌ [Better Auth] Échec de la migration :', error?.message || error);
    process.exit(1);
  }
} else {
  console.log('ℹ️ [Better Auth] Aucune DATABASE_URL externe configurée, passage direct à la compilation.');
}
