const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/app.js', 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  target: 'node',
  externals: [nodeExternals()], 
  mode: process.env.NODE_ENV || 'development',
  devtool: 'source-map',
};
