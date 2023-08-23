import { Filter } from './filter/filter.js';
import { ScreenReader } from './screen_reader/screen_reader.js';
import { Zoom } from './zoom/zoom.js';
const ZoomObject = new Zoom(true);
const FilterObject = new Filter(true);
const ScreenReaderObject = new ScreenReader(true);
document.addEventListener("keydown", (event) => {
    console.log(event.key);
    ZoomObject.activeZoom(false, event);
});
