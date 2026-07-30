import type { Metadata } from "next";
import { RugbyGame } from "./rugby-game";

export const metadata: Metadata = {
  title: { absolute: "Rugby BR 26 — rugby sevens 2D" },
  description:
    "Rugby sevens arcade 2D, 7 contra 7, com os 24 clubes das duas divisões nacionais de 2026.",
};

export default function Home() {
  return <RugbyGame />;
}
