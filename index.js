import init, { Clue, getVersion } from "./pkg/clue_wasm.js";

const input = document.getElementById("input");
const output = document.getElementById("output");
const button = document.getElementById("compile-button");
const versionText = document.getElementById("version");

/**@typedef {import('./ace/src/ace.js').Ace.Document} Editor */

/**@type {Editor} */
const inputEditor = ace.edit("input");
inputEditor.setTheme("ace/theme/one_dark");
inputEditor.session.setMode("ace/mode/clue");

/**@type {Editor} */
const outputEditor = ace.edit("output");
outputEditor.setTheme("ace/theme/one_dark");
outputEditor.session.setMode("ace/mode/lua");
outputEditor.setReadOnly(true);
outputEditor.setOptions({
  readOnly: true,
  highlightActiveLine: false,
  highlightGutterLine: false,
});
outputEditor.renderer.$cursorLayer.element.style.display = "none";
(async () => {
  await init();
  const clue = new Clue();
  button.addEventListener("click", () => {
    let compiled;
    try {
      compiled = clue.compileCode(inputEditor.getValue());
      output.style.color = "#BBBBBB";
      outputEditor.setValue(compiled, 1);
      outputEditor.setValue;
    } catch (error) {
      output.style.color = "#EE5D43";
      outputEditor.setValue(error, 1);
    }
  });
  button.textContent = "Compile";
  versionText.textContent = `Version: ${getVersion()}`;
})();
