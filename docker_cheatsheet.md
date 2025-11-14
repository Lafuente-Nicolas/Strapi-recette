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
