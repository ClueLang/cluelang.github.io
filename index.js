import * as wasm from "./clue_bg.wasm";
export * from "./clue_bg.js";

const input = document.getElementById("input")
const output = document.getElementById("output")
const button = document.getElementById("compile-button")

button.onclick = () => {
	output.value = CompileCode(input.value, "(Clue Online)", 0)
}