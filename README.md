# MarkPDF

MarkPDF is a program what transform a Markdown file to a PDF

> Warning: Images must be inside the current directory, like assets/image.png, please, dont use external image links, download and put inside the current directory.

[Github](https://github.com/edersonferreira/markpdf)

[npmjs](https://www.npmjs.com/package/markpdf)

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

An example of theme applied to MarkPDF is [this README in a dark theme](https://github.com/edersonferreira/markpdf/blob/master/examples/dark.pdf)

## specificalling PDF size (like A4, A5,etc)

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

## Mpdf (MarkPDF config file)

If you have a project, what uses a certain format, theme and/or landscape, you can define a file called `mpdf.json` in the main tree of your project, the `mpdf.json` content have to be like:

```js
{
  "theme": "myTheme.css",
  "format": "A4",
  "landscape": true
}
```

And now, if you use `markpdf myExample.md` and the `mdpdf.json` exist, this configs will be applied automaticly to your file. You don't have to pass the theme and format arguments.

## Themes

The default theme is white, with the h1 centralizated, justified texts,etc. See source code in `themes` directory, or the links in the footer.

## Creating Themes

If you want to create your theme, create a CSS file with a body class, defining the font-family, background color, color of text,etc. a Table style, styles for h1, h2, h3, etc. And a style for the `<code></code>` tag. Create themes for MarkPDF is very simple and fast, click in a theme file in section "List of Themes" to see the CSS code.

## List of Themes

[Default Theme]([themes/default.css](https://github.com/edersonferreira/markpdf/blob/master/themes/default.css))

[Dark Theme](https://github.com/edersonferreira/markpdf/blob/master/themes/dark.css)

[Brazilian ABNT Theme](https://github.com/edersonferreira/markpdf/blob/master/themes/abnt.css)