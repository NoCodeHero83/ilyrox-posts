import { useState, useEffect } from "react";
import {
  Bed,
  Bath,
  Car,
  MapPin,
  MoveDiagonal,
  Home,
  Building,
  CircleDollarSign,
} from "lucide-react";
import type { Property } from "../types";
import { CardFeature } from "./CardFeature";
import { ImageCarousel } from "../Shared/ImageCarousel";

interface MainImageProps {
  property: Property;
}

export function MainImage({ property }: MainImageProps) {
  const images = property.fotos || [];
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full rounded-none md:rounded-3xl overflow-hidden shadow-sm">
      <ImageCarousel
        images={images}
        alt={property.title}
        aspectClassName="aspect-square md:aspect-video"
        dotsClassName="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 z-20"
      >
        {/* Banner ID / Fecha */}
        <div className="absolute bottom-0 bg-black/40 backdrop-blur-md md:rounded-b-3xl text-gray-200/80 text-xs px-2 py-1 font-bold w-full">
          <span className="p-2">ID: {property.codigo_propiedad}</span>
          <span>•</span>
          <span>
            Publicado el{" "}
            {isMounted && property.created_at
              ? new Date(property.created_at).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "..."}
          </span>
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
      </ImageCarousel>
    </div>
  );
}

interface PropertyInfoProps {
  property: Property;
  hideData?: boolean;
}

