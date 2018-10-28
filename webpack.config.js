'use strict';

const webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: ['./src/index.js'],
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react']
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
//            {
//                test: /\.scss$/,
//                use: [
//                    "style-loader", // creates style nodes from JS strings
//                    "css-loader", // translates CSS into CommonJS
//                    {
//                        loader: "sass-loader",
//                        options: {
//                            includePaths: ["./src"]
//                        }
//                    }
//                ]
//            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    },
    watchOptions: {
        poll: true
    }
};