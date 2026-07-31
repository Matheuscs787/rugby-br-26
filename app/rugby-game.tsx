"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ROSTERS_2026, type PlayerSkills, type RosterPlayer } from "./rosters";
import {
  OFFICIAL_GROUP_FIXTURES,
  OFFICIAL_RESULTS_2026,
  createFinalFixture,
  createRoundRobinFixtures,
  type ChampionshipCampaign,
  type ChampionshipFixture,
  type ChampionshipPhase,
  type ChampionshipResult,
} from "./championship";

type Division = 1 | 2;
type UniformPattern = "solid" | "hoops" | "sash" | "quarters";
type Team = {
  id: string;
  name: string;
  state: string;
  division: Division;
  group: string;
  primary: string;
  secondary: string;
  short: string;
  logo: string;
  pattern: UniformPattern;
};

type Player = {
  id: number;
  name: string;
  photo?: string;
  skills: PlayerSkills;
  side: 0 | 1;
  slot: number;
  x: number;
  y: number;
  stun: number;
  tackleLock: number;
  stamina: number;
  jersey: number;
  routeX: number;
  routeY: number;
  routeTime: number;
};

type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  owner: Player | null;
  target: Player | null;
  air: number;
  flightDuration: number;
  kind: "held" | "pass" | "kick" | "restart" | "loose";
};

type AttackPlay = {
  kind: "wide" | "draw-pass";
  side: 0 | 1;
  edge: -1 | 1;
  time: number;
  passes: number;
  defenderId: number | null;
  receiverId: number | null;
};

type Match = {
  players: Player[];
  bench: [RosterPlayer[], RosterPlayer[]];
  ball: Ball;
  score: [number, number];
  tries: [number, number];
  formBoost: [number, number];
  seconds: number;
  half: 1 | 2;
  halftime: boolean;
  running: boolean;
  over: boolean;
  paused: boolean;
  lastFrame: number;
  actionLock: number;
  cpuActionLock: number;
  kickoff: number;
  restartSide: 0 | 1 | null;
  restartReceivingSide: 0 | 1 | null;
  whistleOnKickoff: boolean;
  fullbackSide: 0 | 1;
  looseBallSeconds: number;
  attackPlay: AttackPlay | null;
  blockWindow: number;
  substitutesLeft: [number, number];
  message: string;
  messageUntil: number;
};

type GameMode = "friendly" | "championship";
type ControlMode = "control" | "simulate";

type Standing = {
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  pointsFor: number;
  pointsAgainst: number;
  tries: number;
  tablePoints: number;
};

type Hud = {
  score: [number, number];
  seconds: number;
  half: 1 | 2;
  halftime: boolean;
  paused: boolean;
  over: boolean;
  message: string;
  stamina: number[];
  jerseys: number[];
  names: string[];
  bench: RosterPlayer[];
  substitutesLeft: number;
};

type AimPoint = {
  active: boolean;
  x: number;
  y: number;
};

type FullscreenDocument = Document & {
  webkitExitFullscreen?: () => Promise<void> | void;
  webkitFullscreenElement?: Element | null;
};

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};

const METRE_SCALE = 10;
const FIELD_OF_PLAY_METRES = 100;
const PITCH_WIDTH_METRES = 70;
const IN_GOAL_METRES = 10;
const FIELD_W = (FIELD_OF_PLAY_METRES + IN_GOAL_METRES * 2) * METRE_SCALE;
const FIELD_H = PITCH_WIDTH_METRES * METRE_SCALE;
const TRY_LINE = IN_GOAL_METRES * METRE_SCALE;
const RIGHT_TRY_LINE = FIELD_W - TRY_LINE;
const LEFT_22 = TRY_LINE + 22 * METRE_SCALE;
const RIGHT_22 = RIGHT_TRY_LINE - 22 * METRE_SCALE;
const CENTRE_Y = FIELD_H / 2;
const PLAYER_RADIUS = 17;
const HALF_SECONDS = 60;
const PLAYERS_PER_SIDE = 7;
const SQUAD_SIZE = 12;
const MID_SLOT = Math.floor(PLAYERS_PER_SIDE / 2);
const SWEEPER_SLOT = 6;
const REPLACEMENTS_PER_SIDE = 5;
const SCORE_CROWD_DELAY_MS = 1150;
const SCORE_RESTART_SECONDS = 3;
const CAMPAIGN_STORAGE_KEY = "rugby-br-26-championship-v1";
const NEUTRAL_SKILLS: PlayerSkills = {
  overall: 65,
  speed: 68,
  tackle: 68,
  pass: 68,
  kick: 60,
  stamina: 70,
  attack: 68,
  confidence: "base",
};

const TEAMS: Team[] = [
  { id: "farrapos", name: "Farrapos", state: "RS", division: 1, group: "Grupo A", primary: "#7d1731", secondary: "#f2c84b", short: "FAR", logo: "/clubs/farrapos.png", pattern: "hoops" },
  { id: "charrua", name: "Charrua", state: "RS", division: 1, group: "Grupo A", primary: "#151515", secondary: "#e6a62d", short: "CHA", logo: "/clubs/charrua.jpg", pattern: "hoops" },
  { id: "joaca", name: "Joaca", state: "SC", division: 1, group: "Grupo A", primary: "#184b9b", secondary: "#ed553b", short: "JOA", logo: "/clubs/joaca.png", pattern: "quarters" },
  { id: "desterro", name: "Desterro", state: "SC", division: 1, group: "Grupo A", primary: "#146b45", secondary: "#f1f0da", short: "DES", logo: "/clubs/desterro.jpeg", pattern: "hoops" },
  { id: "poli", name: "Poli", state: "SP", division: 1, group: "Grupo B", primary: "#12284c", secondary: "#f3c74f", short: "POL", logo: "/clubs/poli.png", pattern: "hoops" },
  { id: "sao-jose", name: "São José", state: "SP", division: 1, group: "Grupo B", primary: "#111111", secondary: "#f0c12b", short: "SJC", logo: "/clubs/sao-jose.png", pattern: "sash" },
  { id: "tornados", name: "Tornados Indaiatuba", state: "SP", division: 1, group: "Grupo B", primary: "#1c59ad", secondary: "#d7eefb", short: "TOR", logo: "/clubs/tornados.png", pattern: "quarters" },
  { id: "rio-branco", name: "Rio Branco", state: "SP", division: 1, group: "Grupo B", primary: "#efeee7", secondary: "#1e1e1e", short: "RBR", logo: "/clubs/rio-branco.png", pattern: "sash" },
  { id: "jacarei", name: "Jacareí", state: "SP", division: 1, group: "Grupo C", primary: "#e86c23", secondary: "#172d55", short: "JAC", logo: "/clubs/jacarei.png", pattern: "hoops" },
  { id: "spac", name: "SPAC", state: "SP", division: 1, group: "Grupo C", primary: "#bd2636", secondary: "#f3eee2", short: "SPA", logo: "/clubs/spac.png", pattern: "hoops" },
  { id: "pasteur", name: "Pasteur", state: "SP", division: 1, group: "Grupo C", primary: "#2563a9", secondary: "#f4f4ed", short: "PAS", logo: "/clubs/pasteur.jpg", pattern: "hoops" },
  { id: "nova-lima", name: "Nova Lima", state: "MG", division: 1, group: "Grupo C", primary: "#28225f", secondary: "#df385b", short: "NOL", logo: "/clubs/nova-lima.png", pattern: "quarters" },
  { id: "brummers", name: "Brummers", state: "RS", division: 2, group: "Taça RS–SC", primary: "#b62c38", secondary: "#191919", short: "BRU", logo: "/clubs/brummers.jpeg", pattern: "hoops" },
  { id: "colonos", name: "Colonos", state: "RS", division: 2, group: "Taça RS–SC", primary: "#176847", secondary: "#ebe7cd", short: "COL", logo: "/clubs/colonos.jpg", pattern: "sash" },
  { id: "serra-gaucha", name: "Serra Gaúcha", state: "RS", division: 2, group: "Taça RS–SC", primary: "#6e1f3d", secondary: "#e9b749", short: "SEG", logo: "/clubs/serra-gaucha.png", pattern: "hoops" },
  { id: "joinville", name: "Joinville", state: "SC", division: 2, group: "Taça RS–SC", primary: "#163e77", secondary: "#58a7d7", short: "JOI", logo: "/clubs/joinville.png", pattern: "quarters" },
  { id: "pe-vermelho", name: "Pé Vermelho", state: "PR", division: 2, group: "Taça PR–SP", primary: "#9f2033", secondary: "#151515", short: "PVE", logo: "/clubs/pe-vermelho.png", pattern: "sash" },
  { id: "leoes", name: "Leões de Paraisópolis", state: "SP", division: 2, group: "Taça PR–SP", primary: "#146c48", secondary: "#f19b35", short: "LEO", logo: "/clubs/leoes.jpg", pattern: "hoops" },
  { id: "urutu", name: "Urutu", state: "SP", division: 2, group: "Taça PR–SP", primary: "#b9292f", secondary: "#f4c33d", short: "URU", logo: "/clubs/urutu.png", pattern: "sash" },
  { id: "iguanas", name: "Iguanas SJC", state: "SP", division: 2, group: "Taça PR–SP", primary: "#2c7b3f", secondary: "#d8e85c", short: "IGU", logo: "/clubs/iguanas.jpg", pattern: "quarters" },
  { id: "niteroi", name: "Niterói", state: "RJ", division: 2, group: "Taça RJ–MG–ES", primary: "#be2737", secondary: "#1b1b1b", short: "NIT", logo: "/clubs/niteroi.jpg", pattern: "hoops" },
  { id: "rio", name: "Rio", state: "RJ", division: 2, group: "Taça RJ–MG–ES", primary: "#1d1d1d", secondary: "#e1a627", short: "RIO", logo: "/clubs/rio.png", pattern: "sash" },
  { id: "carioca", name: "Carioca", state: "RJ", division: 2, group: "Taça RJ–MG–ES", primary: "#123c73", secondary: "#71b8d6", short: "CAR", logo: "/clubs/carioca.png", pattern: "hoops" },
  { id: "vitoria", name: "Vitória", state: "ES", division: 2, group: "Taça RJ–MG–ES", primary: "#b32937", secondary: "#f1e8d5", short: "VIT", logo: "/clubs/vitoria.jpg", pattern: "quarters" },
];

function teamById(teamId: string) {
  return TEAMS.find((team) => team.id === teamId) ?? TEAMS[0];
}

function bestSquadIndexes(players: RosterPlayer[]) {
  return players
    .map((player, index) => ({ player, index }))
    .sort(
      (a, b) =>
        b.player.skills.overall - a.player.skills.overall ||
        b.player.stats.appearances - a.player.stats.appearances ||
        a.player.name.localeCompare(b.player.name, "pt-BR"),
    )
    .slice(0, SQUAD_SIZE)
    .map(({ index }) => index);
}

function squadOverall(players: RosterPlayer[]) {
  if (!players.length) return 0;
  return Math.round(players.reduce((total, player) => total + player.skills.overall, 0) / players.length);
}

function teamRosterOverall(teamId: string) {
  const roster = ROSTERS_2026[teamId]?.players ?? [];
  return squadOverall(bestSquadIndexes(roster).map((index) => roster[index]).filter(Boolean));
}

function officialTeamForm(teamId: string) {
  return OFFICIAL_RESULTS_2026.reduce(
    (form, result) => {
      const isHome = result.homeId === teamId;
      const isAway = result.awayId === teamId;
      if (!isHome && !isAway) return form;
      const scored = isHome ? result.homeScore : result.awayScore;
      const conceded = isHome ? result.awayScore : result.homeScore;
      form.played += 1;
      form.pointsFor += scored;
      form.pointsAgainst += conceded;
      if (scored > conceded) form.wins += 1;
      else if (scored === conceded) form.draws += 1;
      else form.losses += 1;
      return form;
    },
    { played: 0, wins: 0, draws: 0, losses: 0, pointsFor: 0, pointsAgainst: 0 },
  );
}

function officialFormBonus(teamId: string) {
  const form = officialTeamForm(teamId);
  if (!form.played) return 0;
  const winRate = (form.wins + form.draws * 0.5) / form.played;
  const scoreBalance = (form.pointsFor - form.pointsAgainst) / form.played;
  const sample = Math.min(1, form.played / 3);
  return clamp((winRate - 0.5) * 8 + clamp(scoreBalance / 18, -2.5, 2.5), -5, 5) * sample;
}

function teamStrength(teamId: string) {
  const rosterOverall = teamRosterOverall(teamId);
  return (rosterOverall || 65) + officialFormBonus(teamId);
}

function signedRating(value: number) {
  const rounded = Math.round(value * 10) / 10;
  return `${rounded > 0 ? "+" : ""}${String(rounded).replace(".", ",")}`;
}

function hasClearTryLane(match: Match, carrier: Player) {
  const direction = attackDirection(match, carrier.side);
  return !match.players.some((defender) => {
    if (defender.side === carrier.side || defender.stun > 0) return false;
    const forwardDistance = (defender.x - carrier.x) * direction;
    return forwardDistance > 4 && forwardDistance < 320 && Math.abs(defender.y - carrier.y) < 105;
  });
}

function attackDirection(match: Pick<Match, "half">, side: 0 | 1): -1 | 1 {
  const homeDirection = match.half === 1 ? 1 : -1;
  return (side === 0 ? homeDirection : -homeDirection) as -1 | 1;
}

function hasBrokenDefensiveLine(match: Match, carrier: Player, defendingSide: 0 | 1) {
  if (carrier.side === defendingSide) return false;
  const firstLine = match.players.filter(
    (defender) =>
      defender.side === defendingSide &&
      defender.slot !== SWEEPER_SLOT &&
      defender.stun <= 0,
  );
  if (!firstLine.length) return true;
  const defendingDirection = attackDirection(match, defendingSide);
  const goalSideDefenders = firstLine.filter(
    (defender) => (defender.x - carrier.x) * defendingDirection < -10,
  );
  const passedDefenders = firstLine.length - goalSideDefenders.length;
  const coverInChannel = goalSideDefenders.some(
    (defender) => Math.abs(defender.y - carrier.y) < 105 && distance(defender, carrier) < 145,
  );
  return passedDefenders >= Math.ceil(firstLine.length * 0.6) && !coverInChannel;
}

function chooseOpenEdge(match: Match, attackingSide: 0 | 1): -1 | 1 {
  const direction = attackDirection(match, attackingSide);
  const defenders = match.players.filter(
    (player) => player.side !== attackingSide && player.stun <= 0,
  );
  const pressure = (edge: -1 | 1) => defenders.reduce((total, defender) => {
    const edgeY = edge === -1 ? 70 : FIELD_H - 70;
    const lateralPressure = Math.max(0, 1 - Math.abs(defender.y - edgeY) / 260);
    const carrier = match.ball.owner;
    const isAhead = carrier ? (defender.x - carrier.x) * direction > -30 : true;
    return total + lateralPressure * (isAhead ? 1 : 0.25);
  }, 0);
  return pressure(-1) <= pressure(1) ? -1 : 1;
}

function isGoalLineWall(match: Match, defendingSide: 0 | 1, carrier: Player | null) {
  if (!carrier || carrier.side === defendingSide) return false;
  const direction = attackDirection(match, defendingSide);
  const ownTryLine = direction === 1 ? TRY_LINE : RIGHT_TRY_LINE;
  const distanceInsideField = (carrier.x - ownTryLine) * direction;
  return distanceInsideField >= -8 && distanceInsideField <= 22 * METRE_SCALE;
}

function simulateFixture(fixture: ChampionshipFixture): ChampionshipResult {
  const homeStrength = teamStrength(fixture.homeId) + 1.4;
  const awayStrength = teamStrength(fixture.awayId);
  const homeTries = clamp(Math.round(1.3 + (homeStrength - awayStrength) * 0.14 + Math.random() * 3.2), 0, 7);
  const awayTries = clamp(Math.round(1.1 + (awayStrength - homeStrength) * 0.14 + Math.random() * 3.2), 0, 7);
  const score = (tries: number, kickSkill: number) => {
    const conversions = Array.from({ length: tries }).filter(() => Math.random() < 0.28 + kickSkill * 0.004).length;
    const penalty = Math.random() < 0.16 ? 3 : 0;
    return tries * 5 + conversions * 2 + penalty;
  };
  return {
    fixtureId: fixture.id,
    phase: fixture.phase,
    homeId: fixture.homeId,
    awayId: fixture.awayId,
    homeScore: score(homeTries, homeStrength),
    awayScore: score(awayTries, awayStrength),
    homeTries,
    awayTries,
  };
}

function calculateStandings(
  teamIds: string[],
  phase: ChampionshipPhase,
  results: ChampionshipResult[],
) {
  const table = new Map<string, Standing>(
    teamIds.map((teamId) => [teamId, {
      teamId,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      pointsFor: 0,
      pointsAgainst: 0,
      tries: 0,
      tablePoints: 0,
    }]),
  );

  results.filter((result) => result.phase === phase).forEach((result) => {
    const home = table.get(result.homeId);
    const away = table.get(result.awayId);
    if (!home || !away) return;
    home.played += 1;
    away.played += 1;
    home.pointsFor += result.homeScore;
    home.pointsAgainst += result.awayScore;
    away.pointsFor += result.awayScore;
    away.pointsAgainst += result.homeScore;
    home.tries += result.homeTries;
    away.tries += result.awayTries;
    if (result.homeScore > result.awayScore) {
      home.won += 1;
      away.lost += 1;
      home.tablePoints += 4;
      if (result.homeScore - result.awayScore <= 7) away.tablePoints += 1;
    } else if (result.homeScore < result.awayScore) {
      away.won += 1;
      home.lost += 1;
      away.tablePoints += 4;
      if (result.awayScore - result.homeScore <= 7) home.tablePoints += 1;
    } else {
      home.drawn += 1;
      away.drawn += 1;
      home.tablePoints += 2;
      away.tablePoints += 2;
    }
    if (result.homeTries >= 4) home.tablePoints += 1;
    if (result.awayTries >= 4) away.tablePoints += 1;
  });

  return [...table.values()].sort(
    (a, b) =>
      b.tablePoints - a.tablePoints ||
      (b.pointsFor - b.pointsAgainst) - (a.pointsFor - a.pointsAgainst) ||
      b.tries - a.tries ||
      b.pointsFor - a.pointsFor ||
      a.teamId.localeCompare(b.teamId),
  );
}

function phaseLabel(phase: ChampionshipPhase) {
  if (phase === "groups") return "Fase de grupos";
  if (phase === "hexagonal") return "Hexagonal final";
  if (phase === "repechage") return "Repescagem";
  return "Final";
}

