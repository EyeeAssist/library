import { CssClasses } from "./styles/css-classes.js"

export class Zoom {
  private zoomStatus: boolean = false
  private active_message: string = `<div id="zoom-status" class="zoom-message-txtbox">On</div>`;
  private deactive_message: string = `<div id="zoom-status" class="zoom-message-txtbox">Off</div>`;
 
  constructor(
    private enableZoomOptions: boolean = false
  ) {}

  public activeZoom(screenReaderActive: boolean, event : KeyboardEvent) {
    if(!this.enableZoomOptions) {
      return
    }
    CssClasses.addZoomMessageTextBoxClass()
    if(!screenReaderActive && event.ctrlKey === true && event.key.toLowerCase() === "backspace") {
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
      status? body.addEventListener("click", this.toogleZoom): body.removeEventListener("click", this.toogleZoom)
  }

  private toogleZoom() {
    console.log("Zoom in")
  }
}
