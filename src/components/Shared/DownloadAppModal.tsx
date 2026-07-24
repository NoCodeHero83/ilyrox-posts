import { X, Smartphone, Globe, Apple, Play, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

const APP_STORE_URL = "https://apps.apple.com/us/app/ilyrox/id6756507569";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.ilyrox.app&hl=es_BO";

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DownloadAppModal({ isOpen, onClose }: DownloadAppModalProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsMobile(/android|iphone|ipad|ipod/i.test(navigator.userAgent));
  }, []);

  /**
   * Abre la app por su esquema propio y cae a la tienda si no está instalada.
   *
   * Existe además del universal link porque dentro de webviews (Instagram,
   * Facebook) los universal links no disparan y el usuario se queda en la web.
   * El fallback se cancela si la pestaña se oculta: eso significa que la app sí
   * tomó el control.
   */
  const openInApp = () => {
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const storeUrl = isIOS ? APP_STORE_URL : PLAY_STORE_URL;
    const search = window.location.search || "";

    const timer = window.setTimeout(() => {
      if (!document.hidden) window.location.href = storeUrl;
    }, 1500);

    const cancel = () => {
      if (document.hidden) window.clearTimeout(timer);
    };
    document.addEventListener("visibilitychange", cancel, { once: true });

    window.location.href = `ilyroxapp://${search}`;
  };

  const handleAnimationEnd = () => {
    if (!isOpen) setShouldRender(false);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onTransitionEnd={handleAnimationEnd}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden transform transition-all duration-500 ease-out-back ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-12 scale-95"
        }`}
      >
        {/* Header/Banner */}
        <div className="bg-primary p-8 text-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-[-20%] left-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-[-20%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl" />

          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-md mb-4 rotate-3">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white leading-tight">
            Lleva a Ilyrox <br /> en tu bolsillo
          </h2>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 text-center">
          <p className="text-gray-500 mb-8 font-medium">
            ¡La experiencia completa est&aacute; en nuestra App!
            Desc&aacute;rgala ahora y vive el futuro inmobiliario.
          </p>

          <div className="flex flex-col gap-3">
            {isMobile && (
              <button
                onClick={openInApp}
                className="flex items-center justify-center gap-3 bg-primary text-white p-4 rounded-2xl hover:opacity-90 transition-all hover:scale-[1.02] active:scale-100 shadow-lg"
              >
                <ExternalLink className="w-5 h-5" />
                <span className="text-lg font-bold">Abrir en la app</span>
              </button>
            )}

            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-gray-900 text-white p-4 rounded-2xl hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-100 group shadow-lg"
            >
              <div className="bg-white/10 p-2 rounded-xl">
                <Apple className="w-6 h-6 fill-current" />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold text-gray-400 leading-none">
                  Download on the
                </p>
                <p className="text-xl font-bold leading-tight">App Store</p>
              </div>
            </a>

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#202124] text-white p-4 rounded-2xl hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-100 group shadow-lg"
            >
              <div className="bg-white/10 p-2 rounded-xl">
                <Play className="w-6 h-6 fill-current" />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold text-gray-400 leading-none">
                  Get it on
                </p>
                <p className="text-xl font-bold leading-tight">Google Play</p>
              </div>
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-primary font-bold text-sm">
            <Globe className="w-4 h-4" />
            <span>ilyrox.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
