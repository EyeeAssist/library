import { Zoom } from './zoom/zoom.js';
const ZoomObject = new Zoom(true);
document.addEventListener("keydown", (event) => {
    console.log(event.key);
    ZoomObject.activeZoom(false, event);
});
