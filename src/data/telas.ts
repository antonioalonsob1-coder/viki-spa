export type CategoriaTela = 'Hogar' | 'Institucional'

export interface Tela {
  id: string
  nombre: string
  categoria: CategoriaTela
  descripcion: string
  usos: string[]
  swatch: string // gradiente CSS que simula la textura
}

export const telas: Tela[] = [
  {
    id: 'lino',
    nombre: 'Lino Natural',
    categoria: 'Hogar',
    descripcion: 'Fibra noble de caída suave y textura visible. Aporta luz y calidez a cortinajes y visillos.',
    usos: ['Visillos', 'Cortinas de living', 'Cojines'],
    swatch: 'repeating-linear-gradient(45deg,#EDE4CE 0 2px,#E4D8B9 2px 4px)',
  },
  {
    id: 'velvet',
    nombre: 'Terciopelo / Velvet',
    categoria: 'Hogar',
    descripcion: 'Tacto profundo y brillo cambiante según la luz. Ideal para cojines y fundas de alto impacto.',
    usos: ['Fundas de sillas', 'Cojines decorativos', 'Cortinas de living'],
    swatch: 'linear-gradient(135deg,#0B3D2E,#155C45 45%,#0B3D2E)',
  },
  {
    id: 'blackout',
    nombre: 'Blackout Térmico',
    categoria: 'Hogar',
    descripcion: 'Bloqueo total de luz y aislación térmica. La solución técnica para dormitorios y home cinema.',
    usos: ['Cortinas roller', 'Dormitorios', 'Salas de proyección'],
    swatch: 'linear-gradient(135deg,#26231D,#3A362C)',
  },
  {
    id: 'roller-screen',
    nombre: 'Screen Solar',
    categoria: 'Hogar',
    descripcion: 'Filtra la radiación UV manteniendo la vista al exterior. Confección técnica tipo roller.',
    usos: ['Cortinas roller', 'Oficinas', 'Ventanales'],
    swatch: 'repeating-linear-gradient(90deg,#D8D0BD 0 3px,#CFC5AD 3px 6px)',
  },
  {
    id: 'raso',
    nombre: 'Raso / Satén',
    categoria: 'Institucional',
    descripcion: 'Brillo elegante y caída fluida. La base clásica para estolas bordadas y capas de honor.',
    usos: ['Estolas', 'Bandas de honor', 'Capas'],
    swatch: 'linear-gradient(120deg,#C7A445,#E8DCB8 50%,#C7A445)',
  },
  {
    id: 'gabardina',
    nombre: 'Gabardina Académica',
    categoria: 'Institucional',
    descripcion: 'Tejido de peso medio con excelente caída y resistencia al uso intensivo de ceremonias.',
    usos: ['Túnicas', 'Togas', 'Birretes'],
    swatch: 'linear-gradient(135deg,#0B3D2E,#062A20)',
  },
  {
    id: 'popelina',
    nombre: 'Popelina Premium',
    categoria: 'Institucional',
    descripcion: 'Tejido plano y firme, fácil de mantener. Usado en cubre-mesas y fundas para eventos masivos.',
    usos: ['Cubre-mesas', 'Fundas de sillas', 'Telones'],
    swatch: 'repeating-linear-gradient(0deg,#FAF6EF 0 3px,#EFE7D4 3px 6px)',
  },
  {
    id: 'terciopelo-escena',
    nombre: 'Terciopelo de Escenario',
    categoria: 'Institucional',
    descripcion: 'Gran caída y opacidad para telones de fondo y pasarelas que exigen presencia escénica.',
    usos: ['Telones de fondo', 'Pasarelas', 'Escenarios'],
    swatch: 'linear-gradient(135deg,#062A20,#0B3D2E 60%,#9C7E2E)',
  },
]
