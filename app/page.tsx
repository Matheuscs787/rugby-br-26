import type { Metadata } from "next";
import { RugbyGame } from "./rugby-game";

export const metadata: Metadata = {
  title: { absolute: "Rugby BR 26 — protótipo 2D" },
  description:
    "Rugby arcade 2D leve com os 24 clubes das duas divisões nacionais de 2026.",
};

export default function Home() {
  return <RugbyGame />;
}
