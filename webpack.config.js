const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
	filename: 'bundle.js',
        publicPath: 'dist',
    },
    devtool: 'source-map-inline',
    devServer: {
        contentBase: path.resolve(__dirname, 'static'),
    },
    module: {
        rules: [
            {
                 test: /\.(js|jsx)$/,
                 use: [
                     {loader: 'babel-loader', options: {presets: ['@babel/preset-env', '@babel/preset-react']}},
                 ],
             },
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
        ],
    },
};
