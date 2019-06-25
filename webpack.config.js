const webpack = require('webpack')
const path = require('path')
module.exports = {
    mode:'development',
    entry:{
        index:path.resolve(__dirname,'src/index.js')
    },
    output:{
        path: path.resolve(__dirname,'dist'),
        filename:'[name].js'
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react','es2015']
                    }
                },
                exclude: '/node_modules/'
            }
        ]
    },
    devServer:{
        port:9000,
        contentBase:path.resolve(__dirname, 'dist')
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
    ]
}