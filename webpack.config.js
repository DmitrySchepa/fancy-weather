const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (env, options) => ({
	devtool: options.mode === 'development' ? 'eval-source-map' : false,
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
	},
	entry: './src/index.js',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: { minimize: true },
					},
				],
			},
			{
				test: /\.(css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							context: path.resolve(__dirname, 'src'),
							name: '[path][name].[ext]',
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|ttf|otf|eot)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							context: path.resolve(__dirname, 'src'),
							name: '[path][name].[ext]',
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html',
		}),
		new MiniCssExtractPlugin(),
	],
	watchOptions: {
		ignored: ['/node_modules/'],
	},
});
