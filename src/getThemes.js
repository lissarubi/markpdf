const fs = require("fs");

function getThemes() {
  const themesCSS = [];
  const themesNames = [];
  //passsing directory of themes and callback function
  fs.readdirSync(`${__dirname}/themes`).forEach((file) => {
    //listing all files using forEach
    themesCSS.push(fs.readFileSync(`${__dirname}/themes/${file}`, "utf-8"));
    themesNames.push(file.replace(".css", ""));
  });
  const themes = {
    css: themesCSS,
    names: themesNames,
  };
  return themes;
}

module.exports = getThemes;
