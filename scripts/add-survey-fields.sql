-- Agregar nuevos campos a la tabla leads_eventos
ALTER TABLE leads_eventos ADD COLUMN IF NOT EXISTS age_range TEXT;
ALTER TABLE leads_eventos ADD COLUMN IF NOT EXISTS gender TEXT;
ALTER TABLE leads_eventos ADD COLUMN IF NOT EXISTS capital_amount TEXT;
ALTER TABLE leads_eventos ADD COLUMN IF NOT EXISTS video_id TEXT;
ALTER TABLE leads_eventos ADD COLUMN IF NOT EXISTS respuesta_fecha TIMESTAMP WITH TIME ZONE;

-- Crear índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_leads_age_range ON leads_eventos(age_range);
CREATE INDEX IF NOT EXISTS idx_leads_gender ON leads_eventos(gender);
CREATE INDEX IF NOT EXISTS idx_leads_capital_amount ON leads_eventos(capital_amount);
CREATE INDEX IF NOT EXISTS idx_leads_video_id ON leads_eventos(video_id);

-- Comentarios para documentación
COMMENT ON COLUMN leads_eventos.age_range IS 'Rango de edad del usuario (menor_25, 25_34, 35_44, 45_54, 55_64, mayor_65)';
COMMENT ON COLUMN leads_eventos.gender IS 'Género del usuario (hombre, mujer)';
COMMENT ON COLUMN leads_eventos.capital_amount IS 'Capital disponible (si, no_pero_podria, no)';
COMMENT ON COLUMN leads_eventos.video_id IS 'ID del video mostrado en la página de gracias';
COMMENT ON COLUMN leads_eventos.respuesta_fecha IS 'Fecha y hora de la respuesta a la encuesta';
