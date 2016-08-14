(()=> {
    let _section = document.querySelector('#about_us-wrapper');
    let _height = parseInt(window.getComputedStyle(_section, null).getPropertyValue('height'));
    let _navi = document.querySelector('#second-menu');

    const init = ()=> {
        window.addEventListener("scroll", windowScrollHandler);
    }

    const windowScrollHandler = ()=> {
        if ((window.scrollY) >= _height) {
            //window.removeEventListener('scroll', windowScrollHandler);
            naviFadeIn(_navi);
        } else  {
            naviFadeOut(_navi);
        }
    }

    const naviFadeIn = (_navi)=> {
        console.log('fadeIn');
        _navi.style.opacity = '1';
    }

    const naviFadeOut = (_navi)=> {
        console.log('fadeOut');
        _navi.style.opacity = '0';
    }

    init();
})();