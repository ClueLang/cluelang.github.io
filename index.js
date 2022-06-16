const input = document.getElementById("input")
const output = document.getElementById("output")
let wasm

document.getElementById("compile-button").onclick = () => {
    WebAssembly.instantiateStreaming(fetch('test.wasm'), {})
        .then(results => {
            wasm = results
            eval(input.value)
        });
}