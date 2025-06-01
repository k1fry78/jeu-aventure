import React, { useState, useEffect, useRef } from "react";

function CombatButtons({
  hero,
  enemyHp,
  setEnemyHp,
  scene,
  setScene,
  enemyName,
}) {
  const [baseCooldown, setBaseCooldown] = useState(false);
  const [ultimateCooldown, setUltimateCooldown] = useState(false);
  const [canUseUltimate, setCanUseUltimate] = useState(true);
  const [ultimateTimer, setUltimateTimer] = useState(0);
  const [baseTimer, setBaseTimer] = useState(0);
  const baseTimerRef = useRef(null);
  const ultimateTimerRef = useRef(null);

  // Gestion du cooldown de l'attaque de base
  useEffect(() => {
    if (!baseCooldown) return;
    setBaseTimer(Math.floor(hero.attackBaseCooldown / 1000));
    baseTimerRef.current = setInterval(() => {
      setBaseTimer((t) => {
        if (t <= 1) {
          clearInterval(baseTimerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    const timeout = setTimeout(() => {
      setBaseCooldown(false);
    }, hero.attackBaseCooldown);
    return () => {
      clearTimeout(timeout);
      clearInterval(baseTimerRef.current);
    };
  }, [baseCooldown, hero.attackBaseCooldown]);

  // Gestion du cooldown de l'ultimate
  useEffect(() => {
    if (!ultimateCooldown) return;
    setUltimateTimer(Math.floor(hero.ultimateCooldown / 1000));
    ultimateTimerRef.current = setInterval(() => {
      setUltimateTimer((t) => {
        if (t <= 1) {
          clearInterval(ultimateTimerRef.current);
          setUltimateCooldown(false);
          setCanUseUltimate(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(ultimateTimerRef.current);
  }, [ultimateCooldown, hero.ultimateCooldown]);

  // Attaque de base avec cooldown
  const handleBaseAttack = () => {
    if (scene !== "lancerCombat" || baseCooldown) return;
    setEnemyHp((hp) => Math.max(hp - hero?.attackBase, 0));
    setBaseCooldown(true);
  };

  // Attaque ultime avec cooldown
  const handleUltimate = () => {
    if (scene !== "lancerCombat" || !canUseUltimate || ultimateCooldown) return;
    let sonUltimate = "";
    if (hero.name === "Guerrier") sonUltimate = "/coup-bouclier.mp3";
    else if (hero.name === "Mage") sonUltimate = "/fireball.mp4";
    else if (hero.name === "Rodeur") sonUltimate = "/arrows.mp3";
    if (sonUltimate) {
      const audio = new Audio(sonUltimate);
      audio.volume = 0.3;
      audio.play();
    }
    setEnemyHp((hp) => Math.max(hp - hero?.attackUltimate, 0));
    setCanUseUltimate(false);
    setUltimateCooldown(true);
  };

  return (
    <div className="combat-center">
      <button
        onClick={() => setScene("lancerCombat")}
        className={scene === "lancerCombat" ? "combat-launched" : ""}
        disabled={scene === "lancerCombat"}
      >
        {scene === "lancerCombat" ? "Combat lancé !" : "Lancer le combat"}
      </button>
      <h2>Combat : {enemyName}</h2>
      <div className="combat-alert">Attention il t'attaque !</div>
      <p className="combat-hp">
        Points de vie {enemyName} : {enemyHp}
      </p>
      <p className="combat-hp-hero">
        Vos points de vie : {hero ? hero.hpHero : "?"}
      </p>
      <div className="donjon-btns">
        <button
          onClick={handleBaseAttack}
          disabled={
            enemyHp <= 0 || !hero || scene !== "lancerCombat" || baseCooldown
          }
        >
          {hero ? hero.attackName : "Attaque de base"}
          {baseCooldown && (
            <span style={{ marginLeft: "8px", color: "#f55" }}>
              ({baseTimer}s)
            </span>
          )}
        </button>
        <button
          onClick={handleUltimate}
          disabled={
            !canUseUltimate ||
            ultimateCooldown ||
            enemyHp <= 0 ||
            !hero ||
            scene !== "lancerCombat"
          }
          style={{ marginLeft: "10px" }}
        >
          {hero ? hero.ultimateName : "Attaque Ultime"}
          {ultimateCooldown && (
            <span style={{ marginLeft: "8px", color: "#f55" }}>
              ({ultimateTimer}s)
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default CombatButtons;