function divisionQualification(
  division: Division,
  results?: ChampionshipResult[],
) {
  const fixtures = OFFICIAL_GROUP_FIXTURES.filter((fixture) => fixture.division === division);
  const groupResults = results ?? fixtures.map(simulateFixture);
  const groupNames = Array.from(new Set(fixtures.map((fixture) => fixture.group)));
  const topTwo: string[] = [];
  const bottomTwo: string[] = [];
  groupNames.forEach((group) => {
    const ids = TEAMS.filter((team) => team.division === division && team.group === group).map((team) => team.id);
    const standings = calculateStandings(ids, "groups", groupResults);
    topTwo.push(...standings.slice(0, 2).map((standing) => standing.teamId));
    bottomTwo.push(...standings.slice(2).map((standing) => standing.teamId));
  });
  return { topTwo, bottomTwo };
}

function advanceCampaign(
  campaign: ChampionshipCampaign,
  playedResult: ChampionshipResult,
): ChampionshipCampaign {
  const existingIds = new Set(campaign.results.map((result) => result.fixtureId));
  existingIds.add(playedResult.fixtureId);
  const playedFixture = campaign.fixtures.find((fixture) => fixture.id === playedResult.fixtureId);
  if (!playedFixture) return campaign;
  const roundCompanions = campaign.fixtures
    .filter(
      (fixture) =>
        fixture.phase === playedFixture.phase &&
        fixture.round === playedFixture.round &&
        !existingIds.has(fixture.id),
    )
    .map(simulateFixture);
  const results = [...campaign.results, playedResult, ...roundCompanions];
  const phaseFixtures = campaign.fixtures.filter((fixture) => fixture.phase === playedFixture.phase);
  const phaseComplete = phaseFixtures.every((fixture) => results.some((result) => result.fixtureId === fixture.id));
  if (!phaseComplete) return { ...campaign, results };

  if (playedFixture.phase === "groups") {
    const ownDivisionResults = results.filter((result) => result.phase === "groups");
    const firstDivision = campaign.division === 1
      ? divisionQualification(1, ownDivisionResults)
      : divisionQualification(1);
    const secondDivision = campaign.division === 2
      ? divisionQualification(2, ownDivisionResults)
      : divisionQualification(2);

    if (campaign.division === 1 && firstDivision.topTwo.includes(campaign.teamId)) {
      const nextFixtures = createRoundRobinFixtures(firstDivision.topTwo, "hexagonal", 1);
      return { ...campaign, status: "hexagonal", fixtures: [...campaign.fixtures, ...nextFixtures], results };
    }
    if (
      (campaign.division === 1 && firstDivision.bottomTwo.includes(campaign.teamId)) ||
      (campaign.division === 2 && secondDivision.topTwo.includes(campaign.teamId))
    ) {
      const repechageTeams = [...firstDivision.bottomTwo, ...secondDivision.topTwo];
      const nextFixtures = createRoundRobinFixtures(repechageTeams, "repechage", campaign.division);
      return { ...campaign, status: "repechage", fixtures: [...campaign.fixtures, ...nextFixtures], results };
    }
    return { ...campaign, status: "eliminated", results };
  }

  const phaseTeamIds = Array.from(new Set(phaseFixtures.flatMap((fixture) => [fixture.homeId, fixture.awayId])));
  const standings = calculateStandings(phaseTeamIds, playedFixture.phase, results);
  if (playedFixture.phase === "hexagonal") {
    const finalists = standings.slice(0, 2).map((standing) => standing.teamId);
    if (!finalists.includes(campaign.teamId)) return { ...campaign, status: "eliminated", results };
    const final = createFinalFixture(finalists[0], finalists[1], 1);
    return { ...campaign, status: "final", fixtures: [...campaign.fixtures, final], results };
  }
  if (playedFixture.phase === "repechage") {
    const promoted = standings.slice(0, 2).some((standing) => standing.teamId === campaign.teamId);
    return { ...campaign, status: promoted ? "promoted" : "repechage-complete", results };
  }

  const finalResult = results.find((result) => result.fixtureId === playedFixture.id)!;
  const winnerId = finalResult.homeScore > finalResult.awayScore ? finalResult.homeId : finalResult.awayId;
  return { ...campaign, status: winnerId === campaign.teamId ? "champion" : "runner-up", results };
}

const keyState = new Set<string>();
type CachedPlayerPhoto = {
  image: HTMLImageElement;
  status: "loading" | "ready" | "error";
};
const playerPhotoCache = new Map<string, CachedPlayerPhoto>();

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function haptic(duration = 10) {
  if (typeof navigator !== "undefined") {
    navigator.vibrate?.(duration);
  }
}

function formatClock(seconds: number) {
  const safe = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
}

function rosterRole(number?: number) {
  if (!number) return "Atleta do elenco";
  if (number <= 3) return "Primeira linha";
  if (number <= 5) return "Segunda linha";
  if (number <= 8) return "Terceira linha";
  if (number === 9) return "Scrum-half";
  if (number === 10) return "Abertura";
  if (number === 11 || number === 14) return "Ponta";
  if (number === 12 || number === 13) return "Centro";
  if (number === 15) return "Fullback";
  return "Reserva no XV";
}

function playerInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return `${parts[0]?.[0] ?? "?"}${parts.length > 1 ? parts.at(-1)?.[0] ?? "" : ""}`.toUpperCase();
}

function playerDisplayName(player: RosterPlayer) {
  return player.nickname?.trim() || player.name;
}

function attributeFactor(value: number) {
  return 0.68 + value * 0.0045;
}

function staminaDrainFactor(player: Player) {
  return 1.2 - player.skills.stamina * 0.004;
}

function dropRangeThreshold(player: Player) {
  return FIELD_W * (0.6 - player.skills.kick * 0.0014);
}

function canAttemptDrop(match: Match, player: Player) {
  const threshold = dropRangeThreshold(player);
  return attackDirection(match, player.side) === 1
    ? player.x >= threshold
    : player.x <= FIELD_W - threshold;
}

function publicAsset(path: string) {
  return path.replace(/^\/+/, "");
}

function getPlayerPhoto(source?: string) {
  if (!source || typeof Image === "undefined") return null;
  const existing = playerPhotoCache.get(source);
  if (existing) return existing.status === "ready" ? existing.image : null;

  const image = new Image();
  const cached: CachedPlayerPhoto = { image, status: "loading" };
  image.referrerPolicy = "no-referrer";
  image.onload = () => { cached.status = "ready"; };
  image.onerror = () => { cached.status = "error"; };
  image.src = source;
  playerPhotoCache.set(source, cached);
  return null;
}

function makePlayers(homeSquad: RosterPlayer[], awaySquad: RosterPlayer[]): Player[] {
  const lanes = Array.from(
    { length: PLAYERS_PER_SIDE },
    (_, slot) => 80 + slot * ((FIELD_H - 160) / (PLAYERS_PER_SIDE - 1)),
  );
  return [
    ...lanes.map((y, slot) => {
      const athlete = homeSquad[slot];
      return {
        id: slot,
        name: athlete ? playerDisplayName(athlete) : `Atleta ${slot + 1}`,
        photo: athlete?.photo,
        skills: athlete?.skills ?? NEUTRAL_SKILLS,
        side: 0 as const,
        slot,
        x: TRY_LINE + 210 - Math.abs(MID_SLOT - slot) * 14,
        y,
        stun: 0,
        tackleLock: 0,
        stamina: 100,
        jersey: athlete?.number ?? slot + 1,
        routeX: 0,
        routeY: 0,
        routeTime: 0,
      };
    }),
    ...lanes.map((y, slot) => {
      const athlete = awaySquad[slot];
      return {
        id: slot + PLAYERS_PER_SIDE,
        name: athlete ? playerDisplayName(athlete) : `Atleta ${slot + 1}`,
        photo: athlete?.photo,
        skills: athlete?.skills ?? NEUTRAL_SKILLS,
        side: 1 as const,
        slot,
        x: RIGHT_TRY_LINE - 210 + Math.abs(MID_SLOT - slot) * 14,
        y,
        stun: 0,
        tackleLock: 0,
        stamina: 100,
        jersey: athlete?.number ?? slot + 1,
        routeX: 0,
        routeY: 0,
        routeTime: 0,
      };
    }),
  ];
}

function arrangeRestart(match: Match, kickingSide: 0 | 1) {
  const { players } = match;
  const direction = attackDirection(match, kickingSide);
  players.forEach((player) => {
    const lane = 80 + player.slot * ((FIELD_H - 160) / (PLAYERS_PER_SIDE - 1));
    const isKicker = player.side === kickingSide && player.slot === MID_SLOT;
    const isRestartFullback = player.side === kickingSide && player.slot === SWEEPER_SLOT;
    player.x = player.side === kickingSide
      ? isKicker
        ? FIELD_W / 2 - direction * 8
        : isRestartFullback
          ? FIELD_W / 2 - direction * 190
          : FIELD_W / 2 - direction * (56 + Math.abs(player.slot - MID_SLOT) * 12)
      : FIELD_W / 2 + direction * (230 + Math.abs(player.slot - MID_SLOT) * 10);
    player.y = lane;
    player.stun = 0;
    player.tackleLock = 0;
    player.routeTime = 0;
  });
}

function freshMatch(homeSquad: RosterPlayer[], awaySquad: RosterPlayer[], homeTeamId: string, awayTeamId: string): Match {
  const players = makePlayers(homeSquad, awaySquad);
  const match: Match = {
    players,
    bench: [homeSquad.slice(PLAYERS_PER_SIDE), awaySquad.slice(PLAYERS_PER_SIDE)],
    ball: {
      x: FIELD_W / 2,
      y: CENTRE_Y,
      vx: 0,
      vy: 0,
      owner: null,
      target: null,
      air: 0,
      flightDuration: 0,
      kind: "held",
    },
    score: [0, 0],
    tries: [0, 0],
    formBoost: [officialFormBonus(homeTeamId), officialFormBonus(awayTeamId)],
    seconds: HALF_SECONDS,
    half: 1,
    halftime: false,
    running: true,
    over: false,
    paused: false,
    lastFrame: performance.now(),
    actionLock: 0,
    cpuActionLock: 0.7,
    kickoff: 1.15,
    restartSide: 0,
    restartReceivingSide: 1,
    whistleOnKickoff: true,
    fullbackSide: 0,
    looseBallSeconds: 0,
    attackPlay: null,
    blockWindow: 0,
    substitutesLeft: [
      Math.min(REPLACEMENTS_PER_SIDE, Math.max(0, homeSquad.length - PLAYERS_PER_SIDE)),
      Math.min(REPLACEMENTS_PER_SIDE, Math.max(0, awaySquad.length - PLAYERS_PER_SIDE)),
    ],
    message: "Drop-kick inicial: seu time chuta",
    messageUntil: 2,
  };
  arrangeRestart(match, 0);
  const firstKicker = match.players.find(
    (player) => player.side === 0 && player.slot === MID_SLOT,
  );
  if (firstKicker) {
    match.ball.x = firstKicker.x;
    match.ball.y = firstKicker.y;
    match.ball.owner = firstKicker;
  }
  return match;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(x, y, width, height, radius);
    return;
  }
  ctx.rect(x, y, width, height);
}

