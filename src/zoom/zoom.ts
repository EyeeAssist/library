import { CssClasses } from "./styles/css-zoom-classes"
import { ZoomService, OptionsZoom } from "./zoom-module/zoom_service"

export class Zoom {
  private zoomStatus: boolean = false
  private active_message: string = `<div id="zoom-status" class="zoom-message-txtbox">On</div>`;
  private deactive_message: string = `<div id="zoom-status" class="zoom-message-txtbox">Off</div>`;
  private zoomService: ZoomService 
  
  constructor(
    private enableZoomOptions: boolean = false
  ) {
      this.zoomService = new ZoomService()
  }
  public status() {
    return this.enableZoomOptions
  }
  public toogleStatus() {
    this.enableZoomOptions = !this.enableZoomOptions
  }

  public activeZoom(screenReaderActive: boolean, event : KeyboardEvent) {
    if(!this.enableZoomOptions) {
      return
    }
    if(!screenReaderActive && event.ctrlKey === true && event.key.toLowerCase() === "backspace") {
      CssClasses.addZoomMessageTextBoxClass()
      this.initialClickEvent(document.body)
    }
  }

  private initialClickEvent (body: HTMLElement) {
    if(!this.zoomStatus) {
      this.showBoxMessage(body, this.active_message, !this.zoomStatus)
    } else {
      this.showBoxMessage(body, this.deactive_message, !this.zoomStatus)
    }
    this.zoomStatus = !this.zoomStatus
  }

  private showBoxMessage(body : HTMLElement, message: string, status: boolean) {
      body.insertAdjacentHTML("beforebegin", message)
      setTimeout(() => {
        const zoom_message = document.getElementById("zoom-status")
        zoom_message?.remove()
      }, 2000);
      status? body.addEventListener('click', this.toogleZoom): body.removeEventListener("click", this.toogleZoom)
  }

  toogleZoom = (event: MouseEvent) => {
    this.zoomService.to(new OptionsZoom( event.x, event.y, 10))
  }
}
