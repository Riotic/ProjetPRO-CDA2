# Table des matières

I.[BddCompare](#bddcompare)  
    xxxx1.[Requirements](#requirements)  
    xxxx2.[Comparateur bdd pgsql / Easy Admin](#comparateur-bdd-pgsql--easy-admin)  
    xxxx3.[Sécurité mis en place](#sécurité-mise-en-place)  
    xxxx4.[Fonctionnalités présentes](#fonctionnalitées-présentes)  
        xxxxxxxxa.[1 - Système d'authentification/sécurité et protection des routes](#1---système-dauthentificationsécurité-et-protection-des-routes)  
        xxxxxxxxb.[2 - Récupération dynamique des urls d'environnement des machines distantes](#2--récupération-dynamique-des-urls-denvironnement-des-machines-distantes)  
        xxxxxxxxc.[3 - Récupération des schémas des bdd choisies](#3--récupération-des-schémas-des-bdd-choisies)  
        xxxxxxxxd.[4 - Récupération des tables](#4--récupération-des-tables)  
        xxxxxxxxe.[5 - Affichage des données](#5--affichage-des-données)  
        xxxxxxxxf.[6 - Comparaison des données](#6--comparaison-des-données)  
        xxxxxxxxg.[7 - Tests fonctionnelles / Unitaires](#7---tests-fonctionnelles--unitaires)  
    xxxx5.[En guise d'amélioration...](#en-guise-damélioration)  
II.[DarkDominion](#darkdominion)  
    xxxx1.[Prérequis système](#prérequis-système)    
    xxxx2.[Installation](#installation)   
    xxxx3.[Bugs connues et éventuelles](#bugs-connues-et-éventuelles)   
    xxxx4.[Droits d'auteurs](#droits-dauteurs)  

# BddCompare

Application de comparaison de données de deux machines en pgsql simplifié. 

## Requirements

Node v19 et + installé.
NPM 9.5 et + installé.
Postgresql v15 et +.

Crée sous :
OS - Windows 11

## Comparateur bdd pgsql / Easy Admin

Guide d'installation :  
Installation de node js v19.6.1 - https://nodejs.org/en/download/current  
NodeJS et Npm v 9.4.0 - https://nodejs.org/fr/download  
Installation de postgresql v15 - https://www.postgresql.org/download/windows/  
Installation de MongoDB Compassa - https://www.mongodb.com/docs/manual/installation/  
Installation de Mongosh - https://www.mongodb.com/docs/mongodb-shell/

Après l'installation de mongosh il sera important de créer une collection renduPro et de créer un utilisateur qui a les droits readWrite sur renduPro avec le nom "rio" et l mdp : "dossierPro".
Si vous désirez le faire autrement il faudra changer les lignes de connections dans les configs. ("mongoUrl")

![Screenshot](./presentationAppli/exemplMongo.png)

Présentation:
GUI de gestion de base de donnée pour une autre interaction et meilleures récupérations des scripts

Pour pouvoir avoir deux bases de données sur laquelle travaillé une fois que vous avez créer un utilisateur sur votre pgsql, vous pouvez créer deux nouvelle bases de données avec les commandes :

Au prèalable:  
psql -U postgres  
CREATE database projet_pro_demo_1;  
CREATE database projet_pro_demo_2;  
\q

psql -U postgres -d projet_pro_demo_1 -a -f .\dump-projet_pro_demo_1-202307031104.sql   
psql -U postgres -d projet_pro_demo_2 -a -f .\dump-projet_pro_demo_2-202307031106.sql  

Pour lancer l'application il vous faudra aprés avoir cloné ce repos, rentrer dans le dossier BddCompare avec la commande suivante :

```
cd BddCompare
```

Ensuite il faudra installer toutes les dépendances npm en lançant la commande d'installation des librairies:

```
npm install
```

Une fois l'installation des librairies effectuées, vous pouvez lancer le projet à partir de la racine du dossier BddCompare, en faisant la commande suivante:

```
node app.js
```

Le dossier sera ouvert sur votre localhost le port 3000.

A noter, si jamais un bug quelconque tel que la non visualisation de données/schémas/table pouvait venir, il est possible que l'utilisateur défini dans le dossier des connections strings dans le document router.js ne dispose pas des droits nécessaires a la réalisation de cette tâche.

Il est important d'avoir un superuser dans la base de données ayant la visibilité sur tout.

commande pour softia par exemple :

```
DO $$ DECLARE
    database_name text;
    schema_name text;
    table_name text;
BEGIN
    FOR database_name IN (SELECT datname FROM pg_database WHERE datistemplate = false) LOOP
        FOR schema_name IN (SELECT s.schema_name FROM information_schema.schemata s WHERE s.schema_name NOT LIKE 'pg_%' AND s.schema_name <> 'information_schema') LOOP
            FOR table_name IN (SELECT t.table_name FROM information_schema.tables t WHERE t.table_schema = schema_name) LOOP
                EXECUTE 'GRANT SELECT ON TABLE ' || schema_name || '.' || table_name || ' TO softia;';
            END LOOP;
        END LOOP;
    END LOOP;
END $$;
```

## Sécurité mise en place

Pour éviter une surconsommation des ressources et des éventuelles spam dans les machines disposant des bases de données à visualiser, une sécurité de base déja mis en place par les bases de données limitent le nombre de sessions. Si trop de sessions sont actives en même temps, il se peut que l'application cesse de fonctionner par rapport aux environnements concernées. Si cela vient à arriver veuillez redémarrer les services de base de données des machines concernées.

# Fonctionnalitées présentes

Pour utiliser l'application à son plein escient il est important de suivre ces étapes.
Veuillez créer des lignes de connections pour les deux bases de donné crées précedemment sous 127.0.0.1.
![Alt text](image.png)


## 1 - Système d'authentification/sécurité et protection des routes

Il est possible d'utiliser l'application si et seulement si l'utilisateur est connecté. Autrement il n'est pas possible d'utiliser l'application.

![Screenshot](./presentationAppli/Section1b.png)

Une fois connecté via les identifiants et mot de passe qu'on vous a connecté. Vous serez face à l'application.

![Screenshot](./presentationAppli/Section1c.png)

## 2- Récupération dynamique des urls d'environnement des machines distantes

Possibilité de choisir deux bases de données avec des onglets select. L'url et l'environnement choisi est précisé dans le select.

![Screenshot](./presentationAppli/Section1d.png)

Le bouton d'affichage et bouton de rafraîchissement est le même bouton.

## 3- Récupération des schémas des bdd choisies

Possibilité d'afficher les schémas des deux bases de données choisies.  
Le bouton d'affichage et bouton de rafraîchissement est le même bouton.

![Screenshot](./presentationAppli/Section2.png)

## 4- Récupération des tables

![Screenshot](./presentationAppli/Section3.png)

Select avec les tables en communs des deux schémas choisis.
Une fois une table choisi, cliquez sur afficher/cacher n° Lignes.

![Screenshot](./presentationAppli/Section3-2.png)

## 5- Affichage des données

Pour afficher les données il faut d'abord insérer le N° de ligne de visualisation à partir duquel vous voulez visualiser la bdd. Ce numéro doit aller de 1 jusqu'au maximum du nombre de lignes afficher juste au dessus de la ligne. (Ici 14019).

![Screenshot](./presentationAppli/Section4.png)

Une fois que vous avez réalisé cette tâche, vous pouvez afficher les données de la table choisie. L'application affiche les 25 premieres données, ordonnées par ordre croissant par rapport à la 2eme colonne, à partir du numéro entré dans la case "N Ligne début visualisation".
On y affiche que 25 pour le moment car la capacité de RAM demandée pour afficher plus de données est trop importante.

![Screenshot](./presentationAppli/Section4-a.png)

Le bloc bleu clair correspond au données de la "v5", le bloc gris correspond aux données de la "v4".

## 6- Comparaison des données

Pour finir vous avez une dernière fonctionnalité de comparaison.
Elle reprendra les numéros de ligne de visualisation entré sur la section supérieure et comparera les 25 données des deux bases de données choisies par rapport à leur schémas et tables.

![Screenshot](./presentationAppli/Section5.png)

Possibilité de créer un excel de la comparaison désiré en cliquant sur le boutton "Créer un excel de la comparaison".

![Screenshot](./presentationAppli/Section6.png)


## 7 - Tests fonctionnelles / Unitaires

Pour les tests fonctionnelles les technologies codeceptjs, mochajs et javascript sont mobilisés. Etant donné que ce n'était pas une fonctionnalité de base prise en charge dans le cahier des charges par rapport à la rapidité de production de l'application demandé toutes les fonctionnalités ne sont pas couvertes.   
Pour lancer les tests mochas rentrer dans BddCompare:  
- cd BddCompare  
- npm test  
Certains scripts de tests doivent être lancer à la main.
Pour lancer les tests codecept js:  
- cd codeceptjs  
- npm install  
- selenium standalone install  
- selenium standalone start  
- Webdriver-manager.cmd update  
- webdriver-manager.cmd  start  
Ouvrir un autre terminal : 
- cd BddCompare  
- node app.js  
Ouvrir un autre terminal :  
- npx codeceptjs run login_test.js --verbose --debug  

## En guise d'amélioration...

Pour développement futur réalisation d'un événement javascript, interdissant la modification des bases de données dans l'url tant que l'utilisateur n'a pas décider de rafraîchir ses schémas.  
Amélioration du visuel.  
Plus grande ram nécessaire pour l'affichage de plus de données.


# DarkDominion

Jeu vidéo original sous format de jeu de cartes "Dark Fantasy". Le projet est actuellement en beta.

## Prérequis système

OS (système utilisé pour la conception du jeu): Windows 11  
Moteur de jeu: Godot 4.1.1  
Android : version - Taget SDK - using 32.0 
JDK : 17.0.9
Emulateur android : Pixel 3a - API 34

Librairies:  
Android : Cmake - (compilation en C++)  
Godot : GUT - Godot Unit Testing v9.1.1 - (test unitaires)

## Installation  

### Godot GUI

Pour installer et lancer le projet sur godot assurer vous d'avoir récuperer ce repos et de plus avoir pris une version compatible à celle utilisée par le projet (Godot 4.1). Une fois ceci fait il vous suffira simplement d'utiliser l'executable godot et d'importer le projet présent dans le chemin - "DarkDominion\project.godot". 

### Application PC

Il vous suffira simplement de lancer l'executable PC présent dans le projet DarkDominion\DarkDominionPC.exe. La version console vous permet d'avoir un affichage de debug de ce qui se passe actuellement dans le launcher.

### Application Android

Vous devez glisser déposer l'apk dans un émulateur compatible (33+) si vous désirez le lancer sur un émulateur android, si vous souhaiter avoir l'application sur votre téléphone glisser déposer l'apk dans un document de votre téléphone qui a les autorisations d'installation et accepter l'installation de l'application sur votre téléphone.

![Alt text](ScreenShotExplicatif.png)

### Application WEB

Vous pouvez lancer l'application web depuis le site https://rio-clement.itch.io/dark-dominion, il vous suffit juste de cliquer sur le bouton play. Si vous ne désirez pas passer par le site vous pouvez aussi faire à condition d'avoir python3.10+ d'installé :  
- cd DarkDominion/DarkDominionWEB  
- python serve.py  
Vous connecter sur http://localhost:80/. 


## Bugs connues et éventuelles

Il se peut que certains fichier ne soit pas accessible à cause du cache présent dans le dossier .godot, c'est un bug lié au moteur de godot qui est mineur. Si cela arrive veuillez recharger le projet actuel ou vérifier les dépendances du fichier concerné.  

## Droits d'auteurs

Groupe sage_a