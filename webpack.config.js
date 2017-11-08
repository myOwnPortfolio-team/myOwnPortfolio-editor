const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: ['webpack/hot/only-dev-server', './app/index.jsx'],
  output: {
    path: path.resolve('./dist/package/'),
    filename: 'app/js/bundle.js',
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
        test: /\.(ttf|eot|woff|woff2|svg|png)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
