import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { LanguageProvider } from "./utils/LanguageService.jsx";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
