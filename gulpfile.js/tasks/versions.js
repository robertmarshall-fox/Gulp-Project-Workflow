var gulp         = require('gulp');

var fs           = require('fs');

var bump         = require('gulp-bump');
var args         = require('yargs').argv;

var base         = require('../../gulpconfig').base;

gulp.task('incrementProject', function () {
    var type = args.type;
    var version = args.version;

    var options = {};
    if (version) {
        options.version = version;
    }

    return gulp
        .src(['./package.json'])
        .pipe( bump(options) )
        .pipe( gulp.dest( base ) );
});


// Build project stylesheet
gulp.task( 'wp:buildStyle', function () {

    var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    var repository = pkg.repository.url;

    //Check if we are using github, or bitbucket
    if ( repository ) {
        repository = ( repository.includes('github') ? 'Github Theme URI: ' + repository : 'Bitbucket Theme URI: ' + repository );
    }

    var themeDetails = ['/*',
        'Theme Name: ' + pkg.name,
        'Theme URI: '+ pkg.homepage,
        'Description: '+ pkg.description,
        'Text Domain: ' + pkg.name.replace(/\s+/g, '-').toLowerCase(),
        'Author: '+ pkg.author,
        'Author URI: '+ pkg.authorUri,
        'Version: '+ pkg.version,
        'Tags: '+ pkg.keywords,
        'License: '+ pkg.license,
        'License URI: '+ pkg.licenseUri,
        repository,
        '*/',
        ''].join('\n');

    //Create file
    fs.writeFile( base + '/style.css', themeDetails, 'utf-8', function (err) {
        (err) ? console.log('Error: stylesheet not created!') : console.log('Stylesheet created!');
    });

});


gulp.task('bump', ['incrementProject'], function (){
    gulp.start('wp:buildStyle');
});
