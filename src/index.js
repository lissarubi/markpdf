#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));

const fs = require('fs');
const puppeteer = require('puppeteer');
var markdown = require('markdown-it')();

const files = process.argv.splice(2);

fs.readFile(files[0], 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }
  const markdownFile = data;
  const markdownHTML = markdown.render(markdownFile);

  // transform markdown to PDF

  try{ 
    pagePDF(markdownHTML);
  }catch(err){
    console.log(`Something was wrong, please report, error: ${err}`)
  }
});

function pagePDF(html) {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);

    // define the default CSS (if personalizated CSS doesn't exist, the default will be used)
	  const defaultCSS = "body{font-family:Arial, Helvetica, sans-serif;margin-top:-10010px;}h1{margin-top:10010px;text-align:center;}p{text-align:justify;}table{border-collapse:collapse;margin-left:auto;margin-right:auto;}table,th,td{border:1px solid black;padding:10px;}pre{background-color:#282a36;color:#f8f8f2;display:block;border-radius:5px;padding:5px;}code{background-color:#282a36;color:#f8f8f2;border-radius:5px;}a{text-decoration:none;}"


    // check if personalizated theme exist
    if (argv.theme != undefined){
      await page.addStyleTag({ path: argv.theme });
    }
    if (argv.t != undefined){
      await page.addStyleTag({ path: argv.t });
    }
    else{ 
      await page.addStyleTag({ content: defaultCSS })
    }

    await page.emulateMedia('screen');


    // check if personalizated format exist
    if (argv.format != undefined){
      var format = argv.format
    }
    else if ( argv.f != undefined ){
      var format = argv.f
    }
    else {
      var format = 'A4'
    }


    // check if landscape (horizontal) is true or false
    if (argv.landscape != undefined){
      var landscape = true
    }
    else if ( argv.l != undefined ){
      var landscape = true
    }
    else {
      var landscape = false
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
  })();
}
