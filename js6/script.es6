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
        // slideGallery();
    }

    const addAnimationEvent = ()=> {
        document.querySelector('#original-table').addEventListener('webkitAnimationIteration', (event)=> {
            repeatAnimation(event.target);
        });
        document.querySelector('#cloned-table').addEventListener('animationiteration', (event)=> {
            repeatAnimation(event.target);
        });
    }

    const setAnimationRules = ()=> {
        let css = document.styleSheets;

        let originalTableCSSRule = '@keyframes moveOriginalTable' +
            '{' +
                // 'from{left:0px;}' +
            'to{left:' + -tableWidthValue + 'px ;}' +
            '}';

        let clonedTableCSSRule = '@keyframes moveClonedTable' +
            '{' +
                //'from{left:' + tableWidthValue + 'px;}' +
            'to{left:' + -tableWidthValue + 'px ;}' +
            '}';
        css[0].insertRule(originalTableCSSRule, 0);
        css[0].insertRule(clonedTableCSSRule, 1);
    }

    const repeatAnimation = (table)=> {
        switch (table.id) {
            case 'original-table':
                originalTable.style.animationPlayState = 'paused';
                originalTable.style.animationDuration = 80 + 's';
                originalTable.style.animationDelay = 40 + 's';
                originalTableAnimationFromPoint = parseInt(window.getComputedStyle(clonedTable, null).getPropertyValue('left')) + tableWidthValue;
                originalTable.style.left = originalTableAnimationFromPoint + 'px';
                originalTable.style.animationPlayState = 'running';
                break;

            case 'cloned-table':
                clonedTableAnimationFromPoint = parseInt(window.getComputedStyle(originalTable, null).getPropertyValue('left')) + tableWidthValue;
                clonedTable.style.left = clonedTableAnimationFromPoint + 'px';
        }
    }


    /* const slideGallery = ()=> {
     tableElement.style.left = -tableWidthValue + bodyWidth + 'px';
     intervalID = setInterval(calculateColumnNumberOffset, 1000);
     }


     const calculateColumnNumberOffset = ()=> {
     //clearInterval(intervalID);
     let tbPosition = window.getComputedStyle(originalTable, null).getPropertyValue('left');
     let positivePosition = Math.abs(parseInt(tbPosition));
     let cuttedColumnNumber = Math.floor(positivePosition / parseInt(trWidth));
     console.log('Anzahl der Spalten' + cuttedColumnNumber);

     cutTable(cuttedColumnNumber);
     }
     const cutTable = (cuttedColumnNumber)=> {
     for(let i = 0; i <= cuttedColumnNumber ; i++){
     //console.log(tableElement.children.item(i));
     let childNode = originalTable.children.item(i);
     childNode.remove();
     originalTable.appendChild(childNode);
     }
     //tableElement.style.left = -tableWidthValue + 'px';
     }

     const continueTableTransitition = ()=> {
     tableElement.style.left = -tableWidthValue + bodyWidth + 'px';
     }*/


})();
