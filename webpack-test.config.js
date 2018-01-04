const glob = require('glob');
const path = require('path');

const config = {
  entry: {
    test: glob.sync('./test/**/test-*.js'),
  },
  output: {
    path: path.join(__dirname, './dist/test'),
    filename: '[name].bundle.js',
  },
  node: {
    fs: 'empty',
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
        test: /\.(svg|png)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/icons/[name].[ext]',
        },
      },
    ],
  },
};


module.exports = config;
