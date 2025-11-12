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

router.post("/login", async (req, res) => {
  // On récupère le nom d'utilisateur et le mot de passe envoyés
  const { username, password } = req.body;

  // On cherche si cet utilisateur existe
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({ message: "Utilisateur introuvable" });
  }

  // On compare le mot de passe entré avec le mot de passe chiffré
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Mot de passe incorrect" });
  }

  // Si le mot de passe est bon = on crée un token JWT
  const token = jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  // On renvoie le token au client
  res.json({ message: "Connexion réussie", token });
});