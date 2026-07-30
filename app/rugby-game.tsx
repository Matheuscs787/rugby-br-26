"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Division = 1 | 2;
type Team = {
  id: string;
  name: string;
  state: string;
  division: Division;
  group: string;
  primary: string;
  secondary: string;
  short: string;
};

type Player = {
  id: number;
  side: 0 | 1;
  slot: number;
  x: number;
  y: number;
  stun: number;
  tackleLock: number;
};

type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  owner: Player | null;
  target: Player | null;
  air: number;
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
  message: string;
  messageUntil: number;
};

type Hud = {
  score: [number, number];
  seconds: number;
  paused: boolean;
  over: boolean;
  message: string;
};

type AimPoint = {
  active: boolean;
  x: number;
  y: number;
};

const FIELD_W = 1100;
const FIELD_H = 620;
const TRY_LINE = 70;
const CENTRE_Y = FIELD_H / 2;
const PLAYER_RADIUS = 17;
const MATCH_SECONDS = 120;
const PLAYERS_PER_SIDE = 7;
const MID_SLOT = Math.floor(PLAYERS_PER_SIDE / 2);

const TEAMS: Team[] = [
  { id: "farrapos", name: "Farrapos", state: "RS", division: 1, group: "Grupo A", primary: "#7d1731", secondary: "#f2c84b", short: "FAR" },
  { id: "charrua", name: "Charrua", state: "RS", division: 1, group: "Grupo A", primary: "#151515", secondary: "#e6a62d", short: "CHA" },
  { id: "joaca", name: "Joaca", state: "SC", division: 1, group: "Grupo A", primary: "#184b9b", secondary: "#ed553b", short: "JOA" },
  { id: "desterro", name: "Desterro", state: "SC", division: 1, group: "Grupo A", primary: "#146b45", secondary: "#f1f0da", short: "DES" },
  { id: "poli", name: "Poli", state: "SP", division: 1, group: "Grupo B", primary: "#12284c", secondary: "#f3c74f", short: "POL" },
  { id: "sao-jose", name: "São José", state: "SP", division: 1, group: "Grupo B", primary: "#111111", secondary: "#f0c12b", short: "SJC" },
  { id: "tornados", name: "Tornados Indaiatuba", state: "SP", division: 1, group: "Grupo B", primary: "#1c59ad", secondary: "#d7eefb", short: "TOR" },
  { id: "rio-branco", name: "Rio Branco", state: "SP", division: 1, group: "Grupo B", primary: "#efeee7", secondary: "#1e1e1e", short: "RBR" },
  { id: "jacarei", name: "Jacareí", state: "SP", division: 1, group: "Grupo C", primary: "#e86c23", secondary: "#172d55", short: "JAC" },
  { id: "spac", name: "SPAC", state: "SP", division: 1, group: "Grupo C", primary: "#bd2636", secondary: "#f3eee2", short: "SPA" },
  { id: "pasteur", name: "Pasteur", state: "SP", division: 1, group: "Grupo C", primary: "#2563a9", secondary: "#f4f4ed", short: "PAS" },
  { id: "nova-lima", name: "Nova Lima", state: "MG", division: 1, group: "Grupo C", primary: "#28225f", secondary: "#df385b", short: "NOL" },
  { id: "brummers", name: "Brummers", state: "RS", division: 2, group: "Taça RS–SC", primary: "#b62c38", secondary: "#191919", short: "BRU" },
  { id: "colonos", name: "Colonos", state: "RS", division: 2, group: "Taça RS–SC", primary: "#176847", secondary: "#ebe7cd", short: "COL" },
  { id: "serra-gaucha", name: "Serra Gaúcha", state: "RS", division: 2, group: "Taça RS–SC", primary: "#6e1f3d", secondary: "#e9b749", short: "SEG" },
  { id: "joinville", name: "Joinville", state: "SC", division: 2, group: "Taça RS–SC", primary: "#163e77", secondary: "#58a7d7", short: "JOI" },
  { id: "pe-vermelho", name: "Pé Vermelho", state: "PR", division: 2, group: "Taça PR–SP", primary: "#9f2033", secondary: "#151515", short: "PVE" },
  { id: "leoes", name: "Leões de Paraisópolis", state: "SP", division: 2, group: "Taça PR–SP", primary: "#146c48", secondary: "#f19b35", short: "LEO" },
  { id: "urutu", name: "Urutu", state: "SP", division: 2, group: "Taça PR–SP", primary: "#b9292f", secondary: "#f4c33d", short: "URU" },
  { id: "iguanas", name: "Iguanas SJC", state: "SP", division: 2, group: "Taça PR–SP", primary: "#2c7b3f", secondary: "#d8e85c", short: "IGU" },
  { id: "niteroi", name: "Niterói", state: "RJ", division: 2, group: "Taça RJ–MG–ES", primary: "#be2737", secondary: "#1b1b1b", short: "NIT" },
  { id: "rio", name: "Rio", state: "RJ", division: 2, group: "Taça RJ–MG–ES", primary: "#1d1d1d", secondary: "#e1a627", short: "RIO" },
  { id: "carioca", name: "Carioca", state: "RJ", division: 2, group: "Taça RJ–MG–ES", primary: "#123c73", secondary: "#71b8d6", short: "CAR" },
  { id: "vitoria", name: "Vitória", state: "ES", division: 2, group: "Taça RJ–MG–ES", primary: "#b32937", secondary: "#f1e8d5", short: "VIT" },
];

