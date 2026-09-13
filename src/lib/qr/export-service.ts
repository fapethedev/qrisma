import { jsPDF } from 'jspdf';
import type { QRExportOptions, QRExportResolution } from './types';

/**
 * Service d'exportation haute fidélité pour les formats SVG, PNG, JPEG et PDF.
 */
export async function exportQRCode(
  svgElement: SVGSVGElement,
  options: QRExportOptions
): Promise<void> {
  const { filename, format, resolution, transparentBackground } = options;
  const cleanFilename = (filename || 'qrcraft-code').replace(/\.[^/.]+$/, '');

  switch (format) {
    case 'svg':
      downloadSVG(svgElement, `${cleanFilename}.svg`);
      break;

    case 'png':
      await downloadRasterImage(svgElement, `${cleanFilename}.png`, 'image/png', resolution, transparentBackground);
      break;

    case 'jpeg':
      await downloadRasterImage(svgElement, `${cleanFilename}.jpg`, 'image/jpeg', resolution, false);
      break;

    case 'pdf':
      await downloadPDF(svgElement, `${cleanFilename}.pdf`, resolution);
      break;

    default:
      throw new Error(`Format d'export non supporté : ${format}`);
  }
}

/**
 * Exporte le SVG brut vectoriel.
 */
function downloadSVG(svgElement: SVGSVGElement, filename: string): void {
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svgElement);

  // Assurer la présence des attributs XML indispensables
  if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if (!source.match(/^<svg[^>]+xmlns:xlink="http:\/\/www\.w3\.org\/1999\/xlink"/)) {
    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }

  const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
  triggerDownload(blob, filename);
}

/**
 * Convertit le SVG en image rasterisée (PNG/JPEG) sur un canvas HTML5 à haute résolution.
 */
async function downloadRasterImage(
  svgElement: SVGSVGElement,
  filename: string,
  mimeType: 'image/png' | 'image/jpeg',
  targetSize: QRExportResolution,
  transparent = false
): Promise<void> {
  const dataUrl = await svgToRasterDataUrl(svgElement, targetSize, mimeType, transparent);
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Génère un document PDF vectoriel prêt pour l'impression avec le QR Code centré.
 */
async function downloadPDF(
  svgElement: SVGSVGElement,
  filename: string,
  resolution: QRExportResolution
): Promise<void> {
  const dataUrl = await svgToRasterDataUrl(svgElement, resolution, 'image/png', false);

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // QR Code de 100mm x 100mm centré sur la page
  const qrSizeMm = 100;
  const x = (pageWidth - qrSizeMm) / 2;
  const y = (pageHeight - qrSizeMm) / 2 - 15;

  pdf.addImage(dataUrl, 'PNG', x, y, qrSizeMm, qrSizeMm);

  // Titre & watermark discret
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.setTextColor(30, 41, 59);
  pdf.text('Scannez pour accéder', pageWidth / 2, y + qrSizeMm + 15, { align: 'center' });

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(100, 116, 139);
  pdf.text('Généré avec QRCraft Studio', pageWidth / 2, y + qrSizeMm + 24, { align: 'center' });

  pdf.save(filename);
}

/**
 * Utilitaire interne pour convertir le SVG en Data URL via un Canvas HTML5.
 */
function svgToRasterDataUrl(
  svgElement: SVGSVGElement,
  size: number,
  mimeType: 'image/png' | 'image/jpeg',
  transparent: boolean
): Promise<string> {
  return new Promise((resolve, reject) => {
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error('Impossible d’initialiser le contexte 2D du Canvas'));
        return;
      }

      if (!transparent || mimeType === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, size, size);
      }

      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);

      resolve(canvas.toDataURL(mimeType, 0.95));
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };

    img.src = url;
  });
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
