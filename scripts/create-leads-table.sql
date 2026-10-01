-- Create leads_eventos table for storing form submissions
CREATE TABLE IF NOT EXISTS leads_eventos (
  id SERIAL PRIMARY KEY,
  telefono VARCHAR(50) UNIQUE NOT NULL,
  pais VARCHAR(100),
  fecha_hora TIMESTAMP,
  pagina_captura VARCHAR(255),
  campana VARCHAR(255),
  anuncio VARCHAR(255),
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_term VARCHAR(255),
  respuesta TEXT,
  respuesta_fecha TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index on telefono for faster lookups
CREATE INDEX IF NOT EXISTS idx_leads_eventos_telefono ON leads_eventos(telefono);

-- Create index on created_at for date-based queries
CREATE INDEX IF NOT EXISTS idx_leads_eventos_created_at ON leads_eventos(created_at);

-- Enable Row Level Security
ALTER TABLE leads_eventos ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anon users (for the form)
CREATE POLICY "Allow insert for all" ON leads_eventos
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow updates from anon users (for response updates)
CREATE POLICY "Allow update for all" ON leads_eventos
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create policy to allow select for service role
CREATE POLICY "Allow select for service role" ON leads_eventos
  FOR SELECT
  USING (true);
