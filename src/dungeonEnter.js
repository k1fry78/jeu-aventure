import React from "react";

function DungeonEnter({ onChoosePath }) {
  return (
    <div>
      <h2>Entrée du donjon</h2>
      <p>
        Tu arrives devant le donjon. Une immense porte de pierre, couverte de symboles anciens, se dresse devant toi.  
        L’atmosphère est glaciale, l’obscurité semble avaler la lumière autour de l’entrée.  
        Un souffle de vent fait grincer les gonds rouillés, et tu sens le danger derrière ces murs.
      </p>
      <p>
        Mais tu remarques aussi une plaque disjointe dans le sol, dissimulant l’accès à de vieux égouts.  
        L’odeur y est nauséabonde, mais ce passage pourrait te permettre d’éviter les pièges de l’entrée principale…
      </p>
      <button onClick={() => onChoosePath("porte")}>
        Entrer par la porte principale
      </button>
      <button onClick={() => onChoosePath("egouts")}>
        Passer par les égouts
      </button>
    </div>
  );
}

export default DungeonEnter;