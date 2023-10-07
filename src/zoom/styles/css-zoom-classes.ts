import { GlobalStyle } from "../../style/global-style";

export class CssClasses{
  public static addZoomMessageTextBoxClass() {

    const styleSheet = document.styleSheets[0]
    var cssRule = `.zoom-message-txtbox {  
          display: flex;
          align-items: center;
          justify-content: center;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 9999;
          background-color: ${GlobalStyle.getBackgroundColor()};
          color: ${GlobalStyle.getForegroundColor()};
          font-size: 20rem;
          text-align: center;
          width: 80%;
          height: 80%;
          font-family: Arial, sans-serif;
      }`;
    styleSheet.insertRule(cssRule, styleSheet.cssRules.length)
  }
}
