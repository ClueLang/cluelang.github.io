import init from "./clue.js";
import {CompileCode} from "./clue.js";

const input = document.getElementById("input")
const output = document.getElementById("output")
const button = document.getElementById("compile-button")

init().then(() => {
    button.onclick = () => {
        output.value = CompileCode(input.value, "(Clue Online)", 0)
    }
    button.innerHTML = "Compile"
})