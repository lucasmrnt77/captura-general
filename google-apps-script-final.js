var SHEET_ID = "1lSEHGH9xs4m4EjSSTIQbcH2d4spPl4mdakXsWbCcdiE";
var SHEET_NAME = "Hoja 1";

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ 
      status: "active", 
      message: "Google Apps Script funcionando correctamente",
      timestamp: new Date()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    Logger.log("Datos recibidos - Action: " + data.action);
    
    var spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    var sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      Logger.log("Hoja no encontrada, creando nueva...");
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.appendRow([
        "Fecha", "Hora", "Telefono", "Pais", "Edad", "Genero", "Respuesta_dinero",
        "Pagina_captura", "Campana", "Anuncio", "Utm_source", "Utm_medium", "Utm_term",
        "Landing", "Video", "Pag.Gracias"
      ]);
    }

    // ACCIÓN 1: Registrar nuevo lead
    if (data.action === "register") {
      Logger.log("Guardando nuevo registro para: " + data.telefono);
      
      sheet.appendRow([
        data.fecha || "",
        data.hora || "",
        data.telefono || "",
        data.pais || "",
        "",
        "",
        "",
        data.pagina_captura || "",
        data.campana || "",
        data.anuncio || "",
        data.utm_source || "",
        data.utm_medium || "",
        data.utm_term || "",
        data.landing || "pagina_1",
        data.video || "uLfDLfgTpZ8",
        data.pag_gracias || "gracias-video"
      ]);
      
      Logger.log("Registro guardado exitosamente");
      
      return ContentService.createTextOutput(
        JSON.stringify({ success: true, message: "Guardado OK en Hoja 1" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // ACCIÓN 2: Actualizar respuestas de la encuesta
    if (data.action === "update") {
      Logger.log("Actualizando respuestas para: " + data.telefono);
      
      var values = sheet.getDataRange().getValues();
      
      // Buscar la fila con ese teléfono (columna C = índice 2)
      for (var i = 1; i < values.length; i++) {
        if (String(values[i][2]).trim() === String(data.telefono).trim()) {
          Logger.log("Encontrada fila: " + (i + 1));
          
          // Actualizar:
          // Columna E (índice 4) = Edad
          // Columna F (índice 5) = Género
          // Columna G (índice 6) = Respuesta_dinero (Inversión)
          // Columna D (índice 3) = Pais (por si no estaba)
          
          if (data.pais) sheet.getRange(i + 1, 4).setValue(data.pais);
          if (data.edad) sheet.getRange(i + 1, 5).setValue(data.edad);
          if (data.genero) sheet.getRange(i + 1, 6).setValue(data.genero);
          if (data.respuesta) sheet.getRange(i + 1, 7).setValue(data.respuesta);
          
          Logger.log("Fila actualizada correctamente");
          
          return ContentService.createTextOutput(
            JSON.stringify({ 
              success: true, 
              message: "Actualizado OK",
              row: i + 1,
              country: data.pais,
              edad: data.edad,
              genero: data.genero,
              respuesta: data.respuesta
            })
          ).setMimeType(ContentService.MimeType.JSON);
        }
      }
      
      Logger.log("ERROR: Teléfono no encontrado");
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: "Teléfono no encontrado", phone: data.telefono })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: "Acción no reconocida", action: data.action })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log("Error: " + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function testPost() {
  var e = {
    postData: {
      contents: JSON.stringify({
        action: "register",
        telefono: "5551234567",
        fecha: "09/07/2026",
        hora: "14:30",
        pais: "AR",
        pagina_captura: "landing_test",
        campana: "test",
        anuncio: "test",
        utm_source: "test",
        utm_medium: "test",
        utm_term: "test",
        landing: "pagina_1",
        video: "uLfDLfgTpZ8",
        pag_gracias: "gracias-video"
      })
    }
  };
  
  var result = doPost(e);
  Logger.log("Resultado: " + result.getContent());
}

function testUpdate() {
  var e = {
    postData: {
      contents: JSON.stringify({
        action: "update",
        telefono: "5551234567",
        edad: "25 a 34 años",
        genero: "Hombre",
        respuesta: "No hoy, pero podría organizarme para conseguirlo",
        pais: "AR"
      })
    }
  };
  
  var result = doPost(e);
  Logger.log("Resultado update: " + result.getContent());
}
