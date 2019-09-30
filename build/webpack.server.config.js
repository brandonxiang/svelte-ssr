// const mode = process.env.NODE_ENV || 'development';
const mode = 'production';

module.exports = {
	entry: {
		server: ['./src/entry-server.js']
	},
	resolve: {
		extensions: ['.mjs', '.js', '.svelte']
	},
	output: {
		libraryTarget: 'commonjs2',
		path: __dirname + '/dist',
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
						emitCss: true,
						hotReload: true,
						hydratable: true,
						generate: 'ssr',
					}
				}
			},
		]
	},
	mode,
};