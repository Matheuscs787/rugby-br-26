import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html", host: "localhost" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Rugby BR 26 game shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Rugby BR 26 — rugby sevens 2D<\/title>/i);
  assert.match(html, /Rugby BR 26/);
  assert.match(html, /Do clube local/);
  assert.match(html, /Monte o confronto/);
  assert.match(html, /Farrapos/);
  assert.match(html, /Jacareí/);
  assert.match(html, /manifest\.webmanifest/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|SkeletonPreview/);
});

test("ships lightweight PWA and game assets", async () => {
  const [manifest, serviceWorker, gameSource, rosterSource, styles] = await Promise.all([
    readFile(new URL("../public/manifest.webmanifest", import.meta.url), "utf8"),
    readFile(new URL("../public/sw.js", import.meta.url), "utf8"),
    readFile(new URL("../app/rugby-game.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/rosters.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(manifest, /"display": "standalone"/);
  assert.match(manifest, /icon-192\.png/);
  assert.match(serviceWorker, /rugby-br-26-v9-complete-rosters/);
  assert.match(serviceWorker, /text\/x-component/);
  assert.match(gameSource, /const HALF_SECONDS = 60/);
  assert.match(gameSource, /const SQUAD_SIZE = 12/);
  assert.match(gameSource, /const PLAYERS_PER_SIDE = 7/);
  assert.match(gameSource, /const FIELD_OF_PLAY_METRES = 100/);
  assert.match(gameSource, /const PITCH_WIDTH_METRES = 70/);
  assert.match(gameSource, /const IN_GOAL_METRES = 10/);
  assert.match(gameSource, /const LEFT_22 = TRY_LINE \+ 22 \* METRE_SCALE/);
  assert.match(gameSource, /METRE_SCALE \* 0\.25/);
  assert.match(gameSource, /100 × 70 m/);
  assert.match(gameSource, /screen === "squad"/);
  assert.match(gameSource, /Escolha seus 12/);
  assert.match(gameSource, /O elenco exibido não tem limite/);
  assert.match(gameSource, /className="roster-search"/);
  assert.match(gameSource, /athlete\.photo/);
  assert.match(gameSource, /match\.half === 1/);
  assert.match(gameSource, /match\.halftime = true/);
  assert.match(gameSource, /5 m da linha de try/);
  assert.match(gameSource, /RUGBY SEVENS · 7 CONTRA 7/);
  assert.match(gameSource, /Sound is optional and must never prevent a match from starting/);
  assert.match(gameSource, /const beginDropAim/);
  assert.match(gameSource, /const finishDropAim/);
  assert.match(gameSource, /const performBlock/);
  assert.match(gameSource, /const kickBall/);
  assert.match(gameSource, /flightDuration/);
  assert.match(gameSource, /const substitutePlayer/);
  assert.match(gameSource, /SWEEPER_SLOT/);
  assert.match(gameSource, /arrangeRestart/);
  assert.match(gameSource, /joystickKnobRef/);
  assert.match(gameSource, /const deadZone = 0\.14/);
  assert.match(gameSource, /--camera-x/);
  assert.match(gameSource, /className="field-viewport"/);
  assert.match(gameSource, /const toggleFullscreen/);
  assert.match(gameSource, /webkitRequestFullscreen/);
  assert.match(gameSource, /event\.detail === 0/);
  assert.match(gameSource, /app-shell--immersive/);
  assert.match(gameSource, /logo: "\/clubs\/farrapos\.png"/);
  assert.match(gameSource, /const endPausedMatch/);
  assert.match(gameSource, /targetSlot\?: number/);
  assert.match(gameSource, /Tornados Indaiatuba/);
  assert.match(gameSource, /Leões de Paraisópolis/);
  assert.match(styles, /@media \(hover: none\) and \(pointer: coarse\)/);
  assert.match(styles, /grid-template-columns: repeat\(3, 60px\)/);
  assert.match(styles, /env\(safe-area-inset-bottom\)/);
  assert.match(styles, /\.app-shell--immersive/);
  assert.match(styles, /\.twenty-two-left/);
  assert.match(styles, /\.touch-fifteen-bottom/);
  assert.match(styles, /\.roster-grid/);
  assert.match(styles, /\.roster-avatar/);
  assert.match(styles, /\.roster-search/);
  assert.match(styles, /\.squad-summary/);
  assert.match(rosterSource, /ROSTERS_2026/);
  assert.match(rosterSource, /SÚMULA|súmulas/i);
  assert.match(rosterSource, /MARCOS FERNANDO CIVARDI/);
  assert.match(rosterSource, /NICOLAS DE AZEVEDO RIBEIRO/);
  assert.match(rosterSource, /JOSÉ VÍTOR TAVARES DA COSTA BESSA/);
  assert.equal((rosterSource.match(/"competition":/g) ?? []).length, 24);
  assert.ok((rosterSource.match(/"name":/g) ?? []).length > 700);
  assert.ok((rosterSource.match(/"photo":/g) ?? []).length > 500);

  await access(new URL("../public/icon-192.png", import.meta.url));
  await access(new URL("../public/icon-512.png", import.meta.url));
  await access(new URL("../public/og.png", import.meta.url));
  const clubLogos = await readdir(new URL("../public/clubs", import.meta.url));
  assert.equal(clubLogos.length, 24);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
});
