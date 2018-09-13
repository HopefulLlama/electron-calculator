const {Application} = require('spectron');

const path = require('path');

const electronExecutable = process.platform === 'win32' ? 'electron.cmd' : 'electron';
const electronPath = path.join(__dirname, '..', '..', 'node_modules', '.bin', electronExecutable);

const appPath = path.join(__dirname, '..', '..', 'app', 'app.js');

function createApp() {
  return new Application({
    path: electronPath,
    args: [appPath]
  });
}

module.exports = {
  createApp,
};