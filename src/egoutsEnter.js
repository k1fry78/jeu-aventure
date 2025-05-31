import React, { useState, useEffect } from "react";

function EnterEgouts({ hero, setHero, onChoosePath }) {
  const [ratHp, setRatHp] = useState(160);
  const [canUseUltimate, setCanUseUltimate] = useState(true);
  const [ultimateTimer, setUltimateTimer] = useState(0);
  const [objetChoisi, setObjetChoisi] = useState(null);

  // Le rat attaque toutes les 2 secondes
  useEffect(() => {
    if (ratHp <= 0 || (hero && hero.hpHero <= 0)) return;
    let interval;
    const firstTimeout = setTimeout(() => {
      interval = setInterval(() => {
        setHero((prevHero) =>
          prevHero
            ? { ...prevHero, hpHero: Math.max(prevHero.hpHero - 6, 0) }
            : prevHero
        );
      }, 2000);
    }, 8000);

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
    setRatHp((hp) => Math.max(hp - hero?.attackBase, 0));
  };

  // Attaque ultime du héros
  const handleUltimate = () => {
    if (!canUseUltimate) return;
    setRatHp((hp) => Math.max(hp - hero?.attackUltimate, 0));
    setCanUseUltimate(false);
    setUltimateTimer(5); // 5 secondes de recharge
  };

  // Victoire
  if (ratHp <= 0) {
    return (
      <div>
        <h2>Victoire !</h2>
        <p>Tu as vaincu le rat géant !</p>
        <p>
          Deux objets sont tombés au sol parmi les restes du rat :{" "}
          <strong>une potion de soin</strong> (+15 PV) et{" "}
          <strong>une dague empoisonnée</strong> (+1 dégât de base). Lequel
          choisis-tu ?
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
              attackBase: prev.attackBase + 1,
            }));
            setObjetChoisi("dague");
          }}
          disabled={!!objetChoisi}
          style={{ marginLeft: "10px" }}
        >
          Prendre la dague empoisonnée
        </button>
        {objetChoisi && (
          <p style={{ color: "green", marginTop: "10px" }}>
            Tu as choisi :{" "}
            {objetChoisi === "potion"
              ? "la potion de soin (+15 PV)"
              : "la dague empoisonnée (+1 dégât de base)"}
          </p>
        )}
        <p style={{ marginTop: "16px" }}>
          Plus loin, à travers l’obscurité des égouts, tu aperçois une échelle
          rouillée menant vers la lumière. Tu décides de t’en approcher, prêt à
          poursuivre ton aventure hors de ce repaire sordide.
        </p>{" "}
        <button
          onClick={() => onChoosePath && onChoosePath("dungeonCouloir")}
          style={{ marginLeft: "10px" }}
          disabled={!objetChoisi}
        >
          Continuer l'aventure
        </button>
      </div>
    );
  }

  // Défaite
  if (hero && hero.hpHero <= 0) {
    return (
      <div>
        <h2>Défaite...</h2>
        <p>Le rat géant t'a terrassé dans les égouts.</p>
        <button onClick={() => onChoosePath && onChoosePath("defaiteEgouts")}>
          Recommencer
        </button>
      </div>
    );
  }

  return (
    <>
      <div>
        <h2>Les Égouts du Donjon</h2>
        <p>
          Tu soulèves la plaque disjointe et t’enfonces dans les ténèbres
          humides des égouts. L’air est lourd, l’odeur insoutenable, et l’eau
          croupie clapote sous tes pas. Soudain, à la lueur vacillante de ta
          torche, tu aperçois au loin une silhouette massive et poilue : un
          énorme rat aux yeux rouges, prêt à bondir pour défendre son
          territoire !
        </p>
      </div>
      <div>
        <h2>Combat : Rat Géant</h2>
        <h3>Attention il t'attaque !</h3>
        <p>Points de vie du rat : {ratHp}</p>
        <p>Vos points de vie : {hero ? hero.hpHero : "?"}</p>
        <button
          onClick={handleBaseAttack}
          disabled={ratHp <= 0 || (hero && hero.hpHero <= 0)}
        >
          Attaque de base
        </button>
        <button
          onClick={handleUltimate}
          disabled={!canUseUltimate || ratHp <= 0 || (hero && hero.hpHero <= 0)}
          style={{ marginLeft: "10px" }}
        >
          Ultimate
          {!canUseUltimate && (
            <span style={{ marginLeft: "8px", color: "#f55" }}>
              ({ultimateTimer}s)
            </span>
          )}
        </button>
      </div>
    </>
  );
}

export default EnterEgouts;
