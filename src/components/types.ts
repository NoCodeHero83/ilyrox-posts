export type Property = {
  id: string;
  code?: string;
  title: string;
  descripcion?: string;
  created_at?: string;
  created_by?: perfiles;
  operaciones_propiedad: operaciones_propiedad[];
  codigo_propiedad?: string;
  metros_cuadrados_construccion?: number;
  metros_cuadrados_terreno?: number;
  habitaciones?: number;
  banos?: number;
  estacionamientos?: number;
  location: {
    address: string;
    country: string;
    state: string;
    city: string;
    municipio?: string;
    colony: string;
    zip?: string;
  };
  coordinates?: { lat: number; lng: number };
  fotos: string[];
  features: {
    beds: number;
    baths: number;
    halfBaths?: number;
    parking?: number;
    floors?: number;
    floorLevel?: number;
    constructionSqft: number;
    landSqft: number;
    yearBuilt?: number;
    maintenanceFee?: number;
  };
  amenities: string[];
  propiedades_amenidades?: {
    id: string;
    propiedad_id: string;
    amenidad_id: string;
    catalogo_amenidades: catalogo_amenidades;
  }[];
  type: PropertyType;
  tipo: string;
  calle: string;
  numero_exterior: string;
  colonia: string;
  municipio: string;
  estado: string;
  subtype: string;
  operation: "Sale" | "Rent";
  status: "Publicada" | "Suspendida" | "Rentada" | "Reservada" | "Vendida";
  commission?: CommissionDetails;
  legal?: LegalDetails;
  longitud?: string;
  latitud?: string;
  subtipo?: string;
  pisos?: number;
  // Características físicas adicionales
  medios_banos?: number;
  ancho_terreno?: number;
  largo_terreno?: number;
  // Comercial
  tipo_ubicacion_comercial?: string;
  nivel_piso?: number;
  sobre_avenida_principal?: boolean;
  en_esquina?: boolean;
  alta_visibilidad?: boolean;
  alto_flujo_vehicular?: boolean;
  // Industrial
  ubicacion_industrial?: string;
  altura_libre_m?: string;
  area_oficinas_m2?: number;
  patio_maniobras_m2?: number;
  tipo_energia_kva?: string[];
  // Agrícola
  uso_terreno?: string[];
  tipo_riego?: string[];
  tipo_agua?: string[];
  concesion_agua?: boolean;
  infra_electricidad?: boolean;
  infra_camino_acceso?: boolean;
  infra_cercado?: boolean;
  acceso_carretera?: boolean;
  acceso_camiones?: boolean;
};

export type operaciones_propiedad = {
  id: string;
  propiedad_id: string;
  tipo_operacion: "venta" | "renta";
  precio: number;
  moneda: "MXN" | "USD";
  periodo_renta?: string;
  comision_tipo?: "porcentaje" | "monto_fijo" | "mixto";
  comision_porcentaje?: number;
  comision_monto_fijo?: number;
  comparte_comision?: boolean;
  porcentaje_comision_compartida?: number;
  monto_comision_compartida?: number;
  condiciones_comision_compartida?: string;
  activa: boolean;
  vigente_desde: string;
  vigente_hasta: string;
};

export type CommissionDetails = {
  shared: boolean;
  percentage?: number;
  condition?: string;
};

export type LegalDetails = {
  hasEncumbrance: boolean;
  institution?: string;
};

export type PropertyType =
  | "habitacional"
  | "comercial"
  | "industrial"
  | "agricola";

export type FeedItem = {
  id: string;
  type: "post" | "reel" | "property";
  user: User;
  content: string;
  images?: string[];
  videoUrl?: string;
  propertyDetails?: Property;
  postDetails?: Post;
  reelDetails?: Reel;
  likes: number;
  comments: number;
  commentsList?: Comment[];
  timestamp: string;
  status?: "Publicada" | "Suspendida" | "Rentada" | "Reservada" | "Vendida";
  codigo_propiedad?: string;
  postType?: "post" | "busqueda" | "openhouse" | "aniversario" | "sold";
  foto_perfil_usuario?: string;
  fecha_hora?: string;
  nombre_asesor?: string;
  ubicacion?: string;
  foto_propiedad?: string;
  antiguedad?: number;
  busquedas_json?: any;
};

export type Reel = {
  id: string;
  publicado_por: string;
  video_url: string;
  thumbnail_url: string | null;
  descripcion: string | null;
  duracion_segundos: number | null;
  status?: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type User = {
  id: string;
  nombre?: string;
  name?: string;
  avatar: string;
  isFollowing: boolean;
  role: "Agente" | "Cliente" | "Admin" | "Agent" | "User";
  rating?: number;
  totalRatings?: number;
  positiveRecommendations?: number;
  negativeRecommendations?: number;
  recommendedByPreview?: RecommendedByPreviewUser[];
  location?: string;
  phone?: string;
  aprobaciones_recibidas?: number;
  aprobaciones_requeridas?: number;
};

export type RecommendedByPreviewUser = {
  id: string;
  name: string;
  avatar?: string | null;
};

export type Post = {
  id: string;
  publicado_por: string;
  contenido: string | null;
  imagenes: string[] | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  status?: "Publicada" | "Suspendida" | "Rentada" | "Reservada" | "Vendida";
  tipo?: "post" | "busqueda" | "openhouse" | "aniversario" | "sold";
  foto_perfil_usuario?: string;
  fecha_hora?: string;
  fecha_finalizacion?: string;
  nombre_asesor?: string;
  ubicacion?: string;
  foto_propiedad?: string;
  antiguedad?: number;
  busquedas_json?: any;
  perfiles?: perfiles;
};

export type perfiles = {
  id: string;
  nombre: string;
  nombre_completo?: string;
  rol: "admin" | "agente" | "cliente";
  apellido_materno: string;
  apellido_paterno: string;
  celular?: string;
  pais: string;
  estado: string;
  ciudad?: string;
  municipio?: string;
  colonia?: string;
  email: string;
  foto: string;
  estado_registro: string;
  aprobaciones_recibidas: number;
  aprobaciones_requeridas: number;
  prefijo_celular?: string;
  biografia?: string;
  sitio_web?: string;
  anos_experiencia?: string;
  ocupacion?: string;
  otro_ocupacion?: string;
  modalidad?: string;
  nombre_inmobiliaria?: string;
  curso_certificacion?: string;
  activado_en?: string;
  deleted_at?: string;
  calificacion_promedio?: string;
  total_calificaciones?: string;
  total_recomendaciones_positivas?: string;
  total_recomendaciones_negativas?: string;
};

export type propiedades_amenidades = {
  id: string;
  propiedad_id: string;
  amenidad_id: string;
};

export type catalogo_amenidades = {
  id: string;
  nombre: string;
  icono: string;
  categoria: string;
  activo: boolean;
};
