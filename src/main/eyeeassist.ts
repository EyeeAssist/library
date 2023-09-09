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
    divElement.appendChild(CssEyeeassistClasses.svgHuman('#9dd08b'))
    divElement.addEventListener('click', this.showOptions)
    document.body.appendChild(divElement)
  }

  buildOption = (optionName: string, status: boolean) => {
    const option = document.createElement('div')
    option.className = 'option_menu_eyeeassist'
    const optionNameElement = document.createElement('div')
    optionNameElement.textContent = optionName
    optionNameElement.style.paddingRight = '20px'
    option.appendChild(optionNameElement)

    const toggleSwitch = document.createElement('div');
    toggleSwitch.className = 'toggle-switch'
    toggleSwitch.id = 'toggleSwitch' + optionName
    const toggleSwitchCircle = document.createElement('div')
    toggleSwitchCircle.className = "toggle-switch-circle"
    toggleSwitch.appendChild(toggleSwitchCircle)
    if (status) {
      toggleSwitch.classList.toggle('active')
    }
    toggleSwitch.addEventListener('click', (event: Event) => {
      switch(toggleSwitch.id) {
        case 'toggleSwitchZoom':
          this.ZoomObject.toogleStatus()
          localStorage.setItem('zoomStatus', JSON.stringify(this.ZoomObject.status()))
          break
        case 'toggleSwitchColors':
          this.FilterObject.toggleStatus()
          localStorage.setItem('filterStatus', JSON.stringify(this.FilterObject.status()))
          break
        case 'toggleSwitchReader':
          this.ScreenReaderObject.toggleStatus()
          localStorage.setItem('readerStatus', JSON.stringify(this.ScreenReaderObject.status()))
          break
      }
      toggleSwitch.classList.toggle('active')
    })
    option.appendChild(toggleSwitch)

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
      { name: 'Zoom', status: this.ZoomObject.status()},
      { name: 'Colors', status: this.FilterObject.status()},
      { name: 'Reader', status: this.ScreenReaderObject.status()},
    ]
    opciones.forEach((opcion) => {
      bufferListOptions.appendChild(this.buildOption(opcion.name, opcion.status))
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
    spanElement.textContent = 'Mensaje de accesibilidad'

    let buttonElement = document.createElement('button')
    buttonElement = CssEyeeassistClasses.closeButtom(buttonElement)
    buttonElement.addEventListener('click', this.cerrarModal)

    buttonElement.appendChild(CssEyeeassistClasses.svgCloseButtom('#000000'))

    divElementContainer.appendChild(spanElement)

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
}
