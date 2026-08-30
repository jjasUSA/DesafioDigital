window.onload = function () {
    const iframe = document.createElement('iframe');
    iframe.title = "Shark Cage";
    iframe.allowFullscreen = true;
    iframe.setAttribute("mozallowfullscreen", "true");
    iframe.setAttribute("webkitallowfullscreen", "true");
    iframe.allow = "autoplay; fullscreen; xr-spatial-tracking";
    iframe.setAttribute("xr-spatial-tracking", "");
    iframe.setAttribute("execution-while-out-of-viewport", "");
    iframe.setAttribute("execution-while-not-rendered", "");
    iframe.setAttribute("web-share", "");
    iframe.src = "https://sketchfab.com/models/e7a6f2b64dc74befbdfb821fda76115a/embed";

    const container = document.getElementById('visor-container');
    container.appendChild(iframe);
};
