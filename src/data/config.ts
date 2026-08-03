export interface Contacto {
  nombre: string
  eslogan: string
  telefonoDisplay: string
  whatsappNumber: string
  email: string
  direccion: string
  horario: string
  instagram: string
}

export const DEFAULT_CONTACTO: Contacto = {
  nombre: 'Viki SpA',
  eslogan: 'Diseño y Decoración de Interiores',
  telefonoDisplay: '+56 9 7822 9188',
  whatsappNumber: '56978229188', // sin '+', formato E.164 sin símbolos
  email: 'Contaco.vikispa@gmail.com',
  direccion: 'Alto Hospicio, Tarapacá',
  horario: 'Lun a Vie 9:30–18:30 · Sáb 10:00–14:00',
  instagram: '@vikispa.interiores',
}

/** @deprecated usa el hook useContacto() para leer los datos editables desde el panel admin */
export const SITE = DEFAULT_CONTACTO

export function waLink(mensaje: string, numero: string = DEFAULT_CONTACTO.whatsappNumber) {
  const texto = encodeURIComponent(mensaje)
  return `https://wa.me/${numero}?text=${texto}`
}
