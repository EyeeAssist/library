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
      { id: "protanomaly", name: "Protanomaly"},
      { id: "deuteranopia", name: "Deuteronopia"},
      { id: "deuteranomaly", name: "Deuteranomaly"},
      { id: "tritanopia", name: "Tritanopia"},
      { id: "tritanomaly", name: "Tritanomaly"},
      { id: "achromatopsia", name: "Achromatopsia"},
      { id: "achromatomaly", name: "Achromatomaly"},
      { id: "grayscale", name: "Grayscale"},
    ];
     const colorOptions = [
       "colors",
       "filter"
     ];
    var bufferListDivElement = document.createElement('div')
    bufferListDivElement.className = 'filter-list-buffer'
    bufferListDivElement.id = 'filter_buffer'

    /*colorOptions.forEach((option) => {
      const filter_buffer = document.getElementById("filter_buffer");
      filter_buffer.insertAdjacentHTML("beforeend", buildColorOptions(option));
    })*/

    filterList.forEach((filter) => {
      bufferListDivElement.appendChild(this.buildFilterOption(filter))
    });
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

interface FilterOption {
  id: string
  name: string
}