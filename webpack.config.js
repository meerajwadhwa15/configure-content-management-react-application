var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'dist/bundle.js'
  },

  plugins: [new ExtractTextPlugin("dist/css/styles.css")],

  module: {
    rules: [
      {
        test: /.jsx?$/, exclude: /node_modules/, loader: "babel-loader", query: {
          presets: ['es2015', 'react']
        }
      },

      {
        test: /\.scss|.css$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }]
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  }
}