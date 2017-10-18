# MyOwnPortfolio-Editor (WORK IN PROGRESS)

__Auteurs__ : 
* [Morgane LEGROS](https://github.com/morgane1806/)
* [Florian MARTIN](https://github.com/Nistof/)
* [Thibault THEOLOGIEN](https://github.com/MacBootglass/)

__Langues__ : [FR](./README.md) - [EN](./README_EN.md)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/57f5ea01a90d4a228747fe587d05184c)](https://www.codacy.com/app/MacBootglass/myOwnPortfolio-editor?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=myOwnPortfolio-team/myOwnPortfolio-editor&amp;utm_campaign=Badge_Grade)

## Description du projet

MyOwnPortfolio-Editor est une application proposant une interface simple afin de créer rapidement un portfolio personnalisé et multilingue.

## Pré-requis

* [npm](https://docs.npmjs.com)
* [nodejs](https://nodejs.org/en/)
* [sass](http://sass-lang.com)

## Compilation

### Développement

Il est possible de compiler l'application en mode développement. Ce mode permet de voir en temps réel les modifications effectuées sur l'application mais
nécessite d'avoir un serveur **webpack** en cours d'exécution. Ce mode ne produit pas d'exécutable utilisable ultérieurement.

L'étape minimale nécessaire pour lancer l'application de bureau ou l'application web est la suivante :

```sh
$ npm install
$ npm run watch
```

#### Application de bureau

Afin de démarrer l'application de bureau en mode développement, il suffit d'effectuer la commande suivante :

```sh
$ npm start
```

#### Application Web

Il est possible d'accéder à l'application en mode web. Pour celà il faut se connecter à l'adresse : http://localhost:8080/app

### Création d'un exécutable (Distribution)

Il est possible de créer des exécutables pour toutes les plateformes simplement (OSX, Linux et Windows). Pour celà il faut lancer les commandes suivantes :

```sh
$ npm install
$ npm run complete-build
```

Il est possible de compiler pour une plateforme en particulier. Il faut dans ce cas s'assurer qu'un _package_ de l'application a été effectué :

```
$ npm run package
```

Il suffit ensuite d'effectuer la commande suivante pour obtenir l'application pour une plateforme particulière :

```
$ gulp build:<plateforme>
```

Avec ```<plateforme>``` à remplacer par l'une des options suivantes :
* ```osx``` : MacOS
* ```linux``` : Linux
* ```win32``` : Windows