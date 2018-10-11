var exports = module.exports = {};

exports.getDetails = function(server, config){

    // Make sure we have all details

    if ( typeof config[server].basicAuth.user != "undefined" &&
         config[server].basicAuth.user.length != 0 ||
         typeof config[server].basicAuth.pass != "undefined" &&
         config[server].basicAuth.pass.length != 0 ) {

         return {
             user: config[server].basicAuth.user,
             pass: config[server].basicAuth.pass
         };

    }

    console.log('Missing wp-migrate details for:' + server);
    return false;

};


exports.makeURL = function(details, url){

    if( url ){

        // If we have basic auth - update url
        if( typeof details.user != "undefined" &&
            details.user.length != 0 ||
            typeof details.pass != "undefined" &&
            details.pass.length != 0 ){

            // Make basic auth url
            url = url.replace(
                /^([a-zA-Z][a-zA-Z0-9\.\+\-]*):\/\//,
                "$1://" + details.user + ':' + details.pass + '@'
            );

        }

        return url;

    }

    return false;

};
