#npm install

ELECTRON_MODULE_DIR=./node_modules/electron
#ELECTRON_MODULE_DIR=./node_modules/electron-nightly

sudo chown root.root $ELECTRON_MODULE_DIR/dist/chrome-sandbox
sudo chmod 4755 $ELECTRON_MODULE_DIR/dist/chrome-sandbox
