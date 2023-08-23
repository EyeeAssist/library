import { Filter } from './filter/filter.js'
import { ScreenReader } from './screen_reader/screen_reader.js'
import { Zoom } from './zoom/zoom.js'


const ZoomObject: Zoom = new Zoom(true)
const FilterObject: Filter = new Filter(true)
const ScreenReaderObject: ScreenReader = new ScreenReader(true)

document.addEventListener("keydown", (event) => {
  console.log(event.key)
  ZoomObject.activeZoom(false, event)
})
