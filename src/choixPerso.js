import React, { useEffect, useState } from "react";
import "./choixPerso.css";
import { mageSkillsTree } from "./mageSkillsTree";
import { rodeurSkillsTree } from "./rodeurSkillsTree";
import { guerrierSkillsTree } from "./guerrierSkillsTree";

// Copie profonde qui garde les getters (get damage)
function deepCopySkillsTree(skillsTree) {
  const copy = {};
  for (const key in skillsTree) {
    // Copie toutes les propriétés, y compris les getters
    const descs = Object.getOwnPropertyDescriptors(skillsTree[key]);
    copy[key] = Object.defineProperties({}, descs);
    // Copie le tableau children si présent
    if (skillsTree[key].children) {
      copy[key].children = [...skillsTree[key].children];
    }
  }
  return copy;
}

function ChoixPerso({ onSelect, onChoosePath, startMusic }) {
  const [selectedHero, setSelectedHero] = useState(null);
  const [isHeroChosen, setIsHeroChosen] = useState(false);
  const [scene, setScene] = useState("intro");

  const heroes = [
    {
      name: "Guerrier",
      hpHero: 150,
      manaHero: 100,
      img: "/guerrier.jpg",
      skillsTree: guerrierSkillsTree,
      xp: 0,
      level: 1,
      skillsTreeDescription: "Puissance, Rapidité, Cris",
      passif: "Résistance accrue",
      classe: "guerrier",
      potions: { vie: 3, mana: 3 },
    },
    {
      name: "Mage",
      hpHero: 80,
      manaHero: 100,
      img: "/mage.jpg",
      skillsTree: mageSkillsTree,
      xp: 0,
      level: 1,
      skillsTreeDescription: "Feu, Glace, Foudre",
      passif: "Régénération de mana",
      classe: "mage",
      potions: { vie: 3, mana: 3},
    },
    {
      name: "Rodeur",
      hpHero: 90,
      manaHero: 100,
      img: "/rodeur.jpg",
      skillsTree: rodeurSkillsTree,
      xp: 0,
      level: 1,
      skillsTreeDescription: "Arc, Dague, Pièges",
      passif: "Discrétion accrue",
      classe: "rodeur",
      potions: { vie: 3, mana: 3 },
    },
  ];

  // Copie indépendante du skillsTree pour chaque héros sélectionné, AVEC les getters
  const handleSelect = (hero) => {
    const heroCopy = {
      ...hero,
      skillsTree: deepCopySkillsTree(hero.skillsTree),
    };
    setSelectedHero(heroCopy);
    setIsHeroChosen(true);
    onSelect(heroCopy);
  };

  if (isHeroChosen && selectedHero) {
    return (
      <div className="choix-perso">
        <h1 className="choix-titre">Vous avez choisi : {selectedHero.name}</h1>
        <button className="choix-btn" onClick={() => onChoosePath("enter")}>
          Entrer au donjon
        </button>
      </div>
    );
  }

  if (scene === "intro") {
    return (
      <div className="choix-perso">
        <h1 className="choix-titre">Bienvenue dans le donjon de l’Éveil</h1>
        <p className="choix-desc">
          Tu es un aventurier courageux, venu dans ce donjon mystérieux à la
          recherche d’un artefact légendaire : la Pierre de l’Éveil. On raconte
          qu’elle accorde à celui qui la trouve une puissance inégalée… mais que
          personne n’est jamais ressorti vivant du donjon !
        </p>
        <ul>
          <li>
            Certains chemins sont sombres et dangereux, d’autres semblent plus
            sûrs mais cachent peut-être des pièges.
          </li>
          <li>Des monstres redoutables gardent les trésors du donjon.</li>
          <li>
            Après chaque combat, tu pourras améliorer tes compétences pour
            survivre plus loin.
          </li>
        </ul>
        <ul>
          <strong>Vous devez :</strong>
        </ul>
        <ul>
          <li>Atteindre la salle finale du donjon,</li>
          <li>Vaincre le gardien ultime,</li>
          <li>Et t’emparer de la Pierre de l’Éveil !</li>
        </ul>
        <button
          className="choix-btn"
          onClick={() => {
            setScene("choix");
            startMusic && startMusic();
          }}
        >
          Jouer
        </button>
        <img src="/pierre-eveil.jpg" alt="dungeon" className="intro-img" />
      </div>
    );
  }

  if (scene === "choix") {
    return (
      <div className="choix-perso">
        <h1 className="choix-titre">Choisissez votre personnage</h1>
        <div className="heroes-list">
          {heroes.map((hero) => (
            <div
              key={hero.name}
              className={`hero-card ${selectedHero === hero ? "selected" : ""}`}
              onClick={() => handleSelect(hero)}
            >
              <img
                src={hero.img}
                alt={hero.name}
                className="hero-img"
                style={{ width: "80px", height: "80px", marginBottom: "12px" }}
              />
              <h2 className="hero-name">{hero.name}</h2>
              <p className="hero-stat">Points de vie: {hero.hpHero}</p>
              <p className="hero-stat">{hero.skillsTreeDescription}</p>
              <p className="hero-stat">Passif: {hero.passif}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ChoixPerso;
