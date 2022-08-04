export enum EventType {
  GAME_START = "GameStart",
  CHAMPION_KILL = "ChampionKill",
  MULTIKILL = "Multikill",
  NEW_ITEM = "NewItem",
  PLAYER_LOADED = "PlayerLoaded",
  RANDOM = "Random",
}

export interface LoLEvent {
  EventName: EventType;
  processorId?: number;
}

export interface LoLAPIEvent extends LoLEvent{
  EventID: number;
  EventTime: number;
}

export interface GameStartEvent extends LoLAPIEvent {
}

export interface ChampionKillEvent extends LoLAPIEvent {
  KillerName: string;
  VictimName: string;
  Assisters: string[];
}

export interface MultikillEvent extends ChampionKillEvent {
  KillStreak: MultikillType;
}

export interface NewItemEvent extends LoLEvent {
  item: LoLItem;
  player: Player;
}

export interface PlayerLoadedEvent extends LoLEvent {
  player: Player
}

export interface RandomEvent extends LoLEvent {
}

export enum LoLTeam {
  ORDER = "ORDER",
  CHAOS = "CHAOS",
}

export enum LoLPosition {
  TOP = "TOP",
  JUNGLE = "JUNGLE",
  MIDDLE = "MIDDLE",
  BOTTOM = "BOTTOM",
  SUPPORT = "SUPPORT",
  NONE = "",
}

export enum MultikillType {
  DOUBLE = 2,
  TRIPPLE = 3,
  QUADRA = 4,
  PENTA = 5,
}

export interface Player {
  championName: LoLChampionName;
  isBot: boolean;
  isDead: boolean;
  items: LoLItem[];
  level: number;
  position: LoLPosition;
  rawChampionName: string;
  rawSkinName: string;
  respawnTimer: 0;
  runes: PlayerRunes;
  scores: PlayerScores;
  skinID: number;
  skinName: string;
  summonerName: string;
  summonerSpells: PlayerSummonerSpells;
  team: LoLTeam;
}

export interface LoLItem {
  canUse: boolean;
  consumable: false;
  count: number;
  displayName: string;
  itemID: LoLItemID;
  price: number;
  rawDescription: string;
  rawDisplayName: string;
  slot: number;
}

export interface PlayerRunes {
  keystone: Rune;
  primaryRuneTree: Rune;
  secondaryRuneTree: Rune;
}

export interface Rune {
  displayName: string;
  id: number;
  rawDescription: string;
  rawDisplayName: string;
}

export interface PlayerScores {
  assists: number;
  creepScore: number;
  deaths: number;
  kills: number;
  wardScore: number;
}

export interface PlayerSummonerSpells {
  summonerSpellOne: SummonerSpell;
  summonerSpellTwo: SummonerSpell;
}

export interface SummonerSpell {
  displayName: string;
  rawDescription: string;
  rawDisplayName: string;
}


