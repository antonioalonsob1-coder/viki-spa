-- Datos iniciales para una base D1 nueva, igual a los valores por defecto que hoy vienen
-- en src/data/*.ts. INSERT OR IGNORE para poder correr este archivo más de una vez sin duplicar.

INSERT OR IGNORE INTO contacto
  (id, nombre, eslogan, telefono_display, whatsapp_number, email, direccion, horario, instagram)
VALUES
  (1, 'Viki SpA', 'Diseño y Decoración de Interiores', '+56 9 7822 9188', '56978229188',
   'Contaco.vikispa@gmail.com', 'Alto Hospicio, Tarapacá',
   'Lun a Vie 9:30–18:30 · Sáb 10:00–14:00', '@vikispa.interiores');

INSERT OR IGNORE INTO telas (id, nombre, categoria, descripcion, usos, swatch) VALUES
  ('lino', 'Lino Natural', 'Hogar',
   'Fibra noble de caída suave y textura visible. Aporta luz y calidez a cortinajes y visillos.',
   '["Visillos","Cortinas de living","Cojines"]',
   'repeating-linear-gradient(45deg,#EDE4CE 0 2px,#E4D8B9 2px 4px)'),
  ('velvet', 'Terciopelo / Velvet', 'Hogar',
   'Tacto profundo y brillo cambiante según la luz. Ideal para cojines y fundas de alto impacto.',
   '["Fundas de sillas","Cojines decorativos","Cortinas de living"]',
   'linear-gradient(135deg,#0B3D2E,#155C45 45%,#0B3D2E)'),
  ('blackout', 'Blackout Térmico', 'Hogar',
   'Bloqueo total de luz y aislación térmica. La solución técnica para dormitorios y home cinema.',
   '["Cortinas roller","Dormitorios","Salas de proyección"]',
   'linear-gradient(135deg,#26231D,#3A362C)'),
  ('roller-screen', 'Screen Solar', 'Hogar',
   'Filtra la radiación UV manteniendo la vista al exterior. Confección técnica tipo roller.',
   '["Cortinas roller","Oficinas","Ventanales"]',
   'repeating-linear-gradient(90deg,#D8D0BD 0 3px,#CFC5AD 3px 6px)'),
  ('raso', 'Raso / Satén', 'Institucional',
   'Brillo elegante y caída fluida. La base clásica para estolas bordadas y capas de honor.',
   '["Estolas","Bandas de honor","Capas"]',
   'linear-gradient(120deg,#C7A445,#E8DCB8 50%,#C7A445)'),
  ('gabardina', 'Gabardina Académica', 'Institucional',
   'Tejido de peso medio con excelente caída y resistencia al uso intensivo de ceremonias.',
   '["Túnicas","Togas","Birretes"]',
   'linear-gradient(135deg,#0B3D2E,#062A20)'),
  ('popelina', 'Popelina Premium', 'Institucional',
   'Tejido plano y firme, fácil de mantener. Usado en cubre-mesas y fundas para eventos masivos.',
   '["Cubre-mesas","Fundas de sillas","Telones"]',
   'repeating-linear-gradient(0deg,#FAF6EF 0 3px,#EFE7D4 3px 6px)'),
  ('terciopelo-escena', 'Terciopelo de Escenario', 'Institucional',
   'Gran caída y opacidad para telones de fondo y pasarelas que exigen presencia escénica.',
   '["Telones de fondo","Pasarelas","Escenarios"]',
   'linear-gradient(135deg,#062A20,#0B3D2E 60%,#9C7E2E)');

INSERT OR IGNORE INTO testimonios (id, nombre, rol, texto, estrellas) VALUES
  ('t1', 'Marcela Rojas', 'Centro de Padres, Colegio San Ignacio',
   'Confeccionaron las túnicas y estolas de toda la generación 2025 en tiempo récord. La calidad del bordado y la puntualidad en la entrega fueron impecables.',
   5),
  ('t2', 'Fernanda Ibáñez', 'Cliente residencial, Vitacura',
   'El cortinaje blackout para nuestras habitaciones quedó perfecto: caída exacta y una asesoría de telas que nos ahorró varias visitas a mostrarios.',
   5),
  ('t3', 'Rodrigo Fuenzalida', 'Coordinador de Eventos, Liceo Bicentenario',
   'Montaron el telón de fondo y las fundas de sillas para la licenciatura de 400 alumnos. Todo coordinado y armado antes de lo previsto.',
   5),
  ('t4', 'Paula Contreras', 'Cliente residencial, La Reina',
   'Las fundas de sillón y los cojines a medida en velvet superaron lo que imaginábamos. Muy buena disposición para ajustar detalles en terreno.',
   4);

-- Hash PBKDF2-HMAC-SHA256 (100.000 iteraciones, salt 16 bytes, clave derivada 32 bytes, hex)
-- de la contraseña por defecto actual 'vikispa2026'. Cámbiala desde /admin apenas despliegues.
INSERT OR IGNORE INTO admin_settings (id, password_hash, password_salt) VALUES
  (1, '67cdc05dcbdfff2d281da712fb70f6d93953e283cc62aa78f37bc4e5f9680249', 'eda82ff126628db27efc5d2aa5769abd');
