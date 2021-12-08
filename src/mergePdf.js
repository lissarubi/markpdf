const PDFDocument = require("pdf-lib").PDFDocument;
const argv = require("minimist")(process.argv.slice(2));
const fs = require("fs");
const colors = require("colors");

async function mergePdf(path, before = "", after = "") {
  let fileNames = Array();
  // set the first input file to be the middle of PDF
  fileNames.push(path);

  // get the PDF's before
  if (before != "") {
    const beforeArray = before.split(",").reverse();

    for (i = 0; i < beforeArray.length; i++) {
      fileNames.unshift(beforeArray[i].replace(/\s+/g, ""));
    }
  }

  // get the PDF's after
  if (after != "") {
    const afterArray = after.split(",");

    for (i = 0; i < afterArray.length; i++) {
      fileNames.push(afterArray[i].replace(/\s+/g, ""));
    }
  }
  const files = Array();
  // create PDF based in the input PDF's
  for (i = 0; i < fileNames.length; i++) {
    let currentFile = fileNames[i].replace(/\s+/g, "");
    files.push(fs.readFileSync(currentFile));
  }
  const mergedPdf = await PDFDocument.create();
  for (const pdfBytes of files) {
    const pdf = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => {
      mergedPdf.addPage(page);
    });
  }

  const buf = await mergedPdf.save(); // Uint8Array

  fs.open(path, "w", function (err, fd) {
    fs.write(fd, buf, 0, buf.length, null, function (err) {
      fs.close(fd, function () {});
    });
  });
}

module.exports = mergePdf;
