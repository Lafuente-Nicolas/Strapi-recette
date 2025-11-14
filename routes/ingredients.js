import express from "express";

const router = express.Router();


let ingredients = [
  { id: 1, titre: "Maroille"},
  { id: 2, titre: "Jambon" },
  { id: 3, titre: "Lait" },
  { id: 4, titre: "Fromage" }
];

// Récupérer toutes les ingrédients
router.get("/", (req, res) => {
  res.json(ingrédients);
});

// Ajouter un ingrédient
router.post("/", (req, res) => {
  const nouvelleIngredient = req.body;
  nouvelleIngredient.id = ingredients.length + 1;
  ingredients.push(nouvelleIngredient);
  res.status(201).json(nouvelleIngredient);
});

// Modifier un indredient par ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = ingredients.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Ingredient non trouvée" });
  }

  ingredients[index] = { ...ingredients[index], ...req.body };
  res.json(ingredients[index]);
});

