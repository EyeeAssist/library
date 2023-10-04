import { Filter } from "../filter/filter"
import { ScreenReader } from "../screen_reader/screen_reader"
import { Zoom } from "../zoom/zoom"
import { CssEyeeassistClasses } from "./styles/css-eyeeassist-classes"
import { OptionCard } from "./option-card/option-card"
import { OptionCardStyles } from "./option-card/option-card-styles"
import { GlobalStyle } from "../style/global-style"

export class Eyeeassist {
  private animacionEnProgreso: boolean = false
  private initMessageClose: boolean = false
  private viewOptionsOn: boolean = false

  private zoomStatus: boolean
  private filterStatus: boolean
  private readerStatus: boolean

  private ZoomObject: Zoom
  private FilterObject: Filter
  private ScreenReaderObject: ScreenReader

  constructor(
    zoomStatus: boolean = false,
    filterStatus: boolean = false,
    readerStatus: boolean = false,
    private token: string = ''
  ) {
    const initMessageStatus = localStorage.getItem('initMessageClose');
    if (initMessageStatus == 'true') {
      this.initMessageClose = true
    }
    CssEyeeassistClasses.toggleSwitchClasses()
    CssEyeeassistClasses.addBufferOptionsClass()
    CssEyeeassistClasses.addFlyMenuStyle()
    CssEyeeassistClasses.addOptionFunctionsClass()
    CssEyeeassistClasses.overlayStyleClass()
    this.zoomStatus = zoomStatus
    this.filterStatus = filterStatus
    this.readerStatus = readerStatus

    const savedZoomStatus = localStorage.getItem('zoomStatus')
    if (savedZoomStatus) {
      console.log('Hay zoom status guardado', JSON.parse(savedZoomStatus))
      this.zoomStatus = JSON.parse(savedZoomStatus)
    }
    const savedFilterStatus = localStorage.getItem('filterStatus')
    if (savedFilterStatus) {
      console.log('Hay filter status guardado', JSON.parse(savedFilterStatus))
      this.filterStatus = JSON.parse(savedFilterStatus)
    }
    const savedReaderStatus = localStorage.getItem('readerStatus')
    if (savedReaderStatus) {
      console.log('Hay reader status guardado', JSON.parse(savedReaderStatus))
      this.readerStatus = JSON.parse(savedReaderStatus)
    }
    this.ZoomObject = new Zoom(this.zoomStatus)
    this.FilterObject = new Filter(this.filterStatus)
    this.ScreenReaderObject = new ScreenReader(this.readerStatus, this.token)
  }

  public start() {
    this.showInitMessage()
    this.showFlyMenu()
    document.addEventListener("keydown", (event) => {
      console.log(event.key)
      event.preventDefault()
      this.ZoomObject.activeZoom(this.ScreenReaderObject.enable(), event)
      this.ScreenReaderObject.keybindsScreenReader(event)
    })
  }

