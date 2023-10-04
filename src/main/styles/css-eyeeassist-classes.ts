import { GlobalStyle } from "../../style/global-style"

export class CssEyeeassistClasses {
  public static mainMessage(div: HTMLDivElement) {
    div.style.display = 'flex'
    div.style.alignItems = 'center'
    div.style.alignContent = 'center'
    div.style.justifyItems = 'center'
    div.style.justifyContent = 'center'
    div.style.position = 'fixed'
    div.style.top = '0'
    div.style.left = '0'
    div.style.width = '100%'
    div.style.backgroundColor = GlobalStyle.getBackgroundColor() 
    div.style.zIndex = '999'
    div.style.color = GlobalStyle.getForegroundColor() 
    return div
  }
  public static messageContent(div: HTMLDivElement) {
    div.style.textAlign = 'center'
    div.style.flex = '1'
    div.style.display = 'flex'
    div.style.flexDirection = 'row'
    div.style.alignContent = 'center'
    div.style.justifyContent = 'center'
    div.style.justifyItems = 'center'
    div.style.alignItems = 'center'
    return div
  }
  public static closeButtom(button: HTMLButtonElement) {
    button.style.background = 'none'
    button.style.border = 'none'
    button.style.padding = '0'
    button.style.margin = '0'
    button.style.cursor = 'pointer'
    button.style.width = '50px'
    button.style.height = '50px'
    button.style.color = GlobalStyle.getForegroundColor()
    return button
  }
  public static addFlyMenuStyle() {
    const styleSheet = document.styleSheets[0]; // Asegúrate de seleccionar el stylesheet adecuado
    const fly_menu = `
        .fly_menu {
          position: fixed;
          right: 70px;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background-color: ${GlobalStyle.getBackgroundColor()};
          color: ${GlobalStyle.getForegroundColor()};
          text-align: center;
          line-height: 50px;
          flex-wrap: wrap;
          cursor: pointer;
          display: flex;
          align-content: center;
          justify-content: center;
          z-index: 9999;
        }
    `;
    styleSheet.insertRule(fly_menu, styleSheet.cssRules.length);
  }
  public static svgEyee() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "34");
    svg.setAttribute("height", "26");
    svg.setAttribute("viewBox", "0 0 34 26");
    svg.setAttribute("fill", "none");

    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute(
      "d",
      "M17.3208 0.00330279C21.1597 0.109866 24.644 1.38863 27.7511 3.91482C30.543 6.184 32.5919 9.11763 33.9316 12.6656C34.016 12.8912 34.0273 13.0856 33.9372 13.3175C32.1304 18.0627 29.1639 21.6107 25.0323 23.9237C23.1523 24.9768 21.1484 25.6099 19.0488 25.8669C15.5589 26.2995 12.2323 25.6789 9.07448 23.9864C6.18687 22.4381 3.82837 20.1814 1.98772 17.2541C1.19968 16.0004 0.541103 14.6715 0.0401335 13.2485C-0.0105264 13.1044 -0.0161553 12.8975 0.0401335 12.7533C2.20162 7.06785 5.88854 3.16887 11.1009 1.09401C12.9471 0.354336 14.9454 -0.0405764 17.3208 0.00330279Z"
    );
    path1.setAttribute("fill", "white");

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "17.5");
    circle.setAttribute("cy", "13.5");
    circle.setAttribute("r", "7.5");
    circle.setAttribute("fill", "#28405D");

    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("fill-rule", "evenodd");
    path2.setAttribute("clip-rule", "evenodd");
    path2.setAttribute(
      "d",
      "M17.0377 6.02181C17.2247 6.00736 17.4137 6 17.6044 6C21.6117 6 24.8603 9.24854 24.8603 13.2558C24.8603 13.5069 24.8475 13.755 24.8226 13.9996C24.6356 14.014 24.4466 14.0214 24.2558 14.0214C20.2485 14.0214 17 10.7729 17 6.76558C17 6.51447 17.0128 6.26635 17.0377 6.02181Z"
    );
    path2.setAttribute("fill", "#506F95");

    svg.appendChild(path1);
    svg.appendChild(circle);
    svg.appendChild(path2);

    return svg;
  }
  public static svgHuman(color: string, width: string='34', height: string='38'){
      const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");

      // Establece los atributos del elemento SVG
      svgElement.setAttribute("width", width);
      svgElement.setAttribute("height", height);
      svgElement.setAttribute("viewBox", "0 0 34 38");
      svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");

      // Crea un elemento de ruta dentro del SVG
      const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathElement.setAttribute("d", "M33.5 13.5H22.5V37.3333H18.8333V26.3333H15.1667V37.3333H11.5V13.5H0.5V9.83332H33.5M17 0.666656C17.9725 0.666656 18.9051 1.05296 19.5927 1.7406C20.2804 2.42823 20.6667 3.36086 20.6667 4.33332C20.6667 5.30578 20.2804 6.23841 19.5927 6.92605C18.9051 7.61368 17.9725 7.99999 17 7.99999C16.0275 7.99999 15.0949 7.61368 14.4073 6.92605C13.7196 6.23841 13.3333 5.30578 13.3333 4.33332C13.3333 2.29832 14.965 0.666656 17 0.666656Z");
      pathElement.setAttribute("fill", color);

      // Agrega la ruta al elemento SVG
      svgElement.appendChild(pathElement);

      return svgElement
  }
  public static svgCloseButtom(color: string){
      // Crear un elemento SVG
      const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svgElement.setAttribute("fill", color);
      svgElement.setAttribute("viewBox", "0 0 32 32");

      // Crear un elemento path
      const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathElement.setAttribute("d", "M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z");

      // Agregar el elemento path al SVG
      svgElement.appendChild(pathElement);
      return svgElement
  }

  public static addBufferOptionsClass() {
    const styleSheet = document.styleSheets[0]; // Asegúrate de seleccionar el stylesheet adecuado
    const buffer_options = `
        .buffer_options {
            position: fixed;
            top: 130px;
            right: 70px;
            border-radius: 10px;
            height: auto; 
            max-height: 100%;
            overflow-y: auto; 
            z-index: 9999;
            background-color: ${GlobalStyle.getBackgroundColor()};
            color: ${GlobalStyle.getForegroundColor()};
        }
    `;
    styleSheet.insertRule(buffer_options, styleSheet.cssRules.length);
  }

  public static toggleSwitchClasses () {
    this.toogleSwitchClass()
    this.toggleSwitchCircle()
    this.toggleSwitchActive()
    this.toggleSwitchAnimation()
  }
  public static toogleSwitchClass() {
    const styleSheet = document.styleSheets[0]; // Asegúrate de seleccionar el stylesheet adecuado
    const toggle_switch = `
        .toggle-switch {
            width: 60px;
            height: 30px;
            background-color: #ccc;
            border-radius: 15px;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.3s;
        }
    `;
    styleSheet.insertRule(toggle_switch, styleSheet.cssRules.length);
  }
  public static toggleSwitchCircle() {
    const styleSheet = document.styleSheets[0]; // Asegúrate de seleccionar el stylesheet adecuado
    const toggle_switch_circle = `
        .toggle-switch-circle {
            width: 30px;
            height: 30px;
            background-color: white;
            border-radius: 50%;
            transition: transform 0.3s;
        }`
    styleSheet.insertRule(toggle_switch_circle, styleSheet.cssRules.length);
  }

  public static toggleSwitchActive() {
    const styleSheet = document.styleSheets[0]; // Asegúrate de seleccionar el stylesheet adecuado
    const toggle_switch_artive = `
        .toggle-switch.active {
            background-color: #2ecc71;
        }`
    styleSheet.insertRule(toggle_switch_artive, styleSheet.cssRules.length);
  }
  public static toggleSwitchAnimation() {
    const styleSheet = document.styleSheets[0]; // Asegúrate de seleccionar el stylesheet adecuado
    const toggle_switch_animation = `
        .toggle-switch.active .toggle-switch-circle {
            transform: translateX(30px);
        }`
    styleSheet.insertRule(toggle_switch_animation, styleSheet.cssRules.length);
  }
  public static addOptionFunctionsClass() {

    const styleSheet = document.styleSheets[0]; // Asegúrate de seleccionar el stylesheet adecuado
    const option_functions = `
        .option_menu_eyeeassist {
          display: flex;
          padding: 10px;
          justify-content: space-between;
        }`
    styleSheet.insertRule(option_functions, styleSheet.cssRules.length);
  }
  public static overlayStyleClass() {
    const styleSheet = document.styleSheets[0]; // Asegúrate de seleccionar el stylesheet adecuado
    const option_functions = `
        .overlay-menu-view {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-direction: column;
            background-color: rgba(0, 0, 0, 0.5);
        }`
    styleSheet.insertRule(option_functions, styleSheet.cssRules.length);

  }

  public static overlayOptionsStyleClass() {
    const styleSheet = document.styleSheets[0]; // Asegúrate de seleccionar el stylesheet adecuado
    const option_functions = `
        .options-menu-view {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }`
    styleSheet.insertRule(option_functions, styleSheet.cssRules.length);
  }
}
