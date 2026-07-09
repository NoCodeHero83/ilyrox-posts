"use client";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mismos límites que el feed de la app: una foto vertical se muestra a su
// proporción real hasta 2:3 (alto máx = 1.5× el ancho); más alta se topa y
// aparece el marco oscuro a los costados. Una muy apaisada se topa en 1.91.
const MIN_ASPECT = 2 / 3; // vertical
const MAX_ASPECT = 1.91; // horizontal
const clampAspect = (r: number) =>
  Math.min(MAX_ASPECT, Math.max(MIN_ASPECT, r));

interface ImageCarouselProps {
  images: string[];
  alt?: string;
  /** Clases que definen la altura del carrusel (requerido por scroll-snap + object-cover). */
  aspectClassName?: string;
  /** Clases extra para cada <img>. Por defecto "object-cover". */
  imageClassName?: string;
  showDots?: boolean;
  showCounter?: boolean;
  showArrowsOnDesktop?: boolean;
  /** Override de posición/estilo del contenedor de dots. */
  dotsClassName?: string;
  onIndexChange?: (index: number) => void;
  /**
   * Si es true, el carrusel adopta la proporción real de la PRIMERA imagen
   * (recortada al rango 2:3–1.91) con `object-contain` y fondo oscuro, en vez
   * de forzar `aspectClassName`. Igual que las imágenes del feed móvil: las
   * verticales se ven más largas y las que sobran se enmarcan en oscuro.
   */
  dynamicAspect?: boolean;
  /** Overlays absolutos (banners, gradientes). Se renderizan sobre la imagen. */
  children?: React.ReactNode;
}

/**
 * Carrusel basado en scroll nativo + CSS scroll-snap.
 *
 * Principio: la posición de scroll es la única fuente de verdad. El índice se
 * *deriva* del scroll (solo para dots/contador) y la navegación por flecha/dot
 * es una acción imperativa (scrollTo). No hay useEffect que empuje el scroll de
 * vuelta desde el estado, por lo que no existe el loop de retroalimentación que
 * trababa el deslizado en móvil. El swipe táctil es nativo (como el feed móvil).
 */
export function ImageCarousel({
  images,
  alt = "Imagen",
  aspectClassName = "aspect-square",
  imageClassName = "object-cover",
  showDots = true,
  showCounter = false,
  showArrowsOnDesktop = true,
  dotsClassName,
  onIndexChange,
  dynamicAspect = false,
  children,
}: ImageCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  // Proporción real de la 1ª imagen (solo en modo dynamicAspect).
  const [measuredAspect, setMeasuredAspect] = useState<number | null>(null);

  // Mide la 1ª imagen en cuanto se conoce su tamaño natural. Se llama tanto
  // desde onLoad como desde el ref (para imágenes ya cacheadas, cuyo onLoad
  // puede no dispararse tras la hidratación).
  const measureFromImg = (img: HTMLImageElement | null) => {
    if (!img || !dynamicAspect || measuredAspect !== null) return;
    if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
      setMeasuredAspect(clampAspect(img.naturalWidth / img.naturalHeight));
    }
  };

  if (!images || images.length === 0) return null;

  const hasMultiple = images.length > 1;

  const updateIndex = () => {
    const el = scrollerRef.current;
    if (!el || el.clientWidth === 0) return;
    const next = Math.round(el.scrollLeft / el.clientWidth);
    setIndex((prev) => {
      if (next !== prev) onIndexChange?.(next);
      return next;
    });
  };

  const handleScroll = () => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      updateIndex();
    });
  };

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(i, images.length - 1));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  };

  // En modo dinámico el alto lo marca la proporción medida (fallback cuadrado
  // mientras se mide) y las fotos van "contain" sobre fondo oscuro (letterbox).
  const containerClass = dynamicAspect
    ? "bg-[#0f172a]"
    : aspectClassName;
  const containerStyle = dynamicAspect
    ? { aspectRatio: String(measuredAspect ?? 1) }
    : undefined;
  const imgFit = dynamicAspect ? "object-contain" : imageClassName;

  return (
    <div
      className={`relative w-full ${containerClass} overflow-hidden group`}
      style={containerStyle}
    >
      {/* Track scrollable */}
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-none"
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${alt} - ${i + 1}`}
            loading={i === 0 ? "eager" : "lazy"}
            draggable={false}
            ref={i === 0 ? measureFromImg : undefined}
            onLoad={i === 0 ? (e) => measureFromImg(e.currentTarget) : undefined}
            className={`w-full h-full shrink-0 snap-start snap-always ${imgFit}`}
          />
        ))}
      </div>

      {/* Overlays del consumidor (banners, gradientes) */}
      {children && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {children}
        </div>
      )}

      {hasMultiple && (
        <>
          {/* Flechas (solo desktop) */}
          {showArrowsOnDesktop && (
            <>
              <button
                type="button"
                aria-label="Imagen anterior"
                onClick={() => goTo(index - 1)}
                className="cursor-pointer absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white p-2 rounded-full transition-all z-20 hidden md:flex"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                aria-label="Imagen siguiente"
                onClick={() => goTo(index + 1)}
                className="cursor-pointer absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white p-2 rounded-full transition-all z-20 hidden md:flex"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Contador opcional */}
          {showCounter && (
            <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-full font-bold z-20">
              {index + 1} / {images.length}
            </div>
          )}

          {/* Dots */}
          {showDots && (
            <div
              className={
                dotsClassName ??
                "absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20"
              }
            >
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Ir a la imagen ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "bg-white w-4" : "bg-white/50 hover:bg-white/80 w-1.5"
                  }`}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ImageCarousel;
