# MyOwnPortfolio-Editor (WORK IN PROGRESS)

__Auteurs__ : 
* [Morgane LEGROS](https://github.com/morgane1806/)
* [Florian MARTIN](https://github.com/Nistof/)
* [Thibault THEOLOGIEN](https://github.com/MacBootglass/)

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

Les étapes à suivre pour le lancement de l'application dans ce mode sont les suivantes :

```sh
$ npm install
$ npm run watch
```

Dans un second terminal :

```sh
$ npm start
```

### Création d'un exécutable

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