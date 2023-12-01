"use strict";

class View {
  generateMarkup() {
    const markup = `
        <div class="card"><h3>text</h3></div>
    `;

    document.querySelector(".wrapper").innerHTML = Array.from(
      { length: 20 },
      (_, i) => i
    ).map((i) => markup.slice().replace("text", `card ${i + 1}`));
  }

  addListener(handler) {
    
  }
}

const view = new View();

view.generateMarkup();
