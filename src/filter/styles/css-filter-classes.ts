import { GlobalStyle } from "../../style/global-style";

export class CssFilterClasses {

  public static addFilterBufferStyleClass() {
    const styleSheet = document.styleSheets[0]; // Asegúrate de seleccionar el stylesheet adecuado
    const filter_buffer = `
        .filter-list-buffer {
          background-color: ${GlobalStyle.getBackgroundColor()};
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          border-radius: 22px;
          color: ${GlobalStyle.getForegroundColor()};
          padding: 7%;
          width: 100%;
          font-size: 2.5rem;
          margin-top: 2rem;
        }
    `;
    styleSheet.insertRule(filter_buffer, styleSheet.cssRules.length);
  }

  public static addFilterOptionsStyleClass() {
    const styleSheet = document.styleSheets[0]; // Asegúrate de seleccionar el stylesheet adecuado
    const filter_option = `
        .filter-option {
          padding: 0.5rem;
        }
    `;
    styleSheet.insertRule(filter_option, styleSheet.cssRules.length);
  }

  public static addFilterStyleClass() {
    const styleSheet = document.styleSheets[0]; // Asegúrate de seleccionar el stylesheet adecuado
    const filter_button = `
        .filter_button {
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
