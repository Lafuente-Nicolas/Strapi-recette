import express from "express";
import cors from "cors";
import recettesRoutes from "./routes/recettes.js";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = 3000;

// Middleware 
app.use(cors());
app.use(express.json());

// Routes 
app.get("/", (req, res) => {
  res.send("Bienvenue sur mon serveur Express ");
});

app.use("/api/recettes", recettesRoutes);
app.use("/api/auth", authRoutes);

//  Démarrage du serveur 
app.listen(PORT, () => {
  console.log(` Serveur lancé sur http://localhost:${PORT}`);
});
