#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(SCRIPT_DIR, "..");
const REFERENCE_YEAR = 2026;
const ATTRIBUTE_KEYS = ["speed", "tackle", "pass", "kick", "stamina", "attack"];
const ATTRIBUTE_WEIGHTS = {
  speed: 0.18,
  tackle: 0.2,
  pass: 0.18,
  kick: 0.12,
  stamina: 0.16,
  attack: 0.16,
};

const TEAM_NAMES = {
  farrapos: "Farrapos",
  charrua: "Charrua",
  joaca: "Joaca",
  desterro: "Desterro",
  poli: "Poli",
  "sao-jose": "São José",
  tornados: "Tornados Indaiatuba",
  "rio-branco": "Rio Branco",
  jacarei: "Jacareí",
  spac: "SPAC",
  pasteur: "Pasteur",
  "nova-lima": "Nova Lima",
  brummers: "Brummers",
  colonos: "Colonos",
  "serra-gaucha": "Serra Gaúcha",
  joinville: "Joinville",
  "pe-vermelho": "Pé Vermelho",
  leoes: "Leões de Paraisópolis",
  urutu: "Urutu",
  iguanas: "Iguanas SJC",
  niteroi: "Niterói",
  rio: "Rio Rugby",
  carioca: "Carioca",
  vitoria: "Vitória",
};

export const POSITION_SKILLS = {
  frontRow: { speed: 54, tackle: 79, pass: 55, kick: 42, stamina: 72, attack: 66 },
  lock: { speed: 58, tackle: 78, pass: 57, kick: 42, stamina: 75, attack: 67 },
  backRow: { speed: 69, tackle: 81, pass: 64, kick: 45, stamina: 81, attack: 73 },
  scrumHalf: { speed: 78, tackle: 66, pass: 86, kick: 68, stamina: 80, attack: 75 },
  flyHalf: { speed: 76, tackle: 64, pass: 84, kick: 85, stamina: 77, attack: 80 },
  wing: { speed: 89, tackle: 62, pass: 70, kick: 61, stamina: 76, attack: 87 },
  centre: { speed: 81, tackle: 73, pass: 77, kick: 59, stamina: 78, attack: 81 },
  fullback: { speed: 85, tackle: 68, pass: 78, kick: 79, stamina: 78, attack: 83 },
  unknown: { speed: 68, tackle: 68, pass: 68, kick: 60, stamina: 70, attack: 68 },
};

const POSITION_LABELS = {
  frontRow: "Primeira linha",
  lock: "Segunda linha",
  backRow: "Terceira linha",
  scrumHalf: "Scrum-half",
  flyHalf: "Abertura",
  wing: "Ponta",
  centre: "Centro",
  fullback: "Fullback",
  unknown: "Indefinida",
};

export const createEmptyEvidence = () => ({
  officialNames: new Set(),
  sources: new Set(),
  competitions: new Set(),
  seasons: new Set(),
  listed: 0,
  starts: 0,
  entries: 0,
  unusedBench: 0,
  sevensSquads: 0,
  effectiveParticipation: 0,
  weightedTries: 0,
  weightedConversions: 0,
  weightedPenalties: 0,
  weightedDropGoals: 0,
  weightedYellowCards: 0,
  weightedRedCards: 0,
  tries: 0,
  conversions: 0,
  penalties: 0,
  dropGoals: 0,
  yellowCards: 0,
  redCards: 0,
  roleWeights: {},
});

function decodeEntities(value = "") {
  const named = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: '"' };
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (_, entity) => {
      if (entity[0] === "#") {
        const hexadecimal = entity[1].toLowerCase() === "x";
        return String.fromCodePoint(
          Number.parseInt(entity.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10),
        );
      }
      return named[entity.toLowerCase()] ?? `&${entity};`;
    })
    .replace(/\s+/g, " ")
    .trim();
}

export function normalize(value = "") {
  return decodeEntities(value)
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[^a-z0-9]+/g, "");
}

function words(value = "") {
  return decodeEntities(value)
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 1);
}

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value));
}

function weightedOverall(skills) {
  return ATTRIBUTE_KEYS.reduce(
    (total, key) => total + skills[key] * ATTRIBUTE_WEIGHTS[key],
    0,
  );
}

export function positionFromNumber(number) {
  if (number >= 1 && number <= 3) return "frontRow";
  if (number >= 4 && number <= 5) return "lock";
  if (number >= 6 && number <= 8) return "backRow";
  if (number === 9) return "scrumHalf";
  if (number === 10) return "flyHalf";
  if (number === 11 || number === 14) return "wing";
  if (number === 12 || number === 13) return "centre";
  if (number === 15) return "fullback";
  return "unknown";
}

function reserveRolePrior(number) {
  if ([16, 17, 18].includes(number)) return { frontRow: 1 };
  if (number === 19) return { lock: 0.6, backRow: 0.4 };
  if (number === 20) return { backRow: 0.7, lock: 0.3 };
  if (number === 21) return { scrumHalf: 0.75, flyHalf: 0.25 };
  if (number === 22) return { flyHalf: 0.45, centre: 0.35, fullback: 0.2 };
  if (number === 23) return { wing: 0.4, centre: 0.3, fullback: 0.3 };
  return {};
}

function addRoleWeights(target, additions, multiplier = 1) {
  Object.entries(additions).forEach(([role, weight]) => {
    target[role] = (target[role] ?? 0) + weight * multiplier;
  });
}

function formatFromCompetition(name) {
  const folded = words(name).join(" ");
  return /\bseven(s)?\b|\b7s\b/.test(folded) ? "sevens" : "xv";
}

