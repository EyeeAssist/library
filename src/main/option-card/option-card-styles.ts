export class OptionCardStyles {
  public static zoomIconSvg() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "108");
    svg.setAttribute("height", "108");
    svg.setAttribute("viewBox", "0 0 108 108");
    svg.setAttribute("fill", "none");

    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("opacity", "0.16");
    path1.setAttribute(
      "d",
      "M85.4996 49.4995C85.4996 59.0472 81.7068 68.204 74.9555 74.9553C68.2042 81.7066 59.0474 85.4995 49.4996 85.4995C39.9518 85.4995 30.7951 81.7066 24.0438 74.9553C17.2925 68.204 13.4996 59.0472 13.4996 49.4995C13.4996 39.9517 17.2925 30.7949 24.0438 24.0436C30.7951 17.2923 39.9518 13.4995 49.4996 13.4995C59.0474 13.4995 68.2042 17.2923 74.9555 24.0436C81.7068 30.7949 85.4996 39.9517 85.4996 49.4995Z"
    );
    path1.setAttribute("fill", "#004D00");

    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M94.5001 94.5L74.9566 74.9565M74.9566 74.9565C78.2996 71.6135 80.9514 67.6448 82.7606 63.277C84.5698 58.9091 85.501 54.2277 85.501 49.5C85.501 44.7723 84.5698 40.0909 82.7606 35.7231C80.9514 31.3552 78.2996 27.3865 74.9566 24.0435C71.6136 20.7005 67.6449 18.0487 63.277 16.2395C58.9092 14.4303 54.2278 13.4991 49.5001 13.4991C44.7724 13.4991 40.0909 14.4303 35.7231 16.2395C31.3553 18.0487 27.3866 20.7005 24.0436 24.0435C17.2921 30.795 13.4991 39.952 13.4991 49.5C13.4991 59.0481 17.2921 68.205 24.0436 74.9565C30.7951 81.708 39.952 85.5009 49.5001 85.5009C59.0481 85.5009 68.2051 81.708 74.9566 74.9565ZM49.5001 36V63M36.0001 49.5H63.0001");
    path2.setAttribute("stroke", "#004D00");
    path2.setAttribute("stroke-width", "9.01408");
    path2.setAttribute("stroke-linecap", "round");
    path2.setAttribute("stroke-linejoin", "round");

    svg.appendChild(path1);
    svg.appendChild(path2);

    return svg;
  }
  public static filterIconSvg() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "108");
    svg.setAttribute("height", "108");
    svg.setAttribute("viewBox", "0 0 108 108");
    svg.setAttribute("fill", "none");

    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M54 91.9801C58.9451 96.4092 65.3568 98.8547 72 98.8453C86.9107 98.8453 99 86.775 99 71.8875C99 59.3274 90.396 48.7712 78.75 45.7789");
    path1.setAttribute("stroke", "#004D00");
    path1.setAttribute("stroke-width", "9.01408");
    path1.setAttribute("stroke-linejoin", "round");

    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M29.25 45.7789C17.604 48.7712 9 59.3252 9 71.8875C9 86.775 21.0893 98.8453 36 98.8453C50.9107 98.8453 63 86.775 63 71.8875C63 68.4055 62.3385 65.0807 61.137 62.0254");
    path2.setAttribute("stroke", "#004D00");
    path2.setAttribute("stroke-width", "9.01408");
    path2.setAttribute("stroke-linejoin", "round");

    const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path3.setAttribute("d", "M54 62.9016C68.9108 62.9016 81 50.8312 81 35.9438C81 21.0563 68.9108 8.98596 54 8.98596C39.0893 8.98596 27 21.0563 27 35.9438C27 50.8312 39.0893 62.9016 54 62.9016Z");
    path3.setAttribute("fill", "#a3bd93");
    path3.setAttribute("stroke", "#004D00");
    path3.setAttribute("stroke-width", "9.01408");
    path3.setAttribute("stroke-linejoin", "round");

    svg.appendChild(path1)
    svg.appendChild(path2)
    svg.appendChild(path3)

    return svg;
  }
  public static voiceIconSvg() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "108");
    svg.setAttribute("height", "108");
    svg.setAttribute("viewBox", "0 0 108 108");
    svg.setAttribute("fill", "none");


    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M54.0001 99C78.8536 99 99.0001 78.8535 99.0001 54C99.0001 29.1465 78.8536 9 54.0001 9C29.1466 9 9.00006 29.1465 9.00006 54C9.00006 78.8535 29.1466 99 54.0001 99Z");
    path1.setAttribute("fill", "#a3bd93");
    path1.setAttribute("stroke", "#004D00");
    path1.setAttribute("stroke-width", "9.01408");
    path1.setAttribute("stroke-linejoin", "round");

    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M38.2501 58.275C39.4435 58.275 40.5881 57.8009 41.432 56.957C42.276 56.1131 42.7501 54.9685 42.7501 53.775C42.7501 52.5816 42.276 51.437 41.432 50.593C40.5881 49.7491 39.4435 49.275 38.2501 49.275C37.0566 49.275 35.912 49.7491 35.0681 50.593C34.2242 51.437 33.7501 52.5816 33.7501 53.775C33.7501 54.9685 34.2242 56.1131 35.0681 56.957C35.912 57.8009 37.0566 58.275 38.2501 58.275Z");
    path2.setAttribute("fill", "#004D00");

    const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path3.setAttribute("d", "M49.3874 64.9125C50.8521 63.4515 52.0136 61.7154 52.8052 59.8041C53.5967 57.8927 54.0028 55.8438 53.9999 53.775C54.0028 51.7062 53.5967 49.6573 52.8052 47.7459C52.0136 45.8346 50.8521 44.0985 49.3874 42.6375M60.5249 76.0478C63.4543 73.1257 65.7773 69.6536 67.3604 65.8309C68.9436 62.0082 69.7556 57.9103 69.7499 53.7728C69.7499 45.0743 66.2242 37.1993 60.5249 31.5");
    path3.setAttribute("stroke", "#004D00");
    path3.setAttribute("stroke-width", "9.01408");
    path3.setAttribute("stroke-linecap", "round");
    path3.setAttribute("stroke-linejoin", "round");


    svg.appendChild(path1);
    svg.appendChild(path2);
    svg.appendChild(path3);

    return svg;
  }

  public static optionCardStyle() {
    const styleSheet = document.styleSheets[0]; // Asegúrate de seleccionar el stylesheet adecuado
    const optionCardStyle = `
        .option-card-eyeeassist {
          display: flex;
          flex-direction: column;
          align-content: center;
          align-items: center;
          justify-content: center;
          justify-items: center;
          background-color: #F5F5DC;
          padding: 90px;
          border-radius: 50px;
          color: #004D00;
        }
    `;
    styleSheet.insertRule(optionCardStyle, styleSheet.cssRules.length);
  }
}
