var gulp       = require('gulp');
var zip        = require('gulp-zip');

var filter     = require('gulp-filter');

var base       = require('../../gulpconfig').base;

var projectName = require('../../gulpconfig').projectName;

gulp.task( 'zip', () =>

    gulp.src([

        //Exclude
        '!.ignore',
        '!node_modules',
        '!node_modules/**',
        '!gulpconfig.js',
        '!gulpfile.js',
        '!gulpfile.js/**',
        '!**/img/raw',
        '!**/img/raw/**',

        //include
        base + '**/**',


    ])
    .pipe( zip( projectName + '.zip' ) )
    .pipe( gulp.dest( '../' ) )

);
