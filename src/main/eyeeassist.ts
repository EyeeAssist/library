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
  private appName: HTMLElement

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
    CssEyeeassistClasses.overlayOptionsStyleClass()
    this.zoomStatus = zoomStatus
    this.filterStatus = filterStatus
    this.readerStatus = readerStatus
    this.appName = this.createAppName()

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

  private createAppName() {
    const appName = document.createElement('span')
    appName.textContent = 'EyeAssist'
    return appName
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
  private createCloseButtom () {
    const closeButtomModal = document.createElement('div')
    const closeSpanButtonModal = document.createElement('span')
    const closeButtom = CssEyeeassistClasses.svgCloseButtomMenu(GlobalStyle.getForegroundColor())
    closeButtom.style.width = '25px'
    closeButtom.style.marginTop = '3px'
    closeButtom.style.height = '17px'
    closeSpanButtonModal.textContent = 'Cerrar '
    closeSpanButtonModal.style.color = GlobalStyle.getForegroundColor()
    closeButtomModal.append(closeSpanButtonModal)
    closeButtomModal.append(closeButtom)
    closeButtomModal.style.position = 'absolute'
    closeButtomModal.style.display = 'flex'
    closeButtomModal.style.alignItems = 'center'
    closeButtomModal.style.justifyContent = 'center'
    closeButtomModal.style.flexDirection = 'row'
    closeButtomModal.style.top = '20px'
    closeButtomModal.style.right = '100px'
    closeButtomModal.style.padding = '10px'
    closeButtomModal.style.fontSize = '22px'
    closeButtomModal.style.fontWeight = 'bold'
    closeButtomModal.style.cursor = 'pointer'
    closeButtomModal.addEventListener('click', this.showOptionsView)
    return closeButtomModal
  }

  showOptionsView = () => {
    const fly_menu_element = document.getElementById('fly_menu')
    if (this.viewOptionsOn) {
      const bufferOptions = document.getElementById('overlay-menu-view')
      bufferOptions?.remove()
      if(fly_menu_element) {
        fly_menu_element.style.width = '72px'
        fly_menu_element.style.borderRadius = '50%'
        fly_menu_element.style.justifyContent = 'center'
        this.appName.remove()
      }
      this.viewOptionsOn = !this.viewOptionsOn
      return
    }
    if(fly_menu_element) {
      fly_menu_element.style.width = '200px'
      fly_menu_element.style.borderRadius = '50px'
      fly_menu_element.style.justifyContent = 'space-evenly'
      this.appName = this.createAppName()
      fly_menu_element.append(this.appName)
    }
    const divElement = document.createElement('div')
    divElement.id = 'overlay-menu-view'
    divElement.className = 'overlay-menu-view'
    const divOptionsElement = document.createElement('div')
    divOptionsElement.className = 'options-menu-view'
    divOptionsElement.id = 'option-menu-display'
    divOptionsElement.append(this.createCloseButtom())
    const divFilterMenu = document.createElement('div')
    divFilterMenu.id = 'option-filter-display'
    divFilterMenu.style.width = '30%'
    divElement.append(divOptionsElement)
    divElement.append(divFilterMenu)

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
        subtitle: 'Aplique un filtro',
        status: this.FilterObject.status(),
        toggle: (id: string = "") => { 
          this.FilterObject.toggleStatus()
          var optionsList = this.FilterObject.showFilterOptionsList()
          const container = document.getElementById('option-filter-display')
          const option_container = document.getElementById('option-menu-display')
          if(optionsList != "") {
            container?.appendChild(optionsList as Node)
            if(option_container && container) {
              option_container.style.alignItems = 'end'
              container.style.height = '100%'
              option_container.style.height = '70%'
            }
          } else {
            if(option_container && container) {
              option_container.style.alignItems = 'center'
              container.style.height = '0'
              option_container.style.height = '100%'
            }
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
      divOptionsElement.appendChild(cardElement)
      console.log('Creado', opcion.id, opcion.status)
    })

    document.body.appendChild(divElement)
    if(this.FilterObject.status()) {
        var optionsList = this.FilterObject.showFilterOptionsList()
        const container = document.getElementById('option-filter-display')
        const option_container = document.getElementById('option-menu-display')
        if(optionsList != "" && container) {
          container?.appendChild(optionsList as Node)
          if(option_container) {
            option_container.style.alignItems = 'end'
            container.style.height = '100%'
            option_container.style.height = '70%'
          }
        } else {
          if(option_container && container) {
            option_container.style.alignItems = 'center'
            container.style.height = '0'
            option_container.style.height = '100%'
          }
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
