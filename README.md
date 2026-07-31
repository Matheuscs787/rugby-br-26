# Rugby BR 26

Protótipo leve de rugby sevens 2D para navegador, com 24 clubes da 1ª e da 2ª
divisões nacionais masculinas de 2026, elencos públicos do Sporti, partidas
controláveis ou simuladas e modo campeonato.

- GitHub Pages: <https://matheuscs787.github.io/rugby-br-26/>
- Repositório: <https://github.com/Matheuscs787/rugby-br-26>

> Este é um protótipo independente. Os atributos são estimativas para fins de
> jogabilidade, não avaliações oficiais dos clubes, atletas, CBRu ou Sporti.

## O que já está no jogo

- 7 jogadores de cada lado e convocação de 12 atletas: 7 titulares e 5 reservas;
- dois tempos de 1 minuto, com intervalo;
- amistoso e campanha de campeonato;
- opção de controlar o time escolhido ou assistir a duas IAs;
- velocidade de simulação em 1× e 2×;
- IA tática com circulação de mão em mão até a ponta, fixação do defensor antes
  do passe, linha defensiva coordenada e parede diante do próprio in-goal;
- passe lateral/para trás, passe direcionado, chute à frente, drop e block;
- fadiga, banco de reservas e substituições durante pausas;
- reinícios por drop-kick, com o time que marcou cobrando o reinício;
- troca real de campo no intervalo: direção de corrida, passes, chutes, drops,
  linha de try e posicionamento acompanham os lados do segundo tempo;
- recuperação progressiva da bola solta: a disputa começa por proximidade e,
  em qualquer bola no chão, os dois jogadores mais próximos de cada equipe
  abandonam suas formações e correm diretamente para recuperá-la; se uma
  aglomeração impedir a coleta, o atleta mais próximo assegura a posse em até
  três segundos para a partida não ficar travada;
- fullback dinâmico: no reinício, o time que chuta deixa seu sétimo atleta mais
  profundo para defender; depois da posse se estabilizar, o fullback passa a ser
  o sétimo atleta do time que estiver defendendo; ele mantém profundidade
  enquanto a primeira linha cobre o portador e avança para fechar o tackle
  quando o atacante rompe essa linha;
- campo de jogo de 100 × 70 m, mais in-goals de 10 m, com linhas de try, 5 m,
  22 m, 10 m, meio de campo e marcações de 5 m e 15 m a partir das laterais; os
  nomes dos clubes aparecem entre as linhas de 22 m e 10 m e trocam de lado no
  segundo tempo;
- nomes, apelidos, fotos e estatísticas quando disponíveis nas fontes públicas;
- escalação automática dos 12 maiores overalls, que pode ser alterada pelo usuário;
- PWA instalável, funcionamento offline básico e layout adaptado para celular;
- áudio leve e limpo, limitado ao apito na abertura de cada tempo e na
  confirmação dos pontos, acompanhado pela torcida;
- publicação estática compatível com GitHub Pages.

## Como jogar

### Fluxo de uma partida

1. Escolha `Amistoso` ou `Campeonato`.
2. Escolha o clube e, no amistoso, o adversário.
3. Selecione `Controlar o time` ou `Assistir simulação`.
4. Confirme até 12 atletas. Os 7 primeiros são titulares e os 5 seguintes vão
   para o banco. Por padrão, o jogo seleciona os 12 maiores overalls.
5. Jogue dois tempos de 1 minuto. Pause para substituir um atleta ou encerrar a
   partida.

O passe só aceita um companheiro que esteja na linha da bola ou atrás dela. Um
passe comum procura automaticamente o melhor apoio legal; as teclas 1–7 ou um
toque/clique no atleta escolhem o destino. O chute à frente deixa a bola visível
durante o voo e permite correr para recuperá-la.

No drop, pressione o comando de drop e indique no campo o ponto exato para onde
quer chutar. A distância e a precisão dependem do atributo `CHU`. No block, os
dois apoios mais próximos se cruzam atrás do portador e criam uma janela curta
para enganar o defensor.

### Teclado e mouse

