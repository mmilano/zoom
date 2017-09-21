# About jquery.zoom-plus

Founded on top of the jquery.zoom plugin, this version wraps the original widget into a module with slightly different clothes,
converting the front-end of the widget to use css and webfont elements, and altering the structure of the html image element.

### Changes From the Original

* Incorporates the original js widget into a self-executing module that will run on the document.ready event and 
automatically initialize all of the image-zoom elements it can find on the page.
* Changed the html element structure that is used for the image.
* Zoom options are embedded into the html as json-format data attributes and parsed at initialization (rather than requiring a javascript object that is passed to the library).
* Adapted a gulp build process that compiles the sass, assembles and browserifys the javascript.
* Styled via sass rules that are compiled to css.
* Replaced the cursor 'grab' and 'grabbing' images with css 'cursor' rules.
* Replaces the corner cutout ("notch") image file with a css-generated graphic.
* Replaced the magnifying glass image with FontAwesome glyph.
* Featuring a new dog.


### Back Story
I adapted the original library to use as part of a larger project I was developing, and have broken it out here as a stand-alone resource and demonstration.
The larger project includes dynamically-generated image elements on a page, and I wanted a widget that would be more autonomous than the original, one where the settings for the widget were incorporated with the instance itself.

Arguably this specific project is not exactly a fork of the original widget anymore, but is some manner of tangent with wrapping. Point acknowledged.

Note: if some of the decisions made here seem curious to you (for example: all of fontawesome for just one glyph?), the explanation probably lies in the 
circumstance that this is an extracted part from a larger project. 



## Usage

### Example Element on a Page

```
<div class="zoom-example" id="exampleID" data-imagezoom-id="exampleID" data-zoom-options='{"on":"mouseover", "magnify":"2"}'>

    <figure>
        <div class="image-zoomable">
            <img class="img-fluid" src="./assets/img/willow_the_dog.jpg" alt="Willow" />
            <div class="zoom-mark"><div class="cutout"></div><span class="icon fa fa-search"></span></div>
        </div>
        <figcaption>Hover (aka. mouseover)</figcaption>
    </figure>

</div>
```

Linking to the library
```
<script src="./assets/js/zoom.js"></script>
```


See `index.html` for a simple demonstration.


* Each image element must have a unique id, and the `data-imagezoom-id` attribute value must be set to the id.

* The `data-zoom-options` attribute is a json-format collection of widget settings. It is read and parsed by the instantiating code and passed to the zoom library.
See the original [jquery.zoom project page](http://jacklmoore.com/zoom/) for documentation of the available properties ("Settings").





## Installation

1. git clone/download locally.

2. Expand, and navigate to the new directory.
```
cd zoom-plus-master
```

3. Initialize the project. This will chug along for a bit, creating the node_modules folder and downloading all the development dependencies.
```
npm install
```

4. Run the gulp build task.
This will:
* create a `build` directory, and copy assets into that directory
* generate the css from the sass
* browserify the javascript and create a single file
* start a dev webserver
* start a couple `gulp watch` process to monitor the source files for changes

```
gulp
```

5. Browse to the dev webserver to view the demo page.
Edit `gulpfile.js` if you want to change the http port being used.
```
http://localhost:9999

```


### Dependencies
#### For Development
* node
* npm

#### For Usage
* jquery
* FontAwesome


##### The jquery.zoom widget
This relies on the [jQuery.zoom](https://github.com/jackmoore/zoom) plugin, which is incorporated into the assemblied javascript file `zoom.js`.
See the original [jquery.zoom project page](http://jacklmoore.com/zoom/) for documentation of the plugin details and available settings.


## Tests

There are no tests.



## Changelog:

##### v1.0 - 2017/9/18
* converted the original jquery.zoom widget into a gulp-built, browserified widget module.
