-- Migración: Separar fecha_hora en dos columnas (fecha y hora)
-- Ejecutar este script para actualizar la tabla existente

-- Agregar nuevas columnas fecha y hora
ALTER TABLE leads_eventos 
ADD COLUMN IF NOT EXISTS fecha VARCHAR(20),
ADD COLUMN IF NOT EXISTS hora VARCHAR(20);

-- Si existían datos con fecha_hora, migrarlos a las nuevas columnas
-- (Esto es opcional, solo si ya tenías datos)
UPDATE leads_eventos 
SET 
  fecha = TO_CHAR(fecha_hora, 'DD/MM/YYYY'),
  hora = TO_CHAR(fecha_hora, 'HH24:MI:SS')
WHERE fecha_hora IS NOT NULL AND fecha IS NULL;

-- Opcional: eliminar la columna fecha_hora vieja después de migrar
-- ALTER TABLE leads_eventos DROP COLUMN IF EXISTS fecha_hora;
