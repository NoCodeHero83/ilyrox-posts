"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function IDSearchInput() {
  const [id, setId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim()) return;

    setIsSearching(true);
    // Add type=property & id=[id] to the URL
    router.push(`/?type=property&id=${id.trim()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-md mx-auto mt-6 transition-all duration-300 transform hover:scale-[1.02]"
    >
      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-cyan-600 to-blue-600 rounded-2xl blur-sm opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-1.5 focus-within:border-cyan-300 focus-within:ring-4 focus-within:ring-cyan-50/50 transition-all duration-300">
          <div className="pl-3.5 text-gray-400 group-focus-within:text-cyan-500 transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Ingrese el código de propiedad"
            className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 placeholder:text-gray-400 font-medium px-3 outline-none py-2.5"
          />
          <button
            type="submit"
            disabled={isSearching || !id.trim()}
            className="flex items-center gap-2 bg-[#1a2e2f] hover:bg-[#1a2e2f]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 whitespace-nowrap"
          >
            {isSearching ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Buscar"
            )}
          </button>
        </div>
      </div>
      <p className="mt-3 text-[11px] text-gray-400 font-medium uppercase tracking-widest text-center">
        Ejemplo: <span className="text-cyan-600">3058866899</span>
      </p>
    </form>
  );
}
