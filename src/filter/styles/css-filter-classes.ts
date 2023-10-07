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
          width: 100%;
          font-size: ${GlobalStyle.getMinimumFontSize()};
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
  public static radioButtomCss() {
    const styleSheet = document.styleSheets[0]; // Asegúrate de seleccionar el stylesheet adecuado
    const radio_button = `
        .radio_button_eyeassist::after {
          content:"";
          position: absolute;
          height: 20px;
          width: 22px;
          border-radius: 50%;
          background: #FFFFFF;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
        }
    `;
    styleSheet.insertRule(radio_button, styleSheet.cssRules.length);
    const checked_state = `
        .radio_button_eyeassist:checked::after {
          opacity: 1;
        }
    `;
    styleSheet.insertRule(checked_state, styleSheet.cssRules.length);
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
