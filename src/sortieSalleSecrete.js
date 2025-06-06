import React, { useState, useEffect, useRef } from "react";
import CombatButtons from "./combatButtons.js";
import "./dungeonContent.css";
import FunctionObjet from "./functionobjet.js";

function SortieSalleSecrete({ hero, setHero, onChoosePath }) {
  // TOUS LES HOOKS D'ABORD
  const [mageHp, setMageHp] = useState(500);
  const [inv1Hp, setInv1Hp] = useState(200);
  const [inv2Hp, setInv2Hp] = useState(200);
  const [inv3Hp, setInv3Hp] = useState(200);
  const [inv4Hp, setInv4Hp] = useState(200);
  const [inv5Hp, setInv5Hp] = useState(200);
  const [inv6Hp, setInv6Hp] = useState(200);
  const [inv7Hp, setInv7Hp] = useState(200);

  const [stunStates, setStunStates] = useState({});
  const [invincibleUntil, setInvincibleUntil] = useState(0);
  const [scene, setScene] = useState("introduction");
  const [attaquePuissante, setAttaquePuissante] = useState(false);
  const [esquivePossible, setEsquivePossible] = useState(false);
  const [message, setMessage] = useState("");
  const [victoire, setVictoire] = useState(false);
  const [defaite, setDefaite] = useState(false);
  const [objetChoisi, setObjetChoisi] = useState(null);

  const attaquePuissanteEnCours = useRef(false);

  // Attaque automatique des ennemis toutes les 1 secondes
  useEffect(() => {
    if (scene !== "lancerCombat") return;
    if (victoire || defaite) return;
    const interval = setInterval(() => {
      if (invincibleUntil && Date.now() < invincibleUntil) return;

      // Attaque puissante du mage (aléatoire)
      if (
        mageHp > 0 &&
        Math.random() < 0.33 &&
        !attaquePuissanteEnCours.current
      ) {
        setAttaquePuissante(true);
        setEsquivePossible(true);
        attaquePuissanteEnCours.current = true;
        setTimeout(() => {
          setEsquivePossible(false);
          if (attaquePuissanteEnCours.current) {
            // Si pas esquivé, appliquer les dégâts puissants
            setHero((prev) => ({
              ...prev,
              hpHero: Math.max((prev.hpHero || 0) - 20, 0),
            }));
            setMessage(
              "Tu n'as pas esquivé à temps ! Le Mage t'inflige 20 dégâts puissants !"
            );
            setTimeout(() => setMessage(""), 1200);
            setAttaquePuissante(false);
            attaquePuissanteEnCours.current = false;
          }
        }, 1500);
      } else {
        // Attaque normale de tous les ennemis vivants
        let totalDegats = 0;
        if (mageHp > 0) totalDegats += 20;
        if (inv1Hp > 0) totalDegats += 4;
        if (inv2Hp > 0) totalDegats += 3;
        if (inv3Hp > 0) totalDegats += 4;
        if (inv4Hp > 0) totalDegats += 3;
        if (inv5Hp > 0) totalDegats += 2;
        if (inv6Hp > 0) totalDegats += 3;
        if (inv7Hp > 0) totalDegats += 4;

        if (totalDegats > 0) {
          setHero((prev) => ({
            ...prev,
            hpHero: Math.max((prev.hpHero || 0) - totalDegats, 0),
          }));
          setMessage(`Les ennemis t'infligent ${totalDegats} dégâts !`);
          setTimeout(() => setMessage(""), 1200);
        }
      }
    }, 1500);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [
    scene,
    mageHp,
    inv1Hp,
    inv2Hp,
    inv3Hp,
    inv4Hp,
    inv5Hp,
    inv6Hp,
    inv7Hp,
    hero,
    setHero,
    invincibleUntil,
    victoire,
    defaite,
  ]);

  // Gestion de l'esquive
  const handleEsquive = () => {
    setMessage("Tu esquives l'attaque puissante du mage !");
    setEsquivePossible(false);
    setAttaquePuissante(false);
    attaquePuissanteEnCours.current = false;
    setTimeout(() => setMessage(""), 1200);
  };

  // Victoire si tous les ennemis sont morts
  useEffect(() => {
    if (
      mageHp <= 0 &&
      inv1Hp <= 0 &&
      inv2Hp <= 0 &&
      inv3Hp <= 0 &&
      inv4Hp <= 0 &&
      inv5Hp <= 0 &&
      inv6Hp <= 0 &&
      inv7Hp <= 0
    ) {
      setVictoire(true);
      setScene("victoire");
    }
  }, [mageHp, inv1Hp, inv2Hp, inv3Hp, inv4Hp, inv5Hp, inv6Hp, inv7Hp]);

  // Défaite si le héros n'a plus de PV
  useEffect(() => {
    if (hero && hero.hpHero <= 0) {
      setDefaite(true);
      setScene("defaite");
    }
  }, [hero]);

  // --- SCÈNE INTRODUCTION ---
  if (scene === "introduction") {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>La salle du Mage Invocateur</h2>
          <p>
            Tu pénètres dans une vaste salle obscure. Un mage invocateur, au
            regard furieux, t’attend au centre du cercle magique. Autour de lui,
            sept invocations d’ombre frémissent, prêtes à attaquer à son signal.
          </p>
          <p>
            Le mage lève son bâton, la magie crépite dans l’air. Sa voix tonne :{" "}
            <br />
            <em>
              « Tu n’aurais jamais dû venir ici, intrus ! Prépare-toi à
              affronter ma colère et celle de mes serviteurs ! »
            </em>
          </p>
          <div className="donjon-btns">
            <button onClick={() => setScene("combat")}>Lancer le combat</button>
          </div>
          <img
            src="/mage-invocateur.jpg"
            alt="Mage invocateur furieux"
            className="donjon-img"
          />
        </div>
      </div>
    );
  }

  // --- SCÈNE DÉFAITE ---
  if (scene === "defaite") {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Défaite...</h2>
          <p>
            Tu as été submergé par la puissance du Mage Invocateur et de ses
            invocations. Ton aventure s’arrête ici...
          </p>
          <div className="donjon-btns">
            <button
              onClick={() =>
                onChoosePath && onChoosePath("defaiteMageInvocateur")
              }
            >
              Recommencer
            </button>
          </div>
          <img
            src="/defaite-mage.jpg"
            alt="Défaite contre le mage invocateur"
            className="donjon-img"
          />
        </div>
      </div>
    );
  }

  // --- SCÈNE VICTOIRE ---
  if (scene === "victoire") {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Victoire !</h2>
          <p>
            Tu as vaincu le Mage Invocateur et ses créatures d’ombre ! La salle
            s’illumine, et tu sens que tu as accompli un exploit rare...
          </p>
          <p>
            Au fond de la salle, un étrange téléporteur bleu pulse doucement,
            baignant la pièce d’une lumière surnaturelle. Il n’y a plus rien
            d’autre ici : tout est silencieux, comme si le temps s’était arrêté
            après ta victoire.
          </p>
          <p>
            Tu prends ton courage à deux mains, t’approches du téléporteur, le
            cœur battant. C’est ta seule issue… Vers où va-t-il te mener ? Vers
            la liberté, un nouveau défi, ou un mystère encore plus grand ? Tu
            respires un grand coup et franchis le seuil lumineux, prêt à
            affronter la suite de ton aventure.
          </p>
          <FunctionObjet
            setHero={setHero}
            objetChoisi={objetChoisi}
            setObjetChoisi={setObjetChoisi}
          />{" "}
          <div className="donjon-btns">
            <button
              onClick={() =>
                onChoosePath && onChoosePath("portailTeleporteur")
              }
            >
              Continuer l’aventure
            </button>
          </div>
          <img
            src="/victoire-mage.jpg"
            alt="Victoire contre le mage invocateur"
            className="donjon-img"
          />
        </div>
      </div>
    );
  }

  // --- SCÈNE COMBAT ---
  if (scene === "combat" || scene === "lancerCombat") {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Combat contre le Mage Invocateur</h2>
          <p>
            Le Mage Invocateur et ses 7 invocations t’encerclent. Prépare-toi à
            subir des attaques régulières !
            <br />
            Clique sur <strong>Esquiver</strong> quand le mage prépare une
            attaque puissante pour éviter 20 dégâts.
          </p>
          {esquivePossible && (
            <button
              onClick={handleEsquive}
              style={{
                marginLeft: 12,
                background: "linear-gradient(90deg, #f43f5e 0%, #fbbf24 100%)",
                color: "#fff",
                fontWeight: "bold",
                border: "2px solid #eab308",
                boxShadow: "0 0 12px #eab308, 0 0 4px #fff",
                fontSize: "1.2em",
                padding: "14px 32px",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "transform 0.1s",
                transform: "scale(1.12)",
                textShadow: "0 0 6px #000, 0 0 2px #fff",
                zIndex: 2,
              }}
            >
              ⚡ Esquiver !
            </button>
          )}
          <div className="combat-btns-row">
            <CombatButtons
              hero={hero}
              setHero={setHero}
              enemies={[
                { name: "Mage Invocateur", hp: mageHp, setHp: setMageHp },
                { name: "Invocation d'Ombre 1", hp: inv1Hp, setHp: setInv1Hp },
                { name: "Invocation d'Ombre 2", hp: inv2Hp, setHp: setInv2Hp },
                { name: "Invocation d'Ombre 3", hp: inv3Hp, setHp: setInv3Hp },
                { name: "Invocation d'Ombre 4", hp: inv4Hp, setHp: setInv4Hp },
                { name: "Invocation d'Ombre 5", hp: inv5Hp, setHp: setInv5Hp },
                { name: "Invocation d'Ombre 6", hp: inv6Hp, setHp: setInv6Hp },
                { name: "Invocation d'Ombre 7", hp: inv7Hp, setHp: setInv7Hp },
              ]}
              scene={scene}
              setScene={setScene}
              setStunStates={setStunStates}
              stunStates={stunStates}
              setInvincibleUntil={setInvincibleUntil}
            />
          </div>
          {message && (
            <div style={{ marginTop: 16, color: "#eab308" }}>{message}</div>
          )}
          <img
            src="/combat-mage.jpg"
            alt="Combat contre le mage invocateur"
            className="donjon-img"
          />
        </div>
      </div>
    );
  }
}

export default SortieSalleSecrete;
