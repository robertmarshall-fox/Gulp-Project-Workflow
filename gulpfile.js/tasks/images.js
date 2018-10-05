var gulp                    = require('gulp');

var imagemin                = require('gulp-imagemin'); // Minify PNG, JPEG, GIF and SVG images with imagemin.

var filter                  = require('gulp-filter'); // Enables work on a subset of the original files by filtering them using globbing.
var changed                 = require('gulp-changed');

var tinypng                 = require('gulp-tinypng-compress');

var projectName             = require('../../gulpconfig').projectName;
var base                    = require('../../gulpconfig').base;
var paths                   = require('../../gulpconfig').paths;


gulp.task( 'images', function() {         
    return gulp.src( base + paths.img.all )          
        .pipe( changed( base + paths.img.dest ) )
        .pipe( gulp.dest( base + paths.img.dest ) );
});


// Dist
gulp.task( 'images:dist', function() {
    return gulp.src( base + paths.img.dest )
        .pipe( filter( [
            '**/*.jpg',
            '**/*.png',
            '!raw/',
        ]) )
		.pipe( tinypng( {
			key: 'BrFeQ-AoBPyv0zOljXUVJ35kfTGQY2T7',
			sigFile: base + paths.img.dest + '.tinypng-sigs',
            summarize: true,
			log: true,
		} ) )
        .pipe( gulp.dest( base + paths.img.dest ) );
});