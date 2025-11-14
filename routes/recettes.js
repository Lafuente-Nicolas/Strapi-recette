import express from "express";

const router = express.Router();


let recettes = [
  { id: 1, titre: "Tartiflette", tdp: "30 min", difficulte: "Facile", budget: "8" },
  { id: 2, titre: "Crêpes", tdp: "15 min", difficulte: "Facile", budget: "4" }
];

// Récupérer toutes les recettes
router.get("/", (req, res) => {
  res.json(recettes);
});

// Ajouter une recette
router.post("/", (req, res) => {
  const nouvelleRecette = req.body;
  nouvelleRecette.id = recettes.length + 1;
  recettes.push(nouvelleRecette);
  res.status(201).json(nouvelleRecette);
});

// Modifier une recette par ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = recettes.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Recette non trouvée" });
  }

  recettes[index] = { ...recettes[index], ...req.body };
  res.json(recettes[index]);
});

// Supprimer une recette
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = recettes.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Recette non trouvée" });
  }

  recettes.splice(index, 1);
  res.status(204).send();
});

export default router;
