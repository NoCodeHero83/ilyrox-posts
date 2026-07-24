/**
 * Digital Asset Links — habilita los App Links de Android (autoVerify).
 *
 * El fingerprint tiene que ser el SHA-256 del certificado de **Play App Signing**
 * (Play Console → Integridad de la app → Certificado de la clave de firma de apps),
 * NO el del upload key. Con un valor equivocado la verificación falla en silencio
 * y el link se abre en el navegador.
 *
 * Se toma de la env `ANDROID_CERT_SHA256` (acepta varios separados por coma, útil
 * durante una rotación de clave) para no tener que tocar código al obtenerlo.
 */

export const dynamic = "force-static";

const fingerprints = (process.env.ANDROID_CERT_SHA256 ?? "")
  .split(",")
  .map((f) => f.trim().toUpperCase())
  .filter(Boolean);

export function GET() {
  return Response.json([
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: "com.ilyrox.app",
        sha256_cert_fingerprints: fingerprints,
      },
    },
  ]);
}
