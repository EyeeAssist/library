import { Filter } from './filter/filter.js'
import { Zoom } from './zoom/zoom.js'


const ZoomObject: Zoom = new Zoom(true)
const FilterObject: Filter = new Filter(true)

document.addEventListener("keydown", (event) => {
  console.log(event.key)
  ZoomObject.activeZoom(false, event)
})
