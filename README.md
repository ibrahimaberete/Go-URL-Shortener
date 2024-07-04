# Développer un URL Shortener en Golang

## Equipe
- OSEI Tony
- BERETE Ibrahima   
- KUTLAR Brayan

## Description

Développer un URL Shortener simple et fonctionnel en Golang, s’inspirant de sites comme Pastebin.

Un URL Shortener est un outil qui permet de transformer une URL longue et complexe en une URL courte et facile à partager. Il fonctionne en générant une clé unique pour l'URL longue et en la stockant dans une base de données. Lorsque l'utilisateur visite l'URL courte, il est redirigé vers l'URL longue d'origine.

## Fonctionnalités

### Base de données

Stocker les URL longues et courtes dans une base de données SQLite, Redis ou Mongo.

### Redirection

Rediriger les utilisateurs vers l’URL longue lorsqu’ils visitent l’URL courte.

### Statistiques

Afficher des statistiques basiques comme le nombre de liens raccourcis et les clics sur chaque lien.

## Lancement du projet

Pour lancer le projet, exécutez la commande suivante : docker-compose up --buid -d
