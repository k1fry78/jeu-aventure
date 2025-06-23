import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import ChoixPerso from "./choixPerso";
import DungeonEnter from "./dungeonEnter";
import PorteEnter from "./porteEnter";
import EgoutsEnter from "./egoutsEnter";
import DungeonCouloir from "./dungeonCouloir";
import DungeonPassageEtroit from "./dungeonPassageEtroit";
import DungeonEscalier from "./dungeonEscalier";
import DungeonCellules from "./dungeonCellules";
import DungeonSpectreCombat from "./dungeonSpectreCombat";
import SalleSecreteHibou from "./salleSecreteHibou";
import SortieSalleSecrete from "./sortieSalleSecrete";

function App() {
  const [hero, setHero] = useState(null);
  const [phase, setPhase] = useState("choixPerso");
  const audioRef = useRef(null);
  const potionAudioRef = useRef(null);

  useEffect(() => {
    if (hero && hero.xp >= 200) {
      setHero((prevHero) =>
        prevHero
          ? {
              ...prevHero,
              level: (prevHero.level || 1) + Math.floor(prevHero.xp / 200),
              xp: prevHero.xp,
            }
          : prevHero
      );
    }
  }, [hero?.xp]);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
      audioRef.current.play();
    }
  };

  const handleEnterDungeon = () => {
    setPhase("enter");
  };
  const handleChoosePath = (path) => {
    if (path === "porte") {
      setPhase("enterPorte");
    } else if (path === "egouts") {
      setPhase("enterEgouts");
    }
  };
  const handleChoosePorte = () => {
    setPhase("dungeonCouloir");
  };
  const handleChoosePassageEscalier = (path) => {
    if (path === "dungeonPassageEtroit") {
      setPhase("dungeonPassageEtroit");
    } else if (path === "dungeonEscalier") {
      setPhase("dungeonEscalier");
    }
  };

  let mainContent;
  if (phase === "choixPerso") {
    mainContent = (
      <ChoixPerso
        onSelect={setHero}
        onChoosePath={handleEnterDungeon}
        startMusic={startMusic}
      />
    );
  }
  if (phase === "enter") {
    mainContent = <DungeonEnter onChoosePath={handleChoosePath} />;
  }
  if (phase === "enterPorte") {
    mainContent = (
      <PorteEnter
        onChoosePath={handleChoosePorte}
        hero={hero}
        setHero={setHero}
      />
    );
  }
  if (phase === "enterEgouts") {
    mainContent = (
      <EgoutsEnter
        onChoosePath={handleChoosePorte}
        hero={hero}
        setHero={setHero}
      />
    );
  }
  if (phase === "dungeonCouloir") {
    mainContent = (
      <DungeonCouloir
        onChoosePath={handleChoosePassageEscalier}
        hero={hero}
        setHero={setHero}
      />
    );
  }
  if (phase === "dungeonPassageEtroit") {
    mainContent = (
      <DungeonPassageEtroit
        hero={hero}
        setHero={setHero}
        onChoosePath={setPhase}
      />
    );
  }
  if (phase === "dungeonEscalier") {
    mainContent = (
      <DungeonEscalier hero={hero} setHero={setHero} onChoosePath={setPhase} />
    );
  }
  if (phase === "dungeonCellules") {
    mainContent = <DungeonCellules hero={hero} setHero={setHero} />;
  }
  if (phase === "dungeonSpectreCombat") {
    mainContent = (
      <DungeonSpectreCombat
        hero={hero}
        setHero={setHero}
        onChoosePath={setPhase}
      />
    );
  }
  if (phase === "salleSecreteHibou") {
    mainContent = (
      <SalleSecreteHibou
        onChoosePath={setPhase}
        setHero={setHero}
        hero={hero}
      />
    );
  }
  if (phase === "sortieSalleSecrete") {
    mainContent = (
      <SortieSalleSecrete
        onChoosePath={setPhase}
        setHero={setHero}
        hero={hero}
      />
    );
  }

  // Pour débloquer un skill
  const unlockSkill = (skillKey) => {
    if (!hero || hero.xp < 200) return;
    setHero((prev) => {
      const skill = prev.skillsTree[skillKey];
      if (!skill || skill.unlocked) return prev;
      return {
        ...prev,
        xp: prev.xp - 200,
        skillsTree: {
          ...prev.skillsTree,
          [skillKey]: {
            ...skill,
            unlocked: true,
          },
        },
      };
    });
  };

  // Pour améliorer un skill de niveau
  const upgradeSkill = (skillKey) => {
    if (!hero || hero.xp < 200) return;
    setHero((prev) => {
      const skill = prev.skillsTree[skillKey];
      if (!skill || !skill.unlocked || typeof skill.level !== "number")
        return prev;
      return {
        ...prev,
        xp: prev.xp - 200,
        skillsTree: {
          ...prev.skillsTree,
          [skillKey]: {
            ...skill,
            level: skill.level + 1,
          },
        },
      };
    });
  };


  const renderSkillNode = (skillsTree, key, depth = 0) => {
  const skill = skillsTree[key];
  if (!skill) return null;

  return (
    <div
      key={key}
      className={`skill-node${skill.unlocked ? " unlocked" : ""}`}
      style={{ marginLeft: depth * 14 }}
    >
      <div className="skill-content">
        <span className="skill-icon">
          {skill.unlocked ? "🟢" : "🔒"}
        </span>
        <span className="skill-name">{skill.name}</span>
        {typeof skill.level === "number" && skill.unlocked && (
          <span className="skill-level">lvl{skill.level}</span>
        )}
        {skill.unlocked && typeof skill.level === "number" && (
          <button
            className="skill-btn upgrade"
            disabled={hero.xp < 200}
            onClick={() => upgradeSkill(key)}
            title={
              hero.xp < 200
                ? "200 XP requis pour améliorer"
                : "Améliorer ce skill"
            }
          >
            +
          </button>
        )}
        {!skill.unlocked && (
          <button
            className="skill-btn unlock"
            disabled={hero.xp < 200}
            onClick={() => unlockSkill(key)}
            title={
              hero.xp < 200 ? "200 XP requis" : "Débloquer cette compétence"
            }
          >
            +
          </button>
        )}
      </div>
      {/* Connecteur visuel */}
      {skill.unlocked && skill.children && skill.children.length > 0 && (
        <div className="skill-children">
          {skill.children.map((childKey) =>
            renderSkillNode(skillsTree, childKey, depth + 1)
          )}
        </div>
      )}
    </div>
  );
};

  const renderSkillsTree = () => {
    if (!hero) return null;
    const skillsTree = hero.skillsTree;
    return (
      <div className="skills-tree-mage">
        <div className="skills-title">Arbre de compétences</div>
        <div className="skills-root">{renderSkillNode(skillsTree, "base")}</div>
      </div>
    );
  };

  return (
    <>
      {mainContent}
      <section className="game-section-fixed">
        <h1>Votre personnage</h1>
        <p>Vous êtes : {hero ? hero.name : "Aucun héros sélectionné"}</p>
        <p className="hp">
          Vos points de vie : {hero ? hero.hpHero : "Plus de vie"}
        </p>
        <p className="mana">
          Votre mana : {hero ? hero.manaHero : "Plus de mana"}
        </p>
        <p className="xp">Votre XP : {hero ? hero.xp : 0}</p>
        <p className="level">Votre niveau : {hero ? hero.level : 0}</p>
        {renderSkillsTree()}
      </section>
      <section name="song">
        <audio ref={audioRef} controls loop style={{ display: "none" }}>
          <source src="/song.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </section>
      <section className="utilitaires-right">
        <h1>Utilitaires</h1>
        <p>
          Potions de vie : {hero?.potions?.vie ?? 0} | Potions de mana :{" "}
          {hero?.potions?.mana ?? 0}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 8,
          }}
        >
          {/* Affiche une image pour chaque potion de vie */}
          {Array.from({ length: hero?.potions?.vie ?? 0 }).map((_, i) => (
            <img
              key={`vie-${i}`}
              src="/potion-vie.png"
              alt="Potion de vie"
              style={{ width: "50px", height: "60px", marginTop: "8px" }}
              onClick={() => {
                if (hero?.potions?.vie > 0) {
                  setHero((prev) => ({
                    ...prev,
                    hpHero: (prev.hpHero || 0) + 20,
                    potions: {
                      ...prev.potions,
                      vie: prev.potions.vie - 1,
                    },
                  }));
                  if (potionAudioRef.current) {
                    potionAudioRef.current.currentTime = 0;
                    potionAudioRef.current.play();
                  }
                }
              }}
            />
          ))}
          {Array.from({ length: hero?.potions?.mana ?? 0 }).map((_, i) => (
            <img
              key={`mana-${i}`}
              src="/potion-mana.png"
              alt="Potion de mana"
              style={{ width: "50px", height: "60px", marginTop: "8px" }}
              onClick={() => {
                if (hero?.potions?.mana > 0) {
                  setHero((prev) => ({
                    ...prev,
                    manaHero: (prev.manaHero || 0) + 30,
                    potions: {
                      ...prev.potions,
                      mana: prev.potions.mana - 1,
                    },
                  }));
                  if (potionAudioRef.current) {
                    potionAudioRef.current.currentTime = 0;
                    potionAudioRef.current.play();
                  }
                }
              }}
            />
          ))}
        </div>
        {/* Sons pour les potions */}
        <audio ref={potionAudioRef} src="/potion.mp3" />
      </section>
    </>
  );
}

export default App;
