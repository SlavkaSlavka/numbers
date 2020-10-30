'use strict';

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const Path = require('path');

const dest = Path.join(__dirname, '../dist');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: dest,
        inline: true,
        hot: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader?sourceMap=true', 'postcss-loader', 'resolve-url-loader', 'sass-loader'],
            },
        ]
    }
});
