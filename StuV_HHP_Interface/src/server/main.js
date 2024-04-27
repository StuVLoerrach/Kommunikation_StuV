var global = this;

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("⚙️ ASTA Workspace")
    .addItem("RGE Erstellen", "openRgeDialog")
    .addToUi();
}

function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('Sidebar')
      .setTitle('Custom Sidebar')
      .setWidth(300);
  SpreadsheetApp.getUi().showSidebar(html);
}

function addEntryToSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Add your logic here to add the entry to Google Sheets
  // Example:
  var date = new Date();
  var rowData = [date.toLocaleDateString(), date.toLocaleTimeString()];
  sheet.appendRow(rowData);
  
  // Inform the user that the entry has been added
  SpreadsheetApp.getUi().alert('Entry added to sheet.');
}


function openRgeDialog() {
  var html = HtmlService.createHtmlOutputFromFile("index");
  SpreadsheetApp.getUi().showModalDialog(html, "RGE Erstellen");
}


const getSheets = () => SpreadsheetApp.getActive().getSheets();

const getActiveSheetName = () => SpreadsheetApp.getActive().getSheetName();

function addSheet(sheetTitle) {
  SpreadsheetApp.getActive().insertSheet(sheetTitle);
  return getSheetsData();
}

function addEntry(entry) {
  var posten = entry["Posten"];
  var sheetName = posten.replace(/ /g, "_") + "_Rechnungen"; // Convert Posten to sheet name format
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    // If sheet doesn't exist, create a new one
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(["Datum", "Quartal", "Kapitel", "Betrag", "Rechnungsdatum", "Zahlungsdatum", "Rechnungsbezeichnung", "SotaxBuchungsnummer", "Rechnungserklaerung"]);
  }
  
  // Get current date
  var currentDate = new Date();
  var formattedDate = Utilities.formatDate(currentDate, SpreadsheetApp.getActive().getSpreadsheetTimeZone(), "dd-MM-yyyy");

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
    entry["Rechnungserklaerung"]
  ];
  sheet.appendRow(values);
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

  return chapters.length > 0 ? chapters.flat() : []; // Return a flattened array of chapters if found, otherwise return an empty array
}

function getAccounts() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var settingsSheet = ss.getSheetByName("Settings");
    var lastRow = settingsSheet.getLastRow();
    var accountsColumn = settingsSheet.getRange("A2:A" + lastRow).getValues();
    var uniqueAccounts = new Set(accountsColumn.flat()); // Get unique values from the accountsColumn array
    var accountsArray = Array.from(uniqueAccounts); // Convert Set to array
    var accounts = accountsArray.filter(function(account) { return account }); // Filter out any empty or undefined values
  
    // Convert to JSON object
    var accountsJSON = {};
    accounts.forEach(function(account) {
      accountsJSON[account] = getChapters(account);
    });
    return accountsJSON;
}

function testGetAccountGetChapters() {
  // Test getAccounts function
  var accountsObject = getAccounts();
  Logger.log("Available Accounts:");
  Logger.log(accountsObject);

  // Test getChapters function with a selected account
  var accountsArray = Object.keys(accountsObject);
  if (accountsArray.length > 0) {
    var selectedAccount = accountsArray[0]; // Select the first account from the list
    var chaptersList = accountsObject[selectedAccount];
    Logger.log("Chapters for selected Account (" + selectedAccount + "):");
    Logger.log(chaptersList);
  } else {
    Logger.log("No Accounts available to select.");
  }
}

function testAddEntry() {
  var sampleEntry = {
    "Posten": "Schulungen",
    "Datum": "2024-04-27",
    "Quartal": "Q2",
    "Kapitel": "Training",
    "Betrag": 500,
    "Rechnungsdatum": "2024-04-27",
    "Zahlungsdatum": "2024-05-10",
    "Rechnungsbezeichnung": "Training Workshop",
    "SotaxBuchungsnummer": "12345",
    "Rechnungserklaerung": "Training costs for workshop"
  };

  addEntry(sampleEntry);
}
