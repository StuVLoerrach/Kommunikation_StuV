// LanguageToggle.js
import React, { createContext, useContext, useState } from "react";
import { Button } from "@mui/material";
import translations from "../lang/translations.json";

const LanguageContext = createContext();

const useLanguage = () => useContext(LanguageContext);

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "de" : "en");
  };

  const t = (key) => {
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const LanguageToggle = () => {
  const { toggleLanguage } = useLanguage();

  return (
    <Button variant="outlined" onClick={toggleLanguage}>
      Toggle Language
    </Button>
  );
};

export { LanguageProvider, LanguageToggle, useLanguage };
