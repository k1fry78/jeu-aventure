import React, { useState, useRef } from "react";
import "./App.css";
import ChoixPerso from "./choixPerso";
import DungeonEnter from "./dungeonEnter";
import PorteEnter from "./porteEnter";
import EgoutsEnter from "./egoutsEnter";
import DungeonCouloir from "./dungeonCouloir";
import DungeonPassageEtroit from "./dungeonPassageEtroit";
import DungeonEscalier from "./dungeonEscalier";

function App() {
  const [hero, setHero] = useState(null);
  const [phase, setPhase] = useState("choixPerso");
  const audioRef = useRef(null);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1; // Met le volume à 20%
      audioRef.current.play();
    }
  };

  const handleEnterDungeon = () => {
    setPhase("enter"); // correspond à onChoosePath('enter')
  };
  // Fonction pour gérer le choix du chemin dans DungeonEnter
  const handleChoosePath = (path) => {
    if (path === "porte") {
      setPhase("enterPorte");
    } else if (path === "egouts") {
      setPhase("enterEgouts");
    }
  };
  // Fonction pour gérer le choix du chemin dans EnterPorte
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
    mainContent = <DungeonPassageEtroit hero={hero} setHero={setHero} />;
  }
  if (phase === "dungeonEscalier") {
    mainContent = <DungeonEscalier hero={hero} setHero={setHero} />;
  }

  // Votre barre de vie et autres éléments de jeu ici
  return (
    <>
      {mainContent}
      <section className="game-section-fixed">
        <h1>Votre personnage</h1>
        <p>Vous êtes : {hero ? hero.name : "Aucun héros sélectionné"}</p>
        <p class="hp">
          Vos points de vie : {hero ? hero.hpHero : "Plus de vie"}
        </p>
        <p>
          {hero ? hero.attackName : ""} : {hero ? hero.attackBase : "Aucune attaque"}
        </p>
        <p>
          {hero ? hero.ultimateName : ""} : {hero ? hero.attackUltimate : "Aucune attaque"}
        </p>
      </section>
      <section name="song">
        <audio
          ref={audioRef}
          controls
          loop
          style={{ display: "none" }}
        >
          <source src="/song.mp3" type="audio/mp3"/>
          Your browser does not support the audio element.
        </audio>
      </section>
    </>
  );
}

export default App;
