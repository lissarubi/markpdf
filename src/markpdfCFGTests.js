const fs = require("fs");
const argv = require("minimist")(process.argv.slice(2));
const getThemes = require("./getThemes");

const themes = getThemes();

async function markpdfCFGTest(page) {
  try {
    const markpdfCFG = JSON.parse(fs.readFileSync("mpdf.json", "utf-8"));

    // test if mpdf theme exist, if not, will be applied the default theme.
    if (markpdfCFG.theme !== "" && argv.t === undefined) {
      if (themes.names.indexOf(markpdfCFG.theme) > -1) {
        // set the style based on theme name
        await page.addStyleTag({
          path: `${__dirname}/themes/${
            themes.names[themes.names.indexOf(markpdfCFG.theme)]
          }.css`,
        });
      } else {
        await page.addStyleTag({ path: markpdfCFG.theme });
      }
    } else {
      await page.addStyleTag({ content: defaultCSS });
    }
    // test if mpdf format exist
    if (markpdfCFG.format !== "") {
      var format = markpdfCFG.format;
    }

    // text if mpdf landscape exist
    if (markpdfCFG.landscape !== "") {
      var landscape = markpdfCFG.landscape;
    }

    // path of the output file
    if (markpdfCFG.path !== "") {
      var path = markpdfCFG.path;
    }

    // number of pages
    if (markpdfCFG.number !== "") {
      var number = markpdfCFG.number;
    }
  } catch (err) {}
}

module.exports = markpdfCFGTest;
