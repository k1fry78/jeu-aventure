import React, { useState, useEffect } from "react";

function DungeonCouloir({ onChoosePath, hero, setHero }) {
  const [barbareHp, setBarbareHp] = useState(200);
  const [canUseUltimate, setCanUseUltimate] = useState(true);
  const [ultimateTimer, setUltimateTimer] = useState(0);
  const [objetChoisi, setObjetChoisi] = useState(null);

  // Le barbare attaque toutes les 3 secondes
  useEffect(() => {
    if (barbareHp <= 0 || (hero && hero.hpHero <= 0)) return;
    let interval;
    const firstTimeout = setTimeout(() => {
      interval = setInterval(() => {
        setHero((prevHero) =>
          prevHero
            ? { ...prevHero, hpHero: Math.max(prevHero.hpHero - 10, 0) }
            : prevHero
        );
      }, 2000);
    }, 5000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, [hero, setHero]);

  // Gestion du timer de l'ultimate
  useEffect(() => {
    let timer;
    if (!canUseUltimate && ultimateTimer > 0) {
      timer = setInterval(() => {
        setUltimateTimer((t) => t - 1);
      }, 1000);
    }
    if (ultimateTimer === 0 && !canUseUltimate) {
      setCanUseUltimate(true);
    }
    return () => clearInterval(timer);
  }, [canUseUltimate, ultimateTimer]);

  // Attaque de base du héros
  const handleBaseAttack = () => {
    setBarbareHp((hp) => Math.max(hp - hero?.attackBase, 0));
  };

  // Attaque ultime du héros
  const handleUltimate = () => {
    if (!canUseUltimate) return;
    setBarbareHp((hp) => Math.max(hp - hero?.attackUltimate, 0));
    setCanUseUltimate(false);
    setUltimateTimer(5); // 5 secondes de recharge
  };

  // Victoire
  if (barbareHp <= 0) {
    return (
      <div>
        <h2>Victoire !</h2>
        <p>Tu as vaincu le barbare !</p>
        <p>
          Trois objets sont tombés au sol parmi les restes du barbare:{" "}
          <strong>une potion de soin</strong> (+15 PV) et{" "}
          <strong>un bouquin enchanté</strong> (+10 dégât de l'ultimate) et{" "}
          <strong>une épée</strong> (+1 dégât de base) Lequel choisis-tu ?
        </p>
        <button
          onClick={() => {
            setHero((prev) => ({
              ...prev,
              hpHero: prev.hpHero + 15,
            }));
            setObjetChoisi("potion");
          }}
          disabled={!!objetChoisi}
        >
          Prendre la potion de soin
        </button>
        <button
          onClick={() => {
            setHero((prev) => ({
              ...prev,
              attackUltimate: prev.attackUltimate + 10,
            }));
            setObjetChoisi("bouquin");
          }}
          disabled={!!objetChoisi}
          style={{ marginLeft: "10px" }}
        >
          Prendre le bouquin enchanté
        </button>
        <button
          onClick={() => {
            setHero((prev) => ({
              ...prev,
              attackBase: prev.attackBase + 1,
            }));
            setObjetChoisi("épée");
          }}
          disabled={!!objetChoisi}
          style={{ marginLeft: "10px" }}
        >
          Prendre l'épée
        </button>{" "}
        {objetChoisi && (
          <p style={{ color: "green", marginTop: "10px" }}>
            Tu as choisi :{" "}
            {objetChoisi === "potion"
              ? "la potion de soin (+15 PV)"
              : objetChoisi === "épée"
              ? "l'épée (+1 dégât de base)"
              : "le bouquin enchanté (+10 dégât de l'ultimate)"}
          </p>
        )}
        <p style={{ marginTop: "16px" }}>
          Tu poursuis ta route dans le donjon, le souffle court après ce combat
          éprouvant. Le couloir s’élargit et débouche sur une intersection : à
          gauche, un passage étroit plongé dans l’obscurité d’où s’échappent des
          bruits inquiétants ; à droite, un escalier de pierre faiblement
          éclairé par des torches... Il va falloir choisir ton chemin et
          rapidement maintenant les gardes savent que tu es là…
        </p>{" "}
        <button
          onClick={() => onChoosePath("dungeonPassageEtroit")}
          style={{ marginLeft: "10px" }}
          disabled={!objetChoisi}
        >
          Vers le passage étroit{" "}
        </button>
        <button
          onClick={() => onChoosePath("dungeonEscalier")}
          style={{ marginLeft: "10px" }}
          disabled={!objetChoisi}
        >
          Vers l'escalier{" "}
        </button>
      </div>
    );
  }
  // Défaite
  if (hero && hero.hpHero <= 0) {
    return (
      <div>
        <h2>Défaite...</h2>
        <p>Le barbare t'a massacré, il ne reste rien de toi...</p>
        <button onClick={() => onChoosePath && onChoosePath("defaiteCouloir")}>
          Recommencer
        </button>
      </div>
    );
  }

  //Combat
  return (
    <>
      <div>
        <h2>Le Couloir du Donjon</h2>
        <p>
          Vous arrivez dans un long couloir sombre et humide, où l’écho de vos
          pas résonne sur les murs de pierre. Des torches faiblement allumées
          projettent des ombres inquiétantes. Au bout du couloir, un énorme
          barbare, armé d’une hache massive, vous attend de pied ferme. Son
          regard féroce ne laisse aucun doute : il ne vous laissera pas passer
          sans un combat.
        </p>
        <h3>Affronter le barbare ! Attention il t'attaque !</h3>
      </div>
      <h2>Combat : Barbare</h2>
      <p>Points de vie du barbare : {barbareHp}</p>
      <p>Vos points de vie : {hero ? hero.hpHero : "?"}</p>
      <button
        onClick={handleBaseAttack}
        disabled={barbareHp <= 0 || (hero && hero.hpHero <= 0)}
      >
        Attaque de base
      </button>
      <button
        onClick={handleUltimate}
        disabled={
          !canUseUltimate || barbareHp <= 0 || (hero && hero.hpHero <= 0)
        }
        style={{ marginLeft: "10px" }}
      >
        Ultimate
        {!canUseUltimate && (
          <span style={{ marginLeft: "8px", color: "#f55" }}>
            ({ultimateTimer}s)
          </span>
        )}
      </button>
    </>
  );
}

export default DungeonCouloir;
