const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const path = require('path')
const os = require('os')
function getHostIP() {
    const network = os.networkInterfaces()
    const keys = Object.keys(network)
    for (let key of keys) {
        if (key.indexOf('VMware') > -1 || key.indexOf('WSL') > -1) {
            // ignore wsl virtual ip
            continue
        }
        const netList = network[key]
        for (let netIndex in netList) {
            const net = netList[netIndex]
            if (net.family === 'IPv4' && net.address !== '127.0.0.1' && !net.internal) {
                return net.address
            }
        }
    }
    return '0.0.0.0'
}
module.exports =
{
    entry: "./src/main.js",
    mode: process.env.NODE_ENV,
    output: {
        clean: true,
    },
    resolve: {
        extensions: ['.js', '.json', '.wasm', '.ts', '.svelte'],
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    devServer: {
        compress: true,
        host: getHostIP(),
        port: 9898,
    },
    module: {
        rules: [
            {
                test: /\.svelte$/,
                use: [
                    {
                        loader: 'svelte-loader',
                        options: {
                            emitCss: true,
                        },
                    },
                ]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: "css-loader"
                    },
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                type: 'asset/resource'
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({ template: './public/index.html' }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
}