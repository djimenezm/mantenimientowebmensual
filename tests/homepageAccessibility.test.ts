import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('homepage accessibility', () => {
  it('uses unique primary button labels for different guide destinations', () => {
    const homePage = readFileSync(join(process.cwd(), 'app/page.tsx'), 'utf8');
    const linkMatches = Array.from(
      homePage.matchAll(
        /<a\s+[^>]*href="([^"]+)"[^>]*className="primary-button"[^>]*>\s*([^<]+?)\s*<\/a>/g,
      ),
    );
    const labelsByHref = new Map<string, string>();
    const hrefsByLabel = new Map<string, Set<string>>();

    for (const [, href, label] of linkMatches) {
      const normalizedLabel = label.replace(/\s+/g, ' ').trim();

      labelsByHref.set(href, normalizedLabel);

      if (!hrefsByLabel.has(normalizedLabel)) {
        hrefsByLabel.set(normalizedLabel, new Set());
      }

      hrefsByLabel.get(normalizedLabel)!.add(href);
    }

    expect(labelsByHref.size).toBeGreaterThanOrEqual(9);
    expect([...labelsByHref.values()]).not.toContain('Leer la guia');
    expect([...labelsByHref.values()]).not.toContain('Leer la guía');

    for (const [label, hrefs] of hrefsByLabel.entries()) {
      expect({ label, hrefs: [...hrefs] }).toEqual({
        label,
        hrefs: [expect.any(String)],
      });
    }
  });
});
