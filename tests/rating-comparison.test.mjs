import assert from "node:assert/strict";
import test from "node:test";

import {
  analyzeOfficialMatch,
  calculateCandidateRating,
  createEmptyEvidence,
  createPlayerMatcher,
  isAdultOfficialMatch,
  parseOfficialSheet,
  positionFromNumber,
} from "../scripts/compare-player-ratings.mjs";

test("filtra competições de base e mantém competições adultas", () => {
  assert.equal(isAdultOfficialMatch({ NomeCampeonato: "BRASIL SEVENS SUB 19 MASCULINO" }), false);
  assert.equal(isAdultOfficialMatch({ NomeCampeonato: "QUALIFICATÓRIO M17 SUL 2025" }), false);
  assert.equal(isAdultOfficialMatch({ NomeCampeonato: "BRASIL SEVENS ADULTO MASCULINO" }), true);
  assert.equal(isAdultOfficialMatch({ NomeCampeonato: "CAMPEONATO PARANAENSE XV" }), true);
});

test("concilia nome completo e rejeita aproximação baseada só em prenome", () => {
  const players = [
    { name: "GUILHERME", profile: "https://example.test/atleta/guilherme-philipe-pires-dos-santos" },
    { name: "Leo", profile: "https://example.test/atleta/leonardo-vilas-boas-raimundo" },
  ];
  const matcher = createPlayerMatcher(players);

  assert.equal(matcher("LEONARDO VILAS BOAS")?.index, 1);
  assert.equal(matcher("GUILHERME CAMARGO SOARES"), null);
});

test("lê escalação e confirma uma entrada a partir dos eventos da súmula", () => {
  const html = `
    <h2 class="nomesEquipes">ADVERSÁRIO</h2>
    <h2 class="nomesEquipes">PÉ VERMELHO</h2>
    <tbody id="bodyCasa"><tr><td>1</td><td>OUTRO ATLETA</td></tr></tbody>
    <tbody id="bodyVisitante">
      <tr><td>10</td><td>TITULAR TESTE</td></tr>
      <tr><td>16</td><td>RESERVA TESTE</td></tr>
    </tbody>
    <table id="tabelaEventos"><tbody>
      <tr><td>1</td><td>2º</td><td>5</td><td>Substituição - Entrou</td><td>PÉ VERMELHO</td><td>16 - RESERVA TESTE</td></tr>
      <tr><td>2</td><td>2º</td><td>8</td><td>Try</td><td>PÉ VERMELHO</td><td>16 - RESERVA TESTE</td></tr>
    </tbody></table>
  `;
  const players = [{ name: "TITULAR TESTE" }, { name: "RESERVA TESTE" }];
  const match = {
    NomeSiteEquipeCasa: "adversario",
    NomeSiteEquipeVisitante: "pe-vermelho-rugby-clube",
    NomeEquipeVisitante: "PÉ VERMELHO",
    NomeCampeonato: "CAMPEONATO PARANAENSE XV",
    DataPartida: "/Date(1782864000000)/",
  };
  const sheet = parseOfficialSheet(html, "https://example.test/sumula/1");
  const result = analyzeOfficialMatch({
    match,
    sheet,
    teamSlug: "pe-vermelho-rugby-clube",
    matcher: createPlayerMatcher(players),
  });
  const starter = result.contributions.find((item) => item.playerIndex === 0)?.contribution;
  const reserve = result.contributions.find((item) => item.playerIndex === 1)?.contribution;

  assert.equal(starter?.start, true);
  assert.equal(reserve?.entry, true);
  assert.equal(reserve?.tries, 1);
  assert.equal(reserve?.effectiveParticipation, 0.5);
});

test("posição molda atributos sem elevar o OVR por si só", () => {
  const frontRow = calculateCandidateRating({ number: 1 }, createEmptyEvidence(), 2);
  const fullback = calculateCandidateRating({ number: 15 }, createEmptyEvidence(), 2);

  assert.equal(positionFromNumber(1), "frontRow");
  assert.equal(positionFromNumber(15), "fullback");
  assert.equal(frontRow.overall, 68);
  assert.equal(fullback.overall, 68);
  assert.notDeepEqual(frontRow.skills, fullback.skills);
});

test("participação e eventos oficiais aumentam a nota com limite", () => {
  const evidence = createEmptyEvidence();
  evidence.effectiveParticipation = 6;
  evidence.weightedTries = 4;
  evidence.starts = 6;
  evidence.roleWeights.centre = 6;

  const provisional = calculateCandidateRating({ number: 12 }, createEmptyEvidence(), 2);
  const experienced = calculateCandidateRating({ number: 12 }, evidence, 2);

  assert.ok(experienced.overall > provisional.overall);
  assert.equal(experienced.confidenceLabel, "alta");
  assert.ok(Object.values(experienced.skills).every((value) => value >= 40 && value <= 95));
});