function drawField(
  ctx: CanvasRenderingContext2D,
  match: Match,
  home: Team,
  away: Team,
  now: number,
  aim: AimPoint,
  simulated: boolean,
) {
  ctx.clearRect(0, 0, FIELD_W, FIELD_H);

  const turf = ctx.createLinearGradient(0, 0, FIELD_W, FIELD_H);
  turf.addColorStop(0, "#0a5f49");
  turf.addColorStop(0.5, "#0b7256");
  turf.addColorStop(1, "#09513f");
  ctx.fillStyle = turf;
  ctx.fillRect(0, 0, FIELD_W, FIELD_H);

  for (let x = 0; x < FIELD_W; x += METRE_SCALE * 10) {
    ctx.fillStyle = (x / (METRE_SCALE * 10)) % 2 === 0 ? "rgba(255,255,255,.022)" : "rgba(0,0,0,.025)";
    ctx.fillRect(x, 0, METRE_SCALE * 10, FIELD_H);
  }

  ctx.fillStyle = "rgba(3, 25, 18, .1)";
  ctx.fillRect(0, 0, TRY_LINE, FIELD_H);
  ctx.fillRect(RIGHT_TRY_LINE, 0, TRY_LINE, FIELD_H);

  const solidVertical = (x: number) => {
    ctx.beginPath();
    ctx.moveTo(x, 2);
    ctx.lineTo(x, FIELD_H - 2);
    ctx.stroke();
  };

  ctx.strokeStyle = "rgba(239,255,241,.9)";
  ctx.lineWidth = 3;
  ctx.strokeRect(2, 2, FIELD_W - 4, FIELD_H - 4);
  [TRY_LINE, LEFT_22, FIELD_W / 2, RIGHT_22, RIGHT_TRY_LINE].forEach(solidVertical);

  ctx.strokeStyle = "rgba(239,255,241,.82)";
  ctx.lineWidth = 3;
  ctx.setLineDash([METRE_SCALE * 5, METRE_SCALE * 5]);
  [
    TRY_LINE + 5 * METRE_SCALE,
    FIELD_W / 2 - 10 * METRE_SCALE,
    FIELD_W / 2 + 10 * METRE_SCALE,
    RIGHT_TRY_LINE - 5 * METRE_SCALE,
  ].forEach((x) => {
    ctx.beginPath();
    ctx.moveTo(x, 2);
    ctx.lineTo(x, FIELD_H - 2);
    ctx.stroke();
  });
  [
    5 * METRE_SCALE,
    15 * METRE_SCALE,
    FIELD_H - 15 * METRE_SCALE,
    FIELD_H - 5 * METRE_SCALE,
  ].forEach((y) => {
    ctx.beginPath();
    ctx.moveTo(2, y);
    ctx.lineTo(FIELD_W - 2, y);
    ctx.stroke();
  });
  ctx.setLineDash([]);

  ctx.fillStyle = "rgba(242,255,244,.72)";
  ctx.font = "900 12px ui-sans-serif, system-ui";
  ctx.textAlign = "left";
  ctx.fillText("5 m", FIELD_W / 2 + 12, 5 * METRE_SCALE - 8);
  ctx.fillText("15 m", FIELD_W / 2 + 12, 15 * METRE_SCALE - 8);
  ctx.fillText("15 m", FIELD_W / 2 + 12, FIELD_H - 15 * METRE_SCALE - 8);
  ctx.fillText("5 m", FIELD_W / 2 + 12, FIELD_H - 5 * METRE_SCALE - 8);
  ctx.save();
  ctx.translate(TRY_LINE + 5 * METRE_SCALE - 8, CENTRE_Y - 10);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("5 m da linha de try", 0, 0);
  ctx.restore();
  ctx.save();
  ctx.translate(RIGHT_TRY_LINE - 5 * METRE_SCALE + 8, CENTRE_Y + 10);
  ctx.rotate(Math.PI / 2);
  ctx.fillText("5 m da linha de try", 0, 0);
  ctx.restore();

  // World Rugby requires a 0.5 m mark through the centre of halfway.
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(FIELD_W / 2 - METRE_SCALE * 0.25, CENTRE_Y);
  ctx.lineTo(FIELD_W / 2 + METRE_SCALE * 0.25, CENTRE_Y);
  ctx.stroke();

  ctx.fillStyle = "rgba(235,255,242,.58)";
  ctx.font = "800 24px ui-sans-serif, system-ui";
  ctx.textAlign = "center";
  ctx.save();
  ctx.translate(38, CENTRE_Y);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("IN-GOAL · 10 m", 0, 0);
  ctx.restore();
  ctx.save();
  ctx.translate(FIELD_W - 38, CENTRE_Y);
  ctx.rotate(Math.PI / 2);
  ctx.fillText("IN-GOAL · 10 m", 0, 0);
  ctx.restore();

  ctx.fillStyle = "rgba(235,255,242,.42)";
  ctx.font = "900 14px ui-sans-serif, system-ui";
  ctx.fillText("22", LEFT_22, 25);
  ctx.fillText("22", RIGHT_22, 25);
  ctx.fillText("10", FIELD_W / 2 - 10 * METRE_SCALE, 25);
  ctx.fillText("10", FIELD_W / 2 + 10 * METRE_SCALE, 25);
  ctx.fillText("100 × 70 m", FIELD_W / 2, FIELD_H - 18);

  const homeIsOnLeft = attackDirection(match, 0) === 1;
  const leftTeam = homeIsOnLeft ? home : away;
  const rightTeam = homeIsOnLeft ? away : home;
  const leftTerritoryX = (LEFT_22 + (FIELD_W / 2 - 10 * METRE_SCALE)) / 2;
  const rightTerritoryX = (RIGHT_22 + (FIELD_W / 2 + 10 * METRE_SCALE)) / 2;
  const drawTerritoryName = (team: Team, x: number) => {
    const maxWidth = 170;
    ctx.save();
    ctx.globalAlpha = 0.72;
    ctx.font = "950 22px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.lineWidth = 7;
    ctx.strokeStyle = team.primary;
    ctx.strokeText(team.name.toUpperCase(), x, FIELD_H - 54, maxWidth);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(2, 18, 13, .9)";
    ctx.strokeText(team.name.toUpperCase(), x, FIELD_H - 54, maxWidth);
    ctx.fillStyle = "rgba(247, 255, 247, .94)";
    ctx.fillText(team.name.toUpperCase(), x, FIELD_H - 54, maxWidth);
    ctx.fillStyle = team.secondary;
    ctx.fillRect(x - 38, FIELD_H - 46, 76, 4);
    ctx.restore();
  };
  drawTerritoryName(leftTeam, leftTerritoryX);
  drawTerritoryName(rightTeam, rightTerritoryX);

  const post = (x: number) => {
    const halfGap = 2.8 * METRE_SCALE;
    [CENTRE_Y - halfGap, CENTRE_Y + halfGap].forEach((y) => {
      ctx.fillStyle = "rgba(0,0,0,.22)";
      ctx.beginPath();
      ctx.arc(x + 3, y + 3, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#f6f1c9";
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#dfff49";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  };
  post(TRY_LINE);
  post(RIGHT_TRY_LINE);

  const flag = (x: number, y: number, downward: boolean) => {
    const flagY = downward ? y + 13 : y - 13;
    ctx.strokeStyle = "#f0f3dc";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, flagY);
    ctx.stroke();
    ctx.fillStyle = "#ff6a3d";
    ctx.beginPath();
    ctx.moveTo(x, flagY);
    ctx.lineTo(x + 9, flagY + (downward ? 4 : -4));
    ctx.lineTo(x, flagY + (downward ? 8 : -8));
    ctx.closePath();
    ctx.fill();
  };
  [0, TRY_LINE, RIGHT_TRY_LINE, FIELD_W].forEach((x) => {
    flag(clamp(x, 3, FIELD_W - 3), 3, true);
    flag(clamp(x, 3, FIELD_W - 3), FIELD_H - 3, false);
  });
  [LEFT_22, FIELD_W / 2, RIGHT_22].forEach((x) => {
    flag(x, 3, true);
    flag(x, FIELD_H - 3, false);
  });

  const owner = match.ball.owner;
  const controlled = simulated
    ? null
    : owner?.side === 0
      ? owner
      : match.players
          .filter((player) => player.side === 0)
          .sort((a, b) => distance(a, match.ball) - distance(b, match.ball))[0];

  match.players.forEach((player) => {
    const team = player.side === 0 ? home : away;
    const isControlled = player === controlled;
    const isPassOption =
      !simulated &&
      match.ball.owner?.side === 0 &&
      player.side === 0 &&
      player !== match.ball.owner &&
      player.stun <= 0 &&
      (player.x - match.ball.owner.x) * attackDirection(match, 0) <= 4;
    const pulse = 1 + Math.sin(now / 120) * 0.08;

    if (isPassOption && !match.over) {
      ctx.strokeStyle = "rgba(126, 231, 255, .88)";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(player.x, player.y, PLAYER_RADIUS + 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    if (isControlled && !match.over) {
      ctx.strokeStyle = "#efff4a";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(player.x, player.y, (PLAYER_RADIUS + 10) * pulse, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.fillStyle = "rgba(0,0,0,.2)";
    ctx.beginPath();
    ctx.ellipse(player.x + 4, player.y + 11, 20, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.arc(player.x, player.y, PLAYER_RADIUS, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = player.stun > 0 ? "#718079" : team.primary;
    ctx.fillRect(player.x - PLAYER_RADIUS, player.y - PLAYER_RADIUS, PLAYER_RADIUS * 2, PLAYER_RADIUS * 2);
    if (player.stun <= 0 && team.pattern === "hoops") {
      ctx.fillStyle = team.secondary;
      ctx.fillRect(player.x - PLAYER_RADIUS, player.y - 9, PLAYER_RADIUS * 2, 6);
      ctx.fillRect(player.x - PLAYER_RADIUS, player.y + 5, PLAYER_RADIUS * 2, 6);
    } else if (player.stun <= 0 && team.pattern === "sash") {
      ctx.strokeStyle = team.secondary;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(player.x - 18, player.y - 18);
      ctx.lineTo(player.x + 18, player.y + 18);
      ctx.stroke();
    } else if (player.stun <= 0 && team.pattern === "quarters") {
      ctx.fillStyle = team.secondary;
      ctx.fillRect(player.x, player.y - PLAYER_RADIUS, PLAYER_RADIUS, PLAYER_RADIUS);
      ctx.fillRect(player.x - PLAYER_RADIUS, player.y, PLAYER_RADIUS, PLAYER_RADIUS);
    }

    const photo = getPlayerPhoto(player.photo);
    if (photo) {
      const sourceSize = Math.min(photo.naturalWidth, photo.naturalHeight);
      const sourceX = (photo.naturalWidth - sourceSize) / 2;
      const sourceY = (photo.naturalHeight - sourceSize) / 2;
      ctx.globalAlpha = player.stun > 0 ? 0.48 : 1;
      ctx.drawImage(
        photo,
        sourceX,
        sourceY,
        sourceSize,
        sourceSize,
        player.x - PLAYER_RADIUS + 3,
        player.y - PLAYER_RADIUS + 3,
        (PLAYER_RADIUS - 3) * 2,
        (PLAYER_RADIUS - 3) * 2,
      );
      ctx.globalAlpha = 1;
    } else {
      ctx.fillStyle = player.stun > 0 ? "#d1dbd6" : team.secondary;
      ctx.font = "950 10px ui-sans-serif, system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(playerInitials(player.name), player.x, player.y);
    }
    ctx.restore();

    ctx.beginPath();
    ctx.arc(player.x, player.y, PLAYER_RADIUS, 0, Math.PI * 2);
    ctx.strokeStyle = team.primary;
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(player.x, player.y, PLAYER_RADIUS - 2.5, 0, Math.PI * 2);
    ctx.strokeStyle = team.secondary;
    ctx.lineWidth = 2;
    ctx.stroke();

    const staminaWidth = 30;
    ctx.fillStyle = "rgba(2,12,9,.66)";
    ctx.fillRect(player.x - staminaWidth / 2, player.y - 27, staminaWidth, 4);
    ctx.fillStyle = player.stamina < 28 ? "#ff6a3d" : player.stamina < 52 ? "#f2c84b" : "#dfff49";
    ctx.fillRect(player.x - staminaWidth / 2, player.y - 27, staminaWidth * (player.stamina / 100), 4);

    if (player.side === match.fullbackSide && player.slot === SWEEPER_SLOT) {
      ctx.fillStyle = "rgba(6,22,17,.82)";
      ctx.font = "900 9px ui-sans-serif, system-ui";
      ctx.textAlign = "center";
      ctx.fillText("FULLBACK", player.x, player.y - 34);
    }

    ctx.beginPath();
    ctx.arc(player.x + 12, player.y + 12, 7.5, 0, Math.PI * 2);
    ctx.fillStyle = team.primary;
    ctx.fill();
    ctx.strokeStyle = team.secondary;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.font = "950 8px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(player.jersey), player.x + 12, player.y + 12.5);
  });

  const ball = match.ball;
  const flightProgress =
    ball.flightDuration > 0 && ball.air > 0
      ? 1 - ball.air / ball.flightDuration
      : 0;
  const lift =
    ball.air > 0
      ? Math.sin(Math.PI * clamp(flightProgress, 0, 1)) * (ball.kind === "pass" ? 20 : 54)
      : 0;

  ctx.fillStyle = `rgba(0,0,0,${ball.air > 0 ? 0.12 : 0.2})`;
  ctx.beginPath();
  ctx.ellipse(ball.x + 3, ball.y + 7, 13 + lift * 0.08, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.translate(ball.x, ball.y - lift);
  ctx.rotate(Math.atan2(ball.vy, ball.vx) + now / 180);
  ctx.fillStyle = "#ead9b8";
  ctx.beginPath();
  ctx.ellipse(0, 0, 12, 7, 0, 0, Math.PI * 2);
    ctx.fill();
  ctx.strokeStyle = "#5f3825";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-4, 0);
  ctx.lineTo(4, 0);
  ctx.stroke();
  ctx.restore();

  if (aim.active && match.ball.owner?.side === 0 && !match.paused && !match.over) {
    const owner = match.ball.owner;
    ctx.strokeStyle = "rgba(223,255,73,.88)";
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 7]);
    ctx.beginPath();
    ctx.moveTo(owner.x, owner.y);
    ctx.lineTo(aim.x, aim.y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(aim.x, aim.y, 24, 0, Math.PI * 2);
    ctx.moveTo(aim.x - 34, aim.y);
    ctx.lineTo(aim.x + 34, aim.y);
    ctx.moveTo(aim.x, aim.y - 34);
    ctx.lineTo(aim.x, aim.y + 34);
    ctx.stroke();
    ctx.fillStyle = "#dfff49";
    ctx.font = "900 13px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.fillText("DROP", aim.x, aim.y - 42);
  }

  if (match.kickoff > 0) {
    ctx.fillStyle = "rgba(3,15,11,.5)";
    ctx.fillRect(0, 0, FIELD_W, FIELD_H);
  }

  if (match.paused || match.over) {
    ctx.fillStyle = "rgba(2,12,9,.68)";
    ctx.fillRect(0, 0, FIELD_W, FIELD_H);
    drawRoundedRect(ctx, FIELD_W / 2 - 190, FIELD_H / 2 - 62, 380, 124, 18);
    ctx.fillStyle = "rgba(8,29,22,.92)";
    ctx.fill();
    ctx.fillStyle = "#f2f6e9";
    ctx.font = "900 36px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.fillText(
      match.over ? "FIM DE JOGO" : match.halftime ? "INTERVALO" : "PAUSADO",
      FIELD_W / 2,
      FIELD_H / 2 - 5,
    );
    if (match.halftime) {
      ctx.font = "700 18px ui-sans-serif, system-ui";
      ctx.fillStyle = "#b9c9c0";
      ctx.fillText("2º tempo · reinício do adversário", FIELD_W / 2, FIELD_H / 2 + 30);
    }
    if (match.over) {
      ctx.font = "700 18px ui-sans-serif, system-ui";
      ctx.fillStyle = "#b9c9c0";
      const result =
        match.score[0] === match.score[1]
          ? "Empate — valeu cada tackle."
          : match.score[0] > match.score[1]
            ? `${home.name} venceu!`
            : `${away.name} venceu.`;
      ctx.fillText(result, FIELD_W / 2, FIELD_H / 2 + 30);
    }
  }
}

function TeamBadge({ team, large = false }: { team: Team; large?: boolean }) {
  return (
    <span
      className={`team-badge ${large ? "team-badge--large" : ""}`}
      style={{ "--team-a": team.primary, "--team-b": team.secondary } as React.CSSProperties}
      aria-hidden="true"
    >
      <img src={publicAsset(team.logo)} alt="" loading="lazy" />
      <small>{team.short}</small>
    </span>
  );
}

export function RugbyGame() {
  const [screen, setScreen] = useState<"setup" | "campaign" | "squad" | "match">("setup");
  const [gameMode, setGameMode] = useState<GameMode>("friendly");
  const [controlMode, setControlMode] = useState<ControlMode>("control");
  const [campaign, setCampaign] = useState<ChampionshipCampaign | null>(null);
  const [divisionFilter, setDivisionFilter] = useState<"all" | Division>(1);
  const [homeId, setHomeId] = useState("jacarei");
  const [awayId, setAwayId] = useState("farrapos");
  const [selectedRosterIndexes, setSelectedRosterIndexes] = useState<number[]>(
    () => bestSquadIndexes(ROSTERS_2026.jacarei.players),
  );
  const [simulationSpeed, setSimulationSpeed] = useState<1 | 2>(1);
  const [rosterQuery, setRosterQuery] = useState("");
  const [soundOn, setSoundOn] = useState(true);
  const [bestWins, setBestWins] = useState(0);
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const [aimingDrop, setAimingDrop] = useState(false);
  const [immersiveMode, setImmersiveMode] = useState(false);
  const [hud, setHud] = useState<Hud>({
    score: [0, 0],
    seconds: HALF_SECONDS,
    half: 1,
    halftime: false,
    paused: false,
    over: false,
    message: "",
    stamina: Array(PLAYERS_PER_SIDE).fill(100),
    jerseys: Array.from({ length: PLAYERS_PER_SIDE }, (_, slot) => slot + 1),
    names: Array.from({ length: PLAYERS_PER_SIDE }, (_, slot) => `Atleta ${slot + 1}`),
    bench: [],
    substitutesLeft: REPLACEMENTS_PER_SIDE,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const matchRef = useRef<Match | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastHudRef = useRef(0);
  const joystickKnobRef = useRef<HTMLSpanElement>(null);
  const joystickRef = useRef({ x: 0, y: 0, active: false });
  const actionRef = useRef({ sprint: false });
  const aimRef = useRef<AimPoint>({ active: false, x: FIELD_W - TRY_LINE, y: CENTRE_Y });
  const gestureRef = useRef({ active: false, x: 0, y: 0 });
  const audioRef = useRef<AudioContext | null>(null);
  const audioPrimedRef = useRef(false);
  const whistleBufferRef = useRef<AudioBuffer | null>(null);
  const whistleLoadRef = useRef<Promise<AudioBuffer | null> | null>(null);
  const soundOnRef = useRef(true);
  const controlModeRef = useRef<ControlMode>("control");
  const simulationSpeedRef = useRef<1 | 2>(1);

  const home = useMemo(() => TEAMS.find((team) => team.id === homeId) ?? TEAMS[0], [homeId]);
  const away = useMemo(() => TEAMS.find((team) => team.id === awayId) ?? TEAMS[1], [awayId]);
  const homeRoster = ROSTERS_2026[home.id];
  const awayRoster = ROSTERS_2026[away.id];
  const selectedSquad = useMemo(
    () => selectedRosterIndexes.map((index) => homeRoster.players[index]).filter(Boolean),
    [homeRoster, selectedRosterIndexes],
  );
  const selectedTeamOverall = useMemo(() => squadOverall(selectedSquad), [selectedSquad]);
  const strongestHomeIndexes = useMemo(() => bestSquadIndexes(homeRoster.players), [homeRoster]);
  const filteredRoster = useMemo(() => {
    const query = rosterQuery.trim().toLocaleLowerCase("pt-BR");
    return homeRoster.players
      .map((athlete, index) => ({ athlete, index }))
      .filter(({ athlete }) => {
        if (!query) return true;
        return [athlete.name, athlete.nickname]
          .filter(Boolean)
          .some((name) => name!.toLocaleLowerCase("pt-BR").includes(query));
      });
  }, [homeRoster, rosterQuery]);
  const homeRosterStats = useMemo(() => ({
    registered: homeRoster.players.filter((athlete) => athlete.registered2026).length,
    appeared: homeRoster.players.filter((athlete) => athlete.appeared2026).length,
  }), [homeRoster]);
  const visibleTeams = useMemo(
    () => TEAMS.filter((team) => divisionFilter === "all" || team.division === divisionFilter),
    [divisionFilter],
  );
  const campaignPhase = campaign?.status === "hexagonal"
    ? "hexagonal"
    : campaign?.status === "repechage"
      ? "repechage"
      : campaign?.status === "final"
        ? "final"
        : campaign?.results.at(-1)?.phase ?? "groups";
  const activeCampaignFixtures = useMemo(
    () => campaign?.fixtures.filter((fixture) => fixture.phase === campaignPhase) ?? [],
    [campaign, campaignPhase],
  );
  const currentCampaignFixture = useMemo(
    () => activeCampaignFixtures.find(
      (fixture) =>
        (fixture.homeId === campaign?.teamId || fixture.awayId === campaign?.teamId) &&
        !campaign?.results.some((result) => result.fixtureId === fixture.id),
    ) ?? null,
    [activeCampaignFixtures, campaign],
  );
  const campaignTeamIds = useMemo(() => {
    if (!campaign) return [];
    if (campaignPhase === "groups") {
      return TEAMS.filter((team) => team.division === campaign.division && team.group === campaign.group).map((team) => team.id);
    }
    return Array.from(new Set(activeCampaignFixtures.flatMap((fixture) => [fixture.homeId, fixture.awayId])));
  }, [activeCampaignFixtures, campaign, campaignPhase]);
  const campaignStandings = useMemo(
    () => campaign ? calculateStandings(campaignTeamIds, campaignPhase, campaign.results) : [],
    [campaign, campaignPhase, campaignTeamIds],
  );
  const campaignCalendar = useMemo(
    () => activeCampaignFixtures.filter(
      (fixture) => fixture.homeId === campaign?.teamId || fixture.awayId === campaign?.teamId,
    ),
    [activeCampaignFixtures, campaign],
  );

  useEffect(() => {
    controlModeRef.current = controlMode;
  }, [controlMode]);

  useEffect(() => {
    simulationSpeedRef.current = simulationSpeed;
  }, [simulationSpeed]);

  useEffect(() => {
    soundOnRef.current = soundOn;
  }, [soundOn]);

  const ensureAudioContext = useCallback((allowMuted = false) => {
    if ((!soundOnRef.current && !allowMuted) || typeof window === "undefined") return null;
    try {
      const AudioCtx = window.AudioContext ??
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      const audio = audioRef.current ?? new AudioCtx();
      audioRef.current = audio;
      if (audio.state === "suspended") {
        void audio.resume().catch(() => undefined);
      }
      if (!audioPrimedRef.current) {
        const silentBuffer = audio.createBuffer(1, 1, audio.sampleRate);
        const silentSource = audio.createBufferSource();
        silentSource.buffer = silentBuffer;
        silentSource.connect(audio.destination);
        silentSource.start();
        audioPrimedRef.current = true;
      }
      return audio;
    } catch {
      return null;
    }
  }, []);

  const loadWhistle = useCallback((audio: AudioContext) => {
    if (whistleBufferRef.current) return Promise.resolve(whistleBufferRef.current);
    if (whistleLoadRef.current) return whistleLoadRef.current;

    const request = fetch(publicAsset("/audio/referee-whistle.mp3"))
      .then((response) => {
        if (!response.ok) throw new Error("Whistle audio unavailable");
        return response.arrayBuffer();
      })
      .then((encodedAudio) => audio.decodeAudioData(encodedAudio))
      .then((buffer) => {
        whistleBufferRef.current = buffer;
        return buffer;
      })
      .catch(() => null)
      .finally(() => {
        whistleLoadRef.current = null;
      });
    whistleLoadRef.current = request;
    return request;
  }, []);

  useEffect(() => {
    const unlock = () => {
      if (!soundOnRef.current) return;
      const audio = ensureAudioContext();
      if (audio) void loadWhistle(audio);
    };
    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("keydown", unlock);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [ensureAudioContext, loadWhistle]);

  const beep = useCallback(
    (frequency: number, duration = 0.08) => {
      const audio = ensureAudioContext();
      if (!audio) return;
      try {
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();
        oscillator.type = "square";
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0.09, audio.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + duration);
        oscillator.connect(gain);
        gain.connect(audio.destination);
        oscillator.start();
        oscillator.stop(audio.currentTime + duration);
      } catch {
        // Sound is optional and must never prevent a match from starting.
      }
    },
    [ensureAudioContext],
  );

  const playWhistle = useCallback(() => {
    const audio = ensureAudioContext();
    if (!audio) return;
    const playBuffer = (buffer: AudioBuffer | null) => {
      if (!buffer || !soundOnRef.current) return;
      try {
        const source = audio.createBufferSource();
        const gain = audio.createGain();
        source.buffer = buffer;
        gain.gain.setValueAtTime(0.52, audio.currentTime);
        source.connect(gain);
        gain.connect(audio.destination);
        source.start();
      } catch {
        // Audio effects must never interrupt the match loop.
      }
    };
    if (whistleBufferRef.current) {
      playBuffer(whistleBufferRef.current);
    } else {
      void loadWhistle(audio).then(playBuffer);
    }
  }, [ensureAudioContext, loadWhistle]);

  const playCrowdCelebration = useCallback(() => {
    const audio = ensureAudioContext();
    if (!audio) return;
    try {
      const duration = 2.35;
      const frameCount = Math.floor(audio.sampleRate * duration);
      const buffer = audio.createBuffer(1, frameCount, audio.sampleRate);
      const samples = buffer.getChannelData(0);
      let previous = 0;
      for (let index = 0; index < frameCount; index += 1) {
        const white = Math.random() * 2 - 1;
        previous = previous * 0.82 + white * 0.18;
        const time = index / audio.sampleRate;
        const swell = Math.min(1, time / 0.22) * Math.min(1, (duration - time) / 0.7);
        const pulse = 0.72 + Math.sin(time * 31) * 0.12 + Math.sin(time * 47) * 0.08;
        samples[index] = previous * swell * pulse;
      }
      const source = audio.createBufferSource();
      const bandpass = audio.createBiquadFilter();
      const crowdGain = audio.createGain();
      source.buffer = buffer;
      bandpass.type = "bandpass";
      bandpass.frequency.value = 1050;
      bandpass.Q.value = 0.7;
      crowdGain.gain.setValueAtTime(0.001, audio.currentTime);
      crowdGain.gain.exponentialRampToValueAtTime(0.2, audio.currentTime + 0.16);
      crowdGain.gain.setValueAtTime(0.15, audio.currentTime + 1.3);
      crowdGain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + duration);
      source.connect(bandpass);
      bandpass.connect(crowdGain);
      crowdGain.connect(audio.destination);
      source.start();
      source.stop(audio.currentTime + duration);
    } catch {
      // Audio effects must never interrupt the match loop.
    }
  }, [ensureAudioContext]);

  const celebrateScore = useCallback(() => {
    if (!soundOnRef.current) return;
    playWhistle();
    window.setTimeout(playCrowdCelebration, SCORE_CROWD_DELAY_MS);
  }, [playCrowdCelebration, playWhistle]);

  const toggleSound = useCallback(() => {
    const next = !soundOnRef.current;
    soundOnRef.current = next;
    setSoundOn(next);
    if (next) {
      const audio = ensureAudioContext(true);
      if (audio) void loadWhistle(audio);
      window.setTimeout(() => beep(720, 0.11), 0);
    } else if (audioRef.current?.state === "running") {
      void audioRef.current.suspend().catch(() => undefined);
    }
  }, [beep, ensureAudioContext, loadWhistle]);

  const setMessage = useCallback((match: Match, message: string, duration = 1.1) => {
    match.message = message;
    match.messageUntil = duration;
  }, []);

  const prepareRestart = useCallback((match: Match, kickingSide: 0 | 1, startsHalf = false) => {
    arrangeRestart(match, kickingSide);
    match.fullbackSide = kickingSide;
    match.looseBallSeconds = 0;
    match.attackPlay = null;

    // The selected side always keeps its substitutions under the player's control,
    // including spectator mode. The opposing AI still manages its own bench.
    const automaticSides: (0 | 1)[] = [1];
    automaticSides.forEach((side) => {
      if (match.substitutesLeft[side] <= 0) return;
      const tiredPlayer = match.players
        .filter((player) => player.side === side)
        .sort((a, b) => a.stamina - b.stamina)[0];
      if (!tiredPlayer || tiredPlayer.stamina >= 26) return;
      const replacement = match.bench[side].shift();
      if (!replacement) return;
      tiredPlayer.name = playerDisplayName(replacement);
      tiredPlayer.photo = replacement.photo;
      tiredPlayer.skills = replacement.skills;
      tiredPlayer.stamina = 100;
      tiredPlayer.jersey = replacement.number ?? tiredPlayer.jersey;
      match.substitutesLeft[side] = match.bench[side].length;
    });

    const kicker = match.players.find(
      (player) => player.side === kickingSide && player.slot === MID_SLOT,
    );
    if (!kicker) return;
    match.ball = {
      x: kicker.x,
      y: kicker.y,
      vx: 0,
      vy: 0,
      owner: kicker,
      target: null,
      air: 0,
      flightDuration: 0,
      kind: "held",
    };
    match.kickoff = 1.15;
    match.restartSide = kickingSide;
    match.restartReceivingSide = (1 - kickingSide) as 0 | 1;
    match.whistleOnKickoff = startsHalf;
    match.blockWindow = 0;
    match.actionLock = 0.45;
    match.cpuActionLock = 0.8;
    setMessage(
      match,
      `${kickingSide === 0 ? "Seu time" : "Adversário"} marcou e cobra o reinício`,
      1.8,
    );
  }, [setMessage]);

  const passBall = useCallback(
    (side: 0 | 1, targetSlot?: number) => {
      const match = matchRef.current;
      if (!match || !match.running || match.paused || match.over || match.actionLock > 0) return;
      const owner = match.ball.owner;
      if (!owner || owner.side !== side) return;
      const direction = attackDirection(match, side);
      const candidates = match.players
        .filter((player) => {
          if (player.side !== side || player === owner || player.stun > 0) return false;
          return (player.x - owner.x) * direction <= 4;
        })
        .sort((a, b) => Math.abs(a.y - owner.y) * 0.7 + Math.abs(a.x - owner.x) * 0.2 - (Math.abs(b.y - owner.y) * 0.7 + Math.abs(b.x - owner.x) * 0.2));
      const target =
        targetSlot === undefined
          ? candidates[0]
          : candidates.find((player) => player.slot === targetSlot);
      if (!target) {
        if (side === 0) {
          setMessage(
            match,
            targetSlot === undefined
              ? "Sem apoio lateral ou atrás!"
              : `O jogador ${targetSlot + 1} precisa estar na linha ou atrás da bola`,
            1.25,
          );
        }
        return;
      }
      const legalTargetX = direction === 1
        ? Math.min(target.x, owner.x - 3)
        : Math.max(target.x, owner.x + 3);
      const completionChance = clamp(
        0.55 + owner.skills.pass * 0.0038 + target.skills.pass * 0.0006 + match.formBoost[side] * 0.009,
        0.76,
        0.97,
      );
      const completed = Math.random() <= completionChance;
      match.ball.owner = null;
      match.ball.target = completed ? target : null;
      match.ball.air = clamp(Math.hypot(legalTargetX - owner.x, target.y - owner.y) / 470, 0.18, 0.46);
      match.ball.flightDuration = match.ball.air;
      match.ball.kind = "pass";
      match.ball.vx = (legalTargetX - owner.x) / match.ball.air;
      const passError = completed ? 0 : Math.sin(match.seconds * 3.1 + owner.id) * 48;
      match.ball.vy = (target.y + passError - owner.y) / match.ball.air;
      match.actionLock = 0.28;
      owner.stamina = Math.max(0, owner.stamina - 0.8);
      if (side === 0) {
        setMessage(match, completed ? `Passe para o ${target.slot + 1}` : "Passe impreciso — bola viva!");
        haptic();
      }
    },
    [setMessage],
  );

  const beginDropAim = useCallback(() => {
    if (controlModeRef.current === "simulate") return;
    const match = matchRef.current;
    if (!match || match.paused || match.over || match.actionLock > 0) return;
    const owner = match.ball.owner;
    if (!owner || owner.side !== 0) return;
    if (!canAttemptDrop(match, owner)) {
      setMessage(match, "Avance mais para tentar o drop", 1.25);
      return;
    }
    const direction = attackDirection(match, owner.side);
    aimRef.current = {
      active: true,
      x: direction === 1 ? RIGHT_TRY_LINE : TRY_LINE,
      y: CENTRE_Y,
    };
    setAimingDrop(true);
    setMessage(match, "Mire entre os postes e clique", 2);
    haptic(14);
  }, [setMessage]);

  const finishDropAim = useCallback(
    (x: number, y: number) => {
      const match = matchRef.current;
      if (!match || !aimRef.current.active || match.paused || match.over) return;
      const owner = match.ball.owner;
      aimRef.current.active = false;
      setAimingDrop(false);
      if (!owner || owner.side !== 0) return;

      const targetX = attackDirection(match, owner.side) === 1 ? RIGHT_TRY_LINE : TRY_LINE;
      const precision = Math.hypot((x - targetX) * 0.4, y - CENTRE_Y);
      const inRange = canAttemptDrop(match, owner);
      const precisionLimit = 38 + owner.skills.kick * 0.38;
      match.actionLock = 1;
      if (inRange && precision <= precisionLimit) {
        match.score[0] += 3;
        owner.stamina = Math.max(0, owner.stamina - 7);
        prepareRestart(match, 0);
        match.kickoff = SCORE_RESTART_SECONDS;
        setMessage(match, "DROP GOAL! · +3 · seu time reinicia", 1.8);
        celebrateScore();
      } else {
        prepareRestart(match, 1);
        setMessage(match, "Drop para fora — drop-out adversário", 1.6);
        beep(160, 0.14);
      }
    },
    [beep, celebrateScore, prepareRestart, setMessage],
  );

  const performBlock = useCallback(() => {
    if (controlModeRef.current === "simulate") return;
    const match = matchRef.current;
    if (!match || match.paused || match.over || match.actionLock > 0) return;
    const owner = match.ball.owner;
    if (!owner || owner.side !== 0 || owner.stun > 0) return;
    const supports = match.players
      .filter((player) => player.side === 0 && player !== owner && player.stun <= 0)
      .sort((a, b) => distance(a, owner) - distance(b, owner));
    const upper = supports.find((player) => player.y < owner.y) ?? supports[0];
    const lower =
      supports.find((player) => player.y > owner.y && player !== upper) ??
      supports.find((player) => player !== upper);
    if (!upper || !lower) {
      setMessage(match, "Sem dois apoios para o block", 1.1);
      return;
    }
    const upperY = upper.y;
    const direction = attackDirection(match, owner.side);
    upper.routeX = owner.x - direction * 12;
    upper.routeY = clamp(lower.y, 62, FIELD_H - 62);
    upper.routeTime = 0.78;
    lower.routeX = owner.x - direction * 12;
    lower.routeY = clamp(upperY, 62, FIELD_H - 62);
    lower.routeTime = 0.78;
    upper.stamina = Math.max(0, upper.stamina - 4);
    lower.stamina = Math.max(0, lower.stamina - 4);
    match.blockWindow = 0.82;
    match.actionLock = 0.62;
    setMessage(match, `Block: camisas ${upper.jersey} e ${lower.jersey} cruzando`, 1.2);
    haptic(16);
    beep(410, 0.08);
  }, [beep, setMessage]);

  const kickBall = useCallback(() => {
    if (controlModeRef.current === "simulate") return;
    const match = matchRef.current;
    if (!match || match.paused || match.over || match.actionLock > 0) return;
    const owner = match.ball.owner;
    if (!owner || owner.side !== 0) return;
    const directionY =
      keyState.has("ArrowUp") || keyState.has("KeyW")
        ? -1
        : keyState.has("ArrowDown") || keyState.has("KeyS")
          ? 1
          : 0;
    const flight = 0.68 + owner.skills.kick * 0.002;
    const direction = attackDirection(match, owner.side);
    match.ball.owner = null;
    match.ball.target = null;
    match.ball.kind = "kick";
    match.ball.air = flight;
    match.ball.flightDuration = flight;
    match.ball.vx = direction * (360 + owner.skills.kick * 1.45);
    match.ball.vy = directionY * (105 + owner.skills.kick * 0.4);
    match.actionLock = 0.52;
    owner.stamina = Math.max(0, owner.stamina - 7);
    setMessage(match, "Chute à frente — corra para recuperar!", 1.25);
    haptic(18);
    beep(620, 0.09);
  }, [beep, setMessage]);

  const tackle = useCallback(
    (match: Match, carrier: Player, tackler: Player) => {
      if (carrier.tackleLock > 0 || tackler.tackleLock > 0) return;
      match.attackPlay = null;

      if (carrier.side === 0 && match.blockWindow > 0) {
        carrier.tackleLock = 0.48;
        tackler.stun = 0.46;
        tackler.tackleLock = 0.62;
        match.blockWindow = 0;
        setMessage(match, "Block funcionou — defensor mordeu o cruzamento", 1);
        beep(410, 0.08);
        return;
      }

      const tackleRoll = tackler.skills.tackle + match.formBoost[tackler.side] * 1.2 + Math.random() * 24;
      const breakRoll = carrier.skills.attack + match.formBoost[carrier.side] * 1.2 + Math.random() * 24;
      if (breakRoll > tackleRoll + 7) {
        carrier.tackleLock = 0.64;
        tackler.stun = 0.58;
        tackler.tackleLock = 0.82;
        carrier.stamina = Math.max(0, carrier.stamina - 3.5);
        setMessage(match, carrier.side === 0 ? "Quebra de tackle!" : "Adversário quebrou o tackle", 0.9);
        beep(carrier.side === 0 ? 530 : 180, 0.07);
        return;
      }

      carrier.stun = clamp(0.72 - tackler.skills.tackle * 0.002, 0.5, 0.62);
      tackler.stun = clamp(0.84 - tackler.skills.tackle * 0.0018, 0.65, 0.76);
      carrier.tackleLock = 1;
      tackler.tackleLock = 1;
      carrier.stamina = Math.max(0, carrier.stamina - 3);
      tackler.stamina = Math.max(0, tackler.stamina - 5);

      const support = match.players
        .filter((player) => player.side === carrier.side && player !== carrier && player.stun <= 0)
        .sort((a, b) => distance(a, carrier) - distance(b, carrier))[0];
      const pressure = match.players
        .filter((player) => player.side !== carrier.side)
        .sort((a, b) => distance(a, carrier) - distance(b, carrier))[0];
      const retained =
        Boolean(support) &&
        distance(support, carrier) - (support?.skills.pass ?? 65) * 0.28 <
          distance(pressure, carrier) - (pressure?.skills.tackle ?? 65) * 0.18 + 52;
      const nextSide = retained ? carrier.side : ((1 - carrier.side) as 0 | 1);
      const nextOwner = match.players
        .filter((player) => player.side === nextSide && player.stun <= 0)
        .sort((a, b) => distance(a, carrier) - distance(b, carrier))[0];

      if (nextOwner) {
        match.ball.owner = nextOwner;
        match.ball.target = null;
        match.ball.x = nextOwner.x;
        match.ball.y = nextOwner.y;
      } else {
        match.ball.owner = null;
        match.ball.target = null;
        match.ball.kind = "loose";
        match.ball.vx = 0;
        match.ball.vy = 0;
        match.looseBallSeconds = 0;
      }
      setMessage(match, retained ? "Ruck seguro!" : "Virada no ruck!", 1);
      beep(retained && carrier.side === 0 ? 320 : 150, 0.08);
    },
    [beep, setMessage],
  );

  const updateMatch = useCallback(
    (match: Match, dt: number) => {
      if (!match.running || match.paused || match.over) return;

      if (match.kickoff > 0) {
        match.kickoff -= dt;
        match.messageUntil -= dt;
        if (match.kickoff <= 0 && match.restartSide !== null) {
          const kickingSide = match.restartSide;
          const kicker = match.ball.owner;
          const kickSkill = kicker?.skills.kick ?? 65;
          const flight = 0.76 + kickSkill * 0.0015;
          match.restartSide = null;
          match.ball.owner = null;
          match.ball.target = null;
          match.ball.kind = "restart";
          match.ball.air = flight;
          match.ball.flightDuration = flight;
          match.ball.vx = attackDirection(match, kickingSide) * (315 + kickSkill * 0.75);
          match.ball.vy = Math.sin(match.seconds * 1.7) * 82;
          match.actionLock = 0.22;
          if (kicker) kicker.stamina = Math.max(0, kicker.stamina - 3);
          setMessage(match, "Drop-kick de reinício — bola viva!", 1.25);
          if (match.whistleOnKickoff) {
            match.whistleOnKickoff = false;
            playWhistle();
          }
        }
        return;
      }

      match.seconds -= dt;
      match.actionLock = Math.max(0, match.actionLock - dt);
      match.cpuActionLock = Math.max(0, match.cpuActionLock - dt);
      match.blockWindow = Math.max(0, match.blockWindow - dt);
      match.messageUntil = Math.max(0, match.messageUntil - dt);
      match.players.forEach((player) => {
        player.stun = Math.max(0, player.stun - dt);
        player.tackleLock = Math.max(0, player.tackleLock - dt);
      });
      if (match.attackPlay) {
        match.attackPlay.time -= dt;
        const playLostPossession =
          (match.ball.owner && match.ball.owner.side !== match.attackPlay.side) ||
          (!match.ball.owner && match.ball.air <= 0);
        if (match.attackPlay.time <= 0 || playLostPossession) {
          match.attackPlay = null;
        }
      }

      if (match.seconds <= 0) {
        match.seconds = 0;
        if (match.half === 1) {
          match.half = 2;
          match.seconds = HALF_SECONDS;
          match.paused = true;
          match.halftime = true;
          prepareRestart(match, 1, true);
          setMessage(match, "Intervalo · prepare o time para o 2º tempo", 60);
          beep(420, 0.18);
          return;
        }
        match.over = true;
        match.running = false;
        if (gameMode === "friendly" && controlModeRef.current === "control" && match.score[0] > match.score[1]) {
          const next = bestWins + 1;
          setBestWins(next);
          localStorage.setItem("rugby-br-26-wins", String(next));
          beep(820, 0.3);
        } else {
          beep(130, 0.18);
        }
        return;
      }

      const ballOwner = match.ball.owner;
      const defensiveThreat = ballOwner ?? (match.ball.kind === "pass" ? match.ball.target : null);
      const restartLanding = {
        x: clamp(match.ball.x + match.ball.vx * Math.max(0, match.ball.air), 38, FIELD_W - 38),
        y: clamp(match.ball.y + match.ball.vy * Math.max(0, match.ball.air), 46, FIELD_H - 46),
      };
      if (ballOwner) {
        match.fullbackSide = (1 - ballOwner.side) as 0 | 1;
      }
      const homePlayers = match.players.filter((player) => player.side === 0);
      const awayPlayers = match.players.filter((player) => player.side === 1);
      const homeDirection = attackDirection(match, 0);
      const awayDirection = attackDirection(match, 1);
      const simulated = controlModeRef.current === "simulate";
      const controlled = simulated
        ? null
        : ballOwner?.side === 0
          ? ballOwner
          : [...homePlayers].sort((a, b) => distance(a, match.ball) - distance(b, match.ball))[0];
      const homeAiPlayers = controlled
        ? homePlayers.filter((player) => player !== controlled)
        : homePlayers;

      const keyboardX =
        (keyState.has("ArrowRight") || keyState.has("KeyD") ? 1 : 0) -
        (keyState.has("ArrowLeft") || keyState.has("KeyA") ? 1 : 0);
      const keyboardY =
        (keyState.has("ArrowDown") || keyState.has("KeyS") ? 1 : 0) -
        (keyState.has("ArrowUp") || keyState.has("KeyW") ? 1 : 0);
      const inputX = joystickRef.current.active ? joystickRef.current.x : keyboardX;
      const inputY = joystickRef.current.active ? joystickRef.current.y : keyboardY;
      const inputLength = Math.hypot(inputX, inputY) || 1;
      const sprinting = actionRef.current.sprint || keyState.has("ShiftLeft") || keyState.has("ShiftRight");
      const hasMovementInput = Math.hypot(inputX, inputY) > 0.08;
      const staminaFactor = (player: Player) => 0.58 + player.stamina * 0.0042;
      const formFactor = (player: Player) => 1 + match.formBoost[player.side] * 0.018;

      if (controlled && controlled.stun <= 0) {
        const speed = (sprinting ? 244 : 190) * staminaFactor(controlled) * attributeFactor(controlled.skills.speed) * formFactor(controlled);
        controlled.x += (inputX / inputLength) * speed * dt;
        controlled.y += (inputY / inputLength) * speed * dt;
        if (hasMovementInput) {
          controlled.stamina = Math.max(
            0,
            controlled.stamina - dt * (sprinting ? 2.65 : 0.92) * staminaDrainFactor(controlled),
          );
        }
      }

      const moveToward = (player: Player, tx: number, ty: number, speed: number) => {
        if (player.stun > 0 || player === controlled) return;
        const dx = tx - player.x;
        const dy = ty - player.y;
        const length = Math.hypot(dx, dy) || 1;
        const actualSpeed = speed * staminaFactor(player) * attributeFactor(player.skills.speed) * formFactor(player);
        player.x += (dx / length) * actualSpeed * dt;
        player.y += (dy / length) * actualSpeed * dt;
        if (length > 10) {
          player.stamina = Math.max(0, player.stamina - dt * 0.54 * staminaDrainFactor(player));
        }
      };

      const clampToDefensiveHalf = (x: number, defendingDirection: -1 | 1) =>
        defendingDirection === 1
          ? clamp(x, TRY_LINE + 34, FIELD_W * 0.38)
          : clamp(x, FIELD_W * 0.62, RIGHT_TRY_LINE - 34);

      const runBlockRoute = (player: Player) => {
        if (player.routeTime <= 0) return false;
        player.routeTime = Math.max(0, player.routeTime - dt);
        const dx = player.routeX - player.x;
        const dy = player.routeY - player.y;
        const length = Math.hypot(dx, dy) || 1;
        const speed = 252 * staminaFactor(player) * attributeFactor(player.skills.speed) * formFactor(player);
        player.x += (dx / length) * speed * dt;
        player.y += (dy / length) * speed * dt;
        return true;
      };

      const runCpuCarrier = (player: Player, direction: -1 | 1, waveFrequency: number) => {
        if (player.stun > 0) return;
        const play = match.attackPlay?.side === player.side ? match.attackPlay : null;
        if (play?.kind === "draw-pass") {
          const defender = match.players.find((candidate) => candidate.id === play.defenderId);
          if (defender) {
            moveToward(player, defender.x - direction * 58, defender.y, 202);
            player.stamina = Math.max(0, player.stamina - dt * 0.34 * staminaDrainFactor(player));
            return;
          }
        }
        if (play?.kind === "wide") {
          const targetY = clamp(player.y + play.edge * 34, 68, FIELD_H - 68);
          moveToward(player, player.x + direction * 150, targetY, 154);
          player.stamina = Math.max(0, player.stamina - dt * 0.26 * staminaDrainFactor(player));
          return;
        }
        const clearLane = hasClearTryLane(match, player);
        const wave = Math.sin(match.seconds * waveFrequency + player.slot) * 62;
        const targetY = clearLane ? player.y : clamp(CENTRE_Y + wave, 80, FIELD_H - 80);
        const dy = targetY - player.y;
        player.x += direction * (clearLane ? 226 : 174) * attributeFactor(player.skills.speed) * formFactor(player) * dt;
        player.y += clamp(dy, -110 * dt, 110 * dt);
        player.stamina = Math.max(0, player.stamina - dt * (clearLane ? 1.08 : 0.72) * staminaDrainFactor(player));
      };

      const moveTacticalSupport = (
        player: Player,
        owner: Player,
        direction: -1 | 1,
        defaultSpeed: number,
      ) => {
        const play = match.attackPlay?.side === player.side ? match.attackPlay : null;
        if (play?.kind === "wide") {
          const lane = 68 + player.slot * ((FIELD_H - 136) / (PLAYERS_PER_SIDE - 1));
          const depth = 26 + Math.abs(player.slot - owner.slot) * 8;
          moveToward(player, owner.x - direction * depth, lane, 178);
          return;
        }
        if (play?.kind === "draw-pass" && player.id === play.receiverId) {
          moveToward(
            player,
            owner.x - direction * 24,
            clamp(owner.y + play.edge * 104, 64, FIELD_H - 64),
            194,
          );
          return;
        }
        const laneOffset = (player.slot - MID_SLOT) * (player.side === 0 ? 57 : 52);
        moveToward(
          player,
          owner.x - direction * (40 + Math.abs(player.slot - owner.slot) * 9),
          owner.y + laneOffset,
          defaultSpeed,
        );
      };

      const moveGoalLineWall = (player: Player, defendingSide: 0 | 1, carrier: Player | null) => {
        if (!isGoalLineWall(match, defendingSide, carrier)) return false;
        const direction = attackDirection(match, defendingSide);
        const ownTryLine = direction === 1 ? TRY_LINE : RIGHT_TRY_LINE;
        const laneGap = (FIELD_H - 128) / (PLAYERS_PER_SIDE - 1);
        const baseLane = 64 + player.slot * laneGap;
        const nearestLane = carrier
          ? 64 + clamp(Math.round((carrier.y - 64) / laneGap), 0, PLAYERS_PER_SIDE - 1) * laneGap
          : CENTRE_Y;
        const lineShift = carrier ? clamp(carrier.y - nearestLane, -42, 42) : 0;
        moveToward(
          player,
          ownTryLine + direction * 24,
          clamp(baseLane + lineShift, 54, FIELD_H - 54),
          192,
        );
        return true;
      };

      const moveToRestartReception = (
        player: Player,
        side: 0 | 1,
        teammates: Player[],
        direction: -1 | 1,
      ) => {
        if (
          match.ball.kind !== "restart" ||
          match.ball.air <= 0 ||
          match.restartReceivingSide !== side
        ) return false;
        const rank = [...teammates]
          .sort((a, b) => distance(a, restartLanding) - distance(b, restartLanding))
          .indexOf(player);
        if (rank < 3) {
          const catchOffsetY = rank === 0 ? 0 : rank === 1 ? -30 : 30;
          moveToward(
            player,
            restartLanding.x - direction * rank * 9,
            clamp(restartLanding.y + catchOffsetY, 54, FIELD_H - 54),
            rank === 0 ? 222 : 207,
          );
        } else {
          const supportLane = 72 + player.slot * ((FIELD_H - 144) / (PLAYERS_PER_SIDE - 1));
          moveToward(
            player,
            restartLanding.x - direction * (44 + rank * 11),
            supportLane,
            170,
          );
        }
        return true;
      };

      const moveToLooseBall = (
        player: Player,
        teammates: Player[],
        direction: -1 | 1,
      ) => {
        if (match.ball.owner || match.ball.air > 0) return false;
        const rank = [...teammates]
          .sort((a, b) => distance(a, match.ball) - distance(b, match.ball))
          .indexOf(player);
        if (rank < 2) {
          moveToward(
            player,
            match.ball.x,
            match.ball.y + (rank === 0 ? 0 : player.y < match.ball.y ? -24 : 24),
            rank === 0 ? 218 : 204,
          );
        } else {
          moveToward(
            player,
            match.ball.x - direction * (38 + rank * 10),
            clamp(match.ball.y + (player.slot - MID_SLOT) * 38, 54, FIELD_H - 54),
            162,
          );
        }
        return true;
      };

      homePlayers.forEach((player) => {
        if (player === controlled) return;
        if (moveToLooseBall(player, homeAiPlayers, homeDirection)) return;
        if (runBlockRoute(player)) return;
        if (ballOwner?.side === 0) {
          if (player === ballOwner && simulated) {
            runCpuCarrier(player, homeDirection, 1.55);
          } else {
            moveTacticalSupport(player, ballOwner, homeDirection, 146);
          }
        } else {
          const target = ballOwner ?? match.ball;
          if (moveToRestartReception(player, 0, homeAiPlayers, homeDirection)) {
            // The receiving team attacks the projected landing point with support behind it.
          } else if (moveGoalLineWall(player, 0, defensiveThreat)) {
            // Close to the try line all seven defenders hold one connected wall.
          } else if (player.slot === SWEEPER_SLOT && match.fullbackSide === 0) {
            const kickIsComing = !ballOwner && (match.ball.kind === "kick" || match.ball.kind === "restart");
            const lineBreak = Boolean(ballOwner && hasBrokenDefensiveLine(match, ballOwner, 0));
            const fullbackX = kickIsComing
              ? clampToDefensiveHalf(match.ball.x + awayDirection * 42, homeDirection)
              : lineBreak
                ? clamp(target.x + awayDirection * 18, TRY_LINE + 18, RIGHT_TRY_LINE - 18)
                : clampToDefensiveHalf(target.x + awayDirection * 210, homeDirection);
            moveToward(player, fullbackX, target.y, kickIsComing || lineBreak ? 205 : 154);
          } else {
            const defenders = homePlayers.filter(
              (candidate) => !(candidate.slot === SWEEPER_SLOT && match.fullbackSide === 0),
            );
            const chaseRank = [...defenders].sort((a, b) => distance(a, target) - distance(b, target)).indexOf(player);
            const lineLane = 66 + player.slot * ((FIELD_H - 132) / (PLAYERS_PER_SIDE - 1));
            const drift = clamp((target.y - CENTRE_Y) * 0.22, -46, 46);
            const defensiveY = chaseRank === 0
              ? target.y
              : clamp(lineLane + drift, 54, FIELD_H - 54);
            moveToward(
              player,
              target.x + awayDirection * (12 + Math.min(chaseRank, 2) * 4),
              defensiveY,
              chaseRank < 2 ? 190 : 166,
            );
          }
        }
      });

      awayPlayers.forEach((player) => {
        if (moveToLooseBall(player, awayPlayers, awayDirection)) return;
        if (runBlockRoute(player)) return;
        if (ballOwner?.side === 1) {
          if (player === ballOwner) {
            runCpuCarrier(player, awayDirection, 1.7);
          } else {
            moveTacticalSupport(player, ballOwner, awayDirection, 143);
          }
        } else {
          const target = ballOwner ?? match.ball;
          if (moveToRestartReception(player, 1, awayPlayers, awayDirection)) {
            // The receiving team attacks the projected landing point with support behind it.
          } else if (moveGoalLineWall(player, 1, defensiveThreat)) {
            // Close to the try line all seven defenders hold one connected wall.
          } else if (player.slot === SWEEPER_SLOT && match.fullbackSide === 1) {
            const kickIsComing = !ballOwner && (match.ball.kind === "kick" || match.ball.kind === "restart");
            const lineBreak = Boolean(ballOwner && hasBrokenDefensiveLine(match, ballOwner, 1));
            const fullbackX = kickIsComing
              ? clampToDefensiveHalf(match.ball.x + homeDirection * 42, awayDirection)
              : lineBreak
                ? clamp(target.x + homeDirection * 18, TRY_LINE + 18, RIGHT_TRY_LINE - 18)
                : clampToDefensiveHalf(target.x + homeDirection * 210, awayDirection);
            moveToward(player, fullbackX, target.y, kickIsComing || lineBreak ? 205 : 154);
          } else {
            const defenders = awayPlayers.filter(
              (candidate) => !(candidate.slot === SWEEPER_SLOT && match.fullbackSide === 1),
            );
            const rank = [...defenders].sort((a, b) => distance(a, target) - distance(b, target)).indexOf(player);
            const lineLane = 66 + player.slot * ((FIELD_H - 132) / (PLAYERS_PER_SIDE - 1));
            const drift = clamp((target.y - CENTRE_Y) * 0.22, -46, 46);
            const defensiveY = rank === 0
              ? target.y
              : clamp(lineLane + drift, 54, FIELD_H - 54);
            moveToward(
              player,
              target.x + homeDirection * (12 + Math.min(rank, 2) * 4),
              defensiveY,
              rank < 2 ? 194 : 168,
            );
          }
        }
      });

      const tacticalOwner = match.ball.owner;
      const tacticalPlay = match.attackPlay;
      if (
        tacticalOwner &&
        tacticalPlay &&
        tacticalOwner.side === tacticalPlay.side &&
        match.actionLock <= 0
      ) {
        const direction = attackDirection(match, tacticalOwner.side);
        if (tacticalPlay.kind === "wide") {
          const reachedWing = tacticalPlay.edge === -1
            ? tacticalOwner.y <= 98
            : tacticalOwner.y >= FIELD_H - 98;
          if (reachedWing || tacticalPlay.passes >= 5) {
            match.attackPlay = null;
            match.cpuActionLock = 1.05;
            setMessage(
              match,
              tacticalOwner.side === 0
                ? "Ponta lançado no espaço!"
                : "Adversário lançou o ponta no espaço",
              1.1,
            );
          } else {
            const nextReceiver = match.players
              .filter((player) =>
                player.side === tacticalOwner.side &&
                player !== tacticalOwner &&
                player.stun <= 0 &&
                (player.y - tacticalOwner.y) * tacticalPlay.edge > 22 &&
                (player.x - tacticalOwner.x) * direction <= 4,
              )
              .sort(
                (a, b) =>
                  (a.y - tacticalOwner.y) * tacticalPlay.edge -
                  (b.y - tacticalOwner.y) * tacticalPlay.edge,
              )[0];
            if (nextReceiver) {
              passBall(tacticalOwner.side, nextReceiver.slot);
              if (!match.ball.owner && match.ball.kind === "pass") {
                tacticalPlay.passes += 1;
                match.cpuActionLock = 0.34;
                setMessage(
                  match,
                  tacticalOwner.side === 0
                    ? `Bola de mão em mão · passe ${tacticalPlay.passes}`
                    : `IA abre até a ponta · passe ${tacticalPlay.passes}`,
                  0.85,
                );
              }
            }
          }
        } else {
          const defender = match.players.find((player) => player.id === tacticalPlay.defenderId);
          const receiver = match.players.find((player) => player.id === tacticalPlay.receiverId);
          const receiverIsLegal = Boolean(
            receiver &&
            receiver.side === tacticalOwner.side &&
            receiver.stun <= 0 &&
            (receiver.x - tacticalOwner.x) * direction <= 4,
          );
          if (defender && receiver && receiverIsLegal && distance(defender, tacticalOwner) <= 84) {
            passBall(tacticalOwner.side, receiver.slot);
            if (!match.ball.owner && match.ball.kind === "pass") {
              match.attackPlay = null;
              match.cpuActionLock = 1.05;
              setMessage(
                match,
                tacticalOwner.side === 0
                  ? "Fixou o defensor e soltou antes do tackle!"
                  : "IA fixou e passou antes do tackle",
                1.1,
              );
            }
          }
        }
      }

      for (let first = 0; first < match.players.length; first += 1) {
        for (let second = first + 1; second < match.players.length; second += 1) {
          const playerA = match.players[first];
          const playerB = match.players[second];
          if (playerA.side !== playerB.side) continue;
          const dx = playerB.x - playerA.x;
          const dy = playerB.y - playerA.y;
          const currentDistance = Math.hypot(dx, dy);
          const minimumDistance = PLAYER_RADIUS * 2.15;
          if (currentDistance >= minimumDistance) continue;
          const safeDistance = currentDistance || 1;
          const push = (minimumDistance - currentDistance) / 2;
          const directionX = currentDistance === 0 ? (playerA.id % 2 ? 1 : -1) : dx / safeDistance;
          const directionY = currentDistance === 0 ? (playerB.id % 2 ? 1 : -1) : dy / safeDistance;
          playerA.x -= directionX * push;
          playerA.y -= directionY * push;
          playerB.x += directionX * push;
          playerB.y += directionY * push;
        }
      }

      match.players.forEach((player) => {
        player.x = clamp(player.x, 34, FIELD_W - 34);
        player.y = clamp(player.y, 54, FIELD_H - 54);
        if (isGoalLineWall(match, player.side, defensiveThreat)) {
          const direction = attackDirection(match, player.side);
          if (direction === 1) {
            player.x = Math.max(player.x, TRY_LINE + 10);
          } else {
            player.x = Math.min(player.x, RIGHT_TRY_LINE - 10);
          }
        }
      });

      if (match.ball.owner) {
        match.looseBallSeconds = 0;
        match.ball.x = match.ball.owner.x + attackDirection(match, match.ball.owner.side) * 14;
        match.ball.y = match.ball.owner.y - 8;
        match.ball.vx = 0;
        match.ball.vy = 0;
        match.ball.air = 0;
        match.ball.flightDuration = 0;
        match.ball.kind = "held";
      } else if (match.ball.air > 0) {
        match.looseBallSeconds = 0;
        match.ball.air -= dt;
        match.ball.x += match.ball.vx * dt;
        match.ball.y += match.ball.vy * dt;
        if (match.ball.air <= 0) {
          if (match.ball.kind === "pass" && match.ball.target) {
            match.ball.owner = match.ball.target;
            match.ball.x = match.ball.target.x;
            match.ball.y = match.ball.target.y;
            match.ball.kind = "held";
          } else {
            match.ball.kind = "loose";
            match.looseBallSeconds = 0;
            match.ball.vx *= 0.28;
            match.ball.vy *= 0.28;
          }
          match.ball.target = null;
        }
      } else {
        match.looseBallSeconds += dt;
        match.ball.x += match.ball.vx * dt;
        match.ball.y += match.ball.vy * dt;
        match.ball.vx *= Math.pow(0.08, dt);
        match.ball.vy *= Math.pow(0.08, dt);
        if (match.ball.x < 38 || match.ball.x > FIELD_W - 38) {
          match.ball.x = clamp(match.ball.x, 38, FIELD_W - 38);
          match.ball.vx *= -0.25;
        }
        if (match.ball.y < 46 || match.ball.y > FIELD_H - 46) {
          match.ball.y = clamp(match.ball.y, 46, FIELD_H - 46);
          match.ball.vy *= -0.35;
        }
        const collector = [...match.players]
          .filter((player) => player.stun <= 0)
          .sort((a, b) => {
            const aReceptionBonus = a.side === match.restartReceivingSide ? 16 : 0;
            const bReceptionBonus = b.side === match.restartReceivingSide ? 16 : 0;
            return distance(a, match.ball) - aReceptionBonus - (distance(b, match.ball) - bReceptionBonus);
          })[0];
        const pickupRadius = match.looseBallSeconds >= 3
          ? Number.POSITIVE_INFINITY
          : match.looseBallSeconds >= 1.25
            ? 95
            : 32;
        const receiverPickupBonus = collector?.side === match.restartReceivingSide ? 10 : 0;
        if (collector && distance(collector, match.ball) < pickupRadius + receiverPickupBonus) {
          const wasRestartContest = match.restartReceivingSide !== null;
          match.ball.owner = collector;
          match.ball.kind = "held";
          match.ball.vx = 0;
          match.ball.vy = 0;
          match.looseBallSeconds = 0;
          match.restartReceivingSide = null;
          setMessage(
            match,
            wasRestartContest
              ? collector.side === 0
                ? "Seu time assegurou o reinício!"
                : "Adversário assegurou o reinício"
              : collector.side === 0
                ? "Bola recuperada!"
                : "Adversário recuperou",
            0.9,
          );
        }
      }

      const carrier = match.ball.owner;
      if (carrier) {
        const opponents = match.players
          .filter((player) => player.side !== carrier.side && player.stun <= 0)
          .sort((a, b) => distance(a, carrier) - distance(b, carrier));
        const closest = opponents[0];
        if (closest && distance(closest, carrier) < PLAYER_RADIUS * 1.72) {
          tackle(match, carrier, closest);
        }
      }

      const newCarrier = match.ball.owner;
      if (newCarrier && (newCarrier.side === 1 || simulated) && match.cpuActionLock <= 0) {
        const clearLane = hasClearTryLane(match, newCarrier);
        if (!clearLane && !match.attackPlay) {
          const direction = attackDirection(match, newCarrier.side);
          const edge = chooseOpenEdge(match, newCarrier.side);
          const defendersAhead = match.players
            .filter(
              (player) =>
                player.side !== newCarrier.side &&
                player.stun <= 0 &&
                (player.x - newCarrier.x) * direction > 18,
            )
            .sort((a, b) => distance(a, newCarrier) - distance(b, newCarrier));
          const legalSupports = match.players.filter(
            (player) =>
              player.side === newCarrier.side &&
              player !== newCarrier &&
              player.stun <= 0 &&
              (player.x - newCarrier.x) * direction <= 4,
          );
          const outwardSupports = legalSupports.filter(
            (player) => (player.y - newCarrier.y) * edge > 20,
          );
          const drawReceiver = [...legalSupports].sort(
            (a, b) =>
              Math.abs(a.y - (newCarrier.y + edge * 104)) -
              Math.abs(b.y - (newCarrier.y + edge * 104)),
          )[0];
          const canGoWide =
            newCarrier.y > 118 &&
            newCarrier.y < FIELD_H - 118 &&
            outwardSupports.length >= 2;
          const canDrawAndPass = Boolean(
            defendersAhead[0] &&
            distance(defendersAhead[0], newCarrier) < 250 &&
            drawReceiver,
          );

          if (canGoWide && (Math.random() < 0.58 || !canDrawAndPass)) {
            match.attackPlay = {
              kind: "wide",
              side: newCarrier.side,
              edge,
              time: 5.4,
              passes: 0,
              defenderId: null,
              receiverId: null,
            };
            match.cpuActionLock = 0.18;
            setMessage(
              match,
              newCarrier.side === 0
                ? "Jogada aberta: bola de mão em mão até a ponta"
                : "IA organiza a circulação até a ponta",
              1.15,
            );
          } else if (canDrawAndPass && drawReceiver) {
            match.attackPlay = {
              kind: "draw-pass",
              side: newCarrier.side,
              edge,
              time: 3.4,
              passes: 0,
              defenderId: defendersAhead[0].id,
              receiverId: drawReceiver.id,
            };
            match.cpuActionLock = 0.18;
            setMessage(
              match,
              newCarrier.side === 0
                ? "Jogada de fixação: atacar o defensor e soltar"
                : "IA prepara a fixação do defensor",
              1.05,
            );
          } else {
            const pressure = defendersAhead.some(
              (player) => distance(player, newCarrier) < 68,
            );
            if (pressure) {
              passBall(newCarrier.side);
              match.cpuActionLock = 1 + Math.random() * 0.8;
            }
          }
        }
      }

      if (newCarrier) {
        const tryScored = attackDirection(match, newCarrier.side) === 1
          ? newCarrier.x >= RIGHT_TRY_LINE
          : newCarrier.x <= TRY_LINE;
        if (tryScored) {
          match.score[newCarrier.side] += 5;
          match.tries[newCarrier.side] += 1;
          prepareRestart(match, newCarrier.side);
          match.kickoff = SCORE_RESTART_SECONDS;
          setMessage(
            match,
            newCarrier.side === 0
              ? "TRY! · +5 · seu time cobra o reinício"
              : "Try adversário · eles cobram o reinício",
            1.8,
          );
          celebrateScore();
        }
      }
    },
    [beep, bestWins, celebrateScore, gameMode, passBall, playWhistle, prepareRestart, setMessage, tackle],
  );

  const frame = useCallback(
    function animateFrame(now: number) {
      const canvas = canvasRef.current;
      const match = matchRef.current;
      if (!canvas || !match) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dt = Math.min((now - match.lastFrame) / 1000, 0.035);
      match.lastFrame = now;
      const matchSpeed = controlModeRef.current === "simulate" ? simulationSpeedRef.current : 1;
      const matchTimeDelta = dt * matchSpeed;
      const simulationSteps = Math.max(1, Math.ceil(matchTimeDelta / (1 / 60)));
      const simulationDt = matchTimeDelta / simulationSteps;
      for (let step = 0; step < simulationSteps; step += 1) {
        updateMatch(match, simulationDt);
      }
      drawField(ctx, match, home, away, now, aimRef.current, controlModeRef.current === "simulate");

      const fieldViewport = canvas.parentElement;
      const touchCamera =
        typeof window !== "undefined" &&
        window.matchMedia("(hover: none) and (pointer: coarse)").matches;
      if (fieldViewport && touchCamera) {
        const focus =
          match.ball.owner?.side === 0
            ? match.ball.owner
            : match.players
                .filter((player) => player.side === 0)
                .sort((a, b) => distance(a, match.ball) - distance(b, match.ball))[0];
        const renderedWidth = canvas.clientWidth;
        const viewportWidth = fieldViewport.clientWidth;
        const scale = canvas.clientHeight / FIELD_H;
        const desiredLeft = focus
          ? viewportWidth * 0.44 - focus.x * scale
          : (viewportWidth - renderedWidth) / 2;
        const cameraX =
          renderedWidth <= viewportWidth
            ? (viewportWidth - renderedWidth) / 2
            : clamp(desiredLeft, viewportWidth - renderedWidth, 0);
        canvas.style.setProperty("--camera-x", `${cameraX}px`);
      } else {
        canvas.style.setProperty("--camera-x", "0px");
      }

      if (now - lastHudRef.current > 80) {
        lastHudRef.current = now;
        const homeLineup = match.players
          .filter((player) => player.side === 0)
          .sort((a, b) => a.slot - b.slot);
        setHud({
          score: [...match.score] as [number, number],
          seconds: match.seconds,
          half: match.half,
          halftime: match.halftime,
          paused: match.paused,
          over: match.over,
          message: match.messageUntil > 0 ? match.message : "",
          stamina: homeLineup.map((player) => player.stamina),
          jerseys: homeLineup.map((player) => player.jersey),
          names: homeLineup.map((player) => player.name),
          bench: [...match.bench[0]],
          substitutesLeft: match.substitutesLeft[0],
        });
      }
      animationRef.current = requestAnimationFrame(animateFrame);
    },
    [away, home, updateMatch],
  );

  const startNewCampaign = useCallback(() => {
    const next: ChampionshipCampaign = {
      version: 1,
      teamId: home.id,
      division: home.division,
      group: home.group,
      status: "groups",
      fixtures: OFFICIAL_GROUP_FIXTURES.filter((fixture) => fixture.division === home.division),
      results: [],
      createdAt: Date.now(),
    };
    setCampaign(next);
    setGameMode("championship");
    setScreen("campaign");
  }, [home]);

  const resumeCampaign = useCallback(() => {
    if (!campaign) return;
    setHomeId(campaign.teamId);
    setGameMode("championship");
    setScreen("campaign");
  }, [campaign]);

  const openCampaignMatch = useCallback((mode: ControlMode) => {
    if (!campaign || !currentCampaignFixture) return;
    const opponentId = currentCampaignFixture.homeId === campaign.teamId
      ? currentCampaignFixture.awayId
      : currentCampaignFixture.homeId;
    setHomeId(campaign.teamId);
    setAwayId(opponentId);
    setControlMode(mode);
    setSelectedRosterIndexes(bestSquadIndexes(ROSTERS_2026[campaign.teamId].players));
    setRosterQuery("");
    setScreen("squad");
  }, [campaign, currentCampaignFixture]);

  const recordCampaignMatch = useCallback(() => {
    const match = matchRef.current;
    if (!campaign || !currentCampaignFixture || !match?.over) return;
    const selectedIsOfficialHome = currentCampaignFixture.homeId === campaign.teamId;
    let homeScore = selectedIsOfficialHome ? match.score[0] : match.score[1];
    let awayScore = selectedIsOfficialHome ? match.score[1] : match.score[0];
    const homeTries = selectedIsOfficialHome ? match.tries[0] : match.tries[1];
    const awayTries = selectedIsOfficialHome ? match.tries[1] : match.tries[0];
    if (currentCampaignFixture.phase === "final" && homeScore === awayScore) {
      if (teamStrength(currentCampaignFixture.homeId) >= teamStrength(currentCampaignFixture.awayId)) homeScore += 3;
      else awayScore += 3;
    }
    const result: ChampionshipResult = {
      fixtureId: currentCampaignFixture.id,
      phase: currentCampaignFixture.phase,
      homeId: currentCampaignFixture.homeId,
      awayId: currentCampaignFixture.awayId,
      homeScore,
      awayScore,
      homeTries,
      awayTries,
    };
    setCampaign((current) => current ? advanceCampaign(current, result) : current);
    matchRef.current = null;
    setImmersiveMode(false);
    setScreen("campaign");
  }, [campaign, currentCampaignFixture]);

  const openSquadSelection = useCallback(() => {
    if (homeId === awayId) {
      const alternative = TEAMS.find((team) => team.id !== homeId);
      if (alternative) setAwayId(alternative.id);
    }
    setSelectedRosterIndexes(strongestHomeIndexes);
    setRosterQuery("");
    setScreen("squad");
  }, [awayId, homeId, strongestHomeIndexes]);

  const toggleRosterPlayer = useCallback((index: number) => {
    setSelectedRosterIndexes((current) => {
      if (current.includes(index)) return current.filter((selected) => selected !== index);
      if (current.length >= SQUAD_SIZE) return current;
      return [...current, index];
    });
  }, []);

  const startMatch = useCallback(() => {
    if (selectedSquad.length !== SQUAD_SIZE) return;
    const cpuSquad = bestSquadIndexes(awayRoster.players).map((index) => awayRoster.players[index]);
    matchRef.current = freshMatch(selectedSquad, cpuSquad, home.id, away.id);
    aimRef.current.active = false;
    joystickRef.current = { x: 0, y: 0, active: false };
    actionRef.current.sprint = false;
    if (joystickKnobRef.current) joystickKnobRef.current.style.transform = "translate(0px, 0px)";
    setAimingDrop(false);
    setHud({
      score: [0, 0],
      seconds: HALF_SECONDS,
      half: 1,
      halftime: false,
      paused: false,
      over: false,
      message: controlMode === "simulate" ? "Simulação: duas IAs em campo" : "Drop-kick inicial: seu time chuta",
      stamina: Array(PLAYERS_PER_SIDE).fill(100),
      jerseys: selectedSquad.slice(0, PLAYERS_PER_SIDE).map((player, slot) => player.number ?? slot + 1),
      names: selectedSquad.slice(0, PLAYERS_PER_SIDE).map(playerDisplayName),
      bench: selectedSquad.slice(PLAYERS_PER_SIDE),
      substitutesLeft: REPLACEMENTS_PER_SIDE,
    });
    setScreen("match");
  }, [away.id, awayRoster, controlMode, home.id, selectedSquad]);

  const restartMatch = useCallback(() => {
    const cpuSquad = bestSquadIndexes(awayRoster.players).map((index) => awayRoster.players[index]);
    matchRef.current = freshMatch(selectedSquad, cpuSquad, home.id, away.id);
    aimRef.current.active = false;
    joystickRef.current = { x: 0, y: 0, active: false };
    actionRef.current.sprint = false;
    if (joystickKnobRef.current) joystickKnobRef.current.style.transform = "translate(0px, 0px)";
    setAimingDrop(false);
    setHud({
      score: [0, 0],
      seconds: HALF_SECONDS,
      half: 1,
      halftime: false,
      paused: false,
      over: false,
      message: "Revanche: novo drop-kick inicial",
      stamina: Array(PLAYERS_PER_SIDE).fill(100),
      jerseys: selectedSquad.slice(0, PLAYERS_PER_SIDE).map((player, slot) => player.number ?? slot + 1),
      names: selectedSquad.slice(0, PLAYERS_PER_SIDE).map(playerDisplayName),
      bench: selectedSquad.slice(PLAYERS_PER_SIDE),
      substitutesLeft: REPLACEMENTS_PER_SIDE,
    });
  }, [away.id, awayRoster, home.id, selectedSquad]);

  const togglePause = useCallback(() => {
    const match = matchRef.current;
    if (!match || match.over) return;
    if (match.halftime && match.paused) {
      match.halftime = false;
      match.paused = false;
      match.lastFrame = performance.now();
      setMessage(match, "2º tempo · adversário cobra o reinício", 1.8);
      setHud((previous) => ({ ...previous, half: 2, halftime: false, paused: false }));
      haptic(12);
      return;
    }
    match.paused = !match.paused;
    if (match.paused) {
      aimRef.current.active = false;
      joystickRef.current = { x: 0, y: 0, active: false };
      actionRef.current.sprint = false;
      if (joystickKnobRef.current) joystickKnobRef.current.style.transform = "translate(0px, 0px)";
      setAimingDrop(false);
    }
    match.lastFrame = performance.now();
    setHud((previous) => ({ ...previous, paused: match.paused }));
    haptic(12);
  }, [setMessage]);

  const toggleFullscreen = useCallback(async () => {
    const fullscreenDocument = document as FullscreenDocument;
    const root = document.documentElement as FullscreenElement;
    const fullscreenElement =
      fullscreenDocument.fullscreenElement ??
      fullscreenDocument.webkitFullscreenElement;

    try {
      if (fullscreenElement) {
        if (fullscreenDocument.exitFullscreen) {
          await fullscreenDocument.exitFullscreen();
        } else {
          await fullscreenDocument.webkitExitFullscreen?.();
        }
        setImmersiveMode(false);
      } else if (root.requestFullscreen) {
        await root.requestFullscreen();
        setImmersiveMode(true);
      } else if (root.webkitRequestFullscreen) {
        await root.webkitRequestFullscreen();
        setImmersiveMode(true);
      } else {
        setImmersiveMode((current) => !current);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setImmersiveMode((current) => !current);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    haptic(14);
  }, []);

  const endPausedMatch = useCallback(() => {
    const match = matchRef.current;
    if (!match?.paused) return;
    match.running = false;
    aimRef.current.active = false;
    joystickRef.current = { x: 0, y: 0, active: false };
    actionRef.current.sprint = false;
    if (joystickKnobRef.current) joystickKnobRef.current.style.transform = "translate(0px, 0px)";
    setAimingDrop(false);
    matchRef.current = null;
    setImmersiveMode(false);
    setScreen(gameMode === "championship" ? "campaign" : "setup");
  }, [gameMode]);

  const substitutePlayer = useCallback(
    (slot: number) => {
      const match = matchRef.current;
      if (!match?.paused || match.substitutesLeft[0] <= 0) return;
      const player = match.players.find(
        (candidate) => candidate.side === 0 && candidate.slot === slot,
      );
      if (!player) return;
      const replacement = match.bench[0].shift();
      if (!replacement) return;
      player.name = playerDisplayName(replacement);
      player.photo = replacement.photo;
      player.skills = replacement.skills;
      player.stamina = 100;
      player.jersey = replacement.number ?? player.jersey;
      player.stun = 0;
      player.tackleLock = 0;
      player.routeTime = 0;
      match.substitutesLeft[0] = match.bench[0].length;
      setMessage(match, `${player.name} entrou com energia total`, 1.3);
      setHud((previous) => {
        const stamina = [...previous.stamina];
        const jerseys = [...previous.jerseys];
        const names = [...previous.names];
        stamina[slot] = 100;
        jerseys[slot] = player.jersey;
        names[slot] = player.name;
        return {
          ...previous,
          message: match.message,
          stamina,
          jerseys,
          names,
          bench: [...match.bench[0]],
          substitutesLeft: match.substitutesLeft[0],
        };
      });
    },
    [setMessage],
  );

  useEffect(() => {
    const fullscreenDocument = document as FullscreenDocument;
    const syncFullscreenState = () => {
      setImmersiveMode(
        Boolean(
          fullscreenDocument.fullscreenElement ??
          fullscreenDocument.webkitFullscreenElement,
        ),
      );
    };
    document.addEventListener("fullscreenchange", syncFullscreenState);
    document.addEventListener("webkitfullscreenchange", syncFullscreenState);
    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreenState);
      document.removeEventListener("webkitfullscreenchange", syncFullscreenState);
    };
  }, []);

  useEffect(() => {
    const hydrationTimer = window.setTimeout(() => {
      const savedWins = Number(localStorage.getItem("rugby-br-26-wins") ?? "0");
      setBestWins(Number.isFinite(savedWins) ? savedWins : 0);
      try {
        const savedCampaign = JSON.parse(localStorage.getItem(CAMPAIGN_STORAGE_KEY) ?? "null") as ChampionshipCampaign | null;
        if (savedCampaign?.version === 1 && TEAMS.some((team) => team.id === savedCampaign.teamId)) {
          setCampaign(savedCampaign);
        }
      } catch {
        localStorage.removeItem(CAMPAIGN_STORAGE_KEY);
      }
    }, 0);
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register(publicAsset("/sw.js")).catch(() => undefined);
    }
    const onInstall = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    window.addEventListener("beforeinstallprompt", onInstall);
    return () => {
      window.clearTimeout(hydrationTimer);
      window.removeEventListener("beforeinstallprompt", onInstall);
    };
  }, []);

  useEffect(() => {
    if (campaign) localStorage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify(campaign));
  }, [campaign]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(event.code)) {
        event.preventDefault();
      }
      if (controlModeRef.current === "simulate") {
        if (event.code === "Escape" || event.code === "KeyP") togglePause();
        return;
      }
      keyState.add(event.code);
      if (event.repeat) return;
      if (event.code === "Space" || event.code === "KeyJ") passBall(0);
      if (event.code === "KeyK") kickBall();
      if (event.code === "KeyQ") beginDropAim();
      if (event.code === "KeyR") performBlock();
      if (/^Digit[1-7]$/.test(event.code)) {
        passBall(0, Number(event.code.slice(-1)) - 1);
      }
      if (event.code === "Escape" && aimRef.current.active) {
        aimRef.current.active = false;
        setAimingDrop(false);
      } else if (event.code === "Escape" || event.code === "KeyP") {
        togglePause();
      }
    };
    const onKeyUp = (event: KeyboardEvent) => {
      keyState.delete(event.code);
    };
    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      keyState.clear();
    };
  }, [beginDropAim, kickBall, passBall, performBlock, togglePause]);

  useEffect(() => {
    if (screen !== "match") {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      return;
    }
    const match = matchRef.current;
    if (match) match.lastFrame = performance.now();
    animationRef.current = requestAnimationFrame(frame);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    };
  }, [frame, screen]);

  const canvasPoint = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: clamp(((event.clientX - rect.left) / rect.width) * FIELD_W, 0, FIELD_W),
      y: clamp(((event.clientY - rect.top) / rect.height) * FIELD_H, 0, FIELD_H),
    };
  };

  const handleCanvasPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (controlModeRef.current === "simulate") return;
    const point = canvasPoint(event);
    gestureRef.current = { active: true, x: event.clientX, y: event.clientY };
    if (aimRef.current.active) {
      aimRef.current.x = point.x;
      aimRef.current.y = point.y;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleCanvasPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (controlModeRef.current === "simulate") return;
    if (!aimRef.current.active) return;
    const point = canvasPoint(event);
    aimRef.current.x = point.x;
    aimRef.current.y = point.y;
  };

  const handleCanvasPointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (controlModeRef.current === "simulate") return;
    if (!gestureRef.current.active) return;
    const start = gestureRef.current;
    gestureRef.current.active = false;
    const point = canvasPoint(event);

    if (aimRef.current.active) {
      finishDropAim(point.x, point.y);
      return;
    }

    const swipeX = event.clientX - start.x;
    const swipeY = event.clientY - start.y;
    if (Math.hypot(swipeX, swipeY) > 44) {
      return;
    }

    const match = matchRef.current;
    const owner = match?.ball.owner;
    if (!match || !owner || owner.side !== 0) return;
    const selected = match.players
      .filter((player) => player.side === 0 && player !== owner)
      .sort((a, b) => distance(a, point) - distance(b, point))[0];
    if (selected && distance(selected, point) <= PLAYER_RADIUS * 2.3) {
      passBall(0, selected.slot);
    }
  };

  const handleJoystick = (event: React.PointerEvent<HTMLDivElement>) => {
    if (controlModeRef.current === "simulate") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    const length = Math.hypot(x, y);
    const deadZone = 0.14;
    const normalizedLength = clamp((Math.min(length, 1) - deadZone) / (1 - deadZone), 0, 1);
    const directionX = length > 0 ? x / length : 0;
    const directionY = length > 0 ? y / length : 0;
    const nextX = directionX * normalizedLength;
    const nextY = directionY * normalizedLength;
    joystickRef.current = {
      x: nextX,
      y: nextY,
      active: true,
    };
    if (joystickKnobRef.current) {
      joystickKnobRef.current.style.transform = `translate(${nextX * 38}px, ${nextY * 38}px)`;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const releaseJoystick = () => {
    joystickRef.current = { x: 0, y: 0, active: false };
    if (joystickKnobRef.current) {
      joystickKnobRef.current.style.transform = "translate(0px, 0px)";
    }
  };

  const installGame = async () => {
    const prompt = installPrompt as Event & { prompt?: () => Promise<void>; userChoice?: Promise<unknown> };
    if (!prompt.prompt) return;
    await prompt.prompt();
    await prompt.userChoice;
    setInstallPrompt(null);
  };

  const filteredGroups = Array.from(new Set(visibleTeams.map((team) => `${team.division}-${team.group}`)));

  return (
    <main
      className={`app-shell ${screen === "match" ? "app-shell--match" : ""} ${immersiveMode ? "app-shell--immersive" : ""}`}
    >
      <header className="topbar">
        <button
          className="brand"
          type="button"
          onClick={() => {
            setImmersiveMode(false);
            setScreen("setup");
          }}
          aria-label="Voltar à seleção"
        >
          <span className="brand-mark" aria-hidden="true">BR</span>
          <span>
            <strong>Rugby BR 26</strong>
            <small>rugby arcade brasileiro</small>
          </span>
        </button>
        <div className="topbar-actions">
          <span className="season-pill"><i /> temporada 2026</span>
          {installPrompt && (
            <button className="utility-button install-button" type="button" onClick={installGame}>
              Instalar
            </button>
          )}
          <button
            className="utility-button"
            type="button"
            onClick={toggleSound}
            aria-label={soundOn ? "Desativar som" : "Ativar som"}
          >
            {soundOn ? "Som on" : "Som off"}
          </button>
        </div>
      </header>

      {screen === "setup" ? (
        <>
          <section className="hero">
            <div className="hero-copy">
              <p className="eyebrow">RUGBY SEVENS · 7 CONTRA 7</p>
              <h1>Do clube local<br />até o <em>try.</em></h1>
              <p className="hero-intro">
                Escolha um dos 24 clubes nacionais de 2026 e entre em campo numa partida
                rápida, leve e feita para teclado ou toque.
              </p>
              <div className="hero-stats" aria-label="Resumo do jogo">
                <span><strong>24</strong> clubes</span>
                <span><strong>02</strong> divisões</span>
                <span><strong>12</strong> convocados</span>
                <span><strong>2×1</strong> minuto</span>
              </div>
            </div>
            <div className="hero-board" aria-label="Ilustração tática de um campo oficial de 100 por 70 metros">
              <div className="field-lines">
                <i className="try-left" />
                <i className="five-left" />
                <i className="twenty-two-left" />
                <i className="ten-left" />
                <i className="middle-line" />
                <i className="ten-right" />
                <i className="twenty-two-right" />
                <i className="five-right" />
                <i className="try-right" />
                <i className="touch-five-top" />
                <i className="touch-fifteen-top" />
                <i className="touch-fifteen-bottom" />
                <i className="touch-five-bottom" />
              </div>
              <div className="tactical-title">
                <span>RÁPIDO</span>
                <span>FÍSICO</span>
                <strong>BRASILEIRO</strong>
              </div>
              <strong className="tactical-format">SEVENS · 7×7</strong>
              {[0, 1, 2, 3, 4, 5, 6].map((slot) => (
                <i key={`home-${slot}`} className={`tactical-dot tactical-dot--home tactical-dot--${slot}`} />
              ))}
              {[0, 1, 2, 3, 4, 5, 6].map((slot) => (
                <i key={`away-${slot}`} className={`tactical-dot tactical-dot--away tactical-dot--${slot}`} />
              ))}
              <span className="tactical-ball" />
            </div>
          </section>

          <section className="selection-layout">
            <div className="match-card">
              <div className="mode-selector" aria-label="Modo de jogo">
                <button
                  type="button"
                  className={gameMode === "friendly" ? "active" : ""}
                  onClick={() => setGameMode("friendly")}
                >
                  <small>MODO 01</small><strong>Amistoso</strong><span>Escolha qualquer confronto</span>
                </button>
                <button
                  type="button"
                  className={gameMode === "championship" ? "active" : ""}
                  onClick={() => setGameMode("championship")}
                >
                  <small>MODO 02</small><strong>Campeonato</strong><span>Calendário e classificação</span>
                </button>
              </div>

              {gameMode === "friendly" ? (
                <>
                  <div className="section-heading">
                    <div><p className="eyebrow">PARTIDA RÁPIDA</p><h2>Monte o confronto</h2></div>
                    <span className="record-chip">{bestWins} vitórias neste aparelho</span>
                  </div>
                  <div className="versus-grid">
                    <label className="team-select">
                      <span>Time selecionado</span>
                      <div className="team-preview"><TeamBadge team={home} large /><div><strong>{home.name}</strong><small>{home.state} · {home.division}ª divisão</small><em>OVR {teamRosterOverall(home.id)} · FORMA {signedRating(officialFormBonus(home.id))} · FOR {Math.round(teamStrength(home.id))}</em></div></div>
                      <select value={homeId} onChange={(event) => setHomeId(event.target.value)}>
                        {TEAMS.map((team) => <option value={team.id} key={team.id}>{team.name} ({team.state}) — {team.division}ª divisão</option>)}
                      </select>
                    </label>
                    <span className="versus-mark">VS</span>
                    <label className="team-select">
                      <span>Adversário</span>
                      <div className="team-preview"><TeamBadge team={away} large /><div><strong>{away.name}</strong><small>{away.state} · {away.division}ª divisão</small><em>OVR {teamRosterOverall(away.id)} · FORMA {signedRating(officialFormBonus(away.id))} · FOR {Math.round(teamStrength(away.id))}</em></div></div>
                      <select value={awayId} onChange={(event) => setAwayId(event.target.value)}>
                        {TEAMS.map((team) => <option value={team.id} key={team.id}>{team.name} ({team.state}) — {team.division}ª divisão</option>)}
                      </select>
                    </label>
                  </div>
                  <div className="control-mode-picker" aria-label="Controle da partida">
                    <button type="button" className={controlMode === "control" ? "active" : ""} onClick={() => setControlMode("control")}>
                      <strong>Controlar o time</strong><span>Você joga; a outra equipe é a IA.</span>
                    </button>
                    <button type="button" className={controlMode === "simulate" ? "active" : ""} onClick={() => setControlMode("simulate")}>
                      <strong>Assistir simulação</strong><span>Duas IAs jogam e você acompanha.</span>
                    </button>
                  </div>
                  <button className="play-button" type="button" onClick={openSquadSelection}>
                    <span>Escolher os 12 jogadores</span><span aria-hidden="true">→</span>
                  </button>
                  {homeId === awayId && <p className="selection-note">O adversário será trocado automaticamente ao iniciar.</p>}
                </>
              ) : (
                <>
                  <div className="section-heading championship-heading">
                    <div><p className="eyebrow">SUPER 12 · TEMPORADA 2026</p><h2>Comece uma campanha</h2></div>
                    <span className="record-chip">progresso salvo no aparelho</span>
                  </div>
                  <label className="team-select championship-team-select">
                    <span>Seu clube no campeonato</span>
                    <div className="team-preview"><TeamBadge team={home} large /><div><strong>{home.name}</strong><small>{home.group} · {home.division}ª divisão</small><em>OVR {teamRosterOverall(home.id)} · FORMA {signedRating(officialFormBonus(home.id))} · FOR {Math.round(teamStrength(home.id))}</em></div></div>
                    <select value={homeId} onChange={(event) => setHomeId(event.target.value)}>
                      {TEAMS.map((team) => <option value={team.id} key={team.id}>{team.name} — {team.group}</option>)}
                    </select>
                  </label>
                  <div className="championship-format">
                    <strong>{home.division === 1 ? "6 jogos de grupo · ida e volta" : "3 jogos de grupo · turno único"}</strong>
                    <span>
                      {home.division === 1
                        ? "Os dois melhores de cada grupo avançam ao hexagonal; os demais vão à repescagem."
                        : "Os dois melhores de cada taça avançam à repescagem pelo acesso."}
                    </span>
                  </div>
                  {campaign && (
                    <button className="saved-campaign" type="button" onClick={resumeCampaign}>
                      <TeamBadge team={teamById(campaign.teamId)} />
                      <span><small>CAMPANHA SALVA</small><strong>Continuar com {teamById(campaign.teamId).name}</strong></span>
                      <i>→</i>
                    </button>
                  )}
                  <button className="play-button" type="button" onClick={startNewCampaign}>
                    <span>{campaign ? "Iniciar nova campanha" : "Iniciar campeonato"}</span><span aria-hidden="true">→</span>
                  </button>
                  {campaign && <p className="selection-note">Uma nova campanha substitui o progresso salvo atual.</p>}
                </>
              )}
            </div>

            <aside className="controls-card">
              <p className="eyebrow">COMO JOGAR</p>
              <h2>Um minuto para aprender.</h2>
              <div className="control-row">
                <span className="key-group"><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></span>
                <span>Mover o atleta com o indicador amarelo</span>
              </div>
              <div className="control-row">
                <span className="key-group"><kbd>SPACE</kbd></span>
                <span>Passe lateral ou para trás; nunca para a frente</span>
              </div>
              <div className="control-row">
                <span className="key-group"><kbd>1</kbd><kbd>—</kbd><kbd>7</kbd></span>
                <span>Escolher o recebedor; também pode clicar nele</span>
              </div>
              <div className="control-row">
                <span className="key-group"><kbd>SHIFT</kbd></span>
                <span>Correr — acelera, mas gasta mais energia</span>
              </div>
              <div className="control-row">
                <span className="key-group"><kbd>K</kbd></span>
                <span>Chutar à frente e disputar a bola no campo</span>
              </div>
              <div className="control-row">
                <span className="key-group"><kbd>R</kbd></span>
                <span>Block: os dois apoios cruzam atrás do portador</span>
              </div>
              <div className="control-row">
                <span className="key-group"><kbd>Q</kbd><kbd>CLICK</kbd></span>
                <span>Drop: mire e clique exatamente entre os postes</span>
              </div>
              <div className="control-row">
                <span className="key-group"><kbd>CPU</kbd></span>
                <span>O fullback mantém profundidade e avança quando a primeira linha é rompida</span>
              </div>
              <p className="touch-note">
                No celular, a câmera acompanha o portador e os controles ficam separados do campo.
                Na horizontal, o jogo ocupa melhor a tela.
              </p>
            </aside>
          </section>

          <section className="clubs-section">
            <div className="section-heading clubs-heading">
              <div>
                <p className="eyebrow">CAMPEONATO BRASILEIRO MASCULINO XV</p>
                <h2>Clubes da temporada</h2>
              </div>
              <div className="filter-tabs" aria-label="Filtrar clubes">
                <button className={divisionFilter === 1 ? "active" : ""} onClick={() => setDivisionFilter(1)} type="button">1ª divisão</button>
                <button className={divisionFilter === 2 ? "active" : ""} onClick={() => setDivisionFilter(2)} type="button">2ª divisão</button>
                <button className={divisionFilter === "all" ? "active" : ""} onClick={() => setDivisionFilter("all")} type="button">Todos</button>
              </div>
            </div>
            <div className="groups-grid">
              {filteredGroups.map((groupKey) => {
                const teams = visibleTeams.filter((team) => `${team.division}-${team.group}` === groupKey);
                return (
                  <article className="group-card" key={groupKey}>
                    <p>{teams[0].group}</p>
                    {teams.map((team) => (
                      <button
                        type="button"
                        className="club-row"
                        key={team.id}
                        onClick={() => setHomeId(team.id)}
                        aria-label={`Jogar com ${team.name}`}
                      >
                        <TeamBadge team={team} />
                        <span><strong>{team.name}</strong><small>{team.state}</small></span>
                        <i aria-hidden="true">↗</i>
                      </button>
                    ))}
                  </article>
                );
              })}
            </div>
          </section>
        </>
      ) : screen === "campaign" ? (
        <section className="campaign-stage">
          {!campaign ? (
            <div className="campaign-empty">
              <h1>Nenhuma campanha salva</h1>
              <button className="play-button" type="button" onClick={() => setScreen("setup")}>Escolher um clube <span>→</span></button>
            </div>
          ) : (
            <>
              <div className="campaign-hero">
                <button className="back-button" type="button" onClick={() => setScreen("setup")}>← Modos de jogo</button>
                <div className="campaign-club"><TeamBadge team={teamById(campaign.teamId)} large /><span><p className="eyebrow">CAMPANHA 2026 · {campaign.division}ª DIVISÃO</p><h1>{teamById(campaign.teamId).name}</h1><small>{campaign.group} · {phaseLabel(campaignPhase)}</small></span></div>
                <div className="campaign-progress">
                  <span>{campaignCalendar.filter((fixture) => campaign.results.some((result) => result.fixtureId === fixture.id)).length}/{campaignCalendar.length}</span>
                  <small>partidas desta fase</small>
                </div>
              </div>

              <div className="campaign-grid">
                <section className="campaign-main-card">
                  {currentCampaignFixture ? (
                    <>
                      <div className="next-fixture-kicker"><span>PRÓXIMA PARTIDA</span><strong>{phaseLabel(currentCampaignFixture.phase)} · Rodada {currentCampaignFixture.round}</strong></div>
                      <div className="campaign-versus">
                        <div><TeamBadge team={teamById(currentCampaignFixture.homeId)} large /><strong>{teamById(currentCampaignFixture.homeId).name}</strong><span className="match-team-overall"><b>{teamRosterOverall(currentCampaignFixture.homeId)}</b><small>OVR · FOR {Math.round(teamStrength(currentCampaignFixture.homeId))}</small></span><small>Mandante · forma {signedRating(officialFormBonus(currentCampaignFixture.homeId))} · {officialTeamForm(currentCampaignFixture.homeId).wins}V {officialTeamForm(currentCampaignFixture.homeId).draws}E {officialTeamForm(currentCampaignFixture.homeId).losses}D</small></div>
                        <span><b>VS</b><small>{currentCampaignFixture.date ?? "Data a definir"}{currentCampaignFixture.time ? ` · ${currentCampaignFixture.time}` : ""}</small></span>
                        <div><TeamBadge team={teamById(currentCampaignFixture.awayId)} large /><strong>{teamById(currentCampaignFixture.awayId).name}</strong><span className="match-team-overall"><b>{teamRosterOverall(currentCampaignFixture.awayId)}</b><small>OVR · FOR {Math.round(teamStrength(currentCampaignFixture.awayId))}</small></span><small>Visitante · forma {signedRating(officialFormBonus(currentCampaignFixture.awayId))} · {officialTeamForm(currentCampaignFixture.awayId).wins}V {officialTeamForm(currentCampaignFixture.awayId).draws}E {officialTeamForm(currentCampaignFixture.awayId).losses}D</small></div>
                      </div>
                      <div className="campaign-play-options">
                        <button className="play-button" type="button" onClick={() => openCampaignMatch("control")}><span>Controlar {teamById(campaign.teamId).short}</span><span>→</span></button>
                        <button className="secondary-button simulate-button" type="button" onClick={() => openCampaignMatch("simulate")}><span>Assistir duas IAs</span><span>◎</span></button>
                      </div>
                      <p className="campaign-note">Antes da partida você escolhe os 7 titulares e 5 reservas. A simulação combina o OVR dos convocados com a forma oficial de 2026; ainda existe variação em cada partida.</p>
                    </>
                  ) : (
                    <div className="campaign-outcome">
                      <p className="eyebrow">CAMPANHA CONCLUÍDA</p>
                      <h2>
                        {campaign.status === "champion" && "Campeão brasileiro!"}
                        {campaign.status === "runner-up" && "Vice-campeão brasileiro"}
                        {campaign.status === "promoted" && "Acesso conquistado!"}
                        {campaign.status === "repechage-complete" && "Repescagem concluída"}
                        {campaign.status === "eliminated" && "Fim da campanha"}
                      </h2>
                      <p>
                        {campaign.status === "champion" && "Seu clube terminou o hexagonal entre os dois primeiros e venceu a final."}
                        {campaign.status === "runner-up" && "Seu clube chegou até a decisão do Super 12."}
                        {campaign.status === "promoted" && "Seu clube ficou entre os dois melhores da repescagem e garantiu vaga na 1ª divisão de 2027."}
                        {campaign.status === "repechage-complete" && "A equipe disputou toda a repescagem, mas terminou fora das duas vagas de acesso."}
                        {campaign.status === "eliminated" && "A posição na fase concluída não deu vaga à etapa seguinte."}
                      </p>
                      <button className="play-button" type="button" onClick={() => setScreen("setup")}>Voltar aos modos <span>→</span></button>
                    </div>
                  )}
                </section>

                <aside className="standings-card">
                  <div><p className="eyebrow">CLASSIFICAÇÃO</p><h2>{campaignPhase === "groups" ? campaign.group : phaseLabel(campaignPhase)}</h2></div>
                  <div className="standings-table" role="table" aria-label="Classificação da campanha">
                    <div className="standings-row standings-head" role="row"><span>#</span><span>Clube</span><span>J</span><span>SG</span><strong>PTS</strong></div>
                    {campaignStandings.map((standing, index) => (
                      <div className={`standings-row ${standing.teamId === campaign.teamId ? "is-user" : ""}`} role="row" key={standing.teamId}>
                        <span>{index + 1}</span><span><TeamBadge team={teamById(standing.teamId)} /><b>{teamById(standing.teamId).short}</b></span><span>{standing.played}</span><span>{standing.pointsFor - standing.pointsAgainst}</span><strong>{standing.tablePoints}</strong>
                      </div>
                    ))}
                  </div>
                  <p className="standings-rule">4 pts vitória · 2 empate · bônus por 4 tries e derrota por até 7. Desempate por saldo, tries e pontos marcados.</p>
                </aside>
              </div>

              <section className="campaign-calendar-card">
                <div className="section-heading"><div><p className="eyebrow">CALENDÁRIO</p><h2>Todos os jogos do seu clube</h2></div><span className="record-chip">datas oficiais na fase de grupos</span></div>
                <div className="campaign-calendar">
                  {campaignCalendar.map((fixture) => {
                    const result = campaign.results.find((item) => item.fixtureId === fixture.id);
                    const opponentId = fixture.homeId === campaign.teamId ? fixture.awayId : fixture.homeId;
                    return (
                      <div className={`calendar-fixture ${fixture.id === currentCampaignFixture?.id ? "is-next" : ""}`} key={fixture.id}>
                        <span><small>RODADA {fixture.round}</small><strong>{fixture.date ?? phaseLabel(fixture.phase)}</strong></span>
                        <span><TeamBadge team={teamById(opponentId)} /><b>{fixture.homeId === campaign.teamId ? "vs" : "@"} {teamById(opponentId).name}</b></span>
                        <strong>{result ? `${result.homeScore} × ${result.awayScore}` : fixture.id === currentCampaignFixture?.id ? "PRÓXIMO" : "—"}</strong>
                      </div>
                    );
                  })}
                </div>
              </section>
            </>
          )}
        </section>
      ) : screen === "squad" ? (
        <section className="squad-stage">
          <div className="squad-heading">
            <button className="back-button" type="button" onClick={() => setScreen(gameMode === "championship" ? "campaign" : "setup")}>
              ← {gameMode === "championship" ? "Voltar à campanha" : "Alterar confronto"}
            </button>
            <div>
              <p className="eyebrow">CONVOCAÇÃO · {home.name.toUpperCase()}</p>
              <h1>Escolha seus 12</h1>
              <p>
                Os 7 primeiros selecionados começam em campo. Os outros 5 ficam no banco
                para entrar durante as pausas ou no intervalo. O elenco exibido não tem limite:
                o máximo de 12 vale somente para a convocação da partida.
              </p>
            </div>
            <TeamBadge team={home} large />
          </div>

          <div className="squad-layout">
            <section className="roster-picker" aria-label={`Elenco masculino de ${home.name}`}>
              <div className="roster-toolbar">
                <div>
                  <p className="eyebrow">ELENCO DISPONÍVEL · BID 2026</p>
                  <h2>{homeRoster.players.length} atletas disponíveis</h2>
                  <small className="roster-breakdown">
                    {homeRosterStats.registered} inscritos no BID · {homeRosterStats.appeared} presentes em súmula
                  </small>
                </div>
                <strong className={selectedSquad.length === SQUAD_SIZE ? "is-complete" : ""}>
                  {selectedSquad.length}/{SQUAD_SIZE}
                </strong>
              </div>
              <div className="roster-search">
                <label htmlFor="roster-search-input">Buscar atleta</label>
                <div>
                  <span aria-hidden="true">⌕</span>
                  <input
                    id="roster-search-input"
                    type="search"
                    value={rosterQuery}
                    onChange={(event) => setRosterQuery(event.target.value)}
                    placeholder={`Nome no elenco do ${home.name}`}
                    autoComplete="off"
                  />
                  {rosterQuery && (
                    <button type="button" onClick={() => setRosterQuery("")} aria-label="Limpar busca">×</button>
                  )}
                </div>
                <small>{filteredRoster.length} de {homeRoster.players.length} atletas exibidos</small>
              </div>
              <div className="ratings-method">
                <strong>OVR estatístico 2026</strong>
                <p>
                  Usa jogos, titularidades, vitórias, tries, conversões, penalidades, drops e cartões das súmulas oficiais.
                  Velocidade e tackle são estimativas pela posição mais utilizada e pela forma — não medições físicas.
                </p>
                <span><b>Alta</b> 3+ jogos</span><span><b>Média</b> 1–2 jogos</span><span><b>Base</b> sem súmula</span>
              </div>
              <div className="roster-grid">
                {filteredRoster.map(({ athlete, index }) => {
                  const selectedPosition = selectedRosterIndexes.indexOf(index);
                  const isSelected = selectedPosition >= 0;
                  return (
                    <button
                      type="button"
                      className={`roster-player ${isSelected ? "is-selected" : ""}`}
                      key={athlete.profile ?? `${athlete.number}-${athlete.name}-${index}`}
                      onClick={() => toggleRosterPlayer(index)}
                      disabled={!isSelected && selectedSquad.length >= SQUAD_SIZE}
                      aria-pressed={isSelected}
                    >
                      <span className="roster-avatar" data-initials={playerInitials(athlete.name)}>
                        {athlete.photo && (
                          <img
                            src={athlete.photo}
                            alt=""
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={(event) => { event.currentTarget.style.display = "none"; }}
                          />
                        )}
                      </span>
                      <span>
                        <strong>{athlete.name}</strong>
                        {athlete.nickname && (
                          <em className="roster-nickname">“{athlete.nickname}”</em>
                        )}
                        <small>
                          {athlete.appeared2026
                            ? `${athlete.number ? `#${athlete.number} · ${rosterRole(athlete.number)} · ` : ""}BID + súmula 2026`
                            : "Disponível no BID 2026"}
                        </small>
                        <small className="roster-official-stats">
                          {athlete.stats.appearances
                            ? `${athlete.stats.appearances}J · ${athlete.stats.wins}V · ${athlete.stats.tries}T · ${athlete.stats.points}PTS`
                            : "Sem evento oficial em 2026"}
                        </small>
                        <span className="roster-skills" aria-label="Atributos do atleta">
                          <span>VEL <b>{athlete.skills.speed}</b></span>
                          <span>TAC <b>{athlete.skills.tackle}</b></span>
                          <span>PAS <b>{athlete.skills.pass}</b></span>
                          <span>CHU <b>{athlete.skills.kick}</b></span>
                          <span>FIS <b>{athlete.skills.stamina}</b></span>
                          <span>ATA <b>{athlete.skills.attack}</b></span>
                        </span>
                      </span>
                      <span
                        className={`overall-rating overall-rating--${athlete.skills.confidence}`}
                        title={`Overall ${athlete.skills.overall} · confiança ${athlete.skills.confidence}`}
                      >
                        <b>{athlete.skills.overall}</b><small>OVR</small>
                      </span>
                      <i>
                        {selectedPosition < 0
                          ? "+"
                          : selectedPosition < PLAYERS_PER_SIDE
                            ? `T${selectedPosition + 1}`
                            : `R${selectedPosition - PLAYERS_PER_SIDE + 1}`}
                      </i>
                    </button>
                  );
                })}
                {filteredRoster.length === 0 && (
                  <p className="roster-empty">Nenhum atleta encontrado para “{rosterQuery}”.</p>
                )}
              </div>
              <p className="roster-source">
                Lista formada pelos inscritos no BID oficial e por todos os atletas encontrados nas {homeRoster.sheets.length} súmulas
                masculinas do clube em 2026 — inclusive atletas registrados apenas nos eventos da partida. O OVR é recalculado a partir
                desses dados e usa uma base posicional quando não existe amostra. Fotos exibidas somente quando disponíveis.{" "}
                <a href={homeRoster.bid} target="_blank" rel="noreferrer">BID 2026</a>{" · "}
                <a href={homeRoster.competition} target="_blank" rel="noreferrer">Campeonato</a>{" · "}
                <a href={homeRoster.source} target="_blank" rel="noreferrer">Perfil do clube no Sporti</a>.
              </p>
            </section>

            <aside className="squad-summary">
              <p className="eyebrow">ORDEM DA CONVOCAÇÃO</p>
              <h2>7 titulares + 5 reservas</h2>
              <div className="team-overall-card" aria-label={`Overall do time ${selectedTeamOverall}`}>
                <span><small>OVR DO TIME</small><strong>{selectedTeamOverall || "—"}</strong></span>
                <p>Média dos {selectedSquad.length} jogadores selecionados para a partida.</p>
              </div>
              <div className="selected-squad">
                {selectedSquad.map((athlete, slot) => (
                  <div key={`${slot}-${athlete.profile ?? athlete.name}`}>
                    <span>{slot < PLAYERS_PER_SIDE ? `T${slot + 1}` : `R${slot - PLAYERS_PER_SIDE + 1}`}</span>
                    <strong>
                      {athlete.number ? `#${athlete.number} ` : ""}{athlete.name}
                      {athlete.nickname ? ` · “${athlete.nickname}”` : ""}
                      {` · OVR ${athlete.skills.overall}`}
                    </strong>
                  </div>
                ))}
                {Array.from({ length: Math.max(0, SQUAD_SIZE - selectedSquad.length) }, (_, index) => (
                  <div className="is-empty" key={`empty-${index}`}>
                    <span>—</span><strong>Escolha mais um atleta</strong>
                  </div>
                ))}
              </div>
              <button
                className="play-button"
                type="button"
                onClick={startMatch}
                disabled={selectedSquad.length !== SQUAD_SIZE}
              >
                <span>{controlMode === "simulate" ? "Assistir à simulação" : "Começar o 1º tempo"}</span><span aria-hidden="true">→</span>
              </button>
              <button
                className="secondary-button reset-squad"
                type="button"
                onClick={() => setSelectedRosterIndexes(strongestHomeIndexes)}
              >
                Selecionar os 12 maiores OVRs
              </button>
            </aside>
          </div>
        </section>
      ) : (
        <section className="game-stage">
          <div className="match-hud">
            <div className="hud-team">
              <TeamBadge team={home} />
              <span><small>{controlMode === "simulate" ? "IA" : "VOCÊ"} · OVR {selectedTeamOverall}</small><strong>{home.short}</strong></span>
            </div>
            <strong className="score">{hud.score[0]}</strong>
            <div className="match-clock">
              <span>{formatClock(hud.seconds)}</span>
              <small>
                {hud.halftime
                  ? "INTERVALO"
                  : hud.paused
                    ? `${hud.half}º TEMPO · PAUSADO`
                    : `${hud.half}º TEMPO · 7×7`}
              </small>
            </div>
            <strong className="score">{hud.score[1]}</strong>
            <div className="hud-team hud-team--away">
              <span><small>IA</small><strong>{away.short}</strong></span>
              <TeamBadge team={away} />
            </div>
          </div>

          <div className="canvas-frame">
            <div className="field-viewport">
              <canvas
                ref={canvasRef}
                width={FIELD_W}
                height={FIELD_H}
                className={aimingDrop ? "is-aiming" : ""}
                role="img"
                aria-label={`Partida de rugby sevens, sete contra sete, entre ${home.name} e ${away.name}, em campo de 100 por 70 metros com in-goal de 10 metros. Use WASD para mover, números de 1 a 7 para escolher o passe, K para chutar à frente, R para o block e Q para mirar o drop.`}
                onPointerDown={handleCanvasPointerDown}
                onPointerMove={handleCanvasPointerMove}
                onPointerUp={handleCanvasPointerUp}
                onPointerCancel={() => { gestureRef.current.active = false; }}
              />
              {hud.message && <div className="game-message">{hud.message}</div>}
            </div>
            {controlMode === "simulate" ? (
              <div className="simulation-banner">
                <span><i /> SIMULAÇÃO AO VIVO · DUAS IAS EM CAMPO</span>
                <div className="simulation-speed" aria-label="Velocidade da simulação">
                  <button type="button" className={simulationSpeed === 1 ? "active" : ""} onClick={() => setSimulationSpeed(1)} aria-pressed={simulationSpeed === 1}>1×</button>
                  <button type="button" className={simulationSpeed === 2 ? "active" : ""} onClick={() => setSimulationSpeed(2)} aria-pressed={simulationSpeed === 2}>2×</button>
                </div>
              </div>
            ) : (
            <div className="mobile-controls" aria-label="Controles por toque">
              <div
                className="joystick"
                onPointerDown={handleJoystick}
                onPointerMove={(event) => joystickRef.current.active && handleJoystick(event)}
                onPointerUp={releaseJoystick}
                onPointerCancel={releaseJoystick}
                onLostPointerCapture={releaseJoystick}
              >
                <span
                  ref={joystickKnobRef}
                />
              </div>
              <div className="action-buttons">
                <button type="button" className="action action--drop" onPointerDown={beginDropAim}><strong>Q</strong><small>DROP</small></button>
                <button
                  type="button"
                  className="action action--block"
                  onPointerDown={performBlock}
                >
                  <strong>R</strong><small>BLOCK</small>
                </button>
                <button type="button" className="action action--kick" onPointerDown={kickBall}><strong>K</strong><small>CHUTE</small></button>
                <button
                  type="button"
                  className="action action--sprint"
                  onPointerDown={(event) => {
                    event.currentTarget.setPointerCapture(event.pointerId);
                    actionRef.current.sprint = true;
                  }}
                  onPointerUp={() => { actionRef.current.sprint = false; }}
                  onPointerCancel={() => { actionRef.current.sprint = false; }}
                  onLostPointerCapture={() => { actionRef.current.sprint = false; }}
                >
                  <strong>B</strong><small>CORRER</small>
                </button>
                <button type="button" className="action action--pass" onPointerDown={() => passBall(0)}><strong>A</strong><small>PASSE</small></button>
              </div>
            </div>
            )}
          </div>

          <div className="game-toolbar">
            <button
              type="button"
              onPointerDown={(event) => {
                event.preventDefault();
                togglePause();
              }}
              onClick={(event) => {
                if (event.detail === 0) togglePause();
              }}
            >
              {hud.halftime ? "Iniciar 2º tempo" : hud.paused ? "Continuar" : "Pausar"}
            </button>
            {hud.paused && (
              <button className="end-match-button" type="button" onClick={endPausedMatch}>
                Encerrar partida
              </button>
            )}
            <span>{controlMode === "simulate" ? "Modo espectador · pause para fazer substituições" : <><kbd>1–7</kbd> passe · <kbd>K</kbd> chute à frente · <kbd>R</kbd> block · <kbd>Q</kbd> drop</>}</span>
            <button
              type="button"
              onPointerDown={(event) => {
                event.preventDefault();
                void toggleFullscreen();
              }}
              onClick={(event) => {
                if (event.detail === 0) void toggleFullscreen();
              }}
            >
              {immersiveMode ? "Sair da tela cheia" : "Tela cheia"}
            </button>
          </div>

          {hud.paused && (
            <section className="substitution-panel" aria-label="Banco de reservas">
              <div>
                <p className="eyebrow">{controlMode === "simulate" ? "GESTÃO NA SIMULAÇÃO" : "BANCO DE RESERVAS"}</p>
                <h3>{hud.substitutesLeft} substituições disponíveis</h3>
              </div>
              <div className="substitution-list">
                {hud.stamina.map((stamina, slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => substitutePlayer(slot)}
                    disabled={hud.substitutesLeft <= 0}
                    aria-label={`Substituir ${hud.names[slot]}, camisa ${hud.jerseys[slot]}, energia ${Math.round(stamina)} por cento, por ${hud.bench[0]?.name ?? "um reserva"}`}
                  >
                    <span>#{hud.jerseys[slot]}</span>
                    <em>{hud.names[slot]}</em>
                    <i><b style={{ width: `${stamina}%` }} /></i>
                    <small>{Math.round(stamina)}%</small>
                    <strong>{hud.bench[0] ? `Entra ${hud.bench[0].number ? `#${hud.bench[0].number}` : hud.bench[0].name}` : "Sem reserva"}</strong>
                  </button>
                ))}
              </div>
              <p>
                Próximo do banco: {hud.bench[0] ? `${hud.bench[0].name}${hud.bench[0].number ? ` (#${hud.bench[0].number})` : ""}` : "banco utilizado"}.
                Pause a partida para trocar qualquer atleta cansado.
              </p>
            </section>
          )}

          {hud.over && (
            <div className="result-actions">
              {gameMode === "championship" ? (
                <button className="play-button" type="button" onClick={recordCampaignMatch}>Salvar resultado e continuar <span>→</span></button>
              ) : (
                <>
                  <button className="play-button" type="button" onClick={restartMatch}>Jogar revanche <span>↻</span></button>
                  <button className="secondary-button" type="button" onClick={() => { setImmersiveMode(false); setScreen("setup"); }}>Trocar clubes</button>
                </>
              )}
            </div>
          )}
        </section>
      )}

      <footer>
        <p>
          Protótipo independente. Clubes conforme a lista oficial da{" "}
          <a
            href="https://brasilrugby.com.br/2026/01/29/grupos-e-times-definidos-para-o-super-12-de-rugby-1a-e-2a-divisoes/"
            target="_blank"
            rel="noreferrer"
          >
            Confederação Brasileira de Rugby
          </a>{" "}
          publicada em 29/01/2026. Os nomes dos atletas vêm das súmulas masculinas oficiais
          de 2026 no Sporti; uso demonstrativo neste protótipo independente.
        </p>
        <span>HTML5 Canvas · PWA · sem downloads pesados</span>
      </footer>
    </main>
  );
}
