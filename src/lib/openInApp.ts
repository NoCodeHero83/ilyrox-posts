export const APP_STORE_URL = "https://apps.apple.com/us/app/ilyrox/id6756507569";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.ilyrox.app&hl=es_BO";

/**
 * Detecta si la página se abrió dentro del navegador in-app de una app social
 * (Instagram, Facebook, WhatsApp, Messenger, Line, Twitter, Pinterest…).
 *
 * Dentro de estos webviews los universal links / app links NO disparan: iOS y
 * Android los interceptan solo en Safari/Chrome de sistema. Para no dejar al
 * usuario atrapado en la web, se abre la app por su esquema propio.
 */
export function isInAppBrowser(): boolean {
  return /(instagram|fbav|fban|messenger|line|twitter|pinterest|googleinapp|whatsapp|duckduckgo)/i.test(
    navigator.userAgent,
  );
}

/**
 * Abre la app por su esquema propio (`ilyroxapp://?type=X&id=Y`).
 *
 * @param options.withStoreFallback - true (default): si la app no está
 * instalada, tras 1.5s sin que tome el control se cae a la tienda de apps. Se
 * cancela si la pestaña se oculta (la app sí tomó el control). false: intento
 * silencioso sin redirección a la tienda (útil para auto-open en webviews, para
 * no arrancar la tienda a todo visitante cuya app no esté instalada).
 */
export function openInApp({
  withStoreFallback = true,
}: { withStoreFallback?: boolean } = {}): void {
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const storeUrl = isIOS ? APP_STORE_URL : PLAY_STORE_URL;
  const search = window.location.search || "";

  if (withStoreFallback) {
    const timer = window.setTimeout(() => {
      if (!document.hidden) window.location.href = storeUrl;
    }, 1500);

    const cancel = () => {
      if (document.hidden) window.clearTimeout(timer);
    };
    document.addEventListener("visibilitychange", cancel, { once: true });
  }

  window.location.href = `ilyroxapp://${search}`;
}
