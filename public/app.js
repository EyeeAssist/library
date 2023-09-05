import { Filter } from './filter/filter';
import { ScreenReader } from './screen_reader/screen_reader';
import { Zoom } from './zoom/zoom';
const ZoomObject = new Zoom(true);
const FilterObject = new Filter(true);
const ScreenReaderObject = new ScreenReader(true);
document.addEventListener("keydown", (event) => {
    console.log(event.key);
    ZoomObject.activeZoom(ScreenReaderObject.status(), event);
    ScreenReaderObject.keybindsScreenReader(event);
});
