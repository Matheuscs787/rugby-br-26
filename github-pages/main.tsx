import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../app/globals.css";
import { RugbyGame } from "../app/rugby-game";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RugbyGame />
  </StrictMode>,
);
