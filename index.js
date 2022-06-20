import init, { CompileCode } from "./pkg/clue.js";

const output = document.getElementById("output");
const button = document.getElementById("compile-button");

const inputEditor = ace.edit("input");
inputEditor.setTheme("ace/theme/one_dark");
inputEditor.session.setMode("ace/mode/clue");

const outputEditor = ace.edit("output");
outputEditor.setTheme("ace/theme/one_dark");
outputEditor.session.setMode("ace/mode/clue");
outputEditor.setReadOnly(true);

(async () => {
  await init();
  button.addEventListener("click", () => {
    let compiled;
    try {
      compiled = CompileCode(inputEditor.getValue(), "(Clue Online)", 0);
      output.style.color = "#BBBBBB";
      outputEditor.setValue(compiled);
    } catch (error) {
      output.style.color = "#EE5D43";
      outputEditor.setValue(error);
    }
  });
  button.textContent = "Compile";
})();
