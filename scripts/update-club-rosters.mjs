import { writeFile } from "node:fs/promises";

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

function parseSheet(html, url) {
  const names = Array.from(
    html.matchAll(/<h2[^>]*class=["'][^"']*nomesEquipes[^"']*["'][^>]*>([\s\S]*?)<\/h2>/gi),
    (match) => decodeEntities(match[1]),
  ).slice(0, 2);
  if (names.length !== 2) throw new Error(`${url}: equipes não encontradas`);
  return [
    { team: names[0], players: parseTeamPlayers(html, "bodyCasa") },
    { team: names[1], players: parseTeamPlayers(html, "bodyVisitante") },
  ];
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

const sheets = await mapPool(sheetJobs, 5, async (job) => ({ ...job, teams: parseSheet(await fetchText(job.url), job.url) }));
for (const sheet of sheets) {
  for (const team of sheet.teams) {
    const id = resolveTeamId(team.team);
    if (!id) throw new Error(`${sheet.url}: clube desconhecido ${team.team}`);
    const roster = rosters[id];
    roster.competition = sheet.competition;
    roster.sheets.add(sheet.url);
    for (const player of team.players) {
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
      roster.players.set(key, {
        ...previous,
        ...player,
        name: player.name,
        ...(nickname ? { nickname } : {}),
        appeared2026: true,
        appearanceKeys: [...new Set([...(previous?.appearanceKeys ?? []), playerKey])],
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
      number: player.number ?? previous?.number,
      photo: player.photo ?? previous?.photo,
    });
  }
  roster.players = [...mergedPlayers.values()]
    .map((player) => {
      const publicPlayer = { ...player };
      delete publicPlayer.profileKey;
      delete publicPlayer.teamPath;
      delete publicPlayer.bidName;
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
`export type RosterPlayer = {\n  name: string;\n  nickname?: string;\n  number?: number;\n  photo?: string;\n  profile?: string;\n  registered2026?: boolean;\n  appeared2026?: boolean;\n};\n\n` +
`export type TeamRoster = {\n  source: string;\n  competition: string;\n  bid: string;\n  sheets: string[];\n  players: RosterPlayer[];\n};\n\n` +
`export const ROSTERS_2026: Record<string, TeamRoster> = ${JSON.stringify(rosters, null, 2)};\n`;

await writeFile(new URL("../app/rosters.ts", import.meta.url), generated);
