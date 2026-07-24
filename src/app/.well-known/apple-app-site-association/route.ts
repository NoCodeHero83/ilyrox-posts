/**
 * Apple App Site Association — habilita los Universal Links de iOS.
 *
 * Se sirve como route handler y no como archivo en public/ porque el recurso no
 * lleva extensión y Apple exige `Content-Type: application/json` sin redirects.
 *
 * Los links compartidos siempre viven en la raíz con query (`/?type=X&id=Y`),
 * de ahí el matching por `"?"` — requiere iOS 13+.
 */

export const dynamic = "force-static";

const APP_ID = "9BWTN3CAXU.com.ilyrox.app";

export function GET() {
  return Response.json({
    applinks: {
      details: [
        {
          appIDs: [APP_ID],
          components: [
            {
              "/": "/",
              "?": { type: "?*", id: "?*" },
              comment: "Links de propiedades, posts y reels compartidos",
            },
          ],
        },
      ],
    },
    // La app no usa Handoff ni App Clips; se declaran vacíos para evitar
    // que iOS interprete la ausencia como configuración incompleta.
    activitycontinuation: { apps: [APP_ID] },
    webcredentials: { apps: [APP_ID] },
  });
}
