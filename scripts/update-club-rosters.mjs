import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const firstDivision =
  "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino";
const secondDivision = `${firstDivision}1`;

const teams = [
  ["farrapos", "FARRAPOS", "https://plataforma.sporti.com.br/CBRU/equipe/farrapos-rugby-clube"],
  ["charrua", "CHARRUA", "https://plataforma.sporti.com.br/CBRU/equipe/charrua-rugby-clube"],
  ["desterro", "DESTERRO", "https://plataforma.sporti.com.br/CBRU/equipe/desterro-rugby-clube"],
  ["joaca", "JOACA", "https://plataforma.sporti.com.br/CBRU/equipe/joaca-rugby-clube"],
  ["poli", "POLI", "https://plataforma.sporti.com.br/CBRU/equipe/associacao-esportiva-politecnica-de-rugby"],
  ["sao-jose", "SÃO JOSÉ", "https://plataforma.sporti.com.br/CBRU/equipe/associacao-esportiva-rugby-clube-(sao-jose-rugby)"],
  ["tornados", "TORNADOS INDAIATUBA", "https://plataforma.sporti.com.br/CBRU/equipe/indaiatuba-rugby-clube"],
  ["rio-branco", "RIO BRANCO", "https://plataforma.sporti.com.br/CBRU/equipe/rio-branco-rugby-clube"],
  ["jacarei", "JACAREÍ", "https://plataforma.sporti.com.br/CBRU/equipe/associacao-esportiva-jacarei-rugby-1"],
  ["spac", "SPAC", "https://plataforma.sporti.com.br/CBRU/equipe/sao-paulo-athletic-club"],
  ["pasteur", "PASTEUR", "https://plataforma.sporti.com.br/CBRU/equipe/pasteur-athletique-club"],
  ["nova-lima", "NOVA LIMA", "https://plataforma.sporti.com.br/CBRU/equipe/nova-lima-rugby3"],
  ["colonos", "COLONOS", "https://plataforma.sporti.com.br/CBRU/equipe/uniao-de-rugby-tauras-carancho"],
  ["brummers", "BRUMMERS", "https://plataforma.sporti.com.br/CBRU/equipe/brummers-rugby-clube2"],
  ["serra-gaucha", "SERRA GAÚCHA", "https://plataforma.sporti.com.br/CBRU/equipe/serra-gaucha-rugby-clube"],
  ["joinville", "JOINVILLE", "https://plataforma.sporti.com.br/CBRU/equipe/joinville-rugby-clube2"],
  ["pe-vermelho", "PÉ VERMELHO", "https://plataforma.sporti.com.br/CBRU/equipe/pe-vermelho-rugby-clube"],
  ["leoes", "LEÕES", "https://plataforma.sporti.com.br/CBRU/equipe/associacao-esportiva-engenharia-mackenzie"],
  ["iguanas", "IGUANAS", "https://plataforma.sporti.com.br/CBRU/equipe/iguanas-rugby3"],
  ["urutu", "URUTU", "https://plataforma.sporti.com.br/CBRU/equipe/urutu-rugby-clube"],
  ["niteroi", "NITERÓI", "https://plataforma.sporti.com.br/CBRU/equipe/niteroi-rugby-football-clube"],
  ["rio", "RIO", "https://plataforma.sporti.com.br/CBRU/equipe/rio-rugby-football-club"],
  ["vitoria", "VITÓRIA", "https://plataforma.sporti.com.br/CBRU/equipe/vitoria-rugby-club3"],
  ["carioca", "CARIOCA", "https://plataforma.sporti.com.br/CBRU/equipe/carioca-rugby-football-club"],
];

function decodeEntities(value) {
  const named = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: '"' };
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (_, entity) => {
      if (entity[0] === "#") {
        const hexadecimal = entity[1].toLowerCase() === "x";
        return String.fromCodePoint(Number.parseInt(entity.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10));
      }
      return named[entity.toLowerCase()] ?? `&${entity};`;
    })
    .replace(/\s+/g, " ")
    .trim();
}

function normalize(value) {
  return decodeEntities(value)
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[^a-z0-9]+/g, "");
}

const EMPTY_MATCH_STATS = {
  appearances: 0,
  starts: 0,
  wins: 0,
  draws: 0,
  tries: 0,
  conversions: 0,
  penalties: 0,
  dropGoals: 0,
  yellowCards: 0,
  redCards: 0,
  jerseyCounts: {},
};