| Comando | Ação |
| --- | --- |
| `WASD` ou setas | Mover o atleta controlado |
| `Shift` | Correr; aumenta a velocidade e o gasto de energia |
| `Espaço` ou `J` | Passar para o melhor apoio legal |
| `1` a `7` | Escolher diretamente o recebedor do passe |
| Clique em um companheiro | Passar diretamente para ele, se o passe for legal |
| `K` | Chutar à frente |
| `R` | Executar o block |
| `Q` e clique no campo | Mirar e executar o drop |
| `P` ou `Esc` | Pausar ou continuar |

Os botões `Pausar`, `Encerrar partida` e `Tela cheia` também ficam abaixo do
campo.

### Som

O áudio começa ligado. No primeiro toque, clique ou tecla, o jogo desbloqueia o
`AudioContext`, requisito dos navegadores móveis e do Safari. O botão `Som on`
ou `Som off` alterna o apito e a torcida sem emitir som de confirmação.

- o 1º e o 2º tempo começam com um sopro curto de apito real de árbitro; os
  reinícios depois de pontuação não recebem outro apito;
- tries e drop goals são confirmados pelo apito e, cerca de 0,25 segundo depois,
  recebem uma comemoração de torcida com aproximadamente 2,35 segundos;
- não há efeitos sonoros para passes, substituições, tackles, chutes, drops
  errados, rucks, interface, intervalo ou fim da partida;
- o apito ocupa aproximadamente 10 KB e a torcida é sintetizada no navegador.
  Ambos funcionam offline depois que o jogo é instalado ou carregado uma vez.

