import { GASClient } from "gas-client";

const { productionServerFunctions } = new GASClient();

const getBookingData = () => {
  return JSON.stringify({
    data: [
      {
        account: "Schulungen",
        chapters: ["StuV-intern"],
      },
      {
        account: "Sitzungen",
        chapters: ["Regional", "Überregional", "Sonstiges"],
      },
      {
        account: "Reisekosten",
        chapters: ["Regional", "Überregional", "Sonstiges"],
      },
      {
        account: "Veranstaltungen",
        chapters: [
          "Bachelorball",
          "Seminare",
          "StuV-intern",
          "StuV-extern",
          "Beteiligung Hochschulsport",
        ],
      },
      {
        account: "Merchandise / Marketing / CI",
        chapters: [
          "DHBW Pullover",
          "DHBW T-Shirts",
          "Ersti-Pakete",
          "Werbemittel und -material",
          "Werbegeschenke",
        ],
      },
      {
        account: "Projekte",
        chapters: [
          "Startup StuV Loerach",
          "Teamwochenende VS+LÖ",
          "Unterstützung studentischer Projekte",
          "Leuchtturmprojekte",
        ],
      },
      {
        account: "Investitionen",
        chapters: [
          "Veranstaltungs- / Kommunikationstechnik",
          "elektronische Geräte",
          "Büroausstattung",
          "Sportequipment ",
        ],
      },
      {
        account: "Sonstiges",
        chapters: [
          "Verbrauchsmaterial",
          "Kopier- und Druckkosten",
          "Porto",
          "Geschenke",
          "Lizenzen",
        ],
      },
    ],
  });
};

const mockServerFunctions = {
  getBookingData,
};

let serverFunctions;

if (process.env.NODE_ENV === "development") {
  // Import mock functions in development mode
  serverFunctions = mockServerFunctions;
} else {
  // Import server functions in production mode
  serverFunctions = productionServerFunctions;
}

export { serverFunctions };