export function isAdultOfficialMatch(match) {
  const folded = words(match.NomeCampeonato ?? "").join(" ");
  const excluded = [
    /feminino/,
    /juvenil/,
    /\bsub\s?(15|16|17|18|19|20|21)\b/,
    /\bm\s?(15|16|17|18|19|20|21)\b/,
    /\bf\s?(15|16|17|18|19|20|21)\b/,
  ];
  return !excluded.some((pattern) => pattern.test(folded));
}

function parseTeamPlayers(html, bodyId) {
  const body = html.match(
    new RegExp(`<tbody[^>]+id=["']${bodyId}["'][^>]*>([\\s\\S]*?)<\\/tbody>`, "i"),
  )?.[1] ?? "";
  return Array.from(body.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)).flatMap(
    ([, row], index) => {
      const cells = Array.from(
        row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi),
        (match) => decodeEntities(match[1]),
      );
      const number = Number.parseInt(cells[0] ?? "", 10);
      const name = cells[1]?.trim();
      return name
        ? [{ name, index, ...(Number.isFinite(number) ? { number } : {}) }]
        : [];
    },
  );
}

function parseEvents(html) {
  const table = html.match(
    /<table[^>]+id=["']tabelaEventos["'][^>]*>([\s\S]*?)<\/table>/i,
  )?.[1] ?? "";
  return Array.from(table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)).flatMap(([, row]) => {
    const cells = Array.from(
      row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi),
      (match) => decodeEntities(match[1]),
    );
    if (cells.length < 6) return [];
    const athleteMatch = cells[5].match(/^(\d+)\s*-\s*(.+)$/);
    return [{
      stage: cells[1],
      minute: Number.parseInt(cells[2], 10),
      event: cells[3],
      team: cells[4],
      athlete: athleteMatch?.[2]?.trim() ?? cells[5].trim(),
      number: athleteMatch ? Number.parseInt(athleteMatch[1], 10) : undefined,
    }];
  });
}

