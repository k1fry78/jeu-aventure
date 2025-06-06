const objets = [
  // FEU
  {
    nom: "Talisman du feu",
    description: "Augmente les dégâts de feu de 5 et donne 10 mana.",
    hp: 0,
    bonus: 5,
    mana: 10,
    category: "feu",
  },
  {
    nom: "Cape flamboyante",
    description: "Augmente les dégâts de feu de 3 et donne 15 PV.",
    hp: 15,
    bonus: 3,
    category: "feu",
  },
  {
    nom: "Bague incandescente",
    description: "Augmente les dégâts de feu de 2 et donne 5 mana.",
    hp: 0,
    bonus: 2,
    mana: 5,
    category: "feu",
  },
  {
    nom: "Sceptre volcanique",
    description: "Augmente les dégâts de feu de 4 et donne 20 PV.",
    hp: 20,
    bonus: 4,
    category: "feu",
  },
  {
    nom: "Amulette ardente",
    description: "Augmente les dégâts de feu de 3, 10 PV et 5 mana.",
    hp: 10,
    bonus: 3,
    mana: 5,
    category: "feu",
  },

  // FROID
  {
    nom: "Anneau de la glace",
    description: "Augmente les dégâts de froid de 4 et donne 10 mana.",
    hp: 0,
    bonus: 4,
    mana: 10,
    category: "froid",
  },
  {
    nom: "Amulette du blizzard",
    description: "Augmente les dégâts de froid de 2 et donne 15 PV.",
    hp: 15,
    bonus: 2,
    category: "froid",
  },
  {
    nom: "Cape polaire",
    description: "Augmente les dégâts de froid de 3 et donne 5 mana.",
    hp: 0,
    bonus: 3,
    mana: 5,
    category: "froid",
  },
  {
    nom: "Sceptre gelé",
    description: "Augmente les dégâts de froid de 5 et donne 20 PV.",
    hp: 20,
    bonus: 5,
    category: "froid",
  },
  {
    nom: "Broche hivernale",
    description: "Augmente les dégâts de froid de 2, 10 PV et 5 mana.",
    hp: 10,
    bonus: 2,
    mana: 5,
    category: "froid",
  },

  // FOUDRE
  {
    nom: "Bracelet du tonnerre",
    description: "Augmente les dégâts de foudre de 6 et donne 10 mana.",
    hp: 0,
    bonus: 6,
    mana: 10,
    category: "foudre",
  },
  {
    nom: "Orbe électrique",
    description: "Augmente les dégâts de foudre de 3 et donne 15 PV.",
    hp: 15,
    bonus: 3,
    category: "foudre",
  },
  {
    nom: "Bague statique",
    description: "Augmente les dégâts de foudre de 2 et donne 5 mana.",
    hp: 0,
    bonus: 2,
    mana: 5,
    category: "foudre",
  },
  {
    nom: "Sceptre tempête",
    description: "Augmente les dégâts de foudre de 4 et donne 20 PV.",
    hp: 20,
    bonus: 4,
    category: "foudre",
  },
  {
    nom: "Amulette d'éclair",
    description: "Augmente les dégâts de foudre de 3, 10 PV et 5 mana.",
    hp: 10,
    bonus: 3,
    mana: 5,
    category: "foudre",
  },

  // BASE
  {
    nom: "Épée affûtée",
    description: "Augmente les dégâts de base de 5 et donne 10 mana.",
    hp: 0,
    bonus: 5,
    mana: 10,
    category: "base",
  },
  {
    nom: "Ceinture de force",
    description: "Augmente les dégâts de base de 4 et donne 15 PV.",
    hp: 15,
    bonus: 4,
    category: "base",
  },
  {
    nom: "Bouclier solide",
    description: "Augmente les dégâts de base de 2 et donne 5 mana.",
    hp: 0,
    bonus: 2,
    mana: 5,
    category: "base",
  },
  {
    nom: "Gants robustes",
    description: "Augmente les dégâts de base de 3 et donne 20 PV.",
    hp: 20,
    bonus: 3,
    category: "base",
  },
  {
    nom: "Amulette du guerrier",
    description: "Augmente les dégâts de base de 2, 10 PV et 5 mana.",
    hp: 10,
    bonus: 2,
    mana: 5,
    category: "base",
  },

  // ARC
  {
    nom: "Arc elfique",
    description: "Augmente les dégâts d'arc de 5 et donne 10 mana.",
    hp: 0,
    bonus: 5,
    mana: 10,
    category: "arc",
  },
  {
    nom: "Carquois précis",
    description: "Augmente les dégâts d'arc de 3 et donne 15 PV.",
    hp: 15,
    bonus: 3,
    category: "arc",
  },
  {
    nom: "Bracelet du chasseur",
    description: "Augmente les dégâts d'arc de 2 et donne 5 mana.",
    hp: 0,
    bonus: 2,
    mana: 5,
    category: "arc",
  },
  {
    nom: "Gants de tir",
    description: "Augmente les dégâts d'arc de 4 et donne 20 PV.",
    hp: 20,
    bonus: 4,
    category: "arc",
  },
  {
    nom: "Amulette de l'archer",
    description: "Augmente les dégâts d'arc de 3, 10 PV et 5 mana.",
    hp: 10,
    bonus: 3,
    mana: 5,
    category: "arc",
  },

  // DAGUE
  {
    nom: "Dague rapide",
    description: "Augmente les dégâts de dague de 2 et donne 10 mana.",
    hp: 0,
    bonus: 2,
    mana: 10,
    category: "dague",
  },
  {
    nom: "Lame venimeuse",
    description: "Augmente les dégâts de dague de 4 et donne 15 PV.",
    hp: 15,
    bonus: 4,
    category: "dague",
  },
  {
    nom: "Anneau de l'assassin",
    description: "Augmente les dégâts de dague de 3 et donne 5 mana.",
    hp: 0,
    bonus: 3,
    mana: 5,
    category: "dague",
  },
  {
    nom: "Gants furtifs",
    description: "Augmente les dégâts de dague de 5 et donne 20 PV.",
    hp: 20,
    bonus: 5,
    category: "dague",
  },
  {
    nom: "Amulette de l'ombre",
    description: "Augmente les dégâts de dague de 2, 10 PV et 5 mana.",
    hp: 10,
    bonus: 2,
    mana: 5,
    category: "dague",
  },

  // FAMILIER
  {
    nom: "Collier animalier",
    description: "Augmente les dégâts de familier de 3 et donne 10 mana.",
    hp: 0,
    bonus: 3,
    mana: 10,
    category: "familier",
  },
  {
    nom: "Sifflet magique",
    description: "Augmente les dégâts de familier de 2 et donne 15 PV.",
    hp: 15,
    bonus: 2,
    category: "familier",
  },
  {
    nom: "Cape bestiale",
    description: "Augmente les dégâts de familier de 4 et donne 5 mana.",
    hp: 0,
    bonus: 4,
    mana: 5,
    category: "familier",
  },
  {
    nom: "Gants du dresseur",
    description: "Augmente les dégâts de familier de 5 et donne 20 PV.",
    hp: 20,
    bonus: 5,
    category: "familier",
  },
  {
    nom: "Amulette du compagnon",
    description: "Augmente les dégâts de familier de 2, 10 PV et 5 mana.",
    hp: 10,
    bonus: 2,
    mana: 5,
    category: "familier",
  },

  // PUISSANCE
  {
    nom: "Amulette de puissance",
    description: "Augmente les dégâts de puissance de 6 et donne 10 mana.",
    hp: 0,
    bonus: 6,
    mana: 10,
    category: "puissance",
  },
  {
    nom: "Gants du colosse",
    description: "Augmente les dégâts de puissance de 4 et donne 15 PV.",
    hp: 15,
    bonus: 4,
    category: "puissance",
  },
  {
    nom: "Bracelet de force",
    description: "Augmente les dégâts de puissance de 3 et donne 5 mana.",
    hp: 0,
    bonus: 3,
    mana: 5,
    category: "puissance",
  },
  {
    nom: "Ceinture du titan",
    description: "Augmente les dégâts de puissance de 5 et donne 20 PV.",
    hp: 20,
    bonus: 5,
    category: "puissance",
  },
  {
    nom: "Amulette du géant",
    description: "Augmente les dégâts de puissance de 2, 10 PV et 5 mana.",
    hp: 10,
    bonus: 2,
    mana: 5,
    category: "puissance",
  },

  // RAPIDE
  {
    nom: "Bottes agiles",
    description: "Augmente les dégâts rapides de 3 et donne 10 mana.",
    hp: 0,
    bonus: 3,
    mana: 10,
    category: "rapide",
  },
  {
    nom: "Cape du vent",
    description: "Augmente les dégâts rapides de 2 et donne 15 PV.",
    hp: 15,
    bonus: 2,
    category: "rapide",
  },
  {
    nom: "Bracelet de vitesse",
    description: "Augmente les dégâts rapides de 4 et donne 5 mana.",
    hp: 0,
    bonus: 4,
    mana: 5,
    category: "rapide",
  },
  {
    nom: "Gants du sprinteur",
    description: "Augmente les dégâts rapides de 5 et donne 20 PV.",
    hp: 20,
    bonus: 5,
    category: "rapide",
  },
  {
    nom: "Amulette du lièvre",
    description: "Augmente les dégâts rapides de 2, 10 PV et 5 mana.",
    hp: 10,
    bonus: 2,
    mana: 5,
    category: "rapide",
  },

  // CRI
  {
    nom: "Cor du guerrier",
    description: "Augmente les dégâts de cri de 5 et donne 10 mana.",
    hp: 0,
    bonus: 5,
    mana: 10,
    category: "cri",
  },
  {
    nom: "Médaillon du hurlement",
    description: "Augmente les dégâts de cri de 3 et donne 15 PV.",
    hp: 15,
    bonus: 3,
    category: "cri",
  },
  {
    nom: "Bracelet du hurleur",
    description: "Augmente les dégâts de cri de 2 et donne 5 mana.",
    hp: 0,
    bonus: 2,
    mana: 5,
    category: "cri",
  },
  {
    nom: "Gants du tonnerre",
    description: "Augmente les dégâts de cri de 4 et donne 20 PV.",
    hp: 20,
    bonus: 4,
    category: "cri",
  },
  {
    nom: "Amulette du cri",
    description: "Augmente les dégâts de cri de 2, 10 PV et 5 mana.",
    hp: 10,
    bonus: 2,
    mana: 5,
    category: "cri",
  },

  // --------- ITEMS "TOUT" (bonus toutes catégories) ---------
  {
    nom: "Pierre universelle",
    description:
      "Augmente les dégâts de toutes les compétences de 2 et donne 10 mana.",
    hp: 0,
    bonus: 2,
    mana: 10,
    category: "tout",
  },
  {
    nom: "Bague de l'aventurier",
    description:
      "Augmente les dégâts de toutes les compétences de 1 et donne 15 PV.",
    hp: 15,
    bonus: 1,
    category: "tout",
  },
  {
    nom: "Amulette ancestrale",
    description:
      "Augmente les dégâts de toutes les compétences de 3 et donne 5 mana.",
    hp: 0,
    bonus: 3,
    mana: 5,
    category: "tout",
  },
  {
    nom: "Cape du héros",
    description:
      "Augmente les dégâts de toutes les compétences de 2 et donne 20 PV.",
    hp: 20,
    bonus: 2,
    category: "tout",
  },
  {
    nom: "Talisman du champion",
    description:
      "Augmente les dégâts de toutes les compétences de 4 et donne 10 mana.",
    hp: 0,
    bonus: 4,
    mana: 10,
    category: "tout",
  },
  {
    nom: "Bracelet d'énergie",
    description:
      "Augmente les dégâts de toutes les compétences de 1 et donne 5 mana.",
    hp: 0,
    bonus: 1,
    mana: 5,
    category: "tout",
  },
  {
    nom: "Médaillon du destin",
    description:
      "Augmente les dégâts de toutes les compétences de 2 et donne 10 PV.",
    hp: 10,
    bonus: 2,
    category: "tout",
  },
  {
    nom: "Ceinture du conquérant",
    description:
      "Augmente les dégâts de toutes les compétences de 3 et donne 5 mana.",
    hp: 0,
    bonus: 3,
    mana: 5,
    category: "tout",
  },
  {
    nom: "Orbe mystique",
    description:
      "Augmente les dégâts de toutes les compétences de 2 et donne 20 PV.",
    hp: 20,
    bonus: 2,
    category: "tout",
  },
  {
    nom: "Gants de la victoire",
    description:
      "Augmente les dégâts de toutes les compétences de 1, 10 PV et 5 mana.",
    hp: 10,
    bonus: 1,
    mana: 5,
    category: "tout",
  },
  {
    nom: "Couronne du Roi-Dieu",
    description: "Légendaire : +5 dégâts, +50 PV, +50 mana, +100 XP.",
    bonus: 5,
    hp: 50,
    mana: 50,
    xp: 100,
    category: "tout",
    legendaire: true,
  },
  {
    nom: "Étoile du Destin",
    description: "Légendaire : +4 dégâts, +40 PV, +40 mana, +80 XP.",
    bonus: 4,
    hp: 40,
    mana: 40,
    xp: 80,
    category: "tout",
    legendaire: true,
  },
  {
    nom: "Anneau de l'Éternité",
    description: "Légendaire : +3 dégâts, +30 PV, +60 mana, +60 XP.",
    bonus: 3,
    hp: 30,
    mana: 60,
    xp: 60,
    category: "tout",
    legendaire: true,
  },
  {
    nom: "Cape du Phénix",
    description: "Légendaire : +6 dégâts, +60 PV, +30 mana, +120 XP.",
    bonus: 6,
    hp: 60,
    mana: 30,
    xp: 120,
    category: "tout",
    legendaire: true,
  },
  {
    nom: "Sceptre des Anciens",
    description: "Légendaire : +7 dégâts, +35 PV, +70 mana, +140 XP.",
    bonus: 7,
    hp: 35,
    mana: 70,
    xp: 140,
    category: "tout",
    legendaire: true,
  },
  {
    nom: "Médaillon du Crépuscule",
    description: "Légendaire : +4 dégâts, +80 PV, +20 mana, +90 XP.",
    bonus: 4,
    hp: 80,
    mana: 20,
    xp: 90,
    category: "tout",
    legendaire: true,
  },
  {
    nom: "Talisman du Dragon",
    description: "Légendaire : +8 dégâts, +20 PV, +80 mana, +160 XP.",
    bonus: 8,
    hp: 20,
    mana: 80,
    xp: 160,
    category: "tout",
    legendaire: true,
  },
  {
    nom: "Orbe de l'Infini",
    description: "Légendaire : +5 dégâts, +100 PV, +50 mana, +200 XP.",
    bonus: 5,
    hp: 100,
    mana: 50,
    xp: 200,
    category: "tout",
    legendaire: true,
  },
  {
    nom: "Gants de la Légende",
    description: "Légendaire : +6 dégâts, +60 PV, +60 mana, +60 XP.",
    bonus: 6,
    hp: 60,
    mana: 60,
    xp: 60,
    category: "tout",
    legendaire: true,
  },
  {
    nom: "Ceinture du Titan",
    description: "Légendaire : +7 dégâts, +70 PV, +30 mana, +110 XP.",
    bonus: 7,
    hp: 70,
    mana: 30,
    xp: 110,
    category: "tout",
    legendaire: true,
  },
  {
    nom: "Amulette de l'Immortel",
    description: "Légendaire : +9 dégâts, +90 PV, +90 mana, +180 XP.",
    bonus: 9,
    hp: 90,
    mana: 90,
    xp: 180,
    category: "tout",
    legendaire: true,
  },
  {
    nom: "Bouclier du Gardien",
    description: "Légendaire : +4 dégâts, +120 PV, +20 mana, +100 XP.",
    bonus: 4,
    hp: 120,
    mana: 20,
    xp: 100,
    category: "tout",
    legendaire: true,
  },
  {
    nom: "Bottes du Voyageur",
    description: "Légendaire : +3 dégâts, +30 PV, +100 mana, +70 XP.",
    bonus: 3,
    hp: 30,
    mana: 100,
    xp: 70,
    category: "tout",
    legendaire: true,
  },
  {
    nom: "Larme de l'Oracle",
    description: "Légendaire : +5 dégâts, +50 PV, +150 mana, +150 XP.",
    bonus: 5,
    hp: 50,
    mana: 150,
    xp: 150,
    category: "tout",
    legendaire: true,
  },
  {
    nom: "Plume de l'Aube",
    description: "Légendaire : +2 dégâts, +20 PV, +200 mana, +50 XP.",
    bonus: 2,
    hp: 20,
    mana: 200,
    xp: 50,
    category: "tout",
    legendaire: true,
  },
  {
    nom: "Cristal du Cosmos",
    description: "Légendaire : +10 dégâts, +100 PV, +100 mana, +250 XP.",
    bonus: 10,
    hp: 100,
    mana: 100,
    xp: 250,
    category: "tout",
    legendaire: true,
  },
];

export default objets;
