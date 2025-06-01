const objets = [
  {
    nom: "Potion de vitalité",
    description: "Augmente vos points de vie de 20.",
    hp: 20,
    attackBase: 0,
    attackUltimate: 0,
  },
  {
    nom: "Épée affûtée",
    description: "Augmente vos dégâts de base de 5.",
    hp: 0,
    attackBase: 5,
    attackUltimate: 0,
  },
  {
    nom: "Amulette de puissance",
    description: "Augmente les dégâts de votre compétence ultime de 10.",
    hp: 0,
    attackBase: 0,
    attackUltimate: 10,
  },
  {
    nom: "Bouclier robuste",
    description: "Augmente vos points de vie de 15.",
    hp: 15,
    attackBase: 0,
    attackUltimate: 0,
  },
  {
    nom: "Anneau du guerrier",
    description: "Augmente vos dégâts de base de 3.",
    hp: 0,
    attackBase: 3,
    attackUltimate: 0,
  },
  {
    nom: "Cape mystique",
    description: "Augmente les dégâts de votre compétence ultime de 7.",
    hp: 0,
    attackBase: 0,
    attackUltimate: 7,
  },
  {
    nom: "Bracelet de santé",
    description: "Augmente vos points de vie de 10.",
    hp: 10,
    attackBase: 0,
    attackUltimate: 0,
  },
  {
    nom: "Dague rapide",
    description: "Augmente vos dégâts de base de 2.",
    hp: 0,
    attackBase: 2,
    attackUltimate: 0,
  },
  {
    nom: "Talisman du feu",
    description: "Augmente les dégâts de votre compétence ultime de 5.",
    hp: 0,
    attackBase: 0,
    attackUltimate: 5,
  },
  {
    nom: "Ceinture de force",
    description: "Augmente vos dégâts de base de 4.",
    hp: 0,
    attackBase: 4,
    attackUltimate: 0,
  },
  {
    nom: "Potion majeure de vie",
    description: "Augmente vos points de vie de 30.",
    hp: 30,
    attackBase: 0,
    attackUltimate: 0,
  },
  {
    nom: "Gants du colosse",
    description: "Augmente vos dégâts de base de 6.",
    hp: 0,
    attackBase: 6,
    attackUltimate: 0,
  },
  {
    nom: "Orbe de destruction",
    description: "Augmente les dégâts de votre compétence ultime de 15.",
    hp: 0,
    attackBase: 0,
    attackUltimate: 15,
  },
  {
    nom: "Plastron de robustesse",
    description: "Augmente vos points de vie de 25.",
    hp: 25,
    attackBase: 0,
    attackUltimate: 0,
  },
  {
    nom: "Sceptre ancestral",
    description: "Augmente les dégâts de votre compétence ultime de 12.",
    hp: 0,
    attackBase: 0,
    attackUltimate: 12,
  },
];

// Fonction utilitaire pour obtenir 1 à 3 objets aléatoires de la liste
export function getObjetsAleatoires() {
  const nbObjets = Math.floor(Math.random() * 3) + 1; // 1 à 3 objets
  const melange = [...objets].sort(() => Math.random() - 0.5);
  return melange.slice(0, nbObjets);
}

export default objets;