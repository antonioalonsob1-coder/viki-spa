// Marca de la empresa: recorte real del monograma VC del logo original (sin la
// marca de agua de Gemini, que quedaba fuera de este recuadro). Un solo lugar
// para actualizar el ícono en Navbar, Footer y el panel admin.
export default function Logo({
  variant = 'onCream',
  size = 34,
}: {
  variant?: 'onCream' | 'onDark'
  size?: number
}) {
  return (
    <img
      src="/logo-monogram.png"
      alt="Viki SpA"
      width={size}
      height={size}
      className={`rounded-sm object-cover ${variant === 'onDark' ? 'ring-1 ring-gold/50' : ''}`}
      style={{ width: size, height: size }}
    />
  )
}
