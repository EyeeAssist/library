import { FilterService } from "./filter-module/filter_service"
import { CssFilterClasses } from "./styles/css-filter-classes"
export class Filter {
  private filterViewOn : boolean = false
  private filterService : FilterService

  constructor(
    private enableFilter: boolean = false
  ) {
    this.filterService = new FilterService()
    this.showFilterOptions()
  }

  startFilter = (event: Event) => {
    const component = event.target as HTMLElement;
    this.filterService.aplicarFiltro(component.textContent);
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
    if (this.filterViewOn) {
      var filter_buffer_instance: HTMLElement | null = document.getElementById("filter_buffer");
      if (filter_buffer_instance == null) {
        console.error('No hay instancia del buffer de opciones.')
        return;
      }
      filter_buffer_instance.remove();
      this.filterViewOn = !this.filterViewOn;
      return;
    }
    const filterList = [
      "protanopia",
      "protanomaly",
      "deuteranopia",
      "deuteranomaly",
      "tritanopia",
      "tritanomaly",
      "achromatopsia",
      "achromatomaly",
      "grayscale",
    ];
     const colorOptions = [
       "colors",
       "filter"
     ];
    var bufferListDivElement = document.createElement('div')
    bufferListDivElement.className = 'filter-list-buffer'
    bufferListDivElement.id = 'filter_buffer'

    var filter_button: HTMLElement | null = document.getElementById("filter_button");
    if (filter_button == null){
      console.error('No se creo el boton correctamente.')
      return;
    }
    filter_button.appendChild(bufferListDivElement)
    CssFilterClasses.addFilterBufferStyleClass();

    /*colorOptions.forEach((option) => {
      const filter_buffer = document.getElementById("filter_buffer");
      filter_buffer.insertAdjacentHTML("beforeend", buildColorOptions(option));
    })*/

    filterList.forEach((filter) => {
      var filter_buffer_instance = document.getElementById("filter_buffer");
      if (filter_buffer_instance == null) {
        console.error('No hay instancia del buffer de opciones.')
        return;
      }
      filter_buffer_instance.appendChild(this.buildFilterOption(filter))
    });

    CssFilterClasses.addFilterOptionsStyleClass();
    this.filterViewOn = !this.filterViewOn;
  }

  private buildFilterOption(filterOption: string): HTMLDivElement {
    var optionDivElement = document.createElement('div')
    optionDivElement.className = 'filter-option'
    optionDivElement.addEventListener('click', this.startFilter)
    optionDivElement.textContent = filterOption
    return optionDivElement
  }

}
