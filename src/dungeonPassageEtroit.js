import React, { useState, useEffect } from "react";
import "./dungeonContent.css";
import CombatButtons from "./combatButtons";
import FunctionObjet from "./functionobjet.js";

function DungeonPassageEtroit({ onChoosePath, hero, setHero }) {
  const [scene, setScene] = useState("choix");
  const [objetChoisi, setObjetChoisi] = useState(null);
  const [vampire1Hp, setVampire1Hp] = useState(80);
  const [vampire2Hp, setVampire2Hp] = useState(80);
  const [enemyName, setEnemyName] = useState("Vampire 1, Vampire 2");

  // Le 1er vampire attaque toutes les 2 secondes de 5 dégats
  useEffect(() => {
    if (scene !== "lancerCombat") return;
    if (vampire1Hp <= 0 || (hero && hero.hpHero <= 0)) return;
    let interval = setInterval(() => {
      const audio = new Audio("/hitBarbare.mp3");
      audio.volume = 0.3;
      audio.play();
      setHero((prevHero) =>
        prevHero
          ? { ...prevHero, hpHero: Math.max(prevHero.hpHero - 4, 0) }
          : prevHero
      );
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [vampire1Hp, scene]);

  // Le 2ème vampire attaque toutes les 3 secondes de 5 dégats
  useEffect(() => {
    if (scene !== "lancerCombat") return;
    if (vampire2Hp <= 0 || (hero && hero.hpHero <= 0)) return;
    let interval = setInterval(() => {
      const audio = new Audio("/hitBarbare.mp3");
      audio.volume = 0.3;
      audio.play();
      setHero((prevHero) =>
        prevHero
          ? { ...prevHero, hpHero: Math.max(prevHero.hpHero - 3, 0) }
          : prevHero
      );
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [vampire2Hp, scene]);

  // Vue spéciale si le joueur tente de fuir
  if (scene === "fuite") {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Rencontre inattendue</h2>
          <p>
            Les trois personnes éclatent de rire : « Hey, venez là ! On a des
            choses à vendre ! » Vous découvrez qu’il s’agit en réalité de
            boutiquiers du donjon, à l’allure étrange… L’un d’eux s’incline :
            « Nous sommes des vampires, voyageurs. Nous pouvons vous vendre un
            objet précieux… en échange d’un peu de votre sang. » Un autre
            ajoute, sourire aux lèvres : « Sinon, on peut aussi le prendre par
            la force… »
          </p>
          <p>
            Vous devez choisir entre deux objets, contre{" "}
            <strong>10 points de vie</strong> :
          </p>
          <div className="donjon-btns">
            <button
              onClick={() => {
                setHero((prev) => ({
                  ...prev,
                  hpHero: prev.hpHero - 15,
                  attackBase: prev.attackBase + 5,
                }));
                setObjetChoisi("lameDeSang");
              }}
              style={{ marginLeft: "10px" }}
            >
              Acheter la lame de sang (+5 dégats de base et -15 points de vie
              max)
            </button>
            <button
              onClick={() => {
                setHero((prev) => ({
                  ...prev,
                  hpHero: prev.hpHero - 10,
                  attackUltimate: prev.attackUltimate + 10,
                }));
                setObjetChoisi("bagueEnsorcelee");
              }}
              style={{ marginLeft: "10px" }}
            >
              Acheter une bague ensorcelée (+10 dégats de l'attaque ultime)
            </button>
          </div>
          {objetChoisi && (
            <p style={{ color: "green", marginTop: "10px" }}>
              Tu as choisi :{" "}
              {objetChoisi === "lameDeSang"
                ? "la lame de sang(+5 dégats de base et -15 points de vie)"
                : "la bague ensorcelée (+10 dégât de l'ultimate)"}
            </p>
          )}
          <div className="donjon-btns">
            <button
              onClick={() => onChoosePath && onChoosePath("combatVampires")}
              style={{ marginLeft: "10px" }}
            >
              Continuer l'aventure
            </button>
          </div>
          <img src="/vampires.webp" alt="Vampires" className="donjon-img" />
        </div>
      </div>
    );
  }

  if (vampire1Hp <= 0 && vampire2Hp <= 0) {
    // Victoire
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Victoire éclatante !</h2>
          <p>
            Tu as triomphé des vampires ! Leurs corps gisent au sol, et tu sens
            la tension se dissiper. Tu as prouvé ta force et ta détermination
            face à ces créatures de la nuit.
          </p>
          <p>
            Tu poursuis ta route dans le donjon, le souffle court après ce
            combat éprouvant. Mais alors que tu reprends tes esprits, tu
            remarques une boutique un peu plus loin, remplie de plusieurs objets
            étranges. Tu comprends alors que ces vampires n’étaient en réalité
            que de simples boutiquiers du donjon, prêts à vendre leurs trésors
            aux aventuriers…
          </p>
          <div className="donjon-btns">
            <button
              onClick={() => onChoosePath && onChoosePath("dungeonEscalier")}
              style={{ marginLeft: "10px" }}
            >
              Continuer l'aventure
            </button>
          </div>
          <FunctionObjet
            setHero={setHero}
            objetChoisi={objetChoisi}
            setObjetChoisi={setObjetChoisi}
          />{" "}
          <img
            src="/trésor-boutiquier.jpg"
            alt="Passage étroit victorieux"
            className="donjon-img"
          />
        </div>
      </div>
    );
  }
  if (hero && hero.hpHero <= 0) {
    // Défaite
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Défaite...</h2>
          <p>
            Les vampires t'ont submergé dans le passage étroit. Tu as combattu
            avec bravoure, mais leurs crocs acérés ont eu raison de toi. Le
            donjon a une nouvelle victime…
          </p>
          <div className="donjon-btns">
            <button
              onClick={() =>
                onChoosePath && onChoosePath("defaitePassageEtroit")
              }
            >
              Recommencer
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (scene === "combat" || scene === "lancerCombat") {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Combat : Vampires</h2>
          <p>
            Le silence se brise soudain : trois silhouettes bondissent hors de
            l’ombre, leurs yeux rouges brillant dans la pénombre. Tu distingues
            maintenant leurs crocs acérés et leur peau pâle : ce sont des
            vampires ! Mais alors que tu t’apprêtes à combattre, tu remarques
            que l’un d’eux, l’air terrifié, se met en retrait et refuse de
            participer à l’attaque. Tu fais donc face à deux vampires
            déterminés, tandis que le troisième reste prudemment à l’écart. Sans
            hésiter, tu dégaines ton arme et engages le combat. Tes premiers
            coups frappent l’un d’eux de plein fouet, mais la horde se resserre
            autour de toi, sifflant et grognant. Le combat commence, ta vie ne
            tient plus qu’à un fil face à ces créatures assoiffées de sang…
          </p>
          <CombatButtons
            hero={hero}
            enemyHp={vampire1Hp}
            setEnemyHp={setVampire1Hp}
            scene={scene}
            setScene={setScene}
            enemyName="Vampire 1"
          />
          <CombatButtons
            hero={hero}
            enemyHp={vampire2Hp}
            setEnemyHp={setVampire2Hp}
            scene={scene}
            setScene={setScene}
            enemyName="Vampire 2"
          />
          <img
            src="/vampires-attack.png"
            alt="Combat contre la horde"
            className="donjon-img"
          />
        </div>
      </div>
    );
  }
  // Vue par défaut : choix initial
  return (
    <div className="page-center">
      <div className="donjon-container">
        <h2>Passage étroit – Embuscade !</h2>
        <p>
          Vous avancez prudemment dans le passage étroit, plongé dans une
          obscurité presque totale. Les bruits inquiétants se font de plus en
          plus proches… Soudain, à la lueur vacillante de votre torche, vous
          distinguez trois silhouettes aux yeux brillants : ils vous
          interpellent ! Vous êtes cerné, et derrière vous, les bruits de pas
          précipités des gardes résonnent : ils ne sont plus qu’à quelques
          salles de vous, prêts à fondre sur votre position.
        </p>
        <p>Que faites-vous ?</p>
        <div className="donjon-btns">
          <button onClick={() => setScene("combat")}>
            Vous vous préparez au combat, le cœur battant, prêt à affronter
            cette horde...
          </button>
          <button
            onClick={() => setScene("fuite")}
            style={{ marginLeft: "10px" }}
          >
            Vous tentez de fuir discrètement, espérant échapper à l'embuscade…
          </button>
        </div>
        <img
          src="/passage-etroit-silhouette.png"
          alt="Passage étroit"
          className="donjon-img"
        />
      </div>
    </div>
  );
}

export default DungeonPassageEtroit;