const POSITION_SKILLS = {
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

function matchStatsWith(previous, addition) {
  const left = previous ?? EMPTY_MATCH_STATS;
  const right = addition ?? EMPTY_MATCH_STATS;
  return {
    appearances: left.appearances + right.appearances,
    starts: left.starts + right.starts,
    wins: left.wins + right.wins,
    draws: left.draws + right.draws,
    tries: left.tries + right.tries,
    conversions: left.conversions + right.conversions,
    penalties: left.penalties + right.penalties,
    dropGoals: left.dropGoals + right.dropGoals,
    yellowCards: left.yellowCards + right.yellowCards,
    redCards: left.redCards + right.redCards,
    jerseyCounts: Object.fromEntries(
      [...new Set([...Object.keys(left.jerseyCounts), ...Object.keys(right.jerseyCounts)])]
        .map((number) => [number, (left.jerseyCounts[number] ?? 0) + (right.jerseyCounts[number] ?? 0)]),
    ),
  };
}

function positionFromNumber(number) {
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

function ratingPosition(player) {
  const observed = Object.entries(player.matchStats?.jerseyCounts ?? {})
    .map(([number, count]) => ({ number: Number(number), count }))
    .filter(({ number }) => number >= 1 && number <= 15)
    .sort((a, b) => b.count - a.count || a.number - b.number)[0]?.number;
  return observed ?? player.number ?? 0;
}

function clampSkill(value) {
  return Math.round(Math.max(40, Math.min(95, value)));
}

function calculateSkills(player, competition) {
  const stats = player.matchStats ?? EMPTY_MATCH_STATS;
  const appearances = stats.appearances;
  const base = POSITION_SKILLS[positionFromNumber(ratingPosition(player))];
  const sample = Math.min(1, appearances / 3);
  const winRate = appearances ? (stats.wins + stats.draws * 0.5) / appearances : 0.5;
  const formBonus = (winRate - 0.5) * 8 * sample;
  const experience = Math.min(7, appearances * 1.25 + stats.starts * 0.45);
  const tryRate = appearances ? stats.tries / appearances : 0;
  const startRate = appearances ? stats.starts / appearances : 0;
  const kickEvents = stats.conversions + stats.penalties * 1.4 + stats.dropGoals * 2;
  const kickRate = appearances ? kickEvents / appearances : 0;
  const disciplinePenalty = stats.yellowCards * 1.2 + stats.redCards * 4;
  const divisionBonus = competition === firstDivision ? 2 : 0;

  const skills = {
    speed: clampSkill(base.speed + divisionBonus + experience * 0.3 + Math.min(9, tryRate * 6) + formBonus * 0.35),
    tackle: clampSkill(base.tackle + divisionBonus + experience * 0.55 + formBonus * 0.65 - disciplinePenalty),
    pass: clampSkill(base.pass + divisionBonus + experience * 0.4 + formBonus * 0.45 + Math.min(4, tryRate * 2)),
    kick: clampSkill(base.kick + divisionBonus + experience * 0.25 + formBonus * 0.35 + Math.min(20, kickRate * 4.5)),
    stamina: clampSkill(base.stamina + divisionBonus + Math.min(8, startRate * 6 + appearances * 0.7) - stats.redCards),
    attack: clampSkill(base.attack + divisionBonus + experience * 0.4 + formBonus * 0.75 + Math.min(16, tryRate * 7 + stats.tries * 1.4) - disciplinePenalty * 0.35),
  };
  return {
    overall: clampSkill(
      skills.speed * 0.18 +
      skills.tackle * 0.2 +
      skills.pass * 0.18 +
      skills.kick * 0.12 +
      skills.stamina * 0.16 +
      skills.attack * 0.16,
    ),
    ...skills,
    confidence: appearances >= 3 ? "high" : appearances ? "medium" : "base",
  };
}

async function fetchText(url) {
  let lastError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "Rugby BR 26 roster updater" },
        signal: AbortSignal.timeout(30_000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.text();
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 700 * (attempt + 1)));
    }
  }
  throw new Error(`${url}: ${lastError}`);
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

function parseTeamPlayers(html, bodyId) {
  const body = html.match(new RegExp(`<tbody[^>]+id=["']${bodyId}["'][^>]*>([\\s\\S]*?)<\\/tbody>`, "i"))?.[1] ?? "";
  return Array.from(body.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)).flatMap(([, row]) => {
    const cells = Array.from(row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi), (match) => decodeEntities(match[1]));
    const number = Number.parseInt(cells[0] ?? "", 10);
    const name = cells[1]?.trim();
    return name ? [{ name, ...(Number.isFinite(number) ? { number } : {}) }] : [];
  });
}

