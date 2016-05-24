var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './app/app',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            _: 'underscore'
        }),
        new ExtractTextPlugin('style.css')
    ],
    devtool: 'source-map',
    watch: true,
    resolve: {
        root: path.resolve('./app'),
        alias: {
            'models': 'models',
            'collections': 'collections',
            'components': 'components',
            'dispatcher': 'dispatcher',
            'generateBlocks': 'generateBlocks',
            'main': 'components/Main/Main'
        }
    },
    module: {
        loaders: [
            {
                test: /\.ejs$/,
                loader: 'ejs-compiled'
            },
            {
                test: /\.styl/,
                loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!stylus?resolve url')
            }
        ]
    }
};