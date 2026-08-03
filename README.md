# Viki SpA · Diseño y Decoración de Interiores

Sitio web de producción para Viki SpA: confección textil a medida para el hogar y decoración
institucional para licenciaturas y colegios.

## Stack

- **Frontend:** React 18 + Vite + TypeScript + Tailwind CSS + Lucide Icons
- **Base de datos (preparado para conectar):** PostgreSQL en [Neon](https://neon.tech), esquema en
  [`prisma/schema.prisma`](prisma/schema.prisma) y su equivalente en
  [`sql/schema.sql`](sql/schema.sql)
- **Hosting:** Cloudflare Pages o Render, con CI/CD desde GitHub

El frontend funciona hoy de forma 100% estática: el formulario de cotización compone un mensaje y
abre WhatsApp, y tanto la galería como el contenido editable desde `/admin` (contacto, telas,
testimonios) se guardan en `localStorage` del navegador. El esquema de base de datos queda listo
para cuando se conecte un backend (API en Cloudflare Workers, Render o similar) que persista todo
en Neon en vez de en el navegador.

## Panel administrador (`/admin`)

En `http://localhost:5173/admin` (o `tu-dominio.com/admin` una vez desplegado) hay un panel para
editar, sin tocar código:

- **Contacto:** teléfono, WhatsApp, email, ubicación, horario, Instagram.
- **Muestrario de telas:** agregar, editar o quitar telas (para reflejar nuevo stock).
- **Galería:** subir o borrar fotos de proyectos.
- **Testimonios:** agregar, editar o quitar reseñas.
- **Ajustes:** cambiar la contraseña del panel y restablecer el contenido a los valores originales.

**Contraseña por defecto:** `vikispa2026` — cámbiala desde "Ajustes" apenas entres por primera vez.

**Importante — esto es una capa sin backend real:** el panel guarda los cambios en el
`localStorage` del navegador donde se edita. Si entras desde el mismo navegador y dominio donde
está publicado el sitio, los visitantes de ESE navegador verán los cambios, pero no se sincronizan
automáticamente hacia otros visitantes ni otros dispositivos — es un login simple del lado del
cliente, no una autenticación real de servidor. Para que el catálogo y las cotizaciones sean
visibles para todos los visitantes y se editen desde cualquier dispositivo, hay que conectar el
backend con Neon (sección siguiente) y mover esta lógica a llamadas a una API real.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Build de producción

```bash
npm run build
npm run preview   # sirve dist/ localmente para verificar
```

## Estructura

```
src/
  components/     Navbar, Hero, secciones de servicios, galería, formulario, footer
  data/           Valores por defecto: telas, testimonios, config del sitio, semilla de galería
  hooks/          useLocalGallery, useSiteContent, useAdminAuth — persistencia en localStorage
  admin/          Panel /admin: login + editores de contacto, telas, galería y testimonios
prisma/
  schema.prisma   Modelos Proyecto, GaleriaFoto, Cotizacion
sql/
  schema.sql      Mismo esquema en SQL plano para ejecutar directo en Neon
```

## Valores por defecto (editables también desde `/admin`)

- **Datos de contacto y WhatsApp:** [`src/data/config.ts`](src/data/config.ts)
- **Muestrario de telas:** [`src/data/telas.ts`](src/data/telas.ts)
- **Testimonios:** [`src/data/testimonios.ts`](src/data/testimonios.ts)
- **Fotos de ejemplo de la galería:** [`src/data/galeriaSeed.ts`](src/data/galeriaSeed.ts)
- **Dossier de licenciaturas (PDF):** reemplazar
  [`public/dossier-licenciaturas-2026.pdf`](public/dossier-licenciaturas-2026.pdf) por el PDF real
  cuando esté listo (mismo nombre de archivo).

Estos archivos son el punto de partida la primera vez que alguien visita el sitio en un navegador
nuevo. Una vez que se usa `/admin` para editar, ese navegador guarda sus propias versiones en
`localStorage` y deja de usar estos valores hasta que se pulse "Restablecer a valores originales".

## Conectar Neon Postgres (cuando se agregue backend)

1. Crea un proyecto en [neon.tech](https://neon.tech) y copia la cadena de conexión *pooled* y la
   *directa*.
2. Copia `.env.example` a `.env` y completa `DATABASE_URL` y `DIRECT_URL`.
3. Instala Prisma y aplica el esquema:

   ```bash
   npm install -D prisma
   npm install @prisma/client
   npx prisma migrate dev --name init
   ```

   O, si prefieres SQL plano, pega el contenido de `sql/schema.sql` en el SQL Editor de Neon.
4. Implementa los endpoints (por ejemplo en Cloudflare Workers o Render) para que el formulario de
   cotización y la galería escriban en `cotizaciones` y `galeria_fotos` en vez de `localStorage`.

## Deploy en Cloudflare Pages

**Opción A — Git (recomendada):**
1. Sube el repo a GitHub.
2. En el dashboard de Cloudflare Pages, "Create a project" → conectar el repositorio.
3. Build command: `npm run build` · Build output directory: `dist`.
4. Agrega las variables de entorno del `.env` si el backend ya está conectado.

**Opción B — CLI:**
```bash
npm run build
npx wrangler pages deploy dist --project-name=viki-spa
```

## Deploy en Render

1. Sube el repo a GitHub.
2. En Render, "New" → "Blueprint" y selecciona el repo (usa [`render.yaml`](render.yaml)
   automáticamente), o crea un "Static Site" manual con:
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`

## Licencia

Uso privado — Viki SpA.
