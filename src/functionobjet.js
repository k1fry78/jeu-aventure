import React, { useState } from "react";
import objets from "./objets";

// Fonction utilitaire pour tirer 1 à 3 objets aléatoires
function getObjetsAleatoires() {
  const nb = Math.floor(Math.random() * 3) + 1;
  const objetsMelanges = [...objets].sort(() => Math.random() - 0.5);
  return objetsMelanges.slice(0, nb);
}

function FunctionObjet({ setHero, objetChoisi, setObjetChoisi }) {
  const [objetsLoot] = useState(getObjetsAleatoires());

  // Applique les bonus de l'objet au héros
  const appliquerObjet = (objet) => {
    setHero((prev) => {
      // Ajout des PV, mana, xp
      const nouveauHero = {
        ...prev,
        hpHero: prev.hpHero + (objet.hp || 0),
        manaHero: prev.manaHero + (objet.mana || 0),
        xp: prev.xp + (objet.xp || 0),
      };

      // Ajout des bonus de dégâts selon la catégorie
      if (objet.bonus) {
        if (objet.category === "tout") {
          // Bonus sur tous les skills
          const nouveauSkillsTree = { ...nouveauHero.skillsTree };
          Object.keys(nouveauSkillsTree).forEach((key) => {
            nouveauSkillsTree[key] = {
              ...nouveauSkillsTree[key],
              baseDamage:
                (nouveauSkillsTree[key].baseDamage || 0) + objet.bonus,
            };
          });
          nouveauHero.skillsTree = nouveauSkillsTree;
        } else {
          // Bonus sur une catégorie précise
          const nouveauSkillsTree = { ...nouveauHero.skillsTree };
          Object.keys(nouveauSkillsTree).forEach((key) => {
            if (
              nouveauSkillsTree[key].category === objet.category ||
              (objet.category === "base" && key === "base")
            ) {
              nouveauSkillsTree[key] = {
                ...nouveauSkillsTree[key],
                baseDamage:
                  (nouveauSkillsTree[key].baseDamage || 0) + objet.bonus,
              };
            }
          });
          nouveauHero.skillsTree = nouveauSkillsTree;
        }
      }

      return nouveauHero;
    });
    setObjetChoisi(objet.nom);
  };

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
            onClick={() => appliquerObjet(objet)}
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






















































