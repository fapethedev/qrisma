import type { BetterAuthPlugin } from 'better-auth';

/**
 * Plugin Better Auth pour QRCraft
 * Gère le schéma et les entités spécifiques aux QR Codes et aux scans directement avec Better Auth
 */
export const qrPlugin = () => {
  return {
    id: 'qr-plugin',
    schema: {
      qrCode: {
        fields: {
          title: {
            type: 'string',
            defaultValue: 'Mon QR Code',
            required: false,
          },
          shortSlug: {
            type: 'string',
            unique: true,
            required: true,
          },
          destinationUrl: {
            type: 'string',
            required: true,
          },
          isDynamic: {
            type: 'boolean',
            defaultValue: true,
            required: false,
          },
          design: {
            type: 'string',
            required: true,
          },
          scanCount: {
            type: 'number',
            defaultValue: 0,
            required: false,
          },
          userId: {
            type: 'string',
            references: {
              model: 'user',
              field: 'id',
              onDelete: 'cascade',
            },
            required: true,
          },
          organizationId: {
            type: 'string',
            references: {
              model: 'organization',
              field: 'id',
              onDelete: 'set null',
            },
            required: false,
          },
          createdAt: {
            type: 'date',
            required: true,
          },
          updatedAt: {
            type: 'date',
            required: true,
          },
        },
      },
      scanEvent: {
        fields: {
          qrCodeId: {
            type: 'string',
            references: {
              model: 'qrCode',
              field: 'id',
              onDelete: 'cascade',
            },
            required: true,
          },
          deviceType: {
            type: 'string',
            required: false,
          },
          os: {
            type: 'string',
            required: false,
          },
          browser: {
            type: 'string',
            required: false,
          },
          country: {
            type: 'string',
            required: false,
          },
          city: {
            type: 'string',
            required: false,
          },
          ipHash: {
            type: 'string',
            required: false,
          },
          referer: {
            type: 'string',
            required: false,
          },
          scannedAt: {
            type: 'date',
            required: true,
          },
        },
      },
    },
  } satisfies BetterAuthPlugin;
};
