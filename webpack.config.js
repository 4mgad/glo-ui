'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let packageDotJsonObj = JSON.parse(fs.readFileSync(__dirname + '/package.json', 'utf8'));
let {name, dependencies} = packageDotJsonObj;

module.exports = {
	entry: path.join(__dirname, 'index.jsx'),

	output: {
		path: path.join(__dirname, '/'),
		filename: 'index.js',
		library: name,
		libraryTarget: "umd"
	},

	externals: Object.keys(dependencies),

	resolve: {
		extensions: ['.js', '.jsx']
	},

	resolveLoader: {
		modules: ['node_modules'],
	},

	module: {
		rules: [{
			test: /\.s?css$/,
			loader: ExtractTextPlugin.extract('css-loader!postcss-loader!sass-loader')
		}, {
			test: /\.jsx$/,
			loader: 'babel-loader'
		}]
	},

	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new ExtractTextPlugin('styles.css'),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
				screw_ie8: true
			}
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
		new CopyWebpackPlugin([
			{from: './images', to: './images'}
		])
	]

};
