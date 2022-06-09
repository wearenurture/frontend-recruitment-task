# Gulp Auto Imports

_Auto generate import-only files for any file type. SCSS, JS, Pug, whatever you want._

[![Supported Node version](https://img.shields.io/node/v/gulp-auto-imports.svg?style=for-the-badge)](https://nodejs.org/en/)

Are you sick of having to manually manage files that are purely just a bunch of import statements?

Wouldn't it be awesome if Gulp could just look at your file system and manage this busy work for you?

That is where Gulp Auto Imports comes in. Gulp Auto Imports will automatically manage these import-only files for you giving you more time to worry about the important stuff.

Due to it's high level of customization, Gulp Auto Imports is able to generate any import file you can imagine. SCSS, JS, Pug, PHP, you name it, it can create an import file for it (assuming the language supports import functionality in some way).

Gulp Auto Imports also has the ability to remember the order that imports are declared in. If you have ever had any experience with glob-loading SCSS files, you will know the pain of trying to get `alpha.scss` to override styles in `beta.scss`. With Gulp Auto Imports, simply rearrange the import statements and you're done!

> **Note:** if using Gulp Auto Imports with Sass files, it is best used [_in combination_](#use-in-combination-with-gulp-sass-glob) with [Gulp Sass Glob](https://www.npmjs.com/package/gulp-sass-glob), not as a complete replacement for it.

## Contents <!-- omit in toc -->

-  [Before and after Gulp Auto Imports](#before-and-after-gulp-auto-imports)
   -  [SCSS Before](#scss-before)
   -  [SCSS After](#scss-after)
   -  [JS before](#js-before)
   -  [JS after](#js-after)
-  [Install](#install)
-  [Using the SCSS preset](#using-the-scss-preset)
-  [Using the automated Gulp task generator function](#using-the-automated-gulp-task-generator-function)
-  [Use in _combination_ with Gulp Sass Glob](#use-in-combination-with-gulp-sass-glob)
   -  [Gulp 3 combination](#gulp-3-combination)
   -  [Gulp 4 combination](#gulp-4-combination)
   -  [Using a combination inside main.scss](#using-a-combination-inside-mainscss)
-  [All available presets](#all-available-presets)
   -  [Overriding a preset](#overriding-a-preset)
-  [JS configuration examples](#js-configuration-examples)
   -  [Rollup](#rollup)
      -  [Rollup in Gulp 4](#rollup-in-gulp-4)
      -  [Rollup in Gulp 3](#rollup-in-gulp-3)
   -  [Browserify](#browserify)
   -  [Making use of the generated JS file](#making-use-of-the-generated-js-file)
-  [How to do custom configurations](#how-to-do-custom-configurations)
   -  [Manual SCSS set up](#manual-scss-set-up)
   -  [Manual JS set up](#manual-js-set-up)
-  [Understanding the `format` and `template` settings](#understanding-the-format-and-template-settings)
   -  [The `$name` placeholder](#the-name-placeholder)
   -  [The `$fileName` placeholder](#the-filename-placeholder)
   -  [The `$ext` placeholder](#the-ext-placeholder)
   -  [The `$path` placeholder](#the-path-placeholder)
   -  [The `$noExtPath` placeholder](#the-noextpath-placeholder)
   -  [The `$dir` placeholder](#the-dir-placeholder)
   -  [Using indents](#using-indents)
-  [The `retainOrder` setting](#the-retainorder-setting)
-  [Settings reference guide](#settings-reference-guide)
-  [Change Log](#change-log)

## Before and after Gulp Auto Imports

### SCSS Before

```scss
// main.scss (manually edited)

@import '../components/component-A/A.scss';
@import '../components/component-B/B.scss';
@import '../components/component-C/C.scss';
@import '../components/component-D/D.scss';
```

### SCSS After

```scss
// main.scss (manually edited)

@import './auto-imports.scss';
```

```scss
// auto-imports.scss (auto-generated)
// retains the order that imports are declared in if edited manually

@import '../components/component-A/A.scss';
@import '../components/component-B/B.scss';
@import '../components/component-C/C.scss';
@import '../components/component-D/D.scss';
```

### JS before

```js
// main.js (manually edited)

import $ from 'jquery'

import A from '../components/component-A/A.js'
import B from '../components/component-B/B.js'
import C from '../components/component-C/C.js'
import D from '../components/component-D/D.js'

$(() => {
   A()
   B()
   C()
   D()
})
```

### JS after

```js
// main.js (manually edited)

import $ from 'jquery'

import autoImports from './auto-imports.js'

$(() => {
   autoImports()
})
```

```js
// auto-imports.js (auto-generated)

import A from "../components/component-A/A.js";
import B from "../components/component-B/B.js";
import C from "../components/component-C/C.js";
import D from "../components/component-D/D.js";

export default function() {
  A();
  B();
  C();
  D();
})
```

## Install

Install Gulp Auto Imports using the following command:

```
npm install gulp-auto-imports --save-dev
```

---

For my examples, I am assuming that the project folder structure looks like this:

```
[root]
|  source
|  |  components
|  |  |  [component-folders]
|  |  |  |  [component-name].js
|  |  |  |  [component-name].scss
|  |  js
|  |  |  auto-imports.js
|  |  |  main.js
|  |  scss
|  |  |  config
|  |  |  |  [scss-config-files]
|  |  |  auto-imports.scss
|  |  |  main.scss
|  build
|  |  assets
|  |  |  css
|  |  |  |  main.css
|  |  |  js
|  |  |  |  main.js
| gulpfile.js
```

## Using the SCSS preset

Writing out all of the required settings manually for this plugin can be a bit tiresome. As of version 2.0.0 I've included some common preset settings that you can use as defaults. All you need to do for a basic SCSS set up is the following. You will need the `gulp-sass` plugin for this to fully work. `npm i gulp-sass -D`).

```js
var gulp = require('gulp')
var autoImports = require('gulp-auto-imports')
var sass = require('gulp-sass')

// Preset SCSS gulp-auto-imports task
gulp.task('sass:load', function () {
   // Always relative to gulpfile.js even if this code is inside a folder
   var dest = 'source/scss'
   // Do not leave off the "return", it is vital!
   return (
      gulp
         .src('./source/components/**/*.scss')
         // Using the "scss" preset ("dest" must be provided here as well)
         .pipe(autoImports({ preset: 'scss', dest: dest }))
         .pipe(gulp.dest(dest))
   )
})

/************\
    Gulp 4
\************/

// Define a separate compile task
gulp.task('sass:compile', function () {
   return gulp
      .src('source/scss/main.scss')
      .pipe(sass())
      .pipe(gulp.dest('build/assets/css'))
})

// make "sass:load" run before "sass:compile" when "sass" is run
gulp.task('sass', gulp.series('sass:load', 'sass:compile'))

// Watch for changes
gulp.task('watch', function (done) {
   gulp.watch('source/**/*.scss', gulp.series('sass'))
   done()
})

/************\
    Gulp 3
\************/

// Make "sass" dependent on "sass:load"
gulp.task('sass', ['sass:load'], function () {
   return gulp
      .src('source/scss/main.scss')
      .pipe(sass())
      .pipe(gulp.dest('build/assets/css'))
})

// Watch for changes
gulp.task('watch', function () {
   gulp.watch('source/**/*.scss', ['sass'])
})
```

The `scss` preset will apply the following default settings:

```js
// scss preset default settings
{
  format: `@import '$path';`,
  fileName: 'auto-imports.scss',
  retainOrder: true,
  header: `
// This file is generated by gulp-auto-imports.
// Save this file into source control.
// You may rearrange the order of the imports however you like.
// You may NOT make any other alterations to this file.
`
};
```

The output of the example `'sass:load'` task will look something like this:

```scss
// This file is generated by gulp-auto-imports.
// Save this file into source control.
// You may rearrange the order of the imports however you like.
// You may NOT make any other alterations to this file.

@import '../components/A/A.scss';
@import '../components/B/B.scss';
@import '../components/C/C.scss';
@import '../components/D/D.scss';
```

Due to the [`retainOrder: true` setting](#the-retainorder-setting), you can rearrange the output. Gulp Auto Imports will preserve the order when it recompiles.

```scss
// Rearrange the output and Gulp Auto Imports will preserve it
// (Requires the `retainOrder` setting to be enabled)

@import '../components/D/D.scss';
@import '../components/A/A.scss';
@import '../components/C/C.scss';
@import '../components/B/B.scss';
```

If you add a new file to the system (eg. a `../components/A/A-two.scss` file) gulp-auto-imports will aim to group it with the other files found in the same folder.

```scss
// gulp-auto-imports will aim to group new files with files found in the same folder

@import '../components/D/D.scss';
@import '../components/A/A.scss';
@import '../components/A/A-two.scss'; // New file added
@import '../components/C/C.scss';
@import '../components/B/B.scss';
```

Add this line to your main scss file to auto-loaded your component styles:

```scss
// Import the auto-imports.scss file from main.scss
@import './auto-imports.scss';
```

You can now auto-load all of you're component scss files while still retaining full control over CSS source order! 😃

## Using the automated Gulp task generator function

Making a single auto-imports file is ok using the standard method, however when you start making more than one auto-import file, the process can become quite cumbersome. This is why Gulp Auto Imports also comes with a task generator to make generating multiple auto-import files super easy.

For this example, we are going to generate three separate auto-import files. One for `vars`, one for `mixins`, and one for `components`.

Here is the full code:

```js
var gulp = require('gulp')
var { createAutoImportTask } = require('gulp-auto-imports')

// Create a function for generating auto-import gulp tasks
const createScssImporterTask = sourceFolder =>
   createAutoImportTask({
      sourceFolder,
      // [optional] default = *all files*; Restrict imports to only target files with a specific extension name
      fileExtension: 'scss',
      // [optional] use this to resolve task name conflicts
      taskPrefix: 'compile',
      // [optional] default = true; will ignore the generated import file
      ignoreImporterFile: true,
      // Same settings object that you apply to the main gulp task
      importerSettings: {
         preset: 'scss',
         // Note: `dest` will default to the source folder unless you define it here
         // The generated output file will be ignored
      },
   })

// Destructure into separate importer and watcher tasks
const [scssVarsImporter, scssVarsImportWatcher] = createScssImporterTask(
   './source/scss/config/vars'
)
const [scssMixinsImporter, scssMixinsImportWatcher] = createScssImporterTask(
   './source/scss/config/mixins'
)
const [scssComponentsImporter, scssComponentsImportWatcher] =
   createScssImporterTask('./source/scss/config/components')

// Gulp 4
gulp.task(
   'scss-auto-imports',
   gulp.parallel(
      scssVarsImporter,
      scssVarsImportWatcher,
      scssMixinsImporter,
      scssMixinsImportWatcher,
      scssComponentsImporter,
      scssComponentsImportWatcher
   )
)

// Gulp 3
gulp.task('scss-auto-imports', [
   scssVarsImporter,
   scssVarsImportWatcher,
   scssMixinsImporter,
   scssMixinsImportWatcher,
   scssComponentsImporter,
   scssComponentsImportWatcher,
])
```

If you don't want to write out all the task variables, you can also use destructuring as a shortcut.

```js
/**
 * Use array destructuring as a shortcut
 */

// Gulp 4
gulp.task(
   'scss-auto-imports',
   gulp.parallel(
      ...createScssImporterTask('./source/scss/config/vars'),
      ...createScssImporterTask('./source/scss/config/mixins'),
      ...createScssImporterTask('./source/scss/config/mixins')
   )
)

// Gulp 3
gulp.task('scss-auto-imports', [
   ...createScssImporterTask('./source/scss/config/vars'),
   ...createScssImporterTask('./source/scss/config/mixins'),
   ...createScssImporterTask('./source/scss/config/mixins'),
])
```

If you don't want to have gulp watch the files, simply don't pass the watcher into your gulp process.

```js
/**
 * Avoid watching files by not passing the generated watcher task into your main gulp process
 */

// Destructure to extract only the build task
const [scssVarsImporter] = createScssImporterTask('./source/scss/config/vars')
const [scssMixinsImporter] = createScssImporterTask(
   './source/scss/config/mixins'
)
const [scssComponetsImporter] = createScssImporterTask(
   './source/scss/config/mixins'
)

// Gulp 4 (no watching of files)
gulp.task(
   'scss-auto-imports',
   gulp.parallel(scssVarsImporter, scssMixinsImporter, scssComponetsImporter)
)

// Gulp 3 (no watching of files)
gulp.task('scss-auto-imports', [
   scssVarsImporter,
   scssMixinsImporter,
   scssComponetsImporter,
])
```

The values that `createAutoImportTask` returns are two task names in the format demonstrated below:

```js
const taskNames = createAutoImportTask({
   sourceFolder: './path/to/sourceFolder',
   fileExtension: 'fileExtension',
   taskPrefix: 'taskPrefix',
   importerSettings: {
      preset: 'scss',
   },
})

taskNames ===
   [
      'taskPrefix:fileExtension:auto-imports:sourceFolder',
      'taskPrefix:fileExtension:auto-imports-watcher:sourceFolder',
   ]
```

More details about the `createAutoImportTask` function are documented in the [createAutoImportTask.types.ts](https://github.com/Dan503/gulp-auto-imports/blob/master/createAutoImportTask.types.ts) file.

## Use in _combination_ with [Gulp Sass Glob](https://www.npmjs.com/package/gulp-sass-glob)

If you are using Gulp Auto Imports to load scss files, it works best as a method used for loading your component files since those tend to require a specific order to work correctly.

Most of the time, your config files (files that hold nothing but Sass variables) and helper files (mixins, utility classes etc.) don't need to retain their order. It is both easier and cleaner to use [Gulp Sass Glob](https://www.npmjs.com/package/gulp-sass-glob) to auto-load these types of files than it is to set up individual Gulp Auto Imports tasks for each of them.

```
npm install gulp-sass-glob --save-dev
```

### Gulp 3 combination

```js
// Using Gulp Auto Imports in combination with Gulp Sass Glob in Gulp 3

var gulp = require('gulp')
var autoImports = require('gulp-auto-imports')
var sass = require('gulp-sass')
var sassGlob = require('gulp-sass-glob')

// Gulp Auto Imports task
gulp.task('sass:load', function () {
   var dest = 'source/scss'
   return gulp
      .src('./source/components/**/*.scss')
      .pipe(autoImports({ preset: 'scss', dest: dest }))
      .pipe(gulp.dest(dest))
})

// Sass compile task (depends on 'sass:load' task)
gulp.task('sass', ['sass:load'], function () {
   return gulp
      .src('source/scss/main.scss')
      .pipe(sassGlob()) // Sass Glob
      .pipe(sass())
      .pipe(gulp.dest('build/assets/css'))
})
```

### Gulp 4 combination

```js
// Using Gulp Auto Imports in combination with Gulp Sass Glob in Gulp 4

var gulp = require('gulp')
var autoImports = require('gulp-auto-imports')
var sass = require('gulp-sass')
var sassGlob = require('gulp-sass-glob')

// Gulp Auto Imports task
gulp.task('sass:load', function () {
   var dest = 'source/scss'
   return gulp
      .src('./source/components/**/*.scss')
      .pipe(autoImports({ preset: 'scss', dest: dest }))
      .pipe(gulp.dest(dest))
})

// Sass compile task
gulp.task('sass:compile', function () {
   return gulp
      .src('source/scss/main.scss')
      .pipe(sassGlob()) // Sass Glob
      .pipe(sass())
      .pipe(gulp.dest('build/assets/css'))
})

// Combined sass compile task
gulp.task('sass', gulp.series('sass:load', 'sass:compile'))
```

### Using a combination inside main.scss

```scss
/**********************\
    main.scss file
\**********************/

// Use Gulp Sass Glob to load config and helper files
@import 'vars/**/*.scss';
@import 'mixins/**/*.scss';

// Use the output from Gulp Auto Imports to load component files
@import 'auto-imports.scss';
```

```scss
/***************************\
    auto-imports.scss file
  (automatically generated)
\***************************/

@import '../components/one/one.scss';
@import '../components/two/two.scss';
@import '../components/three/three.scss';
@import '../components/four/four.scss';
```

## All available presets

<dl>
  <dt><a href="https://github.com/Dan503/gulp-auto-imports/blob/master/presets/es6.js">es6</a></dt>
  <dd>Import a set of functions using ES6 <code>import</code> syntax and then call them on page load (<code>import fileName from '../relative/path/fileName.js'</code>; then after DOM load: <code>fileName()</code>).</dd>

  <dt><a href="https://github.com/Dan503/gulp-auto-imports/blob/master/presets/es6_default_exports.js">es6_default_exports</a></dt>
  <dd>Import a bunch of ES6 JavaScript <em>default</em> exports and then export them all from one file (<code>export { default as fileName } from '../relative/path/fileName.js'</code>).</dd>

  <dt><a href="https://github.com/Dan503/gulp-auto-imports/blob/master/presets/es6_named_exports.js">es6_named_exports</a></dt>
  <dd>Import a bunch of ES6 JavaScript <em>named</em> exports and then export them all from one file (<code>export { fileName } from '../relative/path/fileName.js'</code>).</dd>

  <dt><a href="https://github.com/Dan503/gulp-auto-imports/blob/master/presets/es5.js">es5</a></dt>
  <dd>Import a set of functions using <code>require()</code> and then call them on page load (<code>var fileName = require('../relative/path/fileName.js')</code>; then after DOM load: <code>fileName()</code>).</dd>

  <dt><a href="https://github.com/Dan503/gulp-auto-imports/blob/master/presets/es5_default_exports.js">es5_default_exports</a></dt>
  <dd>Import a bunch of CommonJS <em>default</em> exports and then export them all from one file (<code>exports.fileName = require('../relative/path/fileName.js')</code>).</dd>

  <dt><a href="https://github.com/Dan503/gulp-auto-imports/blob/master/presets/es5_named_exports.js">es5_named_exports</a></dt>
  <dd>Import a bunch of CommonJS <em>named</em> exports and then export them all from one file (<code>exports.fileName = require('../relative/path/fileName.js').fileName</code>).</dd>

  <dt><a href="https://github.com/Dan503/gulp-auto-imports/blob/master/presets/ts.js">ts</a></dt>
  <dd>Import a set of functions using TypeScript <code>import</code> syntax and then call them on page load (<code>import fileName from '../relative/path/fileName'</code>; then after DOM load: <code>fileName()</code>).</dd>

  <dt><a href="https://github.com/Dan503/gulp-auto-imports/blob/master/presets/ts_default_exports.js">ts_default_exports</a></dt>
  <dd>Import a bunch of TypeScript <em>default</em> exports and then export them all from one file (<code>export { default as fileName } from '../relative/path/fileName'</code>).</dd>

  <dt><a href="https://github.com/Dan503/gulp-auto-imports/blob/master/presets/ts_named_exports.js">ts_named_exports</a></dt>
  <dd>Import a bunch of TypeScript <em>named</em> exports and then export them all from one file (<code>export { fileName } from '../relative/path/fileName'</code>).</dd>

  <dt><a href="https://github.com/Dan503/gulp-auto-imports/blob/master/presets/pug.js">pug</a></dt>
  <dd>Intended for use with builds that use <a href="https://pugjs.org/api/getting-started.html">Pug</a> as the templating language (<code>include ../relative/path/fileName.pug</code>).</dd>

  <dt><a href="https://github.com/Dan503/gulp-auto-imports/blob/master/presets/jade.js">jade</a></dt>
  <dd>For use on projects that haven't upgraded their old <a href="http://jade-lang.com/">Jade</a> powered projects to <a href="https://pugjs.org/api/getting-started.html">Pug</a> yet (<code>include ../relative/path/fileName.jade</code>).</dd>

  <dt><a href="https://github.com/Dan503/gulp-auto-imports/blob/master/presets/scss.js">scss</a></dt>
  <dd>Sass import statements that use the <a href="https://sass-lang.com/guide">newer SCSS style syntax</a> (<code>@import '../relative/path/fileName.scss';</code>).</dd>

  <dt><a href="https://github.com/Dan503/gulp-auto-imports/blob/master/presets/sass.js">sass</a></dt>
  <dd>Sass import statements that use the <a href="http://sass-lang.com/documentation/file.INDENTED_SYNTAX.html">older indented style syntax</a> (<code>@import ../relative/path/fileName.sass</code>).</dd>

  <dt><a href="https://github.com/Dan503/gulp-auto-imports/blob/master/presets/stylus.js">stylus</a></dt>
  <dd>Intended for use with the <a href="http://stylus-lang.com/">Stylus</a> CSS generation language (<code>@import '../relative/path/fileName.styl'</code>).</dd>
</dl>

You can browse the available presets and see what their settings look like in [the `presets` folder](https://github.com/Dan503/gulp-auto-imports/tree/master/presets). The presets are named after the file names in that folder.

If you would like other presets to be added, you can [log an issue](https://github.com/Dan503/gulp-auto-imports/issues/new) to request for a new preset to be added, or you can make a pull request to add one yourself.

### Overriding a preset

The preset setting just tells Gulp Auto Imports what to use as the default settings.

You can override any of the preset settings by providing your own alternative setting. For example, to change the output file name, you can do this:

```js
// Overriding the default preset setting for "fileName"
.pipe(autoImports({ preset: 'es6', fileName: 'different-file-name.js', dest: 'path/to/dest' }))
```

## JS configuration examples

Adding this functionality to your JS compiler can be tricky since JS compilers generally don't run off typical gulp functionality for performance reasons.

### Rollup

Rollup has a pretty straight forward integration. It is very similar to the Sass set up. It gets around the performance issues by allowing you to cache the last bundle that was generated.

Running `gulp start` will generate the auto imports, compile the JS, and then start watching files for changes.

(Rollup by default does not bundle CommonJS `require()` statements).

#### Rollup in Gulp 4

```js
'use strict';

// Import the auto imports plugin
var autoImports = require('gulp-auto-imports');

var gulp = require('gulp');
var rollup = require('@rollup/stream');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('js:load', function(){
  const dest = './source/js';
  return gulp.src([
    './source/components/**/*.js',
    // exclude files and folders starting with an underscore
    '!./source/components/{**/\_*,**/\_*/**}',
  ])
    // Run the auto imports
    .pipe(autoImports({ preset: 'es6', dest }))
    .pipe(gulp.dest(dest));
})

var cache;
gulp.task('js:compile', function() {
  return rollup({
      // point to the entry file.
      input: './source/js/main.js',

      // use cache for better performance
      cache: cache,

      // Note: these options are placed at the root level in older versions of Rollup
      output: {
        // Output bundle is intended for use in browsers
        // (iife = "Immediately Invoked Function Expression")
        format: 'iife',

        // Show source code when debugging in browser
        sourcemap: true
      }
    })
    .on('bundle', function(bundle) {
      // update cache data after every bundle is created
      cache = bundle;
    })
    // point to the entry file.
    .pipe(source('main.js', './source/js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'));

    .pipe(gulp.dest('./build/assets/js'));
});

gulp.task('js', gulp.series('js:load', 'js:compile'));

gulp.task('js:watch', function(done){
  gulp.watch(['./source/**/*.js'], gulp.series('js'));
  done();
})

gulp.task('start', gulp.series('js', 'js:watch'));
```

#### Rollup in Gulp 3

```js
'use strict'

// Import the auto imports plugin
var autoImports = require('gulp-auto-imports')

var gulp = require('gulp')
var rollup = require('@rollup/stream')
var sourcemaps = require('gulp-sourcemaps')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')

gulp.task('js:load', function () {
   const dest = './source/js'
   return (
      gulp
         .src([
            './source/components/**/*.js',
            // exclude files and folders starting with an underscore
            '!./source/components/{**/_*,**/_*/**}',
         ])
         // Run the auto imports
         .pipe(autoImports({ preset: 'es6', dest }))
         .pipe(gulp.dest(dest))
   )
})

var cache
gulp.task('js', ['js:load'], function () {
   return (
      rollup({
         // point to the entry file.
         input: './source/js/main.js',

         // use cache for better performance
         cache: cache,

         // Note: these options are placed at the root level in older versions of Rollup
         output: {
            // Output bundle is intended for use in browsers
            // (iife = "Immediately Invoked Function Expression")
            format: 'iife',

            // Show source code when debugging in browser
            sourcemap: true,
         },
      })
         .on('bundle', function (bundle) {
            cache = bundle
         })
         // point to the entry file.
         .pipe(source('main.js', './source/js'))
         .pipe(buffer())
         .pipe(sourcemaps.init({ loadMaps: true }))
         .pipe(sourcemaps.write('.'))
         .pipe(gulp.dest('./build/assets/js'))
   )
})

gulp.task('js:watch', function () {
   gulp.watch(['./source/**/*.js'], ['js'])
})

gulp.task('start', ['js', 'js:watch'])
```

### Browserify

Below is a modified version of the of the [Gulp browserify + watchify recipe](https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md) that has Gulp Auto Imports installed.

Browserify gets around performance issues by using a special "Watchify" JS library instead of `gulp.watch()`. You specify an entry file. Watchify watches for any changes to files that are imported from that entry file. It will also watch for changes to files imported from those imported files (and so on and so on forever).

The code below will generate a new `auto-imports.js` file when it detects a JS file has been added to or removed from the components folder. The auto-generated `auto-imports.js` file is imported into the main entry js file meaning Watchify is watching it for changes. When the new `auto-imports.js` file is generated, Watchify detects that the file has changed. This triggers Watchify to initiate a Browserify rebundle.

Most of the code below works in both both Gulp 3 and Gulp 4.

```js
'use strict'

// Import the auto imports plugin
var autoImports = require('gulp-auto-imports')

var watchify = require('watchify')
var browserify = require('browserify')
var gulp = require('gulp')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var log = require('gulplog')
var sourcemaps = require('gulp-sourcemaps')

var customOpts = {
   // entry file defined here
   entries: ['./source/js/main.js'],
   debug: true,
}
var opts = Object.assign({}, watchify.args, customOpts)

// Watch for changes then bundle
var b = watchify(browserify(opts))

b.on('update', bundle) // on any dep update, runs the bundler
b.on('log', log.info) // output build logs to terminal

function bundle() {
   // Then bundle the code
   return b
      .bundle()
      .on('error', log.error.bind(log, 'Browserify Error'))
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build/assets/js'))
}

// File loader Gulp task
gulp.task('js:load', function () {
   const dest = './source/js'
   return (
      gulp
         .src([
            './source/components/**/*.js',
            // exclude files and folders starting with an underscore
            '!./source/components/{**/_*,**/_*/**}',
         ])
         // Run the auto imports
         .pipe(autoImports({ preset: 'es5', dest }))
         .pipe(gulp.dest(dest))
   )
})

///////////////////////////
// Gulp 3 specific code //
/////////////////////////
gulp.task('js', ['js:load'], bundle) // so you can run `gulp js` to build the file
gulp.task('watch', function () {
   // Gulp 3 can't distinguish between 'add','unlink', and 'change' events
   // so it also has to run on file changes
   gulp.watch('./source/components/**/*.js', ['js:load'])
})

///////////////////////////
// Gulp 4 specific code //
/////////////////////////
gulp.task('js', gulp.series('js:load', bundle)) // so you can run `gulp js` to build the file
gulp.task('watch', function (done) {
   var watcher = gulp.watch('./source/components/**/*.js')
   //Gulp 4 has the advantage of only running when a file is added/removed, not changed
   watcher.on('add', gulp.series('js:load'))
   watcher.on('unlink', gulp.series('js:load'))
   done()
})
```

### Making use of the generated JS file

Now that Gulp is set up to build a auto-imports JS file for you, import your generated file from main.js and call it as a function.

```js
// Import auto-imports.js inside main.js
import autoImports from './auto-imports.js' // ES6
var autoImports = require('./auto-imports.js') // ES5

document.addEventListener('DOMContentLoaded', function () {
   // Run the auto-imports code on page load
   autoImports()
})
```

Note that a typical component js file will need to export a function by default for this configuration to work.

```js
// component js file example

/////////
// ES6 //
/////////
export default function on_page_load() {
   // Place code here that you wish to run
   // when the `autoImports()` function is called
}

/////////
// ES5 //
/////////
module.exports = function on_page_load() {
   // Place code here that you wish to run
   // when the `autoImports()` function is called
}
```

## How to do custom configurations

Now that you know how to use presets, lets replicate some of these presets manually to show you how to use the plugin if the files you wish to load are not available as a preset.

### Manual SCSS set up

I'll use SCSS as an example first because it is both simple and popular.

Create a gulp task that looks like this:

```js
// Typical SCSS gulp-auto-imports task

var gulp = require('gulp')
var autoImports = require('gulp-auto-imports')

gulp.task('sass:load', function () {
   // Always relative to gulpfile.js even if this code is inside a folder
   var dest = 'source/scss'

   // Do not leave off the "return", it is vital!
   return gulp
      .src([
         // These paths are always relative to gulpfile.js
         './source/components/**/*.scss',
         // Ignore files & folders that start with underscores
         '!./source/{**/_*,**/_*/**}',
      ])
      .pipe(
         autoImports({
            // "$path" is replaced with a relative file path
            format: '@import "$path";',
            // destination folder (must match gulp.dest)
            dest: dest,
            // name of the output file
            fileName: 'auto-imports.scss',
            // Don't change the order that imports are currently in
            retainOrder: true,
            // Add a message to the top of the file
            header: '// output from gulp-auto-imports',
         })
      )
      .pipe(gulp.dest(dest))
})
```

The output of this Gulp task will look something like this:

```scss
// output from gulp-auto-imports
@import '../components/A/A.scss';
@import '../components/B/B.scss';
@import '../components/C/C.scss';
@import '../components/D/D.scss';
```

### Manual JS set up

JS is slightly more complicated.

```js
// Typical JS gulp-auto-imports task

var gulp = require('gulp')
var autoImports = require('gulp-auto-imports')

// Use an ES6 template literal for defining the template
// Node has supported them natively ever since v4.0.0
var template = `
$format[imports]

export default function(){
$format[functions]
}
`

gulp.task('js:load', function () {
   var dest = 'source/js'

   return gulp
      .src([
         './source/components/**/*.js',
         // Ignore files & folders that start with underscores
         '!./source/{**/_*,**/_*/**}',
      ])
      .pipe(
         autoImports({
            // Format is now split into an object holding named format strings
            format: {
               // "$name" is replaced with the name of the file
               // "$path" is replaced with a relative path to the file
               imports: 'import $name from "$path";',
               // The indent is added here, not in the template
               functions: '  $name();',
            },
            dest: dest,
            fileName: 'auto-imports.js',
            template: template,
         })
      )
      .pipe(gulp.dest(dest))
})
```

The output from this task will look something like this:

```js
// Generated auto-imports.js file

import one from '../components/one/one.js'
import two from '../components/two/two.js'
import three from '../components/three/three.js'
import four from '../components/four/four.js'

export default function () {
   one()
   two()
   three()
   four()
}
```

## Understanding the `format` and `template` settings

It is recommended that you use an ES6 Template Literal (the back tick style strings) for creating the template rather than regular strings. Template Literals will allow you to define the markup found inside the output file exactly as written in a single string. Regular strings don't accept new lines so it makes writing the template much more difficult.

Remember that Template Literal's count all white space literally, so any white space you add to the template will appear in the final output. To avoid an odd looking output file, save the template to a `template` variable outside of the gulp task so that there is no indentation to the side of it.

The template works by replacing each `$format[formatName]` statement with a full list of imports formated in the specified way provided in the `format` object.

If the `format` setting is provided as a string, the `template` setting is ignored. If `format` is provided as an object, the `template` setting is required.

### The `$name` placeholder

The `$name` placeholder in the `format` setting is replaced with the file name of the file. Any non-alphabetic and non-numeric characters are converted to underscores to prevent possible syntax errors.

```
./folder/path/gulp-auto-imports-is-awesome!123.js

 === converts to the $name ===

gulp_auto_imports_is_awesome_123
```

If there are duplicate file names, a number is added to the end of the name based on how many duplicates it has found to ensure that each name is unique.

```
./folder/one/thing.js
./folder/two/thing.js

 === converts to the $name ===

thing
thing_1
```

The `$name` placeholder is excellent for use cases where you need to assign an import path to a variable name.

You can use the `$name` placeholder as much as you like. That includes having the `$name` placeholder appear multiple times in a single format rule. The `$name` will always refer to the same import path.

### The `$fileName` placeholder

The `$fileName` placeholder in the `format` setting holds the file name (excluding the extension) exactly as it is written.

```
// Assuming the full path is "./path/to/file-name.ext"
$fileName = file-name
```

### The `$ext` placeholder

The `$ext` placeholder in the `format` setting holds the file extension.

```
// Assuming the full path is "./path/to/file-name.ext"
$ext = ext
```

Note that you can get the full file name (including extension) by using this pattern in your `format` setting:

```
// Assuming the full path is "./path/to/file-name.ext"
$fileName.$ext = file-name.ext
```

### The `$path` placeholder

The `$path` placeholder in the `format` setting is replaced with a relative path that goes from the auto-imports output file to the file that is being loaded in.

```
$path = ./path/to/file-name.ext
```

**Note 1:** only one out of `$path`, `$noExtPath`, and `$dir` can be declared in a single format rule and it can only be declared once.

**Note 2:** The `retainOrder: true` setting only works with unaltered `$path` placeholders.

### The `$noExtPath` placeholder

The `$noExtPath` placeholder in the `format` setting is exactly the same as `$path` except it will not add the file extension to the end.

```
$noExtPath = ./path/to/file-name
```

**Note 1:** only one out of `$path`, `$noExtPath`, and `$dir` can be declared in a single format rule and it can only be declared once.

**Note 2:** The `retainOrder: true` setting is not compatible with the `$noExtPath` placeholder.

### The `$dir` placeholder

The `$dir` placeholder in the `format` setting stands for "directory" and is essentially the same as `$path` except it does not include the file name or the extension.

```
// Assuming the full path is "./path/to/file-name.ext"
$dir = ./path/to
```

**Note 1:** only one out of `$path`, `$noExtPath`, and `$dir` can be declared in a single format rule and it can only be declared once.

**Note 2:** The `retainOrder: true` setting is not compatible with the `$dir` placeholder.

### Using indents

If you want indenting, the **indenting should be added through the `format` setting** _not_ the `template` setting. If you indent the template, only the first item in the list will be indented. The rest will press hard up against the edge of the page.

For example, if you use this as your template:

```js
// How NOT to indent your template

var template = `
$format[imports]

export default function(){
    // Notice the indent here
    $format[functions]
}
`
```

You will end up with a JS file that looks like this:

```js
// The result of incorrect indentation

import one from '../components/one/one.js'
import two from '../components/two/two.js'
import three from '../components/three/three.js'
import four from '../components/four/four.js'

export default function () {
   // Notice the indent here
   one()
   two()
   three()
   four()
}
```

Instead, apply indentation through the `format` setting:

```js
//How to apply correct indentation

var template = `
$format[imports]

export default function(){
    // Notice the indent here
$format[functions]
}
`;

// ... other Gulp code ...

.pipe(autoImports({
  format: {
    imports: 'import $name from "$path";',
    // The indent is added here, not in the template
    functions: '    $name();'
  },
  dest: dest,
  fileName: 'auto-imports.js',
  template: template
}))
```

That will produce the desired output:

```js
// The result of correct indenting

import one from '../components/one/one.js'
import two from '../components/two/two.js'
import three from '../components/three/three.js'
import four from '../components/four/four.js'

export default function () {
   // Notice the indent here
   one()
   two()
   three()
   four()
}
```

## The `retainOrder` setting

I briefly touched on the `retainOrder` setting earlier, however there is a bit more to know about it.

In CSS, the order that styles are written in matters significantly. It is important that you are able to alter the order that files are loaded in if you wish to have full control over your CSS specificity.

Other globing methods (eg. `@import "../path/to/components/**/*.scss";`) do not give you the ability to alter the order that the files are loaded in. You are generally restricted to loading files in alphabetical order. Gulp Auto Imports gives you back the ability to control the order that your CSS loads in with it's `retainOrder` setting (introduced in v2.0.0).

By default `retainOrder` is set to `false`. When `retainOrder` is set to `true`, Gulp Auto Imports will not alter the order of the existing `$path` placeholder import paths if you manually edit them yourself. Make sure that if you enable the `retainOrder` setting you **save the output file into source control**. This will ensure that your co-workers don't end up with a CSS file that is in a different order to yours.

Gulp Auto Imports will still delete old files from the list that don't exist any more.

If it detects that a new file is added to the system, Gulp Auto Imports will aim to keep that new file grouped with other files found in the same folder. (Prior to v2.1.0 it just dumped it at the bottom of the file). This means that new scss config file imports will be placed at the top of the auto-imports file with the other config files. This gives all your component files access to the new config settings without you having to make any alterations to the imports file.

It will not retain any comments or other alterations to the file. It will only retain the order that the imports were announced in.

**Note:** The `retainOrder: true` setting only works if you use an unaltered `$path` placeholder. `$noExtPath`, and `$dir` are not supported.

## Settings reference guide

The settings documentation can now be found in the [index.d.ts file](https://github.com/Dan503/gulp-auto-imports/blob/master/index.d.ts).

## Change Log

The Change log can be viewed on the [Gulp Auto Imports GitHub releases](https://github.com/Dan503/gulp-auto-imports/releases) page.
