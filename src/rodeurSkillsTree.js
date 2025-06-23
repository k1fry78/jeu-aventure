export const rodeurSkillsTree = {
  // Attaque de base
  base: {
    name: "Coup de dague",
    baseDamage: 12,
    damagePerLevel: 3,
    level: 1,
    cooldown: 4000,
    description:
      "Attaque rapide avec une dague, infligeant des dégâts de base.",
    unlocked: true,
    children: ["tirPrecis"],
    audio: "guerrier-attackbase.mp3",
    multiple: false,
    category: "base",
    get damage() {
      return this.baseDamage + (this.level - 1) * this.damagePerLevel;
    },
  },

  // --- Branche Arc ---
  tirPrecis: {
    name: "Tir précis",
    baseDamage: 55,
    damagePerLevel: 10,
    level: 1,
    cooldown: 5000,
    description:
      "Décoche une flèche précise qui inflige des dégâts importants à une cible.",
    unlocked: true,
    children: ["tirEmpoisonne", "daguePerforante", "invoqueLoup"],
    requires: ["base"],
    audio: "rodeur-attackbase.mp3",
    multiple: false,
    category: "arc",
    cost: 5,
    get damage() {
      return this.baseDamage + (this.level - 1) * this.damagePerLevel;
    },
  },
  tirEmpoisonne: {
    name: "Tir empoisonné",
    audio: "arrowpoison.mp3",
    baseDamage: 70,
    damagePerLevel: 15,
    level: 1,
    cooldown: 9000,
    description:
      "Tire une flèche empoisonnée qui inflige des dégâts sur la durée.",
    unlocked: false,
    children: ["tirMultiple"],
    requires: ["tirPrecis"],
    multiple: false,
    category: "arc",
    cost: 10,
    get damage() {
      return this.baseDamage + (this.level - 1) * this.damagePerLevel;
    },
  },
  tirMultiple: {
    name: "Tir multiple",
    baseDamage: 80,
    damagePerLevel: 15,
    level: 1,
    cooldown: 8000,
    description:
      "Tire plusieurs flèches à la fois, infligeant des dégâts à plusieurs ennemis.",
    unlocked: false,
    children: [],
    requires: ["tirEmpoisonne"],
    audio: "arrows-multiple.mp3",
    multiple: true,
    category: "arc",
    cost: 15,
    get damage() {
      return this.baseDamage + (this.level - 1) * this.damagePerLevel;
    },
  },

  // --- Branche Dague ---
  daguePerforante: {
    name: "Dague perforante",
    audio: "dague.mp3",
    baseDamage: 120,
    damagePerLevel: 25,
    level: 1,
    cooldown: 12000,
    description: "Coup de dague perforante infligeant d'énormes dégats.",
    unlocked: false,
    children: ["doubleDague"],
    requires: ["tirPrecis"],
    multiple: false,
    category: "dague",
    cost: 10,
    get damage() {
      return this.baseDamage + (this.level - 1) * this.damagePerLevel;
    },
  },
  doubleDague: {
    name: "Double dague",
    audio: "doubledague.mp3",
    baseDamage: 50,
    damagePerLevel: 10,
    level: 1,
    cooldown: 3000,
    description: "Ajoute une attaque puissante avec une seconde dague.",
    unlocked: false,
    children: [],
    requires: ["dagueRapide"],
    multiple: false,
    category: "dague",
    cost: 8,
    get damage() {
      return this.baseDamage + (this.level - 1) * this.damagePerLevel;
    },
  },

  // --- Branche Familier ---
  invoqueLoup: {
    name: "Invoque ton loup",
    audio: "wolfinvoc.mp3",
    baseDamage: 40,
    damagePerLevel: 8,
    level: 1,
    cooldown: 20000,
    description:
      "Envoie ton loup à l'attaque sur un ennemi, il mord l'ennemi toutes les 3 secondes",
    unlocked: false,
    children: ["invoqueGrizzly"],
    requires: ["tirPrecis"],
    multiple: false,
    category: "familier",
    cost: 20,
    get damage() {
      return this.baseDamage + (this.level - 1) * this.damagePerLevel;
    },
  },
  invoqueGrizzly: {
    name: "Invoque ton grizzly",
    audio: "grizinvoc.mp3",
    baseDamage: 100,
    damagePerLevel: 20,
    level: 1,
    cooldown: 20000,
    description:
      "Envoie ton grizzly sur un ennemi, il griffe plusieurs ennemis toutes les 4 secondes",
    unlocked: false,
    children: [],
    requires: ["invoqueLoup"],
    multiple: true,
    category: "familier",
    cost: 30,
    get damage() {
      return this.baseDamage + (this.level - 1) * this.damagePerLevel;
    },
  },
};
