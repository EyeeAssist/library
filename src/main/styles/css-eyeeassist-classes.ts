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
    div.style.backgroundColor = '#F5F5DC'
    div.style.zIndex = '999'
    div.style.color = '#006400'
    return div
  }
  public static messageContent(div: HTMLDivElement) {
    div.style.textAlign = 'center'
    div.style.flex = '1'
    div.style.display = 'flex'
    div.style.alignContent = 'center'
    div.style.justifyContent = 'center'
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
    button.style.alignSelf = 'flex-end'
    button.style.color = '#006400'
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
          background-color: #F5F5DC;
          color: #006400;
          text-align: center;
          line-height: 50px;
          cursor: pointer;
          display: flex;
          align-content: center;
          justify-content: center;
          z-index: 9999;
        }
    `;
    styleSheet.insertRule(fly_menu, styleSheet.cssRules.length);
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
            top: 20%;
            right: 10%;
            border-radius: 10px;
            transform: translateY(-50%);
            z-index: 9999;
            background-color: #F5F5DC;
            color: #006400;
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
}
