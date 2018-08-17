const path = require('path');

module.exports = {
  entry: './ui/index.tsx',
  mode: 'development',
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'ui.js',
    path: path.resolve(__dirname, 'app', 'dist')
  }
};