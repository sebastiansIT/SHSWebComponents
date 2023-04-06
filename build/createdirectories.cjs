var fs = require('fs');
var dir = './select-image/dist';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}