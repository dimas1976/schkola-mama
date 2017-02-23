
    let _section = document.querySelector('#about_us-wrapper');
    let _height = parseInt(window.getComputedStyle(_section, null).getPropertyValue('height'));
    let _navi = document.querySelector('#second-menu');

   export const initScrollHandler = ()=> {
        window.addEventListener("scroll", windowScrollHandler);
    }

    const windowScrollHandler = ()=> {
        if ((window.scrollY) >= _height) {
            naviFadeIn(_navi);
        } else  {
            naviFadeOut(_navi);
        }
    }

    const naviFadeIn = (_navi)=> {
        _navi.style.opacity = '0.8';
    }

    const naviFadeOut = (_navi)=> {
        _navi.style.opacity = '0';
    }

