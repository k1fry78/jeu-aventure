import React, { useState } from "react";

function DungeonPassageEtroit({ onChoosePath, hero, setHero }) {
  const [scene, setScene] = useState("choix");
  const [objetChoisi, setObjetChoisi] = useState(null);
  

  // Vue spéciale si le joueur tente de fuir
  if (scene === "fuite") {
    return (
      <div>
        <h2>Rencontre inattendue</h2>
        <p>
          Les six personnes éclatent de rire : « Hey, venez là ! On a des choses à vendre ! »  
          Vous découvrez qu’il s’agit en réalité de boutiquiers du donjon, à l’allure étrange…  
          L’un d’eux s’incline : « Nous sommes des vampires, voyageurs. Nous pouvons vous vendre un objet précieux… en échange d’un peu de votre sang. »  
          Un autre ajoute, sourire aux lèvres : « Sinon, on peut aussi le prendre par la force… »
        </p>
        <p>
          Vous devez choisir entre deux objets, contre <strong>10 points de vie</strong> :
        </p>
        <button
          onClick={() => {
            setHero((prev) => ({ ...prev, hpHero: prev.hpHero - 25, attackBase: prev.attackBase + 5 }));
            setObjetChoisi("lameDeSang");
          }}
        >
          Acheter la lame de sang (+5 dégats de base et -15 points de vie max)
        </button>
        <button
          onClick={() => {
            setHero((prev) => ({ ...prev, hpHero: prev.hpHero - 10, attackUltimate: prev.attackUltimate + 10 }));
            setObjetChoisi("bagueEnsorcelee");
          }}
          style={{ marginLeft: "10px" }}
        >
          Acheter une bague ensorcelée (+10 dégats de l'attaque ultime)
        </button>
        {objetChoisi && (
          <p style={{ color: "green", marginTop: "10px" }}>
            Tu as choisi :{" "}
            {objetChoisi === "lameDeSang"
              ? "la lame de sang(+5 dégats de base et -15 points de vie)"
              : "la bague ensorcelée (+10 dégât de l'ultimate)"}
          </p>
        )}
        <button
          onClick={() => onChoosePath && onChoosePath("combatVampires")}
          style={{ marginLeft: "10px" }}
        >
            Continuer l'aventure    
        </button>
      </div>
    );
  }

  // Vue par défaut : choix initial
  return (
    <div>
      <h2>Passage étroit – Embuscade !</h2>
      <p>
        Vous avancez prudemment dans le passage étroit, plongé dans une obscurité presque totale.  
        Les bruits inquiétants se font de plus en plus proches…  
        Soudain, à la lueur vacillante de votre torche, vous distinguez six silhouettes aux yeux brillants : ils vous interpellent !  
        Vous êtes cerné, et derrière vous, les bruits de pas précipités des gardes résonnent : ils ne sont plus qu’à quelques salles de vous, prêts à fondre sur votre position.
      </p>
      <p>
        Que faites-vous ?
      </p>
      <button onClick={() => setScene("combat")}>
        Vous vous préparez au combat, le cœur battant, prêt à affronter cette horde...
      </button>
      <button onClick={() => setScene("fuite")}>
        Vous tentez de fuir discrètement, espérant échapper à l'embuscade…
      </button>
    </div>
  );
}

export default DungeonPassageEtroit;