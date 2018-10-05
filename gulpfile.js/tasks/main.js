var gulp = require('gulp');

// General build
gulp.task('default', ['general']);

// Build without launch
gulp.task('general', ['images', 'js', 'css', 'browser-sync']);

gulp.task('stage', ['general', 'dist'], function(){
    gulp.start('deploy::staging');
});