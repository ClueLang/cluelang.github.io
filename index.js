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
			console.log(error)
			output.style.color = "#EE5D43";
			output.textContent = "Error!";
		} finally {
			output.style.color = "#BBBBBB";
			output.textContent = compiled;
		}
	});
	button.textContent = "Compile";
})();
