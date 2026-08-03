export interface Env {
  DB: D1Database
  GALERIA_BUCKET: R2Bucket
  SESSION_SECRET: string
}

export interface ContactoDTO {
  nombre: string
  eslogan: string
  telefonoDisplay: string
  whatsappNumber: string
  email: string
  direccion: string
  horario: string
  instagram: string
}

interface ContactoRow {
  nombre: string
  eslogan: string
  telefono_display: string
  whatsapp_number: string
  email: string
  direccion: string
  horario: string
  instagram: string
}

export function mapContacto(row: ContactoRow): ContactoDTO {
  return {
    nombre: row.nombre,
    eslogan: row.eslogan,
    telefonoDisplay: row.telefono_display,
    whatsappNumber: row.whatsapp_number,
    email: row.email,
    direccion: row.direccion,
    horario: row.horario,
    instagram: row.instagram,
  }
}

export interface TelaDTO {
  id: string
  nombre: string
  categoria: 'Hogar' | 'Institucional'
  descripcion: string
  usos: string[]
  swatch: string
}

interface TelaRow {
  id: string
  nombre: string
  categoria: string
  descripcion: string
  usos: string
  swatch: string
}

export function mapTela(row: TelaRow): TelaDTO {
  return {
    id: row.id,
    nombre: row.nombre,
    categoria: row.categoria as TelaDTO['categoria'],
    descripcion: row.descripcion,
    usos: parseUsos(row.usos),
    swatch: row.swatch,
  }
}

export function parseUsos(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.map(String) : []
  } catch {
    return []
  }
}

export function serializeUsos(usos: string[]): string {
  return JSON.stringify(usos)
}

export interface TestimonioDTO {
  id: string
  nombre: string
  rol: string
  texto: string
  estrellas: number
}

export function mapTestimonio(row: TestimonioDTO): TestimonioDTO {
  return {
    id: row.id,
    nombre: row.nombre,
    rol: row.rol,
    texto: row.texto,
    estrellas: Number(row.estrellas),
  }
}

export interface FotoGaleriaDTO {
  id: string
  categoria: 'Hogar & Cortinaje' | 'Licenciaturas & Colegios'
  titulo: string
  src: string
  fecha: string
}

interface GaleriaFotoRow {
  id: string
  categoria: string
  titulo: string
  fecha: string
}

export function mapGaleriaFoto(row: GaleriaFotoRow): FotoGaleriaDTO {
  return {
    id: row.id,
    categoria: row.categoria as FotoGaleriaDTO['categoria'],
    titulo: row.titulo,
    fecha: row.fecha,
    src: `/api/galeria/imagen/${row.id}`,
  }
}

export interface CotizacionDTO {
  id: string
  nombre: string
  contacto: string
  tipoServicio: 'HOGAR' | 'COLEGIO_LICENCIATURA'
  espacioOProducto: string | null
  colegioONivel: string | null
  fechaCeremonia: string | null
  mensaje: string | null
  estado: string
  createdAt: string
}

interface CotizacionRow {
  id: string
  nombre: string
  contacto: string
  tipo_servicio: string
  espacio_o_producto: string | null
  colegio_o_nivel: string | null
  fecha_ceremonia: string | null
  mensaje: string | null
  estado: string
  created_at: string
}

export function mapCotizacion(row: CotizacionRow): CotizacionDTO {
  return {
    id: row.id,
    nombre: row.nombre,
    contacto: row.contacto,
    tipoServicio: row.tipo_servicio as CotizacionDTO['tipoServicio'],
    espacioOProducto: row.espacio_o_producto,
    colegioONivel: row.colegio_o_nivel,
    fechaCeremonia: row.fecha_ceremonia,
    mensaje: row.mensaje,
    estado: row.estado,
    createdAt: row.created_at,
  }
}

export function nowIso(): string {
  return new Date().toISOString()
}
