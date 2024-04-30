var global = this;

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("⚙️ ASTA Workspace")
    .addItem("RGE Erstellen", "openRgeDialog")
    .addToUi();
}

function openRgeDialog() {
  var html = HtmlService
  .createHtmlOutputFromFile("index")
  .setWidth(827)
  .setHeight(1169);

  SpreadsheetApp
  .getUi()
  .showModalDialog(html, "RGE Erstellen");
}

function addEntry(entry) {
  var posten = entry["Posten"];
  var sheetName = posten.replace(/ /g, "_") + "_Rechnungen"; // Convert Posten to sheet name format
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    // If sheet doesn't exist, create a new one
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow([
      "Datum",
      "Quartal",
      "Kapitel",
      "Betrag",
      "Rechnungsdatum",
      "Zahlungsdatum",
      "Rechnungsbezeichnung",
      "SotaxBuchungsnummer",
      "Rechnungserklaerung",
    ]);
  }

  // Get current date
  var currentDate = new Date();
  var formattedDate = Utilities.formatDate(
    currentDate,
    SpreadsheetApp.getActive().getSpreadsheetTimeZone(),
    "dd-MM-yyyy"
  );

  // Calculate the quarter based on the "Rechnungsdatum"
  var rechnungsDate = new Date(entry["Rechnungsdatum"]);
  var quarter = Math.floor((rechnungsDate.getMonth() + 1) / 3) + 1; // Adding 1 to make October start as Q1

  if (quarter === 4) {
    // If the calculated quarter is 4, set it to 1 to represent the start of a new financial year
    quarter = 1;
  }

  var values = [
    formattedDate, // Use current date for Datum
    "Q" + quarter, // Set quarter
    entry["Kapitel"],
    entry["Betrag"],
    entry["Rechnungsdatum"],
    entry["Zahlungsdatum"],
    entry["Rechnungsbezeichnung"],
    entry["SotaxBuchungsnummer"],
    entry["Rechnungserklaerung"],
  ];
  sheet.appendRow(values);
}

function getCommonInfo(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var settingsSheet = ss.getSheetByName("Settings");

}

function getChapters(account) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var settingsSheet = ss.getSheetByName("Settings");
  var lastRow = settingsSheet.getLastRow();
  var accountColumn = settingsSheet.getRange("A2:A" + lastRow).getValues();
  var chapterColumn = settingsSheet.getRange("B2:B" + lastRow).getValues();

  var chapters = [];

  for (var i = 0; i < accountColumn.length; i++) {
    if (accountColumn[i][0] === account) {
      var chapterString = chapterColumn[i][0];
      var chapterArray = chapterString.split(";");
      chapters.push(chapterArray);
    }
  }

  var jsonData = { chapters: chapters.flat() }; // Convert the chapters array to an object with the "chapters" key

  var jsonString = JSON.stringify(jsonData);

  return jsonString;
}

function getAccounts() {
  // Access the spreadsheet and the sheet named "Settings"
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Settings");

  // Get the data range for column A
  var dataRange = sheet.getRange("A:A");

  // Get the values in column A
  var values = dataRange.getValues();

  // Define an array to store the accounts
  var accountsData = [];

  // Iterate through each row starting from the second row (assuming the first row is header)
  for (var i = 1; i < values.length; i++) {
    var account = values[i][0];

    // If the cell is empty, skip to the next row
    if (!account) continue;

    // Add the account to the array
    accountsData.push(account);
  }

  // Convert the accountsData array to an object with the "accounts" key
  var jsonData = { accounts: accountsData };

  // Convert the jsonData object to a JSON string
  var jsonString = JSON.stringify(jsonData);

  // Return the JSON string
  return jsonString;
}


function getBookingData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var settingsSheet = ss.getSheetByName("Settings");
  var lastRow = settingsSheet.getLastRow();
  var accountColumn = settingsSheet.getRange("A2:A" + lastRow).getValues();
  var chapterColumn = settingsSheet.getRange("B2:B" + lastRow).getValues();

  var accountsData = [];

  // Iterate through each row starting from the second row (assuming the first row is header)
  for (var i = 0; i < accountColumn.length; i++) {
    var account = accountColumn[i][0];
    var chapterString = chapterColumn[i][0];
    var chapterArray = chapterString.split(";");

    // If the cell is empty, skip to the next row
    if (!account) continue;

    // Add account and chapters to the accountsData array
    accountsData.push({ account: account, chapters: chapterArray });
  }

  // Convert the accountsData array to a JSON string
  var jsonString = JSON.stringify({ data: accountsData });

  Logger.log(jsonString);
  // Return the JSON string
  return jsonString;
}
