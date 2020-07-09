const path = require('path');
const fs = require('fs');
const themesCSS = [];
const themesNames = [];
//joining path of directory
const directoryPath = path.join(__dirname, 'themes');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  //listing all files using forEach
  files.forEach(function (file) {
    themesCSS.push(fs.readFileSync(`${__dirname}/themes/${file}`, 'utf-8'));
    themesNames.push(file.replace('.css', ''));
  });
});
