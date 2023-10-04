import { GlobalStyle } from "../../style/global-style"
import { CardButton } from "./card-button"
import { OptionCardStyles } from "./option-card-styles"

export class OptionCard {
  private element: HTMLDivElement

  constructor(
    private functionalityId: string,
    private title: string = '',
    private subtitle: string = '',
    private icon: SVGSVGElement | undefined,
    private option: boolean = false,
    private toggleOptionCard: Function
  ) {
    OptionCardStyles.optionCardStyle()
    this.element = this.createOptionCard()
  } 

  private createOptionCard() {
    const container  = document.createElement('div')
    container.className = 'option-card-eyeeassist'
    container.id = this.functionalityId + '-card-option-eyeassist'
    const spanTitle = document.createElement('span')
    spanTitle.textContent = this.title
    spanTitle.style.fontWeight = 'bold'
    const spanSubtitle = document.createElement('span')
    spanSubtitle.textContent = this.subtitle

    container.appendChild(spanTitle)
    container.appendChild(spanSubtitle)
    if(this.icon){
      this.icon.style.marginTop = '30px'
      this.icon.style.marginBottom = '30px'
      const iconContainer = document.createElement('div')
      iconContainer.style.position = 'absolute'
      iconContainer.style.top = '-20px'
      iconContainer.style.right = '-20px'
      iconContainer.style.width = '70px'
      iconContainer.style.height = '70px'
      iconContainer.style.display = 'flex'
      iconContainer.style.justifyItems = 'center'
      iconContainer.style.alignContent = 'center'
      iconContainer.style.justifyContent = 'center'
      iconContainer.style.alignItems = 'center'
      iconContainer.style.borderRadius = '50%'
      iconContainer.style.background = GlobalStyle.getForegroundColor()
      iconContainer.append(this.icon)
      container.appendChild(iconContainer)
    }
    const buttomContainer = document.createElement('div')
    buttomContainer.style.display = 'flex'
    buttomContainer.style.flexDirection = 'row'

    const leftButton = new CardButton(this.functionalityId, 'Si', PositionButton.LEFT, this.option? true: false, this.toggleOptionCard)
    const rightButton = new CardButton(this.functionalityId, 'No', PositionButton.RIGHT, this.option? false: true, this.toggleOptionCard)
    leftButton.assignChangeOposiveStateButton(rightButton.toggleState)
    rightButton.assignChangeOposiveStateButton(leftButton.toggleState)

    buttomContainer.appendChild(leftButton.getElement())
    buttomContainer.appendChild(rightButton.getElement())
    container.appendChild(buttomContainer)
    return container
  }

  public getElement() {
    return this.element
  }

}

export enum PositionButton {
  RIGHT,
  LEFT
}
