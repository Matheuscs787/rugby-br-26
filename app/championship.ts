export type ChampionshipPhase = "groups" | "hexagonal" | "repechage" | "final";

export type ChampionshipFixture = {
  id: string;
  division: 1 | 2;
  group: string;
  phase: ChampionshipPhase;
  round: number;
  date?: string;
  time?: string;
  homeId: string;
  awayId: string;
};

export type ChampionshipResult = {
  fixtureId: string;
  phase: ChampionshipPhase;
  homeId: string;
  awayId: string;
  homeScore: number;
  awayScore: number;
  homeTries: number;
  awayTries: number;
};

export type CampaignStatus =
  | "groups"
  | "hexagonal"
  | "repechage"
  | "final"
  | "champion"
  | "runner-up"
  | "promoted"
  | "repechage-complete"
  | "eliminated";

export type ChampionshipCampaign = {
  version: 1;
  teamId: string;
  division: 1 | 2;
  group: string;
  status: CampaignStatus;
  fixtures: ChampionshipFixture[];
  results: ChampionshipResult[];
  createdAt: number;
};

type FixtureRow = readonly [
  division: 1 | 2,
  groupCode: "A" | "B" | "C",
  round: number,
  date: string,
  time: string,
  homeId: string,
  awayId: string,
];

const GROUP_NAMES = {
  1: { A: "Grupo A", B: "Grupo B", C: "Grupo C" },
  2: { A: "Taça RS–SC", B: "Taça PR–SP", C: "Taça RJ–MG–ES" },
} as const;

// Calendário publicado pela CBRu/Sporti em 2026. Os placares reais não são
// reaproveitados: cada campanha cria a sua própria temporada jogável.
const OFFICIAL_ROWS: FixtureRow[] = [
  [1, "A", 1, "20/06/2026", "13:30", "desterro", "farrapos"],
  [1, "A", 1, "20/06/2026", "14:00", "charrua", "joaca"],
  [1, "B", 1, "20/06/2026", "14:00", "rio-branco", "poli"],
  [1, "B", 1, "20/06/2026", "10:30", "sao-jose", "tornados"],
  [1, "C", 1, "20/06/2026", "14:00", "jacarei", "nova-lima"],
  [1, "C", 1, "20/06/2026", "14:00", "spac", "pasteur"],
  [1, "A", 2, "04/07/2026", "15:00", "farrapos", "charrua"],
  [1, "A", 2, "04/07/2026", "15:00", "joaca", "desterro"],
  [1, "B", 2, "04/07/2026", "15:00", "poli", "sao-jose"],
  [1, "B", 2, "04/07/2026", "15:00", "tornados", "rio-branco"],
  [1, "C", 2, "04/07/2026", "15:00", "jacarei", "spac"],
  [1, "C", 2, "04/07/2026", "15:00", "pasteur", "nova-lima"],
  [1, "A", 3, "18/07/2026", "15:00", "joaca", "farrapos"],
  [1, "A", 3, "18/07/2026", "15:00", "charrua", "desterro"],
  [1, "B", 3, "18/07/2026", "15:00", "tornados", "poli"],
  [1, "B", 3, "18/07/2026", "15:00", "sao-jose", "rio-branco"],
  [1, "C", 3, "18/07/2026", "15:00", "pasteur", "jacarei"],
  [1, "C", 3, "18/07/2026", "15:00", "spac", "nova-lima"],
  [1, "A", 4, "01/08/2026", "15:00", "farrapos", "desterro"],
  [1, "A", 4, "01/08/2026", "15:00", "joaca", "charrua"],
  [1, "B", 4, "01/08/2026", "15:00", "poli", "rio-branco"],
  [1, "B", 4, "01/08/2026", "15:00", "tornados", "sao-jose"],
  [1, "C", 4, "01/08/2026", "15:00", "nova-lima", "jacarei"],
  [1, "C", 4, "01/08/2026", "15:00", "pasteur", "spac"],
  [1, "A", 5, "15/08/2026", "15:00", "charrua", "farrapos"],
  [1, "A", 5, "15/08/2026", "15:00", "desterro", "joaca"],
  [1, "B", 5, "15/08/2026", "15:00", "sao-jose", "poli"],
  [1, "B", 5, "15/08/2026", "15:00", "rio-branco", "tornados"],
  [1, "C", 5, "15/08/2026", "15:00", "spac", "jacarei"],
  [1, "C", 5, "15/08/2026", "15:00", "nova-lima", "pasteur"],
  [1, "A", 6, "22/08/2026", "15:00", "farrapos", "joaca"],
  [1, "A", 6, "22/08/2026", "15:00", "desterro", "charrua"],
  [1, "B", 6, "22/08/2026", "15:00", "poli", "tornados"],
  [1, "B", 6, "22/08/2026", "15:00", "rio-branco", "sao-jose"],
  [1, "C", 6, "22/08/2026", "15:00", "jacarei", "pasteur"],
  [1, "C", 6, "22/08/2026", "15:00", "nova-lima", "spac"],
  [2, "A", 1, "01/08/2026", "15:00", "brummers", "joinville"],
  [2, "A", 1, "20/06/2026", "15:00", "serra-gaucha", "colonos"],
  [2, "B", 1, "20/06/2026", "15:00", "leoes", "pe-vermelho"],
  [2, "B", 1, "20/06/2026", "14:00", "iguanas", "urutu"],
  [2, "C", 1, "20/06/2026", "15:00", "rio", "carioca"],
  [2, "C", 1, "20/06/2026", "12:30", "niteroi", "vitoria"],
  [2, "A", 2, "18/07/2026", "15:00", "serra-gaucha", "brummers"],
  [2, "A", 2, "18/07/2026", "15:00", "colonos", "joinville"],
  [2, "B", 2, "18/07/2026", "15:00", "iguanas", "leoes"],
  [2, "B", 2, "18/07/2026", "15:00", "urutu", "pe-vermelho"],
  [2, "C", 2, "18/07/2026", "15:00", "rio", "vitoria"],
  [2, "C", 2, "18/07/2026", "15:00", "carioca", "niteroi"],
  [2, "A", 3, "15/08/2026", "15:00", "brummers", "colonos"],
  [2, "A", 3, "15/08/2026", "15:00", "joinville", "serra-gaucha"],
  [2, "B", 3, "15/08/2026", "15:00", "leoes", "urutu"],
  [2, "B", 3, "15/08/2026", "15:00", "pe-vermelho", "iguanas"],
  [2, "C", 3, "15/08/2026", "15:00", "niteroi", "rio"],
  [2, "C", 3, "15/08/2026", "15:00", "vitoria", "carioca"],
];

