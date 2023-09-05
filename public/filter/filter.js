import { FilterService } from "./filter-module/filter_service";
import { CssFilterClasses } from "./styles/css-filter-classes";
export class Filter {
    constructor(enableFilter = false) {
        this.enableFilter = enableFilter;
        this.filterViewOn = false;
        this.startFilter = (event) => {
            const component = event.target;
            this.filterService.aplicarFiltro(component.textContent);
        };
        this.showFilterOptionsList = () => {
            if (this.filterViewOn) {
                var filter_buffer_instance = document.getElementById("filter_buffer");
                if (filter_buffer_instance == null) {
                    console.error('No hay instancia del buffer de opciones.');
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
            var bufferListDivElement = document.createElement('div');
            bufferListDivElement.className = 'filter-list-buffer';
            bufferListDivElement.id = 'filter_buffer';
            var filter_button = document.getElementById("filter_button");
            if (filter_button == null) {
                console.error('No se creo el boton correctamente.');
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
                    console.error('No hay instancia del buffer de opciones.');
                    return;
                }
                filter_buffer_instance.appendChild(this.buildFilterOption(filter));
            });
            CssFilterClasses.addFilterOptionsStyleClass();
            this.filterViewOn = !this.filterViewOn;
        };
        this.filterService = new FilterService();
        this.showFilterOptions();
    }
    showFilterOptions() {
        const image = document.createElement('img');
        image.src = "https://github.com/EyeeAssist/docs/blob/develop/src/assets/logo.png";
        const divElement = document.createElement('div');
        divElement.textContent = '0';
        divElement.className = 'filter_button';
        divElement.id = 'filter_button';
        divElement.appendChild(image);
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
