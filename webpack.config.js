const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "./css/[name].css",
    disable: process.env.NODE_ENV === "development",
    allChunks: true
});

const config = {
  entry: './src/js/mkdocs_ponylang.js',
  output: {
    path: path.resolve(__dirname, 'mkdocs_ponylang'),
    filename: './js/bundle.js'
  },
  plugins: [
    extractSass//,
    //new UglifyJsPlugin()
  ],
  devServer:{
    contentBase: path.join(__dirname, "mkdocs_ponylang")
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: 'resolve-url-loader'
            },
            {
              loader: "sass-loader",
              options: {
                includePaths: [
                  path.resolve(__dirname, 'node_modules','bourbon','app','assets','stylesheets'),
                  path.resolve(__dirname, 'node_modules','bourbon-neat','app','assets','stylesheets'),
                  path.resolve(__dirname, 'node_modules','font-awesome','scss'),
                  path.resolve(__dirname, 'node_modules','wyrm','sass')
                ],
                outputStyle: "compact" // nested, expanded, compact, compressed
              }
            }
          ]
        })
      },
      {
          test: /\/fonts\/.+\.(eot|svg|ttf|woff|woff2)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '/fonts/[name].[ext]'
            }
          }]
      },
      {
        test: /\/img\/.+/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '/img/[name].[ext]'
          }
        }]
      }
    ]
  }
};

module.exports = config;
