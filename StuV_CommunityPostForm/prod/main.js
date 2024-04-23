var folderID = "1On3fe-_Mzak7hnuLGst1Dis6oLPLYB3-"; //Replace the "root"with folder ID to upload files to a specific folder
var sheetName = "Data"; //Replace the "Data" with your data sheet name

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

function test(){
  saveFile(base64Data, "test", folderID)
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

var base64Data = "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"