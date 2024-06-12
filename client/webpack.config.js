const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.

module.exports = () => {
  // pulling files 
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      database:'./src/js/database.js',
      editor:'./src/js/editor.js',
      header:'./src/js/header.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({ 
        template: './index.html',
        title: 'Just another text editor'
      }),
      // Creates a manifest.json file.
      new WebpackPwaManifest({
        name: 'Just another text editor',
        short_name: 'Jate',
        description: ' a simple text editing app for writing javascript',
        theme_color: "#225ca3",
        background_color: "#225ca3",
        crossorigin: null,
        start_url: './',
        publicPath: './',
        fingerprints: false,
        inject:true,
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 144, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
            purpose: 'any'
          }
        ]
      })
      
    ],
// TODO: Add CSS loaders and babel to webpack.
    module: {
      rules: [
        { //testing css loaders
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        { //testing babel
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
