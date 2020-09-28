const argv = require("minimist")(process.argv.slice(2));

const getThemes = require("./getThemes");

themes = getThemes();
selectedTheme = false;

async function argvTests(page, argv, defaultCSS) {
  // check if personalizated theme exist
  if (argv.theme !== undefined) {
    if (themes.names.indexOf(argv.theme) > -1) {
      // set the style based on theme name
      await page.addStyleTag({
        path: `${__dirname}/themes/${
          themes.names[themes.names.indexOf(argv.theme)]
        }.css`,
      });
    } else {
      await page.addStyleTag({ path: argv.theme });
    }
  } else if (argv.t !== undefined) {
    if (themes.names.indexOf(argv.t) > -1) {
      // set the style based on theme name
      await page.addStyleTag({
        path: `${__dirname}/themes/${
          themes.names[themes.names.indexOf(argv.t)]
        }.css`,
      });
    } else {
      await page.addStyleTag({ path: argv.t });
    }
  } else if (selectedTheme === false) {
    await page.addStyleTag({ content: defaultCSS });
  }

  await page.emulateMedia("screen");

  // check if personalizated format exist
  if (argv.format !== undefined) {
    var format = argv.format;
  } else if (argv.f !== undefined) {
    var format = argv.f;
  } else if (format === false) {
    var format = "A4";
  }

  // check if landscape (horizontal) is true or false
  if (argv.landscape !== undefined || argv.l !== undefined) {
    var landscape = true;
  }

  // check if path exist
  if (argv.path !== undefined) {
    var path = argv.path;
  } else if (argv.p !== undefined) {
    var path = argv.p;
  }

  // check if number exist
  if (argv.number !== undefined || argv.n !== undefined) {
    var number = true;
  }
}

module.exports = argvTests;
