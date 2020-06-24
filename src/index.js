#!/usr/bin/env node

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
  pagePDF(markdownHTML);
});

function pagePDF(html) {
  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html);

    files[1] == undefined ? (files[1] = 'themes/default.css') : null;

    await page.addStyleTag({ path: files[1] });
    await page.emulateMedia('screen');

    pdfFile = files[0].replace('.md', '.pdf');

    await page.pdf({
      path: pdfFile,
      format: 'A4',
      printBackground: true,
    });

    await browser.close();
  })();
}
