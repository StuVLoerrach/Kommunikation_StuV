// Test method
function testGetChapters() {
  var account = "Schulungen"; // Replace with desired account for testing
  var chapters = getChapters(account);
  Logger.log(
    "Chapters for account '" + account + "': " + JSON.stringify(chapters)
  );
}

// Test method for getAccounts function
function testGetAccounts() {
  // Assuming you have a spreadsheet named "Settings" with accounts data
  var jsonString = getAccounts();

  // Parse the JSON string to extract accounts data
  var accountsData = JSON.parse(jsonString);

  // Log the accounts data
  Logger.log("Accounts data: " + JSON.stringify(accountsData));

  // Assert if the accountsData object contains the "accounts" key
  if ("accounts" in accountsData) {
    // Log the number of accounts found
    Logger.log("Number of accounts: " + accountsData.accounts.length);

    // Log each account
    accountsData.accounts.forEach(function (account, index) {
      Logger.log("Account " + (index + 1) + ": " + account);
    });
  } else {
    // Log if "accounts" key is not found
    Logger.log("No accounts found.");
  }
}

function testAddEntry() {
  var sampleEntry = {
    Posten: "Schulungen",
    Datum: "2024-04-27",
    Quartal: "Q2",
    Kapitel: "Training",
    Betrag: 500,
    Rechnungsdatum: "2024-04-27",
    Zahlungsdatum: "2024-05-10",
    Rechnungsbezeichnung: "Training Workshop",
    SotaxBuchungsnummer: "12345",
    Rechnungserklaerung: "Training costs for workshop",
  };

  addEntry(sampleEntry);
}
