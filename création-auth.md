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
