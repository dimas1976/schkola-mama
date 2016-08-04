(() => {

    let imgArr = [];
    let threeImgArr = [];

    let originalTable = document.querySelector('#original-table');
    let clonedTable;
    let tableWidthValue = 0;
    let trWidth = '';
    let bodyWidth = parseInt(window.getComputedStyle(document.querySelector('body'), null).getPropertyValue('width'));

    let originalTableAnimationFromPoint;
    let clonedTableAnimationFromPoint;
    let newAnimationDuration;

    let galleryDirectoryPath = 'img/gallery/';

    window.addEventListener('load', ()=> {
        console.log('LOAD');
        initGallery();
    });

    const initGallery = ()=> {
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = ()=> {
            if (ajax.readyState == 4 && ajax.status == 200) {
                JSON.parse(ajax.responseText, (k, v)=> {
                    imgArr.push(v);
                });
                imgArr.pop();
                extractThreeImages();
                setGalleryWidth();
                cloneTable();
                addAnimationEvent();
                setAnimationRules();
            }
        };
        ajax.open('GET', 'php/imagesholder.php', true);
        ajax.send(null);
    };

    const extractThreeImages = ()=> {

        while (imgArr.length > 0) {
            let trElement = document.createElement('tr');
            threeImgArr = imgArr.splice(0, 3);
            threeImgArr.forEach((imagePfad) => {
                let tdElement = createImagesColumn(imagePfad);
                trElement.appendChild(tdElement);
            });

            originalTable.appendChild(trElement);
            extractThreeImages();
        }
    };

    const createImagesColumn = (imagePfad)=> {
        let tdElement = document.createElement('td');
        let imageElement = document.createElement('img');
        imageElement.setAttribute('src', galleryDirectoryPath + imagePfad);
        imageElement.setAttribute('alt', "???? ?? ???????");
        //imageElement.className = 'img-responsive';
        tdElement.appendChild(imageElement);

        return tdElement;
    }

    const cloneTable = ()=> {
        clonedTable = originalTable.cloneNode(true);
        clonedTable.id = 'cloned-table';
        clonedTable.style.left = tableWidthValue + 'px';
        document.querySelector('#gallery').appendChild(clonedTable);
    }

    const setGalleryWidth = ()=> {
        let trElement = document.querySelector('table tr');
        trWidth = window.getComputedStyle(trElement, null).getPropertyValue('width');
        tableWidthValue = originalTable.childElementCount * parseInt(trWidth);
        originalTable.style.width = tableWidthValue + 'px';
    }

    const addAnimationEvent = ()=> {
        document.querySelector('#original-table').addEventListener('animationiteration', repeatAnimation);
    }

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

    const repeatAnimation = (event)=> {

        originalTable.removeEventListener('animationiteration', repeatAnimation);
        originalTable.style.left = tableWidthValue + 'px';
        originalTable.style.animationDuration = 80 + 's';
        originalTable.style.animationDelay = 40 + 's';
    }


})();
