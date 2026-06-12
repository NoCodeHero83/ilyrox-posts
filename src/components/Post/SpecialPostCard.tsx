import { Search, MapPin } from "lucide-react";
import type { Post } from "../types";
import Avatar from "../Shared/Avatar";
import { ImageCarousel } from "../Shared/ImageCarousel";
import { formatPrice } from "../../utils/priceFormatter";
import firstUpperCase from "../../utils/firstUpperCase";

interface SpecialPostCardProps {
  post: Post;
  mode?: "preview" | "detail" | "grid";
  onUserClick?: () => void;
  onOfferClick?: () => void;
}

const SPECIAL_COLORS = {
  aniversario: "#74b5c3", // Azul claro tipo 'Celebración'
  openhouse: "#6A1B9A", // Morado oscuro
  sold: "#D32F2F", // Rojo para vendido
  textWhite: "#FFFFFF",
};

export const SpecialPostCard = ({
  post,
  mode = "preview",
  onUserClick,
  onOfferClick,
}: SpecialPostCardProps) => {
  const postType = post.tipo
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");

  const allImages =
    post.imagenes || (post.foto_propiedad ? [post.foto_propiedad] : []);

  // Datos variables
  const userName =
    post.perfiles?.nombre && post.perfiles?.apellido_paterno
      ? `${post.perfiles.nombre} ${post.perfiles.apellido_paterno}`
      : post.perfiles?.nombre_completo ||
        post.nombre_asesor ||
        post.publicado_por ||
        "Usuario";
  const userLocation =
    (post.perfiles?.ciudad &&
      post.perfiles?.estado &&
      `${post.perfiles.ciudad}, ${post.perfiles.estado}`) ||
    post.ubicacion ||
    "Ubicación pendiente";
  const eventDate = post.fecha_hora || "Próximamente";
  const eventEndDate = post.fecha_finalizacion || "Próximamente";
  const years = post.antiguedad || 1;
  const userAvatar = post.foto_perfil_usuario;

  // --- RENDER: ANIVERSARIO ---
  if (postType === "aniversario") {
    return (
      <div
        className="w-full relative overflow-hidden flex flex-col items-center justify-center py-8 rounded-4xl shadow-sm"
        style={{ backgroundColor: SPECIAL_COLORS.aniversario }}
      >
        {/* Decoración superior */}
        <div className="p-2 text-center z-10">
          <h2 className="text-white font-bold text-xl md:text-2xl text-center px-4 drop-shadow-md">
            🎉 ¡Hoy celebro {years} años en el mundo inmobiliario! 🎉
          </h2>
        </div>

        {/* Avatar Central con efecto 'burst' */}
        <div
          className="my-6 relative z-10 cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={onUserClick}
        >
          <div className="p-2 rounded-full border-2 border-white border-dashed bg-white/20 backdrop-blur-sm">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden shadow-xl">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold text-4xl">
                  userName
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Inferior */}
        <div className="p-4 text-center z-10">
          <p className="text-[#6A1B9A] font-bold text-sm uppercase tracking-wider mb-1">
            Asesor Inmobiliario
          </p>
          <h3 className="text-[#6A1B9A] font-black text-2xl md:text-3xl mb-1">
            {userName}
          </h3>
          <p className="text-[#6A1B9A] font-medium text-sm md:text-base">
            {userLocation}
          </p>
        </div>

        {/* Background Overlay */}
        <div className="absolute inset-0 bg-white/5 pointer-events-none" />
      </div>
    );
  }

  // --- RENDER: OPEN HOUSE y SOLD ---
  if (postType === "openhouse" || postType === "sold") {
    const isSold =
      post.status?.toLowerCase() === "vendida" ||
      post.status?.toLowerCase() === "sold";

    const mainColor = isSold ? SPECIAL_COLORS.sold : SPECIAL_COLORS.openhouse;
    const bannerText = isSold ? "VENDIDO" : "OPEN HOUSE";

    return (
      <div className="w-lvh bg-white rounded-4xl overflow-hidden shadow-sm border border-gray-100">
        {/* Imagen Principal */}
        {allImages.length > 0 ? (
          <ImageCarousel
            images={allImages}
            alt="Propiedad"
            aspectClassName="h-64 md:h-80"
          />
        ) : (
          <div className="w-full h-64 md:h-80 flex items-center justify-center bg-gray-200 text-gray-400">
            No Image
          </div>
        )}

        {/* Banner Central */}
        <div
          className="relative -mt-6 z-10 flex justify-center items-center py-3 pl-20 shadow-lg"
          style={{ backgroundColor: mainColor }}
        >
          <h2
            className={`text-white font-black text-2xl md:text-3xl tracking-widest uppercase ${isSold ? "bg-[#D32F2F] border-2 border-white px-4 py-1 rounded-lg" : ""}`}
          >
            {bannerText}
          </h2>
        </div>

        {/* Footer Info */}
        <div
          className="flex flex-row pb-6 px-6 pt-4 min-h-[140px]"
          style={{ backgroundColor: mainColor }}
        >
          {/* Avatar sobrepuesto (Left) */}
          <div
            className="relative -mt-16 mr-4 z-20 shrink-0 cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={onUserClick}
          >
            <div className="w-24 h-24 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Avatar name={userName} size={90} />
              )}
            </div>
          </div>

          {/* Textos (Right) */}
          <div className="flex-1 flex flex-col justify-center text-white pt-2">
            <h3 className="font-bold text-lg text-center mb-1">
              {isSold ? "¡PROPIEDAD VENDIDA!" : "----- UNETENOS -----"}
            </h3>

            {!isSold && (
              <>
                {post.fecha_hora && (
                  <p className="text-white/90 font-bold text-base text-center mb-2">
                    Inicia:{" "}
                    {new Date(eventDate).toLocaleString("es-ES", {
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
                {post.fecha_finalizacion && (
                  <p className="text-white/90 font-bold text-base text-center mb-2">
                    Finaliza:{" "}
                    {new Date(eventEndDate).toLocaleString("es-ES", {
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </>
            )}

            <div className="flex items-center justify-center gap-1 opacity-90">
              <MapPin className="w-3 h-3 md:w-4 md:h-4 text-white" />
              <p className="text-xs md:text-sm text-center line-clamp-2">
                {userLocation}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: BUSQUEDA ---
  if (postType === "busqueda" && post.busquedas_json) {
    const { busquedas_json } = post;
    const isDetail = mode === "detail";
    const f = busquedas_json.filtros ?? {};

    // Operación (venta/renta), puede venir vacía
    const operacion: string =
      typeof f.operacion === "string" ? f.operacion.toLowerCase() : "";

    // Título grande: subtipo principal o tipo_propiedad
    const subtipoArr: string[] = Array.isArray(f.subtipo) ? f.subtipo : [];
    const rawTipo = subtipoArr[0] || f.tipo_propiedad || "Propiedad";
    const titulo = firstUpperCase(rawTipo);

    // Presupuesto formateado
    const moneda = f.moneda || "MXN";
    const precioMin =
      typeof f.precio_min === "number" && f.precio_min > 0 ? f.precio_min : null;
    const precioMax =
      typeof f.precio_max === "number" && f.precio_max > 0 ? f.precio_max : null;
    let presupuestoText = "Sin especificar";
    if (precioMin && precioMax) {
      presupuestoText = `${formatPrice(precioMin)} – ${formatPrice(precioMax)} ${moneda}`;
    } else if (precioMin) {
      presupuestoText = `Desde ${formatPrice(precioMin)} ${moneda}`;
    } else if (precioMax) {
      presupuestoText = `Hasta ${formatPrice(precioMax)} ${moneda}`;
    }

    // Zonas (chips)
    const zonas: Array<{ id?: string; label: string }> = Array.isArray(
      f.zonas_interes,
    )
      ? f.zonas_interes
      : [];

    // Ubicaciones multi-nivel (nuevo schema): un chip por entrada con su label
    const ubicacionesMulti: string[] = Array.isArray(f.ubicaciones)
      ? f.ubicaciones
          .filter(
            (u: any) => u && typeof u.label === "string" && u.label.trim(),
          )
          .map((u: any) => u.label as string)
      : [];

    // Colonias múltiples (schema anterior) o legacy (string)
    const coloniasArr: string[] = Array.isArray(f.ubicacion?.colonias)
      ? f.ubicacion.colonias.filter(
          (c: unknown) =>
            typeof c === "string" && (c as string).trim().length > 0,
        )
      : typeof f.ubicacion?.colonia === "string" && f.ubicacion.colonia.trim()
        ? [f.ubicacion.colonia]
        : [];

    // Fallback: priorizar ubicaciones multi-nivel; si no, usar datos legacy
    const ubicacionFallback: string[] = !zonas.length
      ? ubicacionesMulti.length > 0
        ? ubicacionesMulti
        : coloniasArr.length > 0
          ? [coloniasArr.join(", ")]
          : [f.ubicacion?.ciudad, f.ubicacion?.municipio, f.ubicacion?.estado]
              .filter(
                (s: unknown) =>
                  typeof s === "string" && (s as string).trim().length > 0,
              )
              .slice(0, 1)
      : [];

    const habitaciones = f.caracteristicas?.habitaciones;
    const banos = f.caracteristicas?.banos;
    const nota: string = typeof f.nota === "string" ? f.nota : "";

    const handleOffer = onOfferClick ?? onUserClick;

    return (
      <div
        className={`w-full bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden ${isDetail ? "" : "max-w-md mx-auto"}`}
      >
        <div className="p-5 md:p-6">
          {/* SE BUSCA + Operación */}
          <div className="flex items-center gap-2 mb-3">
            <Search className="w-4 h-4 text-primary" />
            <span className="text-xs font-extrabold text-primary tracking-wider">
              SE BUSCA
            </span>
            {(operacion === "venta" || operacion === "renta") && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-extrabold tracking-wide">
                {operacion === "venta" ? "EN VENTA" : "EN RENTA"}
              </span>
            )}
          </div>

          {/* Título grande */}
          <h3 className="text-2xl font-extrabold text-gray-900 leading-tight mb-4">
            {titulo}
          </h3>

          {/* Presupuesto */}
          <p className="text-[11px] font-bold text-gray-400 tracking-wide uppercase mb-1">
            Presupuesto
          </p>
          <p className="text-lg font-extrabold text-gray-900 mb-4">
            {presupuestoText}
          </p>

          {/* Zonas de interés */}
          {(zonas.length > 0 || ubicacionFallback.length > 0) && (
            <>
              <p className="text-[11px] font-bold text-gray-400 tracking-wide uppercase mb-2">
                Zonas de interés
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {zonas.map((z, idx) => (
                  <span
                    key={z.id ?? `${z.label}-${idx}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm font-semibold text-gray-800"
                  >
                    <span>📍</span>
                    <span className="truncate max-w-[200px]">{z.label}</span>
                  </span>
                ))}
                {ubicacionFallback.map((label, idx) => (
                  <span
                    key={`fallback-${idx}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm font-semibold text-gray-800"
                  >
                    <span>📍</span>
                    <span className="truncate max-w-[200px]">{label}</span>
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Características */}
          {(habitaciones || banos) && (
            <div className="flex flex-row gap-6 text-sm text-gray-600">
              {habitaciones ? (
                <span>
                  🛏️ <span className="font-bold text-gray-900">{habitaciones}</span>{" "}
                  rec.
                </span>
              ) : null}
              {banos ? (
                <span>
                  🚽 <span className="font-bold text-gray-900">{banos}</span> baños
                </span>
              ) : null}
            </div>
          )}

          {/* Nota */}
          {nota.trim().length > 0 && (
            <>
              <div className="h-px bg-gray-100 my-4" />
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-bold text-gray-900">Nota: </span>
                {nota}
              </p>
            </>
          )}
        </div>

        {/* CTA Ofrecer propiedad */}
        <div className="px-5 md:px-6 pb-5 md:pb-6">
          <button
            type="button"
            onClick={handleOffer}
            className="w-full py-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 active:scale-[0.99] transition-all"
          >
            Ofrecer propiedad 👋
          </button>
        </div>
      </div>
    );
  }

  // --- RENDER: TEXT ONLY (NO IMAGES, TYPE POST) ---
  const isTextOnly =
    (!post.imagenes || post.imagenes.length === 0) &&
    (!postType || postType === "post");

  if (isTextOnly) {
    return (
      <div className="flex flex-col bg-white rounded-3xl p-6 border border-gray-100 shadow-sm max-w-lg mx-auto w-full">
        {/* Header */}
        <div
          className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-gray-50 p-2 -m-2 rounded-2xl transition-colors group"
          onClick={onUserClick}
        >
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden group-hover:scale-105 transition-transform duration-300">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt="User"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#0891b2]/20 flex items-center justify-center text-[#0891b2] font-bold">
                U
              </div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 group-hover:text-[#0891b2] transition-colors">
              {userName}
            </h3>
            <p className="text-xs text-gray-500">
              {post.created_at
                ? new Date(post.created_at).toLocaleDateString()
                : "Reciente"}
            </p>
          </div>
        </div>

        {/* Text as Image-like Block */}
        <div className="w-full aspect-square rounded-2xl bg-[#0891b2] flex items-center justify-center p-8 md:p-12 text-center shadow-lg relative overflow-hidden group/text">
          <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent pointer-events-none" />
          <p className="text-white font-extrabold text-2xl md:text-3xl lg:text-4xl leading-snug whitespace-pre-wrap drop-shadow-lg relative z-10 transition-transform duration-500 group-hover/text:scale-105">
            {post.contenido}
          </p>
        </div>
      </div>
    );
  }

  // --- DEFAULT RENDER (STANDARD POST) ---
  return (
    <div className="flex flex-col bg-white rounded-3xl p-6 border border-gray-100 shadow-sm max-w-lg mx-auto w-full">
      {/* Header */}
      <div
        className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-gray-50 p-2 -m-2 rounded-2xl transition-colors group"
        onClick={onUserClick}
      >
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden group-hover:scale-105 transition-transform duration-300">
          {userAvatar ? (
            <img
              src={userAvatar}
              alt="User"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#0891b2]/20 flex items-center justify-center text-[#0891b2] font-bold">
              U
            </div>
          )}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 group-hover:text-[#0891b2] transition-colors">
            {userName}
          </h3>
          <p className="text-xs text-gray-500">
            {post.created_at
              ? new Date(post.created_at).toLocaleDateString()
              : "Reciente"}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
          {post.contenido}
        </p>
      </div>

      {/* Media */}
      {allImages.length > 0 && (
        <div className="rounded-2xl overflow-hidden mb-4 border border-gray-100">
          <ImageCarousel
            images={allImages}
            alt="Contenido del post"
            aspectClassName="aspect-square"
            showCounter
          />
        </div>
      )}
    </div>
  );
};
