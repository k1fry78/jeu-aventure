import React, { useState, useEffect, useRef } from "react";
import CombatButtons from "./combatButtons";
import FunctionObjet from "./functionobjet.js";

function EnterEgouts({ hero, setHero, onChoosePath }) {
  const [ratHp, setRatHp] = useState(160);
  const ratXpGiven = useRef(false);
  const [enemyName, setEnemyName] = useState("Rat Géant");
  const [objetChoisi, setObjetChoisi] = useState(null);
  const [scene, setScene] = useState("");
  const [invincibleUntil, setInvincibleUntil] = useState(0);
  const [stunStates, setStunStates] = useState({}); // Ajoute ceci en haut

  const isStunned = (enemyName) => {
    const now = Date.now();
    return stunStates[enemyName] && stunStates[enemyName] > now;
  };

  // Le rat attaque toutes les 2 secondes
  useEffect(() => {
    if (scene !== "lancerCombat") return;
    if (ratHp <= 0 || (hero && hero.hpHero <= 0)) return;
    let interval = setInterval(() => {
      if (isStunned(enemyName)) return;
      if (invincibleUntil && Date.now() < invincibleUntil) return;
      let audio1 = new Audio("/hitBarbare.mp3");
      audio1.volume = 0.3;
      audio1.play();
      audio1.onended = () => {
        let audio2 = new Audio("/playerhit.mp3");
        audio2.volume = 0.3;
        audio2.play();
      };
      setHero((prevHero) =>
        prevHero
          ? { ...prevHero, hpHero: Math.max(prevHero.hpHero - 8, 0) }
          : prevHero
      );
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [hero, setHero, ratHp, scene, enemyName, stunStates, invincibleUntil]);

  // Donne 100 XP à la victoire, une seule fois
  useEffect(() => {
    if (ratHp <= 0 && !ratXpGiven.current) {
      setHero((prevHero) =>
        prevHero ? { ...prevHero, xp: (prevHero.xp || 0) + 180 } : prevHero
      );
      ratXpGiven.current = true;
    }
  }, [ratHp, setHero]);

  // Victoire
  if (ratHp <= 0) {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Victoire !</h2>
          <p>Tu as vaincu le {enemyName} !</p>
          <FunctionObjet
            setHero={setHero}
            objetChoisi={objetChoisi}
            setObjetChoisi={setObjetChoisi}
          />{" "}
          <p style={{ marginTop: "16px" }}>
            Plus loin, à travers l’obscurité des égouts, tu aperçois une échelle
            en bois menant vers la lumière. Tu décides de t’en approcher, prêt à
            poursuivre ton aventure hors de ce repaire sordide.
          </p>
          <div className="donjon-btns">
            <button
              onClick={() => onChoosePath && onChoosePath("dungeonCellules")}
              disabled={!objetChoisi}
            >
              Continuer l'aventure
            </button>
          </div>
          <img
            src="/ratgeant.jpg"
            alt="Rat géant vaincu"
            className="donjon-img"
          />
        </div>
      </div>
    );
  }

  // Défaite
  if (hero && hero.hpHero <= 0) {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Défaite...</h2>
          <p>Le rat géant t'a terrassé dans les égouts.</p>
          <div className="donjon-btns">
            <button
              onClick={() => onChoosePath && onChoosePath("defaiteEgouts")}
            >
              Recommencer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-center">
      <div className="donjon-container">
        <h2>Les Égouts du Donjon</h2>
        <p>
          Tu soulèves la plaque disjointe et t’enfonces dans les ténèbres
          humides des égouts. L’air est lourd, l’odeur insoutenable, et l’eau
          croupie clapote sous tes pas. Soudain, à la lueur vacillante de ta
          torche, tu aperçois au loin une silhouette massive et poilue : un
          énorme rat aux yeux rouges, prêt à bondir pour défendre son
          territoire !
        </p>
        <CombatButtons
          hero={hero}
          setHero={setHero}
          enemies={[{ name: enemyName, hp: ratHp, setHp: setRatHp }]}
          scene={scene}
          setScene={setScene}
          setStunStates={setStunStates}
          stunStates={stunStates}
          setInvincibleUntil={setInvincibleUntil}
        />
        <img
          src="/ratgeant.jpg"
          alt="Rat géant"
          className="donjon-img"
          style={{ marginTop: "18px" }}
        />
      </div>
    </div>
  );
}

export default EnterEgouts;