A amostra `public/audio/referee-whistle.mp3` foi adaptada de
[“Referee whistle blow, gymnasium.wav”, de SpliceSound](https://freesound.org/people/SpliceSound/sounds/218318/),
publicada em [Creative Commons CC0](https://creativecommons.org/publicdomain/zero/1.0/).
O arquivo foi convertido para mono, recortado no primeiro sopro e comprimido
para manter o jogo leve.

### Celular e tablet

- use o joystick virtual para mover;
- segure `Correr` para acelerar;
- use os botões `Passe`, `Chute`, `Block` e `Drop`;
- toque em um companheiro para escolhê-lo como recebedor;
- a câmera acompanha a jogada; a orientação horizontal oferece mais área útil.

### Fadiga e substituições

Todo atleta começa com 100% de energia. Movimentação, sprint, chutes, blocks e
contatos gastam energia. Quanto menor a energia, menor a velocidade real do
atleta. Para substituir, pause a partida e escolha quem deve sair; o primeiro
reserva disponível entra naquele slot. São permitidas até cinco substituições.

Na equipe adversária, a IA pode trocar automaticamente o atleta mais cansado em
um reinício se ele estiver abaixo de 26% de energia. A equipe escolhida permanece
sob controle do usuário, inclusive no modo espectador.

A velocidade 2× multiplica o tempo total simulado e o divide em passos curtos de
no máximo 1/60 s. Relógio, deslocamento e fadiga recebem exatamente o mesmo tempo
de partida; portanto, a aceleração muda a duração real da exibição, mas não reduz
o consumo de energia para uma mesma corrida.

### IA ofensiva e defensiva

A IA não decide cada passe isoladamente: ela mantém uma jogada ativa durante a
posse e movimenta portador e apoios para executá-la.

- **Circulação até a ponta:** a IA mede a pressão defensiva nos dois lados,
  escolhe a borda mais livre, abre os apoios com profundidade para não produzir
  passe para frente e faz até cinco passes consecutivos para o companheiro
  imediatamente mais externo. Quando a bola chega ao ponta, ele acelera se o
  corredor à frente estiver livre.
- **Fixar e passar:** a IA escolhe um defensor à frente e um apoio no lado com
  menos pressão. O portador corre para fixar esse defensor; quando chega a até
  84 unidades, ainda antes da distância de tackle, passa para o apoio lateral.
- **Linha de drift:** em campo aberto, os seis defensores da primeira linha
  preservam espaçamento lateral e avançam quase na mesma profundidade. O mais
  próximo sobe diretamente até o canal do portador para tentar o tackle e a
  disputa da posse; a linha não acompanha o atacante recuando. Isso evita o
  antigo formato em V. O fullback continua profundo enquanto a linha está
  íntegra e fecha o portador depois de uma quebra.
- **Parede nos 22 defensivos:** quando o adversário entra a até 22 m da linha de
  try, os sete defensores se alinham 24 unidades à frente dela, deslizam juntos
  para o canal da bola e não podem recuar para dentro do próprio in-goal.
- **Recepção de reinício:** o time que recebe projeta o ponto de queda do
  drop-kick. Os três atletas mais próximos atacam esse ponto e os demais ficam
  atrás como apoio. Na disputa aérea/bola solta, o recebedor ganha uma pequena
  vantagem de posicionamento, mas o time que chutou ainda pode recuperar.

Esses comportamentos foram adaptados para a escala arcade a partir da análise
do [World Rugby Sevens Series masculino de 2020](https://resources.world.rugby/worldrugby/document/2022/11/29/6b90ee2a-c276-4a92-9a52-b6dc04277bdd/2020-World-Rugby-HSBC-Sevens-Series-Men-s-Analysis-Report.pdf),
que registrou 3,1 passes antes de cada breakdown e destacou Fiji pelo menor uso
de contato e maior frequência de offloads; da análise da [World Rugby sobre
jogadas ensaiadas](https://www.world.rugby/news/786724/game-analysis-the-importance-of-the-set-piece-on-scoring-in-sevens),
que descreve passes e linhas de corrida usados para manipular a defesa; e dos
estudos de análise notacional sobre [ataque](https://doi.org/10.24776/jcoaching.32.2_189)
e [defesa](https://doi.org/10.20776/s09138137-900120805), que apontam a eficácia
de atacar sobreposições e espaços vagos e de priorizar uma linha coesa sem ser
rompida.

## Modos de jogo

### Amistoso

Permite escolher qualquer confronto entre os 24 clubes, controlar o time ou
assistir à simulação. Ao fim, é possível jogar uma revanche ou trocar os clubes.
As vitórias controladas ficam registradas apenas no navegador atual.

### Campeonato

A campanha usa o calendário de grupos publicado para 2026. O usuário joga todos
os compromissos do clube escolhido; as demais partidas da rodada são simuladas.
O progresso é salvo em `localStorage` no próprio navegador.

- 1ª divisão: seis partidas de grupo, em ida e volta. Os dois melhores de cada
  grupo vão ao hexagonal final; os dois primeiros do hexagonal disputam a final.
- 2ª divisão: três partidas de grupo, em turno único. Os dois melhores de cada
  grupo entram na repescagem com os clubes da parte inferior da 1ª divisão.
- Classificação: 4 pontos por vitória, 2 por empate, 1 bônus por quatro tries e
  1 bônus por derrota de até 7 pontos.
- Desempates: pontos de tabela, saldo, tries, pontos marcados e id do clube.

Na tela do confronto aparecem o OVR-base das equipes e a campanha oficial já
observada em 2026. Na partida jogável, a IA usa os atletas convocados e um ajuste
de forma recente. Ainda existe aleatoriedade: um time mais forte é favorito, mas
não tem vitória garantida.

## Elencos e fontes

O arquivo `app/rosters.ts` é gerado por `scripts/update-club-rosters.mjs`. Para
cada clube, o atualizador combina três conjuntos públicos do Sporti:

1. **BID do campeonato:** todos os atletas inscritos para a competição em 2026;
2. **súmulas:** todos os nomes presentes nas escalações e também atletas que
   aparecem apenas nos eventos da partida;
3. **perfil público do clube/atleta:** nome de exibição, apelido e foto, quando
   encontrados.

A lista no jogo não tem limite de atletas. O limite de 12 existe somente para a
convocação de cada partida. Portanto, um atleta disponível no BID deve aparecer
mesmo sem súmula, e qualquer atleta encontrado ao menos uma vez em uma súmula
deve ser preservado mesmo quando não for conciliado com o BID.

Os registros são deduplicados primeiro pelo perfil público e depois pelo nome
normalizado. Ao gerar o arquivo, o script também valida que nenhum participante
encontrado nas súmulas desapareceu da lista final.

### Estatísticas observadas

As seguintes informações vêm diretamente das súmulas processadas:

- jogos e titularidades;
- vitórias e empates nas partidas em que o atleta foi relacionado;
- tries, conversões, penalidades e drop goals;
- pontos decorrentes desses eventos;
- cartões amarelos e vermelhos;
- números de camisa usados, empregados para inferir a posição mais frequente.

Velocidade, tackles realizados, força física e qualidade de passe não são
publicados de forma completa nessas súmulas. Por isso, os atributos correspondentes
são estimativas posicionais ajustadas pelos eventos que realmente existem.

### Atualização e auditoria dos ratings históricos

O modelo aplicado usa `scripts/compare-player-ratings.mjs` para coletar e
conciliar as súmulas adultas de 2024, 2025 e 2026. Para auditar um clube sem
alterar o jogo, use:

```bash
npm run ratings:compare -- --team pe-vermelho --years 2024,2025,2026 --refresh
```

O comando produz Markdown, CSV e JSON em `outputs/`. Para auditar os 24 clubes:

```bash
npm run ratings:compare -- --all --years 2024,2025,2026 --refresh
```

Sem `--apply`, os relatórios não alteram o jogo. Para aplicar os ratings depois
de revisar o comparativo:

```bash
npm run ratings:apply -- --refresh
```

`--offline` usa o cache local. `--refresh` renova as fontes. Associações de nomes
ambíguas são descartadas e listadas para revisão, em vez de transferir
estatísticas para o atleta errado. O atualizador geral de elencos executa essa
etapa histórica automaticamente; `--skip-historical-ratings` existe apenas para
diagnóstico da coleta básica.

## Cálculo dos atributos e do overall

O modelo separa **nível**, **posição** e **forma do clube**. O OVR individual é
calculado primeiro pela divisão e pelas participações oficiais. A posição só
distribui esse nível entre `VEL`, `TAC`, `PAS`, `CHU`, `FIS` e `ATA`; portanto,
uma camisa 15 não recebe OVR maior que uma camisa 1 apenas pela posição.

### 1. Participação oficial ponderada

Cada relação encontrada recebe um peso de participação:

| Evidência oficial | Peso |
| --- | ---: |
| Titular no XV | 1,00 |
| Entrada confirmada por substituição | 0,50 |
| Relacionado em partida de sevens | 0,35 |
| Reserva do XV sem entrada confirmada | 0 |

O peso da partida também diminui com o tempo: 2026 vale 1,00; 2025 vale 0,65;
2024 vale 0,4225. A participação efetiva `P` é a soma desses pesos. Ser apenas
relacionado no banco do XV não prova que o atleta entrou em campo.

### 2. OVR individual

A base é 70 na 1ª divisão e 68 na 2ª. A partir dela:

```text
confiança_numérica = P / (P + 3)
experiência = min(4; log2(1 + P) × 1,25)

evidência_pontos =
  0,65 × tries_ponderados
  + 0,08 × conversões_ponderadas
  + 0,25 × penalidades_ponderadas
  + 0,60 × drops_ponderados

bônus_pontos = confiança_numérica × min(4; evidência_pontos)
evidência_disciplina = 0,50 × amarelos_ponderados + 1,50 × vermelhos_ponderados
penalidade_disciplina = confiança_numérica × min(2,5; evidência_disciplina)

OVR = arredondar e limitar entre 40 e 95:
  base_divisão + experiência + bônus_pontos - penalidade_disciplina
```

Vitórias do clube não entram nessa conta. Assim, um reserva não herda uma nota
alta somente porque seu time venceu, e um atleta sem dados fica na base
provisória em vez de ser tratado como ruim.

### 3. Posição e distribuição dos atributos

A posição principal é inferida pelas camisas 1–15 usadas como titular no XV.
Quando há mais de um papel, as bases posicionais são misturadas. Sem observação
suficiente, o número atual oferece apenas uma indicação de baixa confiança.

| Base posicional | Camisas | VEL | TAC | PAS | CHU | FIS | ATA |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Primeira linha | 1–3 | 54 | 79 | 55 | 42 | 72 | 66 |
| Segunda linha | 4–5 | 58 | 78 | 57 | 42 | 75 | 67 |
| Terceira linha | 6–8 | 69 | 81 | 64 | 45 | 81 | 73 |
| Scrum-half | 9 | 78 | 66 | 86 | 68 | 80 | 75 |
| Abertura | 10 | 76 | 64 | 84 | 85 | 77 | 80 |
| Ponta | 11 ou 14 | 89 | 62 | 70 | 61 | 76 | 87 |
| Centro | 12–13 | 81 | 73 | 77 | 59 | 78 | 81 |
| Fullback | 15 | 85 | 68 | 78 | 79 | 78 | 83 |
| Desconhecida | outra/ausente | 68 | 68 | 68 | 60 | 70 | 68 |

Essas bases são parâmetros de balanceamento do protótipo e não medições dos
atletas reais.

Os seis atributos preservam as diferenças da posição, mas são recentrados no
OVR já calculado. Os pesos usados para recentrar são:

```text
OVR = arredondar(
  0,18 × VEL +
  0,20 × TAC +
  0,18 × PAS +
  0,12 × CHU +
  0,16 × FIS +
  0,16 × ATA
)
```

| Atributo | Peso no OVR |
| --- | ---: |
| Velocidade | 18% |
| Tackle | 20% |
| Passe | 18% |
| Chute | 12% |
| Físico/fôlego | 16% |
| Ataque | 16% |

Primeiro calcula-se a média ponderada da base posicional. Depois, 75% da
diferença de cada atributo para essa média vira um deslocamento em torno do OVR.
Os eventos observáveis fazem apenas ajustes específicos: tries podem acrescentar
até 3 em velocidade e 6 em ataque; chutes oficiais podem acrescentar até 7 em
chute; experiência pode acrescentar até 3 em físico. Passe e tackle não recebem
bônus estatístico porque as súmulas não publicam essas ações de forma completa.

Por fim, todos os deslocamentos são recentrados e cada atributo é arredondado e
limitado a 40–95. Isso mantém o perfil posicional sem recriar o antigo viés de
OVR entre forwards e backs.

### Exemplo real do arquivo atual

Davi Santana, do Pé Vermelho, soma participação efetiva `P = 7,39` nas súmulas
adultas de 2024–2026. Isso produz confiança numérica de 71%, experiência `+3,84`,
bônus de pontuação `+2,58` e nenhuma penalidade disciplinar ponderada:

```text
OVR = arredondar(68 + 3,84 + 2,58 - 0) = 74
```

As camisas históricas indicam principalmente centro, com passagens por ponta e
terceira linha. Depois do recentramento, seus atributos ficam `VEL 79`, `TAC 71`,
`PAS 72`, `CHU 61`, `FIS 78` e `ATA 80`. A posição explica o formato dos
atributos, enquanto a evidência oficial explica o OVR.

### Confiança da nota

| Nível | Amostra |
| --- | --- |
| Base | `P < 1`; nota provisória |
| Média | `1 ≤ P < 5` |
| Alta | `P ≥ 5` |

Confiança não é um bônus na nota. Ela apenas informa quanto do cálculo foi
ajustado por participação oficial. Exemplo: Marcelo de Agostini Junior tem
apenas duas partidas registradas em `stats` de 2026, mas recebe confiança alta
porque o rating também encontrou participação adulta em 2024 e 2025. O painel
de estatísticas continua mostrando apenas 2026; o OVR usa o histórico ponderado.

### Overall do time e forma oficial

- **OVR da convocação:** média aritmética, arredondada, dos atletas atualmente
  selecionados para a partida.
- **OVR exibido para os clubes:** média dos 12 atletas de maior OVR do elenco;
  empates são ordenados por número de jogos e depois por nome.
- **Forma:** ajuste separado, calculado somente com resultados encerrados do
  Super 12 de 2026.
- **Força atual (`FOR`):** `arredondar(OVR + forma)`; é usada no favoritismo das
  simulações e influencia moderadamente a IA e as ações durante a partida.

O bônus de forma do clube é:

```text
taxa_vitória_clube = (vitórias + 0,5 × empates) / jogos
saldo_médio = (pontos_marcados - pontos_sofridos) / jogos
amostra_clube = min(1; jogos / 3)

forma_bruta = limitar entre -5 e +5:
  (taxa_vitória_clube - 0,5) × 8
  + limitar(saldo_médio / 18; entre -2,5 e +2,5)

forma_clube = forma_bruta × amostra_clube
força_atual = arredondar(OVR do elenco + forma_clube)
```

Uma partida libera 1/3 do ajuste; duas liberam 2/3; três ou mais usam o ajuste
completo. Isso impede que um único placar transforme imediatamente um time no
mais forte ou mais fraco da divisão. A tela mostra os três valores, por exemplo
`OVR 72 · FORMA +3,3 · FOR 75`.

#### Exemplo: Pé Vermelho

O Pé Vermelho venceu Leões por 50–48 e Urutu por 49–19. Portanto, tem duas
vitórias, 99 pontos marcados, 67 sofridos e saldo médio de 16:

```text
taxa_vitória = 1,00
forma_bruta = (1 - 0,5) × 8 + 16 / 18 = 4,89
amostra = 2 / 3
forma = 4,89 × 2/3 = +3,3
força_atual = arredondar(OVR 72 + 3,3) = 75
```

O OVR dos jogadores permanece igual. Apenas o favoritismo atual do clube sobe.

#### Exemplo: Leões e Brummers

Leões tem uma vitória e uma derrota, saldo médio de +4 e duas partidas. Seu
ajuste fica em aproximadamente `+0,1`: `OVR 74 · FOR 74`. Já o Brummers venceu
sua única partida por 54–31. A forma bruta atingiria o teto de +5, mas uma única
partida libera apenas 1/3: `forma +1,7`, `OVR 73` e `FOR 75`.

Esses exemplos mostram por que forma e OVR não devem ser fundidos: a forma pode
mudar a cada rodada; as notas individuais só mudam quando os dados oficiais dos
atletas são novamente coletados e aplicados.

## Como os atributos afetam a partida

### Velocidade e energia

O fator do atributo velocidade é `0,68 + VEL × 0,0045`. A velocidade real também
é multiplicada pelo nível atual de energia, `0,58 + energia × 0,0042`, e pela
forma da equipe. Assim, um atleta rápido ainda perde rendimento quando cansado.

O atributo físico reduz o consumo de energia pelo fator `1,20 - FIS × 0,004`.

### Passe

A chance-base de completar o passe usa o passe do portador, o passe do recebedor
e a forma do clube:

```text
chance = 0,55 + PAS_portador×0,0038 + PAS_recebedor×0,0006
       + forma_clube×0,009
chance final limitada entre 76% e 97%
```

Um passe ilegal para a frente nunca é liberado, independentemente da nota.

### Tackle, ataque e ruck

Em cada contato, defensor e portador recebem uma variação aleatória de 0 a 24:

```text
rolagem_tackle = TAC + forma_defensor×1,2 + aleatório(0..24)
rolagem_quebra  = ATA + forma_atacante×1,2 + aleatório(0..24)
```

O portador quebra o tackle se a rolagem de ataque superar a de tackle por mais
de 7 pontos. Um tackle alto também reduz o tempo de recuperação após o contato.
No ruck simplificado, distância, `PAS` do apoio e `TAC` da pressão adversária
decidem se a posse é mantida.

### Chute e drop

`CHU` aumenta a duração e a velocidade horizontal do chute à frente. No drop,
um chute maior permite tentar de mais longe e aumenta a tolerância do clique em
torno do centro dos postes (`38 + CHU × 0,38` unidades do canvas). O atributo de
chute também afeta o voo dos drop-kicks de reinício.

## Regras e simplificações do protótipo

O jogo é inspirado no rugby sevens, mas foi condensado para partidas arcade de
dois minutos. Já estão representados o passe para trás, tries, drops, tackles,
rucks simplificados, reinício pelo time que pontuou, fadiga e fullback defensivo.

Ainda não há scrum, lineout, conversão após try, penalidades jogáveis, vantagem,
laterais completas, cartões durante a partida ou todas as situações de bola
morta. Os elencos vêm das competições brasileiras masculinas de XV de 2026 e são
adaptados a formações de sete atletas no protótipo.

## Arquitetura

- **React 19 + TypeScript:** interface e estado da aplicação;
- **HTML5 Canvas:** campo, atletas, bola, câmera e animação da partida;
- **vinext/Vite:** build da aplicação hospedada e build estático;
- **CSS:** interface responsiva e controles móveis, sem biblioteca visual pesada;
- **Service Worker + Web App Manifest:** instalação como PWA e cache básico;
- **localStorage:** campanha e recorde local, sem conta e sem servidor de dados.

Arquivos principais:

| Arquivo | Responsabilidade |
| --- | --- |
| `app/rugby-game.tsx` | interface, física, IA, regras e modos de jogo |
| `app/rosters.ts` | elencos, fotos, estatísticas e atributos gerados |
| `app/championship.ts` | calendário, resultados oficiais observados e tipos da campanha |
| `app/globals.css` | identidade visual, responsividade e controles |
| `scripts/update-club-rosters.mjs` | coleta e geração dos elencos/atributos |
| `scripts/compare-player-ratings.mjs` | histórico, auditoria e aplicação dos ratings |
| `public/sw.js` | cache da PWA |
| `vite.github-pages.config.ts` | build estático com base correta no GitHub Pages |
| `.github/workflows/deploy-pages.yml` | publicação automática no GitHub Pages |
| `tests/rendered-html.test.mjs` | testes do shell, assets e recursos principais |

## Desenvolvimento no macOS

Requisito: Node.js `>=22.13.0`.

```bash
git clone https://github.com/Matheuscs787/rugby-br-26.git
cd rugby-br-26
npm install
npm run dev
```

Abra o endereço local informado no terminal. Os comandos úteis são:

```bash
npm run dev          # servidor de desenvolvimento
npm run build        # build da versão vinext
npm run build:pages  # gera a versão estática em dist-pages/
npm test             # build + testes automatizados
npm run lint         # ESLint do projeto
npm run ratings:compare -- --all  # audita sem alterar o jogo
npm run ratings:apply -- --refresh # aplica o histórico oficial
```

## Atualização dos elencos

O atualizador acessa páginas públicas do Sporti e requer conexão com a internet:

```bash
node scripts/update-club-rosters.mjs
```

Ele reescreve `app/rosters.ts` e aplica automaticamente a fórmula histórica de
2024–2026. Portanto, revise o diff e execute `npm test` antes de publicar.
Mudanças no HTML das fontes podem exigir ajustes nos parsers. O estado atual do
projeto contém os dados e resultados publicados e coletados até 31/07/2026.

## Publicação gratuita no GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` publica o jogo a cada push para
`main`.

1. Em **Settings → Pages**, escolha **GitHub Actions** como fonte.
2. Faça push para `main` ou execute o workflow manualmente na aba **Actions**.
3. O job roda `npm ci`, `npm run build:pages` e publica `dist-pages/`.

A configuração detecta automaticamente um repositório de projeto
(`usuario.github.io/rugby-br-26/`) ou de usuário (`usuario.github.io/`) e ajusta
os caminhos dos assets. O jogo não precisa de banco de dados ou servidor para
rodar no GitHub Pages.

## PWA, dados locais e privacidade

O service worker usa a rede quando disponível e mantém em cache o shell básico e
assets já visitados. A campanha e o recorde ficam somente no `localStorage` do
navegador; limpar os dados do site apaga esse progresso. O jogo não envia uma
conta de usuário nem o progresso da campanha para um backend.

As fotos dos atletas são carregadas das URLs públicas encontradas no Sporti e
podem deixar de aparecer se a fonte remover ou alterar o arquivo. Logos ficam nos
assets locais. Nomes, marcas, escudos e imagens pertencem aos respectivos clubes,
atletas e titulares; o uso aqui é demonstrativo neste protótipo independente.

## Limitações dos dados

- as súmulas não oferecem métricas completas de sprint, tackle, passe ou minutos;
- uma aparição indica que o atleta constou na súmula, não quantos minutos jogou;
- posição é inferida pelo número mais frequente, não por cadastro posicional;
- resultados e BIDs podem ser corrigidos pelas entidades depois da coleta;
- apelidos e fotos só aparecem quando foi possível conciliá-los com um perfil;
- OVR e atributos servem ao balanceamento do jogo e não devem ser tratados como
  ranking esportivo oficial.

Para alterar o modelo de rating, edite `POSITION_SKILLS` e
`calculateCandidateRating` em `scripts/compare-player-ratings.mjs`, gere o
comparativo, aplique somente após revisá-lo, execute os testes e documente a
mudança neste arquivo.
