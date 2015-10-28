var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function dirPath(dest){
	return path.resolve(__dirname, dest);
};
function webPath(dest){
	return dirPath('app/' + dest);
};

var config = {
	entry: [
		webPath('scss/style.scss'),
		webPath('js/main.js')
	],
	output: {
		path: process.env.NODE_ENV === 'production' ? dirPath('dist') : dirPath('build'),
		filename: 'js/bundle.js'
	},
	module: {
		loaders: [{
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract('style', 'css!sass')
		},
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel'
		}]
	},
	plugins: [
		new ExtractTextPlugin('css/style.css'),
		new HtmlWebpackPlugin({
			template: webPath('index.html'),
			inject: 'body'
		})
	]
};

// production mode
if(process.env.NODE_ENV === 'production'){
	config.plugins.push(
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({minimize: true})
	);
} else {
	config.entry.push(
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://localhost:8080'
	);
}

module.exports = config;