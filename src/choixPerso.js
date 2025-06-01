import React, { useState } from "react";
import "./choixPerso.css";

function ChoixPerso({ onSelect, onChoosePath, startMusic }) {
  const [selectedHero, setSelectedHero] = useState(null);
  const [isHeroChosen, setIsHeroChosen] = useState(false);
  const [scene, setScene] = useState("intro");

  const heroes = [
    {
      name: "Guerrier",
      attackBase: 12,
      attackName: "Coup d'épée",
      attackBaseCooldown: 3000, // 3 seconde
      attackUltimate: 15,
      ultimateName: "Coup de bouclier",
      ultimateCooldown: 8000, // 8 secondes
      hpHero: 150,
      img: "/guerrier.jpg",
    },
    {
      name: "Mage",
      attackBase: 5,
      attackName: "Coup de bâton",
      attackBaseCooldown: 4500, // 4.5 seconde
      attackUltimate: 65,
      ultimateName: "Boule de feu",
      ultimateCooldown: 5000, // 5 secondes
      hpHero: 80,
      img: "/mage.jpg",
    },
    {
      name: "Rodeur",
      attackBase: 15,
      attackName: "Tir à l'arc",
      attackBaseCooldown: 3000, // 3 seconde
      attackUltimate: 30,
      ultimateName: "Salves de flèches",
      ultimateCooldown: 8000, // 8 secondes
      hpHero: 90,
      img: "/rodeur.jpg",
    },
  ];

  const handleSelect = (hero) => {
    setSelectedHero(hero);
    setIsHeroChosen(true);
    onSelect(hero);
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
        <ul><strong>Vous devez :</strong></ul>
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
              <p className="hero-stat">
                {hero.attackName} : {hero.attackBase} de dégats
              </p>
              <p className="hero-stat">
                {hero.ultimateName} : {hero.attackUltimate} de dégats
              </p>
              <p className="hero-stat">Points de vie : {hero.hpHero}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ChoixPerso;
