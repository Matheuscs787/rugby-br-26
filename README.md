# Rugby BR 26

Protótipo leve de rugby sevens 2D para navegador, com 24 clubes da 1ª e da 2ª
divisões nacionais masculinas de 2026, elencos públicos do Sporti, partidas
controláveis ou simuladas e modo campeonato.

- Jogo publicado: <https://rugby-br-26-arcade.teal-lark-0270.chatgpt.site/>
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
- passe lateral/para trás, passe direcionado, chute à frente, drop e block;
- fadiga, banco de reservas e substituições durante pausas;
- reinícios por drop-kick, com o time que marcou cobrando o reinício;
- fullback dinâmico: no reinício, o time que chuta deixa seu sétimo atleta mais
  profundo para defender; depois da posse se estabilizar, o fullback passa a ser
  o sétimo atleta do time que estiver defendendo;
- campo de jogo de 100 × 70 m, mais in-goals de 10 m, com linhas de try, 5 m,
  22 m, 10 m, meio de campo e marcações de 5 m e 15 m a partir das laterais;
- nomes, apelidos, fotos e estatísticas quando disponíveis nas fontes públicas;
- escalação automática dos 12 maiores overalls, que pode ser alterada pelo usuário;
- PWA instalável, funcionamento offline básico e layout adaptado para celular;
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

### Gerador separado de comparação histórica

O projeto também tem um modelo candidato em
`scripts/compare-player-ratings.mjs`. Ele serve para estudar uma possível revisão
dos ratings sem alterar `app/rosters.ts` nem as notas usadas pelo jogo. O comando:

```bash
npm run ratings:compare -- --team pe-vermelho --years 2024,2025,2026 --refresh
```

consulta o histórico oficial adulto do clube no Sporti, abre as súmulas e produz
três arquivos em `outputs/`: um relatório legível em Markdown, uma planilha CSV
e os dados completos em JSON. Depois da primeira coleta, `--offline` permite
repetir a análise usando somente o cache local; `--refresh` renova esse cache.

O modelo candidato usa critérios mais conservadores para reservas e separa a
posição do nível geral do atleta:

- partida como titular no XV vale 1,00 de participação efetiva;
- entrada confirmada por evento de substituição vale 0,50;
- presença na relação de uma partida de sevens vale 0,35;
- reserva do XV sem entrada confirmada vale 0;
- dados de 2026 têm peso 1,00, os de 2025 peso 0,65 e os de 2024 peso 0,4225;
- experiência cresce de forma logarítmica até +4 no OVR;
- tries, conversões, penalidades e drops dão bônus limitado; cartões dão
  penalidade limitada;
- vitórias do clube não entram no OVR individual;
- a posição define o perfil de `VEL`, `TAC`, `PAS`, `CHU`, `FIS` e `ATA`, mas
  esses atributos são recentrados para que uma camisa não aumente o OVR sozinha.

A base provisória é 70 para a 1ª divisão e 68 para a 2ª. Quanto menor a
participação oficial efetiva, menor a confiança do resultado. Associações de
nomes ambíguas são descartadas e aparecem no relatório para revisão humana.
Assim, uma ausência de dados nunca é tratada como prova de desempenho ruim.

## Cálculo dos atributos e do overall

Cada atributo é um inteiro entre **40 e 95**. O cálculo tem duas etapas:

1. determinar os seis atributos a partir de uma base posicional e das estatísticas;
2. calcular o overall como média ponderada desses seis atributos já arredondados.

O `overall` não substitui os atributos dentro da partida. Ele resume o atleta
para seleção e comparação; o motor usa `VEL`, `TAC`, `PAS`, `CHU`, `FIS` e `ATA`
separadamente.

### 1. Posição usada no cálculo

O sistema escolhe o número de camisa de 1 a 15 mais frequente nas súmulas. Se
não houver uma camisa observada, usa o número disponível no elenco; sem qualquer
número válido, usa a base `Desconhecida`.

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

### 2. Variáveis derivadas das súmulas

Para um atleta, o atualizador calcula:

```text
amostra = min(1, jogos / 3)
taxa_vitória = (vitórias + 0,5 × empates) / jogos
forma = (taxa_vitória - 0,5) × 8 × amostra
experiência = min(7, jogos × 1,25 + titularidades × 0,45)
taxa_try = tries / jogos
taxa_titular = titularidades / jogos
eventos_chute = conversões + 1,4 × penalidades + 2 × drops
taxa_chute = eventos_chute / jogos
disciplina = 1,2 × amarelos + 4 × vermelhos
bônus_divisão = 2 na 1ª divisão; 0 na 2ª
```

