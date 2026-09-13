import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Exclure les routes API, assets internes Next, et les liens de redirection /s/[slug]
  matcher: ['/((?!api|_next|_vercel|s/|.*\\..*).*)'],
};