const keyState = new Set<string>();

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function formatClock(seconds: number) {
  const safe = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
}

function makePlayers(): Player[] {
  const lanes = [100, 170, 240, 310, 380, 450, 520];
  return [
    ...lanes.map((y, slot) => ({
      id: slot,
      side: 0 as const,
      slot,
      x: 255 - Math.abs(MID_SLOT - slot) * 14,
      y,
      stun: 0,
      tackleLock: 0,
    })),
    ...lanes.map((y, slot) => ({
      id: slot + PLAYERS_PER_SIDE,
      side: 1 as const,
      slot,
      x: 845 + Math.abs(MID_SLOT - slot) * 14,
      y,
      stun: 0,
      tackleLock: 0,
    })),
  ];
}

function freshMatch(): Match {
  const players = makePlayers();
  const firstCarrier = players[MID_SLOT];
  return {
    players,
    ball: { x: firstCarrier.x, y: firstCarrier.y, vx: 0, vy: 0, owner: firstCarrier, target: null, air: 0 },
    score: [0, 0],
    seconds: MATCH_SECONDS,
    running: true,
    over: false,
    paused: false,
    lastFrame: performance.now(),
    actionLock: 0,
    cpuActionLock: 0.7,
    kickoff: 0,
    message: "Bola em jogo!",
    messageUntil: 1.6,
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

  for (let x = 0; x < FIELD_W; x += 110) {
    ctx.fillStyle = x % 220 === 0 ? "rgba(255,255,255,.022)" : "rgba(0,0,0,.025)";
    ctx.fillRect(x, 0, 110, FIELD_H);
  }

  ctx.strokeStyle = "rgba(239,255,241,.78)";
  ctx.lineWidth = 3;
  ctx.strokeRect(TRY_LINE, 34, FIELD_W - TRY_LINE * 2, FIELD_H - 68);
  ctx.beginPath();
  ctx.moveTo(FIELD_W / 2, 34);
  ctx.lineTo(FIELD_W / 2, FIELD_H - 34);
  ctx.moveTo(TRY_LINE, 34);
  ctx.lineTo(TRY_LINE, FIELD_H - 34);
  ctx.moveTo(FIELD_W - TRY_LINE, 34);
  ctx.lineTo(FIELD_W - TRY_LINE, FIELD_H - 34);
  ctx.stroke();

  ctx.lineWidth = 1.4;
  ctx.setLineDash([8, 9]);
  [TRY_LINE + 145, FIELD_W / 2 - 110, FIELD_W / 2 + 110, FIELD_W - TRY_LINE - 145].forEach((x) => {
    ctx.beginPath();
    ctx.moveTo(x, 34);
    ctx.lineTo(x, FIELD_H - 34);
    ctx.stroke();
  });
  ctx.setLineDash([]);

  ctx.fillStyle = "rgba(235,255,242,.58)";
  ctx.font = "800 30px ui-sans-serif, system-ui";
  ctx.textAlign = "center";
  ctx.save();
  ctx.translate(36, CENTRE_Y);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("IN-GOAL", 0, 0);
  ctx.restore();
  ctx.save();
  ctx.translate(FIELD_W - 36, CENTRE_Y);
  ctx.rotate(Math.PI / 2);
  ctx.fillText("IN-GOAL", 0, 0);
  ctx.restore();

  const post = (x: number) => {
    ctx.strokeStyle = "#f6f1c9";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x, CENTRE_Y - 55);
    ctx.lineTo(x, CENTRE_Y + 55);
    ctx.moveTo(x - 18, CENTRE_Y - 55);
    ctx.lineTo(x + 18, CENTRE_Y - 55);
    ctx.moveTo(x - 18, CENTRE_Y + 55);
    ctx.lineTo(x + 18, CENTRE_Y + 55);
    ctx.stroke();
  };
  post(TRY_LINE - 6);
  post(FIELD_W - TRY_LINE + 6);

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
      player.x < match.ball.owner.x - 18;
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

    const body = ctx.createLinearGradient(player.x - 15, player.y - 15, player.x + 15, player.y + 15);
    body.addColorStop(0, team.secondary);
    body.addColorStop(0.28, team.primary);
    body.addColorStop(1, team.primary);
    ctx.fillStyle = player.stun > 0 ? "#718079" : body;
    ctx.beginPath();
    ctx.arc(player.x, player.y, PLAYER_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(4,14,10,.62)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = team.secondary;
    ctx.font = "900 11px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(player.slot + 1), player.x, player.y + 0.5);
  });

  const ball = match.ball;
  ctx.save();
  ctx.translate(ball.x, ball.y);
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
      {team.short}
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
  const [hud, setHud] = useState<Hud>({
    score: [0, 0],
    seconds: MATCH_SECONDS,
    paused: false,
    over: false,
    message: "",
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const matchRef = useRef<Match | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastHudRef = useRef(0);
  const joystickRef = useRef({ x: 0, y: 0, active: false });
  const actionRef = useRef({ sprint: false, block: false });
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

  const resetFormation = useCallback(
    (match: Match, possession: 0 | 1) => {
      const reset = makePlayers();
      match.players.splice(0, match.players.length, ...reset);
      const owner =
        possession === 0
          ? match.players[MID_SLOT]
          : match.players[PLAYERS_PER_SIDE + MID_SLOT];
      match.ball = { x: owner.x, y: owner.y, vx: 0, vy: 0, owner, target: null, air: 0 };
      match.kickoff = 1.15;
      match.actionLock = 0.4;
      match.cpuActionLock = 0.8;
    },
    [],
  );

  const passBall = useCallback(
    (side: 0 | 1, targetSlot?: number) => {
      const match = matchRef.current;
      if (!match || !match.running || match.paused || match.over || match.actionLock > 0) return;
      const owner = match.ball.owner;
      if (!owner || owner.side !== side) return;
      const candidates = match.players
        .filter((player) => {
          if (player.side !== side || player === owner || player.stun > 0) return false;
          return side === 0 ? player.x < owner.x - 18 : player.x > owner.x + 18;
        })
        .sort((a, b) => Math.abs(a.y - owner.y) + distance(a, owner) * 0.25 - (Math.abs(b.y - owner.y) + distance(b, owner) * 0.25));
      const target =
        targetSlot === undefined
          ? candidates[0]
          : candidates.find((player) => player.slot === targetSlot);
      if (!target) {
        if (side === 0) {
          setMessage(
            match,
            targetSlot === undefined
              ? "Sem apoio atrás!"
              : `O jogador ${targetSlot + 1} precisa estar atrás da bola`,
            1.25,
          );
        }
        return;
      }
      match.ball.owner = null;
      match.ball.target = target;
      match.ball.air = clamp(distance(owner, target) / 430, 0.2, 0.5);
      match.ball.vx = (target.x - owner.x) / match.ball.air;
      match.ball.vy = (target.y - owner.y) / match.ball.air;
      match.actionLock = 0.28;
      if (side === 0) {
        setMessage(match, `Passe para o ${target.slot + 1}`);
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
        setMessage(match, "DROP GOAL! · +3", 1.6);
        beep(760, 0.22);
        resetFormation(match, 1);
      } else {
        setMessage(match, "Drop para fora — posse adversária", 1.5);
        beep(160, 0.14);
        resetFormation(match, 1);
      }
    },
    [beep, resetFormation, setMessage],
  );

  const performSwerve = useCallback(
    (direction?: number) => {
      const match = matchRef.current;
      if (!match || match.paused || match.over || match.actionLock > 0) return;
      const owner = match.ball.owner;
      if (!owner || owner.side !== 0 || owner.stun > 0) return;
      const inputDirection =
        direction ??
        (keyState.has("ArrowDown") || keyState.has("KeyS")
          ? 1
          : keyState.has("ArrowUp") || keyState.has("KeyW")
            ? -1
            : owner.y < CENTRE_Y
              ? 1
              : -1);
      owner.x = clamp(owner.x + 28, 34, FIELD_W - 34);
      owner.y = clamp(owner.y + Math.sign(inputDirection || 1) * 76, 54, FIELD_H - 54);
      owner.tackleLock = 0.46;
      match.actionLock = 0.46;
      setMessage(match, "Swerve! Defesa quebrada", 0.9);
      beep(560, 0.07);
    },
    [beep, setMessage],
  );

  const kickBall = useCallback(() => {
    const match = matchRef.current;
    if (!match || match.paused || match.over || match.actionLock > 0) return;
    const owner = match.ball.owner;
    if (!owner || owner.side !== 0) return;
    const inRange = owner.x > 680;
    const aligned = Math.abs(owner.y - CENTRE_Y) < 170;
    match.actionLock = 1;
    if (inRange && aligned) {
      match.score[0] += 3;
      setMessage(match, "CHUTE CONVERTIDO · +3", 1.5);
      beep(740, 0.2);
      resetFormation(match, 1);
    } else {
      setMessage(match, "Chute curto — posse adversária", 1.4);
      beep(180, 0.14);
      resetFormation(match, 1);
    }
  }, [beep, resetFormation, setMessage]);

  const tackle = useCallback(
    (match: Match, carrier: Player, tackler: Player) => {
      if (carrier.tackleLock > 0 || tackler.tackleLock > 0) return;

      if (carrier.side === 0 && actionRef.current.block) {
        carrier.stun = 0.12;
        carrier.tackleLock = 0.58;
        tackler.stun = 0.92;
        tackler.tackleLock = 1;
        setMessage(match, "Bloqueio no contato!", 0.9);
        beep(410, 0.08);
        return;
      }

      carrier.stun = 0.56;
      tackler.stun = 0.72;
      carrier.tackleLock = 1;
      tackler.tackleLock = 1;

      const support = match.players
        .filter((player) => player.side === carrier.side && player !== carrier && player.stun <= 0)
        .sort((a, b) => distance(a, carrier) - distance(b, carrier))[0];
      const pressure = match.players
        .filter((player) => player.side !== carrier.side)
        .sort((a, b) => distance(a, carrier) - distance(b, carrier))[0];
      const blockingTackler = tackler.side === 0 && actionRef.current.block;
      const retained =
        !blockingTackler &&
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
        return;
      }

      match.seconds -= dt;
      match.actionLock = Math.max(0, match.actionLock - dt);
      match.cpuActionLock = Math.max(0, match.cpuActionLock - dt);
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
      const blocking = actionRef.current.block || keyState.has("KeyR");

      if (controlled && controlled.stun <= 0) {
        const speed = blocking ? 132 : sprinting ? 244 : 190;
        controlled.x += (inputX / inputLength) * speed * dt;
        controlled.y += (inputY / inputLength) * speed * dt;
      }

      const moveToward = (player: Player, tx: number, ty: number, speed: number) => {
        if (player.stun > 0 || player === controlled) return;
        const dx = tx - player.x;
        const dy = ty - player.y;
        const length = Math.hypot(dx, dy) || 1;
        player.x += (dx / length) * speed * dt;
        player.y += (dy / length) * speed * dt;
      };

      homePlayers.forEach((player) => {
        if (player === controlled) return;
        if (ballOwner?.side === 0) {
          const laneOffset = (player.slot - MID_SLOT) * 57;
          moveToward(player, ballOwner.x - 82 - Math.abs(player.slot - ballOwner.slot) * 22, ballOwner.y + laneOffset, 142);
        } else {
          const target = ballOwner ?? match.ball;
          const chaseRank = [...homePlayers].sort((a, b) => distance(a, target) - distance(b, target)).indexOf(player);
          moveToward(player, target.x + chaseRank * 25, target.y + (player.slot - MID_SLOT) * 27, chaseRank < 2 ? 168 : 132);
        }
      });

      awayPlayers.forEach((player) => {
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
            moveToward(player, ballOwner.x + 90 + Math.abs(player.slot - ballOwner.slot) * 22, ballOwner.y + (player.slot - MID_SLOT) * 52, 140);
          }
        } else {
          const target = ballOwner ?? match.ball;
          const rank = [...awayPlayers].sort((a, b) => distance(a, target) - distance(b, target)).indexOf(player);
          moveToward(player, target.x - rank * 26, target.y + (player.slot - MID_SLOT) * 26, rank < 2 ? 183 : 140);
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
      } else if (match.ball.target && match.ball.air > 0) {
        match.ball.air -= dt;
        match.ball.x += match.ball.vx * dt;
        match.ball.y += match.ball.vy * dt;
        if (match.ball.air <= 0) {
          match.ball.owner = match.ball.target;
          match.ball.target = null;
          match.ball.vx = 0;
          match.ball.vy = 0;
        }
      } else {
        match.ball.x += match.ball.vx * dt;
        match.ball.y += match.ball.vy * dt;
        match.ball.vx *= Math.pow(0.08, dt);
        match.ball.vy *= Math.pow(0.08, dt);
        const collector = [...match.players]
          .filter((player) => player.stun <= 0)
          .sort((a, b) => distance(a, match.ball) - distance(b, match.ball))[0];
        if (collector && distance(collector, match.ball) < 25) {
          match.ball.owner = collector;
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
        setMessage(match, "TRY! · +5", 1.6);
        beep(880, 0.22);
        resetFormation(match, 1);
      } else if (newCarrier?.side === 1 && newCarrier.x <= TRY_LINE) {
        match.score[1] += 5;
        setMessage(match, "Try adversário", 1.5);
        beep(120, 0.2);
        resetFormation(match, 0);
      }
    },
    [beep, bestWins, passBall, resetFormation, setMessage, tackle],
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

      if (now - lastHudRef.current > 80) {
        lastHudRef.current = now;
        setHud({
          score: [...match.score] as [number, number],
          seconds: match.seconds,
          paused: match.paused,
          over: match.over,
          message: match.messageUntil > 0 ? match.message : "",
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
    setAimingDrop(false);
    setHud({
      score: [0, 0],
      seconds: MATCH_SECONDS,
      paused: false,
      over: false,
      message: "Bola em jogo!",
    });
    setScreen("match");
    beep(520, 0.12);
  }, [awayId, beep, homeId]);

  const restartMatch = useCallback(() => {
    matchRef.current = freshMatch();
    aimRef.current.active = false;
    setAimingDrop(false);
    setHud({
      score: [0, 0],
      seconds: MATCH_SECONDS,
      paused: false,
      over: false,
      message: "Revanche!",
    });
    beep(520, 0.12);
  }, [beep]);

  const togglePause = useCallback(() => {
    const match = matchRef.current;
    if (!match || match.over) return;
    match.paused = !match.paused;
    if (match.paused) {
      aimRef.current.active = false;
      setAimingDrop(false);
    }
    match.lastFrame = performance.now();
    setHud((previous) => ({ ...previous, paused: match.paused }));
  }, []);

  const endPausedMatch = useCallback(() => {
    const match = matchRef.current;
    if (!match?.paused) return;
    match.running = false;
    aimRef.current.active = false;
    setAimingDrop(false);
    matchRef.current = null;
    setScreen("setup");
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
      if (event.code === "KeyR") actionRef.current.block = true;
      if (event.repeat) return;
      if (event.code === "Space" || event.code === "KeyJ") passBall(0);
      if (event.code === "KeyK") kickBall();
      if (event.code === "KeyQ") beginDropAim();
      if (event.code === "KeyE") performSwerve();
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
      if (event.code === "KeyR") actionRef.current.block = false;
    };
    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      keyState.clear();
    };
  }, [beginDropAim, kickBall, passBall, performSwerve, togglePause]);

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
      performSwerve(Math.abs(swipeY) > 18 ? Math.sign(swipeY) : undefined);
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
    joystickRef.current = {
      x: length > 1 ? x / length : x,
      y: length > 1 ? y / length : y,
      active: true,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const releaseJoystick = () => {
    joystickRef.current = { x: 0, y: 0, active: false };
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
    <main className="app-shell">
      <header className="topbar">
        <button className="brand" type="button" onClick={() => setScreen("setup")} aria-label="Voltar à seleção">
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
                <span><strong>120</strong> segundos</span>
              </div>
            </div>
            <div className="hero-board" aria-label="Ilustração tática do campo">
              <div className="field-lines">
                <i className="try-left" />
                <i className="middle-line" />
                <i className="try-right" />
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
                <span>Passe automático para um apoio atrás</span>
              </div>
              <div className="control-row">
                <span className="key-group"><kbd>1</kbd><kbd>—</kbd><kbd>7</kbd></span>
                <span>Escolher o recebedor; também pode clicar nele</span>
              </div>
              <div className="control-row">
                <span className="key-group"><kbd>SHIFT</kbd></span>
                <span>Correr e pressionar no tackle</span>
              </div>
              <div className="control-row">
                <span className="key-group"><kbd>E</kbd></span>
                <span>Swerve/finta; no toque, deslize sobre o campo</span>
              </div>
              <div className="control-row">
                <span className="key-group"><kbd>R</kbd></span>
                <span>Segurar o bloqueio para proteger a bola</span>
              </div>
              <div className="control-row">
                <span className="key-group"><kbd>Q</kbd><kbd>CLICK</kbd></span>
                <span>Drop: mire e clique exatamente entre os postes</span>
              </div>
              <p className="touch-note">No celular, os controles aparecem sobre o campo.</p>
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
              <small>{hud.paused ? "PAUSADO" : "SEVENS · 7×7"}</small>
            </div>
            <strong className="score">{hud.score[1]}</strong>
            <div className="hud-team hud-team--away">
              <span><small>CPU</small><strong>{away.short}</strong></span>
              <TeamBadge team={away} />
            </div>
          </div>

          <div className="canvas-frame">
            <canvas
              ref={canvasRef}
              width={FIELD_W}
              height={FIELD_H}
              className={aimingDrop ? "is-aiming" : ""}
              role="img"
              aria-label={`Partida de rugby sevens, sete contra sete, entre ${home.name} e ${away.name}. Use WASD para mover, números de 1 a 7 para escolher o passe, E para swerve, R para bloqueio e Q para mirar o drop.`}
              onPointerDown={handleCanvasPointerDown}
              onPointerMove={handleCanvasPointerMove}
              onPointerUp={handleCanvasPointerUp}
              onPointerCancel={() => { gestureRef.current.active = false; }}
            />
            {hud.message && <div className="game-message">{hud.message}</div>}
            <div className="mobile-controls" aria-label="Controles por toque">
              <div
                className="joystick"
                onPointerDown={handleJoystick}
                onPointerMove={(event) => joystickRef.current.active && handleJoystick(event)}
                onPointerUp={releaseJoystick}
                onPointerCancel={releaseJoystick}
              >
                <span
                  style={{
                    transform: `translate(${joystickRef.current.x * 30}px, ${joystickRef.current.y * 30}px)`,
                  }}
                />
              </div>
              <div className="action-buttons">
                <button type="button" className="action action--drop" onPointerDown={beginDropAim}><strong>Q</strong><small>DROP</small></button>
                <button
                  type="button"
                  className="action action--block"
                  onPointerDown={() => { actionRef.current.block = true; }}
                  onPointerUp={() => { actionRef.current.block = false; }}
                  onPointerCancel={() => { actionRef.current.block = false; }}
                >
                  <strong>R</strong><small>BLOCK</small>
                </button>
                <button type="button" className="action action--swerve" onPointerDown={() => performSwerve()}><strong>E</strong><small>SWERVE</small></button>
                <button
                  type="button"
                  className="action action--sprint"
                  onPointerDown={() => { actionRef.current.sprint = true; }}
                  onPointerUp={() => { actionRef.current.sprint = false; }}
                  onPointerCancel={() => { actionRef.current.sprint = false; }}
                >
                  <strong>B</strong><small>CORRER</small>
                </button>
                <button type="button" className="action action--pass" onPointerDown={() => passBall(0)}><strong>A</strong><small>PASSE</small></button>
              </div>
            </div>
          </div>

          <div className="game-toolbar">
            <button type="button" onClick={togglePause}>{hud.paused ? "Continuar" : "Pausar"}</button>
            {hud.paused && (
              <button className="end-match-button" type="button" onClick={endPausedMatch}>
                Encerrar partida
              </button>
            )}
            <span><kbd>1–7</kbd> passe · <kbd>E</kbd> swerve · <kbd>R</kbd> block · <kbd>Q</kbd> drop</span>
            <button
              type="button"
              onClick={() => document.documentElement.requestFullscreen?.()}
            >
              Tela cheia
            </button>
          </div>

          {hud.over && (
            <div className="result-actions">
              <button className="play-button" type="button" onClick={restartMatch}>Jogar revanche <span>↻</span></button>
              <button className="secondary-button" type="button" onClick={() => setScreen("setup")}>Trocar clubes</button>
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
          publicada em 29/01/2026. Cores estilizadas; escudos oficiais não reproduzidos.
        </p>
        <span>HTML5 Canvas · PWA · sem downloads pesados</span>
      </footer>
    </main>
  );
}
