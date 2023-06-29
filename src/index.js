import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import "./styles/sidebar.css";
import "./styles/popups.css";
import "./styles/scrollbar.css";
import "./styles/usersList.css";
import "./styles/newChat.css";
import "./styles/renameChat.css";
import "./styles/darkmode.css";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
