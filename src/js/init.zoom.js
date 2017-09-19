// 	Zoom widget initialization

var zoom = require("jquery-zoom");

(function ($) {
    "use strict";

    // initialize on document.ready event
    $(document).ready(function() {

        // gather up all the zoom's on the page, if there are any, and then initialize them.
        // images with zoom have data-imagezoom="..." & data-zoom-options="..." attributes
        var elementsList = document.querySelectorAll("[data-imagezoom]");  // css syntax

        var ln = elementsList.length;
        for (var i = 0; i < ln; i++) {
            var el = elementsList[i];

            var zoomOptions, w, attr = el.getAttribute("data-zoom-options");
            try {
                // try to parse the options
                zoomOptions = attr && JSON.parse(attr);
            } catch (error) {
                if (console) {
                    console.error("Error with " + attr + " on " + el.className + ": " + error);
                }
                return;
            }

            // select the element
            w = $(".image-zoomable", el);
            // invoke the jquery.zoom function, passing the options
            w.zoom(zoomOptions);
        }

    });

}(jQuery));