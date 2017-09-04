// 	Zoom widget initialization
//     manages jquery.zoom.js

"use strict";
require("./jquery.zoom.min.js");

(function ($) {

    // initialize zoom
    $(document).ready(function() {

        // gather up all the zoom's on the page, if there are any, then automatically initialize them.
        // images with zoom have data-imagezoom="" & data-zoom-options="" attributes
        var elementsList = document.querySelectorAll("[data-imagezoom]");

        elementsList.forEach(function(el) {
            var zoomOptions, attr = el.getAttribute("data-zoom-options");

            try {
                zoomOptions = attr && JSON.parse(attr);
            } catch (error) {
                if (console) {
                    console.error("Error with " + attr + " on " + el.className + ": " + error);
                }
                return;
            }

            var w = $(".image-zoom", el);
            w.zoom(zoomOptions);
        });
    });

}(jQuery));