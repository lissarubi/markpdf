# MarkPDF

MarkPDF is a program what transform a Markdown file to a PDF

> Warning: Images can't be loaded in MarkPDF because Puppeteer.

## Install

Install Node with your packeage manager like `sudo apt install nodejs`

To install MarkPDF use:

`npm install -g markpdf`

## Exemple

To see this README in a PDF by MarkPDF [click here](README.pdf)

## Usage

To use MarkPDF in a fast way, type `markpdf` and your Markdown file, simple.

`markpdf myExemple.md`


## Using Themes

To use a personalizated theme, append your theme file name with the `-f` or `--format` argument, like:

`markpdf myExemple.md -t myTheme.css`

or

`markpdf myExemple.md --theme myTheme.css`

## specificalling PDF size (like A4, A5,etc)

If you want to define a specifically format, like A3, A2,etc (the default is A4), put it in the arguments with `-f` or `--format`, like:

`markpdf myExemple.md -f A5 `

or

`markpdf myExemple.md --format A5 `

## Themes

The default theme is white, with the h1 centralizated, justified texts,etc. here is the source code:

```css
body {
  font-family: Arial, Helvetica, sans-serif;
}
h1 {
  text-align: center;
}
p {
  text-align: justify;
}
table {
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
}

table,
th,
td {
  border: 1px solid black;
  padding: 10px;
}
pre {
  background-color: #282a36;
  color: #f8f8f2;
  display: block;
  border-radius: 5px;
  padding: 5px;
}
code {
  background-color: #282a36;
  color: #f8f8f2;
  border-radius: 5px;
}
a {
  text-decoration: none;
}
```

If you want, you can create a dark theme, changing the colors, for exemple.

```css
body {
  font-family: Arial, Helvetica, sans-serif;
  background-color: #121212;
  color: white;
}
h1 {
  text-align: center;
}
p {
  text-align: justify;
}
table {
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
}

table,
th,
td {
  border: 1px solid black;
  padding: 10px;
}
pre {
  background-color: #282a36;
  color: #f8f8f2;
  display: block;
  border-radius: 5px;
  padding: 5px;
}
code {
  background-color: #282a36;
  color: #f8f8f2;
  border-radius: 5px;
}
a {
  color: cyan;
  text-decoration: none;
}
```

if you want to use this theme, create a css file with this theme code, and run with `markpdf`, like:

`markpdf myText.md darktheme.css`

## Creating Themes

If you want to create your theme, create a CSS file with a body class, defining the font-family, background color, color of text,etc. a Table style, styles for h1, h2, h3, etc. And a style for the `<code></code>` tag. Create themes for MarkPDF is very simple and fast.

## List of Themes

[Default Theme](themes/default.css)

[Dark Theme](themes/dark.css)
