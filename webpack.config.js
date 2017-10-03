const path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: ['webpack/hot/only-dev-server', './app/index.jsx'],
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/built/'
  },
  devServer: {
    contentBase: './public',
    publicPath: 'http://localhost:8080/built/'
  },
  module: {
    loaders: [
      { test: /\.js$|.jsx$/, loader: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, loader: ['style-loader', 'css-loader', 'sass-loader']}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}