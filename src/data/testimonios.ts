export interface Testimonio {
  id: string
  nombre: string
  rol: string
  texto: string
  estrellas: number
}

export const testimonios: Testimonio[] = [
  {
    id: 't1',
    nombre: 'Marcela Rojas',
    rol: 'Centro de Padres, Colegio San Ignacio',
    texto: 'Confeccionaron las túnicas y estolas de toda la generación 2025 en tiempo récord. La calidad del bordado y la puntualidad en la entrega fueron impecables.',
    estrellas: 5,
  },
  {
    id: 't2',
    nombre: 'Fernanda Ibáñez',
    rol: 'Cliente residencial, Vitacura',
    texto: 'El cortinaje blackout para nuestras habitaciones quedó perfecto: caída exacta y una asesoría de telas que nos ahorró varias visitas a mostrarios.',
    estrellas: 5,
  },
  {
    id: 't3',
    nombre: 'Rodrigo Fuenzalida',
    rol: 'Coordinador de Eventos, Liceo Bicentenario',
    texto: 'Montaron el telón de fondo y las fundas de sillas para la licenciatura de 400 alumnos. Todo coordinado y armado antes de lo previsto.',
    estrellas: 5,
  },
  {
    id: 't4',
    nombre: 'Paula Contreras',
    rol: 'Cliente residencial, La Reina',
    texto: 'Las fundas de sillón y los cojines a medida en velvet superaron lo que imaginábamos. Muy buena disposición para ajustar detalles en terreno.',
    estrellas: 4,
  },
]
