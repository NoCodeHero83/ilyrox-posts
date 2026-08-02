"use client";
import { useState } from "react";
import { Smartphone, X } from "lucide-react";
import { openInApp } from "../../lib/openInApp";

export function AppDownloadBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-primary text-white px-4 py-3 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-2 min-w-0">
        <Smartphone className="w-5 h-5 shrink-0" />
        <span className="text-sm font-medium truncate">
          Ilyrox — Ve esto en la app
        </span>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => openInApp()}
          className="bg-white text-primary text-sm font-semibold px-4 py-1.5 rounded-full"
        >
          Abrir
        </button>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Cerrar"
          className="opacity-80 hover:opacity-100"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
