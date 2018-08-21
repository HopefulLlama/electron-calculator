const fs = require('fs');
const path = require('path');

const files = [
  {
    source: path.join(__dirname, '..', 'node_modules', 'bulma', 'css', 'bulma.min.css'),
    dest: path.join(__dirname, '..', 'app', 'dist', 'bulma.min.css')
  }
];

files.forEach(file => fs.copyFileSync(file.source, file.dest));