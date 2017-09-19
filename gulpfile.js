var gulp =          require("gulp");

// gulp debuggin'
var gutil =         require("gulp-util");

// css sass scss etc
var sass =          require("gulp-sass");
var autoprefixer =  require("gulp-autoprefixer");

// javascript
var jshint =        require("gulp-jshint");
var browserify =    require("browserify");
var source =        require("vinyl-source-stream");
var buffer =        require("vinyl-buffer");

// webserver
var connect =       require("gulp-connect");

// tools
var sourcemaps =    require("gulp-sourcemaps");
var rename =        require("gulp-rename");
var cached =        require("gulp-cached");
// var changed =       require("gulp-changed");
// var changedInPlace = require("gulp-changed-in-place");
var clean =         require("del");
var path =          require("path");
var fs =            require("fs");



// **********
// build globals

const zoomBuildRoot = "./build/";
var zoomBuildSrc = "./src/";



// webserver
// simple www server for dev

var serverOptions = {
    name: "dev",
    port: 9999,
    defaultFile: "index.html",
    root: zoomBuildRoot,
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
// clean
// erases the existing built files, clean out the compiled stuff

const cleanLocations = [
    "./build/**/*",
];

gulp.task("build:clean", function buildClean() {
    return clean(cleanLocations);
});



// **********
// utility: move/copy things that need to be moved and copied

gulp.task("zoom:setup", ["build:clean"], function zoomSetup() {
    gulp.start(["copy:images"]);
});

var imgSource =      "./src/img/**/*.+(png|jpg|jpeg|gif|svg)";
var imgDestination = zoomBuildRoot + "./assets/img/";

gulp.task("copy:images", function copyImages() {
    return gulp
    .src([imgSource])
    .pipe(gulp.dest(imgDestination));
});



// ********************
// compile sass/css

const sassSource =     "./src/scss/**/*.scss";
const cssDestination = zoomBuildRoot + "/assets/css";

const sassOptions = {
    errLogToConsole: true,
    outputStyle: "expanded",
    sourceComments: true,
};

const autoprefixerOptions = {
    browsers: ["last 2 versions"],
};

gulp.task("compile:sass", function compileSASS() {
    return gulp
    .src(sassSource)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on("error", sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
//     .pipe(rename({ suffix: ".min" }))        // disabled minification of css
//     .pipe(cssnano())                         // disabled minification of css
    .pipe(sourcemaps.write("./map"))
    .pipe(gulp.dest(cssDestination))
    .on("end", function(event) {
        console.log("compile:sass complete");
    });
});

// watch the sass
var sassSourceGLOB = "./src/scss/**/*.scss";

gulp.task("watch:sass", function() {
    return gulp
    .watch(sassSource, ["compile:sass"])
	.on("error", err => gutil.log("watch error: " + err.message))
    .on("change", function(event) {
        console.log("watch:sass >>> File " + event.path + " was " + event.type );
    });
});




// **********
// assemble javascript

// the custom js file
const jsSource =        ["./src/js/**/*.js"];
const jsDestination = zoomBuildRoot + "/assets/js";

// basic js lint task
gulp.task("lint-js", function listJS() {
    return gulp
    .src(jsSource)
    .pipe(cached("jslint"))
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});


var browserifyDestFile = "zoom.js";
var browserifyDest = jsDestination + browserifyDestFile;

function browserifyScript(file) {
    var bundleOptions = {
            entries: ["./src/js/" + file],
            paths: ["./src/js/*"],
            standalone: "zoom",
            debug: true
        };
    var bundler = browserify(bundleOptions);

    var stream = bundler.bundle();

    return stream
        .on('error', err => gutil.log("browserify error: " + err.message))
        .pipe(source(browserifyDestFile))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        // Add transformation tasks to the pipeline here
//         .pipe(uglify())         // disabled minification of js
        // end transforms
        .pipe(sourcemaps.write('./map'))
        .pipe(gulp.dest(jsDestination))
        .on("end", function(event) {
            console.log("browserify ZOOM complete");
        });

}

// browserify the site js code
gulp.task("browserify-zoom-js", [], function browserifyZoomJS() {
    return browserifyScript("init.zoom.js");
});



// **********
// index/demo page

var indexPage =        "./src/index.html";
var indexDestination = zoomBuildRoot;

gulp.task("build:index", function buildIndex() {
    // just copy the index file in this demo
    return gulp
    .src(indexPage)
    .pipe(gulp.dest(indexDestination));
});



// **********
// watching tasks

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

gulp.task("watch:sass", function watchSASS() {
    return gulp
    .watch(sassSource, ["compile:sass"])
	.on("error", err => gutil.log("watch error: " + err.message))
    .on("change", function(event) {
        console.log("watch:sass >>> File " + event.path + " was " + event.type );
    });
});

// watch all the things

gulp.task("watch", [], function watchAll() {
    gulp.start(["watch:sass"]);
    gulp.start(["watch:js"]);
    gulp.start(["watch:index"]);
});

// default build task
gulp.task("default", ["zoom:setup", "watch"], function taskDefault() {
    gulp.start(["webserver"]);
    gulp.start(["compile:sass", "browserify-zoom-js", "build:index"]);

});

gulp.task("dev", ["watch"], function taskDevDefault() {
    gulp.start(["compile:sass"]);
    gulp.start(["browserify-site-js"]);
    gulp.start(["build:index"]);
});
