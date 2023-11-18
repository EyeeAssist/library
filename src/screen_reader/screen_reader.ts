import { VideoProcesor } from "./video-procesor";

export class ScreenReader {
  private synth = window.speechSynthesis;
  private screenReaderStatus: boolean = false
  private selectedArticle: HTMLElement | null = null
  private selectedLink: HTMLElement | null = null
  private articleIndex = -1
  private linkIndex = 0
  private controller: AbortController = new AbortController
  private videoProcesor: VideoProcesor | null = null 
  private tags : HTMLElement[] = [] 

  constructor(
    private useScreenReader: boolean = false,
    private token: string = ""
  ) {
    if (!this.useScreenReader) {
      return;
    }
    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    this.videoProcesor = new VideoProcesor(false, this.talk, this.token)
  }

  public status(){
    return this.useScreenReader
  }
  public toggleStatus() {
    this.useScreenReader = !this.useScreenReader
  }
  public enable() {
    return this.screenReaderStatus
  }

  talk = (text: string, cancel = true) => {
    cancel ? this.synth.cancel() : " ";
    this.synth.speak(new SpeechSynthesisUtterance(text));
  }

  cancelTalk = () => {
    if(this.controller) {
      this.controller.abort()
    }
    this.talk("")
  }
  private sayWelcome() {
    this.talk(
      "Hola bienvenido a la pagina X, si desea leer el contenido precione control + flecha derecha o precione control + enter para navegar por los links"
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
    this.videoProcesor?.startAudioDescription(event)
  }
  private async getImage(src : string){
    const response = await fetch(src)
    return response
  }
  private async getDescription(blob : Blob) {
    this.controller = new AbortController()
    const formData = new FormData();
    formData.append('file', blob, 'imagen.jpg');
    console.log(this.token)
    const options = {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': 'Bearer ' + this.token
      },
      signal : this.controller.signal
    };
    const response = await fetch('https://eyeassist-core-production.up.railway.app/imagenes', options)
      .catch((error) => {
       if (error.name === 'AbortError') {
         console.error(error)
       }
      })

    if (response != undefined) {
      const description = await response.json()
      return description.descripcion
    }
    return ""
  }
  private async readChilds(article: Node){
    if(article.nodeName == 'IFRAME') {
      this.talk('Video encontrado, precione shift mas k para iniciar el video con audio descripcion')
      this.videoProcesor?.toggleStatus()
      this.videoProcesor?.createPlayer(article)
    }
    if(article.nodeName == 'IMG'){
      this.talk('Imagen encontrada', false)
      let img = article as HTMLImageElement 
      if(img.alt != "") {
        this.talk("")
        this.talk('Imagen de '+ img.alt, false)
      } else {
        if(this.token != "") {
          const response = await this.getImage(img.src)
          const blob = await response.blob();
          this.talk('describiendo imagen', false)
          const description = await this.getDescription(blob)
          if (description != "") {
            this.talk('Imagen de ' + description, false)
          } else{
            this.talk('No se pudo generar una descripcion para la imagen encontrada.', false)
          }
        }
      }
    }
    if(article.nodeType == Node.TEXT_NODE && article.textContent?.trim()){
      this.talk(article.textContent, false)
    }
    for (const child of Array.from(article.childNodes)) {
      await this.readChilds(child);
    }
  }
  private moveBetweenContent(event: KeyboardEvent){
    if(this.tags.length == 0) {
      return
    }
    if (
      this.screenReaderStatus &&
      event.ctrlKey === true &&
      event.key.toLowerCase() === "arrowright"
    ) {
      let selectedArticle = this.tags.shift()
      this.selectedArticle = selectedArticle!
      this.tags.push(selectedArticle as HTMLElement)
      this.cancelTalk()
      this.readChilds(selectedArticle as Node)
    }

    if (
      this.screenReaderStatus &&
      event.ctrlKey === true &&
      event.key.toLowerCase() === "arrowleft"
    ) {
      let selectedArticle = this.tags.pop()
      this.tags.unshift(selectedArticle as HTMLElement)
      this.cancelTalk()
      this.readChilds(selectedArticle as Node)
    }
  }

  private activeScreenReader(event : KeyboardEvent) {
    if( this.useScreenReader && event.ctrlKey === true && event.key.toLowerCase() === " "){
      if(!this.screenReaderStatus){
        this.tags = this.convertToHtmlElementsArray(document.getElementsByTagName("article"));
        this.sayWelcome()
      }else {
        this.tags = []
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
      console.log("Click en el link", this.selectedLink);
      this.selectedLink.click();
    }
    if (
      this.screenReaderStatus &&
      event.ctrlKey === true &&
      event.key.toLowerCase() === "enter"
    ) {
      let links = document.getElementsByClassName("text_reader_link");
      console.log("Leyendo link", this.selectedLink);
      console.log(links[this.linkIndex].tagName);
      this.selectedLink = links[this.linkIndex] as HTMLElement;
      //this.selectedLink.focus();

      if (links[this.linkIndex].tagName == "TEXTAREA") {
        this.selectedLink.addEventListener("input", () => {
          console.log(this.selectedLink)
        });
        this.talk("Seleccionado un text area", true);
      } else {
        console.log(this.selectedLink.textContent)
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
    if(this.useScreenReader && event.key.toLowerCase() === "escape"){
      this.talk("")
    }
  }
  private reRead(event: KeyboardEvent) {
    if(this.useScreenReader && event.ctrlKey === true && event.key.toLowerCase() === "backspace"){
      console.log('Re leyendo')
      if(this.selectedArticle != null) {
        this.cancelTalk()
        this.readChilds(this.selectedArticle as Node)
      }
    }
  }
  private convertToHtmlElementsArray(tags: HTMLCollectionOf<HTMLElement>): HTMLElement[] {
    let result: HTMLElement[] = []
    for(const tag of tags) {
      result.push(tag)
    }
    return result
  }
}
