import React, { useState } from "react";
import "./choixPerso.css";

function ChoixPerso({ onSelect, onChoosePath }) {
  const [selectedHero, setSelectedHero] = useState(null);
  const [isHeroChosen, setIsHeroChosen] = useState(false);

  const heroes = [
    { name: "Guerrier", attackBase: 2, attackUltimate: 10, hpHero: 100 },
    { name: "Mage", attackBase: 1, attackUltimate: 40, hpHero: 60 },
    { name: "Rodeur", attackBase: 3, attackUltimate: 20, hpHero: 80 },
  ];

  const handleSelect = (hero) => {
    setSelectedHero(hero);
    setIsHeroChosen(true);
    onSelect(hero);
  };

  if (isHeroChosen && selectedHero) {
    return (
      <div className="choix-perso">
        <h1>Vous avez choisi : {selectedHero.name}</h1>
        <button
          onClick={() => onChoosePath("enter")}>
        
          Entrer au donjon
        </button>
      </div>
    );
  }

  return (
    <div className="choix-perso">
        <h1>Bienvenue dans le donjon de l’Éveil</h1>
      <p>
        Tu es un aventurier courageux, venu dans ce donjon mystérieux à la
        recherche d’un artefact légendaire : la Pierre de l’Éveil. On raconte
        qu’elle accorde à celui qui la trouve une puissance inégalée… mais que
        personne n’est jamais ressorti vivant du donjon !
      </p>
      <p>
        À chaque embranchement, tu devras faire des choix :
        <li>
          
          Certains chemins sont sombres et dangereux, d’autres semblent plus
          sûrs mais cachent peut-être des pièges.
        </li>
        <li> Des monstres redoutables gardent les trésors du donjon.</li>
        <li>
          Après chaque combat, tu pourras améliorer tes compétences pour
          survivre plus loin.
        </li>
      </p>
      <p>
        Ton but :
        <li> Atteindre la salle finale du donjon, </li>
        <li> Vaincre le gardien ultime,</li>
        <li>Et t’emparer de la Pierre de l’Éveil !</li>
      </p>

      <h1>Choisissez votre personnage</h1>
      <div className="heroes-list">
        {heroes.map((hero) => (
          <div
            key={hero.name}
            className={`hero-card ${selectedHero === hero ? "selected" : ""}`}
            onClick={() => handleSelect(hero)}
          >
            <h2>{hero.name}</h2>
            <p>Attaque de base : {hero.attackBase}</p>
            <p>Attaque ultime : {hero.attackUltimate}</p>
            <p>Points de vie : {hero.hpHero}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChoixPerso;