  showOptionsView = () => {
    if (this.viewOptionsOn) {
      const bufferOptions = document.getElementById('overlay-menu-view')
      bufferOptions?.remove()
      this.viewOptionsOn = !this.viewOptionsOn
      return
    }
    const divElement = document.createElement('div')
    divElement.id = 'overlay-menu-view'
    divElement.className = 'overlay-menu-view'

    const opciones: Opciones[] = [
      {
        id: 'zoom',
        title: 'Activar zoom',
        subtitle: 'Atajo de teclado [Ctrl + Backspace]',
        status: this.ZoomObject.status(),
        toggle: () => { 
          this.ZoomObject.toogleStatus()
          localStorage.setItem('zoomStatus', JSON.stringify(this.ZoomObject.status()))
        },
        icon: OptionCardStyles.zoomIconSvg()
      },
      { id: 'filter',
        title: 'Aplicar filtros de color',
        subtitle: 'Escoja una opcion',
        status: this.FilterObject.status(),
        toggle: (id: string = "") => { 
          this.FilterObject.toggleStatus()
          var optionsList = this.FilterObject.showFilterOptionsList()
          const container = document.getElementById(id)
          if(optionsList != "") {
            container?.appendChild(optionsList as Node)
          }
          localStorage.setItem('filterStatus', JSON.stringify(this.FilterObject.status()))
        },
        icon: OptionCardStyles.filterIconSvg()},
      { id: 'voice',
        title: 'Leer en voz alta',
        subtitle: 'Atajo de teclado [Ctrl + Space]',
        status: this.ScreenReaderObject.status(),
        toggle: () => { 
          this.ScreenReaderObject.toggleStatus()
          localStorage.setItem('readerStatus', JSON.stringify(this.ScreenReaderObject.status()))
        },
        icon: OptionCardStyles.voiceIconSvg()
      },
    ]
    opciones.forEach((opcion: Opciones) => {
      const card = new OptionCard(opcion.id, opcion.title, opcion.subtitle, opcion.icon, opcion.status, opcion.toggle)
      const cardElement = card.getElement()
      divElement.appendChild(cardElement)
      console.log('Creado', opcion.id, opcion.status)
    })

    document.body.appendChild(divElement)
    if(this.FilterObject.status()) {
        var optionsList = this.FilterObject.showFilterOptionsList()
        const container = document.getElementById('filter-card-option-eyeassist')
        console.log(container)
        if(optionsList != "") {
          container?.appendChild(optionsList as Node)
        }
    }
    this.viewOptionsOn = !this.viewOptionsOn
  }
  private showFlyMenu() {
    const divElement = document.createElement('div')
    divElement.id = 'fly_menu'
    divElement.className = 'fly_menu'
    divElement.style.bottom = '120px'
    divElement.appendChild(CssEyeeassistClasses.svgEyee())
    divElement.addEventListener('click', this.showOptionsView)
    document.body.appendChild(divElement)
  }

  private showInitMessage() {
    let divElement = document.createElement('div')
    divElement = CssEyeeassistClasses.mainMessage(divElement)
    divElement.id = 'eyeeasist-initial-message'
    if (this.initMessageClose) {
      divElement.style.display = 'none'
    }

    let divElementContainer = document.createElement('div')
    divElementContainer = CssEyeeassistClasses.messageContent(divElementContainer)

    let spanElement = document.createElement('span')
    spanElement.textContent = 'Esta página cuenta con herramientas de accesibilidad. Para activar y/o desactivar estas herramientas, presiona Ctrl + Space o haz clic en el botón con el icono de una persona posicionado en la parte superior derecha de la pantalla.'
    spanElement.style.padding = '15px'

    let buttonElement = document.createElement('button')
    buttonElement = CssEyeeassistClasses.closeButtom(buttonElement)
    buttonElement.addEventListener('click', this.cerrarModal)

    buttonElement.appendChild(CssEyeeassistClasses.svgCloseButtom(GlobalStyle.getForegroundColor()))

    divElementContainer.appendChild(spanElement)
    //divElementContainer.appendChild(CssEyeeassistClasses.svgHuman('#006400', '20', '20'))

    divElement.appendChild(divElementContainer)
    divElement.appendChild(buttonElement)
    document.body.insertBefore(divElement, document.body.firstChild)
  }

  cerrarModal = () => {
    if (!this.animacionEnProgreso) {
      const mensaje = document.getElementById('eyeeasist-initial-message')
      this.animacionEnProgreso = true
      const animacion = mensaje?.animate([
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(-100%)' }
      ], {
        duration: 300, // Duración de la animación en milisegundos
        easing: 'ease-out' // Tipo de interpolación
      });
      if (animacion) {
        animacion.onfinish = () => {
          if (mensaje) {
            mensaje.style.display = 'none'
          }
          this.animacionEnProgreso = false
          localStorage.setItem('initMessageClose', 'true');
        }
      }
    }
  }
}

interface Opciones {
  id: string
  title: string
  subtitle: string
  status: boolean
  toggle: Function
  icon: SVGSVGElement
}
