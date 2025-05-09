import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const documentRoot = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(documentRoot).render(
  <StrictMode>
    <App />
  </StrictMode>
);
