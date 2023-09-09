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
    div.style.backgroundColor = '#f8f8f8'
    div.style.zIndex = '999'
    return div
  }
  public static messageContent(div: HTMLDivElement) {
    div.style.textAlign = 'center'
    div.style.flex = '1'
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
    return button
  }
  public static addFlyMenuStyle() {
    const styleSheet = document.styleSheets[0]; // Asegúrate de seleccionar el stylesheet adecuado
    const fly_menu = `
        .fly_menu {
          position: fixed;
          right: 70px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #243c5a;
          color: #ffffff;
          fill: #ffffff;
          stroke: #ffffff;
          text-align: center;
          line-height: 50px;
          cursor: pointer;
          z-index: 9999;
        }
    `;
    styleSheet.insertRule(fly_menu, styleSheet.cssRules.length);
  }
  public static svgHuman(color: string){
      const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svgElement.setAttribute("viewBox", "0 0 24 24");
      svgElement.setAttribute("fill", "none");
      svgElement.setAttribute("stroke", color);
      svgElement.setAttribute("stroke-width", "2");
      svgElement.setAttribute("stroke-linecap", "round");
      svgElement.setAttribute("stroke-linejoin", "round");

      // Crear círculo
      const circleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circleElement.setAttribute("cx", "12");
      circleElement.setAttribute("cy", "5");
      circleElement.setAttribute("r", "1");

      // Crear path 1
      const path1Element = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path1Element.setAttribute("d", "M9 20l3-6 3 6");

      // Crear path 2
      const path2Element = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path2Element.setAttribute("d", "M6 8l6 2 6-2");

      // Crear path 3
      const path3Element = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path3Element.setAttribute("d", "M12 10v4");

      // Agregar elementos al SVG
      svgElement.appendChild(circleElement);
      svgElement.appendChild(path1Element);
      svgElement.appendChild(path2Element);
      svgElement.appendChild(path3Element);

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
            background-color: #243c5a;
            color: #9dd08b;
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
