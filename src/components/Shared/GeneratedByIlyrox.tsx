interface GeneratedByIlyroxProps {
  className?: string;
}

/**
 * Pie discreto "Generado por Ilyrox" que se muestra bajo cada tarjeta
 * compartida (post, búsqueda, openhouse, sold, aniversario, propiedad, reel).
 */
export function GeneratedByIlyrox({ className = "" }: GeneratedByIlyroxProps) {
  return (
    <div
      className={`flex items-center justify-center gap-1.5 text-xs text-gray-400 ${className}`}
    >
      <img
        src="/Logo.jpeg"
        alt="Ilyrox"
        className="w-4 h-4 rounded-full object-cover"
      />
      <span>Generado por Ilyrox</span>
    </div>
  );
}

export default GeneratedByIlyrox;
