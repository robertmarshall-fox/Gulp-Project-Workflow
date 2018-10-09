var gulp         = require('gulp'); // Gulp of-course
var fs           = require('fs');

const computerName = 'RobMarshall';

module.exports = {
    themeFolder: '',
    local: {
        computerName: computerName,
    },
    staging: {
        wpMigrateSecretKey: '',
        sslConfig: {
            host: 'fh1.fox.agency',
            port: 22,
            passphrase: 'HB6aWUNe6w4&',
            username: 'workflow',
            privateKey: fs.readFileSync('/Users/' + computerName + '/.ssh/id_rsa')
        }
    },
    live: {
        wpMigrateSecretKey: '',
        sslConfig: {
            host: '',
            port: 22,
            username: '',
            privateKey: fs.readFileSync('/Users/' + computerName + '/.ssh/id_rsa')
        }
    }
};
