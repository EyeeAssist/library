export class ScreenReader {
  private synth = window.speechSynthesis;
  private screenReaderStatus: boolean = false
  private selectedArticle: HTMLElement | null = null
  private articleIndex = -1
  constructor(
    private useScreenReader: boolean = false,
  ) {
    if (!this.useScreenReader) {
      return;
    }
  }

  public status(){
    return this.screenReaderStatus
  }

  talk = (text: string, cancel = true) => {
    cancel ? this.synth.cancel() : " ";
    this.synth.speak(new SpeechSynthesisUtterance(text));
  }

  private sayWelcome() {
    this.talk(
      "Hola bienvenido a la pagina X, si desea leer las acciones de la pagina presione control y enter"
    );
  }
  private sayGoodbay() {
    this.talk(
      "Gracias por utilizar eyeeassist"
    );
  }

  public keybindsScreenReader(event: KeyboardEvent) {
    this.cancelReader(event)
    this.reRead(event)
    this.activeScreenReader(event)
    this.moveBetweenContent(event)
  }

  private moveBetweenContent(event: KeyboardEvent){
    let tags = document.getElementsByTagName("article");
    if(tags.length == 0) {
      return
    }
    if (
      this.screenReaderStatus &&
      event.ctrlKey === true &&
      event.key.toLowerCase() === "arrowright"
    ) {
      this.articleIndex  += 1
      this.selectedArticle = tags[this.articleIndex];
      if(this.selectedArticle.textContent != null) {
        this.selectedArticle.focus()
        this.talk(this.selectedArticle.textContent);
      }
      if (this.articleIndex === tags.length - 1) {
        this.articleIndex = 0;
      } 
    }

    if (
      this.screenReaderStatus &&
      event.ctrlKey === true &&
      event.key.toLowerCase() === "arrowleft"
    ) {
      if(this.articleIndex === -1) {
        this.articleIndex += 1;
      } else {
        if(this.articleIndex == 0){
          this.articleIndex = tags.length - 1;
        }
        else{
          this.articleIndex -= 1;
        }
      }
      this.selectedArticle = tags[this.articleIndex];
      if(this.selectedArticle.textContent != null) {
        this.selectedArticle.focus()
        this.talk(this.selectedArticle.textContent);
      }
    }
  }

  private activeScreenReader(event : KeyboardEvent) {
    if(event.ctrlKey === true && event.key.toLowerCase() === " "){
      if(!this.screenReaderStatus){
        this.sayWelcome()
      }else {
        this.sayGoodbay()
      }
      this.screenReaderStatus = !this.screenReaderStatus
    }

  }
  private cancelReader(event: KeyboardEvent) {
    if(event.key.toLowerCase() === "escape"){
      this.talk("")
    }
  }
  private reRead(event: KeyboardEvent) {
    if(event.ctrlKey === true && event.key.toLowerCase() === "backspace"){
      if(this.selectedArticle != null) {
        if(this.selectedArticle.textContent != null) { 
          this.talk(this.selectedArticle.textContent);
        }
      }
    }
  }
}
