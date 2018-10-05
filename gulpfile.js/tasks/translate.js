var gulp                    = require('gulp');
var fs                      = require('fs'); //Use for general file system stuff

var wpPot                   = require('gulp-wp-pot'); // For generating the .pot file.
var sort                    = require('gulp-sort'); // Recommended to prevent unnecessary changes in pot-file.

var paths                   = require('../../gulpconfig').paths;

// Parse values from package.json
var getPackageJSON = function() {
    return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};

gulp.task( 'translate', function () {
     return gulp.src( paths.php.watch )
         .pipe(sort())
         .pipe(wpPot( {
             domain        : getPackageJSON().name,
             destFile      : translation.file,
             package       : translation.launchpad,
             bugReport     : translation.bugReport,
             lastTranslator: translation.lastTranslator,
             team          : translation.team
         } ))
        .pipe(gulp.dest( translation.dest ))
 });