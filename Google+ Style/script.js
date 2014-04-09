// This function increases the natural resolution of images on Google+ so that they won't lose quality when resized in css.
function big() {
    // Increase post avatar resolutions
    var avatars = document.getElementsByClassName('Uk wi hE');
    for(i=0; i<avatars.length; i++) {
        avatars[i].src = avatars[i].src.replace(/s46/, "s80");
    }
    // Increase comment avatar resolutions
    var commentavatars = document.getElementsByClassName('go wi Wh');
    for (i=0; i<commentavatars.length; i++) {
        commentavatars[i].src = commentavatars[i].src.replace(/s28-/, "s48-");
    }
    // Increase posted image resolutions
    var postimages = document.getElementsByClassName('ar Mc');
    for(i=0; i<postimages.length; i++) {
        if (postimages[i].className == "ar Mc bc kf") { // Video
            // have to specify height. 16:9
            postimages[i].src = postimages[i].src.replace(/w[0-9]+-h[0-9]+/, "w686-h386");
        }
        else if (postimages[i].className == "ar Mc RE") { // multi img
            postimages[i].src = postimages[i].src.replace(/s337/, "s456"); //3pic larger
            postimages[i].src = postimages[i].src.replace(/s168/, "s228"); //3pic smaller
            postimages[i].src = postimages[i].src.replace(/s379/, "s513"); //4pic larger
            postimages[i].src = postimages[i].src.replace(/(s126)|(w126-h125)/, "s171"); //4pic smaller
        } else if (postimages[i].parentNode.className == "sp ej XU") {
            //soundcloud previews
        } else if (postimages[i].className == "ar Mc Nt") { //small preview
            //do nothing
        } else { // Normal image post
            //2pic no longer has class YD, so needs to be handled here
            postimages[i].src = postimages[i].src.replace(/s253/, "s343");
            postimages[i].src = postimages[i].src.replace(/w25[2-4]-h25[2-4]/, "s343");
            //1pic square image
            postimages[i].src = postimages[i].src.replace(/s506/, "s686");
            //1pic non-square
            postimages[i].src = postimages[i].src.replace(/w[0-9]+-h[0-9]+(-p)?/, "w686");
        }
    }
    // Increase container size for single image posts & link previews
    var imagecontainers = document.getElementsByClassName('sp ej xI');
    for (i=0; i<imagecontainers.length; i++) {
        var image = imagecontainers[i].firstElementChild.firstElementChild;
        var height = image.naturalHeight;
        if (height > 0) {
            //sometimes returns 0, but not the first time, so just ignore it
            imagecontainers[i].style.height = "" + height + "px";
        }
    }
    
}

window.addEventListener('load', big, false);
document.getElementById('contentPane').addEventListener('DOMNodeInserted', big, false);


// This next part will animate avatars if they're animated gifs

// Change any of these to false to disable animation for their respective cases.
var animate48px = true; // normal posts
var animate46px = true; // profile floating banner
var animate44px = true; // community members and moderators list
var animate32px = true; // comments and reshares
var animate24px = true; // post activity / "who +1'd this comment"
// Note that currently avatars in the chat sidebar, the notification drop-down
// and on sites other than plus.google.com (e.g. Blogger) will not animate 
// because iframes suck.

var sizes = [];
if (animate48px) { sizes.push("48"); }
if (animate46px) { sizes.push("46"); }
if (animate44px) { sizes.push("44"); }
if (animate32px) { sizes.push("32"); }
if (animate24px) { sizes.push("24"); }

sizes.push("80"); // embiggened post avatars

var pattern = "googleusercontent\.com(.*)s(" + sizes.join('|') + ")-c-k";
var regex = new RegExp(pattern);

function animate() {
    var images = document.getElementsByTagName('img');
    for(i=0; i<images.length; i++) {
        if (images[i].src.match(regex) != null) {
            // the test keeps animations from restarting on each call
            images[i].src = images[i].src.replace(/s([0-9]+)-c-k/, "s$1-c");
        }
    }
}

window.addEventListener('load', animate, false);
document.getElementById('contentPane').addEventListener('DOMNodeInserted', animate, false);
