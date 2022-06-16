#!/usr/bin/env bash
git submodule update
cd Clue-wasm
cargo install wasm-pack
wasm-pack build --target web --release
mv pkg ../
cd ../
