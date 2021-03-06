import Prism from "prismjs";
import GlslCanvas from "glslCanvas";
import "../css/styles.css";

const canvas = document.querySelector(".glslCanvas");
const code = document.querySelector("code");
const list = document.querySelector(".fragment-shader-list");

const sandbox = new GlslCanvas(canvas);

list.addEventListener("click", (e) => {
  e.preventDefault();
  const {
    target: {
      pathname
    }
  } = e;

  if (pathname) {
    fetch(pathname)
      .then(response => response.text())
      .then((text) => {
        code.textContent = text;
        Prism.highlightAll();
        sandbox.load(text);
      });
  }
});
