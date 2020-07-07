// This file will be used by index.js, in a minified javascript, this file is only a beautified version

const imgs = document.getElementsByTagName('img');

// get all img and put a http://localhost:3003 in the start of img.src value
for (i = 0; i < imgs.length; i++) {
  console.log(imgs[i]);
  imgs[i].src = `http://localhost:3003/${imgs[i].getAttribute('src')}`;
}
