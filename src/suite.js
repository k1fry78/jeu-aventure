import React from "react";
import "./dungeonContent.css";

function Suite({ onChoosePath }) {
  return (
    <div className="page-center">
      <div className="donjon-container">
        <h2>Le couloir des cellules</h2>
        <p>
          Tu es sorti de la boutique des vampires à la hâte, le cœur battant. Derrière toi, tu entends déjà les bruits précipités des gardes du donjon qui se rapprochent dangereusement.
        </p>
        <p>
          Devant toi s’étire un long couloir très sombre, menant à une immense salle bordée de nombreuses cellules. À l’intérieur, des gobelins prisonniers, à l’allure inquiétante, poussent des hurlements étranges en te voyant passer. L’atmosphère est lourde, la tension à son comble.
        </p>
        <p>
          Tu dois agir vite : 
        </p>
        <ul>
          <li>
            <strong>Activer le levier</strong> au fond de la pièce pour ouvrir toutes les cellules : les gobelins pourraient t’aider à semer le chaos et ralentir les gardes…
          </li>
          <li>
            <strong>Te retourner et affronter les trois gardes</strong> qui te poursuivent, prêt à livrer un combat désespéré.
          </li>
          <li>
            <strong>Courir à toute vitesse</strong> vers la salle suivante, en espérant échapper à tout le monde… mais tu sais qu’un piège pourrait t’y attendre.
          </li>
        </ul>
        <p>
          Que fais-tu ?
        </p>
        <div className="donjon-btns">
          <button onClick={() => onChoosePath && onChoosePath("leverGobelins")}>
            Activer le levier et libérer les gobelins
          </button>
          <button onClick={() => onChoosePath && onChoosePath("combatGardes")} style={{ marginLeft: "10px" }}>
            Affronter les trois gardes
          </button>
          <button onClick={() => onChoosePath && onChoosePath("courirPiege")} style={{ marginLeft: "10px" }}>
            Courir vers la salle suivante (risque de piège)
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

export default Suite;