window.location.hash="#wrapper"

if (window.location.href.indexOf("big") != -1) {
    img = document.getElementsByTagName("img")[0];
    window.location.href=img.src;
}

if (window.location.pathname == "/bookmark_add.php") {
    window.close();
}