import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const baseUrl = import.meta.env.BASE_URL ?? "/";
const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
const basename = normalizedBase === "" ? undefined : normalizedBase;

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);
