'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _section = document.querySelector('#about_us-wrapper');
var _height = parseInt(window.getComputedStyle(_section, null).getPropertyValue('height'));
var _navi = document.querySelector('#second-menu');

var initScrollHandler = exports.initScrollHandler = function initScrollHandler() {
    window.addEventListener("scroll", windowScrollHandler);
};

var windowScrollHandler = function windowScrollHandler() {
    if (window.scrollY >= _height) {
        naviFadeIn(_navi);
    } else {
        naviFadeOut(_navi);
    }
};

var naviFadeIn = function naviFadeIn(_navi) {
    _navi.style.opacity = '0.8';
};

var naviFadeOut = function naviFadeOut(_navi) {
    _navi.style.opacity = '0';
};