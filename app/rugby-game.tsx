"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

type Match = {
  players: Player[];
  ball: Ball;
  score: [number, number];
  seconds: number;
  running: boolean;
  over: boolean;
  paused: boolean;
  lastFrame: number;
  actionLock: number;
  cpuActionLock: number;
  kickoff: number;
  restartSide: 0 | 1 | null;
  blockWindow: number;
  substitutesLeft: [number, number];
  message: string;
  messageUntil: number;
};

type Hud = {
  score: [number, number];
  seconds: number;
  paused: boolean;
  over: boolean;
  message: string;
  stamina: number[];
  jerseys: number[];
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
const MATCH_SECONDS = 120;
const PLAYERS_PER_SIDE = 7;
const MID_SLOT = Math.floor(PLAYERS_PER_SIDE / 2);
const SWEEPER_SLOT = 6;
const REPLACEMENTS_PER_SIDE = 5;

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

const keyState = new Set<string>();

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

function makePlayers(): Player[] {
  const lanes = Array.from(
    { length: PLAYERS_PER_SIDE },
    (_, slot) => 80 + slot * ((FIELD_H - 160) / (PLAYERS_PER_SIDE - 1)),
  );
  return [
    ...lanes.map((y, slot) => ({
      id: slot,
      side: 0 as const,
      slot,
      x: TRY_LINE + 210 - Math.abs(MID_SLOT - slot) * 14,
      y,
      stun: 0,
      tackleLock: 0,
      stamina: 100,
      jersey: slot + 1,
      routeX: 0,
      routeY: 0,
      routeTime: 0,
    })),
    ...lanes.map((y, slot) => ({
      id: slot + PLAYERS_PER_SIDE,
      side: 1 as const,
      slot,
      x: RIGHT_TRY_LINE - 210 + Math.abs(MID_SLOT - slot) * 14,
      y,
      stun: 0,
      tackleLock: 0,
      stamina: 100,
      jersey: slot + 1,
      routeX: 0,
      routeY: 0,
      routeTime: 0,
    })),
  ];
}

function arrangeRestart(players: Player[], kickingSide: 0 | 1) {
  players.forEach((player) => {
    const lane = 80 + player.slot * ((FIELD_H - 160) / (PLAYERS_PER_SIDE - 1));
    const isKicker = player.side === kickingSide && player.slot === MID_SLOT;
    if (kickingSide === 0) {
      player.x = player.side === 0 ? (isKicker ? FIELD_W / 2 - 8 : FIELD_W / 2 - 56 - Math.abs(player.slot - MID_SLOT) * 12) : FIELD_W / 2 + 230 + Math.abs(player.slot - MID_SLOT) * 10;
    } else {
      player.x = player.side === 1 ? (isKicker ? FIELD_W / 2 + 8 : FIELD_W / 2 + 56 + Math.abs(player.slot - MID_SLOT) * 12) : FIELD_W / 2 - 230 - Math.abs(player.slot - MID_SLOT) * 10;
    }
    player.y = lane;
    player.stun = 0;
    player.tackleLock = 0;
    player.routeTime = 0;
  });
}

function freshMatch(): Match {
  const players = makePlayers();
  arrangeRestart(players, 0);
  const firstKicker = players[MID_SLOT];
  return {
    players,
    ball: {
      x: firstKicker.x,
      y: firstKicker.y,
      vx: 0,
      vy: 0,
      owner: firstKicker,
      target: null,
      air: 0,
      flightDuration: 0,
      kind: "held",
    },
    score: [0, 0],
    seconds: MATCH_SECONDS,
    running: true,
    over: false,
    paused: false,
    lastFrame: performance.now(),
    actionLock: 0,
    cpuActionLock: 0.7,
    kickoff: 1.15,
    restartSide: 0,
    blockWindow: 0,
    substitutesLeft: [REPLACEMENTS_PER_SIDE, REPLACEMENTS_PER_SIDE],
    message: "Drop-kick inicial: seu time chuta",
    messageUntil: 2,
  };
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

  ctx.strokeStyle = "rgba(239,255,241,.82)";
  ctx.lineWidth = 3;
  ctx.strokeRect(2, 2, FIELD_W - 4, FIELD_H - 4);
  [TRY_LINE, LEFT_22, FIELD_W / 2, RIGHT_22, RIGHT_TRY_LINE].forEach(solidVertical);

  ctx.lineWidth = 2;
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
  const controlled =
    owner?.side === 0
      ? owner
      : match.players
          .filter((player) => player.side === 0)
          .sort((a, b) => distance(a, match.ball) - distance(b, match.ball))[0];

  match.players.forEach((player) => {
    const team = player.side === 0 ? home : away;
    const isControlled = player === controlled;
    const isPassOption =
      match.ball.owner?.side === 0 &&
      player.side === 0 &&
      player !== match.ball.owner &&
      player.stun <= 0 &&
      player.x <= match.ball.owner.x + 4;
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
    ctx.restore();
    ctx.beginPath();
    ctx.arc(player.x, player.y, PLAYER_RADIUS, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(4,14,10,.62)";
    ctx.lineWidth = 2;
    ctx.stroke();

    const staminaWidth = 30;
    ctx.fillStyle = "rgba(2,12,9,.66)";
    ctx.fillRect(player.x - staminaWidth / 2, player.y - 27, staminaWidth, 4);
    ctx.fillStyle = player.stamina < 28 ? "#ff6a3d" : player.stamina < 52 ? "#f2c84b" : "#dfff49";
    ctx.fillRect(player.x - staminaWidth / 2, player.y - 27, staminaWidth * (player.stamina / 100), 4);

    if (player.side === 1 && player.slot === SWEEPER_SLOT) {
      ctx.fillStyle = "rgba(6,22,17,.82)";
      ctx.font = "900 9px ui-sans-serif, system-ui";
      ctx.textAlign = "center";
      ctx.fillText("SWEEPER", player.x, player.y - 34);
    }

    ctx.fillStyle = team.secondary;
    ctx.font = "900 10px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(player.jersey), player.x, player.y + 0.5);
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
    ctx.fillText(match.over ? "FIM DE JOGO" : "PAUSADO", FIELD_W / 2, FIELD_H / 2 - 5);
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
      <img src={team.logo} alt="" loading="lazy" />
      <small>{team.short}</small>
    </span>
  );
}

export function RugbyGame() {
  const [screen, setScreen] = useState<"setup" | "match">("setup");
  const [divisionFilter, setDivisionFilter] = useState<"all" | Division>(1);
  const [homeId, setHomeId] = useState("jacarei");
  const [awayId, setAwayId] = useState("farrapos");
  const [soundOn, setSoundOn] = useState(true);
  const [bestWins, setBestWins] = useState(0);
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const [aimingDrop, setAimingDrop] = useState(false);
  const [immersiveMode, setImmersiveMode] = useState(false);
  const [hud, setHud] = useState<Hud>({
    score: [0, 0],
    seconds: MATCH_SECONDS,
    paused: false,
    over: false,
    message: "",
    stamina: Array(PLAYERS_PER_SIDE).fill(100),
    jerseys: Array.from({ length: PLAYERS_PER_SIDE }, (_, slot) => slot + 1),
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

  const home = useMemo(() => TEAMS.find((team) => team.id === homeId) ?? TEAMS[0], [homeId]);
  const away = useMemo(() => TEAMS.find((team) => team.id === awayId) ?? TEAMS[1], [awayId]);
  const visibleTeams = useMemo(
    () => TEAMS.filter((team) => divisionFilter === "all" || team.division === divisionFilter),
    [divisionFilter],
  );

  const beep = useCallback(
    (frequency: number, duration = 0.08) => {
      if (!soundOn || typeof window === "undefined") return;
      try {
        const AudioCtx = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        const audio = audioRef.current ?? new AudioCtx();
        audioRef.current = audio;
        if (audio.state === "suspended") {
          void audio.resume().catch(() => undefined);
        }
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();
        oscillator.type = "square";
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0.035, audio.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + duration);
        oscillator.connect(gain);
        gain.connect(audio.destination);
        oscillator.start();
        oscillator.stop(audio.currentTime + duration);
      } catch {
        // Sound is optional and must never prevent a match from starting.
      }
    },
    [soundOn],
  );

  const setMessage = useCallback((match: Match, message: string, duration = 1.1) => {
    match.message = message;
    match.messageUntil = duration;
  }, []);

  const prepareRestart = useCallback((match: Match, kickingSide: 0 | 1) => {
    arrangeRestart(match.players, kickingSide);

    if (match.substitutesLeft[1] > 0) {
      const tiredDefender = match.players
        .filter((player) => player.side === 1)
        .sort((a, b) => a.stamina - b.stamina)[0];
      if (tiredDefender && tiredDefender.stamina < 26) {
        const used = REPLACEMENTS_PER_SIDE - match.substitutesLeft[1];
        tiredDefender.stamina = 100;
        tiredDefender.jersey = 8 + used;
        match.substitutesLeft[1] -= 1;
      }
    }

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
      const candidates = match.players
        .filter((player) => {
          if (player.side !== side || player === owner || player.stun > 0) return false;
          return side === 0 ? player.x <= owner.x + 4 : player.x >= owner.x - 4;
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
      const legalTargetX =
        side === 0
          ? Math.min(target.x, owner.x - 3)
          : Math.max(target.x, owner.x + 3);
      match.ball.owner = null;
      match.ball.target = target;
      match.ball.air = clamp(Math.hypot(legalTargetX - owner.x, target.y - owner.y) / 470, 0.18, 0.46);
      match.ball.flightDuration = match.ball.air;
      match.ball.kind = "pass";
      match.ball.vx = (legalTargetX - owner.x) / match.ball.air;
      match.ball.vy = (target.y - owner.y) / match.ball.air;
      match.actionLock = 0.28;
      owner.stamina = Math.max(0, owner.stamina - 0.8);
      if (side === 0) {
        setMessage(match, `Passe para o ${target.slot + 1}`);
        haptic();
        beep(480, 0.06);
      }
    },
    [beep, setMessage],
  );

  const beginDropAim = useCallback(() => {
    const match = matchRef.current;
    if (!match || match.paused || match.over || match.actionLock > 0) return;
    const owner = match.ball.owner;
    if (!owner || owner.side !== 0) return;
    if (owner.x < FIELD_W * 0.48) {
      setMessage(match, "Avance mais para tentar o drop", 1.25);
      return;
    }
    aimRef.current = {
      active: true,
      x: FIELD_W - TRY_LINE,
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

      const targetX = FIELD_W - TRY_LINE;
      const precision = Math.hypot((x - targetX) * 0.4, y - CENTRE_Y);
      const inRange = owner.x >= FIELD_W * 0.48;
      match.actionLock = 1;
      if (inRange && precision <= 58) {
        match.score[0] += 3;
        owner.stamina = Math.max(0, owner.stamina - 7);
        prepareRestart(match, 0);
        setMessage(match, "DROP GOAL! · +3 · seu time reinicia", 1.8);
        beep(760, 0.22);
      } else {
        prepareRestart(match, 1);
        setMessage(match, "Drop para fora — drop-out adversário", 1.6);
        beep(160, 0.14);
      }
    },
    [beep, prepareRestart, setMessage],
  );

  const performBlock = useCallback(() => {
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
    upper.routeX = owner.x - 12;
    upper.routeY = clamp(lower.y, 62, FIELD_H - 62);
    upper.routeTime = 0.78;
    lower.routeX = owner.x - 12;
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
    const flight = 0.82;
    match.ball.owner = null;
    match.ball.target = null;
    match.ball.kind = "kick";
    match.ball.air = flight;
    match.ball.flightDuration = flight;
    match.ball.vx = 455;
    match.ball.vy = directionY * 135;
    match.actionLock = 0.52;
    owner.stamina = Math.max(0, owner.stamina - 7);
    setMessage(match, "Chute à frente — corra para recuperar!", 1.25);
    haptic(18);
    beep(620, 0.09);
  }, [beep, setMessage]);

  const tackle = useCallback(
    (match: Match, carrier: Player, tackler: Player) => {
      if (carrier.tackleLock > 0 || tackler.tackleLock > 0) return;

      if (carrier.side === 0 && match.blockWindow > 0) {
        carrier.tackleLock = 0.48;
        tackler.stun = 0.46;
        tackler.tackleLock = 0.62;
        match.blockWindow = 0;
        setMessage(match, "Block funcionou — defensor mordeu o cruzamento", 1);
        beep(410, 0.08);
        return;
      }

      carrier.stun = 0.56;
      tackler.stun = 0.72;
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
        distance(support, carrier) < distance(pressure, carrier) + 55;
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
          const flight = 0.86;
          match.restartSide = null;
          match.ball.owner = null;
          match.ball.target = null;
          match.ball.kind = "restart";
          match.ball.air = flight;
          match.ball.flightDuration = flight;
          match.ball.vx = kickingSide === 0 ? 365 : -365;
          match.ball.vy = Math.sin(match.seconds * 1.7) * 82;
          match.actionLock = 0.22;
          if (kicker) kicker.stamina = Math.max(0, kicker.stamina - 3);
          setMessage(match, "Drop-kick de reinício — bola viva!", 1.25);
          beep(590, 0.08);
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

      if (match.seconds <= 0) {
        match.seconds = 0;
        match.over = true;
        match.running = false;
        if (match.score[0] > match.score[1]) {
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
      const homePlayers = match.players.filter((player) => player.side === 0);
      const awayPlayers = match.players.filter((player) => player.side === 1);
      const controlled =
        ballOwner?.side === 0
          ? ballOwner
          : [...homePlayers].sort((a, b) => distance(a, match.ball) - distance(b, match.ball))[0];

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

      if (controlled && controlled.stun <= 0) {
        const speed = (sprinting ? 244 : 190) * staminaFactor(controlled);
        controlled.x += (inputX / inputLength) * speed * dt;
        controlled.y += (inputY / inputLength) * speed * dt;
        if (hasMovementInput) {
          controlled.stamina = Math.max(
            0,
            controlled.stamina - dt * (sprinting ? 2.65 : 0.92),
          );
        }
      }

      const moveToward = (player: Player, tx: number, ty: number, speed: number) => {
        if (player.stun > 0 || player === controlled) return;
        const dx = tx - player.x;
        const dy = ty - player.y;
        const length = Math.hypot(dx, dy) || 1;
        const actualSpeed = speed * staminaFactor(player);
        player.x += (dx / length) * actualSpeed * dt;
        player.y += (dy / length) * actualSpeed * dt;
        if (length > 10) {
          player.stamina = Math.max(0, player.stamina - dt * 0.54);
        }
      };

      const runBlockRoute = (player: Player) => {
        if (player.routeTime <= 0) return false;
        player.routeTime = Math.max(0, player.routeTime - dt);
        const dx = player.routeX - player.x;
        const dy = player.routeY - player.y;
        const length = Math.hypot(dx, dy) || 1;
        const speed = 252 * staminaFactor(player);
        player.x += (dx / length) * speed * dt;
        player.y += (dy / length) * speed * dt;
        return true;
      };

      homePlayers.forEach((player) => {
        if (player === controlled) return;
        if (runBlockRoute(player)) return;
        if (ballOwner?.side === 0) {
          const laneOffset = (player.slot - MID_SLOT) * 57;
          moveToward(player, ballOwner.x - 40 - Math.abs(player.slot - ballOwner.slot) * 9, ballOwner.y + laneOffset, 146);
        } else {
          const target = ballOwner ?? match.ball;
          const chaseRank = [...homePlayers].sort((a, b) => distance(a, target) - distance(b, target)).indexOf(player);
          moveToward(player, target.x + chaseRank * 25, target.y + (player.slot - MID_SLOT) * 27, chaseRank < 2 ? 168 : 132);
        }
      });

      awayPlayers.forEach((player) => {
        if (runBlockRoute(player)) return;
        if (ballOwner?.side === 1) {
          if (player === ballOwner) {
            if (player.stun <= 0) {
              const wave = Math.sin(match.seconds * 1.7 + player.slot) * 62;
              const targetY = clamp(CENTRE_Y + wave, 80, FIELD_H - 80);
              const dy = targetY - player.y;
              player.x -= 174 * dt;
              player.y += clamp(dy, -110 * dt, 110 * dt);
            }
          } else {
            moveToward(player, ballOwner.x + 40 + Math.abs(player.slot - ballOwner.slot) * 9, ballOwner.y + (player.slot - MID_SLOT) * 52, 143);
          }
        } else {
          const target = ballOwner ?? match.ball;
          if (player.slot === SWEEPER_SLOT) {
            const kickIsComing = !ballOwner && (match.ball.kind === "kick" || match.ball.kind === "restart");
            const sweeperX = kickIsComing
              ? clamp(match.ball.x + 42, FIELD_W * 0.58, FIELD_W - TRY_LINE - 28)
              : clamp(target.x + 210, FIELD_W * 0.62, FIELD_W - TRY_LINE - 34);
            moveToward(player, sweeperX, target.y, kickIsComing ? 205 : 154);
          } else {
            const defenders = awayPlayers.filter((candidate) => candidate.slot !== SWEEPER_SLOT);
            const rank = [...defenders].sort((a, b) => distance(a, target) - distance(b, target)).indexOf(player);
            moveToward(player, target.x + 34 + rank * 22, target.y + (player.slot - MID_SLOT) * 26, rank < 2 ? 183 : 140);
          }
        }
      });

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
      });

      if (match.ball.owner) {
        match.ball.x = match.ball.owner.x + (match.ball.owner.side === 0 ? 14 : -14);
        match.ball.y = match.ball.owner.y - 8;
        match.ball.vx = 0;
        match.ball.vy = 0;
        match.ball.air = 0;
        match.ball.flightDuration = 0;
        match.ball.kind = "held";
      } else if (match.ball.air > 0) {
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
            match.ball.vx *= 0.28;
            match.ball.vy *= 0.28;
          }
          match.ball.target = null;
        }
      } else {
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
          .sort((a, b) => distance(a, match.ball) - distance(b, match.ball))[0];
        if (collector && distance(collector, match.ball) < 25) {
          match.ball.owner = collector;
          match.ball.kind = "held";
          match.ball.vx = 0;
          match.ball.vy = 0;
          setMessage(match, collector.side === 0 ? "Bola recuperada!" : "Adversário recuperou", 0.9);
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
      if (newCarrier?.side === 1 && match.cpuActionLock <= 0) {
        const pressure = homePlayers.some((player) => distance(player, newCarrier) < 68);
        if (pressure) {
          passBall(1);
          match.cpuActionLock = 1 + Math.random() * 0.8;
        }
      }

      if (newCarrier?.side === 0 && newCarrier.x >= FIELD_W - TRY_LINE) {
        match.score[0] += 5;
        prepareRestart(match, 0);
        setMessage(match, "TRY! · +5 · seu time cobra o reinício", 1.8);
        beep(880, 0.22);
      } else if (newCarrier?.side === 1 && newCarrier.x <= TRY_LINE) {
        match.score[1] += 5;
        prepareRestart(match, 1);
        setMessage(match, "Try adversário · eles cobram o reinício", 1.8);
        beep(120, 0.2);
      }
    },
    [beep, bestWins, passBall, prepareRestart, setMessage, tackle],
  );

  const frame = useCallback(
    (now: number) => {
      const canvas = canvasRef.current;
      const match = matchRef.current;
      if (!canvas || !match) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dt = Math.min((now - match.lastFrame) / 1000, 0.035);
      match.lastFrame = now;
      updateMatch(match, dt);
      drawField(ctx, match, home, away, now, aimRef.current);

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
          paused: match.paused,
          over: match.over,
          message: match.messageUntil > 0 ? match.message : "",
          stamina: homeLineup.map((player) => player.stamina),
          jerseys: homeLineup.map((player) => player.jersey),
          substitutesLeft: match.substitutesLeft[0],
        });
      }
      animationRef.current = requestAnimationFrame(frame);
    },
    [away, home, updateMatch],
  );

  const startMatch = useCallback(() => {
    if (homeId === awayId) {
      const alternative = TEAMS.find((team) => team.id !== homeId);
      if (alternative) setAwayId(alternative.id);
    }
    matchRef.current = freshMatch();
    aimRef.current.active = false;
    joystickRef.current = { x: 0, y: 0, active: false };
    actionRef.current.sprint = false;
    if (joystickKnobRef.current) joystickKnobRef.current.style.transform = "translate(0px, 0px)";
    setAimingDrop(false);
    setHud({
      score: [0, 0],
      seconds: MATCH_SECONDS,
      paused: false,
      over: false,
      message: "Drop-kick inicial: seu time chuta",
      stamina: Array(PLAYERS_PER_SIDE).fill(100),
      jerseys: Array.from({ length: PLAYERS_PER_SIDE }, (_, slot) => slot + 1),
      substitutesLeft: REPLACEMENTS_PER_SIDE,
    });
    setScreen("match");
    beep(520, 0.12);
  }, [awayId, beep, homeId]);

  const restartMatch = useCallback(() => {
    matchRef.current = freshMatch();
    aimRef.current.active = false;
    joystickRef.current = { x: 0, y: 0, active: false };
    actionRef.current.sprint = false;
    if (joystickKnobRef.current) joystickKnobRef.current.style.transform = "translate(0px, 0px)";
    setAimingDrop(false);
    setHud({
      score: [0, 0],
      seconds: MATCH_SECONDS,
      paused: false,
      over: false,
      message: "Revanche: novo drop-kick inicial",
      stamina: Array(PLAYERS_PER_SIDE).fill(100),
      jerseys: Array.from({ length: PLAYERS_PER_SIDE }, (_, slot) => slot + 1),
      substitutesLeft: REPLACEMENTS_PER_SIDE,
    });
    beep(520, 0.12);
  }, [beep]);

  const togglePause = useCallback(() => {
    const match = matchRef.current;
    if (!match || match.over) return;
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
  }, []);

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
    setScreen("setup");
  }, []);

  const substitutePlayer = useCallback(
    (slot: number) => {
      const match = matchRef.current;
      if (!match?.paused || match.substitutesLeft[0] <= 0) return;
      const player = match.players.find(
        (candidate) => candidate.side === 0 && candidate.slot === slot,
      );
      if (!player) return;
      const used = REPLACEMENTS_PER_SIDE - match.substitutesLeft[0];
      player.stamina = 100;
      player.jersey = 8 + used;
      player.stun = 0;
      player.tackleLock = 0;
      player.routeTime = 0;
      match.substitutesLeft[0] -= 1;
      setMessage(match, `Camisa ${player.jersey} entrou renovado`, 1.3);
      setHud((previous) => {
        const stamina = [...previous.stamina];
        const jerseys = [...previous.jerseys];
        stamina[slot] = 100;
        jerseys[slot] = player.jersey;
        return {
          ...previous,
          message: match.message,
          stamina,
          jerseys,
          substitutesLeft: match.substitutesLeft[0],
        };
      });
      beep(680, 0.08);
    },
    [beep, setMessage],
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
    const savedWins = Number(localStorage.getItem("rugby-br-26-wins") ?? "0");
    setBestWins(Number.isFinite(savedWins) ? savedWins : 0);
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
    const onInstall = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    window.addEventListener("beforeinstallprompt", onInstall);
    return () => window.removeEventListener("beforeinstallprompt", onInstall);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(event.code)) {
        event.preventDefault();
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
    const point = canvasPoint(event);
    gestureRef.current = { active: true, x: event.clientX, y: event.clientY };
    if (aimRef.current.active) {
      aimRef.current.x = point.x;
      aimRef.current.y = point.y;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleCanvasPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!aimRef.current.active) return;
    const point = canvasPoint(event);
    aimRef.current.x = point.x;
    aimRef.current.y = point.y;
  };

  const handleCanvasPointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
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
            onClick={() => setSoundOn((value) => !value)}
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
                <span><strong>14</strong> atletas</span>
                <span><strong>100×70</strong> campo</span>
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
              <div className="section-heading">
                <div>
                  <p className="eyebrow">PARTIDA RÁPIDA</p>
                  <h2>Monte o confronto</h2>
                </div>
                <span className="record-chip">{bestWins} vitórias neste aparelho</span>
              </div>

              <div className="versus-grid">
                <label className="team-select">
                  <span>Você joga com</span>
                  <div className="team-preview">
                    <TeamBadge team={home} large />
                    <div>
                      <strong>{home.name}</strong>
                      <small>{home.state} · {home.division}ª divisão</small>
                    </div>
                  </div>
                  <select value={homeId} onChange={(event) => setHomeId(event.target.value)}>
                    {TEAMS.map((team) => (
                      <option value={team.id} key={team.id}>
                        {team.name} ({team.state}) — {team.division}ª divisão
                      </option>
                    ))}
                  </select>
                </label>

                <span className="versus-mark">VS</span>

                <label className="team-select">
                  <span>Adversário (IA)</span>
                  <div className="team-preview">
                    <TeamBadge team={away} large />
                    <div>
                      <strong>{away.name}</strong>
                      <small>{away.state} · {away.division}ª divisão</small>
                    </div>
                  </div>
                  <select value={awayId} onChange={(event) => setAwayId(event.target.value)}>
                    {TEAMS.map((team) => (
                      <option value={team.id} key={team.id}>
                        {team.name} ({team.state}) — {team.division}ª divisão
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <button className="play-button" type="button" onClick={startMatch}>
                <span>Entrar em campo</span>
                <span aria-hidden="true">→</span>
              </button>
              {homeId === awayId && <p className="selection-note">O adversário será trocado automaticamente ao iniciar.</p>}
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
                <span>O camisa 7 adversário atua como sweeper/fullback</span>
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
      ) : (
        <section className="game-stage">
          <div className="match-hud">
            <div className="hud-team">
              <TeamBadge team={home} />
              <span><small>VOCÊ</small><strong>{home.short}</strong></span>
            </div>
            <strong className="score">{hud.score[0]}</strong>
            <div className="match-clock">
              <span>{formatClock(hud.seconds)}</span>
              <small>{hud.paused ? "PAUSADO" : "100×70 M · 7×7"}</small>
            </div>
            <strong className="score">{hud.score[1]}</strong>
            <div className="hud-team hud-team--away">
              <span><small>CPU</small><strong>{away.short}</strong></span>
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
              {hud.paused ? "Continuar" : "Pausar"}
            </button>
            {hud.paused && (
              <button className="end-match-button" type="button" onClick={endPausedMatch}>
                Encerrar partida
              </button>
            )}
            <span><kbd>1–7</kbd> passe · <kbd>K</kbd> chute à frente · <kbd>R</kbd> block · <kbd>Q</kbd> drop</span>
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
                <p className="eyebrow">BANCO DE RESERVAS</p>
                <h3>{hud.substitutesLeft} substituições disponíveis</h3>
              </div>
              <div className="substitution-list">
                {hud.stamina.map((stamina, slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => substitutePlayer(slot)}
                    disabled={hud.substitutesLeft <= 0}
                    aria-label={`Substituir camisa ${hud.jerseys[slot]}, energia ${Math.round(stamina)} por cento`}
                  >
                    <span>#{hud.jerseys[slot]}</span>
                    <i><b style={{ width: `${stamina}%` }} /></i>
                    <small>{Math.round(stamina)}%</small>
                    <strong>Trocar</strong>
                  </button>
                ))}
              </div>
              <p>Pause a partida para trocar qualquer atleta cansado. O sevens permite até cinco reservas.</p>
            </section>
          )}

          {hud.over && (
            <div className="result-actions">
              <button className="play-button" type="button" onClick={restartMatch}>Jogar revanche <span>↻</span></button>
              <button
                className="secondary-button"
                type="button"
                onClick={() => {
                  setImmersiveMode(false);
                  setScreen("setup");
                }}
              >
                Trocar clubes
              </button>
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
          publicada em 29/01/2026. Escudos e paletas visuais referenciados na página oficial
          da competição; uso demonstrativo neste protótipo independente.
        </p>
        <span>HTML5 Canvas · PWA · sem downloads pesados</span>
      </footer>
    </main>
  );
}
