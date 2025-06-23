import React, { useState, useEffect, useRef } from "react";
import CombatButtons from "./combatButtons";
import FunctionObjet from "./functionobjet.js";

function SortieCellules({ hero, setHero, onChoosePath }) {
  const [scene, setScene] = useState("");
  const [objetChoisi, setObjetChoisi] = useState(null);
  const [invincibleUntil, setInvincibleUntil] = useState(0);
  const [stunStates, setStunStates] = useState({});
  const [troll1Hp, setTroll1Hp] = useState(400);
  const [troll2Hp, setTroll2Hp] = useState(200);
  const [troll3Hp, setTroll3Hp] = useState(100);

  const isStunned = (enemyName) => {
    const now = Date.now();
    return stunStates[enemyName] && stunStates[enemyName] > now;
  };

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
            Les trois trolls s’effondrent un à un dans un fracas assourdissant.
            Le silence retombe dans la salle, seulement troublé par ta
            respiration haletante. Tu viens de triompher d’une épreuve
            redoutable et la voie vers la sortie s’ouvre devant toi.
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
            src=""
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
          <p>Les trolls t'ont terrassé...</p>
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
        <h2>La Caverne</h2>
        <p>
          Après avoir traversé un long couloir obscur, tu pénètres dans une
          immense salle souterraine. L’écho de tes pas résonne sur les murs de
          pierre. Soudain, un grondement sourd retentit : trois trolls
          gigantesques émergent de l’ombre, leurs yeux brillants de rage.
          <br />
          <strong>
            Attention : chaque fois que l’un des trolls tombe, les survivants
            deviennent plus puissants et regagnent de la vie !
          </strong>
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
          src=""
          alt="Rat géant"
          className="donjon-img"
          style={{ marginTop: "18px" }}
        />
      </div>
    </div>
  );
}

export default SortieCellules;
