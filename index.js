const input = document.getElementById("input")
const output = document.getElementById("output")
const button = document.getElementById("compile-button")

let CompileCode

WebAssembly.instantiateStreaming(fetch('clue.wasm'), {})
    .then(results => {
        CompileCode = results.module.CompileCode
        button.innerHTML = "Compile"
    });

button.onclick = () => {
    if (!CompileCode)
		return;
	output.value = CompileCode(input.value, "(Clue Online)", 0)
}