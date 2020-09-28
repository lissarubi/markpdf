if (document.body.innerHTML[1] == "h" && document.body.innerHTML[2] == "1") {
  document.body.style.marginTop = "-10010px";
}

const imgs = document.getElementsByTagName("img");

// get all img and put a http://localhost:3003 in the start of img.src value
for (i = 0; i < imgs.length; i++) {
  imgs[i].src = `http://localhost:3003/${imgs[i].getAttribute("src")}`;
}

console.log(document);
