

    let imgArr = [];
    let threeImgArr = [];

    let imagePreviewLayer = document.querySelector('#image-preview-layer');
    let originalTable = document.querySelector('#original-table');
    let clonedTable;
    let tableWidthValue = 0;
    let trWidth = '';

    let galleryDirectoryPath = 'img/gallery/';

    
    export const windowLoadHandler = ()=> {
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = ()=> {
            if (ajax.readyState == 4 && ajax.status == 200) {
                JSON.parse(ajax.responseText, (k, v)=> {
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

    const createImagesTable = ()=> {

        while (imgArr.length > 0) {
            let trElement = document.createElement('tr');
            threeImgArr = imgArr.splice(0, 3);// aus dem Bilderarray 3 Bilder nehmen
            threeImgArr.forEach((imagePfad) => {
                let tdElement = createImagesColumn(imagePfad);
                trElement.appendChild(tdElement);
            });

            originalTable.appendChild(trElement);
            createImagesTable();
        }
    };

/*erstellen einer Tabellenzelle mit einem Bild drinne*/
    const createImagesColumn = (imagePfad)=> {
        let tdElement = document.createElement('td');
        let imageElement = document.createElement('img');
        imageElement.setAttribute('src', galleryDirectoryPath + imagePfad);
        imageElement.setAttribute('alt', "???? ?? ???????");
        imageElement.className = 'gallery-image';
        tdElement.appendChild(imageElement);

        return tdElement;
    }
/*
 * Die Tabelle duplizieren und geklonte Tabelle da positioneren,
 * wo das Original endet
*/
    const cloneTable = ()=> {
        clonedTable = originalTable.cloneNode(true);
        clonedTable.id = 'cloned-table';
        clonedTable.style.left = tableWidthValue + 'px';
        document.querySelector('#gallery').appendChild(clonedTable);
    }

/* Die Tabellebreite ermitteln */
    const setGalleryWidth = ()=> {
        let trElement = document.querySelector('table tr');
        trWidth = window.getComputedStyle(trElement, null).getPropertyValue('width');//Breite der Tabellenspalte ermitteln
        tableWidthValue = originalTable.childElementCount * parseInt(trWidth);//Anzahl der Tabellenspalten in der Tabelle ermitteln und mit Breite multiplizieren
        originalTable.style.width = tableWidthValue + 'px';
    }

    /*bei jedem Animationsdurchlauf wird die Funktion "repeatAnimation" aufgerufen */
    const addAnimationEvent = ()=> {
        document.querySelector('#original-table').addEventListener('animationiteration', repeatAnimation);
    }

    /* erstell für beide Taabellen AnimationsRegeln */
    const setAnimationRules = ()=> {
        let css = document.styleSheets;

        let originalTableCSSRule = '@keyframes moveOriginalTable' +
            '{' +
            'to{left:' + -tableWidthValue + 'px ;}' +
            '}';

        let clonedTableCSSRule = '@keyframes moveClonedTable' +
            '{' +
            'to{left:' + -tableWidthValue + 'px ;}' +
            '}';
        css[0].insertRule(originalTableCSSRule, 0);
        css[0].insertRule(clonedTableCSSRule, 1);
    }
/*
 * gleich nach dem ersten Durchlauf wird Listener nicht mehr gebraucht
 * Dauer und Delay wird neu angepasst, weil Linksposition der Originaltabelle
 * sich geändert hat
*/

    const repeatAnimation = (event)=> {
        originalTable.removeEventListener('animationiteration', repeatAnimation);
        originalTable.style.left = tableWidthValue + 'px';
        originalTable.style.animationDuration = 80 + 's';
        originalTable.style.animationDelay = 40 + 's';
    }

    const addClickHandlersToGalleryimages = ()=> {
        let images = document.querySelectorAll('.gallery-image');
        for(let i = 0; i < images.length; i++){
            images[i].addEventListener('click',imageClickHandler);
        }
    }

/*
 *Beim Click auf das Bild pausiert die Animation
 * Bild Layer wird angezeigt
 * Bild wird geklont und aufs Layer gesetzt
 */
    const imageClickHandler = (event)=>{
        originalTable.style.animationPlayState = 'paused';
        clonedTable.style.animationPlayState = 'paused';
        imagePreviewLayer.style.display = 'block';
        let clonedImg = event.target.cloneNode(true);
        imagePreviewLayer.appendChild(clonedImg);
        imagePreviewLayer.addEventListener('click', imageLayerClickHandler);

    }
/*
 * Event schließt Layer
 * Bild wird aus dem Layer entfernt
 * Animation läuft weiter
 */
    const imageLayerClickHandler = ()=> {
        imagePreviewLayer.innerHTML = '';
        imagePreviewLayer.style.display = 'none';
        originalTable.style.animationPlayState = 'running';
        clonedTable.style.animationPlayState = 'running';
    }

