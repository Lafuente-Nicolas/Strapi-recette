# Guide complet : Créer une authentification avec Express, bcrypt et JWT

## Introduction

Ce guide explique comment mettre en place un système d’authentification sécurisé dans une application Node.js utilisant Express.js comme framework serveur.  
L’objectif est de permettre à des utilisateurs :
- de s’inscrire (`/register`),
- de se connecter (`/login`),
- et d’accéder à des routes protégées (`/profile`) grâce à un token JWT.

Ce guide couvre toutes les étapes, de la configuration initiale à la gestion des tokens.

---

## 1. Préparer l’environnement

### 1.1. Initialiser le projet
```bash
mkdir projet-auth
cd projet-auth
npm init -y
```

### 1.2. Installer les dépendances
```bash
npm install express bcrypt jsonwebtoken dotenv cors
```

**Description rapide :**
| Package | Rôle |
|----------|------|
| **express** | Crée le serveur HTTP |
| **bcrypt** | Hache les mots de passe pour la sécurité |
| **jsonwebtoken** | Gère les tokens d’authentification (JWT) |
| **dotenv** | Charge les variables d’environnement depuis un fichier `.env` |
| **cors** | Autorise les requêtes provenant d’autres origines (utile pour le front) |

---

## 2. Architecture du projet

Organisation recommandée :

```
projet-auth/
│
├── index.js              # Fichier principal
├── .env                  # Variables d'environnement
├── .gitignore            # Exclusion des fichiers sensibles
│
└── routes/
    └── auth.js           # Routes d'authentification
```

---


## 3. Variables d’environnement

Créer un fichier `.env` à la racine :

```env
JWT_SECRET=ma_cle_secrete
```

Ne jamais exposer cette clé.

Ajoute `.env` à ton `.gitignore` :
```
node_modules/
.env
```

---

## 4. Configuration du serveur Express

Ton fichier `index.js` doit :
1. Créer et configurer le serveur Express.
2. Utiliser les middlewares nécessaires (`express.json()`, `cors()`).
3. Importer et activer les routes d’authentification.

Tâches à faire :
- Importer `dotenv` et appeler `dotenv.config()`.
- Définir un port.
- Monter les routes `/api/auth`.

Le serveur doit afficher un message de confirmation dans la console au démarrage.

---

## 5. Créer le routeur d’authentification (`routes/auth.js`)

Ce routeur gère trois fonctionnalités principales :

### 5.1. Inscription (`POST /api/auth/register`)
**Objectif :**
Permettre à un utilisateur de créer un compte.

**Étapes :**
1. Récupérer `username` et `password` depuis `req.body`.
2. Vérifier qu’ils sont bien remplis.
3. Vérifier que l’utilisateur n’existe pas déjà.
4. Hacher le mot de passe avec `bcrypt.hash()`.
5. Enregistrer le nouvel utilisateur (en mémoire ou en base).
6. Retourner une réponse `201` avec un message de succès.

Bonnes pratiques :
- Ne jamais stocker le mot de passe en clair.
- Ajouter une validation côté serveur (longueur minimale, caractères, etc.).

---

### 5.2. Connexion (`POST /api/auth/login`)
**Objectif :**
Permettre à un utilisateur existant de se connecter et d’obtenir un token JWT.

**Étapes :**
1. Récupérer `username` et `password`.
2. Vérifier que l’utilisateur existe.
3. Comparer les mots de passe (`bcrypt.compare()`).
4. Si la comparaison est bonne :
   - Créer un token JWT avec `jwt.sign()`.
   - Le token contient un payload minimal : `id`, `username`.
   - Spécifier une durée de validité (ex : `1h`).
5. Retourner le token au client.

**Structure d’un token JWT :**
```
header.payload.signature
```

---

### 5.3. Route protégée (`GET /api/auth/profile`)
**Objectif :**
Permettre à un utilisateur connecté d’accéder à ses informations à partir de son token.

**Étapes :**
1. Lire le header `Authorization` envoyé par le client :
   ```
   Authorization: Bearer <token>
   ```
2. Extraire le token.
3. Vérifier sa validité avec `jwt.verify()`.
4. Si valide → renvoyer les infos du payload (`id`, `username`).
5. Si invalide → renvoyer une erreur `401 Unauthorized`.

---

## 6. Protection des autres routes

Tu peux protéger n’importe quelle route (ex. `/api/recettes`) avec un middleware d’authentification.

### Étapes du middleware :
1. Vérifier la présence du header `Authorization`.
2. Extraire et vérifier le token.
3. Si valide → ajouter `req.user = decoded`.
4. Si non valide → refuser l’accès (401).

Ensuite, tu l’ajoutes sur les routes à protéger :
```js
app.get("/api/recettes", authMiddleware, (req, res) => {
  res.json({ message: "Route protégée !" });
});
```

---


## 7. Tester avec Thunder Client ou Postman

### 1. Enregistrer un utilisateur
- Méthode : `POST`
- URL : `http://localhost:3000/api/auth/register`
- Body JSON :
  ```json
  {
    "username": "nicolas",
    "password": "123456"
  }
  ```

Réponse attendue :
```json
{ "message": "Utilisateur créé avec succès" }
```

---

### 2. Se connecter
- Méthode : `POST`
- URL : `http://localhost:3000/api/auth/login`
- Body JSON :
  ```json
  {
    "username": "nicolas",
    "password": "123456"
  }
  ```

Réponse attendue :
```json
{
  "message": "Connexion réussie",
  "token": "eyJhbGciOiJIUzI1NiIsInR5..."
}
```

---

### 3. Accéder au profil (route protégée)
- Méthode : `GET`
- URL : `http://localhost:3000/api/auth/profile`
- Headers :
  ```
  Authorization: Bearer <ton_token_reçu>
  ```

Réponse attendue :
```json
{
  "message": "Profil utilisateur",
  "user": {
    "id": 1,
    "username": "nicolas",
    "iat": 1731410000,
    "exp": 1731413600
  }
}
```


---

## 8. Bonnes pratiques de sécurité

| Bonnes pratiques | Description |
|------------------|-------------|
| Clé secrète | Stocker dans `.env`, jamais en clair |
| Mot de passe | Toujours haché avec `bcrypt` |
| Expiration des tokens | Utiliser `expiresIn` pour limiter la durée |
| Messages d’erreur | Ne pas préciser si le mot de passe ou l’utilisateur est faux |
| Refresh Token | Implémenter si les sessions doivent durer longtemps |
| Rate Limiting | Empêcher les tentatives de brute-force |
| HTTPS | Toujours utiliser HTTPS en production |

---

## 9. Étapes suivantes

Une fois l’authentification fonctionnelle :
1. Remplacer le stockage en mémoire par une base de données (SQLite, MongoDB, PostgreSQL…).
2. Ajouter un middleware global de vérification JWT.
3. Mettre en place un système de rôles (admin, user, etc.).
4. Implémenter la réinitialisation de mot de passe.
5. Gérer les tokens de rafraîchissement si tu veux des sessions longues.

---

## Conclusion

Tu as maintenant un système d’authentification complet avec :
- Inscription, connexion, et routes protégées
- Gestion sécurisée des mots de passe (bcrypt)
- Tokens JWT pour l’accès
- Architecture claire et extensible

Ce système constitue la base de toute application web sécurisée construite avec Express.

