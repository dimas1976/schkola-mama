'use strict';

var _navibar = require('./navibar');

var _gallery = require('./gallery');

window.addEventListener('load', function (event) {
    (0, _gallery.windowLoadHandler)();
    (0, _navibar.initScrollHandler)();
});