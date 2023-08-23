export class ScreenReader {
  private synth = window.speechSynthesis;
  constructor(
    private active_screen_reader: boolean = false
  ) {
    if (active_screen_reader) {
      this.sayWelcome()
    }
  }
  talk = (text: string, cancel = true) => {
    cancel ? this.synth.cancel() : " ";
    this.synth.speak(new SpeechSynthesisUtterance(text));
  }

  public sayWelcome() {
    this.talk(
      "Hola bienvenido a la pagina X, si desea leer las acciones de la pagina presione control y enter"
    );
  }
}
