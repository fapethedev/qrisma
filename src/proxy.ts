import { NextRequest, NextResponse } from 'next/server';

export default function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;

  if (!localeCookie) {
    // Détection de la langue préférée (FR par défaut, EN si demandé dans Accept-Language)
    const acceptLang = request.headers.get('accept-language') || '';
    const preferredLocale = acceptLang.toLowerCase().includes('en') ? 'en' : 'fr';
    response.cookies.set('NEXT_LOCALE', preferredLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  // Exclure les routes API, assets internes Next, et les liens de redirection /s/[slug]
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
