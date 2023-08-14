import { Filter } from './filter/filter'
import { Zoom } from './zoom/zoom'


const ZoomObject: Zoom = new Zoom(true)
const FilterObject: Filter = new Filter(true)

document.addEventListener("keydown", (event) => {
  console.log(event.key)
  ZoomObject.activeZoom(false, event)
})
