const puppeteer = require("puppeteer");
const fs = require("fs");
const getThemes = require("./getThemes");
const mergePdf = require("./mergePdf");

themes = getThemes();

function pagePDF(html, files, argv) {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle2" });

    // define the default CSS (if personalizated CSS doesn't exist, the default will be used)
    const defaultCSS = fs.readFileSync(
      `${__dirname}/themes/default.css`,
      "utf-8"
    );

    // add Bootstrap CSS
    const bootstrapCSS = fs.readFileSync(
      `${__dirname}/bootstrap/bootstrap.min.css`,
      "utf8"
    );
    await page.addStyleTag({ content: bootstrapCSS });

    // Test and apply (if exist) the config file exist, if not, the default configs will be applied

    var selectedTheme = false;
    var format = "A4";
    var landscape = false;
    var path = files[0].replace(".md", ".pdf");
    var number = false;
    var appendedCSS = Array();

    try {
      const markpdfCFG = JSON.parse(fs.readFileSync("mpdf.json", "utf-8"));

      // test if mpdf theme exist, if not, will be applied the default theme.
      if (
        markpdfCFG.theme !== undefined &&
        markpdfCFG.theme !== "" &&
        argv.t === undefined
      ) {
        if (themes.names.indexOf(markpdfCFG.theme) > -1) {
          // get all default themes of Markpdf
          const themes = getThemes();
          // set the style based on theme name or use the user selected theme
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
      if (markpdfCFG.format !== undefined && markpdfCFG.format !== "") {
        var format = markpdfCFG.format;
      }

      // text if mpdf landscape exist
      if (markpdfCFG.landscape !== undefined && markpdfCFG.landscape !== "") {
        var landscape = markpdfCFG.landscape;
      }

      // path of the output file
      if (markpdfCFG.path !== undefined && markpdfCFG.path !== "") {
        var path = markpdfCFG.path;
      }

      // number of pages
      if (markpdfCFG.number !== undefined && markpdfCFG.number !== "") {
        var number = markpdfCFG.number;
      }

      // Appended CSS
      if (markpdfCFG.css !== undefined && markpdfCFG.css !== "") {
        var appendedCSS = markpdfCFG.css.split(",");
      }
    } catch (err) {}

    // check if personalizated theme exist
    if (argv.theme !== undefined) {
      if (themes.names.indexOf(argv.theme) > -1) {
        // set the style based on theme name or use the user selected theme
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
    if (argv.landscape !== undefined) {
      var landscape = true;
    } else if (argv.l !== undefined) {
      var landscape = true;
    }

    // check if path exist
    if (argv.path !== undefined) {
      var path = argv.path;
    } else if (argv.p !== undefined) {
      var path = argv.p;
    }

    // check if number exist
    if (argv.number !== undefined) {
      var number = true;
    } else if (argv.n !== undefined) {
      var number = true;
    }

    // check if appendedCSS exists
    if (argv.css !== undefined) {
      var appendedCSS = argv.css.split(",");
    } else if (argv.c !== undefined) {
      var appendedCSS = argv.c.split(",");
    }

    // Append CSS files
    appendedCSS.forEach((file) => {
      page.addStyleTag({ path: file });
    });

    try {
      // print page

      // if the page number option is true, the number page will be applied
      if (number) {
        await page.pdf({
          path: path,
          format: format,
          landscape: landscape,
          printBackground: true,
          displayHeaderFooter: true,
          headerTemplate: "<div/>",
          footerTemplate:
            '<div style="text-align: right;width: 90vw;font-size: 12px;"><span style="margin-right: 1cm"><span class="pageNumber"></span></span></div>',
          margin: { top: 40, bottom: 40 },
        });
      }

      // if the page number option is false, the number page not will be applied
      else {
        await page.pdf({
          path: path,
          format: format,
          landscape: landscape,
          printBackground: true,
        });
      }
    } catch (err) {
      console.log(`There was an error on printing the pdf, error: ${err}`);
    }

    // Get before or after arguments in Mpdf
    try {
      const markpdfCFG = JSON.parse(fs.readFileSync("mpdf.json", "utf-8"));
      if (markpdfCFG.before != undefined && markpdfCFG.after != undefined) {
        mergePdf(path, markpdfCFG.before, markpdfCFG.after);
      } else if (markpdfCFG.before != undefined) {
        mergePdf(path, markpdfCFG.before, "");
      } else if (markpdfCFG.after != undefined) {
        mergePdf(path, "", markpdfCFG.after);
      }
    } catch (err) {}

    // Get before or after arguments
    if (argv.before != undefined && argv.after != undefined) {
      mergePdf(path, argv.before, argv.after);
    } else if (argv.before != undefined) {
      mergePdf(path, argv.before, "");
    } else if (argv.after != undefined) {
      mergePdf(path, "", argv.after);
    }

    await browser.close();
  })();
}

module.exports = pagePDF;
