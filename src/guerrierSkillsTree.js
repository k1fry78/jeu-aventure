export const guerrierSkillsTree = {
  // Attaque de base
  base: {
    name: "Coup d'épée",
    baseDamage: 10,
    damagePerLevel: 3,
    level: 1,
    cooldown: 2500,
    description:
      "Frappe l'ennemi avec ton épée, infligeant des dégâts de base.",
    unlocked: true,
    children: ["coupBouclier"],
    audio: "guerrier-attackbase.mp3",
    multiple: false,
    category: "base",
    get damage() {
      return this.baseDamage + (this.level - 1) * this.damagePerLevel;
    },
  },

  // --- Branche Frappe Puissante ---
  coupBouclier: {
    name: "Coup de bouclier",
    baseDamage: 30,
    damagePerLevel: 8,
    level: 1,
    cooldown: 4000,
    description: "Frappe l'ennemi avec ton bouclier, infligeant des dégâts.",
    unlocked: true,
    children: ["frappePuissante", "coupRapide", "criDeGuerre"],
    requires: ["base"],
    audio: "coup-bouclier.mp3",
    multiple: false,
    category: "puissance",
    cost: 5,
    get damage() {
      return this.baseDamage + (this.level - 1) * this.damagePerLevel;
    },
  },

  frappePuissante: {
    name: "Frappe puissante",
    audio: "couppuissant.wav",
    baseDamage: 90,
    damagePerLevel: 20,
    level: 1,
    cooldown: 7000,
    description: "Un coup d'épée puissant qui inflige de lourds dégâts.",
    unlocked: false,
    children: ["coupEcrasant"],
    requires: ["coupBouclier"],
    multiple: false,
    category: "puissance",
    cost: 10,
    get damage() {
      return this.baseDamage + (this.level - 1) * this.damagePerLevel;
    },
  },
  coupEcrasant: {
    name: "Coup écrasant",
    audio: "ecrasant.wav",
    baseDamage: 130,
    damagePerLevel: 30,
    level: 1,
    cooldown: 10000,
    description:
      "Un coup qui écrase l'adversaire et lui provoque un étourdissement.",
    unlocked: false,
    children: [],
    requires: ["frappePuissante"],
    multiple: false,
    category: "puissance",
    stun: 5000,
    cost: 15,
    get damage() {
      return this.baseDamage + (this.level - 1) * this.damagePerLevel;
    },
  },

  // --- Branche Coup Rapide ---
  coupRapide: {
    name: "Coup rapide",
    audio: "rapide.wav",
    baseDamage: 30,
    damagePerLevel: 7,
    level: 1,
    cooldown: 2500,
    description: "Enchaîne des attaques rapides pour submerger l'ennemi.",
    unlocked: false,
    children: ["enchainement"],
    requires: ["coupBouclier"],
    multiple: false,
    category: "rapide",
    cost: 5,
    get damage() {
      return this.baseDamage + (this.level - 1) * this.damagePerLevel;
    },
  },
  enchainement: {
    name: "Enchaînement",
    audio: "enchainement.mp3",
    baseDamage: 50,
    damagePerLevel: 12,
    level: 1,
    cooldown: 2500,
    description: "Réalise une série de coups rapides sur la cible.",
    unlocked: false,
    children: [],
    requires: ["coupRapide"],
    multiple: false,
    category: "rapide",
    cost: 8,
    get damage() {
      return this.baseDamage + (this.level - 1) * this.damagePerLevel;
    },
  },

  // --- Branche Défense / Cri ---
  criDeGuerre: {
    name: "Cri de guerre",
    audio: "cry.wav",
    damage: 0,
    cooldown: 20000,
    upgrade: "attack de base = 45 dégats pendant 12 secondes",
    description: "Pousse un cri qui augmente ton attack base.",
    unlocked: false,
    children: ["protection"],
    requires: ["coupBouclier"],
    multiple: false,
    category: "cri",
    cost: 10,
  },
  protection: {
    name: "Protection",
    audio: "protection.wav",
    damage: 0,
    cooldown: 20000,
    upgrade: "insensible pendant 8secondes",
    description: "Augmente fortement ta défense pendant quelques secondes.",
    unlocked: false,
    children: [],
    requires: ["criDeGuerre"],
    multiple: false,
    category: "cri",
    cost: 15,
  },
};
