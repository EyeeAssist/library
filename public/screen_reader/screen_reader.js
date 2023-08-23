export class ScreenReader {
    constructor(active_screen_reader = false) {
        this.active_screen_reader = active_screen_reader;
        this.synth = window.speechSynthesis;
        this.talk = (text, cancel = true) => {
            cancel ? this.synth.cancel() : " ";
            this.synth.speak(new SpeechSynthesisUtterance(text));
        };
        if (active_screen_reader) {
            this.sayWelcome();
        }
    }
    sayWelcome() {
        this.talk("Hola bienvenido a la pagina X, si desea leer las acciones de la pagina presione control y enter");
    }
}
