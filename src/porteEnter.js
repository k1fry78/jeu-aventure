import React from "react";
import './dungeonContent.css'
  
function EnterPorte({ onChoosePath, hero, setHero }) {
  const handleTrap = () => {
    if (hero) {
      const damage = Math.floor(Math.random() * 15) + 1;
      setHero({ ...hero, hpHero: hero.hpHero - damage });
      alert(`Un piège ! Tu perds ${damage} points de vie.`);
    }
    onChoosePath("suitePorte");
  };

  return (
    <div className="page-center">
      <div className="donjon-container">
        <h2>Entrée du donjon</h2>
        <p>
          Tu pousses la lourde porte de pierre, le cœur battant. À peine as-tu
          fait quelques pas dans l’obscurité qu’un déclic retentit sous tes
          pieds : un piège !
          <br />
          Des flèches surgissent des murs et l’une d’elles t’effleure l’épaule.
          Tu as eu chaud, mais tu es désormais sur tes gardes… Le donjon ne te
          fera aucun cadeau.
        </p>
        <div className="donjon-btns">
          <button onClick={handleTrap}>Continuer l’aventure</button>
        </div>
        <img
          src="/portepiege.jpg"
          alt="Entrée du donjon"
          className="donjon-img"
        />
      </div>
    </div>
  );
}

export default EnterPorte;
