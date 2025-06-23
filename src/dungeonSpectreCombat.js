import React, { useState, useEffect, useRef } from "react";
import CombatButtons from "./combatButtons";
import "./dungeonContent.css";
import FunctionObjet from "./functionobjet.js";

function DungeonSpectreCombat({ hero, setHero, onChoosePath }) {
  const [scene, setScene] = useState("");
  const [creatureTenebreuseHp, setCreatureTenebreuseHp] = useState(50);
  const [spectreProtecteurHp, setSpectreProtecteurHp] = useState(250);
  const [stunStates, setStunStates] = useState({});
  const [invincibleUntil, setInvincibleUntil] = useState(0);
  const spectreProtecteureXpGiven = useRef(false);
  const creatureTenebreuseXpGiven = useRef(false);
  const [objetChoisi, setObjetChoisi] = useState(null);
  const [victoireAffichee, setVictoireAffichee] = useState(false);

  // Pour la scène du hibou
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const isStunned = (enemyName) => {
    const now = Date.now();
    return stunStates[enemyName] && stunStates[enemyName] > now;
  };

  useEffect(() => {
    if (scene !== "lancerCombat") return;
    if (creatureTenebreuseHp <= 0 && spectreProtecteurHp <= 0) return;
    if (!hero || hero.hpHero <= 0) return;

    const interval = setInterval(() => {
      let audio1 = new Audio("/spectreattack.wav");
      audio1.volume = 0.3;
      audio1.play();
      audio1.onended = () => {
        let audio2 = new Audio("/playerhit.mp3");
        audio2.volume = 0.3;
        audio2.play();
      };
      if (invincibleUntil && Date.now() < invincibleUntil) return;
      let degats = 0;
      if (creatureTenebreuseHp > 0 && !isStunned("Créature ténébreuse"))
        degats += 15;
      if (spectreProtecteurHp > 0 && !isStunned("Esprit protecteur"))
        degats += 2;
      if (degats > 0) {
        setHero((prev) =>
          prev ? { ...prev, hpHero: Math.max(prev.hpHero - degats, 0) } : prev
        );
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [
    scene,
    creatureTenebreuseHp,
    spectreProtecteurHp,
    hero,
    setHero,
    stunStates,
    invincibleUntil,
  ]);

  // Donne de l'XP à la victoire, une seule fois
  useEffect(() => {
    if (creatureTenebreuseHp <= 0 && !creatureTenebreuseXpGiven.current) {
      setHero((prevHero) =>
        prevHero ? { ...prevHero, xp: (prevHero.xp || 0) + 150 } : prevHero
      );
      creatureTenebreuseXpGiven.current = true;
    }
    if (spectreProtecteurHp <= 0 && !spectreProtecteureXpGiven.current) {
      setHero((prevHero) =>
        prevHero ? { ...prevHero, xp: (prevHero.xp || 0) + 50 } : prevHero
      );
      spectreProtecteureXpGiven.current = true;
    }
  }, [
    creatureTenebreuseHp,
    spectreProtecteurHp,
    setHero,
    creatureTenebreuseXpGiven,
    spectreProtecteureXpGiven,
  ]);

  // La créature ténébreuse récupère ses PV tant que le spectre est vivant
  useEffect(() => {
    if (scene !== "lancerCombat") return;
    if (spectreProtecteurHp > 0 && creatureTenebreuseHp < 50) {
      setCreatureTenebreuseHp(50);
    }
  }, [spectreProtecteurHp, scene, creatureTenebreuseHp]);

  // Victoire
  if (
    creatureTenebreuseHp <= 0 &&
    spectreProtecteurHp <= 0 &&
    !victoireAffichee
  ) {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Victoire !</h2>
          <p>
            Tu as vaincu l’esprit protecteur et la créature ténébreuse ! Leur
            corps se dissipent dans l’air, laissant derrière eux une aura de
            paix et de sérénité. Tu sens que la menace qui pesait sur le donjon
            est désormais écartée.
          </p>
          <p>
            Alors que tu te relèves, tu remarques un objet scintillant au sol,
            vestige de la bataille. Tu t’en approches et le ramasses, prêt à
            poursuivre ton aventure.
          </p>
          <FunctionObjet
            setHero={setHero}
            objetChoisi={objetChoisi}
            setObjetChoisi={setObjetChoisi}
          />
          <div className="donjon-btns">
            <button
              onClick={() => {
                setVictoireAffichee(true);
                setScene("suiteDonjon");
              }}
            >
              Continuer l'aventure
            </button>
          </div>
          <img
            src="/esprit-louve-vaincu.jpg"
            alt="Esprit de la louve vaincu"
            className="donjon-img"
          />
        </div>
      </div>
    );
  }

  // Suite du donjon : couloir avec statue de hibou
  if (scene === "suiteDonjon") {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Le couloir mystérieux</h2>
          <p>
            Tu avances dans un long couloir de pierre, faiblement éclairé par
            des torches vacillantes. Sur le mur, tu remarques une{" "}
            <span
              style={{
                color: "#eab308",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => setShowPassword(true)}
              title="Examiner la statue"
            >
              statue de hibou
            </span>{" "}
            aux yeux perçants, semblant t’observer.
          </p>
          {!showPassword && (
            <div className="donjon-btns">
              <button
                onClick={() => setScene("trappeDonjon")}
                style={{ marginLeft: 12 }}
              >
                {" "}
                Continuer dans le couloir
              </button>
            </div>
          )}
          {showPassword && (
            <div style={{ marginTop: 16 }}>
              <p>
                Une voix grave résonne dans ta tête :{" "}
                <em>« Seul l’initié connaîtra le mot secret… »</em>
              </p>
              <input
                type="text"
                placeholder="Entrer le mot de passe"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError(false);
                }}
                style={{ padding: "4px", fontSize: "1em" }}
              />
              <button
                style={{ marginLeft: 8 }}
                onClick={() => {
                  if (passwordInput.trim().toLowerCase() === "rocambole") {
                    setScene("salleSecrete");
                  } else {
                    setPasswordError(true);
                  }
                }}
              >
                Valider
              </button>
              <button
                style={{ marginLeft: 8 }}
                onClick={() => setShowPassword(false)}
              >
                Annuler
              </button>
              {passwordError && (
                <div style={{ color: "red", marginTop: 8 }}>
                  Mot de passe incorrect.
                </div>
              )}
            </div>
          )}
          <img
            src="/statue-hibou.jpg"
            alt="Statue de hibou"
            className="donjon-img"
          />
        </div>
      </div>
    );
  }

  // Salle secrète si bon mot de passe
  if (scene === "salleSecrete") {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Salle secrète du hibou</h2>
          <p>
            La statue pivote lentement, révélant un passage caché. Tu t’y
            engouffres et découvres une salle secrète, remplie de trésors
            oubliés et de mystérieux symboles gravés sur les murs.
          </p>
          <div className="donjon-btns">
            <button
              onClick={() => onChoosePath && onChoosePath("salleSecreteHibou")}
            >
              Explorer la salle secrète
            </button>
          </div>
          <img
            src="/salle-secrete-hibou.jpg"
            alt="Salle secrète du hibou"
            className="donjon-img"
          />
        </div>
      </div>
    );
  }

  // Trappe si on ignore la statue
  if (scene === "trappeDonjon") {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>La trappe piégée</h2>
          <p>
            Tu poursuis ton chemin sans prêter attention à la statue. Soudain,
            le sol se dérobe sous tes pieds ! Tu tombes dans une trappe et
            atterris lourdement dans une cellule sombre, au cœur du donjon.
          </p>
          <div className="donjon-btns">
            <button
              onClick={() => onChoosePath && onChoosePath("dungeonCellules")}
            >
              Se relever et explorer les cellules
            </button>
          </div>
          <img
            src="/cellule-donjon.jpg"
            alt="Cellules du donjon"
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
          <p>
            Tu as été vaincu par l’esprit protecteur et la créature ténébreuse.
            Leur puissance était trop grande, et tu n’as pas pu survivre à cette
            bataille. Le donjon retombe dans le silence, et tu te sens sombrer
            dans l’obscurité.
          </p>
          <div className="donjon-btns">
            <button
              onClick={() => {
                setScene("");
                onChoosePath && onChoosePath("defaiteDonjon");
              }}
            >
              Recommencer
            </button>
          </div>
          <img
            src="/defaite-esprit-creature.jpg"
            alt="Défaite contre l'esprit et la créature"
            className="donjon-img"
          />
        </div>
      </div>
    );
  }

  if (scene === "combatEspritEtCreature" || scene === "lancerCombat") {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Combat contre l'esprit et la créature</h2>
          <p>
            Tu te prépares à affronter l’esprit protecteur et la créature
            ténébreuse. Utilise tes compétences pour vaincre ces adversaires
            redoutables.
          </p>
          <div className="combat-btns-row">
            <CombatButtons
              hero={hero}
              setHero={setHero}
              enemies={[
                {
                  name: "Esprit protecteur",
                  hp: spectreProtecteurHp,
                  setHp: setSpectreProtecteurHp,
                },
                {
                  name: "Créature ténébreuse",
                  hp: creatureTenebreuseHp,
                  setHp: setCreatureTenebreuseHp,
                },
              ]}
              scene={scene}
              setScene={setScene}
              setStunStates={setStunStates}
              stunStates={stunStates}
              setInvincibleUntil={setInvincibleUntil}
            />
          </div>
        </div>
      </div>
    );
  }

  // Page initial
  return (
    <div className="page-center">
      <div className="donjon-container">
        <h2>Attaque de l'esprit protecteur et de la créature ténébreuse</h2>
        <p>
          Alors que tu avances dans le passage secret, une brume glaciale
          s'élève soudain du sol. Elle prend la forme d’un esprit de louve
          spectrale, aux yeux luisants et au pelage éthéré.
        </p>
        <p>
          À ses côtés surgit une créature ténébreuse, massive et menaçante, dont
          la silhouette semble absorber la lumière autour d’elle.
        </p>
        <p>
          L’esprit protecteur pousse un hurlement spectral et, sans te laisser
          le temps de réagir, se jette sur toi, suivi de la créature
          ténébreuse : tu dois te battre pour survivre !
        </p>
        <div className="donjon-btns">
          <button onClick={() => setScene("combatEspritEtCreature")}>
            Se défendre contre l’esprit et la créature
          </button>
        </div>
        <img
          src="/esprit-louve.jpg"
          alt="Esprit de la louve"
          className="donjon-img"
        />
      </div>
    </div>
  );
}

export default DungeonSpectreCombat;
