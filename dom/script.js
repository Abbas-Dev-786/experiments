"use strict";

const wrapperEl = document.querySelector(".wrapper");
const cardEL = document.querySelector(".card");

// wrapperEl.addEventListener("mousemove", (e) => {
//   console.log();

//   cardEL.style.transform = `translate(${e.clientX * 0.5 * 0.01}%,${
//     e.clientY * 0.5 * 0.01
//   }%)`;
// });

wrapperEl.addEventListener("mousemove", (e) => {
  const xAxis = e.pageX - innerWidth / 2;
  const yAxis = e.pageY - innerHeight / 2;

  cardEL.style.transform = `translate(${xAxis / 10}px,${yAxis / 10}px)`;
});

// wrapperEl.addEventListener("mouseleave", (e) => {
//   e.target.style.backgroundColor = "white";
// });

// const toggleEl = document.querySelector(".toggle");
// const dotEl = document.querySelector(".dot");

// toggleEl.addEventListener("click", (e) => {
//   const target = e.target.closest(".toggle");
//   if (!target) return;

//   target.querySelector(".dot").classList.toggle("active");

//   if (target.querySelector(".dot").classList.contains("active")) {
//     target.style.backgroundColor = "#000";
//   } else {
//     target.style.backgroundColor = "#fff";
//   }
// });
