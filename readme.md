# About jquery.zoom-plus

Founded on top of the jquery.zoom plugin, this version wraps the original widget into a module with slightly different clothes,
converting the front-end of the widget to use css and webfont elements, and altering the structure of the html image element.

### Changes from the original


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

#### Uses 
[jQuery.zoom](https://github.com/jackmoore/zoom) plugin to enlarge images on touch, click, or mouseover. 
See the original [jquery.zoom project page](http://jacklmoore.com/zoom/) for documentation of the plugin details.



## Background
I originally adapted this widget to use as part of a larger project I was developing, and have broken it out here as a stand-alone resource and demonstration.
The original project included dynamically-generated image elements on the page, and I wanted a widget that would be more autonomous than the original widget.

If some of the decisions made here seem curious to you (e.g. all of fontawesome for just one glyph?), that is probably the explanation.


## Example

```
    <div class="zoom-example" id="example" data-imagezoom-id="example" data-zoom-options='{"on":"mouseover", "magnify":"2"}'>

        <figure>
            <div class="image-zoomable">
                <img class="img-fluid" src="./assets/img/willow_the_dog.jpg" alt="Willow" title="Hold and drag to view in detail." />
                <div class="zoom-mark"><div class="cutout"></div><span class="icon fa fa-search"></span></div>
            </div>
            <figcaption>Hover (aka. mouseover)</figcaption>
        </figure>

    </div>
```    

See `index.html` for a working demonstration.



each image element must have a unique id and the data-imagezoom-id value must also be the id.

The data-zoom-options attribute is a json-format collection of widget settings.
See the original [jquery.zoom project page](http://jacklmoore.com/zoom/) for documentation of the available properties ("Settings").



### Dependencies

#### For development
* node
* npm
* numerous node modules (including the original jquery.zoom library), which are handled by npm

#### For usage
* jquery
* FontAwesome

## Installation

1. git clone/download locally.

2. Expand, and navigate to the new directory.

```
cd zoom-plus


```

3. Initialize the project. This will chug along for a bit, downloading all the module dependencies

```
npm install

```


4. Run the gulp build task.

```
gulp
```


5. Browse to the local webserver to view the demo page

```
http://localhost:9999


```



## Usage








## Tests

There are no tests.




## Changelog:

##### v1.0 - 2017/9/18
* converted the original jquery.zoom widget into a gulp-built, browserified widget module.
