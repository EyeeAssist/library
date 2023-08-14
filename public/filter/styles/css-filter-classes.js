export class CssFilterClasses {
    static addFilterBufferStyleClass() {
        const styleSheet = document.styleSheets[0]; // Asegúrate de seleccionar el stylesheet adecuado
        const filter_buffer = `
        .filter-list-buffer {
            position: fixed;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
            z-index: 9999;
            background-color: #243c5a;
            color: #ffffff;
        }
    `;
        styleSheet.insertRule(filter_buffer, styleSheet.cssRules.length);
    }
    static addFilterOptionsStyleClass() {
        const styleSheet = document.styleSheets[0]; // Asegúrate de seleccionar el stylesheet adecuado
        const filter_option = `
        .filter-option {
          padding: 0.5rem;
        }
    `;
        styleSheet.insertRule(filter_option, styleSheet.cssRules.length);
    }
    static addFilterStyleClass() {
        const styleSheet = document.styleSheets[0]; // Asegúrate de seleccionar el stylesheet adecuado
        const filter_button = `
        .filter-button {
          position: fixed;
          top: 20px;
          right: 20px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #243c5a;
          color: #ffffff;
          text-align: center;
          line-height: 50px;
          cursor: pointer;
          z-index: 9999;
        }
    `;
        styleSheet.insertRule(filter_button, styleSheet.cssRules.length);
    }
}
