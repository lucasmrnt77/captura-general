# Google Tag Manager - Setup para Eventos Meta Condicionales

## Visión General

El sistema envía datos demográficos (país, edad, sexo, capital) al dataLayer de GTM. GTM evalúa estas variables según reglas condicionales para decidir qué evento Meta disparar.

---

## Paso 1: Crear Variables Personalizadas en GTM

### Variable 1: Country
- **Tipo:** JavaScript personalizado
- **Código:**
```javascript
return dataLayer[dataLayer.length - 1]?.country || 'AR';
```

### Variable 2: Age Range
- **Tipo:** JavaScript personalizado
- **Código:**
```javascript
return dataLayer[dataLayer.length - 1]?.age_range || '';
```

### Variable 3: Gender
- **Tipo:** JavaScript personalizado
- **Código:**
```javascript
return dataLayer[dataLayer.length - 1]?.gender || '';
```

### Variable 4: Capital Amount
- **Tipo:** JavaScript personalizado
- **Código:**
```javascript
return dataLayer[dataLayer.length - 1]?.capital_amount || '';
```

### Variable 5: Respuesta
- **Tipo:** JavaScript personalizado
- **Código:**
```javascript
return dataLayer[dataLayer.length - 1]?.respuesta || '';
```

---

## Paso 2: Crear Triggers Condicionales

Una vez que el usuario proporcione las combinaciones exactas, crearemos triggers como este ejemplo:

### Trigger Ejemplo: "Argentina - Hombre - 25-34 - Con Capital"
- **Tipo:** Event
- **Event name:** `registro_evento_trading`
- **Condiciones:**
  - Country equals AR
  - Gender equals hombre
  - Age Range equals 25_34
  - Capital Amount equals si

---

## Paso 3: Crear Tags con Triggers Específicos

### Tag: RegistroEventoTrading
- **Configuración:** Tu tag de conversión Meta existente
- **Trigger:** Todos los triggers que resulten en RegistroEventoTrading

### Tag: Lead NoSegmentado
- **Configuración:** Tu tag de conversión Meta existente
- **Trigger:** Todos los triggers que resulten en Lead NoSegmentado

---

## Datos que Envía mi Código

Cada vez que el usuario completa el formulario, se envía esto al dataLayer:

```javascript
{
  event: "registro_evento_trading", // o "lead_no_segmentado"
  country: "AR",
  age_range: "25_34",
  gender: "hombre",
  capital_amount: "si",
  respuesta: "si_puedo",
  // ... otros datos
}
```

---

## Próximos Pasos

1. El usuario proporciona las combinaciones exactas (país + edad + sexo + capital = evento)
2. Creamos los triggers específicos en GTM
3. Configuramos los tags para dispararse solo con los triggers correctos
4. Testeamos el flujo

---

## Notas

- Los valores disponibles están definidos en `lib/meta-event-rules.ts`
- El código del frontend ya envía todos los datos al dataLayer
- GTM maneja 100% de la lógica condicional
- NO es necesario cambiar el código después de configurar GTM
