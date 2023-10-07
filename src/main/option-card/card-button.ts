import { GlobalStyle } from "../../style/global-style"
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
    buttom.style.marginTop = '20px'
    buttom.style.width = '104px'
    buttom.style.height = '48px'
    buttom.style.cursor = 'pointer'
    if(this.position == PositionButton.LEFT) {
      buttom.style.borderRadius = '50px 0 0 50px'
    } else {
      buttom.style.borderRadius = '0 50px 50px 0'
    }
    buttom.style.border = `1px solid ${GlobalStyle.getForegroundColor()}`
    buttom.style.padding = '10px'
    buttom.style.display = 'flex'
    buttom.style.alignContent = 'center'
    buttom.style.alignItems = 'center'
    buttom.style.justifyContent = 'center'
    buttom.style.justifyItems = 'center'
    if(this.active) {
      buttom.style.backgroundColor = GlobalStyle.getForegroundColor()
      buttom.style.color =  GlobalStyle.getBackgroundColor()
    } else {
      buttom.style.backgroundColor = GlobalStyle.getBackgroundColor()
      buttom.style.color =  GlobalStyle.getForegroundColor()
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
    if(this.active === false) {
      if(elementCurrent != null) {
        elementCurrent.style.backgroundColor = GlobalStyle.getForegroundColor()
        elementCurrent.style.color =  GlobalStyle.getBackgroundColor()
      }
      if(this.position == PositionButton.LEFT) {
        const oposiveElement = document.getElementById(this.functionalityId + '-button-eyeassist-' + 'No')
        if (oposiveElement!= null) {
          oposiveElement.style.backgroundColor = GlobalStyle.getBackgroundColor()
          oposiveElement.style.color =  GlobalStyle.getForegroundColor()
        }
      } else {
        const oposiveElement = document.getElementById(this.functionalityId + '-button-eyeassist-' + 'Si')
        if (oposiveElement!= null) {
          oposiveElement.style.backgroundColor = GlobalStyle.getBackgroundColor()
          oposiveElement.style.color =  GlobalStyle.getForegroundColor()
        }
      }
      this.toggleToolStatus(this.functionalityId + '-card-option-eyeassist')
      this.active = !this.active
      if (this.toggleOposiveButton) {
        this.toggleOposiveButton()
      }
    } 
  }
}
