# MyOwnPortfolio-Editor (WORK IN PROGRESS)

__Authors__ : 
* [Morgane LEGROS](https://github.com/morgane1806/)
* [Florian MARTIN](https://github.com/Nistof/)
* [Thibault THEOLOGIEN](https://github.com/MacBootglass/)

__Languages__ : [FR](./README.md) - [EN](./README_EN.md)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/57f5ea01a90d4a228747fe587d05184c)](https://www.codacy.com/app/MacBootglass/myOwnPortfolio-editor?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=myOwnPortfolio-team/myOwnPortfolio-editor&amp;utm_campaign=Badge_Grade)

## Project description

MyOwnPortfolio-Editor is an application offering a simple user interface to quickly create a personalised and multilingual portfolio.

## Requirements

* [npm](https://docs.npmjs.com)
* [nodejs](https://nodejs.org/en/)
* [sass](http://sass-lang.com)

## Compilation

### Developement

It is possible to build the application in develop mode. This mode allow to see in real time every modifications done to the application but it requires to have a **webpack** server running. This mode does not produce an executable usable later.

The minimal step necessary to launch the desktop application or the web application is the following :

```sh
$ npm install
$ npm run start:web #launch in a web browser
$ npm run start:electron #launch in a desktop application
```

It is possible to access to the web application by going to this address : http://localhost:8080/app

### Build an executable (Distribution)

It is possible to create an executable for every platform (OSX, Linux and Windows). For this, run the following commands :

```sh
$ npm install
$ npm run complete-build
```

To build the application for a specific platform, a package has to be created :

```
$ npm run package
```

Then you can build the application with the following command :

```
$ gulp build:<plateform>
```

Replace ```<plateform>``` with one of the following options :
* ```osx``` : MacOS
* ```linux``` : Linux
* ```win32``` : Windows