function parseScore(html, id) {
  return Number.parseInt(
    decodeEntities(html.match(new RegExp(`<h1[^>]+id=["']${id}["'][^>]*>([\\s\\S]*?)<\\/h1>`, "i"))?.[1] ?? ""),
    10,
  );
}

function parseEvents(html) {
  const table = html.match(/<table[^>]+id=["']tabelaEventos["'][^>]*>([\s\S]*?)<\/table>/i)?.[1] ?? "";
  return Array.from(table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)).flatMap(([, row]) => {
    const cells = Array.from(row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi), (match) => decodeEntities(match[1]));
    if (cells.length < 6) return [];
    const athleteMatch = cells[5].match(/^(\d+)\s*-\s*(.+)$/);
    return [{
      event: cells[3],
      team: cells[4],
      athlete: athleteMatch?.[2]?.trim() ?? cells[5].trim(),
      number: athleteMatch ? Number.parseInt(athleteMatch[1], 10) : undefined,
    }];
  });
}

function parseSheet(html, url) {
  const names = Array.from(
    html.matchAll(/<h2[^>]*class=["'][^"']*nomesEquipes[^"']*["'][^>]*>([\s\S]*?)<\/h2>/gi),
    (match) => decodeEntities(match[1]),
  ).slice(0, 2);
  if (names.length !== 2) throw new Error(`${url}: equipes não encontradas`);
  const scores = [parseScore(html, "headerGolsCasa"), parseScore(html, "headerGolsVisitante")];
  if (scores.some((score) => !Number.isFinite(score))) throw new Error(`${url}: placar não encontrado`);
  return {
    teams: [
      { team: names[0], players: parseTeamPlayers(html, "bodyCasa"), score: scores[0], opponentScore: scores[1] },
      { team: names[1], players: parseTeamPlayers(html, "bodyVisitante"), score: scores[1], opponentScore: scores[0] },
    ],
    events: parseEvents(html),
  };
}

function parseProfiles(html, source) {
  const players = [];
  const seen = new Set();
  const blocks = html.split(/<div\s+id=["']divAtletaPluginBid["'][^>]*>/i).slice(1);
  for (const block of blocks) {
    const profilePath = block.match(/<a[^>]+href=["']([^"']*\/atleta\/[^"']+)["']/i)?.[1];
    const label = block.match(/<label[^>]*class=["'][^"']*labelElencoEquipe[^"']*["'][^>]*>([\s\S]*?)<\/label>/i)?.[1];
    if (!profilePath || !label) continue;
    const profile = new URL(profilePath, source).href;
    if (seen.has(profile)) continue;
    seen.add(profile);
    const rawPhoto = block.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
    players.push({
      label: decodeEntities(label),
      normalizedLabel: normalize(label),
      normalizedProfile: normalize(decodeURIComponent(profile.split("/").filter(Boolean).at(-1) ?? "").replace(/-\d+$/, "")),
      profile,
      photo: rawPhoto && !/no_img_user/i.test(rawPhoto) ? new URL(decodeEntities(rawPhoto), source).href : undefined,
    });
  }
  return players;
}

function parseBid(html, source) {
  const expected = Number.parseInt(
    html.match(/Total de atletas inscritos:[\s\S]*?numCabecalhoBid[^>]*>(\d+)</i)?.[1] ?? "",
    10,
  );
  const players = [];
  const blocks = html.split(/<div\s+class=["']box["'][^>]*>/i).slice(1);
  for (const block of blocks) {
    const profilePath = block.match(/<a[^>]+href=["']([^"']*\/atleta\/[^"']+)["']/i)?.[1];
    const teamPath = block.match(/<a[^>]+href=["']([^"']*\/equipe\/[^"']+)["'][^>]*>[\s\S]*?<h3[^>]*class=["'][^"']*equipePesquisa[^"']*["']/i)?.[1];
    const rawName = block.match(/<h1[^>]*class=["'][^"']*nomeItemPesquisa2Lines[^"']*["'][^>]*>([\s\S]*?)<\/h1>/i)?.[1];
    if (!profilePath || !teamPath || !rawName) continue;
    const profile = new URL(profilePath, source).href;
    const profileSlug = decodeURIComponent(profile.split("/").filter(Boolean).at(-1) ?? "").replace(/-\d+$/, "");
    const rawPhoto = block.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
    players.push({
      teamPath: new URL(teamPath, source).pathname.toLocaleLowerCase("pt-BR"),
      name: decodeEntities(rawName),
      bidName: decodeEntities(rawName),
      profile,
      profileKey: normalize(profileSlug),
      registered2026: true,
      photo: rawPhoto && !/no_img_user/i.test(rawPhoto)
        ? new URL(decodeEntities(rawPhoto).split("?")[0], source).href
        : undefined,
    });
  }
  if (Number.isFinite(expected) && players.length !== expected) {
    throw new Error(`${source}: BID informa ${expected} atletas, mas ${players.length} foram coletados`);
  }
  return players;
}

const teamIdByName = new Map(teams.map(([id, name]) => [normalize(name), id]));
const teamIdBySlug = new Map(teams.map(([id, , source]) => [new URL(source).pathname.split("/").filter(Boolean).at(-1)?.toLocaleLowerCase("pt-BR"), id]));
function resolveTeamId(name) {
  const normalizedName = normalize(name);
  const exact = teamIdByName.get(normalizedName);
  if (exact) return exact;
  return teams
    .map(([id, officialName]) => ({ id, normalized: normalize(officialName) }))
    .filter((team) => normalizedName.includes(team.normalized) || team.normalized.includes(normalizedName))
    .sort((a, b) => b.normalized.length - a.normalized.length)[0]?.id;
}

function assignEventsToPlayers(events, players) {
  const assigned = new Map(players.map((player) => [player, []]));
  for (const event of events) {
    const eventName = normalize(event.athlete);
    const nameMatches = players
      .map((player) => ({ player, name: normalize(player.name) }))
      .filter(({ name }) => eventName && name && (
        eventName === name ||
        (eventName.length >= 5 && name.includes(eventName)) ||
        (name.length >= 5 && eventName.includes(name))
      ))
      .sort((a, b) => {
        const exactA = Number(a.name === eventName);
        const exactB = Number(b.name === eventName);
        return exactB - exactA || Math.abs(a.name.length - eventName.length) - Math.abs(b.name.length - eventName.length);
      });
    const player = nameMatches[0]?.player ?? players.find((candidate) => (
      Number.isFinite(event.number) && candidate.number === event.number
    ));
    if (player) assigned.get(player).push(event);
  }
  return assigned;
}

const rosters = Object.fromEntries(teams.map(([id, , source]) => [id, {
  source,
  competition: "",
  bid: "",
  sheets: new Set(),
  players: new Map(),
}]));
const sheetAppearances = Object.fromEntries(teams.map(([id]) => [id, new Set()]));

const divisions = [firstDivision, secondDivision];

const sheetJobs = [];
for (const competition of divisions) {
  const page = await fetchText(competition);
  const bidUrl = `${competition}/bid`;
  for (const athlete of parseBid(await fetchText(bidUrl), bidUrl)) {
    const teamSlug = athlete.teamPath.split("/").filter(Boolean).at(-1);
    const id = teamIdBySlug.get(teamSlug);
    if (!id) throw new Error(`${bidUrl}: clube desconhecido ${athlete.teamPath}`);
    const roster = rosters[id];
    roster.competition = competition;
    roster.bid = bidUrl;
    const key = athlete.profileKey || normalize(athlete.name);
    roster.players.set(key, athlete);
  }
  const phaseJson = page.match(/var\s+fases\s*=\s*(\[[^;]+\])/i)?.[1];
  if (!phaseJson) throw new Error(`${competition}: fases não encontradas`);
  const phases = JSON.parse(phaseJson);
  for (const phase of phases) {
    const endpoint = phase.IdTipoCampeonato === 1
      ? "PartialViewMataMataPorFase"
      : "PartialViewJogosPorFase";
    const partial = await fetchText(`https://plataforma.sporti.com.br/Campeonatos/${endpoint}/${phase.IdFase}`);
    const ids = [...new Set(Array.from(partial.matchAll(/sumula\/(\d+)/gi), (match) => match[1]))];
    for (const id of ids) sheetJobs.push({ competition, url: `${competition}/sumula/${id}` });
  }
}

const uniqueSheetJobs = [...new Map(sheetJobs.map((job) => [job.url, job])).values()];
const sheets = await mapPool(uniqueSheetJobs, 5, async (job) => ({
  ...job,
  ...parseSheet(await fetchText(job.url), job.url),
}));
for (const sheet of sheets) {
  for (const team of sheet.teams) {
    const id = resolveTeamId(team.team);
    if (!id) throw new Error(`${sheet.url}: clube desconhecido ${team.team}`);
    const roster = rosters[id];
    roster.competition = sheet.competition;
    roster.sheets.add(sheet.url);
    const teamEvents = sheet.events.filter((event) => resolveTeamId(event.team) === id);
    const eventOnlyPlayers = [...new Map(teamEvents.flatMap((event) => {
      if (!event.athlete) return [];
      const eventName = normalize(event.athlete);
      const alreadyListed = team.players.some((player) => {
        const playerName = normalize(player.name);
        return eventName === playerName ||
          (eventName.length >= 5 && playerName.includes(eventName)) ||
          (playerName.length >= 5 && eventName.includes(playerName));
      });
      return alreadyListed ? [] : [[eventName, { name: event.athlete, number: event.number, eventOnly: true }]];
    })).values()];
    const participants = [...team.players, ...eventOnlyPlayers];
    const assignedEvents = assignEventsToPlayers(teamEvents, participants);
    for (const player of participants) {
      const playerKey = normalize(player.name);
      sheetAppearances[id].add(playerKey);
      const matchedEntry = [...roster.players].find(([, candidate]) =>
        candidate.profileKey === playerKey || normalize(candidate.name) === playerKey,
      );
      const key = matchedEntry?.[0] ?? playerKey;
      const previous = matchedEntry?.[1] ?? roster.players.get(key);
      const bidName = previous?.bidName ?? previous?.name;
      const nickname = bidName && normalize(bidName) !== playerKey
        ? bidName
        : previous?.nickname;
      const events = assignedEvents.get(player) ?? [];
      const enteredAsSubstitute = events.some((event) => normalize(event.event) === "substituicaoentrou");
      const eventCount = (type) => events.filter((event) => normalize(event.event) === type).length;
      const matchStats = matchStatsWith(previous?.matchStats, {
        ...EMPTY_MATCH_STATS,
        appearances: 1,
        starts: !player.eventOnly && !enteredAsSubstitute && (player.number ?? 99) <= 15 ? 1 : 0,
        wins: team.score > team.opponentScore ? 1 : 0,
        draws: team.score === team.opponentScore ? 1 : 0,
        tries: eventCount("try"),
        conversions: eventCount("conversao"),
        penalties: eventCount("penalidade"),
        dropGoals: eventCount("dropgoal"),
        yellowCards: eventCount("cartaoamarelo"),
        redCards: eventCount("cartaovermelho"),
        jerseyCounts: Number.isFinite(player.number) ? { [player.number]: 1 } : {},
      });
      roster.players.set(key, {
        ...previous,
        ...player,
        name: player.name,
        ...(nickname ? { nickname } : {}),
        appeared2026: true,
        appearanceKeys: [...new Set([...(previous?.appearanceKeys ?? []), playerKey])],
        matchStats,
        ...(player.number || previous?.number ? { number: player.number ?? previous.number } : {}),
      });
    }
  }
}

const profiles = await mapPool(teams, 4, async ([id, , source]) => [id, parseProfiles(await fetchText(source), source)]);
for (const [id, clubProfiles] of profiles) {
  const roster = rosters[id];
  for (const [playerKey, player] of roster.players) {
    const profile = clubProfiles.find((candidate) =>
      candidate.normalizedProfile === playerKey || candidate.normalizedLabel === playerKey,
    );
    if (profile) {
      player.profile = profile.profile;
      if (player.appeared2026 && normalize(profile.label) !== normalize(player.name) && !player.nickname) {
        player.nickname = profile.label;
      }
      if (!player.appeared2026 && normalize(profile.label).length > normalize(player.name).length) {
        if (normalize(profile.label) !== normalize(player.name)) player.nickname = player.name;
        player.name = profile.label;
      }
      if (profile.photo) player.photo = profile.photo;
    }
  }
  const mergedPlayers = new Map();
  for (const player of roster.players.values()) {
    const identity = player.profile
      ? `profile:${new URL(player.profile).pathname.toLocaleLowerCase("pt-BR")}`
      : `name:${normalize(player.name)}`;
    const previous = mergedPlayers.get(identity);
    mergedPlayers.set(identity, {
      ...previous,
      ...player,
      name: player.appeared2026 ? player.name : previous?.name ?? player.name,
      registered2026: Boolean(previous?.registered2026 || player.registered2026),
      appeared2026: Boolean(previous?.appeared2026 || player.appeared2026),
      nickname: player.nickname ?? previous?.nickname,
      appearanceKeys: [...new Set([...(previous?.appearanceKeys ?? []), ...(player.appearanceKeys ?? [])])],
      matchStats: matchStatsWith(previous?.matchStats, player.matchStats),
      number: player.number ?? previous?.number,
      photo: player.photo ?? previous?.photo,
    });
  }
  roster.players = [...mergedPlayers.values()]
    .map((player) => {
      const publicPlayer = { ...player };
      const matchStats = player.matchStats ?? EMPTY_MATCH_STATS;
      publicPlayer.skills = calculateSkills(player, roster.competition);
      publicPlayer.stats = {
        appearances: matchStats.appearances,
        starts: matchStats.starts,
        wins: matchStats.wins,
        draws: matchStats.draws,
        tries: matchStats.tries,
        conversions: matchStats.conversions,
        penalties: matchStats.penalties,
        dropGoals: matchStats.dropGoals,
        points: matchStats.tries * 5 + matchStats.conversions * 2 + matchStats.penalties * 3 + matchStats.dropGoals * 3,
        yellowCards: matchStats.yellowCards,
        redCards: matchStats.redCards,
      };
      delete publicPlayer.profileKey;
      delete publicPlayer.teamPath;
      delete publicPlayer.bidName;
      delete publicPlayer.eventOnly;
      delete publicPlayer.matchStats;
      return publicPlayer;
    })
    .sort((a, b) =>
      Number(Boolean(b.appeared2026)) - Number(Boolean(a.appeared2026)) ||
      (a.number ?? 999) - (b.number ?? 999) ||
      a.name.localeCompare(b.name, "pt-BR"),
    );
  roster.sheets = [...roster.sheets];
  const listedNames = new Set(roster.players.flatMap((player) => player.appearanceKeys ?? []));
  const missingAppearances = [...sheetAppearances[id]].filter((name) => !listedNames.has(name));
  if (missingAppearances.length) {
    throw new Error(`${id}: ${missingAppearances.length} atletas de súmula não foram incluídos`);
  }
  roster.players = roster.players.map((player) => {
    const publicPlayer = { ...player };
    delete publicPlayer.appearanceKeys;
    return publicPlayer;
  });
  const photos = roster.players.filter((player) => player.photo).length;
  const appeared = roster.players.filter((player) => player.appeared2026).length;
  const registered = roster.players.filter((player) => player.registered2026).length;
  console.log(`${id}: ${roster.players.length} atletas · ${registered} no BID · ${appeared} em súmula · ${photos} fotos`);
}

const generated = `// Gerado do BID, das súmulas masculinas de 2026 e dos perfis públicos dos clubes no Sporti.\n` +
`// Execute \`node scripts/update-club-rosters.mjs\` para atualizar.\n` +
`export type PlayerSkills = {\n  overall: number;\n  speed: number;\n  tackle: number;\n  pass: number;\n  kick: number;\n  stamina: number;\n  attack: number;\n  confidence: "base" | "medium" | "high";\n};\n\n` +
`export type PlayerStats = {\n  appearances: number;\n  starts: number;\n  wins: number;\n  draws: number;\n  tries: number;\n  conversions: number;\n  penalties: number;\n  dropGoals: number;\n  points: number;\n  yellowCards: number;\n  redCards: number;\n};\n\n` +
`export type RosterPlayer = {\n  name: string;\n  nickname?: string;\n  number?: number;\n  photo?: string;\n  profile?: string;\n  registered2026?: boolean;\n  appeared2026?: boolean;\n  skills: PlayerSkills;\n  stats: PlayerStats;\n};\n\n` +
`export type TeamRoster = {\n  source: string;\n  competition: string;\n  bid: string;\n  sheets: string[];\n  players: RosterPlayer[];\n};\n\n` +
`export const ROSTERS_2026: Record<string, TeamRoster> = ${JSON.stringify(rosters, null, 2)};\n`;

await writeFile(new URL("../app/rosters.ts", import.meta.url), generated);

if (!process.argv.includes("--skip-historical-ratings")) {
  const { runAllComparisons } = await import("./compare-player-ratings.mjs");
  await runAllComparisons({
    years: [2024, 2025, 2026],
    outputDir: fileURLToPath(new URL("../outputs", import.meta.url)),
    cacheDir: fileURLToPath(new URL("../work/ratings-cache", import.meta.url)),
    offline: false,
    refresh: true,
    apply: true,
  });
}
