const path = require('path');
// const autoprefixer = require('autoprefixer');
const miniCssExtract = require('mini-css-extract-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, 'assets', 'js', 'main.js');
const OUTPUT_DIR = path.join(__dirname, 'static');

const config = {
  entry : ENTRY_FILE,
  mode : MODE,
  devtool: 'cheap-module-source-map', //Uncaught EvalError 해결
  module: {
    rules : [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: miniCssExtract.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      overrideBrowsers: 'cover 99.5%'
                    },
                  ]
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ],
      }
    ]
  },
  output : {
    path: OUTPUT_DIR,
    filename: '[name].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
  ]
};

module.exports = config;