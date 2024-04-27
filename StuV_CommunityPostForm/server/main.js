var folderID = "1On3fe-_Mzak7hnuLGst1Dis6oLPLYB3-"; //Replace the "root"with folder ID to upload files to a specific folder
var sheetName = "Data"; //Replace the "Data" with your data sheet name

function doGet(e) {
  // Get the query parameters
  var params = e.parameter;
  
  // Check if the query parameters match the expected action and group
  if (params.group === 'partners') {
    // Get the names of partners from the spreadsheet
    var partners = getPartners();
    // Return partners as JSON
    return ContentService.createTextOutput(JSON.stringify(partners)).setMimeType(ContentService.MimeType.JSON);
  } else {
    // If the request is for something else, return an error message
    return ContentService.createTextOutput("Invalid request");
  }
}


function getPartners() {
  // Get the active spreadsheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DHBW_Partner");
  
  // Get the data range
  var range = sheet.getRange("A:A");
  
  // Get the values from the range
  var values = range.getValues();
  
  // Extract the names from the values
  var partners = values.map(row => row[0]).filter(Boolean);
  
  // Return the names as an array
  return { partners: partners };
}


function doPost(e) {
  // Parse incoming JSON data
  var requestData = JSON.parse(e.postData.contents);

  // Get current sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Decode and save binary file to Google Drive

  // Get current date in YYYY.MM.DD format
  var currentDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy.MM.dd");

  // Combine current date and entry title to form the file name
  var fileName = currentDate + "_" + requestData.entryTitel;

  var fileUrl = saveFile(requestData.entryFile, fileName);

  // Return response

  // Store entry data into sheet
  var newRow = [
    currentDate,
    requestData.entryTitel,
    requestData.entrySubText,
    requestData.entryMainText,
    requestData.entryYear,
    requestData.entryMonth,
    requestData.entryDate,
    requestData.entryOrganization,
    fileUrl
  ];
  sheet.appendRow(newRow);
  return ContentService.createTextOutput("Entry stored successfully. File saved to Google Drive.").setMimeType(ContentService.MimeType.TEXT);
}

function saveFile(base64Data, fileName, folderID) {
  var folder = DriveApp.getFolderById(folderID);
  var bytes = Utilities.base64Decode(base64Data);
  var blob = Utilities.newBlob(bytes);

  // Set the file name if provided, otherwise use a default name
  if (fileName) {
    blob.setName(fileName);
  } else {
    blob.setName("Untitled_File");
  }

  var file = folder.createFile(blob);

  // Get the file URL
  var fileUrl = file.getUrl();

  return fileUrl;

}