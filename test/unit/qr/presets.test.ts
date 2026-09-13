import { describe, expect, it } from 'vitest';
import { QR_VISUAL_PRESETS } from '@/lib/qr/presets';

describe('QR Visual Presets (Unit Tests)', () => {
  it('should define all presets with non-empty id, name and category', () => {
    expect(QR_VISUAL_PRESETS.length).toBeGreaterThanOrEqual(5);

    for (const preset of QR_VISUAL_PRESETS) {
      expect(preset.id).toBeTruthy();
      expect(preset.name).toBeTruthy();
      expect(preset.description).toBeTruthy();
      expect(['minimal', 'modern', 'cyberpunk', 'luxury', 'nature', 'corporate']).toContain(
        preset.category
      );
      expect(preset.config).toBeDefined();
    }
  });

  it('should contain cyberpunk-neon preset with circuit-board style', () => {
    const cyberpunk = QR_VISUAL_PRESETS.find((p) => p.id === 'cyberpunk-neon');
    expect(cyberpunk).toBeDefined();
    expect(cyberpunk?.config.dataModulesSettings?.style).toBe('circuit-board');
    expect(cyberpunk?.config.finderPatternInnerSettings?.style).toBe('microchip');
  });

  it('should contain obsidian gold preset with diamond style', () => {
    const gold = QR_VISUAL_PRESETS.find((p) => p.id === 'elegant-gold');
    expect(gold).toBeDefined();
    expect(gold?.config.dataModulesSettings?.style).toBe('diamond');
  });
});
