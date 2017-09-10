var gulp =          require("gulp");

// gulp debuggin'
var gutil =         require("gulp-util");

// css sass scss etc
var sass =          require("gulp-sass");
var autoprefixer =  require("gulp-autoprefixer");


// javascript
var jshint =        require("gulp-jshint");
var browserify =    require("browserify");
// var source =        require('vinyl-source-stream');


// webserver
var connect =       require("gulp-connect");

// tools
var sourcemaps =    require("gulp-sourcemaps");

var rename =        require("gulp-rename");

// var cache =         require("gulp-cache");
var cached =        require("gulp-cached");
// var changed =       require("gulp-changed");
// var changedInPlace = require("gulp-changed-in-place");

var clean =         require("del");
var path =          require("path");
var fs =            require("fs");


// **********
// build globals

const zoomBuildDestinationRoot = "./build/";
var zoomBuildSrc = "./src/";
// var zoomBuildSrcRoot = "./src/content/pages/";



// webserver
// simple www server for dev

var serverOptions = {
    name: "dev",
    port: 9191,
    defaultFile: "index.html",
    root: zoomBuildDestinationRoot,
    livereload: true,
    directoryListing: {
      enable: false,
      path: "./"
    }
}

gulp.task("webserver", function webserver() {
    connect.server(serverOptions);
});


// **********
// utility: move/copy things that need to be moved and copied

gulp.task("zoom:copy", [ "copy:js-vendor", "copy:css-vendor"]);

gulp.task("zoom:setup", ["build:clean"], function zoomSetup() {
    gulp.start(["zoom:copy"]);
});



// cleans
// erases the existing built files, clean out the compiled stuff

const cleanLocations = [
    "./build/**/*",
];

gulp.task("build:clean", function buildClean() {
    return clean(cleanLocations);
});


// ********************
// compile sass/css

const sassSource =       "./src/scss/**/*.scss";
const cssDestination =   zoomBuildDestinationRoot + "/assets/css";

const sassOptions = {
    errLogToConsole: true,
    outputStyle: "compact",
    sourceComments: false,
};

const autoprefixerOptions = {
    browsers: ["last 2 versions"],
};


gulp.task("compile-sass", function compileSASS() {

    return gulp
    .src(sassSource)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on("error", sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    //.pipe(rename({ suffix: ".min" }))
    // .pipe( buildType === "production" ? cssnano() : gutil.noop() )
    .pipe(sourcemaps.write("./map"))
    .pipe(gulp.dest(cssDestination))
    .on("end", function(event) {
        console.log("compile-sass complete");
    });
});

// watch the sass
var sassSourceGLOB = "./src/scss/**/*.scss";

gulp.task("watch:sass", function() {
    return gulp
    .watch(sassSource, ["compile-sass"])
	.on("error", err => gutil.log("watch error: " + err.message))
    .on("change", function(event) {
        console.log("watch:sass >>> File " + event.path + " was " + event.type );
    });
});



// **********
// JS files


// all the js files
const jsSourceGLOB =        ["./js/**/*.js"];

// the custom js file
const jsSource =        ["./src/js/**/*.js"];

const jsSourceVENDORFiles = ["./src/js/zoom/**/*.js"];

// what dir/files to ignore.
// if it is precompiled, a package distribution, etc., it should be ignored for linting
const jsSourceIgnore = [
    "!" + jsSourceVENDORFiles,
    ];
const jsSources = jsSourceGLOB.concat(jsSourceIgnore);

const jsDestination = zoomBuildDestinationRoot + "/public/assets/js";


// jshintrc config file
const jshintConfiguration = "./config/jshintrc.json";

// basic js lint task
gulp.task("lint-js", function listJS() {
    return gulp
    .src(jsSource)
    .pipe(cached("jslint"))
    .pipe(jshint(jshintConfiguration))
    .pipe(jshint.reporter("default"));
});


// var browserifySourceFile =  "./src/js/site/site.js";
var browserifyDestFile = "zoom.js";
var browserifyMinDestinationFile = "zoom.min.js";
var browserifyDest = jsDestination + browserifyDestFile;


function browserifyScript(file) {
    var bundleOptions = {
            entries: ["./src/js/site/" + file],
            paths: ["./src/js/site/"],
            standalone: "site",
            debug: true
        };
    var bundler = browserify(bundleOptions);

    var stream = bundler.bundle();

    return stream
        .on('error', err => gutil.log("browserifyScript (minify) error: " + err.message))
        .pipe(source(browserifyMinDestinationFile))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here
        //.pipe( buildType === "production" ? uglify() : gutil.noop() )
        // end transforms
        .pipe(sourcemaps.write('./map'))
        .pipe(gulp.dest(jsDestination))
        .on("end", function(event) {
            console.log("browserify ZOOM complete");
        });


//     return;s
}

// browserify the site js code
gulp.task("browserify-zoom-js", [], function browserifyZoomJS() {
    return browserifyScript("main.zoom.js");
});







// **********
// watch folders for changes

var indexPage =        "./src/index.html";
var indexDestination = zoomBuildDestinationRoot;

gulp.task("build:index", function buildIndex() {

    // just copy the index file in this case

    return gulp
    .src(indexPage)
    .pipe(gulp.dest(indexDestination));
});



gulp.task("watch:index", function watchIndex() {
    return gulp
    .watch(indexPage, ["build:index"])
	.on("error", err => gutil.log("watch error: " + err.message))
    .on("change", function(event) {
        console.log("watch:index >>> File " + event.path + " " + event.type );
    });
});

gulp.task("watch:js", function watchJS() {
    return gulp
    .watch(jsSource, ["lint-js", "browserify-zoom-js"])
	.on("error", err => gutil.log("watch js error: " + err.message))
    .on("change", function(event) {
        console.log("watch:js >>> File " + event.path + " was " + event.type );
    });
});




// watch all the things
// gulp.task("watch", ["watch:sass", "watch:js", "watch:content", "watch:BBEDITpages", "watch:index"]);


gulp.task("watch", [], function watchAll() {
    gulp.start(["watch:sass"]);
    gulp.start(["watch:js"]);
    gulp.start(["watch:index"]);
});

gulp.task("default", ["zoom:setup", "watch"], function taskDefault() {

    gulp.start(["compile-sass", "browserify-site-js", "browserify-vendor-js"]);

});

gulp.task("dev", ["watch"], function taskDevDefault() {

    buildType = "development";

    gulp.start(["compile-sass", "browserify-site-js", "browserify-vendor-js"]);

});



//build tasks with minification, etc.
gulp.task("production", [], function() {

    buildType = "production";

    gulp.start("compile-sass");

    gulp.start(["browserify-site-js"]);
    gulp.start(["browserify-vendor-js"]);


    //buildType = "development";
});

