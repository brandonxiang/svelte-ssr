const merge = require('webpack-merge')
const path = require('path');
const config = require('./webpack.base.config')

const serverConfig = {
	entry: {
		server: ['./src/entry-server.js']
	},
	output: {
		libraryTarget: 'commonjs2',
		path: path.join(__dirname, '..','dist'),
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						css: false,
						generate: 'ssr',
					}
				}
			}
		]
	},
};

module.exports = merge(config, serverConfig);