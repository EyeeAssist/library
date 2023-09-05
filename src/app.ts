import { Filter } from './filter/filter'
import { ScreenReader } from './screen_reader/screen_reader'
import { Zoom } from './zoom/zoom'


const ZoomObject: Zoom = new Zoom(true)
const FilterObject: Filter = new Filter(true)
const ScreenReaderObject: ScreenReader = new ScreenReader(true, 'akljnv13bvi2vfo0b0bw')

document.addEventListener("keydown", (event) => {
  console.log(event.key)
  ZoomObject.activeZoom(ScreenReaderObject.status(), event)
  ScreenReaderObject.keybindsScreenReader(event)
})
