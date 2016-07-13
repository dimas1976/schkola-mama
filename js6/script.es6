(() => {
    let imgArr = new Array();
    let threeImgArr = new Array();
    let origTable = document.querySelector('table');


    let galleryDirectoryPath = 'img/gallery/';

    const initGallery = ()=> {
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = ()=> {
            if (ajax.readyState == 4 && ajax.status == 200) {
                JSON.parse(ajax.responseText, (k, v)=> {
                    imgArr.push(v);
                });
                imgArr.pop();
                extractThreeImages();
                cloneTable();
                setGalleryWidth();
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

            origTable.appendChild(trElement);
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
        let clonedTable  = origTable.cloneNode(true);
        clonedTable.className = 'cloned-table';
        document.querySelector('#gallery').appendChild(clonedTable);
    }

    const setGalleryWidth = ()=> {
        let tdElement = document.querySelector('table tr td');
        let tdWidth = window.getComputedStyle(tdElement,null).getPropertyValue('width');
        let tableWidthValue = origTable.childElementCount * parseInt(tdWidth);
        origTable.style.width  = tableWidthValue + 'px';

        slideGallery(tableWidthValue);
    }

    const slideGallery = (tableWidthValue)=> {
        let bodyEl = document.querySelector('body');
        let bodyWidth = window.getComputedStyle(bodyEl, null).getPropertyValue('width');
        origTable.style.left = -tableWidthValue + parseInt(bodyWidth) + 'px' ;
    }

    initGallery();

})();
