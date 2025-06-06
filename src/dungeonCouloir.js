import React, { useState, useEffect, useRef } from "react";
import CombatButtons from "./combatButtons";
import "./dungeonContent.css";
import FunctionObjet from "./functionobjet.js";

function DungeonCouloir({ onChoosePath, hero, setHero }) {
  const [barbareHp, setBarbareHp] = useState(200);
  const barbareXpGiven = useRef(false);
  const [enemyName, setEnemyName] = useState("Barbare");
  const [objetChoisi, setObjetChoisi] = useState(null);
  const [scene, setScene] = useState("");
  const [invincibleUntil, setInvincibleUntil] = useState(0);
  const [stunStates, setStunStates] = useState({});

  const isStunned = (enemyName) => {
    const now = Date.now();
    return stunStates[enemyName] && stunStates[enemyName] > now;
  };

  // Le barbare attaque toutes les 3 secondes
  useEffect(() => {
    if (scene !== "lancerCombat") return;
    if (barbareHp <= 0 || (hero && hero.hpHero <= 0)) return;
    let interval = setInterval(() => {
      if (isStunned(enemyName)) return;
      if (invincibleUntil && Date.now() < invincibleUntil) return;

      let audio1 = new Audio("/massivattack.mp3");
      audio1.volume = 0.3;
      audio1.play();
      audio1.onended = () => {
        let audio2 = new Audio("/playerhit.mp3");
        audio2.volume = 0.3;
        audio2.play();
      };
      setHero((prevHero) =>
        prevHero
          ? { ...prevHero, hpHero: Math.max(prevHero.hpHero - 15, 0) }
          : prevHero
      );
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [hero, setHero, barbareHp, scene, enemyName, stunStates, invincibleUntil]);

  // Donne 100 XP à la victoire, une seule fois
  useEffect(() => {
    if (barbareHp <= 0 && !barbareXpGiven.current) {
      setHero((prevHero) =>
        prevHero ? { ...prevHero, xp: (prevHero.xp || 0) + 100 } : prevHero
      );
      barbareXpGiven.current = true;
    }
  }, [barbareHp, setHero]);

  // Victoire
  if (barbareHp <= 0) {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Victoire !</h2>
          <p>Tu as vaincu le barbare !</p>
          <FunctionObjet
            setHero={setHero}
            objetChoisi={objetChoisi}
            setObjetChoisi={setObjetChoisi}
          />{" "}
          <p style={{ marginTop: "16px" }}>
            Tu poursuis ta route dans le donjon, le souffle court après ce
            combat éprouvant. Le couloir s’élargit et débouche sur une
            intersection : à gauche, un passage étroit plongé dans l’obscurité
            d’où s’échappent des bruits inquiétants ; à droite, un escalier de
            pierre faiblement éclairé par des torches... Il va falloir choisir
            ton chemin et rapidement maintenant les gardes savent que tu es là…
          </p>
          <div className="donjon-btns">
            <button
              onClick={() => onChoosePath("dungeonPassageEtroit")}
              style={{ marginLeft: "10px" }}
              disabled={!objetChoisi}
            >
              Vers le passage étroit
            </button>
            <button
              onClick={() => onChoosePath("dungeonEscalier")}
              style={{ marginLeft: "10px" }}
              disabled={!objetChoisi}
            >
              Vers l'escalier
            </button>
          </div>
          <img
            src="/couloir-choix.jpg"
            alt="Barbare vaincu"
            className="donjon-img"
            style={{ width: "675px" }}
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
          <p>Le barbare t'a massacré, il ne reste rien de toi...</p>
          <div className="donjon-btns">
            <button
              onClick={() => onChoosePath && onChoosePath("defaiteCouloir")}
            >
              Recommencer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Combat
  return (
    <div className="page-center">
      <div className="donjon-container">
        <h2>Le Couloir du Donjon</h2>
        <p>
          Vous arrivez dans un long couloir sombre et humide, où l’écho de vos
          pas résonne sur les murs de pierre. Des torches faiblement allumées
          projettent des ombres inquiétantes. Au bout du couloir, un énorme
          barbare, armé d’une hache massive, vous attend de pied ferme. Son
          regard féroce ne laisse aucun doute : il ne vous laissera pas passer
          sans un combat.
        </p>
        <CombatButtons
          hero={hero}
          setHero={setHero}
          enemies={[{ name: enemyName, hp: barbareHp, setHp: setBarbareHp }]}
          scene={scene}
          setScene={setScene}
          setStunStates={setStunStates}
          stunStates={stunStates}
          setInvincibleUntil={setInvincibleUntil}
        />
        <img
          src="/barbare.jpg"
          alt="Barbare"
          className="donjon-img"
          style={{ marginTop: "18px" }}
        />
      </div>
    </div>
  );
}

export default DungeonCouloir;
