import Avatar from "../Shared/Avatar";
import type { perfiles } from "../types";

interface AgentCardProps {
  agent: perfiles;
  onClick?: () => void;
}

export function AgentCard({ agent, onClick }: AgentCardProps) {
  // Mostrar siempre la ocupación (ej. "Asesor Inmobiliario"), nunca el rol
  // ("cliente"/"agente"). Si la ocupación es "Otro", usar otro_ocupacion.
  const occupation =
    agent.ocupacion === "Otro"
      ? agent.otro_ocupacion?.trim() || null
      : agent.ocupacion?.trim() || null;

  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between w-full p-1 bg-gray-50/50 rounded-2xl border border-gray-100/50 group hover:bg-gray-50 transition-all duration-300 ${
        onClick ? "cursor-pointer active:scale-[0.98]" : "cursor-default"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar
            uri={agent.foto}
            name={agent.nombre_completo}
            size={56}
            isWithBorder
            className="group-hover:scale-105 transition-transform duration-300"
          />
          {agent.estado_registro === "verificado" && (
            <div className="absolute -bottom-0.5 -right-0.5 bg-primary w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
              <span className="text-white text-[10px] font-bold">✓</span>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900 leading-tight">
              {agent.nombre_completo}
            </h3>
            <div className="flex items-center bg-yellow-400/10 text-yellow-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
              <span className="mr-0.5">★</span> {agent.calificacion_promedio}
            </div>
          </div>
          {occupation && (
            <p className="text-xs text-primary font-semibold mt-0.5">
              {occupation}
            </p>
          )}
          {/* <div className="flex items-center gap-3 mt-2">
            {agent.email && (
              <a
                href={`mailto:${agent.email}`}
                className="text-gray-400 hover:text-primary transition-colors"
                title="Enviar correo"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
}