export function PropertyInfo({ property, hideData }: PropertyInfoProps) {
  return (
    <div className="mt-4 space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-lg font-semibold text-primary leading-tight bg-cyan-50 rounded-xl px-2 w-fit py-1">
            {property.tipo.charAt(0).toUpperCase() + property.tipo.slice(1)}
          </h1>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            {`${property.subtipo} en ${property.municipio ? property.municipio : property.estado}`}
          </h1>

          <div className="flex flex-col gap-2">
            <div className="cursor-default pt-2">
              <div className="flex flex-wrap items-center gap-4">
                {property.operaciones_propiedad.map((op) => (
                  <div
                    key={op.id}
                    className="flex items-center bg-gray-100/80 rounded-2xl overflow-hidden border border-gray-200 transition-all hover:scale-[1.02] shadow-sm"
                  >
                    <div
                      className={`px-3 py-2 flex items-center justify-center min-h-[40px] ${op.tipo_operacion === "renta" ? " bg-gray-100 text-gray-700" : "bg-[#1a2e2fda] text-gray-100"}`}
                    >
                      <span className="text-[13px] font-black uppercase tracking-[0.15em] leading-none">
                        {op.tipo_operacion === "renta" ? "Renta" : "Venta"}
                      </span>
                    </div>
                    <div className="px-3 py-1 flex items-baseline gap-2 text-gray-800">
                      <span className="text-sm font-semibold opacity-90">
                        {op.moneda}
                      </span>
                      <span className="text-lg font-bold tracking-tight">
                        ${op.precio.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-gray-400 font-medium">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">
                {property.calle
                  ? `${property.calle} ${
                      property.numero_exterior ? property.numero_exterior : ""
                    }, `
                  : ""}
                {property.colonia ? property.colonia + ", " : ""}
                {property.municipio ? property.municipio + ", " : ""}
                {property.estado}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-gray-50/50 rounded-2xl border border-gray-100/50 -my-1">
        <CardFeature
          value={property.habitaciones || 0}
          text="Rec."
          icon={<Bed className="w-5 h-5 text-gray-400" />}
        />
        <CardFeature
          value={property.banos || 0}
          text="Baños"
          icon={<Bath className="w-5 h-5 text-gray-400" />}
        />
        <CardFeature
          value={property.estacionamientos || 0}
          text="Estac."
          icon={<Car className="w-5 h-5 text-gray-400" />}
        />
        <CardFeature
          value={property.pisos || 0}
          text="Niv."
          icon={<Building className="w-5 h-5 text-gray-400" />}
        />
        <CardFeature
          value={`${property.metros_cuadrados_construccion || 0} m²`}
          text="Const"
          icon={<Home className="w-5 h-5 text-gray-400" />}
        />
        <CardFeature
          value={`${property.metros_cuadrados_terreno || 0} m²`}
          text="Terr."
          icon={<MoveDiagonal className="w-5 h-5 text-gray-400" />}
        />
      </div>

      {/* Amenities Section */}
      {property.propiedades_amenidades &&
        property.propiedades_amenidades.length > 0 && (
          <div className="border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Amenidades</h3>

            <div className="flex flex-wrap gap-2">
              {property.propiedades_amenidades.map((item) => (
                <div
                  key={item.id}
                  className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray"
                >
                  {item.catalogo_amenidades.nombre}
                </div>
              ))}
            </div>
          </div>
        )}

      <div className="flex flex-col gap-2">
        <p className="text-lg font-bold text-gray-900">Descripción</p>
        <p className="text-gray-600 text-sm leading-relaxed">
          {property.descripcion}
        </p>
      </div>

      {/* Commission Information Section - Only visible if not hideData */}
      {!hideData &&
        property.operaciones_propiedad?.some(
          (op) => op.comision_tipo || op.comparte_comision,
        ) && (
          <div className="py-1 mt-2 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CircleDollarSign className="w-5 h-5 text-primary" />
              Comisiones y Operación
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {property.operaciones_propiedad.map((op) => {
                const hasCommission =
                  op.comision_tipo &&
                  (op.comision_porcentaje || op.comision_monto_fijo);
                const hasShared = op.comparte_comision;

                if (!hasCommission && !hasShared) return null;

                return (
                  <div
                    key={op.id}
                    className="bg-blue-400/30 backdrop-blur-sm p-2 rounded-2xl border border-blue-400 hover:bg-blue-500/20 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-1 rounded-full text-sm font-bold uppercase tracking-wider text-blue-900`}
                      >
                        {op.tipo_operacion === "renta" ? "Renta" : "Venta"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                      {hasCommission && (
                        <div className="flex justify-between items-center p-1">
                          <span className="text-sm text-blue-500 font-medium">
                            Comisión
                          </span>
                          <span className="text-sm font-bold text-blue-900">
                            {op.comision_tipo === "porcentaje" ||
                            op.comision_tipo === "mixto"
                              ? `${op.comision_porcentaje}%`
                              : `$${op.comision_monto_fijo?.toLocaleString()}`}
                          </span>
                        </div>
                      )}

                      {hasShared && (
                        <div className="flex justify-between items-center p-1">
                          <span className="text-sm text-blue-500 font-medium">
                            Comparte
                          </span>
                          <span className="text-sm font-bold text-blue-900">
                            {op.porcentaje_comision_compartida
                              ? `${op.porcentaje_comision_compartida}%`
                              : op.monto_comision_compartida
                                ? `$${op.monto_comision_compartida.toLocaleString()}`
                                : "Sí"}
                          </span>
                        </div>
                      )}
                    </div>

                    {op.condiciones_comision_compartida && (
                      <div className="mt-3 pt-2 border-t border-gray-100">
                        <p className="text-[11px] text-gray-400 leading-relaxed">
                          <span className="font-bold uppercase text-[9px] mr-1">
                            Condiciones:
                          </span>
                          {op.condiciones_comision_compartida}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      {property.latitud && property.longitud && (
        <div className="py-4 flex justify-center gap-5">
          {/* <a
            href="https://ilyrox.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-1 bg-primary hover:bg-primary/80 text-white rounded-2xl font-bold text-sm transition-all shadow-lg hover:shadow-cyan-500/30 active:scale-95 group hover:scale-105"
          >
            Ver más
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a> */}
          <a
            href={`https://www.google.com/maps?q=${property.latitud},${property.longitud}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-fit px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl text-sm font-semibold transition-all border border-gray-100 mt-1 duration-300 hover:scale-105"
          >
            <MapPin className="w-6 h-6 text-primary" />
            <span className="font-semibold text-md text-primary">
              Ver en Google Maps
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
