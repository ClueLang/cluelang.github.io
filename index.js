const input = document.getElementById("input")
const output = document.getElementById("output")

document.getElementById("compile-button").onclick = () => {
    WebAssembly.instantiateStreaming(fetch('test.wasm'), {})
        .then(results => {
            console.log(results)
        });
}