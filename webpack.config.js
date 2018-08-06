import webpack from 'webpack';

import webpackMerge from 'webpack-merge';

import HtmlWebpackPlugin from 'html-webpack-plugin';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const milieu = process.env.NODE_ENV || 'development';

import myIp from 'my-ip';

const APP_PATH = process.cwd();

const {
	entry
} = require('./package.json');

const config = {
	mode: milieu,
	entry,
	output: {
		path: `${APP_PATH}/dist`,
		filename: '[name].js'
	},
	module: {
		rules: [{
			test: /\.js?$/,
			loader: 'babel-loader',
		},
		{
			test: /\.(css|scss)$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'sass-loader'
			]
		},
		{
			test: /\.less$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'less-loader',
			],
		},
		{
			test: /\.(png|jpg|gif|eot|ttf|woff|woff2|svg)$/,
			loader: 'url-loader',
			options: {
				limit: 10000
			}
		},
		{
			test: /\.html$/i,
			use: 'html-loader'
		}
		]
	},
	devServer: {
		host: milieu === 'development' ? 'localhost' : myIp(),
		port: '8989'
	},
	optimization: {
		minimize: milieu === 'production' ? true : false,
		namedModules: true,
		noEmitOnErrors: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/test-index.html',
			inject: false,
			minify: {
				removeAttributeQuotes: milieu === 'production' ? true : false
			}
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new webpack.EvalSourceMapDevToolPlugin({
			filename: '[name].js.map',
		}),
	]
};


export default config;