const { src, dest, watch, series, parallel } = require('gulp');

const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');

// File paths
const files = { 
    scssPath: 'src/scss/*.scss',
    jsPath: 'src/js/*.js',
    htmlPath: 'index.html'
};

function scssTask(){    
    return src(files.scssPath)
        //.pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
        //.pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
        //.pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('dist')
    ); // put final CSS in dist folder
}

function jsTask(){
    return src([
        files.jsPath
        ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(dest('dist')
    );
}

var cbString = new Date().getTime();
function cacheBustTask(){
    return src(['index.html'])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
        .pipe(dest('.'));
}

function coppyHtml(){
    return (
        src('index.html')
        .pipe(dest('./dist'))
    );
}

function coppyImg(){
    return (
        src('./images/*.jpg')
        .pipe(dest('./dist/images'))
    );
}

function watchTask(){
    watch([files.scssPath, files.jsPath, files.htmlPath], 
        parallel(coppyHtml, scssTask, jsTask));    
}

exports.default = series(
    coppyHtml,
    coppyImg,
    parallel(scssTask, jsTask),
    cacheBustTask,
    watchTask
);