/*
  How to semi automatically get new champion enum:

  a = http://ddragon.leagueoflegends.com/cdn/12.14.1/data/en_US/champion.json
  b = Object.keys(a.data).map(k => a.data[k].id);
  c = b.reduce((acc,cur) => {
    return (
      `${acc} ${cur.toUpperCase()} = "${cur}",` 
    )
  },"");

  Update version in url (a) to desired version. Get JSON data from url and save into a.
  Run rest of code in js console - output will be in c
*/
export enum LoLChampionName {
  AATROX = "Aatrox",
  AHRI = "Ahri",
  AKALI = "Akali",
  AKSHAN = "Akshan",
  ALISTAR = "Alistar",
  AMUMU = "Amumu",
  ANIVIA = "Anivia",
  ANNIE = "Annie",
  APHELIOS = "Aphelios",
  ASHE = "Ashe",
  AURELIONSOL = "AurelionSol",
  AZIR = "Azir",
  BARD = "Bard",
  BELVETH = "Belveth",
  BLITZCRANK = "Blitzcrank",
  BRAND = "Brand",
  BRAUM = "Braum",
  CAITLYN = "Caitlyn",
  CAMILLE = "Camille",
  CASSIOPEIA = "Cassiopeia",
  CHOGATH = "Chogath",
  CORKI = "Corki",
  DARIUS = "Darius",
  DIANA = "Diana",
  DRAVEN = "Draven",
  DRMUNDO = "DrMundo",
  EKKO = "Ekko",
  ELISE = "Elise",
  EVELYNN = "Evelynn",
  EZREAL = "Ezreal",
  FIDDLESTICKS = "Fiddlesticks",
  FIORA = "Fiora",
  FIZZ = "Fizz",
  GALIO = "Galio",
  GANGPLANK = "Gangplank",
  GAREN = "Garen",
  GNAR = "Gnar",
  GRAGAS = "Gragas",
  GRAVES = "Graves",
  GWEN = "Gwen",
  HECARIM = "Hecarim",
  HEIMERDINGER = "Heimerdinger",
  ILLAOI = "Illaoi",
  IRELIA = "Irelia",
  IVERN = "Ivern",
  JANNA = "Janna",
  JARVANIV = "JarvanIV",
  JAX = "Jax",
  JAYCE = "Jayce",
  JHIN = "Jhin",
  JINX = "Jinx",
  KAISA = "Kaisa",
  KALISTA = "Kalista",
  KARMA = "Karma",
  KARTHUS = "Karthus",
  KASSADIN = "Kassadin",
  KATARINA = "Katarina",
  KAYLE = "Kayle",
  KAYN = "Kayn",
  KENNEN = "Kennen",
  KHAZIX = "Khazix",
  KINDRED = "Kindred",
  KLED = "Kled",
  KOGMAW = "KogMaw",
  LEBLANC = "Leblanc",
  LEESIN = "LeeSin",
  LEONA = "Leona",
  LILLIA = "Lillia",
  LISSANDRA = "Lissandra",
  LUCIAN = "Lucian",
  LULU = "Lulu",
  LUX = "Lux",
  MALPHITE = "Malphite",
  MALZAHAR = "Malzahar",
  MAOKAI = "Maokai",
  MASTERYI = "MasterYi",
  MISSFORTUNE = "MissFortune",
  MONKEYKING = "MonkeyKing",
  MORDEKAISER = "Mordekaiser",
  MORGANA = "Morgana",
  NAMI = "Nami",
  NASUS = "Nasus",
  NAUTILUS = "Nautilus",
  NEEKO = "Neeko",
  NIDALEE = "Nidalee",
  NILAH = "Nilah",
  NOCTURNE = "Nocturne",
  NUNU = "Nunu",
  OLAF = "Olaf",
  ORIANNA = "Orianna",
  ORNN = "Ornn",
  PANTHEON = "Pantheon",
  POPPY = "Poppy",
  PYKE = "Pyke",
  QIYANA = "Qiyana",
  QUINN = "Quinn",
  RAKAN = "Rakan",
  RAMMUS = "Rammus",
  REKSAI = "RekSai",
  RELL = "Rell",
  RENATA = "Renata",
  RENEKTON = "Renekton",
  RENGAR = "Rengar",
  RIVEN = "Riven",
  RUMBLE = "Rumble",
  RYZE = "Ryze",
  SAMIRA = "Samira",
  SEJUANI = "Sejuani",
  SENNA = "Senna",
  SERAPHINE = "Seraphine",
  SETT = "Sett",
  SHACO = "Shaco",
  SHEN = "Shen",
  SHYVANA = "Shyvana",
  SINGED = "Singed",
  SION = "Sion",
  SIVIR = "Sivir",
  SKARNER = "Skarner",
  SONA = "Sona",
  SORAKA = "Soraka",
  SWAIN = "Swain",
  SYLAS = "Sylas",
  SYNDRA = "Syndra",
  TAHMKENCH = "TahmKench",
  TALIYAH = "Taliyah",
  TALON = "Talon",
  TARIC = "Taric",
  TEEMO = "Teemo",
  THRESH = "Thresh",
  TRISTANA = "Tristana",
  TRUNDLE = "Trundle",
  TRYNDAMERE = "Tryndamere",
  TWISTEDFATE = "TwistedFate",
  TWITCH = "Twitch",
  UDYR = "Udyr",
  URGOT = "Urgot",
  VARUS = "Varus",
  VAYNE = "Vayne",
  VEIGAR = "Veigar",
  VELKOZ = "Velkoz",
  VEX = "Vex",
  VI = "Vi",
  VIEGO = "Viego",
  VIKTOR = "Viktor",
  VLADIMIR = "Vladimir",
  VOLIBEAR = "Volibear",
  WARWICK = "Warwick",
  XAYAH = "Xayah",
  XERATH = "Xerath",
  XINZHAO = "XinZhao",
  YASUO = "Yasuo",
  YONE = "Yone",
  YORICK = "Yorick",
  YUUMI = "Yuumi",
  ZAC = "Zac",
  ZED = "Zed",
  ZERI = "Zeri",
  ZIGGS = "Ziggs",
  ZILEAN = "Zilean",
  ZOE = "Zoe",
  ZYRA = "Zyra",
}

