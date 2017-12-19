var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var entry = ['./src/A_CLI.ts'];
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

function getGitHash(){
    try {
        return __gitHash;
    } catch (e){
        return "";
    }
}

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

function getAlias(){
    try {
        return __alias;
    } catch (e){
        return {};
    }
}

module.exports = {
    entry:entry,
    target:'node',

    output: {
        path: path.join(__workDir, './dist/cli/'),
        filename: 'CLI.js'
    },

    node: {
        __dirname: true,
        __filename: true
    },

    externals:nodeModules,

    devtool: 'source-map',

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        alias: getAlias()
    },

    stats: {
        colors: true,
        hash: false,
        version: true,
        timings: true,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: true,
        warnings: false,
        publicPath: false
    },

    module: {
        loaders: [
            {
                include:[
                    path.join(__workDir, './src/')
                ],
                test: /\.tsx?$/,
                loader: 'ts-loader?configFile='+path.join(__workDir, './node_modules/@fabalous/runtime-cli/config/tsconfig.json')
            }
        ],
    },

    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':  JSON.stringify("development"),
            'process.env.FABALOUS_RUNTIME': JSON.stringify("cli"),
            'process.env.FABALOUS_DEBUG': JSON.stringify(1),
            'process.env.HASH': JSON.stringify(getGitHash())

        }),
        new ProgressBarPlugin(),
        new webpack.NamedModulesPlugin()
    ]
};