import { Filter } from './filter/filter.js';
import { Zoom } from './zoom/zoom.js';
const ZoomObject = new Zoom(true);
const FilterObject = new Filter(true);
document.addEventListener("keydown", (event) => {
    console.log(event.key);
    ZoomObject.activeZoom(false, event);
});
