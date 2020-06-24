# markpdf

MarkPDF is a program what transform a Markdown file to a PDF

![logo](assets/logo.png)

> Warning: Images can't be loaded in MarkPDF because Puppeteer.

## Install

To install MarkPDF use:

``npm install markpf``

## Usage

To use MarkPDF in a fast way, type ``markpdf`` and your Markdown file, simple.

``markpdf myExemple.md``

To use a personalizated theme, append your theme file name.

``markpdf myExemple.md myTheme.css``

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
a{
    color: cyan;
}
```

if you want to use this theme, create a css file with this theme code, and run with ``markpdf``

``markpdf myText.md darktheme.css``