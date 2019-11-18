const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    mode: "development",
    entry: "./src/bootstrap.ts",
    output: {
        path: path.resolve(__dirname, ''),
        filename: './build/bundle.js',
    },
    devtool: "inline-source-map",
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve(path.join(__dirname, 'node_modules'))],
        alias: {
            assets: path.join(__dirname, 'assets/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['ts-loader']
            },
            {
                test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                use: 'base64-inline-loader?name=[name].[ext]'
            }
        ]
    },
    devServer: {
        host:'localhost',
        port: 8080
    },
    performance: { hints: false },
    plugins: [
        new CopyWebpackPlugin([
            { from: './src/assets/', to: './build/assets/' },
        ])
    ]
};