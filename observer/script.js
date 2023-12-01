"use strict";

const navEl = document.querySelector("nav");
const page1 = document.querySelector("#page1");
const page2 = document.querySelector("#page2");
const page3 = document.querySelector("#page3");
const page4 = document.querySelector("#page4");
const page5 = document.querySelector("#page5");

function callback(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  page1.classList.remove("animate");
  page1.classList.add("animate");
}

const options = {
  root: null,
  threshold: 0.5,
};

const observer = new IntersectionObserver(callback, options);
observer.observe(page1);
