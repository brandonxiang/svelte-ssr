const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const config = require('./webpack.base.config');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = ssrContent =>
  merge(config, {
    entry: {
      bundle: ['./src/entry-client.js'],
    },
    output: {
      path: path.join(__dirname, '..', '/dist'),
      filename: '[name].js',
      chunkFilename: '[name].[id].js',
    },
    module: {
      rules: [
        {
          test: /\.svelte$/,
          exclude: /node_modules/,
          use: {
            loader: 'svelte-loader',
            options: {
              hydratable: true,
              emitCss: true,
              hotReload: true,
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            /**
             * MiniCssExtractPlugin doesn't support HMR.
             * For developing, use 'style-loader' instead.
             * */
            prod ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
      ],
    },
    mode,
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new CopyPlugin([{ from: './public', to: './static' }]),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        ssr: ssrContent,
      }),
    ],
    devtool: prod ? false : 'source-map',
  });
