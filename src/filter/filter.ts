import { FilterService } from "./filter-module/filter_service"
import { CssFilterClasses } from "./styles/css-filter-classes"
export class Filter {
  private filterViewOn : boolean = false
  private filterService : FilterService

  constructor(
    private enableFilter: boolean = false
  ) {
    this.filterService = new FilterService()
    CssFilterClasses.addFilterBufferStyleClass();
    CssFilterClasses.addFilterOptionsStyleClass();
  }
  public status() {
    return this.enableFilter
  }
  public toggleStatus() {
    this.enableFilter = !this.enableFilter
  }

  startFilter = (event: Event) => {
    const component = event.target as HTMLElement;
    var filtro = component.textContent?.toLowerCase()
    console.log(filtro)
    this.filterService.aplicarFiltro(filtro as string);
  }
  public showFilterOptions() {
    const image = document.createElement('img')
    image.src = "https://github.com/EyeeAssist/docs/blob/develop/src/assets/logo.png?raw=true"
    image.style.width = '50px'
    image.style.borderRadius = '50%'
    const divElement = document.createElement('div')
    divElement.className = 'filter_button'
    divElement.id = 'filter_button'
    divElement.appendChild(image)

    divElement.addEventListener('click', this.showFilterOptionsList)

    CssFilterClasses.addFilterStyleClass()
    document.body.appendChild(divElement)
  }

  showFilterOptionsList = () => {
    if (!this.enableFilter) {
      var filter_buffer_instance: HTMLElement | null = document.getElementById("filter_buffer");
      if (filter_buffer_instance == null) {
        console.error('No hay instancia del buffer de opciones.')
        return;
      }
      filter_buffer_instance.remove();
      return "";
    }
    const filterList: FilterOption[] = [
      { id: "protanopia", name: "Protanopia"},
      { id: "deuteranopia", name: "Deuteranopia"},
      { id: "tritanopia", name: "Tritanopia"},
      { id: "grayscale", name: "Grayscale"},
    ];
     const colorOptions = [
       "colors",
       "filter"
     ];
    var bufferListDivElement = document.createElement('div')
    bufferListDivElement.className = 'filter-list-buffer'
    bufferListDivElement.id = 'filter_buffer'

    var description = document.createElement('span')
    description.textContent = 'Seleccione un filtro para distinguir mejor los siguientes colores:'
    description.style.marginBottom = '5px'
    bufferListDivElement.appendChild(description)

    const colors = [
      '#FFFF00', // Amarillo
      '#FF0000', // Rojo
      '#FFA500', // Naranja
      '#FFFF00', // Amarillo
      '#008000', // Verde
      '#0000FF', // Azul
      '#4B0082', // Índigo
      '#9400D3', // Violeta
      '#FFFF00'  // Amarillo
    ]
                                    
    filterList.forEach((filter) => {
      bufferListDivElement.appendChild(this.buildFilterOption(filter))
    });

    var colorContainer = document.createElement('div')
    colorContainer.style.display = 'flex'
    colorContainer.style.flexDirection = 'row'
    colorContainer.style.alignContent = 'center'
    colorContainer.style.alignItems = 'center'
    colorContainer.style.justifyItems = 'center'
    colorContainer.style.justifyContent= 'center'
    colors.forEach((color) => {
                var colorBox = document.createElement('div')
                colorBox.style.display = 'block'
                colorBox.style.width = '20px'
                colorBox.style.height = '25px'
                colorBox.style.backgroundColor = color
                colorContainer.appendChild(colorBox)
                })
    bufferListDivElement.appendChild(colorContainer)
    return bufferListDivElement
  }

  private buildFilterOption(filterOption: FilterOption): HTMLDivElement {
    var optionDivElement = document.createElement('div')
    optionDivElement.className = 'filter-option'
    optionDivElement.style.display = 'flex'
    optionDivElement.id = filterOption.id + '_option'
    optionDivElement.addEventListener('click', this.startFilter)

    const radioContainer = document.createElement('div')
    const radioButton = document.createElement('input')
    radioButton.type = "radio"
    radioButton.style.margin = '0'
    radioContainer.style.marginLeft = '6px'

    const optionText = document.createElement('span')
    optionText.textContent = filterOption.name
    optionText.style.marginLeft = '12px'

    radioContainer.append(radioButton)
    optionDivElement.append(radioContainer)
    optionDivElement.append(optionText)
    return optionDivElement
  }

}

export interface FilterOption {
  id: string
  name: string
}
