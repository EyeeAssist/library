import { FilterService } from "./filter-module/filter_service.js";
import { CssFilterClasses } from "./styles/css-filter-classes.js";
export class Filter {
    constructor(enableFilter = false) {
        this.enableFilter = enableFilter;
        this.filterViewOn = false;
        this.filterService = new FilterService();
        this.showFilterOptions();
    }
    startFilter(event) {
        const component = event.target;
        this.filterService.aplicarFiltro(component.textContent);
    }
    showFilterOptions() {
        const button_filter = `
      <div id="filter_button" class="filter-button" onClick="FilterObject.showFilterOptionsList()">0</div>
    `;
        const divElement = document.createElement('div');
        divElement.textContent = '0';
        divElement.className = 'filter-button';
        divElement.id = 'filter-button';
        divElement.addEventListener('click', this.showFilterOptionsList);
        CssFilterClasses.addFilterStyleClass();
        document.body.appendChild(divElement);
        //document.body.insertAdjacentHTML("beforebegin", button_filter);
    }
    showFilterOptionsList() {
        if (this.filterViewOn) {
            var filter_buffer_instance = document.getElementById("filter_buffer");
            if (filter_buffer_instance == null) {
                console.log('No hay instancia del buffer de opciones.');
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
        console.log('Creando buffer');
        const filter_buffer = `
      <div class="filter-list-buffer" id="filter_buffer"></div>
    `;
        var filter_button = document.getElementById("filter_button");
        if (filter_button == null) {
            console.log('No se creo el boton correctamente.');
            return;
        }
        filter_button.insertAdjacentHTML("beforeend", filter_buffer);
        CssFilterClasses.addFilterBufferStyleClass();
        /*colorOptions.forEach((option) => {
          const filter_buffer = document.getElementById("filter_buffer");
          filter_buffer.insertAdjacentHTML("beforeend", buildColorOptions(option));
        })*/
        filterList.forEach((filter) => {
            var filter_buffer_instance = document.getElementById("filter_buffer");
            if (filter_buffer_instance == null) {
                console.log('No hay instancia del buffer de opciones.');
                return;
            }
            filter_buffer_instance.insertAdjacentHTML("beforeend", this.buildFilterOption(filter));
        });
        CssFilterClasses.addFilterOptionsStyleClass();
        this.filterViewOn = !this.filterViewOn;
    }
    buildFilterOption(filterOption) {
        return `
      <div class="filter-option" onClick="startFilter(event)">${filterOption}</div>
    `;
    }
}
