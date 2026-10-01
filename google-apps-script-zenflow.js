var SHEET_ID = "1lSEHGH9xs4m4EjSSTIQbcH2d4spPl4mdakXsWbCcdiE";
var GROUP_SHEET_NAME = "Leads Grupo";

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return jsonResponse({
    success: true,
    message: "Zenflow webhook funcionando"
  });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({
        success: false,
        error: "No se recibió contenido"
      });
    }

    var data = JSON.parse(e.postData.contents);
    var spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    var sheet = spreadsheet.getSheetByName(GROUP_SHEET_NAME);

    if (!sheet) {
      return jsonResponse({
        success: false,
        error: "No existe la hoja Leads Grupo"
      });
    }

    var createdAt =
      data.createdAt_with_timezone_br ||
      data.createdAt;

    var dateParts = formatZenflowDate(createdAt);
    var phone = String(data.number || "")
      .replace(/[^0-9]/g, "");

    if (!phone) {
      return jsonResponse({
        success: false,
        error: "No se recibió el número telefónico"
      });
    }

    sheet.appendRow([
      dateParts.date,
      dateParts.time,
      Number(phone),
      String(data.groupName || "")
    ]);

    return jsonResponse({
      success: true,
      message: "Miembro guardado en Leads Grupo",
      date: dateParts.date,
      time: dateParts.time,
      phone: phone,
      groupName: String(data.groupName || "")
    });

  } catch (error) {
    return jsonResponse({
      success: false,
      error: error.toString()
    });
  }
}

function formatZenflowDate(value) {
  var date = new Date(value);

  if (isNaN(date.getTime())) {
    throw new Error("createdAt inválido: " + value);
  }

  var pad = function(number) {
    return String(number).padStart(2, "0");
  };

  return {
    date:
      pad(date.getDate()) + "/" +
      pad(date.getMonth() + 1) + "/" +
      date.getFullYear(),
    time:
      pad(date.getHours()) + ":" +
      pad(date.getMinutes())
  };
}
