#!/usr/bin/env node

const argv = require("minimist")(process.argv.slice(2));

const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const markdown = require("markdown-it")({ html: true });
const files = process.argv.splice(2);
const mergePdf = require("./mergePdf");

const getThemes = require("./getThemes");
const markpdfCFGTest = require("./markpdfCFGTests");
const argvTests = require("./argvTests");

// this static server will serve all static files (like images) of the current directory to MarkPDF
const express = require("express");
const app = express();
app.use(express.static(process.cwd()));
const server = app.listen(3003);

// get the Markdown file and transform to HTML
try {
  var markdownFile = fs.readFileSync(files[0], "utf-8");
  var markdownHTML = markdown.render(markdownFile);
} catch (err) {
  console.log("the input file doesn't exist.");
  server.close();
}

// inject will transform all img.src of page, putting a http://localhost:3003 in the start of src value
const inject = fs.readFileSync(`${__dirname}/inject.js`, "utf-8");
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
    await page.setContent(html, { waitUntil: "networkidle2" });

    // define the default CSS (if personalizated CSS doesn't exist, the default will be used)
    const defaultCSS = fs.readFileSync(
      `${__dirname}/themes/default.css`,
      "utf-8"
    );

    // Test and apply (if exist) the config file exist, if not, the default configs will be applied

    // themes is all themes code and themes names, this will be used later

    var selectedTheme = false;
    var format = "A4";
    var landscape = false;
    var path = files[0].replace(".md", ".pdf");
    var number = false;

    markpdfCFGTest(page, defaultCSS);
    argvTests(page, argv, defaultCSS);

    // add Bootstrap CSS
    const bootstrapCSS = fs.readFileSync(
      `${__dirname}/bootstrap/bootstrap.min.css`,
      "utf8"
    );
    await page.addStyleTag({ content: bootstrapCSS });

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
    server.close();
  })();
}
