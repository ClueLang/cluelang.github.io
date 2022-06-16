import init, { CompileCode } from "./pkg/clue.js";

const input = document.getElementById("input");
const output = document.getElementById("output");
const button = document.getElementById("compile-button");

(async () => {
  await init();
  button.addEventListener("click", () => {
    const code = input.value;
    const compiled = CompileCode(code, "(Clue Online)", 0);
    output.textContent = compiled;
  });
  button.textContent = "Compile";
})();
