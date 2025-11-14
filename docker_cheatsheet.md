# Docker Cheat Sheet 

## 1. Commandes de base

### Infos & gestion

  Commande                Description
  ----------------------- -----------------------------------------------
  `docker --version`      Affiche la version de Docker
  `docker info`           Infos système + configuration Docker
  `docker ps`             Liste les conteneurs **en cours d'exécution**
  `docker ps -a`          Liste **tous** les conteneurs
  `docker images`         Liste les images locales
  `docker pull <image>`   Télécharge une image depuis Docker Hub
  `docker login`          Se connecter à Docker Hub

## 2. Gestion des images

  ----------------------------------------------------------------------------
  Commande                            Description
  ----------------------------------- ----------------------------------------
  `docker build -t <nom>:<tag> .`     Build une image depuis un Dockerfile

  `docker rmi <image>`                Supprime une image

  `docker tag <image> <repo>:<tag>`   Renomme/tag une image

  `docker push <repo>:<tag>`          Envoie une image sur Docker Hub
  ----------------------------------------------------------------------------

## 3. Gestion des conteneurs

  Commande                                 Description
  ---------------------------------------- ----------------------------------
  `docker run <image>`                     Lance un conteneur
  `docker run -d <image>`                  Lance en arrière-plan
  `docker run -p HOST:CONTAINER <image>`   Map un port
  `docker run -v HOST:CONTAINER <image>`   Monte un volume
  `docker stop <id>`                       Stop un conteneur
  `docker start <id>`                      Démarre un conteneur
  `docker restart <id>`                    Redémarre
  `docker rm <id>`                         Supprime un conteneur
  `docker logs <id>`                       Affiche les logs
  `docker exec -it <id> bash`              Ouvre un shell dans le conteneur


## 4. Volumes

  Commande                       Description
  ------------------------------ --------------------
  `docker volume ls`             Liste les volumes
  `docker volume create <nom>`   Crée un volume
  `docker volume rm <nom>`       Supprime un volume

## 5. Réseaux

  ----------------------------------------------------------------------------------------
  Commande                                        Description
  ----------------------------------------------- ----------------------------------------
  `docker network ls`                             Liste les réseaux

  `docker network create <nom>`                   Crée un réseau

  `docker network connect <réseau> <container>`   Connecte un conteneur au réseau

  `docker network rm <nom>`                       Supprime un réseau
  ----------------------------------------------------------------------------------------

## 6. Docker Compose

### Commandes principales

  -------------------------------------------------------------------------------
  Commande                               Description
  -------------------------------------- ----------------------------------------
  `docker compose up`                    Lance les services

  `docker compose up -d`                 Lance en arrière-plan

  `docker compose down`                  Stoppe et supprime containers + réseau

  `docker compose logs -f`               Logs des services

  `docker compose build`                 Build les images

  `docker compose exec <service> bash`   Ouvre un shell dans un service
  -------------------------------------------------------------------------------

## 9. Workflow complet résumé

1.  Créer un Dockerfile\
2.  `docker build -t mon-app .`\
3.  `docker run -p 3000:3000 mon-app`\
4.  (optionnel) `docker compose up -d`\
5.  `docker push mon-app`
