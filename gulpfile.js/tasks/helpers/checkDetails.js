var colors              = require('colors');

var exports = module.exports = {};

exports.ssl = function(obj){

    var result = new Array();

    for (let key of Object.keys(obj)) {
        if( !obj[key] ){
            result.push(key);
        }
    }

    // If array is empty
    if ( result === undefined || result.length == 0){
        return true;
    }

    // Staging server details do not exist
    console.log('Add staging server details for:'.bgWhite.black);
    console.log(" " + result.join("\n "))

    return false;

}



exports.git = function(package){

    // Check there is a url in the package.json
    if ( package.repository.url === undefined ){

        console.log('Add repository URL:'.bgWhite.black);
        return false;

    }

    return true;

}
