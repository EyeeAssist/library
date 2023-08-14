import { FilterService } from "./filter-module/filter_service.js";
import { CssFilterClasses } from "./styles/css-filter-classes.js";
export class Filter {
    constructor(enableFilter = false) {
        this.enableFilter = enableFilter;
        this.filterViewOn = false;
        this.showFilterOptionsList = () => {
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
            var bufferListDivElement = document.createElement('div');
            bufferListDivElement.className = 'filter-list-buffer';
            bufferListDivElement.id = 'filter_buffer';
            var filter_button = document.getElementById("filter_button");
            if (filter_button == null) {
                console.log('No se creo el boton correctamente.');
                return;
            }
            filter_button.appendChild(bufferListDivElement);
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
                console.log(this);
                filter_buffer_instance.appendChild(this.buildFilterOption(filter));
            });
            CssFilterClasses.addFilterOptionsStyleClass();
            this.filterViewOn = !this.filterViewOn;
        };
        this.filterService = new FilterService();
        this.showFilterOptions();
    }
    startFilter(event) {
        console.log('Evento', event);
        const component = event.target;
        if (component == null) {
            console.error('Error al seleccionar un elemento de la lista de filtros');
            return;
        }
        this.filterService.aplicarFiltro(component.textContent);
    }
    showFilterOptions() {
        const divElement = document.createElement('div');
        divElement.textContent = '0';
        divElement.className = 'filter_button';
        divElement.id = 'filter_button';
        divElement.addEventListener('click', this.showFilterOptionsList);
        CssFilterClasses.addFilterStyleClass();
        document.body.appendChild(divElement);
    }
    buildFilterOption(filterOption) {
        var optionDivElement = document.createElement('div');
        optionDivElement.className = 'filter-option';
        optionDivElement.addEventListener('click', this.startFilter);
        optionDivElement.textContent = filterOption;
        return optionDivElement;
    }
}
