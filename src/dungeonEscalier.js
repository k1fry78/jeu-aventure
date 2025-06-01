import React, { useState } from "react";
import "./dungeonContent.css";

function DungeonEscalier({ onChoosePath }) {
  const [scene, setScene] = useState("");

  if (scene === "Troll") {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Le Troll</h2>
          <p>
            Tu ouvres la porte et te retrouves face à un immense troll, assis à
            une table en bois, dévorant un énorme morceau de viande. Il lève les
            yeux vers toi, surpris, mais ne semble pas hostile. Il te fixe d’un
            air curieux.
          </p>
          <p>C'est sûr face à lui tu n'as aucune chance...</p>
          <div className="donjon-btns">
            <button onClick={() => setScene("parler")}>Parler au troll</button>
          </div>
          <img src="/troll.png" alt="Troll" className="donjon-img" />
        </div>
      </div>
    );
  }
  if (scene === "parler") {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Conversation dans la grande salle</h2>
          <p>
            Tu expliques que tu es à la recherche de la{" "}
            <strong>pierre de l'Éveil</strong> et que tu cherches des informations
            précieuses pour poursuivre ta quête.
            <br />
            La créature te fixe longuement, puis grogne : <br />
            « La pierre de l'Éveil, hein ? Je pourrais t'aider... mais seulement
            si tu réponds correctement à ma question ! »
          </p>
          <p>
            Il se penche vers toi et demande :
            <br />
            <em>
              « Quel est l’ingrédient principal de la soupe préférée des
              trolls ? »
            </em>
          </p>
          <div className="donjon-btns">
            <button onClick={() => setScene("faux")}>
              Les champignons des marais
            </button>
            <button onClick={() => setScene("vrai")} style={{ marginLeft: "10px" }}>
              Les os de gobelin
            </button>
            <button onClick={() => setScene("faux")} style={{ marginLeft: "10px" }}>
              Les racines de mandragore
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (scene === "vrai") {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Bonne réponse !</h2>
          <p>
            La créature éclate de rire, visiblement ravie : « Bien joué ! Peu d’humains connaissent nos traditions.  
            Je vais t’aider : la pierre de l’Éveil se trouve dans les profondeurs du donjon, gardée par un ancien esprit.  
            En sortant d'ici, continue de monter par les escaliers. Tu devrais t'en rapprocher... Mais prends garde, le chemin est semé d’embûches… »
          </p>
          <div className="donjon-btns">
            <button onClick={() => onChoosePath && onChoosePath("suiteAventure")}>
              Continuer l’aventure
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (scene === "faux") {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Mauvaise réponse...</h2>
          <p>
            La créature pousse un grognement furieux : « Faux ! Tu ne connais rien aux trolls ! »  
            Avant que tu puisses réagir, elle t’assomme d’un coup puissant.  
            Tu perds connaissance sur le sol froid de la grande salle…
          </p>
          <div className="donjon-btns">
            <button onClick={() => onChoosePath && onChoosePath("defaiteTroll")}>
              Recommencer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-center">
      <div className="donjon-container">
        <h2>L’Escalier de Pierre</h2>
        <p>
          Tu montes prudemment les marches de l’escalier, guidé par la lueur
          vacillante des torches. L’air se charge d’une forte odeur de viande
          rôtie et de fumée. Au sommet, le couloir débouche sur une immense porte
          en bois massif. Derrière, tu entends des bruits de mastication, des
          grognements sourds et le claquement d’os brisés. Quelque chose de très
          imposant semble festoyer de l’autre côté…
        </p>
        <div className="donjon-btns">
          <button onClick={() => setScene("Troll")}>
            Ouvrir la porte et entrer dans la grande salle
          </button>
        </div>
        <img src="/escalier-porte.jpg" alt="Escalier" className="donjon-img" />
      </div>
    </div>
  );
}

export default DungeonEscalier;