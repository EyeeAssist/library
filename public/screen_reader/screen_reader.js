export class ScreenReader {
    constructor(useScreenReader = false) {
        this.useScreenReader = useScreenReader;
        this.synth = window.speechSynthesis;
        this.screenReaderStatus = false;
        this.selectedArticle = null;
        this.selectedLink = null;
        this.articleIndex = -1;
        this.linkIndex = 0;
        this.talk = (text, cancel = true) => {
            cancel ? this.synth.cancel() : " ";
            this.synth.speak(new SpeechSynthesisUtterance(text));
        };
        if (!this.useScreenReader) {
            return;
        }
    }
    status() {
        return this.screenReaderStatus;
    }
    sayWelcome() {
        this.talk("Hola bienvenido a la pagina X, si desea leer las acciones de la pagina presione control y enter");
    }
    sayGoodbay() {
        this.talk("Gracias por utilizar eyeeassist");
    }
    keybindsScreenReader(event) {
        this.cancelReader(event);
        this.reRead(event);
        this.activeScreenReader(event);
        this.moveBetweenContent(event);
        this.moveBetweenLinks(event);
    }
    moveBetweenContent(event) {
        let tags = document.getElementsByTagName("article");
        if (tags.length == 0) {
            return;
        }
        if (this.screenReaderStatus &&
            event.ctrlKey === true &&
            event.key.toLowerCase() === "arrowright") {
            this.articleIndex += 1;
            this.selectedArticle = tags[this.articleIndex];
            if (this.selectedArticle.textContent != null) {
                this.selectedArticle.focus();
                this.talk(this.selectedArticle.textContent);
            }
            if (this.articleIndex === tags.length - 1) {
                this.articleIndex = 0;
            }
        }
        if (this.screenReaderStatus &&
            event.ctrlKey === true &&
            event.key.toLowerCase() === "arrowleft") {
            if (this.articleIndex === -1) {
                this.articleIndex += 1;
            }
            else {
                if (this.articleIndex == 0) {
                    this.articleIndex = tags.length - 1;
                }
                else {
                    this.articleIndex -= 1;
                }
            }
            this.selectedArticle = tags[this.articleIndex];
            if (this.selectedArticle.textContent != null) {
                this.selectedArticle.focus();
                this.talk(this.selectedArticle.textContent);
            }
        }
    }
    activeScreenReader(event) {
        if (event.ctrlKey === true && event.key.toLowerCase() === " ") {
            if (!this.screenReaderStatus) {
                this.sayWelcome();
            }
            else {
                this.sayGoodbay();
            }
            this.screenReaderStatus = !this.screenReaderStatus;
        }
    }
    moveBetweenLinks(event) {
        if (this.screenReaderStatus &&
            event.ctrlKey === false &&
            event.key.toLowerCase() === "enter" &&
            this.selectedLink != null) {
            console.log(this.selectedLink);
            this.selectedLink.click();
        }
        if (this.screenReaderStatus &&
            event.ctrlKey === true &&
            event.key.toLowerCase() === "enter") {
            let links = document.getElementsByClassName("text_reader_link");
            console.log(links[this.linkIndex].tagName);
            this.selectedLink = links[this.linkIndex];
            this.selectedLink.focus();
            if (links[this.linkIndex].tagName == "TEXTAREA") {
                this.selectedLink.addEventListener("input", () => {
                    console.log(this.selectedLink);
                });
                this.talk("Seleccionado un text area", true);
            }
            else {
                if (this.selectedLink.textContent !== null) {
                    this.talk(this.selectedLink.textContent, true);
                }
            }
            if (this.linkIndex === links.length - 1) {
                this.linkIndex = 0;
            }
            else {
                this.linkIndex += 1;
            }
        }
    }
    cancelReader(event) {
        if (event.key.toLowerCase() === "escape") {
            this.talk("");
        }
    }
    reRead(event) {
        if (event.ctrlKey === true && event.key.toLowerCase() === "backspace") {
            if (this.selectedArticle != null) {
                if (this.selectedArticle.textContent != null) {
                    this.talk(this.selectedArticle.textContent);
                }
            }
        }
    }
}
