export const mageSkillsTree = {
  // Attaques de base
  base: {
    name: "Coup de bâton",
    baseDamage: 5,
    damagePerLevel: 2,
    level: 1,
    cooldown: 4500,
    description: "Inflige des dégâts de base avec un coup de bâton.",
    unlocked: true,
    children: ["bouleDeFeu"],
    audio: "mage-attackbase.mp3",
    multiple: false,
    get damage() {
      return this.baseDamage + (this.level - 1) * this.damagePerLevel;
    },
  },

  // Arbre de compétences du Mage

  bouleDeFeu: {
    name: "Boule de feu",
    baseDamage: 65,
    damagePerLevel: 15,
    level: 1,
    cooldown: 5000,
    description: "Lance une boule de feu infligeant des dégâts de base.",
    unlocked: true,
    children: ["brulure", "gele", "eclair"],
    audio: "fireball.mp4",
    multiple: false,
    category: "feu",
    cost: 5,
    get damage() {
      return this.baseDamage + (this.level - 1) * this.damagePerLevel;
    },
  },
  brulure: {
    name: "Brûlure",
    audio: "brulure.wav",
    baseDamage: 80,
    damagePerLevel: 20,
    level: 1,
    cooldown: 10000,
    description: "Inflige des dégâts de feu sur la durée à la cible.",
    unlocked: false,
    children: ["inferno"],
    requires: ["bouleDeFeu"],
    multiple: false,
    category: "feu",
    cost: 10,
    get damage() {
      return this.baseDamage + (this.level - 1) * this.damagePerLevel;
    },
  },
  inferno: {
    name: "Inferno",
    audio: "inferno.wav",
    baseDamage: 100,
    damagePerLevel: 25,
    level: 1,
    cooldown: 13000,
    description:
      "Déchaîne un feu infernal qui brûle tous les ennemis pendant plusieurs secondes.",
    unlocked: false,
    children: [],
    requires: ["brulure"],
    multiple: true,
    category: "feu",
    cost: 18,
    get damage() {
      return this.baseDamage + (this.level - 1) * this.damagePerLevel;
    },
  },
  gele: {
    name: "Gèle",
    audio: "gel.wav",
    damage: 0, // Pas de dégâts, pas besoin de level
    cooldown: 8000,
    stun: 3000,
    description: "Gèle la cible et réduit ses attaques.",
    unlocked: false,
    children: ["tempeteDeGlace"],
    requires: ["bouleDeFeu"],
    multiple: false,
    category: "froid",
    cost: 10,
  },
  tempeteDeGlace: {
    name: "Tempête de glace",
    audio: "blizzard.wav",
    baseDamage: 90,
    damagePerLevel: 20,
    level: 1,
    cooldown: 12000,
    stun: 5000,
    description:
      "Invoque une tempête de glace qui gèle tous les ennemis et inflige des dégâts.",
    unlocked: false,
    children: [],
    requires: ["gele"],
    multiple: true,
    category: "froid",
    cost: 15,
    get damage() {
      return this.baseDamage + (this.level - 1) * this.damagePerLevel;
    },
  },
  eclair: {
    name: "Éclair",
    audio: "eclair.mp3",
    baseDamage: 30,
    damagePerLevel: 10,
    level: 1,
    cooldown: 2000,
    description:
      "Frappe la cible avec un éclair, infligeant des dégâts instantanés.",
    unlocked: false,
    children: ["chaineEclair"],
    requires: ["bouleDeFeu"],
    multiple: false,
    category: "foudre",
    cost: 5,
    get damage() {
      return this.baseDamage + (this.level - 1) * this.damagePerLevel;
    },
  },
  chaineEclair: {
    name: "Chaîne d'éclairs",
    audio: "chaineeclair.mp3",
    baseDamage: 70,
    damagePerLevel: 15,
    level: 1,
    cooldown: 6000,
    description:
      "L'éclair rebondit sur plusieurs ennemis, infligeant des dégâts à chacun.",
    unlocked: false,
    children: [],
    requires: ["eclair"],
    multiple: true,
    category: "foudre",
    cost: 10,
    get damage() {
      return this.baseDamage + (this.level - 1) * this.damagePerLevel;
    },
  },
};
