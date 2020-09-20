#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const markdown = require('markdown-it')({ html: true });
const files = process.argv.splice(2);
const mergePdf = require('./mergePdf');

// this static server will serve all static files (like images) of the current directory to MarkPDF
const express = require('express');
const app = express();
app.use(express.static(process.cwd()));
const server = app.listen(3003);

// get the Markdown file and transform to HTML
try {
  var markdownFile = fs.readFileSync(files[0], 'utf-8');
  var markdownHTML = markdown.render(markdownFile);
} catch (err) {
  console.log("the input file doesn't exist.");
  server.close();
}

// inject will transform all img.src of page, putting a http://localhost:3003 in the start of src value
const inject = fs.readFileSync(`${__dirname}/inject.js`, 'utf-8');
// transform markdown to PDF
try {
  pagePDF(`${markdownHTML}<script>${inject}</script>`);
} catch (err) {
  console.log(`Something was wrong, please report, error: ${err}`);
}

function pagePDF(html) {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle2' });

    // define the default CSS (if personalizated CSS doesn't exist, the default will be used)
    const defaultCSS = fs.readFileSync(
      `${__dirname}/themes/default.css`,
      'utf-8',
    );

    // add Bootstrap CSS
    const bootstrapCSS = fs.readFileSync(
      `${__dirname}/bootstrap/bootstrap.min.css`,
      'utf8',
    );
    await page.addStyleTag({ content: bootstrapCSS });

    // add Bootstrap JS
    const bootstrapScript = fs.readFileSync(
      `${__dirname}/bootstrap/bootstrap.min.js`,
      'utf8',
    );
    await page.addScriptTag({ content: bootstrapScript });

    // Test and apply (if exist) the config file exist, if not, the default configs will be applied

    // themes is all themes code and themes names, this will be used later
    const themes = getThemes();

    var selectedTheme = false;
    var format = 'A4';
    var landscape = false;
    var path = files[0].replace('.md', '.pdf');
    var number = false;

    try {
      const markpdfCFG = JSON.parse(fs.readFileSync('mpdf.json', 'utf-8'));

      // test if mpdf theme exist, if not, will be applied the default theme.
      if (
        markpdfCFG.theme !== undefined &&
        markpdfCFG.theme !== '' &&
        argv.t === undefined
      ) {
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
      if (markpdfCFG.format !== undefined && markpdfCFG.format !== '') {
        var format = markpdfCFG.format;
      }

      // text if mpdf landscape exist
      if (markpdfCFG.landscape !== undefined && markpdfCFG.landscape !== '') {
        var landscape = markpdfCFG.landscape;
      }

      // path of the output file
      if (markpdfCFG.path !== undefined && markpdfCFG.path !== '') {
        var path = markpdfCFG.path;
      }

      // number of pages
      if (markpdfCFG.number !== undefined && markpdfCFG.number !== '') {
        var number = markpdfCFG.number;
      }
    } catch (err) {}

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

    await page.emulateMedia('screen');

    // check if personalizated format exist
    if (argv.format !== undefined) {
      var format = argv.format;
    } else if (argv.f !== undefined) {
      var format = argv.f;
    } else if (format === false) {
      var format = 'A4';
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
          headerTemplate: '<div/>',
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
      const markpdfCFG = JSON.parse(fs.readFileSync('mpdf.json', 'utf-8'));
      if (markpdfCFG.before != undefined && markpdfCFG.after != undefined) {
        mergePdf(path, markpdfCFG.before, markpdfCFG.after);
      } else if (markpdfCFG.before != undefined) {
        mergePdf(path, markpdfCFG.before, '');
      } else if (markpdfCFG.after != undefined) {
        mergePdf(path, '', markpdfCFG.after);
      }
    } catch (err) {}

    // Get before or after arguments
    if (argv.before != undefined && argv.after != undefined) {
      mergePdf(path, argv.before, argv.after);
    } else if (argv.before != undefined) {
      mergePdf(path, argv.before, '');
    } else if (argv.after != undefined) {
      mergePdf(path, '', argv.after);
    }

    await browser.close();
    server.close();
  })();
}

function getThemes() {
  const themesCSS = [];
  const themesNames = [];
  //passsing directory of themes and callback function
  fs.readdirSync(`${__dirname}/themes`).forEach((file) => {
    //listing all files using forEach
    themesCSS.push(fs.readFileSync(`${__dirname}/themes/${file}`, 'utf-8'));
    themesNames.push(file.replace('.css', ''));
  });
  const themes = {
    css: themesCSS,
    names: themesNames,
  };
  return themes;
}
