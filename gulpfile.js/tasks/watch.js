var gulp         = require('gulp');

var browserSync  = require('browser-sync').create();
var reload       = browserSync.reload;

var base         = require('../../gulpconfig').base;
var paths        = require('../../gulpconfig').paths;

var config       = require('../../gulpconfig').browsersync;

// Keep everything synced in the browser
gulp.task( 'browser-sync', function() {
    browserSync.init( config );
    gulp.start('watch');
});

gulp.task( 'watch', function() {
    gulp.watch( base + paths.php.watch, reload ); // Reload on PHP file changes.
    gulp.watch( base + paths.css.watch, [ 'css:stream' ] ); // Reload on SCSS file changes.
    gulp.watch( base + paths.js.vendor, [ 'js:collate', reload ] ); // Reload on vendor JS file changes.
    gulp.watch( base + paths.js.custom, [ 'js:collate', reload ] ); // Reload on custom JS file changes.
    gulp.watch( base + paths.img.allImgs, [ 'image', reload ] );
});

gulp.task('css:stream',['css:collate'], function() {
	return gulp.src( base + paths.css.all )
		.pipe( browserSync.stream( {'match': '**/*.css'} ) );
});
