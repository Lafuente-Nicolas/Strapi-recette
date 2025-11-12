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

