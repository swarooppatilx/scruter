const path = require('path');

module.exports = {
  mode: 'development',
  entry: './views/index.ejs',
  output: {
    filename: 'output.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.ejs$/,
        use: {
          loader: 'ejs-loader',
          options: {
            esModule: true, // Keep this true for ES module support
            variable: 'data' // Use 'data' as the variable name in EJS templates
          }
        }
      }
    ]
  },
  devServer: {
    // contentBase: path.resolve(__dirname, 'views'),
    compress: true,
    port: 9000
  }
};
