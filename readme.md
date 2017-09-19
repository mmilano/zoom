# About jquery.zoom++

Derived from the original jquery.zoom plugin, this version has converted the widget to use a number of different elements


### Changes from the Original



* Styled via sass rules that are compiled to css

* Replaced the cursor 'grab' and 'grabbing' images with css 'cursor' rules.

* Replaces the corner cutout ("notch") image file with a css-generated graphic.

* Replaced the magnifying glass image with FontAwesome glyph.

* Changed the html element structre that is used

* Incorporates the original core of the widget into a self-executing module that will run on the document.ready event and 
automatically initialize all of the image-zoom elements it can find on the page 

* Adapted a gulp build process that compiles the sass, assembles and browserifys the javascript

* Featuring a new dog.

Uses 
[jQuery.zoom](https://github.com/jackmoore/zoom) plugin to enlarge images on touch, click, or mouseover. 
See the original [jquery.zoom project page](http://jacklmoore.com/zoom/) for documentation of the plugin details.




I originally adapted this widget to use as part of a larger project I was developing, and have broken it out here as a stand-alone resource and demonstration.
If some of the decisions made here seem curious to you (e.g. all of fontawesome for just one glyph?), that is probably the explanation.





###Dependencies

###for usage
* jquery
* FontAwesome

### For development
* node
* npm




## How to use

Download the project from Github

Expand, and navigate to the new directory in your terminal

Initialize the project. This will chug along for a small time, downloading all the dependencies

`npm install`

Run the gulp build task.
`gulp`

Open to the demo webserver
`http://localhost:9999`







## Changelog:

##### v1.0 - 2017/9/18
* converted the original jquery.zoom widget into a gulp-built, browserified widget module.
