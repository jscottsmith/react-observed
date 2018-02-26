const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const ROOT = path.resolve('./');
const DIST = path.resolve('./dist');
const SRC = path.resolve('./src');
const DEMO = path.resolve('./demo');
const STORIES = path.resolve('./stories');

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
                include: [DEMO, STORIES],
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

const serverConfig = {
    target: 'node',

    watch: true,

    node: {
        __dirname: true,
    },

    externals: [nodeExternals()],

    entry: path.resolve(DEMO + '/server.js'),

    output: {
        path: DIST,
        filename: 'server.js',
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
                test: /\.js$/,
                include: [DEMO, SRC],
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                include: [DEMO],
                loaders: [
                    {
                        loader: 'css-loader/locals',
                        query: {
                            localIdentName: '[name]_[local]_[hash:base64:3]',
                            sourceMap: false,
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

module.exports = [clientConfig, serverConfig];
