import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App";
import { LocaleProvider } from "./i18n/LocaleContext";
import theme from "./theme";

const baseUrl = import.meta.env.BASE_URL ?? "/";
const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
const basename = normalizedBase === "" ? undefined : normalizedBase;

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element with id 'root' was not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter basename={basename} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <LocaleProvider>
          <App />
        </LocaleProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);



