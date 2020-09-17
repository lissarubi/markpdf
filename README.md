# MarkPDF

MarkPDF is a program what transform a Markdown file to a PDF

> Warning: Images must be inside the current directory, like assets/image.png, please, dont use external image links, download and put inside the current directory.

[Github](https://github.com/edersonferreira/markpdf)

[npmjs](https://www.npmjs.com/package/markpdf)

- [Install](#install)
- [Exemple](#example)
- [Usage](#usage)
- [Using Themes](#using-themes)
- [specificalling PDF size (like A4, A5,etc)](#specificalling-pdf-size)
- [Using landscape (horizontal)](#using-landscape-horizontal)
- [Using with Bootstrap](#using-with-bootstrap)
- [Switching Path](#switching-path)
- [Page Number](#page-number)
- [Add PDF's Before or After](#add-pdfs-before-or-after)
- [Mpdf (MarkPDF config file)](#mpdf-markpdf-config-file)
- [Adding personalizated style with inline CSS in your file](#adding-personalizated-style-with-inline-css-in-your-file)
- [Themes](#themes)
- [Creating Themes](#creating-themes)
- [List of Themes](#list-of-themes)

## Install

Install Node with your packeage manager like `sudo apt install nodejs`

To install MarkPDF use:

`npm install -g markpdf`

## Exemple

To see this README in a PDF by MarkPDF [click here](https://github.com/edersonferreira/markpdf/blob/master/examples/README.pdf)

# Usage

To use MarkPDF in a fast way, type `markpdf` and your Markdown file, simple.

`markpdf myExemple.md`

## Using Themes

To use a personalizated theme, append your theme file name with the `-t` or `--theme` argument, like:

`markpdf myExemple.md -t myTheme.css`

or

`markpdf myExemple.md --theme myTheme.css`

If you want to use a theme in MarkPDF themes list, you can only write the theme name, like:

`markpdf myExemple.md -t dark`

See the theme list in the bottom of this README.

An example of theme applied to MarkPDF is [this README in a dark theme](https://github.com/edersonferreira/markpdf/blob/master/examples/dark.pdf)

## specificalling PDF size

If you want to define a specifically format, like A3, A2,etc (the default is A4), put it in the arguments with `-f` or `--format`, like:

`markpdf myExemple.md -f A5`

or

`markpdf myExemple.md --format A5`

An example of paper format applied to MarkPDF is [this README in A5 paper format](https://github.com/edersonferreira/markpdf/blob/master/examples/a5.pdf)

## Using landscape (horizontal)

If you want to use landscape format (like in slides) you can do it passing `-l` or `--landscape`, like

`markpdf myExemple.md -l`

or

`markpdf myExemple.md --landscape`

An example of Landscape format applied to MarkPDF is [this README in Landscape Format](https://github.com/edersonferreira/markpdf/blob/master/examples/landscape.pdf)

## Using with Bootstrap

MarkPDF accepts any Bootstrap class, like `w-100`, or `pr-5`. You can use divs, h1, h2,etc. in for file with Bootstrap, because MarkPDF will understand it.

## Switching Path

If you want to switch the output file directory and the pathname (name of the file), use `--path` or `-p` like:

`markpdf myExemple.md -p MyDir/MyPdf.pdf`

or

`markpdf myExemple.md --path MyDir/MyPdf.pdf`

## Page Number

If you want to put a page number in the footer of all pages, use `--number` or `-n`, like:

`markpdf myExemple.md -n`

or

`markpdf myExemple.md --number`

An example of Page Number applied to MarkPDF is [this README with Page Number](https://github.com/edersonferreira/markpdf/blob/master/examples/number.pdf)

## Add PDF's Before or After

If you want to add a PDF's (not Markdown) before or after your PDF (Your markdown what you will transform to PDF), you can do it with `--before` and `--after` arguments, like:

`markpdf myExemple.md --before beforePdf.pdf`

and you can pass multiple PDF's

`markpdf myExemple.md --after afterPdf.pdf,anotherAfterPdf.pdf`

## Mpdf (MarkPDF config file)

If you have a project, what uses a certain format, theme and/or landscape, you can define a file called `mpdf.json` in the main tree of your project, the `mpdf.json` content have to be like:

```json
{
  "theme": "myTheme.css",
  "format": "A4",
  "landscape": true,
  "path": "pdf/myPdf.pdf",
  "number": true,
  "before": "beforePdf.pdf",
  "after": "afterPdf.pdf"
}
```

And now, if you use `markpdf myExample.md` and the `mdpdf.json` exist, this configs will be applied automaticly to your file. You don't have to pass an argument, like, if you forget the `theme` argument in `mpdf.json`, the default theme will be applied.

## Adding personalizated style with inline CSS in your file

If you need to apply a CSS change, and you don't want to create a theme to do this, you can define this using a div, with your style, like this:

```html
<div style="color:red">
Now, my text is Red!
<div>
```

You can use this to build any style with CSS, using displays, background, color, margin, or anything.

## Themes

The default theme is white, with the h1 centralizated, justified texts,etc. See source code in `themes` directory, or the links in the footer.

## Creating Themes

If you want to create your theme, create a CSS file with a body class, defining the font-family, background color, color of text,etc. a Table style, styles for h1, h2, h3, etc. And a style for the `<code></code>` tag. Create themes for MarkPDF is very simple and fast, click in a theme file in section "List of Themes" to see the CSS code.

## List of Themes

[Default Theme](https://github.com/edersonferreira/markpdf/blob/master/src/themes/default.css)

[Dark Theme](https://github.com/edersonferreira/markpdf/blob/master/src/themes/dark.css)

[Brazilian ABNT Theme](https://github.com/edersonferreira/markpdf/blob/master/src/themes/abnt.css)

[Programmer Theme](https://github.com/edersonferreira/markpdf/blob/master/src/themes/programmer.css)
