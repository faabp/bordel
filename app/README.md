# ece-webtech-gr02-08/app

<br>

## Répertoire "app"

Ce répertoire contient les fichiers sources de l'application WebTech
<br>
<br>

## Structure du répertoire

Le répertoire "app" est organisé de la manière suivante :

    /public : contient les fichiers statiques de l'application (images, CSS, etc.)
    /src : contient les fichiers sources de l'application
        /components : contient les composants React réutilisables de l'application
        /pages : contient les pages principales de l'application
        /services : contient les services d'accès aux données (API, bases de données, etc.)
        /utils : contient les fonctions utilitaires réutilisables de l'application
        index.js : point d'entrée pour le rendu de l'application dans le DOM
<br>

## Lanugage et technologies utilisés

L'application est développée en utilisant JavaScript, à la fois pour le front-end avec ReactJS et pour le back-end avec Node.js et Express. <p>
Elle utilise également une base de données Supabase. 

<br>

## Server-side rendering (SSR)

L'application utilise le server-side rendering (SSR) pour certaines pages, notamment pour améliorer la vitesse de chargement et l'optimisation pour les moteurs de recherche. <p>
Le SSR est réalisé avec la librairie Next.js, qui permet de créer des pages React rendues côté serveur.
<br>
<br>

## Déploiement

Pour déployer l'application, suivez les étapes suivantes :

* Assurez-vous d'avoir installé Node.js et MongoDB sur le serveur de déploiement



**Clonez le répertoire sur le serveur de déploiement :**

    git clone https://github.com/faabp/ece-webtech-gr02-08.git

**Naviguez dans le répertoire de l'application :**

    cd ece-webtech-gr02-08/app

**Installez les dépendances :**

    npm install

**Construisez l'application pour la production :**

    npm run build

**Lancez l'application en mode production :**

    npm run serve

## Auteurs

[Cette application a été développée par le groupe 02-08 de l'ECE :](https://ece-webtech-gr02-08.vercel.app/)

`Fabien Poulain`
`Héloïs Marre`
