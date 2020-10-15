#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));

const fs = require('fs');
const puppeteer = require('puppeteer');
const markdown = require('markdown-it')({ html: true });
const files = process.argv.splice(2);
const pagePDF = require('./pagePDF')

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
  pagePDF(`${markdownHTML}<script>${inject}</script>`, files, argv);
  server.close();
} catch (err) {
  console.log(`Something was wrong, please report, error: ${err}`);
}
