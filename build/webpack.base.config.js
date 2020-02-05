const mode = process.env.NODE_ENV || 'development';

module.exports = {
	resolve: {
		extensions: ['.mjs', '.js', '.svelte']
	},
	mode,
};