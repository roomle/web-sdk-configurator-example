const fs = require('fs-extra');
const path = require('path');
fs.copySync(path.join(__dirname, 'node_modules', 'roomle-web-sdk', 'lib', 'static'), path.join(__dirname, 'dist', 'roomle', 'static'));