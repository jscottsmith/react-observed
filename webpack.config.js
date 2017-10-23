const webpack = require('webpack');
const path = require('path');

const ROOT = path.resolve('./');
const DIST = path.resolve('./dist');
const SRC = path.resolve('./src');
const DEMO = path.resolve('./demo');

const clientConfig = {
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
    },

    entry: path.resolve(DEMO + '/client.js'),

    output: {
        path: DIST,
        filename: 'bundle.js',
    },

    resolve: {
        alias: {
            'react-observed': SRC,
            components: path.resolve(DEMO + '/components'),
        },
    },

    module: {
        rules: [
            {
                test: /\.(html)$/,
                loader: 'file-loader?name=[name].[ext]',
            },
            {
                test: /\.js$/,
                include: [DEMO, SRC],
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                include: [DEMO],
                loaders: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        query: {
                            localIdentName: '[name]_[local]_[hash:base64:3]',
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        query: {
                            outputStyle: 'expanded',
                        },
                    },
                ],
            },
        ],
    },
};

module.exports = clientConfig;
