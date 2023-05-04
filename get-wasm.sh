#!/usr/bin/env bash
VERSION=$(curl https://api.github.com/repos/ClueLang/Clue/releases/latest | jq -r ".tag_name")
curl -fSsl -LJ "https://github.com/ClueLang/Clue/releases/download/$VERSION/clue_wasm.zip" -o clue_wasm.zip
unzip -o clue_wasm.zip
rm clue_wasm.zip
