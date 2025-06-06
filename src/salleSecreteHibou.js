import React, { useState, useEffect } from "react";

function SalleSecreteHibou({ onChoosePath, setHero }) {
  const [scene, setScene] = useState("choix");
  const [reponse, setReponse] = useState("");
  const [erreur, setErreur] = useState(false);

  // Énigme et solution
  const enigme =
    "Je suis la voix de la nuit, messager silencieux, gardien des secrets. Qui suis-je ?";
  const solution = "hibou";

  useEffect(() => {
    if (scene === "sacrifice") {
      setHero((prev) => ({
        ...prev,
        hpHero: Math.max((prev.hpHero || 0) - 100, 0),
      }));
    }
  }, [scene, setHero]);

  if (scene === "choix") {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Le sanctuaire du hibou</h2>
          <p>
            Tu explores la salle secrète révélée par la statue. Des fresques
            anciennes décorent les murs, représentant des hiboux et des scènes
            oubliées. Au centre, un autel de pierre porte un livre poussiéreux
            et une dalle gravée d’un symbole sanglant.
          </p>
          <p>
            Tu sens que ce lieu est empli de magie. Deux choix s’offrent à toi :
          </p>
          <ul>
            <li>
              <strong>Lire le livre ancien</strong> pour tenter de percer les
              secrets du sanctuaire.
            </li>
            <li>
              <strong>Faire un sacrifice de sang</strong> sur la dalle pour
              tenter d’ouvrir une issue (perds 100 PV).
            </li>
          </ul>
          <div className="donjon-btns">
            <button onClick={() => setScene("livre")}>
              Lire le livre ancien
            </button>
            <button
              onClick={() => {
                setHero((prev) => ({
                  ...prev,
                  hpHero: Math.max((prev.hpHero || 0) - 100, 0),
                }));
                setScene("sacrifice");
              }}
              style={{ marginLeft: 12 }}
            >
              Sacrifice de sang (-100 PV)
            </button>
          </div>
          <img
            src="/sanctuaire-hibou.jpg"
            alt="Sanctuaire secret du hibou"
            className="donjon-img"
          />
        </div>
      </div>
    );
  }

  if (scene === "livre") {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Le livre ancien</h2>
          <p>
            Tu ouvres le livre. Les pages sont couvertes de symboles et
            d’énigmes. Une phrase attire ton attention :
          </p>
          <blockquote style={{ fontStyle: "italic", color: "#eab308" }}>
            {enigme}
          </blockquote>
          <p>Quelle est ta réponse ?</p>
          <input
            type="text"
            value={reponse}
            onChange={(e) => {
              setReponse(e.target.value);
              setErreur(false);
            }}
            placeholder="Ta réponse..."
            style={{ padding: "4px", fontSize: "1em" }}
          />
          <button
            style={{ marginLeft: 8 }}
            onClick={() => {
              if (reponse.trim().toLowerCase() === solution) {
                setScene("reussite");
              } else {
                setErreur(true);
              }
            }}
          >
            Valider
          </button>
          {erreur && (
            <div style={{ color: "red", marginTop: 8 }}>
              Mauvaise réponse. Essaie encore !
            </div>
          )}
          <button style={{ marginLeft: 8 }} onClick={() => setScene("choix")}>
            Revenir en arrière
          </button>
        </div>
      </div>
    );
  }

  if (scene === "reussite") {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Le secret du hibou</h2>
          <p>
            Les symboles du livre s’illuminent. Un passage secret s’ouvre dans
            le mur, révélant un trésor caché et un nouvel accès vers les
            profondeurs du donjon.
          </p>
          <div className="donjon-btns">
            <button
              onClick={() => onChoosePath && onChoosePath("sortieSalleSecrete")}
            >
              Emprunter le passage secret
            </button>
          </div>
          <img
            src="/passage-secret-hibou.jpg"
            alt="Passage secret du hibou"
            className="donjon-img"
          />
        </div>
      </div>
    );
  }

  if (scene === "sacrifice") {
    return (
      <div className="page-center">
        <div className="donjon-container">
          <h2>Sacrifice de sang</h2>
          <p>
            Tu traces une entaille sur ta main et laisses couler ton sang sur la
            dalle. Un grondement sourd résonne, la pierre s’ouvre lentement, te
            permettant de t’échapper, mais tu te sens affaibli...
          </p>
          <div className="donjon-btns">
            <button
              onClick={() => onChoosePath && onChoosePath("sortieSalleSecrete")}
            >
              Quitter la salle secrète
            </button>
          </div>
          <img
            src="/sortie-salle-secrete.jpg"
            alt="Sortie de la salle secrète"
            className="donjon-img"
          />
        </div>
      </div>
    );
  }

  return null;
}

export default SalleSecreteHibou;
