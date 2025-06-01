import React, { useState, useEffect } from "react";
import "./dungeonContent.css";

function EnterPorte({ onChoosePath, hero, setHero }) {
  const [piege, setPiege] = useState(null); // null, "esquive", "rate"
  const [canEsquive, setCanEsquive] = useState(true);
  const [scene, setScene] = useState("");

  // Timer pour cliquer rapidement
  useEffect(() => {
    if (scene !== "piege") return;
    if (piege !== null) return;
    const timer = setTimeout(() => {
      const audio = new Audio("/playerhit.mp3");
      audio.volume = 0.3;
      audio.play();
      setCanEsquive(false);
      setTimeout(() => setPiege("rate"), 800); // Affiche "rate" après un court délai
    }, 1200); // 1,2 seconde pour cliquer
    return () => clearTimeout(timer);
  }, [scene, piege]);

  if (piege === "esquive") {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Tu as esquivé le piège !</h2>
          <p>
            Grâce à tes réflexes, tu évites de justesse la dalle piégée. Tu
            poursuis ta route, plus vigilant que jamais.
          </p>
          <div className="donjon-btns">
            <button onClick={() => onChoosePath && onChoosePath("suiteEncore")}>
              Continuer l’aventure
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (piege === "rate") {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Tu as déclenché le piège !</h2>
          <p>
            Tu n’as pas réagi assez vite : des fléchettes jaillissent des murs !
            Tu perds 10 points de vie.
          </p>
          <div className="donjon-btns">
            <button
              onClick={() => {
                setHero((prev) => ({ ...prev, hpHero: prev.hpHero - 10 }));
                onChoosePath && onChoosePath("suiteEncore");
              }}
            >
              Continuer malgré la blessure
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (scene === "piege") {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Un piège sur ton chemin !</h2>
          <p>
            Alors que tu avances dans le couloir, tu entends un déclic sous tes
            pieds. Un piège ! Clique vite pour l’esquiver !
          </p>
          <div className="donjon-btns">
            {canEsquive && (
              <button onClick={() => setPiege("esquive")}>
                Esquiver rapidement
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-center">
      <div className="donjon-container">
        <h2>Entrée du donjon</h2>
        <p>
          Tu pousses la lourde porte de pierre, le cœur battant. À peine as-tu
          fait quelques pas dans l’obscurité qu’un déclic retentit sous tes
          pieds : un piège !
        </p>
        <div className="donjon-btns">
          <button
            onClick={() => {
              const audio = new Audio("/arrow-trap.mp3");
              audio.volume = 0.3;
              audio.play();
              setScene("piege");
            }}
          >
            Continuer l’aventure
          </button>{" "}
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