/*
 How to semi automatically get new item enum:

  a = http://ddragon.leagueoflegends.com/cdn/12.14.1/data/en_US/item.json
  b = Object.keys(a.data).map(k => ({k: k,v: a.data[k].name}))
  c = b.reduce((acc,cur) => {
    return (
      `${acc} ${cur.v.toUpperCase().replaceAll("'",'').replaceAll(/[\-. ]+/g,"_")} = ${cur.k},` 
    )
  },"");

  Update version in url (a) to desired version. Get JSON data from url and save into a.
  Run rest of code in js console - output will be in c

  The following items will need manual attention:
    1502 1506           - turret armor plating - can be removed
    1516 1517 1518 1519 - structure bounties   - can be removed
    2421 2424           - broken stopwatch     - rename
      - 2421 -> BROKEN_STOPWATCH_SHOP
      - 2424 -> BROKEN_STOPWATCH_RUNE
    3599 3600           - kalistas black spear - rename
      - 3599 -> KALISTAS_BLACK_SPEAR_KALISTA
      - 3600 -> KALISTAS_BLACK_SPEAR_SYLAS
    3901 3902 3903      - Gangplank ultimate   - rename
      - 3901 -> FIRE_AT_WILL
      - 3902 -> DEATHS_DAUGHTER
      - 3903 -> RAISE_MORALE
*/

