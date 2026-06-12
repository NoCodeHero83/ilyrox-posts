"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyableIdProps {
  id: string;
  className?: string;
}

/**
 * Muestra "ID: <código>" y permite copiarlo al portapapeles tocando el número
 * o el ícono de copiar. Al copiar, muestra un indicador "¡Copiado!" durante
 * ~1.5s. Incluye fallback para navegadores sin API de clipboard.
 */
export function CopyableId({ id, className = "" }: CopyableIdProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    // El banner vive dentro del carrusel; evitamos que el toque afecte al scroll
    // o a cualquier onClick del contenedor.
    e.stopPropagation();
    e.preventDefault();

    try {
      await navigator.clipboard.writeText(id);
    } catch {
      // Fallback para contextos sin permiso/clipboard API
      const ta = document.createElement("textarea");
      ta.value = id;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* noop */
      }
      document.body.removeChild(ta);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title="Copiar ID"
      aria-label={`Copiar ID ${id}`}
      className={`pointer-events-auto relative inline-flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors ${className}`}
    >
      <span>ID: {id}</span>
      {copied ? (
        <Check className="w-3.5 h-3.5 text-emerald-400" />
      ) : (
        <Copy className="w-3.5 h-3.5 opacity-80" />
      )}

      {copied && (
        <span className="absolute -top-7 left-0 bg-emerald-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md shadow whitespace-nowrap pointer-events-none">
          ¡Copiado!
        </span>
      )}
    </button>
  );
}

export default CopyableId;
