#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));

const fs = require('fs');
const puppeteer = require('puppeteer');
const markdown = require('markdown-it')();
const files = process.argv.splice(2);

// this static server will serve all static files (like images) of the current directory to MarkPDF
const express = require('express');
const app = express();
app.use(express.static( process.cwd() ));
const server = app.listen(3003);

// get the Markdown file and transform to HTML
try {
  var markdownFile = fs.readFileSync(files[0], 'utf-8');
  var markdownHTML = markdown.render(markdownFile);
} catch (err) {
  console.log("the input file doesn't exist.");
}

// inject will transform all img.src of page, putting a http://localhost:3003 in the start of src value
const inject =
  'const imgs=document.getElementsByTagName("img");for(i=0;i<imgs.length;i++)console.log(imgs[i]),imgs[i].src=`http://localhost:3003/${imgs[i].getAttribute("src")}`;';

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
    const defaultCSS =
      'body{font-family:Arial,Helvetica,sans-serif;margin-top:-10010px}img{display:block;margin-left:auto;margin-right:auto;max-width:100%;max-height:100%}h1{margin-top:10010px;text-align:center}p{text-align:justify}table{border-collapse:collapse;margin-left:auto;margin-right:auto}table,td,th{border:1px solid #000;padding:10px}pre{background-color:#282a36;color:#f8f8f2;display:block;border-radius:5px;padding:5px}code{background-color:#282a36;color:#f8f8f2;border-radius:5px}a{text-decoration:none}';

    // Test and apply (if exist) the config file exist, if not, the default configs will be applied
    var theme = false;
    var format = false;
    var landscape = false;
    try {
      const markpdfCFG = JSON.parse(fs.readFileSync('mpdf.json', 'utf-8'));

      // test if mpdf theme exist
      if (
        markpdfCFG.theme !== undefined &&
        markpdfCFG.theme !== '' &&
        argv.t === undefined
      ) {
        theme = true;
        await page.addStyleTag({ path: markpdfCFG.theme });
      }

      // test if mpdf format exist
      if (markpdfCFG.format !== undefined && markpdfCFG.format !== '') {
        var format = markpdfCFG.format;
      }

      // text if mpdf landscape exist
      if (markpdfCFG.landscape !== undefined && markpdfCFG.landscape !== '') {
        var landscape = markpdfCFG.landscape;
      }
    } catch (err) {}

    // check if personalizated theme exist
    if (argv.theme !== undefined) {
      await page.addStyleTag({ path: argv.theme });
    } else if (argv.t !== undefined) {
      await page.addStyleTag({ path: argv.t });
    } else if (theme === false) {
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

    pdfFile = files[0].replace('.md', '.pdf');

    // print page
    await page.pdf({
      path: pdfFile,
      format: format,
      landscape: landscape,
      printBackground: true,
    });
    await browser.close();
    await server.close();
  })();
}
