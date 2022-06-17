import init, { CompileCode } from "./pkg/clue.js";

const input = document.getElementById("input");
const output = document.getElementById("output");
const button = document.getElementById("compile-button");

(async () => {
	await init();
	button.addEventListener("click", () => {
		let compiled;
		try {
			compiled = CompileCode(input.value, "(Clue Online)", 0);
		} catch (error) {
			console.log(output.style)
			output.style.color = "#EE5D43";
			output.textContent = error;
		} finally {
			output.style.color = "#BBBBBB";
			output.textContent = compiled;
		}
	});
	button.textContent = "Compile";
})();
