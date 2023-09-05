export class ScreenReader {
  private synth = window.speechSynthesis;
  private screenReaderStatus: boolean = false
  private selectedArticle: HTMLElement | null = null
  private selectedLink: HTMLElement | null = null
  private articleIndex = -1
  private linkIndex = 0
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
    console.log('Hablando', text)
    cancel ? this.synth.cancel() : " ";
    this.synth.speak(new SpeechSynthesisUtterance(text));
  }

  cancelTalk = () => {
    this.synth.cancel()
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
    this.moveBetweenLinks(event)
  }
  private readChilds(article: Node){
    if(article.nodeName == 'IMG'){
      let img = article as HTMLImageElement 
      this.talk('Imagen de ' + img.alt, false)
    }
    if(article.nodeType == Node.TEXT_NODE && article.textContent?.trim()){
      this.talk(article.textContent, false)
    }
    article.childNodes.forEach(( child ) => {
      this.readChilds(child)
    })
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
      this.cancelTalk()
      this.readChilds(this.selectedArticle)
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
      this.cancelTalk()
      this.readChilds(this.selectedArticle)
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
  private moveBetweenLinks(event: KeyboardEvent){
    if (
      this.screenReaderStatus &&
      event.ctrlKey === false &&
      event.key.toLowerCase() === "enter" &&
      this.selectedLink != null
    ) {
      console.log(this.selectedLink);
      this.selectedLink.click();
    }
    if (
      this.screenReaderStatus &&
      event.ctrlKey === true &&
      event.key.toLowerCase() === "enter"
    ) {
      let links = document.getElementsByClassName("text_reader_link");
      console.log(links[this.linkIndex].tagName);
      this.selectedLink = links[this.linkIndex] as HTMLElement;
      this.selectedLink.focus();

      if (links[this.linkIndex].tagName == "TEXTAREA") {
        this.selectedLink.addEventListener("input", () => {
          console.log(this.selectedLink)
        });
        this.talk("Seleccionado un text area", true);
      } else {
        if(this.selectedLink.textContent !== null)
        {
          this.talk(this.selectedLink.textContent, true);
        }
      }

      if (this.linkIndex === links.length - 1) {
        this.linkIndex = 0;
      } else {
        this.linkIndex += 1;
      }
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
