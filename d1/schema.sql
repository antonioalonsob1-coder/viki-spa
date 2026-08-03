-- Esquema D1 (SQLite) para Viki SpA.
-- No hay triggers de updated_at: cada UPDATE en las Functions setea el timestamp explícitamente.

CREATE TABLE IF NOT EXISTS contacto (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  nombre TEXT NOT NULL,
  eslogan TEXT NOT NULL,
  telefono_display TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  email TEXT NOT NULL,
  direccion TEXT NOT NULL,
  horario TEXT NOT NULL,
  instagram TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS telas (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
  categoria TEXT NOT NULL CHECK (categoria IN ('Hogar', 'Institucional')),
  descripcion TEXT NOT NULL,
  usos TEXT NOT NULL, -- JSON-encoded string[]
  swatch TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX IF NOT EXISTS idx_telas_categoria ON telas(categoria);

CREATE TABLE IF NOT EXISTS testimonios (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
  rol TEXT NOT NULL,
  texto TEXT NOT NULL,
  estrellas INTEGER NOT NULL CHECK (estrellas BETWEEN 1 AND 5),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS galeria_fotos (
  id TEXT PRIMARY KEY,
  categoria TEXT NOT NULL CHECK (categoria IN ('Hogar & Cortinaje', 'Licenciaturas & Colegios')),
  titulo TEXT NOT NULL,
  r2_key TEXT NOT NULL,
  content_type TEXT NOT NULL,
  fecha TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX IF NOT EXISTS idx_galeria_categoria ON galeria_fotos(categoria);

CREATE TABLE IF NOT EXISTS cotizaciones (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
  contacto TEXT NOT NULL,
  tipo_servicio TEXT NOT NULL CHECK (tipo_servicio IN ('HOGAR', 'COLEGIO_LICENCIATURA')),
  espacio_o_producto TEXT,
  colegio_o_nivel TEXT,
  fecha_ceremonia TEXT,
  mensaje TEXT,
  estado TEXT NOT NULL DEFAULT 'NUEVA'
    CHECK (estado IN ('NUEVA', 'CONTACTADO', 'EN_NEGOCIACION', 'CERRADA', 'DESCARTADA')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX IF NOT EXISTS idx_cotizaciones_estado ON cotizaciones(estado);

CREATE TABLE IF NOT EXISTS admin_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