export const OFFICIAL_GROUP_FIXTURES: ChampionshipFixture[] = OFFICIAL_ROWS.map(
  ([division, groupCode, round, date, time, homeId, awayId], index) => ({
    id: `group-${division}-${groupCode.toLowerCase()}-${round}-${index}`,
    division,
    group: GROUP_NAMES[division][groupCode],
    phase: "groups",
    round,
    date,
    time,
    homeId,
    awayId,
  }),
);

export function createRoundRobinFixtures(
  teamIds: string[],
  phase: "hexagonal" | "repechage",
  division: 1 | 2,
): ChampionshipFixture[] {
  const rotation = [...teamIds];
  if (rotation.length % 2) rotation.push("bye");
  const fixtures: ChampionshipFixture[] = [];
  const rounds = rotation.length - 1;

  for (let round = 1; round <= rounds; round += 1) {
    for (let pair = 0; pair < rotation.length / 2; pair += 1) {
      const first = rotation[pair];
      const second = rotation[rotation.length - 1 - pair];
      if (first === "bye" || second === "bye") continue;
      const reverse = (round + pair) % 2 === 0;
      fixtures.push({
        id: `${phase}-${round}-${pair}-${first}-${second}`,
        division,
        group: phase === "hexagonal" ? "Hexagonal final" : "Repescagem",
        phase,
        round,
        homeId: reverse ? second : first,
        awayId: reverse ? first : second,
      });
    }
    rotation.splice(1, 0, rotation.pop()!);
  }
  return fixtures;
}

export function createFinalFixture(
  firstId: string,
  secondId: string,
  division: 1 | 2,
): ChampionshipFixture {
  return {
    id: `final-${firstId}-${secondId}`,
    division,
    group: "Final",
    phase: "final",
    round: 1,
    homeId: firstId,
    awayId: secondId,
  };
}