export enum LoLItemID {
  BOOTS = 1001,
  FAERIE_CHARM = 1004,
  REJUVENATION_BEAD = 1006,
  GIANTS_BELT = 1011,
  CLOAK_OF_AGILITY = 1018,
  BLASTING_WAND = 1026,
  SAPPHIRE_CRYSTAL = 1027,
  RUBY_CRYSTAL = 1028,
  CLOTH_ARMOR = 1029,
  CHAIN_VEST = 1031,
  NULL_MAGIC_MANTLE = 1033,
  EMBERKNIFE = 1035,
  LONG_SWORD = 1036,
  PICKAXE = 1037,
  B_F_SWORD = 1038,
  HAILBLADE = 1039,
  OBSIDIAN_EDGE = 1040,
  DAGGER = 1042,
  RECURVE_BOW = 1043,
  AMPLIFYING_TOME = 1052,
  VAMPIRIC_SCEPTER = 1053,
  DORANS_SHIELD = 1054,
  DORANS_BLADE = 1055,
  DORANS_RING = 1056,
  NEGATRON_CLOAK = 1057,
  NEEDLESSLY_LARGE_ROD = 1058,
  DARK_SEAL = 1082,
  CULL = 1083,
  PENETRATING_BULLETS = 1500,
  FORTIFICATION = 1501,
  WARDENS_EYE = 1503,
  VANGUARD = 1504,
  LIGHTNING_ROD = 1505,
  OVERCHARGED = 1507,
  ANTI_TOWER_SOCKS = 1508,
  GUSTO = 1509,
  PHREAKISH_GUSTO = 1510,
  SUPER_MECH_ARMOR = 1511,
  SUPER_MECH_POWER_FIELD = 1512,
  TURRET_PLATING = 1515,
  HEALTH_POTION = 2003,
  TOTAL_BISCUIT_OF_EVERLASTING_WILL = 2010,
  KIRCHEIS_SHARD = 2015,
  REFILLABLE_POTION = 2031,
  CORRUPTING_POTION = 2033,
  GUARDIANS_HORN = 2051,
  PORO_SNAX = 2052,
  CONTROL_WARD = 2055,
  SHURELYAS_BATTLESONG = 2065,
  ELIXIR_OF_IRON = 2138,
  ELIXIR_OF_SORCERY = 2139,
  ELIXIR_OF_WRATH = 2140,
  MINION_DEMATERIALIZER = 2403,
  COMMENCING_STOPWATCH = 2419,
  STOPWATCH = 2420,
  BROKEN_STOPWATCH_SHOP = 2421,
  SLIGHTLY_MAGICAL_FOOTWEAR = 2422,
  PERFECTLY_TIMED_STOPWATCH = 2423,
  BROKEN_STOPWATCH_RUNE = 2424,
  EVENSHROUD = 3001,
  ARCHANGELS_STAFF = 3003,
  MANAMUNE = 3004,
  BERSERKERS_GREAVES = 3006,
  BOOTS_OF_SWIFTNESS = 3009,
  CHEMTECH_PUTRIFIER = 3011,
  SORCERERS_SHOES = 3020,
  GLACIAL_BUCKLER = 3024,
  GUARDIAN_ANGEL = 3026,
  INFINITY_EDGE = 3031,
  MORTAL_REMINDER = 3033,
  LAST_WHISPER = 3035,
  LORD_DOMINIKS_REGARDS = 3036,
  SERAPHS_EMBRACE = 3040,
  MEJAIS_SOULSTEALER = 3041,
  MURAMANA = 3042,
  PHAGE = 3044,
  PHANTOM_DANCER = 3046,
  PLATED_STEELCAPS = 3047,
  ZEKES_CONVERGENCE = 3050,
  HEARTHBOUND_AXE = 3051,
  STERAKS_GAGE = 3053,
  SHEEN = 3057,
  SPIRIT_VISAGE = 3065,
  WINGED_MOONPLATE = 3066,
  KINDLEGEM = 3067,
  SUNFIRE_AEGIS = 3068,
  TEAR_OF_THE_GODDESS = 3070,
  BLACK_CLEAVER = 3071,
  BLOODTHIRSTER = 3072,
  RAVENOUS_HYDRA = 3074,
  THORNMAIL = 3075,
  BRAMBLE_VEST = 3076,
  TIAMAT = 3077,
  TRINITY_FORCE = 3078,
  WARDENS_MAIL = 3082,
  WARMOGS_ARMOR = 3083,
  RUNAANS_HURRICANE = 3085,
  ZEAL = 3086,
  RABADONS_DEATHCAP = 3089,
  WITS_END = 3091,
  RAPID_FIRECANNON = 3094,
  STORMRAZOR = 3095,
  LICH_BANE = 3100,
  BANSHEES_VEIL = 3102,
  AEGIS_OF_THE_LEGION = 3105,
  REDEMPTION = 3107,
  FIENDISH_CODEX = 3108,
  KNIGHTS_VOW = 3109,
  FROZEN_HEART = 3110,
  MERCURYS_TREADS = 3111,
  GUARDIANS_ORB = 3112,
  AETHER_WISP = 3113,
  FORBIDDEN_IDOL = 3114,
  NASHORS_TOOTH = 3115,
  RYLAIS_CRYSTAL_SCEPTER = 3116,
  MOBILITY_BOOTS = 3117,
  WINTERS_APPROACH = 3119,
  FIMBULWINTER = 3121,
  EXECUTIONERS_CALLING = 3123,
  GUINSOOS_RAGEBLADE = 3124,
  CAULFIELDS_WARHAMMER = 3133,
  SERRATED_DIRK = 3134,
  VOID_STAFF = 3135,
  MERCURIAL_SCIMITAR = 3139,
  QUICKSILVER_SASH = 3140,
  YOUMUUS_GHOSTBLADE = 3142,
  RANDUINS_OMEN = 3143,
  HEXTECH_ALTERNATOR = 3145,
  HEXTECH_ROCKETBELT = 3152,
  BLADE_OF_THE_RUINED_KING = 3153,
  HEXDRINKER = 3155,
  MAW_OF_MALMORTIUS = 3156,
  ZHONYAS_HOURGLASS = 3157,
  IONIAN_BOOTS_OF_LUCIDITY = 3158,
  MORELLONOMICON = 3165,
  GUARDIANS_BLADE = 3177,
  UMBRAL_GLAIVE = 3179,
  HULLBREAKER = 3181,
  GUARDIANS_HAMMER = 3184,
  LOCKET_OF_THE_IRON_SOLARI = 3190,
  SEEKERS_ARMGUARD = 3191,
  GARGOYLE_STONEPLATE = 3193,
  SPECTRES_COWL = 3211,
  MIKAELS_BLESSING = 3222,
  SCARECROW_EFFIGY = 3330,
  STEALTH_WARD = 3340,
  FARSIGHT_ALTERATION = 3363,
  ORACLE_LENS = 3364,
  YOUR_CUT = 3400,
  ARDENT_CENSER = 3504,
  ESSENCE_REAVER = 3508,
  EYE_OF_THE_HERALD = 3513,
  KALISTAS_BLACK_SPEAR_KALISTA = 3599,
  KALISTAS_BLACK_SPEAR_SYLAS = 3600,
  DEAD_MANS_PLATE = 3742,
  TITANIC_HYDRA = 3748,
  CRYSTALLINE_BRACER = 3801,
  LOST_CHAPTER = 3802,
  EDGE_OF_NIGHT = 3814,
  SPELLTHIEFS_EDGE = 3850,
  FROSTFANG = 3851,
  SHARD_OF_TRUE_ICE = 3853,
  STEEL_SHOULDERGUARDS = 3854,
  RUNESTEEL_SPAULDERS = 3855,
  PAULDRONS_OF_WHITEROCK = 3857,
  RELIC_SHIELD = 3858,
  TARGONS_BUCKLER = 3859,
  BULWARK_OF_THE_MOUNTAIN = 3860,
  SPECTRAL_SICKLE = 3862,
  HARROWING_CRESCENT = 3863,
  BLACK_MIST_SCYTHE = 3864,
  FIRE_AT_WILL = 3901,
  DEATHS_DAUGHTER = 3902,
  RAISE_MORALE = 3903,
  OBLIVION_ORB = 3916,
  IMPERIAL_MANDATE = 4005,
  FORCE_OF_NATURE = 4401,
  THE_GOLDEN_SPATULA = 4403,
  HORIZON_FOCUS = 4628,
  COSMIC_DRIVE = 4629,
  BLIGHTING_JEWEL = 4630,
  VERDANT_BARRIER = 4632,
  RIFTMAKER = 4633,
  LEECHING_LEER = 4635,
  NIGHT_HARVESTER = 4636,
  DEMONIC_EMBRACE = 4637,
  WATCHFUL_WARDSTONE = 4638,
  STIRRING_WARDSTONE = 4641,
  BANDLEGLASS_MIRROR = 4642,
  VIGILANT_WARDSTONE = 4643,
  CROWN_OF_THE_SHATTERED_QUEEN = 4644,
  SHADOWFLAME = 4645,
  IRONSPIKE_WHIP = 6029,
  SILVERMERE_DAWN = 6035,
  DEATHS_DANCE = 6333,
  CHEMPUNK_CHAINSWORD = 6609,
  STAFF_OF_FLOWING_WATER = 6616,
  MOONSTONE_RENEWER = 6617,
  GOREDRINKER = 6630,
  STRIDEBREAKER = 6631,
  DIVINE_SUNDERER = 6632,
  LIANDRYS_ANGUISH = 6653,
  LUDENS_TEMPEST = 6655,
  EVERFROST = 6656,
  BAMIS_CINDER = 6660,
  FROSTFIRE_GAUNTLET = 6662,
  TURBO_CHEMTANK = 6664,
  NOONQUIVER = 6670,
  GALEFORCE = 6671,
  KRAKEN_SLAYER = 6672,
  IMMORTAL_SHIELDBOW = 6673,
  NAVORI_QUICKBLADES = 6675,
  THE_COLLECTOR = 6676,
  RAGEKNIFE = 6677,
  DUSKBLADE_OF_DRAKTHARR = 6691,
  ECLIPSE = 6692,
  PROWLERS_CLAW = 6693,
  SERYLDAS_GRUDGE = 6694,
  SERPENTS_FANG = 6695,
  AXIOM_ARC = 6696,
  SANDSHRIKES_CLAW = 7000,
  SYZYGY = 7001,
  DRAKTHARRS_SHADOWCARVER = 7002,
  TURBOCHARGED_HEXPERIMENT = 7003,
  FORGEFIRE_CREST = 7004,
  RIMEFORGED_GRASP = 7005,
  TYPHOON = 7006,
  WYRMFALLEN_SACRIFICE = 7007,
  BLOODWARD = 7008,
  ICATHIAS_CURSE = 7009,
  VESPERTIDE = 7010,
  UPGRADED_AEROPACK = 7011,
  LIANDRYS_LAMENT = 7012,
  EYE_OF_LUDEN = 7013,
  ETERNAL_WINTER = 7014,
  CEASELESS_HUNGER = 7015,
  DREAMSHATTER = 7016,
  DEICIDE = 7017,
  INFINITY_FORCE = 7018,
  RELIQUARY_OF_THE_GOLDEN_DAWN = 7019,
  SHURELYAS_REQUIEM = 7020,
  STARCASTER = 7021,
  SEAT_OF_COMMAND = 7022,
  EQUINOX = 7023,
  CAESURA = 7024,
  GANGPLANK_PLACEHOLDER = 7050,
  ANATHEMAS_CHAINS = 8001,
  ABYSSAL_MASK = 8020,
}