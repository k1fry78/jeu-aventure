import React from "react";

function EnterPorte({ onChoosePath, hero, setHero }) {
  const handleTrap = () => {
    if (hero) {
      const damage = Math.floor(Math.random() * 15) + 1; // entre 1 et 15
      setHero({ ...hero, hpHero: hero.hpHero - damage });
      alert(`Un piège ! Tu perds ${damage} points de vie.`);
    }
    onChoosePath("suitePorte");
  };

  return (
    <div>
      <h2>Entrée du donjon</h2>
      <p>
        Tu pousses la lourde porte de pierre, le cœur battant. À peine as-tu fait quelques pas dans l’obscurité qu’un déclic retentit sous tes pieds : un piège !  
        Des flèches surgissent des murs et l’une d’elles t’effleure l’épaule. Tu as eu chaud, mais tu es désormais sur tes gardes… Le donjon ne te fera aucun cadeau.
      </p>
      <button onClick={handleTrap} onChoosePath={() => onChoosePath("dungeonCouloir")}>
       Continuer l’aventure
      </button>
    </div>
  );
}

export default EnterPorte;