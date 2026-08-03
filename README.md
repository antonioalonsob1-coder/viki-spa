# Viki SpA · Diseño y Decoración de Interiores

Sitio web de producción para Viki SpA: confección textil a medida para el hogar y decoración
institucional para licenciaturas y colegios.

## Stack

- **Frontend:** React 18 + Vite + TypeScript + Tailwind CSS + Lucide Icons
- **Backend:** Cloudflare Pages Functions + Cloudflare D1 (base de datos SQLite) + Cloudflare R2
  (almacenamiento de las fotos de la galería)
- **Hosting:** Cloudflare Pages, con CI/CD desde GitHub

El contenido editable desde `/admin` (contacto, telas, testimonios, galería) y las cotizaciones del
formulario público se guardan en D1 (y las fotos en R2), visibles para todos los visitantes desde
cualquier dispositivo. El formulario de cotización sigue abriendo WhatsApp además de guardar el
registro.

## Panel administrador (`/admin`)

En `http://localhost:8788/admin` en desarrollo (ver [Backend: Cloudflare D1 + R2](#backend-cloudflare-d1--r2)),
o `tu-dominio.com/admin` una vez desplegado, hay un panel para editar, sin tocar código:

- **Contacto:** teléfono, WhatsApp, email, ubicación, horario, Instagram.
- **Muestrario de telas:** agregar, editar o quitar telas (para reflejar nuevo stock).
- **Galería:** subir o borrar fotos de proyectos (se guardan en Cloudflare R2).
- **Testimonios:** agregar, editar o quitar reseñas.
- **Cotizaciones:** ver las cotizaciones recibidas desde el formulario público.
- **Ajustes:** cambiar la contraseña del panel.

**Contraseña por defecto:** `vikispa2026` — cámbiala desde "Ajustes" apenas entres por primera vez.

El login valida la contraseña en el servidor (hash guardado en D1) y emite una sesión con cookie
firmada `HttpOnly`; los cambios hechos por cualquier administrador se ven de inmediato para todos
los visitantes del sitio.

## Desarrollo local

```bash
npm install
npm run dev          # frontend con HMR en http://localhost:5173 (sin /api)
```

Para trabajar con el backend (D1/R2/admin) en local:

```bash
npm run dev:api       # build + http://localhost:8788 — sitio + Functions + D1/R2 locales
```

`dev:api` reconstruye el frontend antes de levantar el servidor (sin HMR) porque Cloudflare Pages
Functions sirve el sitio junto con `/api/*` desde el mismo build de producción — vuelve a correrlo
después de cada cambio para verlo reflejado.

La primera vez, aplica el esquema y los datos por defecto a la base local:

```bash
npm run db:apply:local
```

## Build de producción

```bash
npm run build
npm run preview   # sirve dist/ localmente para verificar (sin backend)
```

## Estructura

```
src/
  components/     Navbar, Hero, secciones de servicios, galería, formulario, footer
  data/           Valores por defecto: telas, testimonios, config del sitio, semilla de galería
  hooks/          useSiteContent, useAdminAuth, useGallery, useCotizaciones — hooks respaldados por la API
  admin/          Panel /admin: login + editores de contacto, telas, galería, testimonios y cotizaciones
functions/
  api/            Cloudflare Pages Functions: rutas de la API (contacto, telas, testimonios, galería,
                  cotizaciones, admin/login|logout|session|change-password)
  api/_lib/       Helpers compartidos: mapeo D1 ↔ TS, respuestas JSON, hashing y sesión de admin
d1/
  schema.sql      Esquema de la base D1 (SQLite)
  seed.sql        Datos iniciales (iguales a los valores por defecto de src/data/*.ts)
```

## Valores por defecto (editables también desde `/admin`)

- **Datos de contacto y WhatsApp:** [`src/data/config.ts`](src/data/config.ts)
- **Muestrario de telas:** [`src/data/telas.ts`](src/data/telas.ts)
- **Testimonios:** [`src/data/testimonios.ts`](src/data/testimonios.ts)
- **Fotos de ejemplo de la galería:** [`src/data/galeriaSeed.ts`](src/data/galeriaSeed.ts)
- **Dossier de licenciaturas (PDF):** reemplazar
  [`public/dossier-licenciaturas-2026.pdf`](public/dossier-licenciaturas-2026.pdf) por el PDF real
  cuando esté listo (mismo nombre de archivo).

Estos archivos son el punto de partida cuando la base D1 está vacía (`npm run db:apply:local`/`:remote`
inserta estos mismos valores como fila inicial) y siguen usándose como respaldo instantáneo en el
primer render del sitio mientras se resuelve el primer fetch a la API.

## Backend: Cloudflare D1 + R2

El proyecto ya está configurado (bindings en [`wrangler.toml`](wrangler.toml)):

- **D1** (`binding = "DB"`, base `viki-spa-db`): contacto, telas, testimonios, metadatos de galería y
  cotizaciones. Esquema en [`d1/schema.sql`](d1/schema.sql), datos iniciales en [`d1/seed.sql`](d1/seed.sql).
- **R2** (`binding = "GALERIA_BUCKET"`, bucket `viki-spa-galeria`): las fotos que se suben desde
  `/admin`.
- **Secret `SESSION_SECRET`**: clave para firmar la cookie de sesión del panel admin. Se define así
  (no va en `.env` ni en el repo):
  ```bash
  npx wrangler pages secret put SESSION_SECRET --project-name=viki-spa
  ```

Para levantar todo desde cero en otra cuenta de Cloudflare:

```bash
npx wrangler d1 create viki-spa-db          # copiar el database_id resultante a wrangler.toml
npx wrangler r2 bucket create viki-spa-galeria
npx wrangler pages secret put SESSION_SECRET --project-name=viki-spa
npm run db:apply:remote                     # aplica d1/schema.sql (el seed se aplica igual, con --file=./d1/seed.sql)
```

## Deploy en Cloudflare Pages

**Opción A — Git (recomendada):**
1. Sube el repo a GitHub.
2. En el dashboard de Cloudflare Pages, "Create a project" → conectar el repositorio.
3. Build command: `npm run build` · Build output directory: `dist`.
4. Los bindings de D1/R2 se leen automáticamente de `wrangler.toml` en cada deploy.

**Opción B — CLI:**
```bash
npm run build
npx wrangler pages deploy dist --project-name=viki-spa
```

## Licencia

Uso privado — Viki SpA.
