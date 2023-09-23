import { Filter } from "../filter/filter"
import { ScreenReader } from "../screen_reader/screen_reader"
import { Zoom } from "../zoom/zoom"
import { CssEyeeassistClasses } from "./styles/css-eyeeassist-classes"

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
    if(initMessageStatus == 'true') {
      this.initMessageClose = true
    }
    CssEyeeassistClasses.toggleSwitchClasses()
    CssEyeeassistClasses.addBufferOptionsClass()
    CssEyeeassistClasses.addFlyMenuStyle()
    CssEyeeassistClasses.addOptionFunctionsClass()
    this.zoomStatus = zoomStatus
    this.filterStatus = filterStatus
    this.readerStatus = readerStatus

    const savedZoomStatus = localStorage.getItem('zoomStatus')
    if(savedZoomStatus) {
      console.log('Hay zoom status guardado', JSON.parse(savedZoomStatus))
      this.zoomStatus = JSON.parse(savedZoomStatus)
    }
    const savedFilterStatus = localStorage.getItem('filterStatus')
    if(savedFilterStatus) {
      console.log('Hay filter status guardado', JSON.parse(savedFilterStatus))
      this.filterStatus = JSON.parse(savedFilterStatus)
    }
    const savedReaderStatus = localStorage.getItem('readerStatus')
    if(savedReaderStatus) {
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
      this.ZoomObject.activeZoom(this.ScreenReaderObject.enable(), event)
      this.ScreenReaderObject.keybindsScreenReader(event)
    })
  }

  private showFlyMenu(){
    const divElement = document.createElement('div')
    divElement.id = 'fly_menu'
    divElement.className = 'fly_menu'
    divElement.style.top = this.initMessageClose? '30px' : '70px'
    divElement.appendChild(CssEyeeassistClasses.svgHuman('#006400'))
    divElement.addEventListener('click', this.showOptions)
    document.body.appendChild(divElement)
  }

  buildOption = (opcion: Opciones) => {
    const option = document.createElement('div')
    var optionContainer = document.createElement('div')
    option.id = 'option_menu_eyeassist_' + opcion.name 
    const optionNameElement = document.createElement('div')
    optionNameElement.textContent = opcion.display_name
    optionNameElement.style.paddingRight = '20px'

    const toggleSwitch = document.createElement('div');
    toggleSwitch.className = 'toggle-switch'
    toggleSwitch.id = 'toggleSwitch' + opcion.name
    const toggleSwitchCircle = document.createElement('div')
    toggleSwitchCircle.className = "toggle-switch-circle"
    toggleSwitch.appendChild(toggleSwitchCircle)
    toggleSwitch.addEventListener('click', (event: Event) => {
      switch(toggleSwitch.id) {
        case 'toggleSwitchZoom':
          this.ZoomObject.toogleStatus()
          localStorage.setItem('zoomStatus', JSON.stringify(this.ZoomObject.status()))
          break
        case 'toggleSwitchColors':
          this.FilterObject.toggleStatus()
          var optionsList = this.FilterObject.showFilterOptionsList()
          optionContainer.parentElement?.append(optionsList as Node)
          localStorage.setItem('filterStatus', JSON.stringify(this.FilterObject.status()))
          break
        case 'toggleSwitchReader':
          this.ScreenReaderObject.toggleStatus()
          localStorage.setItem('readerStatus', JSON.stringify(this.ScreenReaderObject.status()))
          break
      }
      toggleSwitch.classList.toggle('active')
    })
    optionContainer.className = 'option_menu_eyeeassist'
    optionContainer.append(optionNameElement)
    optionContainer.append(toggleSwitch)
    
    option.append(optionContainer)

    if (opcion.status) {
      toggleSwitch.classList.toggle('active')
      if (opcion.name == "Colors") {
          console.log('Agregando colores')
          var optionsList = this.FilterObject.showFilterOptionsList()
          optionContainer.parentElement?.append(optionsList as Node)
      }
    }

    return option
  }
  showOptions = () => {
    console.log('Mostrando opciones')
    if (this.viewOptionsOn) {
      const bufferListOptions = document.getElementById('buffer_options')
      bufferListOptions?.remove()
      this.viewOptionsOn = !this.viewOptionsOn
      return
    }
    const bufferListOptions = document.createElement('div')
    bufferListOptions.id = 'buffer_options'
    bufferListOptions.className = 'buffer_options'
    //Crear opciones
    const opciones: Opciones[] = [
      { name: 'Zoom', status: this.ZoomObject.status(), display_name: 'Zoom'},
      { name: 'Colors', status: this.FilterObject.status(), display_name: 'Filtros de color'},
      { name: 'Reader', status: this.ScreenReaderObject.status(), display_name: 'Lectura en voz alta'},
    ]
    opciones.forEach((opcion : Opciones) => {
      bufferListOptions.appendChild(this.buildOption(opcion))
    })

    document.body.appendChild(bufferListOptions)

    this.viewOptionsOn = !this.viewOptionsOn
  }

  private showInitMessage() {
    let divElement = document.createElement('div')
    divElement = CssEyeeassistClasses.mainMessage(divElement)
    divElement.id = 'eyeeasist-initial-message'
    if(this.initMessageClose) {
      divElement.style.display = 'none'
    }

    let divElementContainer = document.createElement('div')
    divElementContainer = CssEyeeassistClasses.messageContent(divElementContainer)

    let spanElement = document.createElement('span')
    spanElement.textContent = 'Esta página cuenta con herramientas de accesibilidad. Para activar y/o desactivar estas herramientas presiona cmd + A o haz click en el botón'

    let buttonElement = document.createElement('button')
    buttonElement = CssEyeeassistClasses.closeButtom(buttonElement)
    buttonElement.addEventListener('click', this.cerrarModal)

    buttonElement.appendChild(CssEyeeassistClasses.svgCloseButtom('#006400'))

    divElementContainer.appendChild(spanElement)
    divElementContainer.appendChild(CssEyeeassistClasses.svgHuman('#006400', '20', '20'))

    divElement.appendChild(divElementContainer)
    divElement.appendChild(buttonElement)
    document.body.insertBefore(divElement, document.body.firstChild)
  }

  cerrarModal = () => {
    if(!this.animacionEnProgreso) {
      const mensaje = document.getElementById('eyeeasist-initial-message')
      const flyMenu = document.getElementById('fly_menu')

      this.animacionEnProgreso = true
      // Crea una animación usando la API de animación de CSS
      const animacion = mensaje?.animate([
          { opacity: 1, transform: 'translateY(0)' },
          { opacity: 0, transform: 'translateY(-100%)' }
      ], {
          duration: 300, // Duración de la animación en milisegundos
          easing: 'ease-out' // Tipo de interpolación
      });
      const flyAnimation = flyMenu?.animate(
        [
          { top: '70px' }, // Estado inicial
          { top: '30px' }, // Estado final
        ],
        {
          duration: 1000, // Duración en milisegundos
          easing: 'ease', // Función de temporización (puedes cambiarla según tus necesidades)
        }
      );

      if (animacion && flyAnimation) {
        animacion.onfinish = () => {
            if(mensaje) {
              mensaje.style.display = 'none'
            }
            this.animacionEnProgreso = false
            localStorage.setItem('initMessageClose', 'true');
        }
        flyAnimation.onfinish = () => {
          if(flyMenu) {
            flyMenu.style.top = '30px'
          }
        }
      }
    }
  }
}

interface Opciones {
  name : string
  status : boolean
  display_name: string
}
