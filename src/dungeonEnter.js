import React from "react";
import './dungeonContent.css'
function DungeonEnter({ onChoosePath }) {
  return (
    <div className="page-center">
      <div className="donjon-container">
        <h2>Entrée du donjon</h2>
        <p>
          Tu arrives devant le donjon. Une immense porte de pierre, couverte de symboles anciens, se dresse devant toi.<br />
          L’atmosphère est glaciale, l’obscurité semble avaler la lumière autour de l’entrée.<br />
          Un souffle de vent fait grincer les gonds rouillés, et tu sens le danger derrière ces murs.
        </p>
        <p>
          Mais tu remarques aussi une plaque disjointe dans le sol, dissimulant l’accès à de vieux égouts.<br />
          L’odeur y est nauséabonde, mais ce passage pourrait te permettre d’éviter les pièges de l’entrée principale…
        </p>
        <div className="donjon-btns">
          <button onClick={() => onChoosePath("porte")}>
            Entrer par la porte principale
          </button>
          <button onClick={() => onChoosePath("egouts")}>
            Passer par les égouts
          </button>
        </div>
        <img
          src="/entrer.jpg"
          alt="Entrée du donjon"
          className="donjon-img"
        />
      </div>
    </div>
  );
}

export default DungeonEnter;