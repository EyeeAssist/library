export class ScreenReader {
    constructor(useScreenReader = false) {
        this.useScreenReader = useScreenReader;
        this.synth = window.speechSynthesis;
        this.screenReaderStatus = false;
        this.selectedArticle = null;
        this.articleIndex = -1;
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
