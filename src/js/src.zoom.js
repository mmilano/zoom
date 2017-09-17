// 	Zoom widget initialization
//     initializes jquery.zoom.js

var zoom = require("jquery-zoom");

(function ($) {
    "use strict";

    // initialize zoom
    $(document).ready(function() {

        // gather up all the zoom's on the page, if there are any, and then initialize them.
        // images with zoom have data-imagezoom="" & data-zoom-options="" attributes
        var elementsList = document.querySelectorAll("[data-imagezoom]");  // css syntax

        var ln = elementsList.length;
        for (var i = 0; i < ln; i++) {
            var el = elementsList[i];

            var zoomOptions, w, attr = el.getAttribute("data-zoom-options");
            try {
                // parse the options
                zoomOptions = attr && JSON.parse(attr);
            } catch (error) {
                if (console) {
                    console.error("Error with " + attr + " on " + el.className + ": " + error);
                }
                return;
            }

            w = $(".image-zoom", el);
            w.zoom(zoomOptions);
        }

//         elementsList.forEach(function(el) {
//             var zoomOptions, attr = el.getAttribute("data-zoom-options");
//
//             try {
//                 zoomOptions = attr && JSON.parse(attr);
//             } catch (error) {
//                 if (console) {
//                     console.error("Error with " + attr + " on " + el.className + ": " + error);
//                 }
//                 return;
//             }
//
//             var w = $(".image-zoom", el);
//             w.zoom(zoomOptions);
//         });
    });

}(jQuery));