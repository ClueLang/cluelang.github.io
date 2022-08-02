git submodule init
git submodule update --remote --merge
cd Clue-wasm
cargo install wasm-pack
wasm-pack build --target web
rm -rf ../pkg
mv ./pkg/ ../
cd ..