Quando não há jogos, as taxas que exigem divisão usam valores neutros: taxa de
vitória 0,5 e as demais taxas 0. O fator `amostra` impede que uma única vitória
tenha o mesmo peso de uma sequência de três ou mais partidas.

### 3. Fórmula dos seis atributos

Cada resultado abaixo é arredondado e limitado ao intervalo 40–95:

```text
VEL = base.VEL + bônus_divisão
    + 0,30 × experiência
    + min(9, 6 × taxa_try)
    + 0,35 × forma

TAC = base.TAC + bônus_divisão
    + 0,55 × experiência
    + 0,65 × forma
    - disciplina

PAS = base.PAS + bônus_divisão
    + 0,40 × experiência
    + 0,45 × forma
    + min(4, 2 × taxa_try)

CHU = base.CHU + bônus_divisão
    + 0,25 × experiência
    + 0,35 × forma
    + min(20, 4,5 × taxa_chute)

FIS = base.FIS + bônus_divisão
    + min(8, 6 × taxa_titular + 0,7 × jogos)
    - vermelhos

ATA = base.ATA + bônus_divisão
    + 0,40 × experiência
    + 0,75 × forma
    + min(16, 7 × taxa_try + 1,4 × tries)
    - 0,35 × disciplina
```

### 4. Fórmula do overall

Depois de arredondar os seis atributos, o jogo calcula:

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

Os pesos somam 100%. Tackle é o atributo individual de maior peso; chute tem o
menor peso porque nem todo papel tático é cobrador.

### Exemplo real do arquivo atual

Vicente Nery Galvão aparece como primeira linha da 1ª divisão, com 3 jogos, 3
titularidades, 3 vitórias e 2 tries. Aplicando as fórmulas, seus atributos ficam
`VEL 63`, `TAC 86`, `PAS 62`, `CHU 47`, `FIS 82` e `ATA 81`.

```text
OVR = arredondar(
  63×0,18 + 86×0,20 + 62×0,18 +
  47×0,12 + 82×0,16 + 81×0,16
)
OVR = arredondar(71,42) = 71
```

### Confiança da nota

| Nível | Amostra |
| --- | --- |
| Base | nenhum jogo encontrado em súmula |
| Média | 1 ou 2 jogos |
| Alta | 3 ou mais jogos |

Confiança não é um bônus na nota. Ela apenas informa quanto do cálculo foi
ajustado por partidas observadas. Um atleta `Base` fica muito mais próximo do
perfil padrão da posição.

### Overall do time e forma oficial

- **OVR da convocação:** média aritmética, arredondada, dos atletas atualmente
  selecionados para a partida.
- **OVR exibido para os clubes:** média dos 12 atletas de maior OVR do elenco;
  empates são ordenados por número de jogos e depois por nome.
- **Força para simulações fora de campo:** OVR dos 12 melhores mais um bônus de
  forma oficial entre -5 e +5.

O bônus de forma do clube é:

```text
taxa_vitória_clube = (vitórias + 0,5 × empates) / jogos
saldo_médio = (pontos_marcados - pontos_sofridos) / jogos

forma_clube = limitar entre -5 e +5:
  (taxa_vitória_clube - 0,5) × 8
  + limitar(saldo_médio / 18, entre -2,5 e +2,5)
```

Esse bônus não altera o OVR mostrado. Ele é aplicado separadamente pelo motor
para representar resultados recentes sem reescrever a nota individual.

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
```

## Atualização dos elencos

O atualizador acessa páginas públicas do Sporti e requer conexão com a internet:

```bash
node scripts/update-club-rosters.mjs
```

Ele reescreve `app/rosters.ts`, portanto revise o diff e execute `npm test` antes
de publicar. Mudanças no HTML das fontes podem exigir ajustes nos parsers. O
estado atual do projeto contém os dados e resultados publicados e coletados até
31/07/2026.

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

Para alterar o modelo de rating, edite `POSITION_SKILLS` e `calculateSkills` em
`scripts/update-club-rosters.mjs`, gere novamente `app/rosters.ts`, execute os
testes e documente a mudança neste arquivo.
