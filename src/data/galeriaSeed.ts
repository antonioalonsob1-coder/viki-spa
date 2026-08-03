export type CategoriaGaleria = 'Hogar & Cortinaje' | 'Licenciaturas & Colegios'

export interface FotoGaleria {
  id: string
  categoria: CategoriaGaleria
  titulo: string
  src: string
  fecha: string
  seed?: boolean
}

function placeholder(bg1: string, bg2: string, label: string): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='480'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='${bg1}'/>
        <stop offset='1' stop-color='${bg2}'/>
      </linearGradient>
    </defs>
    <rect width='640' height='480' fill='url(#g)'/>
    <text x='50%' y='52%' font-family='Georgia, serif' font-size='30' fill='#F8F5EE' text-anchor='middle' opacity='0.85'>${label}</text>
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export const galeriaSeed: FotoGaleria[] = [
  { id: 'g1', categoria: 'Hogar & Cortinaje', titulo: 'Cortinaje blackout — Vitacura', src: placeholder('#0B3D2E', '#155C45', 'Cortinaje · Living'), fecha: '2026-03-12', seed: true },
  { id: 'g2', categoria: 'Hogar & Cortinaje', titulo: 'Tapicería velvet a medida', src: placeholder('#062A20', '#0B3D2E', 'Tapicería · Velvet'), fecha: '2026-04-02', seed: true },
  { id: 'g3', categoria: 'Hogar & Cortinaje', titulo: 'Visillos de lino — La Reina', src: placeholder('#C7A445', '#E8DCB8', 'Visillos · Lino'), fecha: '2026-04-20', seed: true },
  { id: 'g4', categoria: 'Licenciaturas & Colegios', titulo: 'Estolas bordadas — Colegio San Ignacio', src: placeholder('#9C7E2E', '#C7A445', 'Estolas · Bordado'), fecha: '2026-05-05', seed: true },
  { id: 'g5', categoria: 'Licenciaturas & Colegios', titulo: 'Telón de fondo — Liceo Bicentenario', src: placeholder('#0B3D2E', '#062A20', 'Telón · Escenario'), fecha: '2026-05-18', seed: true },
  { id: 'g6', categoria: 'Licenciaturas & Colegios', titulo: 'Montaje de pasarela y encarpado', src: placeholder('#26231D', '#0B3D2E', 'Montaje · Pasarela'), fecha: '2026-06-01', seed: true },
]
