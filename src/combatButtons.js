import React, { useState, useRef } from "react";

function getSkillDamage(skill) {
  if (typeof skill.baseDamage === "number") {
    return (
      skill.baseDamage +
      (skill.level ? skill.level - 1 : 0) * (skill.damagePerLevel || 0)
    );
  }
  return 0;
}

function CombatButtons({
  hero,
  enemies, // [{ name, hp, setHp }]
  scene,
  setScene,
  stunStates,
  setStunStates,
  setInvincibleUntil,
  setHero,
}) {
  const [skillsCooldowns, setSkillsCooldowns] = useState({});
  const [selectedSkill, setSelectedSkill] = useState(null);
  const skillRefs = useRef({});
  const enemyRefs = useRef({});
  const [damageDisplays, setDamageDisplays] = useState({});
  const [baseOverride, setBaseOverride] = useState(null);
  const lancerCombatAudioRef = useRef(null);

  // Pour stocker les intervalles d'invocation
  const invocationIntervals = useRef([]);

  // Vérifie si un ennemi est stun
  const isStunned = (enemyName) => {
    const now = Date.now();
    return stunStates[enemyName] && stunStates[enemyName] > now;
  };

  // Affiche temporairement les dégâts sur la carte ennemie
  const showDamage = (enemyName, value) => {
    setDamageDisplays((prev) => ({
      ...prev,
      [enemyName]: { value, visible: true },
    }));
    setTimeout(() => {
      setDamageDisplays((prev) => ({
        ...prev,
        [enemyName]: { ...prev[enemyName], visible: false },
      }));
    }, 800);
  };

  // Sélection d'un skill
  const handleSelectSkill = (key, skill) => {
    if (scene !== "lancerCombat" || skillsCooldowns[key]) return;
    setSelectedSkill({ key, skill });
  };

  // Fonction pour gérer les invocations (loup/grizzly)
  const handleInvocation = (skill, enemyIndex) => {
    // Détermine la fréquence d'attaque (loup: 3s, grizzly: 4s)
    const intervalTime = skill.name.toLowerCase().includes("grizzly")
      ? 4000
      : 3000;
    const damage = getSkillDamage(skill);

    // Pour grizzly, attaque tous les ennemis vivants, pour loup, un seul
    const isGrizzly = skill.name.toLowerCase().includes("grizzly");

    // On arrête l'invocation après 15 secondes (modifiable)
    const duration = 15000;
    let elapsed = 0;

    const loupAudio = new Audio("/wolfattack.wav");
    const grizzlyAudio = new Audio("/grizattack.mp3");

    const interval = setInterval(() => {
      elapsed += intervalTime;
      if (isGrizzly) {
        enemies.forEach((enemy) => {
          if (enemy.hp > 0) {
            enemy.setHp((hp) => Math.max(hp - damage, 0));
            showDamage(enemy.name, -damage);
            grizzlyAudio.currentTime = 0;
            grizzlyAudio.play();
          }
        });
      } else {
        // Loup attaque un seul ennemi
        if (enemies[enemyIndex] && enemies[enemyIndex].hp > 0) {
          enemies[enemyIndex].setHp((hp) => Math.max(hp - damage, 0));
          showDamage(enemies[enemyIndex].name, -damage);
          loupAudio.currentTime = 0;
          loupAudio.play();
        }
      }
      // Arrête si durée dépassée ou ennemi mort (pour loup)
      if (
        elapsed >= duration ||
        (!isGrizzly && (!enemies[enemyIndex] || enemies[enemyIndex].hp <= 0))
      ) {
        clearInterval(interval);
      }
    }, intervalTime);

    invocationIntervals.current.push(interval);
    // Arrête l'invocation après la durée max (sécurité)
    setTimeout(() => clearInterval(interval), duration + 100);
  };

  // Application du skill à l'ennemi ciblé
  const handleAttackEnemy = (enemyIndex) => {
    if (!selectedSkill || !enemies[enemyIndex] || enemies[enemyIndex].hp <= 0)
      return;
    const { key, skill } = selectedSkill;

    // Vérifie la mana
    if (hero.manaHero < (skill.cost || 0)) {
      alert("Pas assez de mana !");
      return;
    }

    // Retire la mana du héros
    setHero &&
      setHero((prev) => ({
        ...prev,
        manaHero: prev.manaHero - (skill.cost || 0),
      }));

    // Active le buff criDeGuerre
    if (key === "criDeGuerre") {
      setBaseOverride({ damage: 60, expires: Date.now() + 12000 });
      setTimeout(() => setBaseOverride(null), 12000);
    }

    // Active le buff Protection (invincibilité)
    if (key === "protection" && typeof setInvincibleUntil === "function") {
      setInvincibleUntil(Date.now() + 8000);
      setTimeout(() => setInvincibleUntil(0), 8000);
    }

    if (skill.audio) {
      const audio = new Audio(`/${skill.audio}`);
      audio.volume = 0.5;
      audio.play();
    }

    // Gestion des invocations
    if (key === "invoqueLoup" || key === "invoqueGrizzly") {
      handleInvocation(skill, enemyIndex);
    }

    // Si le skill est multiple, applique les dégâts à tous les ennemis vivants
    if (skill.multiple && key !== "invoqueGrizzly") {
      enemies.forEach((enemy) => {
        if (enemy.hp > 0) {
          let dmg = getSkillDamage(skill);
          if (
            key === "base" &&
            baseOverride &&
            baseOverride.expires > Date.now()
          ) {
            dmg = baseOverride.damage;
          }
          enemy.setHp((hp) => Math.max(hp - dmg, 0));
          showDamage(enemy.name, -dmg);
          if (skill.stun) {
            setStunStates((prev) => ({
              ...prev,
              [enemy.name]: Date.now() + skill.stun,
            }));
          }
        }
      });
    } else if (key !== "invoqueLoup" && key !== "invoqueGrizzly") {
      let dmg = getSkillDamage(skill);
      if (key === "base" && baseOverride && baseOverride.expires > Date.now()) {
        dmg = baseOverride.damage;
      }
      enemies[enemyIndex].setHp((hp) => Math.max(hp - dmg, 0));
      showDamage(enemies[enemyIndex].name, -dmg);
      if (skill.stun) {
        setStunStates((prev) => ({
          ...prev,
          [enemies[enemyIndex].name]: Date.now() + skill.stun,
        }));
      }
    }

    // Gère le cooldown
    if (skill.cooldown) {
      setSkillsCooldowns((prev) => ({ ...prev, [key]: skill.cooldown / 1000 }));
      let timer = skill.cooldown / 1000;
      const interval = setInterval(() => {
        timer--;
        setSkillsCooldowns((prev) => ({ ...prev, [key]: timer }));
        if (timer <= 0) {
          clearInterval(interval);
          setSkillsCooldowns((prev) => {
            const copy = { ...prev };
            delete copy[key];
            return copy;
          });
        }
      }, 1000);
    }
    setSelectedSkill(null); // Désélectionne le skill après attaque
  };

  return (
    <div className="combat-center">
      <button
        onClick={() => {
          setScene("lancerCombat");
          if (lancerCombatAudioRef.current) {
            lancerCombatAudioRef.current.currentTime = 0;
            lancerCombatAudioRef.current.play();
          }
        }}
        className={scene === "lancerCombat" ? "combat-launched" : ""}
        disabled={scene === "lancerCombat"}
      >
        {scene === "lancerCombat" ? "Combat lancé !" : "Lancer le combat"}
      </button>
      <div className="donjon-btns">
        {hero &&
          hero.skillsTree &&
          Object.entries(hero.skillsTree).map(
            ([key, skill]) =>
              skill.unlocked && (
                <button
                  key={key}
                  ref={(el) => (skillRefs.current[key] = el)}
                  className={`skill-btn${
                    selectedSkill && selectedSkill.key === key
                      ? " selected"
                      : ""
                  }`}
                  onClick={() => handleSelectSkill(key, skill)}
                  disabled={scene !== "lancerCombat" || skillsCooldowns[key]}
                  title={`${skill.description}\nDégâts : ${
                    key === "base" &&
                    baseOverride &&
                    baseOverride.expires > Date.now()
                      ? baseOverride.damage
                      : getSkillDamage(skill)
                  }\nMana : ${skill.cost || 0}`}
                >
                  {skill.name}
                  {skillsCooldowns[key] && (
                    <span style={{ marginLeft: "8px", color: "#f55" }}>
                      ({skillsCooldowns[key]}s)
                    </span>
                  )}
                  {key === "base" &&
                    baseOverride &&
                    baseOverride.expires > Date.now() && (
                      <span style={{ marginLeft: "8px", color: "#2196f3" }}>
                        +Buff!
                      </span>
                    )}
                  {skill.cost ? (
                    <span style={{ marginLeft: "8px", color: "#38bdf8" }}>
                      -{skill.cost} mana
                    </span>
                  ) : null}
                </button>
              )
          )}
        <audio ref={lancerCombatAudioRef} src="/lancerCombat.mp3" />
      </div>
      <div className="enemies-row">
        {enemies.map((enemy, idx) => (
          <div
            key={enemy.name}
            ref={(el) => (enemyRefs.current[enemy.name] = el)}
            className={`enemy-card${enemy.hp <= 0 ? " defeated" : ""}${
              isStunned(enemy.name) ? " stunned" : ""
            }`}
            onClick={() => handleAttackEnemy(idx)}
            style={{
              border: selectedSkill ? "2px solid #3b82f6" : "1px solid #ccc",
              cursor: selectedSkill && enemy.hp > 0 ? "pointer" : "not-allowed",
              opacity: enemy.hp <= 0 ? 0.5 : 1,
              margin: "10px",
              padding: "10px",
              display: "inline-block",
              minWidth: "120px",
              position: "relative",
              background: isStunned(enemy.name) ? "#b3e0ff" : "white",
            }}
          >
            <h4>{enemy.name}</h4>
            <p>PV : {enemy.hp}</p>
            {isStunned(enemy.name) && (
              <span style={{ color: "#2196f3", fontWeight: "bold" }}>
                Stun !
              </span>
            )}
            {damageDisplays[enemy.name]?.visible && (
              <span
                style={{
                  position: "absolute",
                  top: 5,
                  right: 10,
                  color: "#f55",
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  pointerEvents: "none",
                  animation: "fadeUp 0.8s",
                }}
              >
                {damageDisplays[enemy.name].value}
              </span>
            )}
          </div>
        ))}
      </div>
      {/* Animation CSS */}
      <style>
        {`
          @keyframes fadeUp {
            0% { opacity: 1; transform: translateY(0);}
            100% { opacity: 0; transform: translateY(-30px);}
          }
        `}
      </style>
    </div>
  );
}

export default CombatButtons;
