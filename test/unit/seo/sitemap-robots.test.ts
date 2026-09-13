import { describe, it, expect } from 'vitest';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';

describe('SEO & Search Engine Indexing Configuration', () => {
  it('génère un robots.txt valide protégeant les endpoints privés et autorisant les routes publiques', () => {
    const config = robots();

    expect(config.sitemap).toContain('/sitemap.xml');
    
    // Normalisation si rules est un tableau ou objet unique
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    const defaultRule = rules.find((r) => r.userAgent === '*' || (Array.isArray(r.userAgent) && r.userAgent.includes('*')));

    expect(defaultRule).toBeDefined();
    expect(defaultRule?.allow).toContain('/');
    expect(defaultRule?.allow).toContain('/studio');
    expect(defaultRule?.disallow).toContain('/api/');
    expect(defaultRule?.disallow).toContain('/dashboard/');
    expect(defaultRule?.disallow).toContain('/s/');
  });

  it('génère un sitemap.xml complet contenant les pages d\'accueil et de studio avec priorités optimales', () => {
    const entries = sitemap();

    expect(entries.length).toBeGreaterThanOrEqual(4);
    
    const urls = entries.map((e) => e.url);
    expect(urls.some((u) => u.endsWith('/studio'))).toBe(true);
    expect(urls.some((u) => u.endsWith('/login'))).toBe(true);
    expect(urls.some((u) => u.endsWith('/register'))).toBe(true);

    const homeEntry = entries.find((e) => !e.url.includes('/studio') && !e.url.includes('/login') && !e.url.includes('/register'));
    expect(homeEntry?.priority).toBe(1.0);
  });
});
