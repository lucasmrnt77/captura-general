# Cambios Implementados - Proyecto Trading

## ✅ Fase 1: Landing Page - COMPLETADA

### Cambios realizados:
1. **Fechas del evento**: Actualizado de "11 al 14 de Mayo" → "10 al 13 de Agosto"
2. **Headline principal**: Cambio en `hero-section.tsx`
   - De: "Aprendé la habilidad para generar ingresos extra de 500 a 2.000 dólares al mes con trading"
   - A: "Aprendé a invertir en los mercados financieros para generar ingresos extras de 500 a 2.000 dolares mensuales"
   - Con resaltado en negrita y verde en "invertir en los mercados financieros" y "ingresos extras de 500 a 2.000 dólares"

3. **Estadística de alumnos**: Actualizado de 947 → 1483 en `statistics.tsx`
4. **Countdown**: Configurado para terminar el 10 de Agosto a las 20:00 GMT-3 en `cta-section.tsx`

---

## ✅ Fase 2: Página de Gracias - COMPLETADA

### Nuevas preguntas agregadas en `app/gracias-video/page.tsx`:
1. **Rango de edad** (6 opciones)
   - Menor de 25
   - 25 a 34 años
   - 35 a 44 años
   - 45 a 54 años
   - 55 a 64 años
   - +65

2. **Sexo** (2 opciones)
   - Hombre
   - Mujer

3. **Capital disponible** (3 opciones - la pregunta actual)
   - Sí, tengo
   - No, pero podría conseguir
   - No tengo

4. **Respuesta del video** (pregunta original)
   - No, hoy sería imposible
   - No hoy, pero podría organizarme para conseguirlo
   - Sí, podría hacerlo sin problema

### Lógica de eventos Meta:
- **RegistroEventoTrading**: Se envía cuando la respuesta es "No hoy, pero podría..." O "Sí, podría..."
- **Lead NoSegmentado**: Se envía cuando la respuesta es "No, hoy sería imposible"
- Datos demográficos incluidos en ambos eventos: país, edad, sexo, capital

### Actualización de BD:
- Script SQL: `scripts/add-survey-fields.sql`
- Nuevos campos en tabla `leads_eventos`:
  - `age_range` (TEXT)
  - `gender` (TEXT)
  - `capital_amount` (TEXT)
  - `video_id` (TEXT) - para testing
  - `respuesta_fecha` (TIMESTAMP)

---

## ✅ Fase 3: Testing de Videos - IMPLEMENTADA

### Configuración:
1. **Variable de entorno**: `NEXT_PUBLIC_GRACIAS_VIDEO_ID`
   - Default: "uLfDLfgTpZ8" (video actual)
   - Para cambiar el video, actualiza esta variable en tu `.env.local` o en Settings > Vars

2. **Google Sheets para tracking**:
   - Nuevo script: `google-apps-script-video-tracking.js`
   - Nueva hoja automática: "Video Testing"
   - Columns: fecha_hora, video_id, telefono, pais, age_range, gender, capital_amount, respuesta, country_code

### Cómo cambiar el video:
```
# Opción 1: En Settings > Vars de v0
NEXT_PUBLIC_GRACIAS_VIDEO_ID = "NUEVO_VIDEO_ID"

# Opción 2: En .env.local
NEXT_PUBLIC_GRACIAS_VIDEO_ID="NUEVO_VIDEO_ID"
```

El video ID es la parte del URL de YouTube después de `/embed/`
Ejemplo: https://www.youtube.com/embed/uLfDLfgTpZ8 → ID es "uLfDLfgTpZ8"

---

## Archivos Modificados:

### Landing Page:
- `components/hero-section.tsx` - Headline y fechas
- `components/cta-section.tsx` - Countdown
- `components/statistics.tsx` - Cambio 947 → 1483

### Página de Gracias:
- `app/gracias-video/page.tsx` - Nuevas preguntas y lógica de Meta

### Base de Datos:
- `scripts/add-survey-fields.sql` - Nuevos campos
- `app/api/leads/update/route.ts` - Aceptar nuevos campos

### Tracking:
- `google-apps-script-video-tracking.js` - Nuevo script para tracking de videos

---

## Próximos Pasos:

### 1. Ejecutar migración SQL:
Ve a Supabase SQL Editor y copia el contenido de `scripts/add-survey-fields.sql`

### 2. Agregar variable de entorno (opcional, para cambiar videos):
En Settings > Vars, agrega:
```
NEXT_PUBLIC_GRACIAS_VIDEO_ID = uLfDLfgTpZ8
```

### 3. Crear Google Apps Script para video tracking (opcional):
- Ve a https://script.google.com
- Copia el código de `google-apps-script-video-tracking.js`
- Deploy como "Aplicación web"
- En Settings > Vars, agrega la URL:
```
GOOGLE_SHEETS_VIDEO_TRACKING_URL = https://script.google.com/macros/s/.../exec
```

---

## Lógica de eventos Meta (Resumen):

```
SI respuesta == "No, hoy sería imposible"
  → Enviar "Lead NoSegmentado" (NO enviar RegistroEventoTrading)

SI respuesta == "No hoy, pero podría..." O "Sí, podría..."
  → Enviar "RegistroEventoTrading" (NO enviar Lead NoSegmentado)

TODOS los eventos incluyen:
  - country (país del usuario)
  - age_range (rango de edad)
  - gender (sexo)
  - capital_amount (capital disponible)
  - video_id (video mostrado)
```

---

## Testing:

Para probar los cambios:
1. Completa el formulario en la landing page
2. Responde todas las 4 preguntas en la página de gracias
3. Verifica que:
   - Los datos se guardan en Supabase
   - Los eventos se envíen a Meta Pixel
   - El video_id se registre en la tabla
   - Los formularios envíen datos a Google Sheets

---

**Todos los cambios están listos para producción ✅**
