import { GlobalStyle } from "../style/global-style"
import { FilterService } from "./filter-module/filter_service"
import { CssFilterClasses } from "./styles/css-filter-classes"
export class Filter {
  private filterViewOn : boolean = false
  private filterService : FilterService
  private filterOptionsMap: Map<string, HTMLInputElement> = new Map<string, HTMLInputElement>

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
    const radio = event.target as HTMLInputElement;
    const radioId = radio.id.replace('_option', '')
    this.changeActiveInputs(radioId)
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
      this.filterOptionsMap.clear()
      return "";
    }
    const filterList: FilterOption[] = [
      { id: "protanopia", name: "Rojo (Protanopia)"},
      { id: "deuteranopia", name: "Verde (Deuteranopia)"},
      { id: "tritanopia", name: "Azul (Tritanopia)"},
      { id: "grayscale", name: "Grises (Grayscale)"},
    ];
     const colorOptions = [
       "colors",
       "filter"
     ];
    var bufferListDivElement = document.createElement('div')
    bufferListDivElement.className = 'filter-list-buffer'
    bufferListDivElement.id = 'filter_buffer'

    var bufferListContainer = document.createElement('div')
    bufferListContainer.style.padding = '7% 7% 3% 7%'

    var description = document.createElement('span')
    description.textContent = 'Seleccione un filtro para distinguir mejor los siguientes colores:'
    description.style.marginBottom = '5px'
    bufferListContainer.appendChild(description)

    const colors = [
      '#3B3F4A',
      '#726401',
      '#FFFF00', // Amarillo
      '#FF0000', // Rojo
      '#FFA500', // Naranja
      '#FFFF00', // Amarillo
      '#008000', // Verde
      '#0000FF', // Azul
      '#4B0082', // Índigo
      '#9400D3', // Violeta
      '#FFFF00',  // Amarillo
      '#0018A9'
    ]

    filterList.forEach((filter) => {
      bufferListContainer.appendChild(this.buildFilterOption(filter))
      const divider = document.createElement('div')
      divider.style.border = '1px solid #FFFFFF'
      divider.style.margin = '20px 0'
      bufferListContainer.appendChild(divider)
    });

    bufferListDivElement.appendChild(bufferListContainer)

    var colorContainer = document.createElement('div')
    colorContainer.style.display = 'flex'
    colorContainer.style.flexDirection = 'row'
    colorContainer.style.alignContent = 'center'
    colorContainer.style.alignItems = 'center'
    colorContainer.style.justifyItems = 'center'
    colorContainer.style.justifyContent= 'center'
    colorContainer.style.background = GlobalStyle.getForegroundColor()
    colorContainer.style.padding = '5% 0'
    colorContainer.style.borderBottomRightRadius = '22px'
    colorContainer.style.borderBottomLeftRadius = '22px'
    colors.forEach((color) => {
                var colorBox = document.createElement('div')
                colorBox.style.display = 'block'
                colorBox.style.width = '43px'
                colorBox.style.height = '50px'
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

    const radioContainer = document.createElement('div')
    const radioButton = document.createElement('input')
    radioButton.type = "radio"
    radioButton.id = filterOption.id + '_option'
    radioButton.style.margin = '0'
    radioButton.addEventListener('click', this.startFilter)
    this.filterOptionsMap.set(filterOption.id, radioButton)
    radioContainer.style.marginLeft = '6px'

    const optionText = document.createElement('span')
    optionText.textContent = filterOption.name
    optionText.style.marginLeft = '12px'

    radioContainer.append(radioButton)
    optionDivElement.append(radioContainer)
    optionDivElement.append(optionText)
    return optionDivElement
  }
  private changeActiveInputs(selected_input: string) {
    console.log('Input seleccionado', selected_input)
    const current_element = this.filterOptionsMap.get(selected_input)
    if(this.filterService.getActiveFilter() && this.filterService.filtro_aplicado == selected_input) {
      this.filterService.aplicarFiltro(selected_input);
      if(current_element) {
        current_element.checked = false
      }
      return
    }

    for (const [clave, valor] of this.filterOptionsMap) {
      if(clave != selected_input) {
        valor.checked = false
      }
    }
    if(this.filterService.getActiveFilter()) {
      this.filterService.aplicarFiltro(selected_input);
      this.filterService.aplicarFiltro(selected_input);
    } else {
      this.filterService.aplicarFiltro(selected_input);
    }
  }
}

export interface FilterOption {
  id: string
  name: string
}
