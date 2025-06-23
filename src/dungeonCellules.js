import React, { useState, useEffect, useRef } from "react";
import CombatButtons from "./combatButtons.js";
import "./dungeonContent.css";
import FunctionObjet from "./functionobjet.js";

function DungeonCellules({ onChoosePath, hero, setHero }) {
  const [scene, setScene] = useState("choix");
  const [etape, setEtape] = useState(0);
  const [rate, setRate] = useState(false);
  const [objetChoisi, setObjetChoisi] = useState(null);
  const [piegeStep, setPiegeStep] = useState(0);
  const [piegeRate, setPiegeRate] = useState(false);
  const [piegeTimer, setPiegeTimer] = useState(null);
  const [garde1Hp, setGarde1Hp] = useState(200);
  const [garde2Hp, setGarde2Hp] = useState(200);
  const [garde3Hp, setGarde3Hp] = useState(200);
  const [stunStates, setStunStates] = useState({});
  const [invincibleUntil, setInvincibleUntil] = useState(0);
  const garde1XpGiven = useRef(false);
  const garde2XpGiven = useRef(false);
  const garde3XpGiven = useRef(false);

  const isStunned = (enemyName) => {
    const now = Date.now();
    return stunStates[enemyName] && stunStates[enemyName] > now;
  };

  // Attaque automatique des gardes pendant le combat
  useEffect(() => {
    if (scene !== "lancerCombat") return;
    if (garde1Hp <= 0 && garde2Hp <= 0 && garde3Hp <= 0) return;
    if (!hero || hero.hpHero <= 0) return;

    const interval = setInterval(() => {
      let audio1 = new Audio("/gardes.mp3");
      audio1.volume = 0.3;
      audio1.play();
      audio1.onended = () => {
        let audio2 = new Audio("/playerhit.mp3");
        audio2.volume = 0.3;
        audio2.play();
      };
      if (invincibleUntil && Date.now() < invincibleUntil) return;
      let degats = 0;
      if (garde1Hp > 0 && !isStunned("Garde 1")) degats += 10;
      if (garde2Hp > 0 && !isStunned("Garde 2")) degats += 12;
      if (garde3Hp > 0 && !isStunned("Garde 3")) degats += 15;
      if (degats > 0) {
        setHero((prev) =>
          prev ? { ...prev, hpHero: Math.max(prev.hpHero - degats, 0) } : prev
        );
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [
    scene,
    garde1Hp,
    garde2Hp,
    garde3Hp,
    hero,
    setHero,
    stunStates,
    invincibleUntil,
  ]);

  // Donne de l'XP à la victoire, une seule fois
  useEffect(() => {
    if (garde1Hp <= 0 && !garde1XpGiven.current) {
      setHero((prevHero) =>
        prevHero ? { ...prevHero, xp: (prevHero.xp || 0) + 33 } : prevHero
      );
      garde1XpGiven.current = true;
    }
    if (garde2Hp <= 0 && !garde2XpGiven.current) {
      setHero((prevHero) =>
        prevHero ? { ...prevHero, xp: (prevHero.xp || 0) + 33 } : prevHero
      );
      garde2XpGiven.current = true;
    }
    if (garde3Hp <= 0 && !garde3XpGiven.current) {
      setHero((prevHero) =>
        prevHero ? { ...prevHero, xp: (prevHero.xp || 0) + 34 } : prevHero
      );
      garde3XpGiven.current = true;
    }
  }, [garde1Hp, garde2Hp, garde3Hp, setHero]);

  // Gestion du timer pour chaque étape du piège
  useEffect(() => {
    if (scene === "courirPiege" && !piegeRate && piegeStep < 3) {
      const timer = setTimeout(() => {
        setPiegeRate(true); // Si le joueur ne clique pas assez vite
      }, 1200); // 1,2 seconde pour cliquer
      setPiegeTimer(timer);
      return () => clearTimeout(timer);
    }
  }, [scene, piegeStep, piegeRate]);

  // Si dans la scene libreGobelins c'est raté, le héros perds 20 points de vie
  useEffect(() => {
    if (scene === "libreGobelins" && rate && hero && hero.hpHero > 0) {
      setHero((prev) => ({ ...prev, hpHero: prev.hpHero - 50 }));
    }
    // eslint-disable-next-line
  }, [rate, scene]);

  // --- Évasion discrète après avoir libéré les gobelins ---
  if (scene === "libreGobelins") {
    // Si le joueur rate une action
    if (rate) {
      return (
        <div className="page-center">
          <div className="donjon-container">
            <h2>Repéré par les gobelins !</h2>
            <p>
              Tu fais un faux mouvement : un gobelin t’aperçoit et hurle. En un
              instant, la horde se retourne contre toi et t’attaque ! Tu dois
              fuir en vitesse, mais tu prends quelques coups au passage…
            </p>
            <div className="donjon-btns">
              <button
                onClick={() => {
                  setHero((prev) => ({ ...prev, hpHero: prev.hpHero - 12 }));
                  onChoosePath && onChoosePath("suiteDonjon");
                }}
              >
                Fuir malgré les blessures
              </button>
            </div>
            <img
              src="/gobelins-liberes.jpg"
              alt="Gobelins déchaînés"
              className="donjon-img"
              style={{ marginTop: "18px" }}
            />
          </div>
        </div>
      );
    }

    // Étape 1 : Se cacher ou courir
    if (etape === 0) {
      return (
        <div className="page-center">
          <div className="donjon-container">
            <h2>S’éclipser discrètement…</h2>
            <p>
              Les gobelins déchaînés poursuivent les gardes. Tu dois profiter du
              chaos pour t’éclipser sans te faire remarquer. Que fais-tu ?
            </p>
            <div className="donjon-btns">
              <button onClick={() => setEtape(1)}>
                Te glisser derrière une cage et ramper lentement
              </button>
              <button
                onClick={() => setRate(true)}
                style={{ marginLeft: "10px" }}
              >
                Traverser la salle en courant
              </button>
              <button
                onClick={() => setRate(true)}
                style={{ marginLeft: "10px" }}
              >
                Tenter de te mêler à la foule des gobelins
              </button>
            </div>
          </div>
        </div>
      );
    }
    // Étape 2 : Réagir à un obstacle
    if (etape === 1) {
      return (
        <div className="page-center">
          <div className="donjon-container">
            <h2>Un obstacle imprévu…</h2>
            <p>
              Un gobelin s’arrête juste devant toi, flairant l’air. Tu dois
              réagir vite pour ne pas te faire repérer !
            </p>
            <div className="donjon-btns">
              <button onClick={() => setEtape(2)}>
                Rester immobile et retenir ta respiration
              </button>
              <button
                onClick={() => setRate(true)}
                style={{ marginLeft: "10px" }}
              >
                Chuchoter pour détourner son attention
              </button>
              <button
                onClick={() => setRate(true)}
                style={{ marginLeft: "10px" }}
              >
                Faire demi-tour rapidement
              </button>
            </div>
          </div>
        </div>
      );
    }
    // Étape 3 : Dernière action
    if (etape === 2) {
      return (
        <div className="page-center">
          <div className="donjon-container">
            <h2>La sortie est proche…</h2>
            <p>
              Tu aperçois la porte de sortie, mais un groupe de gobelins bloque
              le passage. Que fais-tu ?
            </p>
            <div className="donjon-btns">
              <button
                onClick={() => onChoosePath && onChoosePath("suiteDonjon")}
              >
                Attendre qu’ils partent puis filer discrètement
              </button>
              <button
                onClick={() => setRate(true)}
                style={{ marginLeft: "10px" }}
              >
                Tenter de les contourner en vitesse
              </button>
              <button
                onClick={() => setRate(true)}
                style={{ marginLeft: "10px" }}
              >
                Lancer un objet pour faire diversion
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
  // SCENE piege
  if (scene === "courirPiege") {
    // Si le joueur rate une étape
    if (piegeRate) {
      return (
        <div className="page-center">
          <div className="donjon-container">
            <h2>Tu as déclenché le piège !</h2>
            <p>
              Tu n’as pas réagi assez vite : des dalles s’enfoncent sous tes
              pieds, des fléchettes jaillissent des murs ! Tu perds 15 points de
              vie.
            </p>
            <div className="donjon-btns">
              <button
                onClick={() => {
                  setHero((prev) => ({ ...prev, hpHero: prev.hpHero - 50 }));
                  onChoosePath && onChoosePath("suiteDonjon");
                }}
              >
                Continuer malgré la blessure
              </button>
            </div>
            <img
              src="/piege-flèches.jpg"
              alt="Piège déclenché"
              className="donjon-img"
              style={{ marginTop: "18px" }}
            />
          </div>
        </div>
      );
    }

    // Étapes d'esquive rapide
    const etapesPiege = [
      {
        texte: "Une dalle s’enfonce sous ton pied ! Clique vite pour sauter !",
        bouton: "Sauter !",
      },
      {
        texte:
          "Des fléchettes fusent sur ta droite ! Clique vite pour te baisser !",
        bouton: "Se baisser !",
      },
      {
        texte:
          "Une grille tombe devant toi ! Clique vite pour rouler dessous !",
        bouton: "Rouler !",
      },
    ];

    if (piegeStep < etapesPiege.length) {
      return (
        <div className="page-center">
          <div className="donjon-container">
            <h2>Un piège se déclenche !</h2>
            <p>{etapesPiege[piegeStep].texte}</p>
            <div className="donjon-btns">
              <button
                onClick={() => {
                  clearTimeout(piegeTimer);
                  setPiegeStep((s) => s + 1);
                }}
                autoFocus
              >
                {etapesPiege[piegeStep].bouton}
              </button>
            </div>
            <img
              src="/piege-couloir.jpg"
              alt="Piège du couloir"
              className="donjon-img"
              style={{ marginTop: "18px" }}
            />
          </div>
        </div>
      );
    }

    // Succès : toutes les étapes réussies
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Tu as esquivé le piège !</h2>
          <p>
            Grâce à tes réflexes, tu franchis le couloir piégé sans une
            égratignure et poursuis ta fuite !
          </p>
          <div className="donjon-btns">
            <button onClick={() => onChoosePath && onChoosePath("suiteDonjon")}>
              Continuer l’aventure
            </button>
          </div>
          <img
            src="/piege-reussi.jpg"
            alt="Piège esquivé"
            className="donjon-img"
            style={{ marginTop: "18px" }}
          />
        </div>
      </div>
    );
  }

  if (hero && hero.hpHero <= 0) {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Défaite...</h2>
          <p>
            Les trois gardes t'ont submergé malgré ta bravoure. Tu t'effondres
            sur le sol du donjon, vaincu par leur force supérieure...
          </p>
          <div className="donjon-btns">
            <button
              onClick={() => onChoosePath && onChoosePath("defaiteCellules")}
            >
              Recommencer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Victoire
  if (garde1Hp <= 0 && garde2Hp <= 0 && garde3Hp <= 0) {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Victoire !</h2>
          <p>
            Tu as vaincu les trois gardes dans un combat acharné. Épuisé mais
            victorieux, tu peux poursuivre ta route dans le donjon.
          </p>
          <div className="donjon-btns">
            <button onClick={() => onChoosePath && onChoosePath("suiteDonjon")}>
              Continuer l'aventure
            </button>
          </div>
          <FunctionObjet
            setHero={setHero}
            objetChoisi={objetChoisi}
            setObjetChoisi={setObjetChoisi}
          />{" "}
          <img
            src="/gardes-vaincus.jpg"
            alt="Gardes vaincus"
            className="donjon-img"
            style={{ marginTop: "18px" }}
          />
        </div>
      </div>
    );
  }

  // Combat en cours
  if (scene === "combatGardes" || scene === "lancerCombat") {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Combat contre les trois gardes</h2>
          <p>
            Trois gardes du donjon te barrent la route, armes à la main.
            Prépare-toi à un affrontement difficile !
          </p>
          <div className="combat-btns-row">
            <CombatButtons
              hero={hero}
              setHero={setHero}
              enemies={[
                { name: "Garde 1", hp: garde1Hp, setHp: setGarde1Hp },
                { name: "Garde 2", hp: garde2Hp, setHp: setGarde2Hp },
                { name: "Garde 3", hp: garde3Hp, setHp: setGarde3Hp },
              ]}
              scene={scene}
              setScene={setScene}
              setStunStates={setStunStates}
              stunStates={stunStates}
              setInvincibleUntil={setInvincibleUntil}
            />
          </div>
          <img
            src="/gardes-combat.jpg"
            alt="Combat contre les gardes"
            className="donjon-img"
            style={{ marginTop: "18px" }}
          />
        </div>
      </div>
    );
  }

  // --- Vue par défaut ---
  return (
    <div className="page-center">
      <div className="donjon-container">
        <h2>Le couloir des cellules</h2>
        <p>
          Tu es sorti de la boutique des vampires à la hâte, le cœur battant.
          Derrière toi, tu entends déjà les bruits précipités des gardes du
          donjon qui se rapprochent dangereusement.
        </p>
        <p>
          Devant toi s’étire un long couloir très sombre, menant à une immense
          salle bordée de nombreuses cellules. À l’intérieur, des gobelins
          prisonniers, à l’allure inquiétante, poussent des hurlements étranges
          en te voyant passer. L’atmosphère est lourde, la tension à son comble.
        </p>
        <p>Tu dois agir vite :</p>
        <ul>
          <li>
            <strong>Actionner le levier</strong> mystérieux au fond de la
            pièce : il semble relié à un mécanisme complexe, mais tu ignores ce
            qu’il déclenchera…
          </li>
          <li>
            <strong>Te retourner et affronter les trois gardes</strong> qui te
            poursuivent, prêt à livrer un combat désespéré.
          </li>
          <li>
            <strong>Courir à toute vitesse</strong> vers la salle suivante, en
            espérant échapper à tout le monde…
          </li>
        </ul>
        <p>Que fais-tu ?</p>
        <div className="donjon-btns">
          <button onClick={() => setScene("libreGobelins")}>
            Activer l'étrange levier
          </button>
          <button
            onClick={() => setScene("combatGardes")}
            style={{ marginLeft: "10px" }}
          >
            Affronter les trois gardes
          </button>
          <button
            onClick={() => setScene("courirPiege")}
            style={{ marginLeft: "10px" }}
          >
            Courir vers la salle suivante
          </button>
        </div>
        <img
          src="/cellules-gobelins.jpg"
          alt="Salle des cellules et gobelins"
          className="donjon-img"
          style={{ marginTop: "18px" }}
        />
      </div>
    </div>
  );
}

export default DungeonCellules;
