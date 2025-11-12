import express from "express";

// pour le hash
import bcrypt from "bcrypt";

// créer et vérifier les tokens
import jwt from "jsonwebtoken";

const router = express.Router();

let users = [];

const JWT_SECRET = "super_secret_key";

router.post("/register", async (req, res) => {

  // On récupère les données envoyées par le client 
  const { username, password } = req.body;

  // Si l'un des deux champs est vide = erreur
  if (!username || !password) {
    return res.status(400).json({ message: "Nom d'utilisateur et mot de passe requis" });
  }

  // On vérifie si l'utilisateur existe déjà dans le tableau
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Cet utilisateur existe déjà" });
  }

  // hash le mot de passe 
  const hashedPassword = await bcrypt.hash(password, 10);

  // crée un nouvel utilisateur avec un ID automatique
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword, // on stocke le mot de passe chiffré
  };

  users.push(newUser);

  res.status(201).json({ message: "Utilisateur créé avec succès" });
});