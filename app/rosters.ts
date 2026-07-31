// Gerado das súmulas masculinas de 2026 e dos perfis públicos dos clubes no Sporti.
// Execute `node scripts/update-club-rosters.mjs` para atualizar.
export type RosterPlayer = {
  name: string;
  number?: number;
  photo?: string;
  profile?: string;
};

export type TeamRoster = {
  source: string;
  competition: string;
  sheets: string[];
  players: RosterPlayer[];
};

export const ROSTERS_2026: Record<string, TeamRoster> = {
  "farrapos": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/farrapos-rugby-clube",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106461",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106465",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106469"
    ],
    "players": [
      {
        "name": "VICENTE NERY GALVÃO",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/vicente-nery-galvao-"
      },
      {
        "name": "ENDY WILLIAN DE JESUS PINHEIRO",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/endy-willian-de-jesus-pinheiro",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/endy-willian-de-jesus-pinheiro/1-Thumbnail.jpeg"
      },
      {
        "name": "LAFAIETE PANDOLFO DE PAULA",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/lafaiete-pandolfo-de-paula",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/lafaiete-pandolfo-de-paula/1-Thumbnail.jpeg"
      },
      {
        "name": "BRUNO MARANGONI",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/bruno-marangoni",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/bruno-marangoni/1-Thumbnail.jpeg"
      },
      {
        "name": "MAURICIO AQUINO CANTERLE",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/mauricio-aquino-canterle",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/mauricio-aquino-canterle/1-Thumbnail.jpeg"
      },
      {
        "name": "LEONARDO PANDOLFO DE PAULA",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/leonardo-pandolfo-de-paula",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/leonardo-pandolfo-de-paula/1-Thumbnail.jpeg"
      },
      {
        "name": "CRISTIANO ANDRÉ PRIMEL",
        "number": 7
      },
      {
        "name": "RODOLFO GONÇALVES DE SOUZA MARTHINS",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rodolfo-goncalves-de-souza-marthins",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rodolfo-goncalves-de-souza-marthins/1-Thumbnail.jpeg"
      },
      {
        "name": "MATHEUS ALEXANDRE MENEZES DE ALMEIDA",
        "number": 9,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/matheus-alexandre-menezes-de-almeida"
      },
      {
        "name": "FACUNDO RODRIGO FLORES",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/facundo-rodrigo-flores",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/facundo-rodrigo-flores/1-Thumbnail.jpeg"
      },
      {
        "name": "BERNARDO LAZZAROTTI BONESSO",
        "number": 11
      },
      {
        "name": "WAGNER FAREZIN DA COSTA",
        "number": 12
      },
      {
        "name": "DIOGO FAREZIN DE ALMEIDA",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/diogo-farezin-de-almeida",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/diogo-farezin-de-almeida/1-Thumbnail.jpeg"
      },
      {
        "name": "EDUARDO MANOSSO ZANROSSO",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/eduardo-manosso-zanrosso",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/eduardo-manosso-zanrosso/1-Thumbnail.jpeg"
      },
      {
        "name": "MURILLO LAZZAROTTI BONESSO",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/murillo-lazzarotti-bonesso",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/murillo-lazzarotti-bonesso/1-Thumbnail.jpeg"
      },
      {
        "name": "EDUARDO CARVALHO REDANTE",
        "number": 16
      },
      {
        "name": "DAIAN CRISTIAN ZONATTO RAMA",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/daian-cristian-zonatto-rama",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/daian-cristian-zonatto-rama/1-Thumbnail.jpeg"
      },
      {
        "name": "FABIO VARGAS MACHADO",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/fabio-vargas-machado",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/fabio-vargas-machado/1-Thumbnail.jpeg"
      },
      {
        "name": "MATEUS FRANCISCO GALLON RIZZI",
        "number": 18,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/mateus-francisco-gallon-rizzi",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/mateus-francisco-gallon-rizzi/1-Thumbnail.jpeg"
      },
      {
        "name": "CLEDER RODRIGO MORAIS JUNIOR",
        "number": 19,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/cleder-rodrigo-morais-junior",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/cleder-rodrigo-morais-junior/1-Thumbnail.jpeg"
      },
      {
        "name": "GUILHERME BORBA DE BRITO",
        "number": 19,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/guilherme-borba-de-brito",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/guilherme-borba-de-brito/1-Thumbnail.jpeg"
      },
      {
        "name": "BOLÍVAR ZIMERMANN MACHADO",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/bolivar-zimermann-machado",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/bolivar-zimermann-machado/1-Thumbnail.jpeg"
      },
      {
        "name": "PEDRO HENRIQUE RANGEL MAGALHÃES",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/pedro-henrique-rangel-magalhaes-1"
      },
      {
        "name": "MARCOS FERNANDO CIVARDI",
        "number": 22,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/marcos-fernando-civardi",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/marcos-fernando-civardi/1-Thumbnail.jpeg"
      },
      {
        "name": "CLAUDINEI JOSÉ WRONSKI",
        "number": 23,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/claudinei-jose-wronski",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/claudinei-jose-wronski/1-Thumbnail.jpeg"
      },
      {
        "name": "MARCOS",
        "number": 23
      },
      {
        "name": "ALISSON AMARAL DOS SANTOS",
        "number": 25,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/alisson-amaral-dos-santos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/alisson-amaral-dos-santos/1-Thumbnail.jpeg"
      },
      {
        "name": "OTAVIO AUGUSTO FINATTO TAIARIOL",
        "number": 26,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/otavio-augusto-finatto-taiariol",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/otavio-augusto-finatto-taiariol/1-Thumbnail.jpeg"
      },
      {
        "name": "WILLIAM MARCELO MACHADO CRIPPA",
        "number": 27
      },
      {
        "name": "BRUNO DA SILVA MARQUES",
        "number": 28,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/bruno-da-silva-marques-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/bruno-da-silva-marques-/1-Thumbnail.jpeg"
      },
      {
        "name": "MAIKON KLAUS DE OLIVEIRA",
        "number": 30,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/maikon-klaus-de-oliveira"
      },
      {
        "name": "JOSÉ CARLOS FAGUNDES JUNIOR",
        "number": 31,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/jose-carlos-fagundes-junior",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/jose-carlos-fagundes-junior/1-Thumbnail.jpeg"
      }
    ]
  },
  "charrua": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/charrua-rugby-clube",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106463",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106465",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106471"
    ],
    "players": [
      {
        "name": "JULIO ORTOLAN COLE",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/julio-ortolan-cole",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/julio-ortolan-cole/1-Thumbnail.jpeg"
      },
      {
        "name": "GABRIEL MIRANDA",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gabriel-miranda",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gabriel-miranda/1-Thumbnail.jpeg"
      },
      {
        "name": "GABRIEL KRÜTZMANN SANTOS",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gabriel-krutzmann-santos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gabriel-krutzmann-santos/1-Thumbnail.jpeg"
      },
      {
        "name": "DIEGO GIOVANNI PIETROBON TEIXEIRA",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/diego-giovanni-pietrobon-teixeira-"
      },
      {
        "name": "IGOR LUIS SILVA GOMES",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/igor-luis-silva-gomes"
      },
      {
        "name": "THIAGO BOFFA BARROSO BRAGA",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/thiago-boffa-barroso-braga",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/thiago-boffa-barroso-braga/1-Thumbnail.jpeg"
      },
      {
        "name": "YOHAN ALVES SOUZA DOS SANTOS",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/yohan-alves-souza-dos-santos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/yohan-alves-souza-dos-santos/1-Thumbnail.jpeg"
      },
      {
        "name": "GUSTAVO LANFERDINI BORDIGNON",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gustavo-lanferdini-bordignon"
      },
      {
        "name": "YLAN MACHADO SILVEIRA",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/ylan-machado-silveira"
      },
      {
        "name": "FELIPE QUEVEDO ARAUJO",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/felipe-quevedo-araujo"
      },
      {
        "name": "MATEO VIANA ACHE",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/mateo-viana-ache",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/mateo-viana-ache/1-Thumbnail.jpeg"
      },
      {
        "name": "HENRIQUE BITENCOURT DE MELLO",
        "number": 9,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/henrique-bitencourt-de-mello",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/henrique-bitencourt-de-mello/1-Thumbnail.jpeg"
      },
      {
        "name": "LEONARDO ROSA UNIVERSINDO",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/leonardo-rosa-universindo",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/leonardo-rosa-universindo/1-Thumbnail.jpeg"
      },
      {
        "name": "CÉSAR AUGUSTO FAVOTO ALVES PEREIRA",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/cesar-augusto-favoto-alves-pereira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/cesar-augusto-favoto-alves-pereira/1-Thumbnail.jpeg"
      },
      {
        "name": "LUIZ FELIPE SIMON RIBAS",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/luiz-felipe-simon-ribas",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/luiz-felipe-simon-ribas/1-Thumbnail.jpeg"
      },
      {
        "name": "GABRIEL BOLZAN MOTTA",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gabriel-bolzan-motta",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gabriel-bolzan-motta/1-Thumbnail.jpeg"
      },
      {
        "name": "RAFAEL SILVA VARGAS",
        "number": 13,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rafael-silva-vargas",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rafael-silva-vargas/1-Thumbnail.jpeg"
      },
      {
        "name": "WESLEY DE SOUZA ROPKE",
        "number": 13,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/wesley-de-souza-ropke"
      },
      {
        "name": "EROS DE OLIVEIRA",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/eros-de-oliveira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/eros-de-oliveira/1-Thumbnail.jpeg"
      },
      {
        "name": "SAULO DALLA CORT FILIPPI",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/saulo-dalla-cort-filippi",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/saulo-dalla-cort-filippi/1-Thumbnail.jpeg"
      },
      {
        "name": "MATHEUS",
        "number": 15
      },
      {
        "name": "THOMAS ROSA FERNANDES DOS SANTOS",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/thomas-rosa-fernandes-dos-santos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/thomas-rosa-fernandes-dos-santos/1-Thumbnail.jpeg"
      },
      {
        "name": "RAFAEL CRISTANE MICHEL",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rafael-cristane-michel",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rafael-cristane-michel/1-Thumbnail.jpeg"
      },
      {
        "name": "RAFAEL DE MELO LEAL",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rafael-de-melo-leal",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rafael-de-melo-leal/1-Thumbnail.jpeg"
      },
      {
        "name": "ALEXSANDRO BARBOSA",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/alexsandro-barbosa",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/alexsandro-barbosa/1-Thumbnail.jpeg"
      },
      {
        "name": "TIAGO GONÇALVES DOS SANTOS JUNIOR",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/tiago-goncalves-dos-santos-junior"
      },
      {
        "name": "GUILHERME SCHLABITZ PITSCH",
        "number": 18,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/guilherme-schlabitz-pitsch",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/guilherme-schlabitz-pitsch/1-Thumbnail.jpeg"
      },
      {
        "name": "ALEX ACHERNAR DA ROSA WENDT",
        "number": 19,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/alex-achernar-da-rosa-wendt",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/alex-achernar-da-rosa-wendt/1-Thumbnail.jpeg"
      },
      {
        "name": "JESUS DUQUIA",
        "number": 19,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/jesus-duquia",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/jesus-duquia/1-Thumbnail.jpeg"
      },
      {
        "name": "JARDEL",
        "number": 20,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/jardel-vandre-diesel-martins",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/jardel-vandre-diesel-martins/1-Thumbnail.jpeg"
      },
      {
        "name": "DERICK PRADIE GARCEZ",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/derick-pradie-garcez",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/derick-pradie-garcez/1-Thumbnail.jpeg"
      },
      {
        "name": "HENRIQUE DE PAULA LOPES",
        "number": 22,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/henrique-de-paula-lopes",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/henrique-de-paula-lopes/1-Thumbnail.jpeg"
      },
      {
        "name": "MAIQUEL ANDRÉ NEUMANN",
        "number": 22,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/maiquel-andre-neumann",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/maiquel-andre-neumann/1-Thumbnail.jpeg"
      },
      {
        "name": "LEONARDO CORREA FREITAS",
        "number": 23,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/leonardo-correa-freitas",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/leonardo-correa-freitas/1-Thumbnail.jpeg"
      },
      {
        "name": "UARY PACHECO RIBEIRO GONDIM",
        "number": 23,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/uary-pacheco-ribeiro-gondim",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/uary-pacheco-ribeiro-gondim/1-Thumbnail.jpeg"
      }
    ]
  },
  "desterro": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/desterro-rugby-clube",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106461",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106467",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106471"
    ],
    "players": [
      {
        "name": "DANIEL XAVIER DANIELEWICZ",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/daniel-xavier-danielewicz",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/daniel-xavier-danielewicz/1-Thumbnail.jpeg"
      },
      {
        "name": "JONAS AFONSO HAUSCHILD",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/jonas-afonso-hauschild",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/jonas-afonso-hauschild/1-Thumbnail.jpeg"
      },
      {
        "name": "MARIANO ARIEL NAIMOQUIN",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/mariano-ariel-naimoquin",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/mariano-ariel-naimoquin/1-Thumbnail.jpeg"
      },
      {
        "name": "GUSTAVO HAUSMANN",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gustavo-hausmann",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gustavo-hausmann/1-Thumbnail.jpeg"
      },
      {
        "name": "THIAGO LAURENTINO RIAL",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/thiago-laurentino-rial",
        "photo": "https://painel.sporti.com.br/Images/No_img_200x200.png"
      },
      {
        "name": "FACUNDO",
        "number": 3
      },
      {
        "name": "ROGER DE LIMA PIZUTTI",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/roger-de-lima-pizutti"
      },
      {
        "name": "MATTHEW ALEXANDER COX",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/matthew-alexander-cox",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/matthew-alexander-cox/1-Thumbnail.jpeg"
      },
      {
        "name": "HENRIQUE LESSA DOMINGUES PINHO DE OLIVEIRA",
        "number": 5
      },
      {
        "name": "TOBIAS ALFREDO SALGADO",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/tobias-alfredo-salgado",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/tobias-alfredo-salgado/1-Thumbnail.jpeg"
      },
      {
        "name": "VINICIUS NASCIMENTO DE MOURA",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/vinicius-nascimento-de-moura",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/vinicius-nascimento-de-moura/1-Thumbnail.jpeg"
      },
      {
        "name": "DANIEL GONÇALVES FERNANDES DA ROSA",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/daniel-goncalves-fernandes-da-rosa",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/daniel-goncalves-fernandes-da-rosa/1-Thumbnail.jpeg"
      },
      {
        "name": "EDUARDO RODRIGUES DA SILVA",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/eduardo-rodrigues-da-silva-1"
      },
      {
        "name": "IGOR RINQUE DE MOURA",
        "number": 6
      },
      {
        "name": "KAIQUE MUTTER HALEPLIAN",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/kaique-mutter-haleplian"
      },
      {
        "name": "MATHEUS ANTONIO ALLI DOS SANTOS",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/matheus-antonio-alli-dos-santos"
      },
      {
        "name": "RUDA BIEDERMANN",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/ruda-biedermann",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/ruda-biedermann/1-Thumbnail.jpeg"
      },
      {
        "name": "FRANCISCO CARVALHO DA ROS",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/francisco-carvalho-da-ros",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/francisco-carvalho-da-ros/1-Thumbnail.jpeg"
      },
      {
        "name": "GUILHERME SCHEEREN",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/guilherme-scheeren",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/guilherme-scheeren/1-Thumbnail.jpeg"
      },
      {
        "name": "FELIPE ARTIGIANI GARCIA",
        "number": 9,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/felipe-artigiani-garcia",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/felipe-artigiani-garcia/1-Thumbnail.jpeg"
      },
      {
        "name": "GUILHERME ZORZAN LEONHARDT",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/guilherme-zorzan-leonhardt",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/guilherme-zorzan-leonhardt/1-Thumbnail.jpeg"
      },
      {
        "name": "FELIPE DELL AGNOLO FRANÇA",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/felipe-dell-agnolo-franca"
      },
      {
        "name": "IBERÊ BULBARELLI TRIVELLA",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/ibere-bulbarelli-trivella-",
        "photo": "https://painel.sporti.com.br/Images/No_img_200x200.png"
      },
      {
        "name": "NÍCOLAS VALER HORN",
        "number": 13,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/nicolas-valer-horn",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/nicolas-valer-horn/1-Thumbnail.jpeg"
      },
      {
        "name": "CAIO VAVOLIZZA FRANÇA",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/caio-vavolizza-franca",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/caio-vavolizza-franca/1-Thumbnail.jpeg"
      },
      {
        "name": "GUILHERME STRATE FOGAÇA",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/guilherme-strate-fogaca",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/guilherme-strate-fogaca/1-Thumbnail.jpeg"
      },
      {
        "name": "JOÃO VITOR RODRIGUES DALSECCO",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-vitor-rodrigues-dalsecco",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-vitor-rodrigues-dalsecco/1-Thumbnail.jpeg"
      },
      {
        "name": "LORENZO ROY DE GIACOMO",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/lorenzo-roy-de-giacomo",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/lorenzo-roy-de-giacomo/1-Thumbnail.jpeg"
      },
      {
        "name": "GUILHERME CARDOSO VIEIRA",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/guilherme-cardoso-vieira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/guilherme-cardoso-vieira/1-Thumbnail.jpeg"
      },
      {
        "name": "JOÃO LUIZ DA ROS",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-luiz-da-ros",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-luiz-da-ros/1-Thumbnail.jpeg"
      },
      {
        "name": "RAPHAEL DANIEL CORREIA",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/raphael-daniel-correia",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/raphael-daniel-correia/1-Thumbnail.jpeg"
      },
      {
        "name": "GUSTAVO DOLSAN CORREIA",
        "number": 18,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gustavo-dolsan-correia",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gustavo-dolsan-correia/1-Thumbnail.jpeg"
      },
      {
        "name": "ALEXANDRE RODRIGUES RIBAS",
        "number": 19,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/alexandre-rodrigues-ribas",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/alexandre-rodrigues-ribas/1-Thumbnail.jpeg"
      },
      {
        "name": "TUAN LARSEN COMIN",
        "number": 20,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/tuan-larsen-comin",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/tuan-larsen-comin/1-Thumbnail.jpeg"
      },
      {
        "name": "MATHEUS FLEURY BUENO",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/matheus-fleury-bueno",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/matheus-fleury-bueno/1-Thumbnail.jpeg"
      },
      {
        "name": "WILLIAM MATEUS ROHRIG NIEDERMEYER",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/william-mateus-rohrig-niedermeyer",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/william-mateus-rohrig-niedermeyer/1-Thumbnail.jpeg"
      },
      {
        "name": "VINICIUS FIDELES DE OLIVEIRA",
        "number": 25
      }
    ]
  },
  "joaca": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/joaca-rugby-clube",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106463",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106467",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106469"
    ],
    "players": [
      {
        "name": "RODINEI DA SILVA PEREIRA",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rodinei-da-silva-pereira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rodinei-da-silva-pereira/1-Thumbnail.jpeg"
      },
      {
        "name": "IGOR PITTIGLIANI JORGE",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/igor-pittigliani-jorge",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/igor-pittigliani-jorge/1-Thumbnail.jpeg"
      },
      {
        "name": "BOUTROS ABBOUD",
        "number": 3
      },
      {
        "name": "VINÍCIUS FERREIRA CHAVES DE SOUZA",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/vinicius-ferreira-chaves-de-souza",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/vinicius-ferreira-chaves-de-souza/1-Thumbnail.jpeg"
      },
      {
        "name": "FERNANDO HORÁCIO SALVATIERRA",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/fernando-horacio-salvatierra",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/fernando-horacio-salvatierra/1-Thumbnail.jpeg"
      },
      {
        "name": "LEONARDO PENNA",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/leonardo-penna",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/leonardo-penna/1-Thumbnail.jpeg"
      },
      {
        "name": "LEONARDO NASCIMENTO DE SOUZA",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/leonardo-nascimento-de-souza-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/leonardo-nascimento-de-souza-/1-Thumbnail.jpeg"
      },
      {
        "name": "ISMAEL FERNANDO BONATTO RAIZEL DA SILVA",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/ismael-fernando-bonatto-raizel-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/ismael-fernando-bonatto-raizel-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "GABRIEL ANTÔNIO BONATTO RAIZEL DA SILVA",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gabriel-antonio-bonatto-raizel-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gabriel-antonio-bonatto-raizel-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "GABRIEL GATTINO RÉUS",
        "number": 9,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gabriel-gattino-reus",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gabriel-gattino-reus/1-Thumbnail.jpeg"
      },
      {
        "name": "MATHEUS SAMPAIO PRESTES",
        "number": 9,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/matheus-sampaio-prestes-"
      },
      {
        "name": "CAMILO CORDEIRO FLORES",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/camilo-cordeiro-flores",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/camilo-cordeiro-flores/1-Thumbnail.jpeg"
      },
      {
        "name": "MATHEUS CORRÊA MORAIS",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/matheus-correa-morais",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/matheus-correa-morais/1-Thumbnail.jpeg"
      },
      {
        "name": "GUSTAVO FREDERICO MARDER",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gustavo-frederico-marder",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gustavo-frederico-marder/1-Thumbnail.jpeg"
      },
      {
        "name": "JOAQUIM FERNANDEZ DO LIVRAMENTO MACHADO",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/ra-sports/atleta/joaquim-fernandez-do-livramento-machado",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joaquim-fernandez-do-livramento-machado/1-Thumbnail.jpeg"
      },
      {
        "name": "AUGUSTO BOGORNI BORTOLÁS",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/augusto-bogorni-bortolas",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/augusto-bogorni-bortolas/1-Thumbnail.jpeg"
      },
      {
        "name": "RENATO ALVES MÖLLERKE",
        "number": 13,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/renato-alves-mollerke",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/renato-alves-mollerke/1-Thumbnail.jpeg"
      },
      {
        "name": "AIRTON SPILLERE DALMAGRO JUNIOR",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/airton-spillere-dalmagro-junior",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/airton-spillere-dalmagro-junior/1-Thumbnail.jpeg"
      },
      {
        "name": "NÍCOLA DUARTE MARTINS",
        "number": 14
      },
      {
        "name": "RAFAEL HENRIQUE DIAS",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rafael-henrique-dias",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rafael-henrique-dias/1-Thumbnail.jpeg"
      },
      {
        "name": "IAGO MARTINS DA CUNHA",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/iago-martins-da-cunha",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/iago-martins-da-cunha/1-Thumbnail.jpeg"
      },
      {
        "name": "ANTONIO ROMAN VANZ",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/antonio-roman-vanz",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/antonio-roman-vanz/1-Thumbnail.jpeg"
      },
      {
        "name": "FRANCO",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/franco-gaston-laferrara",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/franco-gaston-laferrara/1-Thumbnail.jpeg"
      },
      {
        "name": "THOMI DIMAS BRESSAN",
        "number": 18,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/thomi-dimas-bressan",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/thomi-dimas-bressan/1-Thumbnail.jpeg"
      },
      {
        "name": "LUCIANO GARCIA BUENO",
        "number": 19,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/luciano-garcia-bueno",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/luciano-garcia-bueno/1-Thumbnail.jpeg"
      },
      {
        "name": "NICOLAU CLARINDO PAULO NETO",
        "number": 19,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/nicolau-clarindo-paulo-neto",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/nicolau-clarindo-paulo-neto/1-Thumbnail.jpeg"
      },
      {
        "name": "VALMIR DONATO DE OLIVEIRA NETO",
        "number": 20,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/valmir-donato-de-oliveira-neto",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/valmir-donato-de-oliveira-neto/1-Thumbnail.jpeg"
      },
      {
        "name": "GABRIEL",
        "number": 22
      },
      {
        "name": "RODRIGO VELICEV MENDONÇA",
        "number": 23
      }
    ]
  },
  "poli": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/associacao-esportiva-politecnica-de-rugby",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106473",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106477",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106481"
    ],
    "players": [
      {
        "name": "VITOR HIDEO MINAME",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/vitor-hideo-miname",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/vitor-hideo-miname/1-Thumbnail.jpeg"
      },
      {
        "name": "GABRIEL ALVES BAPTISTA",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gabriel-alves-baptista-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gabriel-alves-baptista-/1-Thumbnail.jpeg"
      },
      {
        "name": "BRUNO GIL MELO DA SILVA",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/bruno-gil-melo-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/bruno-gil-melo-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "EDGARD BORGES MALTA",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/edgard-borges-malta",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/edgard-borges-malta/1-Thumbnail.jpeg"
      },
      {
        "name": "ROGÉRIO PAVÃO FRANCO",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rogerio-pavao-franco",
        "photo": "https://painel.sporti.com.br/Images/No_img_200x200.png"
      },
      {
        "name": "GABRIEL TORRES PAGANINI",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gabriel-torres-paganini",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gabriel-torres-paganini/1-Thumbnail.jpeg"
      },
      {
        "name": "SEBASTIÃO DE MIRA FERREIRA GONÇALVES DA SILVA",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/sebastiao-de-mira-ferreira-goncalves-da-silva"
      },
      {
        "name": "GUSTAVO BERNARDES COPPA XEREGUIN",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gustavo-bernardes-coppa-xereguin",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gustavo-bernardes-coppa-xereguin/1-Thumbnail.jpeg"
      },
      {
        "name": "PEDRO HENRIQUE SOARES APARECIDO",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/pedro-henrique-soares-aparecido-1"
      },
      {
        "name": "JOÃO PEDRO GIORGI FERREIRA CABRAL",
        "number": 9,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-pedro-giorgi-ferreira-cabral",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-pedro-giorgi-ferreira-cabral/1-Thumbnail.jpeg"
      },
      {
        "name": "ISAC LOPES",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/isac-lopes",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/isac-lopes/1-Thumbnail.jpeg"
      },
      {
        "name": "LUIZ GUSTAVO SERVOS WILLETS",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/luiz-gustavo-servos-willets",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/luiz-gustavo-servos-willets/1-Thumbnail.jpeg"
      },
      {
        "name": "THIAGO HENRIQUE EVARISTO",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/thiago-henrique-evaristo-1",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/thiago-henrique-evaristo-1/1-Thumbnail.jpeg"
      },
      {
        "name": "IVAN MANCINI DA SILVA",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/ivan-mancini-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/ivan-mancini-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "EMERSON BERTAGNOLI MUNIZ PONTES",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/emerson-bertagnoli-muniz-pontes",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/emerson-bertagnoli-muniz-pontes/1-Thumbnail.jpeg"
      },
      {
        "name": "JOAO PAULO DOS SANTOS NETO",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-paulo-dos-santos-neto",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-paulo-dos-santos-neto/1-Thumbnail.jpeg"
      },
      {
        "name": "ROBERT AGUINALDO TENORIO DA SILVA SANTOS",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/robert-aguinaldo-tenorio-da-silva-santos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/robert-aguinaldo-tenorio-da-silva-santos/1-Thumbnail.jpeg"
      },
      {
        "name": "LUIZ FERNANDO FELIZARDO TALERIGA",
        "number": 13,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/luiz-fernando-felizardo-taleriga",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/luiz-fernando-felizardo-taleriga/1-Thumbnail.jpeg"
      },
      {
        "name": "NASSOR LUKATA FAUSTINO CRUZ",
        "number": 13,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/nassor-lukata-faustino-cruz-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/nassor-lukata-faustino-cruz-/1-Thumbnail.jpeg"
      },
      {
        "name": "CARLOS TORRES BARRIA",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/carlos-torres-barria",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/carlos-torres-barria/1-Thumbnail.jpeg"
      },
      {
        "name": "ELIAS CARVALHO DOS SANTOS",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/elias-carvalho-dos-santos-1"
      },
      {
        "name": "GUDEMBERG CERQUEIRA SILVA",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gudemberg-cerqueira-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gudemberg-cerqueira-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "JOÃO RENATO ALBANESE FILHO",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-renato-albanese-filho"
      },
      {
        "name": "JOHN GABRIEL GAL RILEY",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/john-gabriel-gal-riley",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/john-gabriel-gal-riley/1-Thumbnail.jpeg"
      },
      {
        "name": "GABRIEL TORRES PEREIRA SARAIVA",
        "number": 18,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gabriel-torres-pereira-saraiva",
        "photo": "https://painel.sporti.com.br/Images/No_img_200x200.png"
      },
      {
        "name": "HERON GONÇALVES LEITE DE GODOI",
        "number": 19,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/heron-goncalves-leite-de-godoi",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/heron-goncalves-leite-de-godoi/1-Thumbnail.jpeg"
      },
      {
        "name": "ARTHUR TARDIN GARCIA CIONGOLI",
        "number": 20,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/arthur-tardin-garcia-ciongoli",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/arthur-tardin-garcia-ciongoli/1-Thumbnail.jpeg"
      },
      {
        "name": "PATRICK OTEMOTI DE OLIVEIRA",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/patrick-otemoti-de-oliveira-1"
      },
      {
        "name": "GUSTAVO HENRIQUE POMPEO MARCELINO",
        "number": 22,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gustavo-henrique-pompeo-marcelino",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gustavo-henrique-pompeo-marcelino/1-Thumbnail.jpeg"
      },
      {
        "name": "HELDER BRYAN SOUZA LUCIO",
        "number": 25,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/helder-bryan-souza-lucio",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/helder-bryan-souza-lucio/1-Thumbnail.jpeg"
      },
      {
        "name": "LUCAS ABUD DE ANDRADE",
        "number": 28,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/lucas-abud-de-andrade",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/lucas-abud-de-andrade/1-Thumbnail.jpeg"
      }
    ]
  },
  "sao-jose": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/associacao-esportiva-rugby-clube-(sao-jose-rugby)",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106475",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106477",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106483"
    ],
    "players": [
      {
        "name": "BRAIAN VITO",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/braian-vito",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/braian-vito/1-Thumbnail.jpeg"
      },
      {
        "name": "NELSON OLIVEIRA SANTOS",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/nelson-oliveira-santos-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/nelson-oliveira-santos-/1-Thumbnail.jpeg"
      },
      {
        "name": "BENEDITO RODRIGUES FILHO",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/benedito-rodrigues-filho",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/benedito-rodrigues-filho/1-Thumbnail.jpeg"
      },
      {
        "name": "DAVI ANDRADE DA CRUZ MONTEJANO",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/davi-andrade-da-cruz-montejano-1",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/davi-andrade-da-cruz-montejano-1/1-Thumbnail.jpeg"
      },
      {
        "name": "LEONARDO DE SOUZA DA SILVA",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/leonardo-de-souza-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/leonardo-de-souza-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "JOSÉ FRANCISCO FONSECA LEÃO",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/jose-francisco-fonseca-leao",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/jose-francisco-fonseca-leao/1-Thumbnail.jpeg"
      },
      {
        "name": "CARLOS HENRIQUE DE OLIVEIRA",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/carlos-henrique-de-oliveira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/carlos-henrique-de-oliveira/1-Thumbnail.jpeg"
      },
      {
        "name": "LUIZ OCTÁVIO PALMA NUNES",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/luiz-octavio-palma-nunes",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/luiz-octavio-palma-nunes/1-Thumbnail.jpeg"
      },
      {
        "name": "JOÃO VICTOR PEREIRA DA SILVA",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-victor-pereira-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-victor-pereira-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "RAFAEL HENRIQUE DOS SANTOS TEIXEIRA",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rafael-henrique-dos-santos-teixeira-1",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rafael-henrique-dos-santos-teixeira-1/1-Thumbnail.jpeg"
      },
      {
        "name": "MICHAEL OLIVEIRA LOPES DE MORAES",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/michael-oliveira-lopes-de-moraes",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/michael-oliveira-lopes-de-moraes/1-Thumbnail.jpeg"
      },
      {
        "name": "RAFAEL MOURA CORDOBA BOTTURA",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rafael-moura-cordoba-bottura",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rafael-moura-cordoba-bottura/1-Thumbnail.jpeg"
      },
      {
        "name": "DANIEL CORDEIRO PANTALENA",
        "number": 9,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/daniel-cordeiro-pantalena",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/daniel-cordeiro-pantalena/1-Thumbnail.jpeg"
      },
      {
        "name": "JOÃO GABRIEL FONSECA RIBEIRO",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-gabriel-fonseca-ribeiro-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-gabriel-fonseca-ribeiro-/1-Thumbnail.jpeg"
      },
      {
        "name": "RODRIGO DE OLIVEIRA SANTOS",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rodrigo-de-oliveira-santos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rodrigo-de-oliveira-santos/1-Thumbnail.jpeg"
      },
      {
        "name": "ALISSON DE SOUZA REIS FERREIRA CASTRO",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/alisson-de-souza-reis-ferreira-castro",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/alisson-de-souza-reis-ferreira-castro/1-Thumbnail.jpeg"
      },
      {
        "name": "RIVALDO",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/jefferson-felisberto-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/jefferson-felisberto-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "THIAGO HENRIQUE PEREIRA CAMPOS",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/thiago-henrique-pereira-campos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/thiago-henrique-pereira-campos/1-Thumbnail.jpeg"
      },
      {
        "name": "PATRICIO GAMARRA",
        "number": 13,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/patricio-gamarra",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/patricio-gamarra/1-Thumbnail.jpeg"
      },
      {
        "name": "GUILHERME HENRIQUE LANDIM MENDES",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/guilherme-henrique-landim-mendes",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/guilherme-henrique-landim-mendes/1-Thumbnail.jpeg"
      },
      {
        "name": "GUSTAVO BARREIROS DE ALBUQUERQUE",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gustavo-barreiros-de-albuquerque",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gustavo-barreiros-de-albuquerque/1-Thumbnail.jpeg"
      },
      {
        "name": "MATHEUS HENRIQUE DA SILVA MOREIRA",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/matheus-henrique-da-silva-moreira"
      },
      {
        "name": "ADRIANO RAMOS",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/adriano-ramos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/adriano-ramos/1-Thumbnail.jpeg"
      },
      {
        "name": "GABRIEL BUENO LOMBELLO",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gabriel-bueno-lombello",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gabriel-bueno-lombello/1-Thumbnail.jpeg"
      },
      {
        "name": "PEDRO MIGUEL PEREIRA CAMPOS",
        "number": 17
      },
      {
        "name": "DANIEL PINHEIRO ORLANDI",
        "number": 18,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/daniel-pinheiro-orlandi",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/daniel-pinheiro-orlandi/1-Thumbnail.jpeg"
      },
      {
        "name": "RAFAEL",
        "number": 18,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rafael-andrade-da-rocha",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rafael-andrade-da-rocha/1-Thumbnail.jpeg"
      },
      {
        "name": "JONAS DARC LIMA DE FIGUEREDO",
        "number": 19,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/jonas-darc-lima-de-figueredo",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/jonas-darc-lima-de-figueredo/1-Thumbnail.jpeg"
      },
      {
        "name": "JOÃO VICTOR DE OLIVEIRA MELO DA CONCEIÇÃO",
        "number": 20,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-victor-de-oliveira-melo-da-conceicao-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-victor-de-oliveira-melo-da-conceicao-/1-Thumbnail.jpeg"
      },
      {
        "name": "NICHOLAS JAMES ROBERT VAN PELT",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/nicholas-james-robert-van-pelt",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/nicholas-james-robert-van-pelt/1-Thumbnail.jpeg"
      },
      {
        "name": "TÚLIO EBRAM FIORE",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/tulio-ebram-fiore",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/tulio-ebram-fiore/1-Thumbnail.jpeg"
      },
      {
        "name": "PABLO FERNANDO CORREA DOS SANTOS",
        "number": 22,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/pablo-fernando-correa-dos-santos-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/pablo-fernando-correa-dos-santos-/1-Thumbnail.jpeg"
      },
      {
        "name": "ELIZEU LUCAS RAMOS",
        "number": 23,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/elizeu-lucas-ramos--1",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/elizeu-lucas-ramos--1/1-Thumbnail.jpeg"
      },
      {
        "name": "KLEBER LUCIANO BARACHO FERREIRA",
        "number": 23,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/kleber-luciano-baracho-ferreira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/kleber-luciano-baracho-ferreira/1-Thumbnail.jpeg"
      },
      {
        "name": "JUAN HENRIQUE DE BARROS NASCIMENTO",
        "number": 24
      }
    ]
  },
  "tornados": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/indaiatuba-rugby-clube",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106475",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106479",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106481"
    ],
    "players": [
      {
        "name": "GUILHERME LIMA BORGES SILVA",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/guilherme-lima-borges-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/guilherme-lima-borges-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "RICHARD MONDIN",
        "number": 1
      },
      {
        "name": "JEAN DANILO GREGÓRIO",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/jean-danilo-gregorio",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/jean-danilo-gregorio/1-Thumbnail.jpeg"
      },
      {
        "name": "NINJA",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/norbert-berndorfer-rucker",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/norbert-berndorfer-rucker/1-Thumbnail.jpeg"
      },
      {
        "name": "JOÃO PAULO VILLALBA",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-paulo-villalba",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-paulo-villalba/1-Thumbnail.jpeg"
      },
      {
        "name": "THIAGO NAVARRO BARBOSA DA SILVA",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/thiago-navarro-barbosa-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/thiago-navarro-barbosa-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "JAZIEL FERNANDO LEANDRO",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/jaziel-fernando-leandro",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/jaziel-fernando-leandro/1-Thumbnail.jpeg"
      },
      {
        "name": "HUGO",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/hugo-montoya",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/hugo-montoya/1-Thumbnail.jpeg"
      },
      {
        "name": "MARCELO PISANI SAKAMOTO AMATO",
        "number": 5
      },
      {
        "name": "JOSÉ PEREIRA CARDOSO NETO",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/jose-pereira-cardoso-neto",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/jose-pereira-cardoso-neto/1-Thumbnail.jpeg"
      },
      {
        "name": "WESLEY GLINGUE VIEIRA",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/wesley-glingue-vieira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/wesley-glingue-vieira/1-Thumbnail.jpeg"
      },
      {
        "name": "RAFAEL CICHON FRANZ",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rafael-cichon-franz",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rafael-cichon-franz/1-Thumbnail.jpeg"
      },
      {
        "name": "STÉFANO CARNIELLI PENTEADO",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/stefano-carnielli-penteado",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/stefano-carnielli-penteado/1-Thumbnail.jpeg"
      },
      {
        "name": "MARCOS CHIOZZOTTO CORREA",
        "number": 9,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/marcos-chiozzotto-correa",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/marcos-chiozzotto-correa/1-Thumbnail.jpeg"
      },
      {
        "name": "ALCINO PISANI AMATO",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/alcino-pisani-amato",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/alcino-pisani-amato/1-Thumbnail.jpeg"
      },
      {
        "name": "BRUNO DE ALMEIDA LIMA",
        "number": 10
      },
      {
        "name": "VINICIUS GOMES",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/vinicius-gomes",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/vinicius-gomes/1-Thumbnail.jpeg"
      },
      {
        "name": "THIAGO DE ARAUJO",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/thiago-de-araujo",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/thiago-de-araujo/1-Thumbnail.jpeg"
      },
      {
        "name": "JOÃO VICTOR SABOROSA DE CARVALHO FREIRE",
        "number": 13,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-victor-saborosa-de-carvalho-freire",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-victor-saborosa-de-carvalho-freire/1-Thumbnail.jpeg"
      },
      {
        "name": "LUCAS BERTONI",
        "number": 13
      },
      {
        "name": "PEDRO SELLGE LE GRAZIE",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/pedro-sellge-le-grazie",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/pedro-sellge-le-grazie/1-Thumbnail.jpeg"
      },
      {
        "name": "VINICIUS CAMPANA PEREIRA SILVA",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/vinicius-campana-pereira-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/vinicius-campana-pereira-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "DOUGLAS LUÍS PARAZI",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/douglas-luis-parazi",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/douglas-luis-parazi/1-Thumbnail.jpeg"
      },
      {
        "name": "TOMÁS MARCONDES DE GOYCOECHEA",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/tomas-marcondes-de-goycoechea",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/tomas-marcondes-de-goycoechea/1-Thumbnail.jpeg"
      },
      {
        "name": "THIAGO EDILMAR SACACA MAMANI",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/thiago-edilmar-sacaca-mamani",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/thiago-edilmar-sacaca-mamani/1-Thumbnail.jpeg"
      },
      {
        "name": "PEDRO SIBINEL STACH",
        "number": 18
      },
      {
        "name": "OTÁVIO AUGUSTO GARCIA DE CASTRO GONÇALVES",
        "number": 20,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/otavio-augusto-garcia-de-castro-goncalves-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/otavio-augusto-garcia-de-castro-goncalves-/1-Thumbnail.jpeg"
      },
      {
        "name": "FONTANA",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/matheus-fontana-goncalves",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/matheus-fontana-goncalves/1-Thumbnail.jpeg"
      },
      {
        "name": "RODRIGO DOS SANTOS CESARIO",
        "number": 21
      },
      {
        "name": "LUIS FELIPE ALVES OLIVEIRA",
        "number": 22,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/luis-felipe-alves-oliveira-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/luis-felipe-alves-oliveira-/1-Thumbnail.jpeg"
      },
      {
        "name": "JOSE MARCOS YAPURA",
        "number": 26
      },
      {
        "name": "SAMUELL",
        "number": 27
      },
      {
        "name": "MIGUEL ANDRÉ PIOVESAN DA CUNHA",
        "number": 29
      },
      {
        "name": "HENRIQUE ANTUNES DA CRUZ",
        "number": 30,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/henrique-antunes-da-cruz",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/henrique-antunes-da-cruz/1-Thumbnail.jpeg"
      }
    ]
  },
  "rio-branco": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/rio-branco-rugby-clube",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106473",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106479",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106483"
    ],
    "players": [
      {
        "name": "MARCELO",
        "number": 0
      },
      {
        "name": "JORGE LUIS PROFETA DE CASTRO",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/jorge-luis-profeta-de-castro",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/jorge-luis-profeta-de-castro/1-Thumbnail.jpeg"
      },
      {
        "name": "RODRIGO VILLELA ALEXIADES",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rodrigo-villela-alexiades",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rodrigo-villela-alexiades/1-Thumbnail.jpeg"
      },
      {
        "name": "RAPHAEL ALEX DE SOUSA",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/raphael-alex-de-sousa",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/raphael-alex-de-sousa/1-Thumbnail.jpeg"
      },
      {
        "name": "BRIAN RAPHAEL DIAS FRANCO",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/brian-raphael-dias-franco",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/brian-raphael-dias-franco/1-Thumbnail.jpeg"
      },
      {
        "name": "PEDRO HENRIQUE GERMANO DE MELO",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/pedro-henrique-germano-de-melo",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/pedro-henrique-germano-de-melo/1-Thumbnail.jpeg"
      },
      {
        "name": "RAFAEL BATISTA",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rafael-batista-1",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rafael-batista-1/1-Thumbnail.jpeg"
      },
      {
        "name": "GIORGIO FELIPPO RICCI BUSO",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/giorgio-felippo-ricci-buso",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/giorgio-felippo-ricci-buso/1-Thumbnail.jpeg"
      },
      {
        "name": "RODRIGO DE SOUZA NAMIKI",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rodrigo-de-souza-namiki",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rodrigo-de-souza-namiki/1-Thumbnail.jpeg"
      },
      {
        "name": "WILLIAM VIANA DE FREITAS",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/william-viana-de-freitas",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/william-viana-de-freitas/1-Thumbnail.jpeg"
      },
      {
        "name": "LUCAS MACHEA DE ALMEIDA",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/lucas-machea-de-almeida",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/lucas-machea-de-almeida/1-Thumbnail.jpeg"
      },
      {
        "name": "LUCAS FONSECA SAMPAIO",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/lucas-fonseca-sampaio",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/lucas-fonseca-sampaio/1-Thumbnail.jpeg"
      },
      {
        "name": "GUILHERME BARBOSA LIMA",
        "number": 9,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/guilherme-barbosa-lima",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/guilherme-barbosa-lima/1-Thumbnail.jpeg"
      },
      {
        "name": "GUILLERMO GARCES SANCHEZ NIETO",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/guillermo-garces-sanchez-nieto",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/guillermo-garces-sanchez-nieto/1-Thumbnail.jpeg"
      },
      {
        "name": "RODRIGO DE FREITAS QUINTERO",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rodrigo-de-freitas-quintero",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rodrigo-de-freitas-quintero/1-Thumbnail.jpeg"
      },
      {
        "name": "DANIEL LACERDA PAGNOZZI",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/daniel-lacerda-pagnozzi",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/daniel-lacerda-pagnozzi/1-Thumbnail.jpeg"
      },
      {
        "name": "LEONARDO ELISIÁRIO DOS SANTOS",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/leonardo-elisiario-dos-santos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/leonardo-elisiario-dos-santos/1-Thumbnail.jpeg"
      },
      {
        "name": "ALAN WAGNER GABRIEL FILHO",
        "number": 13,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/alan-wagner-gabriel-filho",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/alan-wagner-gabriel-filho/1-Thumbnail.jpeg"
      },
      {
        "name": "RYAN SILVA DE SOUZA",
        "number": 13
      },
      {
        "name": "YUSETT YONAIKEL RIVERA PAREJO",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/yusett-yonaikel-rivera-parejo-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/yusett-yonaikel-rivera-parejo-/1-Thumbnail.jpeg"
      },
      {
        "name": "FELIPE TARSITANO SCHNEIDER",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/felipe-tarsitano-schneider",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/felipe-tarsitano-schneider/1-Thumbnail.jpeg"
      },
      {
        "name": "GABRIEL MORAIS DE SOUZA",
        "number": 15
      },
      {
        "name": "ERICK SANTOS GOMES APARECIDO",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/erick-santos-gomes-aparecido",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/infantil/erick-santos-gomes-aparecido/1-Thumbnail.jpeg"
      },
      {
        "name": "RAFAEL CALVITTI ANDREGHETTI",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rafael-calvitti-andreghetti",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rafael-calvitti-andreghetti/1-Thumbnail.jpeg"
      },
      {
        "name": "VINICIUS",
        "number": 17
      },
      {
        "name": "LUCAS RODRIGUES",
        "number": 18
      },
      {
        "name": "JOSÉ RODOLFO OLIVEIRA POLANIC",
        "number": 20,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/jose-rodolfo-oliveira-polanic",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/jose-rodolfo-oliveira-polanic/1-Thumbnail.jpeg"
      },
      {
        "name": "PEDRO HENRIQUE MARENDAZ",
        "number": 20,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/pedro-henrique-marendaz",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/pedro-henrique-marendaz/1-Thumbnail.jpeg"
      },
      {
        "name": "SERGIO ANTONIO BRITO PÉREZ",
        "number": 20,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/sergio-antonio-brito-perez-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/sergio-antonio-brito-perez-/1-Thumbnail.jpeg"
      },
      {
        "name": "EDUARDO MERINO",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/eduardo-merino",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/eduardo-merino/1-Thumbnail.jpeg"
      },
      {
        "name": "PEDRO HENRIQUE MARTINS TORRES",
        "number": 22,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/pedro-henrique-martins-torres",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/pedro-henrique-martins-torres/1-Thumbnail.jpeg"
      },
      {
        "name": "GEORGE DOS ANJOS GONÇALVES PEREZ",
        "number": 23,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/george-dos-anjos-goncalves-perez",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/george-dos-anjos-goncalves-perez/1-Thumbnail.jpeg"
      },
      {
        "name": "MARCOS FILIPE VOLPINI",
        "number": 23
      },
      {
        "name": "RYAN JAMES BUCHANAN",
        "number": 23,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/ryan-james-buchanan",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/ryan-james-buchanan/1-Thumbnail.jpeg"
      },
      {
        "name": "ALEXSANDER SENA DE OLIVEIRA",
        "number": 24,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/alexsander-sena-de-oliveira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/alexsander-sena-de-oliveira/1-Thumbnail.jpeg"
      },
      {
        "name": "CÁSSIO ZANATTO",
        "number": 24,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/cassio-zanatto",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/cassio-zanatto/1-Thumbnail.jpeg"
      },
      {
        "name": "IGOR MARTINS",
        "number": 24
      }
    ]
  },
  "jacarei": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/associacao-esportiva-jacarei-rugby-1",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106485",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106489",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106493"
    ],
    "players": [
      {
        "name": "LEVY MARINHO DA SILVA",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/levy-marinho-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/levy-marinho-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "ANDRÉ INÁCIO BRANDÃO",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/andre-inacio-brandao",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/andre-inacio-brandao/1-Thumbnail.jpeg"
      },
      {
        "name": "RAPHAEL BRUNNO DE SENA MATOS",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/raphael-brunno-de-sena-matos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/raphael-brunno-de-sena-matos/1-Thumbnail.jpeg"
      },
      {
        "name": "JOAO VICTOR CAVALCANTE SANTOS",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-victor-cavalcante-santos-10",
        "photo": "https://painel.sporti.com.br/Images/No_img_200x200.png"
      },
      {
        "name": "NICOLAS DE AZEVEDO RIBEIRO",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/nicolasdeazevedoribeiro",
        "photo": "https://painel.sporti.com.br/Images/No_img_200x200.png"
      },
      {
        "name": "LUIZ GUSTAVO ANDREOTI PINTO",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/luiz-gustavo-andreoti-pinto-10",
        "photo": "https://painel.sporti.com.br/Images/No_img_200x200.png"
      },
      {
        "name": "MAIKI GUSTAVO LEMES DOS SANTOS",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/maiki-gustavo-lemes-dos-santos-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/maiki-gustavo-lemes-dos-santos-/1-Thumbnail.jpeg"
      },
      {
        "name": "FURST",
        "number": 8
      },
      {
        "name": "GUSTAVO GONÇALVES",
        "number": 9,
        "profile": "https://plataforma.sporti.com.br/sporti/atleta/gustavohenriquegoncalves",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gustavohenriquegoncalves/1-Thumbnail.jpeg"
      },
      {
        "name": "LYAN WILLIS FONSECA DE AQUINO",
        "number": 9,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/lyanwillisfonsecadeaquino",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/lyanwillisfonsecadeaquino/1-Thumbnail.jpeg"
      },
      {
        "name": "KAIKY DE ARAUJO FRANÇA SANTOS",
        "number": 10
      },
      {
        "name": "ARIEL DA SILVA RODRIGUES",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/ariel-da-silva-rodrigues-1",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/ariel-da-silva-rodrigues-1/1-Thumbnail.jpeg"
      },
      {
        "name": "DAVI TEIXEIRA CARDOSO",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/davi-teixeira-cardoso-10",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/davi-teixeira-cardoso-10/1-Thumbnail.jpeg"
      },
      {
        "name": "LUCAS DRUDI ROMEU",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/lucas-drudi-romeu",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/lucas-drudi-romeu/1-Thumbnail.jpeg"
      },
      {
        "name": "ANDREI HENRIQUE SANTANA DE SOUZA",
        "number": 13,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/andrei-henrique-santana-de-souza",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/andrei-henrique-santana-de-souza/1-Thumbnail.jpeg"
      },
      {
        "name": "RAPHAEL MOLITERNO VICENTE CHAGAS FILHO",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/sporti/atleta/raphaelmoliternovicentechagasfilho",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/raphaelmoliternovicentechagasfilho/1-Thumbnail.jpeg"
      },
      {
        "name": "RICHARD DIAS GONÇALVES",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/richarddiasgoncalves",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/richarddiasgoncalves/1-Thumbnail.jpeg"
      },
      {
        "name": "THIAGO RICHARD GONÇALVEZ PEREIRA",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/sporti/atleta/thiagorichardgoncalvezpereira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/thiagorichardgoncalvezpereira/1-Thumbnail.jpeg"
      },
      {
        "name": "PEDRO HENRIQUE ANDREOTI PINTO",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/pedro-henrique-andreoti-pinto",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/pedro-henrique-andreoti-pinto/1-Thumbnail.jpeg"
      },
      {
        "name": "JOÃO LUCAS M DE SOUZA",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-lucas-m-de-souza",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-lucas-m-de-souza/1-Thumbnail.jpeg"
      },
      {
        "name": "JOÃO GUILHERME RASPA ARRAEZ",
        "number": 18,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joaoguilhermeraspaarraez",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joaoguilhermeraspaarraez/1-Thumbnail.jpeg"
      },
      {
        "name": "PIERO POZZI",
        "number": 18,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/piero-pozzi",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/piero-pozzi/1-Thumbnail.jpeg"
      },
      {
        "name": "GABRIEL HENRIQUE DE SOUZA OLIVEIRA",
        "number": 19,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gabriel-henrique--de-souza-oliveira"
      },
      {
        "name": "CAUÃ HENRIQUE DE SOUZA OLIVEIRA",
        "number": 20,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/caua-henrique-de-souza-oliveira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/caua-henrique-de-souza-oliveira/1-Thumbnail.jpeg"
      },
      {
        "name": "ELIEL DA SILVA",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/eliel-da-silva"
      },
      {
        "name": "PEDRO MACHADO MARQUES",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/pedro-machado-marques",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/pedro-machado-marques/1-Thumbnail.jpeg"
      },
      {
        "name": "MATEUS LUCIANO GONÇALVES FIGUEIREDO",
        "number": 22,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/mateus-luciano-goncalves-figueiredo-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/mateus-luciano-goncalves-figueiredo-/1-Thumbnail.jpeg"
      },
      {
        "name": "GUILHERME BOTOSI DE FARIA JÚNIOR",
        "number": 24
      },
      {
        "name": "MARCUS VINICIUS DE ANDRADE FURINI",
        "number": 25,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/marcusviniciusdeandradefurini",
        "photo": "https://painel.sporti.com.br/Images/No_img_200x200.png"
      }
    ]
  },
  "spac": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/sao-paulo-athletic-club",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106487",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106489",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106495"
    ],
    "players": [
      {
        "name": "FELIPE PECIN SILVA",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/felipe-pecin-silva"
      },
      {
        "name": "FABIO NERY DE ARAUJO MIRANDA",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/fabio-nery-de-araujo-miranda",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/fabio-nery-de-araujo-miranda/1-Thumbnail.jpeg"
      },
      {
        "name": "VICTOR DIONIOS MASTROENI PINHEIRO",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/victor-dionios-mastroeni-pinheiro",
        "photo": "https://painel.sporti.com.br/Images/No_img_200x200.png"
      },
      {
        "name": "HENRIQUE MOREIRA COUTO SANTOS",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/henrique-moreira-couto-santos-1",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/henrique-moreira-couto-santos-1/1-Thumbnail.jpeg"
      },
      {
        "name": "JOÃO MARCOS ZANATA MILLEO",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-marcos-zanata-milleo",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-marcos-zanata-milleo/1-Thumbnail.jpeg"
      },
      {
        "name": "MATHEUS MARTINS",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/matheus-martins2",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/matheus-martins2/1-Thumbnail.jpeg"
      },
      {
        "name": "PETER BERNARDI GRANDJEAN THOMSEN",
        "number": 6
      },
      {
        "name": "FRANCISCO JOSE PUYOL",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/francisco-jose-puyol"
      },
      {
        "name": "TOBIAS MARIA DURET",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/tobias-maria-duret",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/tobias-maria-duret/1-Thumbnail.jpeg"
      },
      {
        "name": "LORENZO FONZAGHI FERRAMOLA",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/lorenzo-fonzaghi-ferramola",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/lorenzo-fonzaghi-ferramola/1-Thumbnail.jpeg"
      },
      {
        "name": "SANTINO CARDOSO",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/santino-cardoso",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/santino-cardoso/1-Thumbnail.jpeg"
      },
      {
        "name": "GUILHERME DOS SANTOS OLIVEIRA",
        "number": 9,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/guilherme-dos-santos-oliveira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/guilherme-dos-santos-oliveira/1-Thumbnail.jpeg"
      },
      {
        "name": "JOÃO PEDRO FERRER DO AMARAL",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-pedro-ferrer-do-amaral",
        "photo": "https://painel.sporti.com.br/Images/No_img_200x200.png"
      },
      {
        "name": "ONO JATTO",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/ono-jatto",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/ono-jatto/1-Thumbnail.jpeg"
      },
      {
        "name": "WIDSON MENEZES DO NASCIMENTO",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/widson-menezes-do-nascimento",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/widson-menezes-do-nascimento/1-Thumbnail.jpeg"
      },
      {
        "name": "FELIPE PERES FERRAZ FREITAS",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/felipe-peres-ferraz-freitas"
      },
      {
        "name": "HECTOR GUERRINI HERRERA",
        "number": 13,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/hector-guerrini-herrera",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/hector-guerrini-herrera/1-Thumbnail.jpeg"
      },
      {
        "name": "DANIEL TERRA EGUCHI",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/daniel-terra-eguchi",
        "photo": "https://painel.sporti.com.br/Images/No_img_200x200.png"
      },
      {
        "name": "ALISON P S CRISPIN",
        "number": 15
      },
      {
        "name": "LUCAS RAMOS DE SOUSA",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/lucas-ramos-de-sousa",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/lucas-ramos-de-sousa/1-Thumbnail.jpeg"
      },
      {
        "name": "NIKLAS DANIEL BAUMER",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/niklas-daniel-baumer",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/niklas-daniel-baumer/1-Thumbnail.jpeg"
      },
      {
        "name": "CONSTANTINOS LEANDROS CRANAS SOTIROPOULOS",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/constantinos-leandros-cranas-sotiropoulos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/infantil/constantinos-leandros-cranas-sotiropoulos/1-Thumbnail.jpeg"
      },
      {
        "name": "GUSTAVO MENDES MATTOS",
        "number": 18,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gustavo-mendes-mattos"
      },
      {
        "name": "ALLAN DE PAULO ALVES A. DA SILVA",
        "number": 19,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/allan-de-paulo-alves-a.-da-silva",
        "photo": "https://painel.sporti.com.br/Images/No_img_200x200.png"
      },
      {
        "name": "JOÃO PEDRO KEMP DE FREITAS",
        "number": 20,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-pedro-kemp-de-freitas",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-pedro-kemp-de-freitas/1-Thumbnail.jpeg"
      },
      {
        "name": "ALEXANDRE MASAGÃO CLEAVER",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/alexandre-masagao-cleaver"
      },
      {
        "name": "MATIAS AMADOR P V PADILLA",
        "number": 22
      },
      {
        "name": "JOÃO PIRES DE OLIVEIRA DIAS NETO",
        "number": 23,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-pires-de-oliveira-dias-neto",
        "photo": "https://painel.sporti.com.br/Images/No_img_200x200.png"
      },
      {
        "name": "SÉRGIO MANOEL SILVEIRA DE LUNA",
        "number": 23,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/sergio-manoel-silveira-de-luna",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/sergio-manoel-silveira-de-luna/1-Thumbnail.jpeg"
      }
    ]
  },
  "pasteur": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/pasteur-athletique-club",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106487",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106491",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106493"
    ],
    "players": [
      {
        "name": "MATHEUS WABISZEZEWICZ BALDACIM",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/matheus-wabiszezewicz-baldacim",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/matheus-wabiszezewicz-baldacim/1-Thumbnail.jpeg"
      },
      {
        "name": "GUIBBY",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/guilherme-batista-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/guilherme-batista-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "PAULO FERNANDES DE LIMA FILHO",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/paulo-fernandes-de-lima-filho",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/paulo-fernandes-de-lima-filho/1-Thumbnail.jpeg"
      },
      {
        "name": "AUGUSTO GANDINI CALDEIRA CARDOSO NEVES",
        "number": 4
      },
      {
        "name": "MARIO GANDINI CALDEIRA CARDOSO NEVES",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/mario-gandini-caldeira-cardoso-neves",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/mario-gandini-caldeira-cardoso-neves/1-Thumbnail.jpeg"
      },
      {
        "name": "MAURO LUCAS DA ROCHA SOUZA",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/mauro-lucas-da-rocha-souza",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/mauro-lucas-da-rocha-souza/1-Thumbnail.jpeg"
      },
      {
        "name": "WAGNER DOS REIS ADÃO",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/wagner-dos-reis-adao",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/wagner-dos-reis-adao/1-Thumbnail.jpeg"
      },
      {
        "name": "LOUIS MORONI DAVID",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/louis-moroni-david-1",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/louis-moroni-david-1/1-Thumbnail.jpeg"
      },
      {
        "name": "THOMAS THALENBERG",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/thomas-thalenberg",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/thomas-thalenberg/1-Thumbnail.jpeg"
      },
      {
        "name": "RENATO SANTOS DA SILVA",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/renato-santos-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/renato-santos-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "WENDER DIAS DE SOUZA",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/wender-dias-de-souza",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/wender-dias-de-souza/1-Thumbnail.jpeg"
      },
      {
        "name": "HENRIQUE DELLA COLETTA",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/henrique-della-coletta",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/henrique-della-coletta/1-Thumbnail.jpeg"
      },
      {
        "name": "GUSTAVO GOBETI BILECKI",
        "number": 9,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gustavo-gobeti-bilecki-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gustavo-gobeti-bilecki-/1-Thumbnail.jpeg"
      },
      {
        "name": "NICOLAS NASCIMENTO",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/nicolas-nascimento-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/nicolas-nascimento-/1-Thumbnail.jpeg"
      },
      {
        "name": "LUIZ AUGUSTO HADERSPEK SALES DA SILVA",
        "number": 11
      },
      {
        "name": "RONALDO DA SILVA SANTOS",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/ronaldo-da-silva-santos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/ronaldo-da-silva-santos/1-Thumbnail.jpeg"
      },
      {
        "name": "FELIPE BEZIAN ZENI",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/felipe-bezian-zeni",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/felipe-bezian-zeni/1-Thumbnail.jpeg"
      },
      {
        "name": "LEO WALLAERT",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/leo-wallaert",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/leo-wallaert/1-Thumbnail.jpeg"
      },
      {
        "name": "AUGUSTO JOSE SILVA FONSECA",
        "number": 13,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/augusto-jose-silva-fonseca-1",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/augusto-jose-silva-fonseca-1/1-Thumbnail.jpeg"
      },
      {
        "name": "BRUNO ANDION DE OLIVEIRA FREITAS",
        "number": 14
      },
      {
        "name": "GABRIEL RUBINSTEIN GIRARD",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gabriel-rubinstein-girard-1",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gabriel-rubinstein-girard-1/1-Thumbnail.jpeg"
      },
      {
        "name": "GUILHERME PAULO HUHN",
        "number": 14
      },
      {
        "name": "BRYAN ALVES DOS SANTOS",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/bryan-alves-dos-santos-3",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/bryan-alves-dos-santos-3/1-Thumbnail.jpeg"
      },
      {
        "name": "RAFAEL CAVALCANTE DA SILVA",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rafael-cavalcante-da-silva-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rafael-cavalcante-da-silva-/1-Thumbnail.jpeg"
      },
      {
        "name": "BERNARDO DE HUGO TOFFOLI SIMOENS DA SILVA",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/bernardo-de-hugo-toffoli-simoens-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/bernardo-de-hugo-toffoli-simoens-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "NICOLAS GARCIA ROCHA",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/nicolas-garcia-rocha",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/nicolas-garcia-rocha/1-Thumbnail.jpeg"
      },
      {
        "name": "VITOR GABRIEL BAGDONAS DE SANTANA WITZEL",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/vitor-gabriel-bagdonas-de-santana-witzel-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/vitor-gabriel-bagdonas-de-santana-witzel-/1-Thumbnail.jpeg"
      },
      {
        "name": "PEDRO HENRIQUE SANTANA XOTTA",
        "number": 18,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/pedro-henrique-santana-xotta",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/pedro-henrique-santana-xotta/1-Thumbnail.jpeg"
      },
      {
        "name": "HENRIQUE RIBEIRO FERREIRA",
        "number": 19,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/henrique-ribeiro-ferreira-1",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/henrique-ribeiro-ferreira-1/1-Thumbnail.jpeg"
      },
      {
        "name": "DIEGO MARTINS GIMENEZ LOPEZ",
        "number": 20,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/diego-martins-gimenez-lopez",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/diego-martins-gimenez-lopez/1-Thumbnail.jpeg"
      },
      {
        "name": "BRENO DA SILVA VITO",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/breno-da-silva-vito",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/breno-da-silva-vito/1-Thumbnail.jpeg"
      },
      {
        "name": "JOÃO VITOR PLANCKE MARÇAL",
        "number": 22,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-vitor-plancke-marcal",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-vitor-plancke-marcal/1-Thumbnail.jpeg"
      },
      {
        "name": "AUGUSTO CALEGARE DE OLIVEIRA",
        "number": 23,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/augusto-calegare-de-oliveira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/augusto-calegare-de-oliveira/1-Thumbnail.jpeg"
      },
      {
        "name": "MÁRCIO FABIANO DE JESUS MACIEL",
        "number": 23,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/marcio-fabiano-de-jesus-maciel",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/marcio-fabiano-de-jesus-maciel/1-Thumbnail.jpeg"
      }
    ]
  },
  "nova-lima": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/nova-lima-rugby3",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106485",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106491",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino/sumula/106495"
    ],
    "players": [
      {
        "name": "VICTOR HUGO DA MATA",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/victor-hugo-da-mata",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/victor-hugo-da-mata/1-Thumbnail.jpeg"
      },
      {
        "name": "ARTHUR PIASSI DIAS DE CASTRO",
        "number": 2
      },
      {
        "name": "FERNANDO MARÇAL SOARES BATISTA",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/fernando-marcal-soares-batista",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/fernando-marcal-soares-batista/1-Thumbnail.jpeg"
      },
      {
        "name": "THALES D'ÉRICO ROSA",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/thales-derico-rosa",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/thales-derico-rosa/1-Thumbnail.jpeg"
      },
      {
        "name": "HUGO PRISCO",
        "number": 4
      },
      {
        "name": "PAULO RODRIGUES",
        "number": 4
      },
      {
        "name": "RAFAEL RODRIGO PIRES GOMES",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rafael-rodrigo-pires-gomes",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rafael-rodrigo-pires-gomes/1-Thumbnail.jpeg"
      },
      {
        "name": "CARLOS EDUARDO DOS SANTOS",
        "number": 5
      },
      {
        "name": "RYAN LUCAS MARTINS COSTA",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/ryan-lucas-martins-costa",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/ryan-lucas-martins-costa/1-Thumbnail.jpeg"
      },
      {
        "name": "JOHANNES CLEMENTE DAS DORES",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/johannes-clemente-das-dores",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/johannes-clemente-das-dores/1-Thumbnail.jpeg"
      },
      {
        "name": "LONIERI MÜLLER SILVA PEREIRA",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/lonieri-muller-silva-pereira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/lonieri-muller-silva-pereira/1-Thumbnail.jpeg"
      },
      {
        "name": "FILLIPE GIBRAN MARQUES DE SOUZA",
        "number": 8
      },
      {
        "name": "WILLIAM JORGE SOARES GONÇALVES",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/william-jorge-soares-goncalves",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/william-jorge-soares-goncalves/1-Thumbnail.jpeg"
      },
      {
        "name": "JUAN MANUEL DIDIEGO",
        "number": 9,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/juan-manuel-didiego-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/juan-manuel-didiego-/1-Thumbnail.jpeg"
      },
      {
        "name": "LUIZ ANTONIO DE OLIVEIRA",
        "number": 10
      },
      {
        "name": "AISLAN CRISTIAN BATISTA DUTRA",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/aislan-cristian-batista-dutra",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/aislan-cristian-batista-dutra/1-Thumbnail.jpeg"
      },
      {
        "name": "ÉLCIO PINHEIRO LOPES JÚNIOR",
        "number": 12
      },
      {
        "name": "DAVID MÜLLER DOGIVÁ DE PÁSCOA",
        "number": 13,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/david-muller-dogiva-de-pascoa",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/david-muller-dogiva-de-pascoa/1-Thumbnail.jpeg"
      },
      {
        "name": "WILLIAN RIBEIRO DA SILVA",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/willian-ribeiro-da-silva-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/willian-ribeiro-da-silva-/1-Thumbnail.jpeg"
      },
      {
        "name": "ANDRÉ PIRES SANTOS PEREIRA THOMAZ",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/andre-pires-santos-pereira-thomaz",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/andre-pires-santos-pereira-thomaz/1-Thumbnail.jpeg"
      },
      {
        "name": "FELIPE FERREIRA BARBOSA FRANÇA",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/felipe-ferreira-barbosa-franca-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/felipe-ferreira-barbosa-franca-/1-Thumbnail.jpeg"
      },
      {
        "name": "GUSTAVO SANTOS SIMÕES",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gustavo-santos-simoes",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gustavo-santos-simoes/1-Thumbnail.jpeg"
      },
      {
        "name": "LUCAS GABRIEL DE SOUZA SILVA",
        "number": 16
      },
      {
        "name": "GABRIEL FONSECA SAMPAIO",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gabriel-fonseca-sampaio-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gabriel-fonseca-sampaio-/1-Thumbnail.jpeg"
      },
      {
        "name": "LINCOLN RAFAEL SOARES GONÇAVES",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/lincoln-rafael-soares-goncaves",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/lincoln-rafael-soares-goncaves/1-Thumbnail.jpeg"
      },
      {
        "name": "GABRIEL BRINA CORGOSINHO",
        "number": 18,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gabriel-brina-corgosinho",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gabriel-brina-corgosinho/1-Thumbnail.jpeg"
      },
      {
        "name": "MARCELO HENRIQUE PEREIRA VASCONCELOS",
        "number": 18,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/marcelo-henrique-pereira-vasconcelos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/marcelo-henrique-pereira-vasconcelos/1-Thumbnail.jpeg"
      },
      {
        "name": "MAYKON TEODORO MESQUITA",
        "number": 18
      },
      {
        "name": "BRUNO LUCAS SILVA MARQUES",
        "number": 19,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/bruno-lucas-silva-marques",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/bruno-lucas-silva-marques/1-Thumbnail.jpeg"
      },
      {
        "name": "LUCIANO CHEN",
        "number": 19
      },
      {
        "name": "JOSE MARCOS HURTADO LÓPEZ",
        "number": 20,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/jose-marcos-hurtado-lopez"
      },
      {
        "name": "PAULO RODRIGO SILVA",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/paulo-rodrigo-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/paulo-rodrigo-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "ALISSON ANDRADE MACHADO",
        "number": 22,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/alisson-andrade-machado",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/alisson-andrade-machado/1-Thumbnail.jpeg"
      },
      {
        "name": "TIAGO PADOAN JUCAS",
        "number": 22,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/tiago-padoan-jucas",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/tiago-padoan-jucas/1-Thumbnail.jpeg"
      },
      {
        "name": "FACUNDO ALEJANDRO SALOMON",
        "number": 23,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/facundo-alejandro-salomon",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/facundo-alejandro-salomon/1-Thumbnail.jpeg"
      }
    ]
  },
  "colonos": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/uniao-de-rugby-tauras-carancho",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1/sumula/106498",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1/sumula/106500"
    ],
    "players": [
      {
        "name": "DENNER CARLOS BRESSIANI",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/denner-carlos-bressiani",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/denner-carlos-bressiani/1-Thumbnail.jpeg"
      },
      {
        "name": "FERNANDES LEONARDO RAMOS",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/fernandes-leonardo-ramos",
        "photo": "https://painel.sporti.com.br/Images/No_img_200x200.png"
      },
      {
        "name": "GUILHERME MACHADO MARTINI",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/guilherme-machado-martini"
      },
      {
        "name": "GILVAN MACHADO MARTINI",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gilvan-machado-martini",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gilvan-machado-martini/1-Thumbnail.jpeg"
      },
      {
        "name": "AUGUSTO DETONI BETTIO",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/augusto-detoni-bettio",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/augusto-detoni-bettio/1-Thumbnail.jpeg"
      },
      {
        "name": "CARLOS ALEXANDRE SOUZA DOS SANTOS",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/carlos-alexandre-souza-dos-santos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/carlos-alexandre-souza-dos-santos/1-Thumbnail.jpeg"
      },
      {
        "name": "GIOVANE GREGORI AMARAL",
        "number": 5
      },
      {
        "name": "HIAGO ALEXANDRE PERROTTI",
        "number": 6
      },
      {
        "name": "YURI BRITTO DA SILVA",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/yuri-britto-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/yuri-britto-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "VICTOR FELIPE DOS SANTOS OLIVEIRA OZEKOSKI",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/victor-felipe-dos-santos-oliveira-ozekoski",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/victor-felipe-dos-santos-oliveira-ozekoski/1-Thumbnail.jpeg"
      },
      {
        "name": "VOLMAR ANTONIO FRANCESCHI JUNIOR",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/volmar-antonio-franceschi-junior"
      },
      {
        "name": "ANDREI VINICIUS DOS SANTOS",
        "number": 9,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/andrei-vinicius-dos-santos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/andrei-vinicius-dos-santos/1-Thumbnail.jpeg"
      },
      {
        "name": "HENRIQUE RAMIRES CASTRO",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/henrique-ramires-castro",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/henrique-ramires-castro/1-Thumbnail.jpeg"
      },
      {
        "name": "ARTHUR JUAN MORAIS",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/arthur-juan-morais",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/arthur-juan-morais/1-Thumbnail.jpeg"
      },
      {
        "name": "JULIANO CAVALCANTI",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/juliano-cavalcanti",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/juliano-cavalcanti/1-Thumbnail.jpeg"
      },
      {
        "name": "TAINÃ GIRARDI",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/taina-girardi",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/taina-girardi/1-Thumbnail.jpeg"
      },
      {
        "name": "VINÍCIUS SILVESTRE",
        "number": 13,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/vinicius-silvestre",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/vinicius-silvestre/1-Thumbnail.jpeg"
      },
      {
        "name": "VINICIUS DO PILAR NOLL",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/vinicius-do-pilar-noll",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/vinicius-do-pilar-noll/1-Thumbnail.jpeg"
      },
      {
        "name": "GUSTAVO CARDOSO CARVALHO",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gustavo-cardoso-carvalho",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gustavo-cardoso-carvalho/1-Thumbnail.jpeg"
      },
      {
        "name": "DAVI JOÃO DA SILVA CHIAPETTI",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/davi-joao-da-silva-chiapetti",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/davi-joao-da-silva-chiapetti/1-Thumbnail.jpeg"
      },
      {
        "name": "DOUGLAS JUNIOR GONÇALVES",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/douglas-junior-goncalves-"
      },
      {
        "name": "FELIPE FRANCISCO SOARES LEONHARDT",
        "number": 18,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/felipe-francisco-soares-leonhardt",
        "photo": "https://painel.sporti.com.br/Images/No_img_200x200.png"
      },
      {
        "name": "MATEUS GASPARETTO",
        "number": 19,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/mateus-gasparetto"
      },
      {
        "name": "LUIZ FERNANDO DALBOSCO DE OLIVEIRA",
        "number": 20,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/luiz-fernando-dalbosco-de-oliveira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/luiz-fernando-dalbosco-de-oliveira/1-Thumbnail.jpeg"
      },
      {
        "name": "TULIO DE ALMEIDA BERTAGNOLLI",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/tulio-de-almeida-bertagnolli",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/tulio-de-almeida-bertagnolli/1-Thumbnail.jpeg"
      },
      {
        "name": "IASANÃ GIRARDI",
        "number": 22
      },
      {
        "name": "MISTURINI",
        "number": 23,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/lucas-misturini",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/lucas-misturini/1-Thumbnail.jpeg"
      }
    ]
  },
  "brummers": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/brummers-rugby-clube2",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1/sumula/106499"
    ],
    "players": [
      {
        "name": "TÁLISON DOS REIS PEREIRA",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/talison-dos-reis-pereira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/talison-dos-reis-pereira/1-Thumbnail.jpeg"
      },
      {
        "name": "EDUARDO VIER DOS SANTOS",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/eduardo-vier-dos-santos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/eduardo-vier-dos-santos/1-Thumbnail.jpeg"
      },
      {
        "name": "JEFERSON SPARRENBERGER",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/jeferson-sparrenberger"
      },
      {
        "name": "GUILHERME DE OLIVEIRA BANDEIRA",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/guilherme-de-oliveira-bandeira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/guilherme-de-oliveira-bandeira/1-Thumbnail.jpeg"
      },
      {
        "name": "DIEGO HENRIQUE TRESOLDI",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/diego-henrique-tresoldi",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/diego-henrique-tresoldi/1-Thumbnail.jpeg"
      },
      {
        "name": "ANGELO ALBERTO MARCUCCI VELASCO",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/angelo-alberto-marcucci-velasco",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/angelo-alberto-marcucci-velasco/1-Thumbnail.jpeg"
      },
      {
        "name": "MATHEUS RAMOS",
        "number": 9,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/matheus-ramos"
      },
      {
        "name": "BRUNO JOSEPH SCHIEFFELBEIN",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/bruno-joseph-schieffelbein",
        "photo": "https://painel.sporti.com.br/Images/No_img_200x200.png"
      },
      {
        "name": "JOHN LEANDRO BATISTA SCHILING",
        "number": 13
      },
      {
        "name": "ISRAEL ANTONIO DA SILVA",
        "number": 14
      },
      {
        "name": "NICKOLAS DE MENEZES",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/nickolas-de-menezes"
      },
      {
        "name": "PEDRO PASIN SOUZA",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/pedro-pasin-souza",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/pedro-pasin-souza/1-Thumbnail.jpeg"
      },
      {
        "name": "MARCELLO VIEIRA",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/marcello-vieira",
        "photo": "https://painel.sporti.com.br/Images/No_img_200x200.png"
      },
      {
        "name": "FERNANDO CARNIEL BALLIN",
        "number": 19,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/fernando-carniel-ballin",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/fernando-carniel-ballin/1-Thumbnail.jpeg"
      },
      {
        "name": "GALEGO",
        "number": 20,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/nicolas-ferreira-dias2",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/nicolas-ferreira-dias2/1-Thumbnail.jpeg"
      },
      {
        "name": "GUILHERME DE OLIVEIRA",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/guilherme-de-oliveira-1",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/guilherme-de-oliveira-1/1-Thumbnail.jpeg"
      },
      {
        "name": "PEDRO VICENTE STEFANELLO MEDEIROS",
        "number": 22,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/pedro-vicente-stefanello-medeiros",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/pedro-vicente-stefanello-medeiros/1-Thumbnail.jpeg"
      },
      {
        "name": "PAULO ROBERTO BARBOSA JUNIOR",
        "number": 23,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/paulo-roberto-barbosa-junior",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/paulo-roberto-barbosa-junior/1-Thumbnail.jpeg"
      },
      {
        "name": "GUILHERME DO NASCIMENTO COLAÇO",
        "number": 24,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/guilherme-do-nascimento-colaco"
      },
      {
        "name": "LUIS FERNANDO SULZBACH",
        "number": 25,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/luis-fernando-sulzbach",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/luis-fernando-sulzbach/1-Thumbnail.jpeg"
      },
      {
        "name": "MARCOS PAULO DE OLIVEIRA DA SILVA",
        "number": 27,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/marcos-paulo-de-oliveira-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/marcos-paulo-de-oliveira-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "GIOVANNE LUCAS DE MELLO MIRANDA",
        "number": 28,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/giovanne-lucas-de-mello-miranda"
      },
      {
        "name": "ITALO RODRIGO SOARES",
        "number": 30,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/italo-rodrigo-soares",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/italo-rodrigo-soares/1-Thumbnail.jpeg"
      }
    ]
  },
  "serra-gaucha": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/serra-gaucha-rugby-clube",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1/sumula/106498",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1/sumula/106499"
    ],
    "players": [
      {
        "name": "GUILHERME MACIEL GOMES",
        "number": 1
      },
      {
        "name": "ANDRE LUIZ DOS SANTOS RIBEIRO",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/andre-luiz-dos-santos-ribeiro",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/andre-luiz-dos-santos-ribeiro/1-Thumbnail.jpeg"
      },
      {
        "name": "IVAN GUSTAVO CORTEZ",
        "number": 2
      },
      {
        "name": "CLAYTON DE CAMARGO",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/clayton-de-camargo",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/clayton-de-camargo/1-Thumbnail.jpeg"
      },
      {
        "name": "RÓGER BORGES MACEDO",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/roger-borges-macedo",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/roger-borges-macedo/1-Thumbnail.jpeg"
      },
      {
        "name": "EDSON PINHEIRO JUNIOR",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/edson-pinheiro-junior",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/edson-pinheiro-junior/1-Thumbnail.jpeg"
      },
      {
        "name": "BRAYAN DANIEL MONTERO VELASQUEZ",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/brayan-daniel-montero-velasquez",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/brayan-daniel-montero-velasquez/1-Thumbnail.jpeg"
      },
      {
        "name": "RAFAEL DARIVA",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rafael-dariva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rafael-dariva/1-Thumbnail.jpeg"
      },
      {
        "name": "JONATHAN PATRICK DA ROSA",
        "number": 8
      },
      {
        "name": "PAULO RICARDO MOTA MORAES",
        "number": 9
      },
      {
        "name": "DANIEL DOS SANTOS",
        "number": 10
      },
      {
        "name": "JOILSON CASTAGNA DOS SANTOS",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joilson-castagna-dos-santos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joilson-castagna-dos-santos/1-Thumbnail.jpeg"
      },
      {
        "name": "LUAN DOS SANTOS PIRES",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/luan-dos-santos-pires",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/infantil/luan-dos-santos-pires/1-Thumbnail.jpeg"
      },
      {
        "name": "LUCAS CARRIZO",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/lucas-carrizo",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/lucas-carrizo/1-Thumbnail.jpeg"
      },
      {
        "name": "VAGNER MACHADO DE OLIVEIRA",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/vagner-machado-de-oliveira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/vagner-machado-de-oliveira/1-Thumbnail.jpeg"
      },
      {
        "name": "MATHEUS GIMENEZ DE MATOS",
        "number": 13,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/matheus-gimenez-de-matos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/matheus-gimenez-de-matos/1-Thumbnail.jpeg"
      },
      {
        "name": "DIEGO MACHADO DE OLIVEIRA",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/diego-machado-de-oliveira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/diego-machado-de-oliveira/1-Thumbnail.jpeg"
      },
      {
        "name": "GREGORY MACHADO PEREIRA",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gregory-machado-pereira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gregory-machado-pereira/1-Thumbnail.jpeg"
      },
      {
        "name": "MATHEUS MAIZONAVE VARGAS",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/matheus-maizonave-vargas",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/matheus-maizonave-vargas/1-Thumbnail.jpeg"
      },
      {
        "name": "PABLO PAZ SULZBACH",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/pablo-paz-sulzbach-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/pablo-paz-sulzbach-/1-Thumbnail.jpeg"
      },
      {
        "name": "NIUMAR AMPESE",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/niumar-ampese",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/niumar-ampese/1-Thumbnail.jpeg"
      },
      {
        "name": "LUIZ VINICIUS SANTOS FERREIRA",
        "number": 18,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/luiz-vinicius-santos-ferreira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/luiz-vinicius-santos-ferreira/1-Thumbnail.jpeg"
      },
      {
        "name": "MATHEUS ORTIZ CORRÊA",
        "number": 18,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/matheus-ortiz-correa",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/matheus-ortiz-correa/1-Thumbnail.jpeg"
      },
      {
        "name": "JOÃO FRANCISCO MANDERBACH MONASSA",
        "number": 19,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-francisco-manderbach-monassa",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-francisco-manderbach-monassa/1-Thumbnail.jpeg"
      },
      {
        "name": "ERICK IGNÁCIO ROSANO PEDROSO",
        "number": 20,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/erick-ignacio-rosano-pedroso",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/erick-ignacio-rosano-pedroso/1-Thumbnail.jpeg"
      },
      {
        "name": "GUILHERME DE CAMPOS DA SILVA",
        "number": 21
      },
      {
        "name": "MARCOS JOSÉ BRITO LUGO",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/marcos-jose-brito-lugo",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/marcos-jose-brito-lugo/1-Thumbnail.jpeg"
      },
      {
        "name": "ERIK HENRIQUE MARQUES PEDRO",
        "number": 22,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/erik-henrique-marques-pedro",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/erik-henrique-marques-pedro/1-Thumbnail.jpeg"
      },
      {
        "name": "DOUGLAS FERNANDES FERRANTI",
        "number": 23,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/douglas-fernandes-ferranti",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/douglas-fernandes-ferranti/1-Thumbnail.jpeg"
      },
      {
        "name": "VICTOR CALIXTO MATTIVI",
        "number": 23
      }
    ]
  },
  "joinville": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/joinville-rugby-clube2",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1/sumula/106500"
    ],
    "players": [
      {
        "name": "ALEX JUNIOR BELING DA SILVA",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/alex-junior-beling-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/alex-junior-beling-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "DANIEL RICARDO DA SILVA",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/daniel-ricardo-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/daniel-ricardo-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "FERNANDO FERREIRA DIAS",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/fernando-ferreira-dias",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/fernando-ferreira-dias/1-Thumbnail.jpeg"
      },
      {
        "name": "DJ",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/djeverson-damian-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/djeverson-damian-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "MARCOS GUIZONI BETT",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/marcos-guizoni-bett",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/marcos-guizoni-bett/1-Thumbnail.jpeg"
      },
      {
        "name": "WESLEY ANTUNES PAULO",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/wesley-antunes-paulo-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/wesley-antunes-paulo-/1-Thumbnail.jpeg"
      },
      {
        "name": "BENJAMIM FRANCISCO DE SOUSA NETO",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/benjamim-francisco-de-sousa-neto",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/benjamim-francisco-de-sousa-neto/1-Thumbnail.jpeg"
      },
      {
        "name": "GABRIEL LEVI GUERREIRO SOARES",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gabriel-levi-guerreiro-soares",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gabriel-levi-guerreiro-soares/1-Thumbnail.jpeg"
      },
      {
        "name": "JORDAN LUIZ FRANCISCO MARTINS",
        "number": 9
      },
      {
        "name": "JEFERSON DE AZEVEDO MARTINS",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/jeferson-de-azevedo-martins",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/jeferson-de-azevedo-martins/1-Thumbnail.jpeg"
      },
      {
        "name": "GILBERTO DE LIMA MATYAK",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gilberto-de-lima-matyak",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gilberto-de-lima-matyak/1-Thumbnail.jpeg"
      },
      {
        "name": "JORGE AMADORIS",
        "number": 12
      },
      {
        "name": "GUSTAVO CUSTODIO",
        "number": 13,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gustavo-custodio",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gustavo-custodio/1-Thumbnail.jpeg"
      },
      {
        "name": "JEFFERSON ANDREO FLORES",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/jefferson-andreo-flores",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/jefferson-andreo-flores/1-Thumbnail.jpeg"
      },
      {
        "name": "NATANAEL FLORIANI",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/natanael-floriani2",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/natanael-floriani2/1-Thumbnail.jpeg"
      },
      {
        "name": "LEANDRO GRAD DE CASTRO GOUVEA",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/leandro-grad-de-castro-gouvea",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/leandro-grad-de-castro-gouvea/1-Thumbnail.jpeg"
      },
      {
        "name": "FABRÍCIO LUERCE DA SILVA",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/fabricio-luerce-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/fabricio-luerce-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "GUILHERME ALVES PEREIRA",
        "number": 18,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/guilherme-alves-pereira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/guilherme-alves-pereira/1-Thumbnail.jpeg"
      }
    ]
  },
  "pe-vermelho": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/pe-vermelho-rugby-clube",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1/sumula/106503",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1/sumula/106506"
    ],
    "players": [
      {
        "name": "PEDRO HENRIQUE NUNES LOBATO DE SOUZA",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/pedro-henrique-nunes-lobato-de-souza",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/pedro-henrique-nunes-lobato-de-souza/1-Thumbnail.jpeg"
      },
      {
        "name": "JOAO PEDRO MARTINS PERIN",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-pedro-martins-perin",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-pedro-martins-perin/1-Thumbnail.jpeg"
      },
      {
        "name": "MARCELO DE AGOSTINI JUNIOR",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/marcelo-de-agostini-junior",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/marcelo-de-agostini-junior/1-Thumbnail.jpeg"
      },
      {
        "name": "EVALDO RAMALHO FRANQUILINO DOS SANTOS",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/evaldo-ramalho-franquilino-dos-santos2",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/evaldo-ramalho-franquilino-dos-santos2/1-Thumbnail.jpeg"
      },
      {
        "name": "RODOLFO LORENCETTI DA SILVA",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rodolfo-lorencetti-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rodolfo-lorencetti-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "ENZO BATISTA RAMALHO DOS SANTOS",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/enzo-batista-ramalho-dos-santos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/enzo-batista-ramalho-dos-santos/1-Thumbnail.jpeg"
      },
      {
        "name": "LEONARDO DE OLIVEIRA BOMFIM",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/leonardo-de-oliveira-bomfim",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/leonardo-de-oliveira-bomfim/1-Thumbnail.jpeg"
      },
      {
        "name": "RODRIGO TEIXEIRA MENSATO",
        "number": 9,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rodrigo-teixeira-mensato",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rodrigo-teixeira-mensato/1-Thumbnail.jpeg"
      },
      {
        "name": "JOAO PEDRO ALVES PAULINO",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-pedro-alves-paulino",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-pedro-alves-paulino/1-Thumbnail.jpeg"
      },
      {
        "name": "JOAO LUCAS LAZOSKI",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-lucas-lazoski",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-lucas-lazoski/1-Thumbnail.jpeg"
      },
      {
        "name": "DAVI SANTANA",
        "number": 12
      },
      {
        "name": "MATHEUS MEDEIROS FERRO",
        "number": 13,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/matheus-medeiros-ferro",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/matheus-medeiros-ferro/1-Thumbnail.jpeg"
      },
      {
        "name": "XERXES GABRIEL",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/davi17",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/davi17/1-Thumbnail.jpeg"
      },
      {
        "name": "DANILO MESSIAS DA SILVEIRA",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/danilo-messias-da-silveira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/danilo-messias-da-silveira/1-Thumbnail.jpeg"
      },
      {
        "name": "JOÃO PEDRO LOPES DAMAS",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-pedro-lopes-damas",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-pedro-lopes-damas/1-Thumbnail.jpeg"
      },
      {
        "name": "LEONARDO LACERDA DE AGOSTINI",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/leonardo-lacerda-de-agostini",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/leonardo-lacerda-de-agostini/1-Thumbnail.jpeg"
      },
      {
        "name": "THIAGO AUGUSTO DA CRUZ DANTAS",
        "number": 18,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/thiago-augusto-da-cruz-dantas",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/thiago-augusto-da-cruz-dantas/1-Thumbnail.jpeg"
      },
      {
        "name": "WILLIAM PAREDES HECKLER",
        "number": 18,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/william-paredes-heckler",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/william-paredes-heckler/1-Thumbnail.jpeg"
      },
      {
        "name": "GABRIEL HENRIQUE FERNANDES MEIRA",
        "number": 19,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gabriel-henrique-fernandes-meira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gabriel-henrique-fernandes-meira/1-Thumbnail.jpeg"
      },
      {
        "name": "HENRIQUE DOS REIS TEIXEIRA",
        "number": 20,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/henrique-dos-reis-teixeira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/henrique-dos-reis-teixeira/1-Thumbnail.jpeg"
      },
      {
        "name": "VICTOR HUGO ROCHA AMARAL",
        "number": 20,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/victor-hugo-rocha-amaral",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/victor-hugo-rocha-amaral/1-Thumbnail.jpeg"
      },
      {
        "name": "ANDRE LEONARDO DOS SANTOS",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/andre-leonardo-dos-santos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/andre-leonardo-dos-santos/1-Thumbnail.jpeg"
      },
      {
        "name": "MÁRIO FERNANDES RAMOS FILHO",
        "number": 22,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/mario-fernandes-ramos-filho",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/mario-fernandes-ramos-filho/1-Thumbnail.jpeg"
      },
      {
        "name": "JAIME PROCÓPIO DA SILVA",
        "number": 26,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/jaime-procopio-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/jaime-procopio-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "LUCAS PETKOWICZ MARIANI",
        "number": 67,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/lucas-petkowicz-mariani",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/lucas-petkowicz-mariani/1-Thumbnail.jpeg"
      },
      {
        "name": "GUILHERME PHILIPE",
        "number": 69
      },
      {
        "name": "BRUNO SPOSITO GOMES DE SIQUEIRA",
        "number": 88,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/bruno-sposito-gomes-de-siqueira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/bruno-sposito-gomes-de-siqueira/1-Thumbnail.jpeg"
      }
    ]
  },
  "leoes": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/associacao-esportiva-engenharia-mackenzie",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1/sumula/106503",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1/sumula/106505"
    ],
    "players": [
      {
        "name": "EMIR CAMILO MACUL PERALTA",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/emir-camilo-macul-peralta",
        "photo": "https://painel.sporti.com.br/Images/No_img_200x200.png"
      },
      {
        "name": "HENRY JUNIOR PONCE DAMACEN",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/henry-junior-ponce-damacen2",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/henry-junior-ponce-damacen2/1-Thumbnail.jpeg"
      },
      {
        "name": "JACKSON PEDRO DOS SANTOS SOUZA",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/jackson-pedro-dos-santos-souza",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/jackson-pedro-dos-santos-souza/1-Thumbnail.jpeg"
      },
      {
        "name": "LUCAS JOSÉ BORELLI DOS SANTOS",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/lucas-jose-borelli-dos-santos",
        "photo": "https://painel.sporti.com.br/Images/No_img_200x200.png"
      },
      {
        "name": "EDSON GABRIEL FERREIRA CORREIA",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/edson-gabriel-ferreira-correia",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/edson-gabriel-ferreira-correia/1-Thumbnail.jpeg"
      },
      {
        "name": "JOÃO PEDRO BRASIL CAROZI",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-pedro-brasil-carozi",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-pedro-brasil-carozi/1-Thumbnail.jpeg"
      },
      {
        "name": "PEDRO HENRIQUE MEDEIROS COSTA",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/pedro-henrique-medeiros-costa",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/pedro-henrique-medeiros-costa/1-Thumbnail.jpeg"
      },
      {
        "name": "ADEMIR ANTÔNIO DOS SANTOS",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/ademir-antonio-dos-santos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/ademir-antonio-dos-santos/1-Thumbnail.jpeg"
      },
      {
        "name": "DANTE RODRIGUES RIOS",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/dante-rodrigues-rios",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/dante-rodrigues-rios/1-Thumbnail.jpeg"
      },
      {
        "name": "LUCAS VIÑAS VIEIRA",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/lucas-vinas-vieira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/lucas-vinas-vieira/1-Thumbnail.jpeg"
      },
      {
        "name": "LUIS EDUARDO PLUMACHER DIAZ",
        "number": 9,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/luis-eduardo-plumacher-diaz",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/luis-eduardo-plumacher-diaz/1-Thumbnail.jpeg"
      },
      {
        "name": "LUCAS JOSÉ DA SILVA PONTES",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/lucas-jose-da-silva-pontes",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/lucas-jose-da-silva-pontes/1-Thumbnail.jpeg"
      },
      {
        "name": "FELIPE JOSÉ DA SILVA DE PONTES",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/felipe-jose-da-silva-de-pontes",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/felipe-jose-da-silva-de-pontes/1-Thumbnail.jpeg"
      },
      {
        "name": "GABRIEL LOPES DE OLIVEIRA",
        "number": 12
      },
      {
        "name": "ABRAAO AVELINO SANTOS",
        "number": 13
      },
      {
        "name": "JADSON FELIPE DOS SANTOS",
        "number": 13,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/jadson-felipe-dos-santos-1",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/jadson-felipe-dos-santos-1/1-Thumbnail.jpeg"
      },
      {
        "name": "IGOR KAUKLIN",
        "number": 14
      },
      {
        "name": "ITALO MORAIS DE ARAUJO FERNANDES",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/italo-morais-de-araujo-fernandes",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/italo-morais-de-araujo-fernandes/1-Thumbnail.jpeg"
      },
      {
        "name": "HENRIQUE GOMES DIAS",
        "number": 17
      },
      {
        "name": "RAFAEL FERREIRA DA SILVA",
        "number": 18
      },
      {
        "name": "PÉTER VALENZUELA AUTOVICZ",
        "number": 19,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/peter-valenzuela-autovicz",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/peter-valenzuela-autovicz/1-Thumbnail.jpeg"
      },
      {
        "name": "PATRÍCIO JULIAN GARMENDIA",
        "number": 20,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/patricio-julian-garmendia-1"
      },
      {
        "name": "GEIMISON MARQUES TOMAZ",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/geimison-marques-tomaz",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/geimison-marques-tomaz/1-Thumbnail.jpeg"
      },
      {
        "name": "ALDAIR JOSE DA SILVA",
        "number": 22,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/aldair-jose-da-silva2",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/aldair-jose-da-silva2/1-Thumbnail.jpeg"
      },
      {
        "name": "BRENNO PEREIRA SOARES",
        "number": 23,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/brenno-pereira-soares",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/brenno-pereira-soares/1-Thumbnail.jpeg"
      },
      {
        "name": "FELIPE",
        "number": 24,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/felipe-jose-da-silva-de-pontes",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/felipe-jose-da-silva-de-pontes/1-Thumbnail.jpeg"
      }
    ]
  },
  "iguanas": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/iguanas-rugby3",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1/sumula/106504",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1/sumula/106505"
    ],
    "players": [
      {
        "name": "MICHEL OLÍMPIO GOMES DE OLIVEIRA",
        "number": 1
      },
      {
        "name": "KAUE LUIZ DE FREITAS SILVA",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/kaue-luiz-de-freitas-silva3",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/kaue-luiz-de-freitas-silva3/1-Thumbnail.jpeg"
      },
      {
        "name": "NICOLAS ALKMIN FERREIRA",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/nicolas-alkmin-ferreira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/nicolas-alkmin-ferreira/1-Thumbnail.jpeg"
      },
      {
        "name": "EDUARDO ALEXANDRE CARDOSO DOS SANTOS",
        "number": 4
      },
      {
        "name": "JEAN MATHEUS MORGADO SANTOS",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/jean-matheus-morgado-santos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/jean-matheus-morgado-santos/1-Thumbnail.jpeg"
      },
      {
        "name": "CÉLIO APARECIDO DE SOUSA BARBOSA JUNIOR",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/celio-aparecido-de-sousa-barbosa-junior",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/celio-aparecido-de-sousa-barbosa-junior/1-Thumbnail.jpeg"
      },
      {
        "name": "JOÃO PEDRO MORINI",
        "number": 6
      },
      {
        "name": "DERICK ESTEVÃO PIO",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/derick-estevao-pio",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/derick-estevao-pio/1-Thumbnail.jpeg"
      },
      {
        "name": "GABRIEL ZACARIAS COSTA",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gabriel-zacarias-costa",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gabriel-zacarias-costa/1-Thumbnail.jpeg"
      },
      {
        "name": "IAGO JULIOLI DOS SANTOS",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/iago-julioli-dos-santos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/iago-julioli-dos-santos/1-Thumbnail.jpeg"
      },
      {
        "name": "MATHEUS DA SILVA ARANTES",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/matheus-da-silva-arantes",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/matheus-da-silva-arantes/1-Thumbnail.jpeg"
      },
      {
        "name": "GUSTAVO RICIERI DOS SANTOS",
        "number": 9,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gustavo-ricieri-dos-santos"
      },
      {
        "name": "ELLEYSON DANIEL NUNES DE ANDRADE REZENDE",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/elleyson-daniel-nunes-de-andrade-rezende",
        "photo": "https://painel.sporti.com.br/Images/No_img_200x200.png"
      },
      {
        "name": "JAVIER EDUARDO GARCIA MACIEL",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/javier-eduardo-garcia-maciel",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/javier-eduardo-garcia-maciel/1-Thumbnail.jpeg"
      },
      {
        "name": "GABRIEL BRITO DE SENNE",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gabriel-brito-de-senne",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gabriel-brito-de-senne/1-Thumbnail.jpeg"
      },
      {
        "name": "VITOR GUSTAVO ALVES DE LIMA",
        "number": 13,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/vitor-gustavo-alves-de-lima",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/vitor-gustavo-alves-de-lima/1-Thumbnail.jpeg"
      },
      {
        "name": "RHYAN EDUARDO MADEIRA DA SILVA",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rhyan-eduardo-madeira-da-silva-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rhyan-eduardo-madeira-da-silva-/1-Thumbnail.jpeg"
      },
      {
        "name": "FERNANDO S FIORELLI MONTEIRO",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/fernando-s-fiorelli-monteiro",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/fernando-s-fiorelli-monteiro/1-Thumbnail.jpeg"
      },
      {
        "name": "LEONARDO VIANNA DA SILVA",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/leonardo-vianna-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/leonardo-vianna-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "FILIPE CARLIN DE SOUSA",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/filipe-carlin-de-sousa",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/filipe-carlin-de-sousa/1-Thumbnail.jpeg"
      },
      {
        "name": "CLAYTON MORGADO LINO",
        "number": 17
      },
      {
        "name": "RAFAEL",
        "number": 17
      },
      {
        "name": "IGOR FERNADES RAMOS",
        "number": 18
      },
      {
        "name": "MARCELO FERNANDES DE SOUZA",
        "number": 19,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/marcelo-fernandes-de-souza",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/marcelo-fernandes-de-souza/1-Thumbnail.jpeg"
      },
      {
        "name": "RAPHAEL STRAUTMANN RAMOS",
        "number": 20,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/raphael-strautmann-ramos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/raphael-strautmann-ramos/1-Thumbnail.jpeg"
      },
      {
        "name": "VICTOR MATHEUS DE SOUSA MARQUES",
        "number": 20,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/victor-matheus-de-sousa-marques2",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/victor-matheus-de-sousa-marques2/1-Thumbnail.jpeg"
      },
      {
        "name": "VITOR MOREIRA DE OLIVEIRA",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/vitor-moreira-de-oliveira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/vitor-moreira-de-oliveira/1-Thumbnail.jpeg"
      },
      {
        "name": "LUCAS ALCINO DA SILVA LOPES",
        "number": 23
      }
    ]
  },
  "urutu": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/urutu-rugby-clube",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1/sumula/106504",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1/sumula/106506"
    ],
    "players": [
      {
        "name": "LUCAS DA SILVA ANTONIO",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/lucas-da-silva-antonio",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/lucas-da-silva-antonio/1-Thumbnail.jpeg"
      },
      {
        "name": "DIEGO MONTEIRO GUTIERREZ",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/diego-monteiro-gutierrez",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/diego-monteiro-gutierrez/1-Thumbnail.jpeg"
      },
      {
        "name": "DIOGO CORSO KRUK",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/diogo-corso-kruk",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/diogo-corso-kruk/1-Thumbnail.jpeg"
      },
      {
        "name": "DANILO ODDONE",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/danilo-oddone",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/danilo-oddone/1-Thumbnail.jpeg"
      },
      {
        "name": "LEONARDO ABILEL HIPÓLITO",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/leonardo-abilel-hipolito",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/leonardo-abilel-hipolito/1-Thumbnail.jpeg"
      },
      {
        "name": "THOR VOLOSHYN MASTROTTI",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/thor-voloshyn-mastrotti",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/thor-voloshyn-mastrotti/1-Thumbnail.jpeg"
      },
      {
        "name": "ANDRÉ THALES DE CARVALHO SIMÕES",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/andre-thales-de-carvalho-simoes",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/andre-thales-de-carvalho-simoes/1-Thumbnail.jpeg"
      },
      {
        "name": "RAPHAEL SANTANA MELO DOS SANTOS",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/raphael-santana-melo-dos-santos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/raphael-santana-melo-dos-santos/1-Thumbnail.jpeg"
      },
      {
        "name": "FERNANDO BURKHARDT ANTONOFF",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/fernando-burkhardt-antonoff",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/fernando-burkhardt-antonoff/1-Thumbnail.jpeg"
      },
      {
        "name": "PEDRO HENRIQUE GOULARTE LIMA",
        "number": 7
      },
      {
        "name": "MATEUS SANTOS MARIN",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/mateus-santos-marin",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/mateus-santos-marin/1-Thumbnail.jpeg"
      },
      {
        "name": "RENATO DE OLIVEIRA LEIS",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/renato-de-oliveira-leis",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/renato-de-oliveira-leis/1-Thumbnail.jpeg"
      },
      {
        "name": "GUSTAVO LESSA TRONCHIN",
        "number": 9,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gustavo-lessa-tronchin",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gustavo-lessa-tronchin/1-Thumbnail.jpeg"
      },
      {
        "name": "VINICIUS HIDEO MIYAGUNI FRANCISCATTE",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbfa/atleta/vinicius-hideo-miyaguni-franciscatte",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/vinicius-hideo-miyaguni-franciscatte/1-Thumbnail.jpeg"
      },
      {
        "name": "FELIPE MORETI ZEITLIN",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/felipe-moreti-zeitlin",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/felipe-moreti-zeitlin/1-Thumbnail.jpeg"
      },
      {
        "name": "PEDRO ANDION DE OLIVEIRA FREITAS",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/pedro-andion-de-oliveira-freitas",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/pedro-andion-de-oliveira-freitas/1-Thumbnail.jpeg"
      },
      {
        "name": "GABRIEL DE ALMEIDA FREITAS",
        "number": 13,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gabriel-de-almeida-freitas",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gabriel-de-almeida-freitas/1-Thumbnail.jpeg"
      },
      {
        "name": "MARCELO ALMEIDA LEITE DOS SANTOS",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/marcelo-almeida-leite-dos-santos-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/marcelo-almeida-leite-dos-santos-/1-Thumbnail.jpeg"
      },
      {
        "name": "RODRIGO VION LOCHETI",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rodrigo-vion-locheti",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rodrigo-vion-locheti/1-Thumbnail.jpeg"
      },
      {
        "name": "LUCCAS DA CUNHA LASTE",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/luccas-da-cunha-laste",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/luccas-da-cunha-laste/1-Thumbnail.jpeg"
      },
      {
        "name": "MARCO ANTÔNIO CHIRI JÚNIOR",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/marco-antonio-chiri-junior",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/marco-antonio-chiri-junior/1-Thumbnail.jpeg"
      },
      {
        "name": "RUI FELIPE DOS SANTOS MOURA",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rui-felipe-dos-santos-moura",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rui-felipe-dos-santos-moura/1-Thumbnail.jpeg"
      },
      {
        "name": "JÚLIO CESAR MATOS DE OLIVEIRA",
        "number": 18
      },
      {
        "name": "GABRIEL KIRSTEN COELHO",
        "number": 19,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gabriel-kirsten-coelho",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gabriel-kirsten-coelho/1-Thumbnail.jpeg"
      },
      {
        "name": "DIEGO QUEIROZ MARQUES",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/diego-queiroz-marques",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/diego-queiroz-marques/1-Thumbnail.jpeg"
      },
      {
        "name": "CAIQUE MOREIRA SOUTO",
        "number": 22,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/caique-moreira-souto-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/caique-moreira-souto-/1-Thumbnail.jpeg"
      },
      {
        "name": "DANILO AUGUSTO SILVA",
        "number": 22,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/danilo-augusto-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/danilo-augusto-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "PIETRO NASCIMENTO MARCHI DE OLIVEIRA",
        "number": 23,
        "profile": "https://plataforma.sporti.com.br/sporti/atleta/pietronascimentomarchideoliveira-ms",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/pietronascimentomarchideoliveira-ms/1-Thumbnail.jpeg"
      },
      {
        "name": "SOCRATES KENTARO MATSUURA",
        "number": 23,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/socrates-kentaro-matsuura",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/socrates-kentaro-matsuura/1-Thumbnail.jpeg"
      },
      {
        "name": "ARTHUR",
        "number": 24,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/arthur-vinicius-da-silva-buonso2",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/arthur-vinicius-da-silva-buonso2/1-Thumbnail.jpeg"
      },
      {
        "name": "RAPHAEL SILVA SOUSA",
        "number": 25,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/raphael-silva-sousa-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/raphael-silva-sousa-/1-Thumbnail.jpeg"
      }
    ]
  },
  "niteroi": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/niteroi-rugby-football-clube",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1/sumula/106510",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1/sumula/106512"
    ],
    "players": [
      {
        "name": "CARLOS EDUARDO BAPTISTA",
        "number": 0,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/carlos-eduardo-baptista",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/carlos-eduardo-baptista/1-Thumbnail.jpeg"
      },
      {
        "name": "FERNANDO DE PAIVA REIS",
        "number": 0,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/fernando-de-paiva-reis",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/fernando-de-paiva-reis/1-Thumbnail.jpeg"
      },
      {
        "name": "GABRIEL DA SILVA MACEDO",
        "number": 0,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gabriel-da-silva-macedo"
      },
      {
        "name": "GABRIEL HENRIQUE FERREIRA ENNES",
        "number": 0,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gabriel-henrique-ferreira-ennes",
        "photo": "https://painel.sporti.com.br/Images/No_img_200x200.png"
      },
      {
        "name": "GEUDSY MARINS ABIB",
        "number": 0,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/geudsy-marins-abib",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/geudsy-marins-abib/1-Thumbnail.jpeg"
      },
      {
        "name": "JOSÉ VÍTOR TAVARES DA COSTA BESSA",
        "number": 0,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/jose-vitor-tavares-da-costa-bessa",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/jose-vitor-tavares-da-costa-bessa/1-Thumbnail.jpeg"
      },
      {
        "name": "PEDRO LUÍS PEREIRA BARBOSA",
        "number": 0,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/pedro-luis-pereira-barbosa",
        "photo": "https://painel.sporti.com.br/Images/No_img_200x200.png"
      },
      {
        "name": "RAPHAEL DE AZEVEDO ROCHA VIEIRA",
        "number": 0,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/raphael-de-azevedo-rocha-vieira"
      },
      {
        "name": "DANIEL CASALINO TEIXEIRA",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/daniel-casalino-teixeira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/daniel-casalino-teixeira/1-Thumbnail.jpeg"
      },
      {
        "name": "EDNILSON DA SILVA JOAQUIM",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/ednilson-da-silva-joaquim",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/ednilson-da-silva-joaquim/1-Thumbnail.jpeg"
      },
      {
        "name": "CAIO FERREIRA IRINEU",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/caio-ferreira-irineu-1",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/caio-ferreira-irineu-1/1-Thumbnail.jpeg"
      },
      {
        "name": "ULISSES MIGUEL DA COSTA CORREIA",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/ulisses-miguel-da-costa-correia",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/ulisses-miguel-da-costa-correia/1-Thumbnail.jpeg"
      },
      {
        "name": "SILAS RODRIGUES DE SOUZA",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/silas-rodrigues-de-souza",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/silas-rodrigues-de-souza/1-Thumbnail.jpeg"
      },
      {
        "name": "LUCAS LIMA MENEZES",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/lucas-lima-menezes-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/lucas-lima-menezes-/1-Thumbnail.jpeg"
      },
      {
        "name": "MATHEUS RAYMOND MARQUES KRAEMER FERREIRA",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/matheus-raymond-marques-kraemer-ferreira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/matheus-raymond-marques-kraemer-ferreira/1-Thumbnail.jpeg"
      },
      {
        "name": "ANDRÉ LUIZ CARESTIATO VILLAÇA",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/andre-luiz-carestiato-villaca",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/andre-luiz-carestiato-villaca/1-Thumbnail.jpeg"
      },
      {
        "name": "HYAN GARCIA SOUSA SILVA",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/hyan-garcia-sousa-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/hyan-garcia-sousa-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "DANIEL LIMA CUNHA",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/daniel-lima-cunha",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/daniel-lima-cunha/1-Thumbnail.jpeg"
      },
      {
        "name": "DANIEL HUBERT GREGG",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/daniel-hubert-gregg",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/daniel-hubert-gregg/1-Thumbnail.jpeg"
      },
      {
        "name": "ROBLEDO MESQUITA DA VEIGA",
        "number": 13,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/robledo-mesquita-da-veiga",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/robledo-mesquita-da-veiga/1-Thumbnail.jpeg"
      },
      {
        "name": "DAVID GRAEL",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/david-grael",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/david-grael/1-Thumbnail.jpeg"
      },
      {
        "name": "MATHEUS SIQUEIRA GALVEAS",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/matheus-siqueira-galveas-",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/matheus-siqueira-galveas-/1-Thumbnail.jpeg"
      },
      {
        "name": "RAFAEL MIRANDA",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rafael-miranda",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rafael-miranda/1-Thumbnail.jpeg"
      },
      {
        "name": "CARLOS BORBA NOBRE MACHADO",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/carlos-borba-nobre-machado",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/carlos-borba-nobre-machado/1-Thumbnail.jpeg"
      },
      {
        "name": "EDUARDO SEIJI TSUMORI",
        "number": 18,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/eduardo-seiji-tsumori",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/eduardo-seiji-tsumori/1-Thumbnail.jpeg"
      },
      {
        "name": "LUCAS RAYMOND MARQUES KRAEMER FERREIRA",
        "number": 19,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/lucas-raymond-marques-kraemer-ferreira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/lucas-raymond-marques-kraemer-ferreira/1-Thumbnail.jpeg"
      },
      {
        "name": "GABRIEL CHEVRAND GREGG",
        "number": 21
      },
      {
        "name": "CAIO MASSARI NAVEGA",
        "number": 23,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/caio-massari-navega"
      }
    ]
  },
  "rio": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/rio-rugby-football-club",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1/sumula/106509",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1/sumula/106511"
    ],
    "players": [
      {
        "name": "EDUARDO ALVES DIOS",
        "number": 1
      },
      {
        "name": "CELSO CANDIDO DE ALMEIDA",
        "number": 2,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/celso-candido-de-almeida",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/celso-candido-de-almeida/1-Thumbnail.jpeg"
      },
      {
        "name": "ELIZEU",
        "number": 3
      },
      {
        "name": "DANIEL LUIZ GASPAR MACABU",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/daniel-luiz-gaspar-macabu",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/daniel-luiz-gaspar-macabu/1-Thumbnail.jpeg"
      },
      {
        "name": "GUILHERME RODRIGUES DE SOUZA PEREIRA",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/guilherme-rodrigues-de-souza-pereira",
        "photo": "https://painel.sporti.com.br/Images/No_img_200x200.png"
      },
      {
        "name": "ARTHUR MONDEGO",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/arthur-felipe-mondego-bezerra",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/arthur-felipe-mondego-bezerra/1-Thumbnail.jpeg"
      },
      {
        "name": "ANDRÉ FERNANDES DE ARAÚJO BAPTISTA",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/andre-fernandes-de-araujo-baptista",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/andre-fernandes-de-araujo-baptista/1-Thumbnail.jpeg"
      },
      {
        "name": "MERLIN VIGNEAULT",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/merlin-vigneault",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/merlin-vigneault/1-Thumbnail.jpeg"
      },
      {
        "name": "DOUGLAS HOLANDA",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/douglas-holanda",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/douglas-holanda/1-Thumbnail.jpeg"
      },
      {
        "name": "FRANKLIN DA CRUZ MAIA",
        "number": 9,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/franklin-da-cruz-maia",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/franklin-da-cruz-maia/1-Thumbnail.jpeg"
      },
      {
        "name": "MARCOS MILIANO DE OLIVEIRA PAIXÃO",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/marcos-miliano-de-oliveira-paixao",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/marcos-miliano-de-oliveira-paixao/1-Thumbnail.jpeg"
      },
      {
        "name": "JOÃO VITOR OASKI DO ESPIRITO SANTO",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-vitor-oaski-do-espirito-santo",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-vitor-oaski-do-espirito-santo/1-Thumbnail.jpeg"
      },
      {
        "name": "KAUÃ EDUARDO JANUARIO PEÇANHA",
        "number": 12
      },
      {
        "name": "LEONARDO CARNEIRO DE OLIVEIRA DA SILVA",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/leonardo-carneiro-de-oliveira-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/leonardo-carneiro-de-oliveira-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "MATHEUS MOREIRA DA SILVA",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/matheus-moreira-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/matheus-moreira-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "ISAAK FERREIRA DA SILVA ALVES AGUIAR",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/isaak-ferreira-da-silva-alves-aguiar",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/isaak-ferreira-da-silva-alves-aguiar/1-Thumbnail.jpeg"
      },
      {
        "name": "MARCOS VINICIUS RODRIGUES DOS ANJOS",
        "number": 16
      },
      {
        "name": "MARCOS LUIZ OLIVEIRA DA SILVA",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/marcos-luiz-oliveira-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/marcos-luiz-oliveira-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "YURI VIEIRA FARIA",
        "number": 18,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/yuri-vieira-faria"
      },
      {
        "name": "DIGÃO",
        "number": 19,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/rodrigo-silva-dos-santos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/rodrigo-silva-dos-santos/1-Thumbnail.jpeg"
      },
      {
        "name": "LUCAS EMANUEL AQUINO CHAGAS",
        "number": 20,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/lucas-emanuel-aquino-chagas"
      },
      {
        "name": "MATHEUS VICTORINO DE OLIVEIRA",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/matheus-victorino-de-oliveira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/matheus-victorino-de-oliveira/1-Thumbnail.jpeg"
      },
      {
        "name": "MIGUEL CARNEIRO DE CASTRO",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/miguel-carneiro-de-castro",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/miguel-carneiro-de-castro/1-Thumbnail.jpeg"
      },
      {
        "name": "HEVERTON PATRICK FERREIRA MACHADO DA SILVA",
        "number": 22,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/heverton-patrick-ferreira-machado-da-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/heverton-patrick-ferreira-machado-da-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "NOA CHAVE",
        "number": 23,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/noa-chave",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/noa-chave/1-Thumbnail.jpeg"
      }
    ]
  },
  "vitoria": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/vitoria-rugby-club3",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1/sumula/106510",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1/sumula/106511"
    ],
    "players": [
      {
        "name": "JOÃO MÁRIO SOARES SILVA",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-mario-soares-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-mario-soares-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "FÁBIO SILVA DE SOUZA",
        "number": 2
      },
      {
        "name": "ERICK MONTEIRO QUIRINO",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/erick-monteiro-quirino",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/erick-monteiro-quirino/1-Thumbnail.jpeg"
      },
      {
        "name": "RICARDO FASSARELLA",
        "number": 3,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/ricardo-fassarella-1",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/ricardo-fassarella-1/1-Thumbnail.jpeg"
      },
      {
        "name": "PAULO CAMARGO BERTOLUCI",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/paulo-camargo-bertoluci",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/paulo-camargo-bertoluci/1-Thumbnail.jpeg"
      },
      {
        "name": "GUILHERME CHITZ NETO",
        "number": 5,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/guilherme-chitz-neto",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/guilherme-chitz-neto/1-Thumbnail.jpeg"
      },
      {
        "name": "FELIPE RAMON GONÇALVES LOPES",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/felipe-ramon-goncalves-lopes",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/felipe-ramon-goncalves-lopes/1-Thumbnail.jpeg"
      },
      {
        "name": "VINICIUS VALVERDE DE ASSIS DUARTE",
        "number": 7,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/vinicius-valverde-de-assis-duarte",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/vinicius-valverde-de-assis-duarte/1-Thumbnail.jpeg"
      },
      {
        "name": "JOÃO PEDRO COSTA DIAS",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-pedro-costa-dias",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-pedro-costa-dias/1-Thumbnail.jpeg"
      },
      {
        "name": "GIANLUCA SCALZI SAMPOGNA",
        "number": 9,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/gianluca-scalzi-sampogna",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/gianluca-scalzi-sampogna/1-Thumbnail.jpeg"
      },
      {
        "name": "MARCANITO",
        "number": 9
      },
      {
        "name": "ANDRÉ",
        "number": 10
      },
      {
        "name": "LUAN CAMARGO CARNEIRO",
        "number": 10,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/luan-camargo-carneiro",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/luan-camargo-carneiro/1-Thumbnail.jpeg"
      },
      {
        "name": "EDUARDO ALMEIDA DE BARROS",
        "number": 11,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/eduardo-almeida-de-barros",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/eduardo-almeida-de-barros/1-Thumbnail.jpeg"
      },
      {
        "name": "GIOVANNI SCALZI SAMPOGNA",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/giovanni-scalzi-sampogna",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/giovanni-scalzi-sampogna/1-Thumbnail.jpeg"
      },
      {
        "name": "HARRISON NEVES MARCIANO",
        "number": 13,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/harrison-neves-marciano",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/harrison-neves-marciano/1-Thumbnail.jpeg"
      },
      {
        "name": "RAPHAEL SANTOS BALMAS",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/raphael-santos-balmas",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/raphael-santos-balmas/1-Thumbnail.jpeg"
      },
      {
        "name": "SAMUEL MARTINS DE MEDEIROS",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/samuel-martins-de-medeiros",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/samuel-martins-de-medeiros/1-Thumbnail.jpeg"
      },
      {
        "name": "DENIS",
        "number": 15
      },
      {
        "name": "JOÃO VICTOR NASCIMENTO MARQUES",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-victor-nascimento-marques",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-victor-nascimento-marques/1-Thumbnail.jpeg"
      },
      {
        "name": "FÁBIO GONÇALVES GOMES",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/fabio-goncalves-gomes",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/fabio-goncalves-gomes/1-Thumbnail.jpeg"
      },
      {
        "name": "ELBER DOS SANTOS PEREIRA",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/elber-dos-santos-pereira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/elber-dos-santos-pereira/1-Thumbnail.jpeg"
      },
      {
        "name": "PEDRO HENRIQUE MARROQUE",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/pedro-henrique-marroque",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/pedro-henrique-marroque/1-Thumbnail.jpeg"
      },
      {
        "name": "ARTHUR COSER CHAGAS",
        "number": 18,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/arthur-coser-chagas",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/arthur-coser-chagas/1-Thumbnail.jpeg"
      },
      {
        "name": "DOUGLAS SILVA DE ARAÚJO",
        "number": 18
      },
      {
        "name": "PEDRO GATTI",
        "number": 19
      },
      {
        "name": "DIEGO MIRANDA FAGUNDES",
        "number": 20
      },
      {
        "name": "THARCIO DALLA BERNARDINA",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/tharcio-dalla-bernardina",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/tharcio-dalla-bernardina/1-Thumbnail.jpeg"
      }
    ]
  },
  "carioca": {
    "source": "https://plataforma.sporti.com.br/CBRU/equipe/carioca-rugby-football-club",
    "competition": "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1",
    "sheets": [
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1/sumula/106509",
      "https://plataforma.sporti.com.br/cbru/campeonatos/2026-6-super-12---primeira-divisao---masculino-rugby-xv-masculino1/sumula/106512"
    ],
    "players": [
      {
        "name": "CALLUM WALTERS",
        "number": 0,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/callum-walters",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/callum-walters/1-Thumbnail.jpeg"
      },
      {
        "name": "DANIEL BRUNO OLIVEIRA DE CARVALHO",
        "number": 0,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/daniel-bruno-oliveira-de-carvalho",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/daniel-bruno-oliveira-de-carvalho/1-Thumbnail.jpeg"
      },
      {
        "name": "DAVID PATTERSON",
        "number": 0,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/david-patterson",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/david-patterson/1-Thumbnail.jpeg"
      },
      {
        "name": "FELIPE IGNACIO MUÑOZ TOLEDO",
        "number": 0,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/felipe-ignacio-munoz-toledo",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/felipe-ignacio-munoz-toledo/1-Thumbnail.jpeg"
      },
      {
        "name": "IVAN FRANKLIN CORREIA NETO",
        "number": 0,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/ivan-franklin-correia-neto",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/ivan-franklin-correia-neto/1-Thumbnail.jpeg"
      },
      {
        "name": "MATHIS MARC JEAN LAUZERAL",
        "number": 0,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/mathis-marc-jean-lauzeral",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/mathis-marc-jean-lauzeral/1-Thumbnail.jpeg"
      },
      {
        "name": "MERLIN PIERRE LLOYD",
        "number": 0
      },
      {
        "name": "PEDRO HENRIQUE LEAL DA ROCHA",
        "number": 0,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/pedro-henrique-leal-da-rocha",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/pedro-henrique-leal-da-rocha/1-Thumbnail.jpeg"
      },
      {
        "name": "THIAGO ELIAS BATISTA DA SILVA",
        "number": 0
      },
      {
        "name": "ULYSSES JERÔNIMO BARREIRA DA SILVA",
        "number": 0,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/ulysses-jeronimo-barreira-da-silva-1",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/ulysses-jeronimo-barreira-da-silva-1/1-Thumbnail.jpeg"
      },
      {
        "name": "PEDRO GABRIEL COSTA TORRES MARTINS",
        "number": 1,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/pedro-gabriel-costa-torres-martins",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/pedro-gabriel-costa-torres-martins/1-Thumbnail.jpeg"
      },
      {
        "name": "LUIZ COUTINHO CALDEIRA",
        "number": 3
      },
      {
        "name": "VINICIUS PEREIRA",
        "number": 4,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/vinicius-pereira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/vinicius-pereira/1-Thumbnail.jpeg"
      },
      {
        "name": "PABLO BULLE PORTILHO DE OLIVEIRA",
        "number": 6,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/pablo-bulle-portilho-de-oliveira",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/pablo-bulle-portilho-de-oliveira/1-Thumbnail.jpeg"
      },
      {
        "name": "CHRISTOPHER DAVID CHATTERTON",
        "number": 8,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/christopher-david-chatterton",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/christopher-david-chatterton/1-Thumbnail.jpeg"
      },
      {
        "name": "THIAGO MONTE DOS SANTOS",
        "number": 9,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/thiago-monte-dos-santos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/thiago-monte-dos-santos/1-Thumbnail.jpeg"
      },
      {
        "name": "JONATHAN CLERC",
        "number": 11
      },
      {
        "name": "ELLIOTT LLOYD WILSON",
        "number": 12,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/elliott-lloyd-wilson",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/elliott-lloyd-wilson/1-Thumbnail.jpeg"
      },
      {
        "name": "LEO AFONSO PEREZ",
        "number": 13,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/leo-afonso-perez",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/leo-afonso-perez/1-Thumbnail.jpeg"
      },
      {
        "name": "DAVID JACOB MARQUES DANTAS",
        "number": 14,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/david-jacob-marques-dantas",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/david-jacob-marques-dantas/1-Thumbnail.jpeg"
      },
      {
        "name": "MARCO AURELIO PACHECO PADILHA FROES",
        "number": 15,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/marco-aurelio-pacheco-padilha-froes",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/marco-aurelio-pacheco-padilha-froes/1-Thumbnail.jpeg"
      },
      {
        "name": "DIEGO FERNANDES XIMENES",
        "number": 16,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/diego-fernandes-ximenes",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/diego-fernandes-ximenes/1-Thumbnail.jpeg"
      },
      {
        "name": "JOÃO HENRIQUE DE ALMEIDA E SILVA",
        "number": 17,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/joao-henrique-de-almeida-e-silva",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/joao-henrique-de-almeida-e-silva/1-Thumbnail.jpeg"
      },
      {
        "name": "MAICON GOUVEIA",
        "number": 18
      },
      {
        "name": "TOMAS PALACIOS",
        "number": 19,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/tomas-palacios",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/tomas-palacios/1-Thumbnail.jpeg"
      },
      {
        "name": "ROMULLO CARDOZO DOS SANTOS",
        "number": 20,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/romullo-cardozo-dos-santos",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/romullo-cardozo-dos-santos/1-Thumbnail.jpeg"
      },
      {
        "name": "RENATO COSTA",
        "number": 21,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/renato-costa",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/renato-costa/1-Thumbnail.jpeg"
      },
      {
        "name": "WESLEY RODRIGUES MENDONÇA",
        "number": 22,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/wesley-rodrigues-mendonca",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/wesley-rodrigues-mendonca/1-Thumbnail.jpeg"
      },
      {
        "name": "KLINSMAN BARBOSA MIRANDA",
        "number": 23,
        "profile": "https://plataforma.sporti.com.br/cbru/atleta/klinsman-barbosa-miranda",
        "photo": "https://painel.sporti.com.br//UserImages/atletas/adulto/klinsman-barbosa-miranda/1-Thumbnail.jpeg"
      }
    ]
  }
};
