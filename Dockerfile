# Utilise une image officielle Node.js
FROM node:18-alpine

# Définit le dossier de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package.json ./

# Installe les dépendances
RUN yarn install

# Copie tout le reste du projet
COPY . .

# Expose le port utilisé par Strapi
EXPOSE 1337

# Commande par défaut pour démarrer Strapi
CMD ["node", "index.js"]


