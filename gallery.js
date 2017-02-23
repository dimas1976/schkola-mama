'use strict';

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