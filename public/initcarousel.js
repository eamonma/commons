"use strict";var m={get:function get(a){return"#"===a.charAt(0)?document.getElementById(a.substring(1,a.length)):"."===a.charAt(0)?document.getElementsByClassName(a.substring(1,a.length))[0]:document.getElementsByTagName(a)[0]},getS:function getS(a){return"#"===a.charAt(0)?[document.getElementById(a.substring(1,a.length))]:"."===a.charAt(0)?document.getElementsByClassName(a.substring(1,a.length)):document.getElementsByTagName(a)}};

var carousel = new Flickity(m.get(".carousel"), {
    autoPlay: 3000,
    pauseAutoPlayOnHover: false,
    wrapAround: true,
    lazyLoad: 2
})