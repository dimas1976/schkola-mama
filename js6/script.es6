(() => {
    let imgArr = new Array();
    let threeImgArr = new Array();
    let selectedGalleryTable = document.querySelector('table');

    let galleryDirectoryPath = 'img/gallery/';

    const createGalleryImagesNamesArray = ()=> {
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = ()=> {
            if (ajax.readyState == 4 && ajax.status == 200) {
                console.log("ResponseText: " + ajax.responseText);
                JSON.parse(ajax.responseText, (k, v)=> {
                    imgArr.push(v);
                });
                imgArr.pop();
                extractThreeImages();
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

            selectedGalleryTable.appendChild(trElement);
            extractThreeImages();
        }
    };

    let createImagesColumn = (imagePfad)=> {
        let tdElement = document.createElement('td');
        let imageElement = document.createElement('img');
        imageElement.setAttribute('src', galleryDirectoryPath + imagePfad);
        imageElement.setAttribute('alt', "???? ?? ???????");
        tdElement.appendChild(imageElement);

        return tdElement;
    }
    createGalleryImagesNamesArray();

})();
