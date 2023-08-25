import { CssClasses } from "./styles/css-zoom-classes.js";
import { ZoomService, OptionsZoom } from "./zoom-module/zoom_service.js";
export class Zoom {
    constructor(enableZoomOptions = false) {
        this.enableZoomOptions = enableZoomOptions;
        this.zoomStatus = false;
        this.active_message = `<div id="zoom-status" class="zoom-message-txtbox">On</div>`;
        this.deactive_message = `<div id="zoom-status" class="zoom-message-txtbox">Off</div>`;
        this.toogleZoom = (event) => {
            this.zoomService.to(new OptionsZoom(event.x, event.y, 10));
        };
        this.zoomService = new ZoomService();
    }
    activeZoom(screenReaderActive, event) {
        if (!this.enableZoomOptions) {
            return;
        }
        if (!screenReaderActive && event.ctrlKey === true && event.key.toLowerCase() === "backspace") {
            CssClasses.addZoomMessageTextBoxClass();
            this.initialClickEvent(document.body);
        }
    }
    initialClickEvent(body) {
        if (!this.zoomStatus) {
            this.showBoxMessage(body, this.active_message, !this.zoomStatus);
        }
        else {
            this.showBoxMessage(body, this.deactive_message, !this.zoomStatus);
        }
        this.zoomStatus = !this.zoomStatus;
    }
    showBoxMessage(body, message, status) {
        body.insertAdjacentHTML("beforebegin", message);
        setTimeout(() => {
            const zoom_message = document.getElementById("zoom-status");
            zoom_message === null || zoom_message === void 0 ? void 0 : zoom_message.remove();
        }, 2000);
        status ? body.addEventListener('click', this.toogleZoom) : body.removeEventListener("click", this.toogleZoom);
    }
}
