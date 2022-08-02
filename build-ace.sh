git submodule init
git submodule update --remote --merge
cd ace-src
curl https://raw.githubusercontent.com/ClueLang/Clue-for-VSCode/main/syntaxes/clue.json --output clue.json
npm i
cd tool
npm i
node tmlanguage.js ../clue.json
cd ..
mkdir -p ../ace
node Makefile.dryice.js --m --nc --s
rm -rf ../ace/src
mv build/src* ../ace/src
cp ace.d.ts ../ace/src
