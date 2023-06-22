import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./popups.css";
import "./scrollbar.css";
import "./darkmode.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
