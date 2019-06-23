"use strict";

let savedSeries = [];
const webApi = "http://api.tvmaze.com/search/shows?q=";
const input = document.querySelector(".input__finder");
const button = document.querySelector(".search-btn");
const result = document.querySelector(".results");
const defaultImg = "https://via.placeholder.com/210x295/cccccc/666666/?text=TV";
const resultContainer = document.querySelector(".results-container");

function search() {
  fetch(webApi + input.value)
    .then(response => response.json())
    .then(function(data) {
      result.innerHTML = "";
      if (data.length === 0) {
        resultContainer.classList.add("none");
        resultContainer.innerHTML =
          "Lo sentimos, no existen resultados que coincidan con esta búsqueda.";
      } else {
        for (let i = 0; i < data.length; i++) {
          const listElement = document.createElement("li");
          const seriesTitle = document.createElement("h2");
          const contentTitle = document.createTextNode(`${data[i].show.name}`);

          listElement.className = "series__item";
          seriesTitle.className = "series__title";

          seriesTitle.appendChild(contentTitle);
          listElement.appendChild(seriesTitle);
          result.appendChild(listElement);
        }
      }
    });
}

button.addEventListener("click", search);

input.addEventListener("keypress", pressEnter);

function pressEnter(event) {
  if (event.key === "Enter") {
    button.click();
  }
}
