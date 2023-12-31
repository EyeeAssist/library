export class FilterService {
  private hasInsertedAccess: boolean = false;

  private active_filter = false;
  public filtro_aplicado: string = ''

  public getActiveFilter() {
    return this.active_filter
  }

  public aplicarFiltro(filtro: string | null) {
    if (filtro == null) {
      console.error('Error al aplicar los filtros, la opcion no se pintada correctamente')
      return
    }
    if (!this.active_filter) {
      this.toggleTest("colorBlindness", filtro);
      this.filtro_aplicado = filtro
    } else {
      this.removeTests("colorBlindness");
      this.filtro_aplicado = ''
    }
    this.active_filter = !this.active_filter;
  }

  private toggleTest(testType: string, testClass: string) {
    if (!this.hasInsertedAccess) {
      this.insertFiles(this.svgFilterTemplate , this.cssFilter);
      this.hasInsertedAccess = true;
    }

    this.removeTests(testType);
    document.documentElement.classList.add(testClass);
  }

  private insertFiles(svg: string, css: string) {
    document.body.insertAdjacentHTML("beforeend", svg);
    document.body.insertAdjacentHTML("beforeend", css);
  }

  private removeTests(testType: string) {
    if (testType == "vision") {
      for (let i = 0; i < this.visionClasses.length; i++) {
        document.documentElement.classList.remove(this.visionClasses[i]);
      }
    } else if (testType == "colorBlindness") {
      for (let i = 0; i < this.colorBlindnessClasses.length; i++) {
        document.documentElement.classList.remove(this.colorBlindnessClasses[i]);
      }
    }
  }

  private colorBlindnessClasses = [
    "protanopia",
    "protanomaly",
    "deuteranopia",
    "deuteranomaly",
    "tritanopia",
    "tritanomaly",
    "achromatopsia",
    "achromatomaly",
    "grayscale"
  ]
  private visionClasses = [
    "vision-loss-moderate",
    "vision-loss-severe",
    "vision-blindness"
  ]

  private cssFilter = `
  <style>.protanopia{-webkit-filter:url(#protanopia) grayscale(0)!important;filter:url(#protanopia) grayscale(0)!important}.protanomaly{-webkit-filter:url(#protanomaly) grayscale(0)!important;filter:url(#protanomaly) grayscale(0)!important}.deuteranopia{-webkit-filter:url(#deuteranopia) grayscale(0)!important;filter:url(#deuteranopia) grayscale(0)!important}.deuteranomaly{-webkit-filter:url(#deuteranomaly) grayscale(0)!important;filter:url(#deuteranomaly) grayscale(0)!important}.tritanopia{-webkit-filter:url(#tritanopia) grayscale(0)!important;filter:url(#tritanopia) grayscale(0)!important}.tritanomaly{-webkit-filter:url(#tritanomaly) grayscale(0)!important;filter:url(#tritanomaly) grayscale(0)!important}.achromatopsia{-webkit-filter:url(#achromatopsia) grayscale(0)!important;filter:url(#achromatopsia) grayscale(0)!important}.achromatomaly{-webkit-filter:url(#achromatomaly) grayscale(0)!important;filter:url(#achromatomaly) grayscale(0)!important}.grayscale{-webkit-filter:grayscale(100%)!important;filter:grayscale(100%)!important}.vision-loss-moderate body>*{-webkit-filter:blur(1px)!important;filter:blur(1px)!important}.vision-loss-severe body>*{-webkit-filter:blur(10px)!important;filter:blur(10px)!important}.vision-blindness body>*{background-color:#fff!important;-webkit-filter:brightness(0)!important;filter:brightness(0)!important}#access-filter{border:0;clip:rect(1px,1px,1px,1px);-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;margin:-1px;width:1px;overflow:hidden;position:absolute!important;word-wrap:normal!important}</style>`;

  private svgFilterTemplate = `<svg 
  id="access-filter"
  aria-hidden="true"
  xmlns="http://www.w3.org/2000/svg"
  version="1.1">
  <defs>
    <filter id="protanopia">
      <feColorMatrix
        in="SourceGraphic"
        type="matrix"
        values="0.567, 0.433, 0,     0, 0
                0.558, 0.442, 0,     0, 0
                0,     0.242, 0.758, 0, 0
                0,     0,     0,     1, 0"/>
    </filter>
    <filter id="protanomaly">
      <feColorMatrix
        in="SourceGraphic"
        type="matrix"
        values="0.817, 0.183, 0,     0, 0
                0.333, 0.667, 0,     0, 0
                0,     0.125, 0.875, 0, 0
                0,     0,     0,     1, 0"/>
    </filter>
    <filter id="deuteranopia">
      <feColorMatrix
        in="SourceGraphic"
        type="matrix"
        values="0.625, 0.375, 0,   0, 0
                0.7,   0.3,   0,   0, 0
                0,     0.3,   0.7, 0, 0
                0,     0,     0,   1, 0"/>
    </filter>
    <filter id="deuteranomaly">
      <feColorMatrix
        in="SourceGraphic"
        type="matrix"
        values="0.8,   0.2,   0,     0, 0
                0.258, 0.742, 0,     0, 0
                0,     0.142, 0.858, 0, 0
                0,     0,     0,     1, 0"/>
    </filter>
    <filter id="tritanopia">
      <feColorMatrix
        in="SourceGraphic"
        type="matrix"
        values="0.95, 0.05,  0,     0, 0
                0,    0.433, 0.567, 0, 0
                0,    0.475, 0.525, 0, 0
                0,    0,     0,     1, 0"/>
    </filter>
    <filter id="tritanomaly">
      <feColorMatrix
        in="SourceGraphic"
        type="matrix"
        values="0.967, 0.033, 0,     0, 0
                0,     0.733, 0.267, 0, 0
                0,     0.183, 0.817, 0, 0
                0,     0,     0,     1, 0"/>
    </filter>
    <filter id="achromatopsia">
      <feColorMatrix
        in="SourceGraphic"
        type="matrix"
        values="0.299, 0.587, 0.114, 0, 0
                0.299, 0.587, 0.114, 0, 0
                0.299, 0.587, 0.114, 0, 0
                0,     0,     0,     1, 0"/>
    </filter>
    <filter id="achromatomaly">
      <feColorMatrix
        in="SourceGraphic"
        type="matrix"
        values="0.618, 0.320, 0.062, 0, 0
                0.163, 0.775, 0.062, 0, 0
                0.163, 0.320, 0.516, 0, 0
                0,     0,     0,     1, 0"/>
    </filter>
  </defs>
</svg>`;
}
