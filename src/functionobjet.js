import React, { useState } from "react";
import { getObjetsAleatoires } from "./objets";

function FunctionObjet({ setHero, objetChoisi, setObjetChoisi }) {
  const [objetsLoot] = useState(getObjetsAleatoires());

  return (
    <div className="dungeon-center">
      <p>
        {objetsLoot.length === 1 && (
          <>
            Tu trouves un objet rare : <strong>{objetsLoot[0].nom}</strong> —{" "}
            {objetsLoot[0].description}
            <br />
            Le prends-tu ?
          </>
        )}
        {objetsLoot.length > 1 && (
          <>
            Plusieurs objets sont tombés au sol parmi les restes :
            <ul style={{ margin: "8px 0 8px 20px" }}>
              {objetsLoot.map((objet) => (
                <li key={objet.nom}>
                  <strong>{objet.nom}</strong> — {objet.description}
                </li>
              ))}
            </ul>
            Lequel choisis-tu ?
          </>
        )}
      </p>
      <div className="donjon-btns-loot">
        {objetsLoot.map((objet) => (
          <button
            key={objet.nom}
            onClick={() => {
              setHero((prev) => ({
                ...prev,
                hpHero: prev.hpHero + objet.hp,
                attackBase: prev.attackBase + objet.attackBase,
                attackUltimate: prev.attackUltimate + objet.attackUltimate,
              }));
              setObjetChoisi(objet.nom);
            }}
            disabled={!!objetChoisi}
          >
            {objet.nom}
          </button>
        ))}
      </div>
      {objetChoisi && (
        <p style={{ color: "green", marginTop: "10px" }}>
          Tu as choisi : {objetChoisi}
        </p>
      )}
    </div>
  );
}

export default FunctionObjet;