const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    index: ['webpack/hot/only-dev-server', './app/index.jsx'],
    splash: './app/splash.jsx',
  },
  output: {
    path: path.join(__dirname, './dist/app'),
    filename: 'js/[name].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        loader: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: ['json-loader'],
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[ext]',
        },
      },
      {
        test: /\.(html)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.(svg|png)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/icons/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, '/dist/app'),
    compress: true,
    port: 9000,
  },
};
