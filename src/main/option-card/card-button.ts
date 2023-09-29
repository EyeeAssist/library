import { PositionButton } from "./option-card"

export class CardButton {
  private element: HTMLDivElement
  private toggleOposiveButton: Function | null = null

  constructor(
    private functionalityId: string,
    private text: string,
    private position: PositionButton,
    private active: boolean = false,
    private toggleToolStatus: Function
  ) {
    this.element = this.createButtom()
  }
  toggleState = () => {
    this.active = !this.active
  }
  private createButtom () {
    const buttom = document.createElement('div')
    buttom.id = this.functionalityId + '-button-eyeassist-' + this.text
    buttom.addEventListener('click', this.changeButtonState)
    buttom.style.width = '100px'
    buttom.style.cursor = 'pointer'
    if(this.position == PositionButton.LEFT) {
      buttom.style.borderRadius = '50px 0 0 50px'
    } else {
      buttom.style.borderRadius = '0 50px 50px 0'
    }
    buttom.style.border = '1px solid #004D00'
    buttom.style.padding = '10px'
    buttom.style.display = 'flex'
    buttom.style.alignContent = 'center'
    buttom.style.alignItems = 'center'
    buttom.style.justifyContent = 'center'
    buttom.style.justifyItems = 'center'
    if(this.active) {
      buttom.style.backgroundColor = '#004D00'
      buttom.style.color = '#FFFFFF'
    }     
    const span = document.createElement('span')
    span.textContent = this.text
    span.style.cursor = 'pointer'
    buttom.appendChild(span)
    return buttom
  }

  public assignChangeOposiveStateButton(toggleOposive: Function) {
    this.toggleOposiveButton = toggleOposive
  }
  public getElement() {
    return this.element
  }

  changeButtonState = () => {
    const elementCurrent = document.getElementById(this.functionalityId + '-button-eyeassist-' + this.text)
    console.log(this.functionalityId + '-button-eyeassist-' + this.text, 'Activo:', this.active)
    if(this.active === false) {
      console.log('Entre activo igual false')
      if(elementCurrent != null) {
        elementCurrent.style.backgroundColor = '#004D00'
        elementCurrent.style.color = '#FFFFFF'
      }
      if(this.position == PositionButton.LEFT) {
        const oposiveElement = document.getElementById(this.functionalityId + '-button-eyeassist-' + 'No')
        if (oposiveElement!= null) {
          oposiveElement.style.backgroundColor = '#F5F5DC'
          oposiveElement.style.color = '#004D00'
        }
      } else {
        const oposiveElement = document.getElementById(this.functionalityId + '-button-eyeassist-' + 'Si')
        if (oposiveElement!= null) {
          oposiveElement.style.backgroundColor = '#F5F5DC'
          oposiveElement.style.color = '#004D00'
        }
      }
      this.toggleToolStatus()
      this.active = !this.active
      if (this.toggleOposiveButton) {
        this.toggleOposiveButton()
      }
    } 
  }
}
