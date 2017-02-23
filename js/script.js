/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});


var imgArr = [];
var threeImgArr = [];

var imagePreviewLayer = document.querySelector('#image-preview-layer');
var originalTable = document.querySelector('#original-table');
var clonedTable = void 0;
var tableWidthValue = 0;
var trWidth = '';

var galleryDirectoryPath = 'img/gallery/';

var windowLoadHandler = exports.windowLoadHandler = function windowLoadHandler() {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            JSON.parse(ajax.responseText, function (k, v) {
                imgArr.push(v);
            });
            imgArr.pop();
            createImagesTable();
            setGalleryWidth();
            cloneTable();
            addAnimationEvent();
            setAnimationRules();
            addClickHandlersToGalleryimages();
        }
    };
    ajax.open('GET', 'php/imagesholder.php', true);
    ajax.send(null);
};

var createImagesTable = function createImagesTable() {
    var _loop = function _loop() {
        var trElement = document.createElement('tr');
        threeImgArr = imgArr.splice(0, 3); // aus dem Bilderarray 3 Bilder nehmen
        threeImgArr.forEach(function (imagePfad) {
            var tdElement = createImagesColumn(imagePfad);
            trElement.appendChild(tdElement);
        });

        originalTable.appendChild(trElement);
        createImagesTable();
    };

    while (imgArr.length > 0) {
        _loop();
    }
};

/*erstellen einer Tabellenzelle mit einem Bild drinne*/
var createImagesColumn = function createImagesColumn(imagePfad) {
    var tdElement = document.createElement('td');
    var imageElement = document.createElement('img');
    imageElement.setAttribute('src', galleryDirectoryPath + imagePfad);
    imageElement.setAttribute('alt', "???? ?? ???????");
    imageElement.className = 'gallery-image';
    tdElement.appendChild(imageElement);

    return tdElement;
};
/*
 * Die Tabelle duplizieren und geklonte Tabelle da positioneren,
 * wo das Original endet
*/
var cloneTable = function cloneTable() {
    clonedTable = originalTable.cloneNode(true);
    clonedTable.id = 'cloned-table';
    clonedTable.style.left = tableWidthValue + 'px';
    document.querySelector('#gallery').appendChild(clonedTable);
};
/* Die Tabellebreite ermitteln */
var setGalleryWidth = function setGalleryWidth() {
    var trElement = document.querySelector('table tr');
    trWidth = window.getComputedStyle(trElement, null).getPropertyValue('width'); //Breite der Tabellenspalte ermitteln
    tableWidthValue = originalTable.childElementCount * parseInt(trWidth); //Anzahl der Tabellenspalten in der Tabelle ermitteln und mit Breite multiplizieren
    originalTable.style.width = tableWidthValue + 'px';
};

/*bei jedem Animationsdurchlauf wird die Funktion "repeatAnimation" aufgerufen */
var addAnimationEvent = function addAnimationEvent() {
    document.querySelector('#original-table').addEventListener('animationiteration', repeatAnimation);
};

/* erstell f�r beide Taabellen AnimationsRegeln */
var setAnimationRules = function setAnimationRules() {
    var css = document.styleSheets;

    var originalTableCSSRule = '@keyframes moveOriginalTable' + '{' + 'to{left:' + -tableWidthValue + 'px ;}' + '}';

    var clonedTableCSSRule = '@keyframes moveClonedTable' + '{' + 'to{left:' + -tableWidthValue + 'px ;}' + '}';
    css[0].insertRule(originalTableCSSRule, 0);
    css[0].insertRule(clonedTableCSSRule, 1);
};
/*
 * gleich nach dem ersten Durchlauf wird Listener nicht mehr gebraucht
 * Dauer und Delay wird neu angepasst, weil Linksposition der Originaltabelle
 * sich ge�ndert hat
*/

var repeatAnimation = function repeatAnimation(event) {
    originalTable.removeEventListener('animationiteration', repeatAnimation);
    originalTable.style.left = tableWidthValue + 'px';
    originalTable.style.animationDuration = 80 + 's';
    originalTable.style.animationDelay = 40 + 's';
};

var addClickHandlersToGalleryimages = function addClickHandlersToGalleryimages() {
    var images = document.querySelectorAll('.gallery-image');
    for (var i = 0; i < images.length; i++) {
        images[i].addEventListener('click', imageClickHandler);
    }
};

/*
 *Beim Click auf das Bild pausiert die Animation
 * Bild Layer wird angezeigt
 * Bild wird geklont und aufs Layer gesetzt
 */
var imageClickHandler = function imageClickHandler(event) {
    originalTable.style.animationPlayState = 'paused';
    clonedTable.style.animationPlayState = 'paused';
    imagePreviewLayer.style.display = 'block';
    var clonedImg = event.target.cloneNode(true);
    imagePreviewLayer.appendChild(clonedImg);
    imagePreviewLayer.addEventListener('click', imageLayerClickHandler);
};
/*
 * Event schlie�t Layer
 * Bild wird aus dem Layer entfernt
 * Animation l�uft weiter
 */
var imageLayerClickHandler = function imageLayerClickHandler() {
    imagePreviewLayer.innerHTML = '';
    imagePreviewLayer.style.display = 'none';
    originalTable.style.animationPlayState = 'running';
    clonedTable.style.animationPlayState = 'running';
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _section = document.querySelector('#about_us-wrapper');
var _height = parseInt(window.getComputedStyle(_section, null).getPropertyValue('height'));
var _navi = document.querySelector('#second-menu');

var initScrollHandler = exports.initScrollHandler = function initScrollHandler() {
    window.addEventListener("scroll", windowScrollHandler);
};

var windowScrollHandler = function windowScrollHandler() {
    if (window.scrollY >= _height) {
        naviFadeIn(_navi);
    } else {
        naviFadeOut(_navi);
    }
};

var naviFadeIn = function naviFadeIn(_navi) {
    _navi.style.opacity = '0.8';
};

var naviFadeOut = function naviFadeOut(_navi) {
    _navi.style.opacity = '0';
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _navibar = __webpack_require__(1);

var _gallery = __webpack_require__(0);

window.addEventListener('load', function (event) {
    (0, _gallery.windowLoadHandler)();
    (0, _navibar.initScrollHandler)();
});

/***/ })
/******/ ]);