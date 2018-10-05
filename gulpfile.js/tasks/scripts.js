var gulp                    = require('gulp');

var lineec                  = require('gulp-line-ending-corrector'); // Consistent Line Endings for non UNIX systems. Gulp Plugin for Line Ending Corrector (A utility that makes sure your files have consistent line endings)

var filter                  = require('gulp-filter');

var rename                  = require('gulp-rename');

var concat                  = require('gulp-concat'); // Concatenates JS files
var uglify                  = require('gulp-uglify'); // Minifies JS files

var pump                    = require('pump');

var projectName             = require('../../gulpconfig').projectName;
var base                    = require('../../gulpconfig').base;
var src                     = require('../../gulpconfig').src;
var paths                   = require('../../gulpconfig').paths;


// Concat js files for build
gulp.task( 'js', ['js:collate'], function() {
    gulp.start('js:minify');
});


gulp.task( 'js:collate', function() {
    return gulp.src([
        base + paths.js.vendor,
        base + paths.js.custom
    ])
    .pipe( concat( paths.js.name + '.js' ) )
    .pipe( lineec() ) // Consistent Line Endings for non UNIX systems.
    .pipe( gulp.dest( base + paths.js.folder ) )
});


gulp.task('js:minify', function (cb) {
    pump([
        gulp.src( base + paths.js.folder + '/' + paths.js.name + '.js' ),
        //uglify( { mangle: { keep_fnames:true }, compress: { collapse_vars: false, keep_fnames:true } } ),
        uglify( { mangle: false } ),
        lineec(),
        rename( { suffix: '.min' } ),
        gulp.dest( base + paths.js.folder )
    ],cb );
});