export function parseOfficialSheet(html, url = "") {
  const teamNames = Array.from(
    html.matchAll(/<h2[^>]*class=["'][^"']*nomesEquipes[^"']*["'][^>]*>([\s\S]*?)<\/h2>/gi),
    (match) => decodeEntities(match[1]),
  ).slice(0, 2);
  return {
    url,
    teamNames,
    teams: [
      { name: teamNames[0] ?? "", players: parseTeamPlayers(html, "bodyCasa") },
      { name: teamNames[1] ?? "", players: parseTeamPlayers(html, "bodyVisitante") },
    ],
    events: parseEvents(html),
  };
}

function parseSportiDate(value) {
  const milliseconds = Number.parseInt(String(value).match(/\d{10,}/)?.[0] ?? "", 10);
  return Number.isFinite(milliseconds) ? new Date(milliseconds) : null;
}

function sportiYearMonth(value) {
  const date = parseSportiDate(value);
  if (!date) return null;
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  return year && month ? `${year}-${month}` : null;
}

function officialSheetUrl(match) {
  const yearMonth = sportiYearMonth(match.DataPartida);
  if (!yearMonth) throw new Error(`Data inválida para a súmula ${match.ID}`);
  const organization = match.NomeSiteOrganizacao || "CBRU";
  return `https://plataforma.sporti.com.br/${organization}/campeonatos/${yearMonth}-${match.NomeSiteCampeonato}/sumula/${match.ID}`;
}

function profileAlias(profile) {
  if (!profile) return "";
  try {
    return decodeURIComponent(new URL(profile).pathname.split("/").filter(Boolean).at(-1) ?? "")
      .replace(/-\d+$/, "");
  } catch {
    return "";
  }
}

function identityAliases(player) {
  return [...new Set([
    player.name,
    player.nickname,
    profileAlias(player.profile),
  ].filter(Boolean).map(normalize).filter((alias) => alias.length >= 4))];
}

function diceSimilarity(left, right) {
  const bigrams = (value) => {
    if (value.length < 2) return new Set([value]);
    return new Set(Array.from({ length: value.length - 1 }, (_, index) => value.slice(index, index + 2)));
  };
  const a = bigrams(left);
  const b = bigrams(right);
  const intersection = [...a].filter((item) => b.has(item)).length;
  return (2 * intersection) / (a.size + b.size || 1);
}

export function createPlayerMatcher(players) {
  const identities = players.map((player, index) => ({
    player,
    index,
    primary: normalize(player.name),
    aliases: identityAliases(player),
  }));
  return (officialName) => {
    const candidateName = normalize(officialName);
    const primary = identities.filter((identity) => identity.primary === candidateName);
    if (primary.length === 1) return { index: primary[0].index, score: 1, method: "nome-exato" };
    const exact = identities.filter((identity) => identity.aliases.includes(candidateName));
    if (exact.length === 1) return { index: exact[0].index, score: 0.98, method: "alias-exato" };

    const ranked = identities
      .map((identity) => {
        const score = Math.max(...identity.aliases.map((alias) => {
          const contained = candidateName.length >= 12 && alias.length >= 12 &&
            (candidateName.includes(alias) || alias.includes(candidateName));
          return Math.max(diceSimilarity(candidateName, alias), contained ? 0.9 : 0);
        }));
        return { index: identity.index, score };
      })
      .sort((a, b) => b.score - a.score);
    if (ranked[0]?.score >= 0.86 && ranked[0].score - (ranked[1]?.score ?? 0) >= 0.05) {
      return { ...ranked[0], method: "aproximação-controlada" };
    }
    return null;
  };
}

function assignEvents(events, participants) {
  const assigned = new Map(participants.map((participant) => [participant, []]));
  events.forEach((event) => {
    const eventName = normalize(event.athlete);
    const ranked = participants
      .map((participant) => {
        const name = normalize(participant.name);
        const exact = name === eventName;
        const contained = eventName.length >= 7 && name.length >= 7 &&
          (eventName.includes(name) || name.includes(eventName));
        const sameNumber = Number.isFinite(event.number) && event.number > 0 && participant.number === event.number;
        return { participant, score: exact ? 3 : contained ? 2 : sameNumber ? 1 : 0 };
      })
      .filter((candidate) => candidate.score > 0)
      .sort((a, b) => b.score - a.score);
    if (ranked[0]) assigned.get(ranked[0].participant).push(event);
  });
  return assigned;
}

function eventType(value) {
  return words(value).join("");
}

function recencyWeight(year) {
  return 0.65 ** Math.max(0, REFERENCE_YEAR - year);
}

function mergeParticipantEvidence(evidence, contribution) {
  evidence.officialNames.add(contribution.officialName);
  evidence.sources.add(contribution.source);
  evidence.competitions.add(contribution.competition);
  evidence.seasons.add(contribution.year);
  evidence.listed += contribution.listed ? 1 : 0;
  evidence.starts += contribution.start ? 1 : 0;
  evidence.entries += contribution.entry ? 1 : 0;
  evidence.unusedBench += contribution.unusedBench ? 1 : 0;
  evidence.sevensSquads += contribution.sevensSquad ? 1 : 0;
  evidence.effectiveParticipation += contribution.effectiveParticipation;

  ["tries", "conversions", "penalties", "dropGoals", "yellowCards", "redCards"].forEach((key) => {
    evidence[key] += contribution[key];
    const weightedKey = `weighted${key[0].toUpperCase()}${key.slice(1)}`;
    evidence[weightedKey] += contribution[key] * contribution.weight;
  });
  addRoleWeights(evidence.roleWeights, contribution.roleWeights);
}

export function analyzeOfficialMatch({ match, sheet, teamSlug, matcher }) {
  const homeIsTarget = normalize(match.NomeSiteEquipeCasa) === normalize(teamSlug);
  const awayIsTarget = normalize(match.NomeSiteEquipeVisitante) === normalize(teamSlug);
  if (!homeIsTarget && !awayIsTarget) return { contributions: [], unmatched: [] };
  const side = homeIsTarget ? 0 : 1;
  const team = sheet.teams[side] ?? { name: "", players: [] };
  const teamName = team.name || (side === 0 ? match.NomeEquipeCasa : match.NomeEquipeVisitante);
  const teamEvents = sheet.events.filter((event) => normalize(event.team) === normalize(teamName));
  const listedNames = new Set(team.players.map((player) => normalize(player.name)));
  const eventOnly = teamEvents.flatMap((event) => listedNames.has(normalize(event.athlete))
    ? []
    : [{ name: event.athlete, number: event.number, index: Number.MAX_SAFE_INTEGER }]);
  const participants = [...team.players, ...eventOnly]
    .filter((participant, index, array) =>
      array.findIndex((candidate) => normalize(candidate.name) === normalize(participant.name)) === index,
    );
  const assignedEvents = assignEvents(teamEvents, participants);
  const year = parseSportiDate(match.DataPartida)?.getUTCFullYear() ?? REFERENCE_YEAR;
  const weight = recencyWeight(year);
  const format = formatFromCompetition(match.NomeCampeonato);
  const contributions = [];
  const unmatched = [];

  participants.forEach((participant) => {
    const events = assignedEvents.get(participant) ?? [];
    const types = events.map((event) => eventType(event.event));
    const entry = types.includes("substituicaoentrou");
    const listed = listedNames.has(normalize(participant.name));
    const start = format === "xv" && listed && !entry && participant.number >= 1 && participant.number <= 15;
    const sevensSquad = format === "sevens" && listed;
    const unusedBench = format === "xv" && listed && !start && !entry;
    const eventCount = (type) => types.filter((event) => event === type).length;
    const effectiveParticipation = weight * (
      start ? 1 : entry ? 0.5 : sevensSquad ? 0.35 : events.length ? 0.25 : 0
    );
    const roleWeights = {};
    if (format === "xv" && start) {
      addRoleWeights(roleWeights, { [positionFromNumber(participant.number)]: weight });
    } else if (format === "xv" && listed) {
      addRoleWeights(roleWeights, reserveRolePrior(participant.number), weight * 0.2);
    }

    const matchResult = matcher(participant.name);
    const contribution = {
      officialName: participant.name,
      source: sheet.url,
      competition: match.NomeCampeonato,
      year,
      format,
      weight,
      listed,
      start,
      entry,
      unusedBench,
      sevensSquad,
      effectiveParticipation,
      tries: eventCount("try"),
      conversions: eventCount("conversao"),
      penalties: eventCount("penalidade"),
      dropGoals: eventCount("dropgoal"),
      yellowCards: eventCount("cartaoamarelo"),
      redCards: eventCount("cartaovermelho"),
      roleWeights,
    };
    if (matchResult) contributions.push({ playerIndex: matchResult.index, match: matchResult, contribution });
    else unmatched.push({ name: participant.name, source: sheet.url, competition: match.NomeCampeonato, year });
  });
  return { contributions, unmatched };
}

function normalizedRoleProfile(player, evidence) {
  const weights = { ...evidence.roleWeights };
  const observedTotal = Object.values(weights).reduce((total, value) => total + value, 0);
  const numberRole = positionFromNumber(player.number);
  if (numberRole !== "unknown") addRoleWeights(weights, { [numberRole]: observedTotal ? 0.15 : 0.6 });
  else addRoleWeights(weights, reserveRolePrior(player.number), observedTotal ? 0.08 : 0.3);
  if (!Object.keys(weights).length) weights.unknown = 1;
  const total = Object.values(weights).reduce((sum, value) => sum + value, 0) || 1;
  const probabilities = Object.fromEntries(
    Object.entries(weights)
      .map(([role, value]) => [role, value / total])
      .sort((a, b) => b[1] - a[1]),
  );
  const entries = Object.entries(probabilities);
  const primary = entries[0]?.[0] ?? "unknown";
  const secondary = entries[1]?.[1] >= 0.25 ? entries[1][0] : null;
  return {
    primary,
    secondary,
    label: secondary
      ? `${POSITION_LABELS[primary]}/${POSITION_LABELS[secondary]}`
      : POSITION_LABELS[primary],
    confidence: entries[0]?.[1] ?? 0,
    probabilities,
  };
}

function blendedPositionSkills(probabilities) {
  return Object.fromEntries(ATTRIBUTE_KEYS.map((key) => [
    key,
    Object.entries(probabilities).reduce(
      (total, [role, probability]) => total + (POSITION_SKILLS[role] ?? POSITION_SKILLS.unknown)[key] * probability,
      0,
    ),
  ]));
}

export function calculateCandidateRating(player, evidence, division) {
  const divisionBase = division === 1 ? 70 : 68;
  const participation = evidence.effectiveParticipation;
  const confidence = participation / (participation + 3);
  const experienceBonus = Math.min(4, Math.log2(1 + participation) * 1.25);
  const scoringEvidence =
    evidence.weightedTries * 0.65 +
    evidence.weightedConversions * 0.08 +
    evidence.weightedPenalties * 0.25 +
    evidence.weightedDropGoals * 0.6;
  const scoringBonus = confidence * Math.min(4, scoringEvidence);
  const disciplineEvidence = evidence.weightedYellowCards * 0.5 + evidence.weightedRedCards * 1.5;
  const disciplinePenalty = confidence * Math.min(2.5, disciplineEvidence);
  const overall = Math.round(clamp(
    divisionBase + experienceBonus + scoringBonus - disciplinePenalty,
    40,
    95,
  ));
  const role = normalizedRoleProfile(player, evidence);
  const positionSkills = blendedPositionSkills(role.probabilities);
  const positionMean = weightedOverall(positionSkills);
  const observedOffsets = {
    speed: confidence * Math.min(3, evidence.weightedTries * 0.18),
    tackle: 0,
    pass: 0,
    kick: confidence * Math.min(
      7,
      evidence.weightedConversions * 0.08 + evidence.weightedPenalties * 0.5 + evidence.weightedDropGoals,
    ),
    stamina: Math.min(3, experienceBonus * 0.45),
    attack: confidence * Math.min(6, evidence.weightedTries * 0.5),
  };
  const rawOffsets = Object.fromEntries(ATTRIBUTE_KEYS.map((key) => [
    key,
    (positionSkills[key] - positionMean) * 0.75 + observedOffsets[key],
  ]));
  const weightedOffset = weightedOverall(rawOffsets);
  const skills = Object.fromEntries(ATTRIBUTE_KEYS.map((key) => [
    key,
    Math.round(clamp(overall + rawOffsets[key] - weightedOffset, 40, 95)),
  ]));
  const confidenceLabel = participation >= 5
    ? "alta"
    : participation >= 1
      ? "média"
      : "provisória";
  return {
    overall,
    skills,
    role,
    confidence: Math.round(confidence * 100),
    confidenceLabel,
    effectiveParticipation: Number(participation.toFixed(2)),
    adjustments: {
      divisionBase,
      experience: Number(experienceBonus.toFixed(2)),
      scoring: Number(scoringBonus.toFixed(2)),
      discipline: Number((-disciplinePenalty).toFixed(2)),
    },
  };
}

async function loadRosters(rosterPath = resolve(PROJECT_ROOT, "app/rosters.ts")) {
  const source = await readFile(rosterPath, "utf8");
  const marker = source.indexOf("export const ROSTERS_2026");
  const start = source.indexOf("=", marker) + 1;
  if (marker < 0 || start <= 0) throw new Error(`ROSTERS_2026 não encontrado em ${rosterPath}`);
  return JSON.parse(source.slice(start).trim().replace(/;$/, ""));
}

async function ensureParent(path) {
  await mkdir(dirname(path), { recursive: true });
}

async function fetchResource(url, cachePath, { offline = false, refresh = false } = {}) {
  if (!refresh) {
    try {
      return await readFile(cachePath, "utf8");
    } catch {
      // A cache miss is expected on the first run.
    }
  }
  if (offline) throw new Error(`Cache ausente para ${url}`);
  const response = await fetch(url, {
    headers: { "user-agent": "Rugby BR 26 official rating comparison" },
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  const body = await response.text();
  await ensureParent(cachePath);
  await writeFile(cachePath, body);
  return body;
}

async function mapPool(items, size, worker) {
  const output = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, async () => {
    while (next < items.length) {
      const index = next;
      next += 1;
      output[index] = await worker(items[index], index);
    }
  }));
  return output;
}

async function collectOfficialHistory({ teamSlug, years, cacheDir, offline, refresh }) {
  const matchesByYear = await mapPool(years, 3, async (year) => {
    const url = `https://plataforma.sporti.com.br/Equipes/ObterPartidasEquipe?nomeSite=${encodeURIComponent(teamSlug)}&idEnum=1&carater=Oficial&ano=${year}`;
    const cachePath = resolve(cacheDir, `${teamSlug}-${year}-matches.json`);
    const body = await fetchResource(url, cachePath, { offline, refresh });
    return JSON.parse(body).map((match) => ({ ...match, requestedYear: year }));
  });
  const matches = matchesByYear.flat().filter(isAdultOfficialMatch);
  const sheets = await mapPool(matches, 5, async (match) => {
    const url = officialSheetUrl(match);
    const cachePath = resolve(cacheDir, "sheets", `${match.ID}.html`);
    try {
      const html = await fetchResource(url, cachePath, { offline, refresh });
      return { match, sheet: parseOfficialSheet(html, url), error: null };
    } catch (error) {
      return { match, sheet: null, error: String(error) };
    }
  });
  return { matches, sheets };
}

function serializableEvidence(evidence) {
  return {
    officialNames: [...evidence.officialNames].sort((a, b) => a.localeCompare(b, "pt-BR")),
    sources: [...evidence.sources],
    competitions: [...evidence.competitions].sort((a, b) => a.localeCompare(b, "pt-BR")),
    seasons: [...evidence.seasons].sort(),
    listed: evidence.listed,
    starts: evidence.starts,
    entries: evidence.entries,
    unusedBench: evidence.unusedBench,
    sevensSquads: evidence.sevensSquads,
    effectiveParticipation: Number(evidence.effectiveParticipation.toFixed(2)),
    tries: evidence.tries,
    conversions: evidence.conversions,
    penalties: evidence.penalties,
    dropGoals: evidence.dropGoals,
    yellowCards: evidence.yellowCards,
    redCards: evidence.redCards,
    roleWeights: Object.fromEntries(
      Object.entries(evidence.roleWeights).map(([role, value]) => [role, Number(value.toFixed(3))]),
    ),
  };
}

function averageOverall(players, key) {
  const selected = [...players]
    .sort((a, b) =>
      b[key].overall - a[key].overall ||
      (b.candidate?.confidence ?? 0) - (a.candidate?.confidence ?? 0) ||
      a.name.localeCompare(b.name, "pt-BR"),
    )
    .slice(0, 12);
  return {
    overall: Math.round(selected.reduce((total, player) => total + player[key].overall, 0) / selected.length),
    players: selected.map((player) => player.name),
  };
}

export function buildComparison({ teamId, roster, division, history }) {
  const evidence = roster.players.map(createEmptyEvidence);
  const matcher = createPlayerMatcher(roster.players);
  const teamSlug = new URL(roster.source).pathname.split("/").filter(Boolean).at(-1);
  const unmatched = [];
  let processedSheets = 0;

  history.sheets.forEach(({ match, sheet }) => {
    if (!sheet) return;
    processedSheets += 1;
    const result = analyzeOfficialMatch({ match, sheet, teamSlug, matcher });
    result.contributions.forEach(({ playerIndex, contribution }) => {
      mergeParticipantEvidence(evidence[playerIndex], contribution);
    });
    unmatched.push(...result.unmatched);
  });

  const players = roster.players.map((player, index) => ({
    name: player.nickname?.trim() || player.name,
    officialName: player.name,
    nickname: player.nickname ?? null,
    number: player.number ?? null,
    photo: player.photo ?? null,
    current: {
      overall: player.skills.overall,
      confidence: player.skills.confidence,
      skills: Object.fromEntries(ATTRIBUTE_KEYS.map((key) => [key, player.skills[key]])),
      stats2026: player.stats,
    },
    candidate: calculateCandidateRating(player, evidence[index], division),
    evidence: serializableEvidence(evidence[index]),
  })).map((player) => ({
    ...player,
    change: player.candidate.overall - player.current.overall,
  }));

  const currentSquad = averageOverall(players, "current");
  const candidateSquad = averageOverall(players, "candidate");
  const uniqueUnmatched = [...new Map(unmatched.map((item) => [normalize(item.name), item])).values()]
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  return {
    generatedAt: new Date().toISOString(),
    teamId,
    teamSource: roster.source,
    productionRatingsChanged: false,
    model: {
      name: "candidate-v2-official-history",
      referenceYear: REFERENCE_YEAR,
      divisionBase: division === 1 ? 70 : 68,
      recencyWeights: { 2026: 1, 2025: 0.65, 2024: Number((0.65 ** 2).toFixed(4)) },
      participation: { xvStart: 1, confirmedEntry: 0.5, sevensSquad: 0.35, unusedXVBench: 0 },
      note: "Posição molda os atributos; o OVR é normalizado por divisão e evidência oficial.",
    },
    sources: {
      officialMatchesFound: history.matches.length,
      officialSheetsProcessed: processedSheets,
      failedSheets: history.sheets.filter((item) => item.error).map((item) => ({
        id: item.match.ID,
        competition: item.match.NomeCampeonato,
        error: item.error,
      })),
      unmatchedOfficialAthletes: uniqueUnmatched,
    },
    summary: {
      rosterPlayers: players.length,
      currentAverage: Number((players.reduce((total, player) => total + player.current.overall, 0) / players.length).toFixed(1)),
      candidateAverage: Number((players.reduce((total, player) => total + player.candidate.overall, 0) / players.length).toFixed(1)),
      currentSquadOverall: currentSquad.overall,
      candidateSquadOverall: candidateSquad.overall,
      currentSquad: currentSquad.players,
      candidateSquad: candidateSquad.players,
      playersWithOfficialEvidence: players.filter((player) => player.evidence.effectiveParticipation > 0).length,
      playersWithoutOfficialEvidence: players.filter((player) => player.evidence.effectiveParticipation === 0).length,
    },
    players,
  };
}

function escapeCsv(value) {
  const string = String(value ?? "");
  return /[",\n]/.test(string) ? `"${string.replaceAll('"', '""')}"` : string;
}

export function comparisonCsv(comparison) {
  const header = [
    "jogador", "nome_oficial", "camisa", "ovr_atual", "ovr_candidato", "diferenca",
    "confianca_pct", "confianca", "posicao_inferida", "participacao_efetiva",
    "titularidades", "entradas_confirmadas", "banco_nao_confirmado", "sumulas_sevens",
    "tries", "conversoes", "penalidades", "drops", "amarelos", "vermelhos", "temporadas",
  ];
  const rows = comparison.players.map((player) => [
    player.name,
    player.officialName,
    player.number ?? "",
    player.current.overall,
    player.candidate.overall,
    player.change,
    player.candidate.confidence,
    player.candidate.confidenceLabel,
    player.candidate.role.label,
    player.evidence.effectiveParticipation,
    player.evidence.starts,
    player.evidence.entries,
    player.evidence.unusedBench,
    player.evidence.sevensSquads,
    player.evidence.tries,
    player.evidence.conversions,
    player.evidence.penalties,
    player.evidence.dropGoals,
    player.evidence.yellowCards,
    player.evidence.redCards,
    player.evidence.seasons.join("|"),
  ]);
  return [header, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\n") + "\n";
}

function signed(value) {
  return value > 0 ? `+${value}` : String(value);
}

export function comparisonMarkdown(comparison) {
  const sorted = [...comparison.players].sort((a, b) =>
    b.candidate.overall - a.candidate.overall ||
    b.candidate.confidence - a.candidate.confidence ||
    a.name.localeCompare(b.name, "pt-BR"),
  );
  const removed = comparison.summary.currentSquad.filter((name) => !comparison.summary.candidateSquad.includes(name));
  const added = comparison.summary.candidateSquad.filter((name) => !comparison.summary.currentSquad.includes(name));
  const failed = comparison.sources.failedSheets.length
    ? comparison.sources.failedSheets.map((item) => `- ${item.competition} · súmula ${item.id}: ${item.error}`).join("\n")
    : "Nenhuma súmula selecionada falhou.";
  const unmatched = comparison.sources.unmatchedOfficialAthletes.length
    ? comparison.sources.unmatchedOfficialAthletes.map((item) => `- ${item.name} — ${item.competition} (${item.year})`).join("\n")
    : "Nenhum nome oficial ficou sem correspondência.";
  return `# Comparativo de ratings — ${comparison.teamId}\n\n` +
    `Gerado em ${comparison.generatedAt}. Este relatório é uma simulação: **nenhum rating de produção foi alterado**.\n\n` +
    `## Cobertura oficial\n\n` +
    `- ${comparison.sources.officialMatchesFound} partidas oficiais adultas encontradas;\n` +
    `- ${comparison.sources.officialSheetsProcessed} súmulas processadas;\n` +
    `- ${comparison.summary.playersWithOfficialEvidence} de ${comparison.summary.rosterPlayers} atletas com participação oficial ponderada;\n` +
    `- temporadas anteriores valem menos: 2026 = 1,00; 2025 = 0,65; 2024 = 0,4225.\n\n` +
    `## Resultado resumido\n\n` +
    `| Indicador | Atual | Candidato v2 |\n| --- | ---: | ---: |\n` +
    `| Média do elenco | ${comparison.summary.currentAverage} | ${comparison.summary.candidateAverage} |\n` +
    `| OVR dos 12 maiores | ${comparison.summary.currentSquadOverall} | ${comparison.summary.candidateSquadOverall} |\n` +
    `| Atletas sem evidência oficial ponderada | — | ${comparison.summary.playersWithoutOfficialEvidence} |\n\n` +
    `### Mudança nos 12 maiores\n\n` +
    `Saem: ${removed.length ? removed.join(", ") : "ninguém"}.\n\n` +
    `Entram: ${added.length ? added.join(", ") : "ninguém"}.\n\n` +
    `## Jogadores\n\n` +
    `| Jogador | Atual | Candidato | Dif. | Conf. | Posição inferida | Part. efetiva | T/E | Tries |\n` +
    `| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: |\n` +
    sorted.map((player) =>
      `| ${player.name.replaceAll("|", "\\|")} | ${player.current.overall} | ${player.candidate.overall} | ${signed(player.change)} | ${player.candidate.confidence}% | ${player.candidate.role.label} | ${player.evidence.effectiveParticipation} | ${player.evidence.starts}/${player.evidence.entries} | ${player.evidence.tries} |`,
    ).join("\n") +
    `\n\n## Fórmula candidata\n\n` +
    `- base da divisão: ${comparison.model.divisionBase};\n` +
    `- titular XV: peso 1,00; entrada confirmada: 0,50; relação no sevens: 0,35; banco XV sem entrada: 0;\n` +
    `- experiência cresce de forma logarítmica e é limitada a +4;\n` +
    `- tries e chutes oficiais adicionam bônus limitado; cartões aplicam penalidade limitada;\n` +
    `- vitórias do clube não entram no OVR individual; continuam separadas na forma da equipe;\n` +
    `- posição altera VEL/TAC/PAS/CHU/FIS/ATA, mas sua média é recentrada no OVR do atleta.\n\n` +
    `## Falhas de coleta\n\n${failed}\n\n` +
    `## Nomes oficiais sem atleta correspondente no elenco 2026\n\n${unmatched}\n`;
}

function divisionForRoster(roster) {
  return /masculino1\/?$/i.test(roster.competition) ? 2 : 1;
}

export function buildAllTeamsComparison(teamComparisons) {
  const teams = teamComparisons.map(({ teamId, comparison, division }) => ({
    teamId,
    team: TEAM_NAMES[teamId] ?? teamId,
    division,
    currentOverall: comparison.summary.currentSquadOverall,
    candidateOverall: comparison.summary.candidateSquadOverall,
    change: comparison.summary.candidateSquadOverall - comparison.summary.currentSquadOverall,
    rosterPlayers: comparison.summary.rosterPlayers,
    playersWithOfficialEvidence: comparison.summary.playersWithOfficialEvidence,
    coverage: Math.round(
      comparison.summary.playersWithOfficialEvidence / comparison.summary.rosterPlayers * 100,
    ),
    officialMatchesFound: comparison.sources.officialMatchesFound,
    officialSheetsProcessed: comparison.sources.officialSheetsProcessed,
    failedSheets: comparison.sources.failedSheets.length,
  }));

  const assignRanks = (divisionTeams, overallKey, rankKey) => {
    let previousOverall = null;
    let rank = 0;
    [...divisionTeams]
      .sort((a, b) => b[overallKey] - a[overallKey] || a.team.localeCompare(b.team, "pt-BR"))
      .forEach((team, index) => {
        if (team[overallKey] !== previousOverall) rank = index + 1;
        team[rankKey] = rank;
        previousOverall = team[overallKey];
      });
  };
  [1, 2].forEach((division) => {
    const divisionTeams = teams.filter((team) => team.division === division);
    assignRanks(divisionTeams, "currentOverall", "currentRank");
    assignRanks(divisionTeams, "candidateOverall", "candidateRank");
  });

  teams.forEach((team) => {
    team.rankChange = team.currentRank - team.candidateRank;
  });
  const total = (key) => teams.reduce((sum, team) => sum + team[key], 0);
  const uniqueOfficialMatches = new Set(
    teamComparisons.flatMap((entry) => entry.matchIds ?? []),
  ).size;
  return {
    generatedAt: new Date().toISOString(),
    productionRatingsChanged: false,
    model: "candidate-v2-official-history",
    summary: {
      teams: teams.length,
      rosterPlayers: total("rosterPlayers"),
      playersWithOfficialEvidence: total("playersWithOfficialEvidence"),
      averageCoverage: Math.round(total("coverage") / teams.length),
      currentAverageOverall: Number((total("currentOverall") / teams.length).toFixed(1)),
      candidateAverageOverall: Number((total("candidateOverall") / teams.length).toFixed(1)),
      uniqueOfficialMatches,
      officialMatchRelations: total("officialMatchesFound"),
      officialSheetsProcessed: total("officialSheetsProcessed"),
      failedSheets: total("failedSheets"),
    },
    teams: teams.sort((a, b) =>
      a.division - b.division ||
      a.candidateRank - b.candidateRank ||
      a.team.localeCompare(b.team, "pt-BR"),
    ),
  };
}

export function allTeamsCsv(aggregate) {
  const header = [
    "divisao", "time", "ovr_atual", "ovr_candidato", "diferenca",
    "ranking_atual", "ranking_candidato", "mudanca_ranking", "atletas_elenco",
    "atletas_com_evidencia", "cobertura_pct", "partidas_oficiais", "sumulas_processadas",
    "sumulas_com_falha",
  ];
  const rows = aggregate.teams.map((team) => [
    team.division,
    team.team,
    team.currentOverall,
    team.candidateOverall,
    team.change,
    team.currentRank,
    team.candidateRank,
    team.rankChange,
    team.rosterPlayers,
    team.playersWithOfficialEvidence,
    team.coverage,
    team.officialMatchesFound,
    team.officialSheetsProcessed,
    team.failedSheets,
  ]);
  return [header, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\n") + "\n";
}

export function allTeamsMarkdown(aggregate) {
  const divisions = [1, 2].map((division) => {
    const rows = aggregate.teams.filter((team) => team.division === division);
    return `## ${division}ª divisão\n\n` +
      `| Rank novo | Time | OVR atual | OVR candidato | Dif. | Rank atual | Cobertura | Súmulas |\n` +
      `| ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: |\n` +
      rows.map((team) =>
        `| ${team.candidateRank} | ${team.team} | ${team.currentOverall} | ${team.candidateOverall} | ${signed(team.change)} | ${team.currentRank} | ${team.playersWithOfficialEvidence}/${team.rosterPlayers} (${team.coverage}%) | ${team.officialSheetsProcessed} |`,
      ).join("\n");
  }).join("\n\n");
  return `# Comparativo de OVR dos clubes\n\n` +
    `Gerado em ${aggregate.generatedAt}. A fórmula candidata foi executada somente para análise: **os ratings do jogo não foram alterados**.\n\n` +
    `## Cobertura geral\n\n` +
    `- ${aggregate.summary.teams} clubes e ${aggregate.summary.rosterPlayers} atletas analisados;\n` +
    `- ${aggregate.summary.playersWithOfficialEvidence} atletas com participação oficial ponderada;\n` +
    `- cobertura média dos elencos: ${aggregate.summary.averageCoverage}%;\n` +
    `- ${aggregate.summary.uniqueOfficialMatches} partidas oficiais adultas únicas; elas geraram ${aggregate.summary.officialMatchRelations} relações clube-partida processadas;\n` +
    `- OVR médio dos clubes: ${aggregate.summary.currentAverageOverall} atual e ${aggregate.summary.candidateAverageOverall} candidato;\n` +
    `- súmulas com falha: ${aggregate.summary.failedSheets}.\n\n` +
    `${divisions}\n\n` +
    `## Como ler\n\n` +
    `O OVR de cada clube é a média arredondada dos 12 atletas mais bem avaliados. ` +
    `O ranking é calculado dentro da divisão. Cobertura baixa não significa elenco fraco: indica apenas que há menos participação oficial conciliada com o elenco atual.\n`;
}

function parseArguments(argv) {
  const options = {
    teamId: "pe-vermelho",
    years: [2024, 2025, 2026],
    outputDir: resolve(PROJECT_ROOT, "outputs"),
    cacheDir: resolve(PROJECT_ROOT, "work/ratings-cache"),
    offline: false,
    refresh: false,
    all: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    const [key, inlineValue] = argument.split("=", 2);
    const value = inlineValue ?? argv[index + 1];
    if (key === "--team") { options.teamId = value; if (!inlineValue) index += 1; }
    else if (key === "--all") options.all = true;
    else if (key === "--years") {
      options.years = value.split(",").map(Number).filter(Number.isFinite);
      if (!inlineValue) index += 1;
    } else if (key === "--output-dir") { options.outputDir = resolve(value); if (!inlineValue) index += 1; }
    else if (key === "--cache-dir") { options.cacheDir = resolve(value); if (!inlineValue) index += 1; }
    else if (key === "--offline") options.offline = true;
    else if (key === "--refresh") options.refresh = true;
    else if (key === "--help") options.help = true;
    else throw new Error(`Argumento desconhecido: ${argument}`);
  }
  return options;
}

function usage() {
  return `Uso:\n  npm run ratings:compare -- --team pe-vermelho [--years 2024,2025,2026] [--refresh]\n  npm run ratings:compare -- --all [--years 2024,2025,2026] [--refresh]\n\n` +
    `Saídas: JSON, CSV e Markdown. O gerador nunca reescreve app/rosters.ts.\n`;
}

export async function runComparison(options) {
  const rosters = await loadRosters();
  const roster = rosters[options.teamId];
  if (!roster) throw new Error(`Clube não encontrado: ${options.teamId}`);
  const teamSlug = new URL(roster.source).pathname.split("/").filter(Boolean).at(-1);
  const division = divisionForRoster(roster);
  const history = await collectOfficialHistory({
    teamSlug,
    years: options.years,
    cacheDir: options.cacheDir,
    offline: options.offline,
    refresh: options.refresh,
  });
  const comparison = buildComparison({ teamId: options.teamId, roster, division, history });
  await mkdir(options.outputDir, { recursive: true });
  const base = resolve(options.outputDir, `ratings-${options.teamId}`);
  await Promise.all([
    writeFile(`${base}.json`, JSON.stringify(comparison, null, 2) + "\n"),
    writeFile(`${base}.csv`, comparisonCsv(comparison)),
    writeFile(`${base}.md`, comparisonMarkdown(comparison)),
  ]);
  return { comparison, files: [`${base}.md`, `${base}.csv`, `${base}.json`] };
}

export async function runAllComparisons(options) {
  const rosters = await loadRosters();
  const teamComparisons = await mapPool(Object.entries(rosters), 3, async ([teamId, roster]) => {
    const teamSlug = new URL(roster.source).pathname.split("/").filter(Boolean).at(-1);
    const division = divisionForRoster(roster);
    const history = await collectOfficialHistory({
      teamSlug,
      years: options.years,
      cacheDir: options.cacheDir,
      offline: options.offline,
      refresh: options.refresh,
    });
    return {
      teamId,
      division,
      matchIds: history.matches.map((match) => String(match.ID)),
      comparison: buildComparison({ teamId, roster, division, history }),
    };
  });
  const aggregate = buildAllTeamsComparison(teamComparisons);
  await mkdir(options.outputDir, { recursive: true });
  const base = resolve(options.outputDir, "ratings-all-teams");
  await Promise.all([
    writeFile(`${base}.json`, JSON.stringify(aggregate, null, 2) + "\n"),
    writeFile(`${base}.csv`, allTeamsCsv(aggregate)),
    writeFile(`${base}.md`, allTeamsMarkdown(aggregate)),
  ]);
  return { aggregate, files: [`${base}.md`, `${base}.csv`, `${base}.json`] };
}

const isMain = process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url;
if (isMain) {
  try {
    const options = parseArguments(process.argv.slice(2));
    if (options.help) {
      process.stdout.write(usage());
    } else if (options.all) {
      const result = await runAllComparisons(options);
      process.stdout.write(
        `Comparativo concluído: ${result.aggregate.summary.teams} clubes, ` +
        `${result.aggregate.summary.uniqueOfficialMatches} partidas oficiais únicas.\n` +
        result.files.map((file) => `${basename(file)}\n`).join(""),
      );
    } else {
      const result = await runComparison(options);
      process.stdout.write(
        `Comparativo concluído: ${result.comparison.sources.officialSheetsProcessed} súmulas oficiais, ` +
        `${result.comparison.summary.playersWithOfficialEvidence} atletas com evidência.\n` +
        result.files.map((file) => `${basename(file)}\n`).join(""),
      );
    }
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.stack : error}\n`);
    process.exitCode = 1;
  }
}
