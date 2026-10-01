var SHEET_ID = "1DiUzUIOeWid7OlIkpTtoATWUpNHCB2-HrO5_h2YqXro";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    
    // Obtener o crear la hoja "Video Testing"
    var sheet = spreadsheet.getSheetByName("Video Testing");
    if (!sheet) {
      sheet = spreadsheet.insertSheet("Video Testing");
      // Agregar encabezados
      sheet.appendRow([
        "fecha_hora",
        "video_id",
        "telefono",
        "pais",
        "age_range",
        "gender",
        "capital_amount",
        "respuesta",
        "country_code"
      ]);
    }

    if (data.action === "track_video") {
      sheet.appendRow([
        data.timestamp,           // fecha_hora
        data.video_id,            // video_id
        data.telefono,            // telefono
        data.pais,                // pais
        data.age_range || "",     // age_range
        data.gender || "",        // gender
        data.capital_amount || "", // capital_amount
        data.respuesta || "",     // respuesta
        data.country || ""        // country_code
      ]);

      return ContentService.createTextOutput(
        JSON.stringify({ success: true, message: "Video tracking registrado" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: "Accion no reconocida" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
