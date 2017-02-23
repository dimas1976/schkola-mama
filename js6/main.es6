import {initScrollHandler} from './navibar';
import {windowLoadHandler} from './gallery';
window.addEventListener('load', function(event){
    windowLoadHandler();
    initScrollHandler();
});
