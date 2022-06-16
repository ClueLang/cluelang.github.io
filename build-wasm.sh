#!/usr/bin/env bash
git submodule init
cd Clue-wasm
cargo install wasm-pack
wasm-pack build --target web --release
mv pkg ../
cd ../
