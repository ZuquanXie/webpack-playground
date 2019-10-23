const path = require('path');

const config = {
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
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                 test: /\.(js|jsx)$/,
                 exclude: path.resolve(__dirname, 'node_modules'),
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

if (process.env.mode === 'production') {
    config.mode = 'production';
    config.devtool = 'node';
    config.externals = {
        react: 'react',
        "react-dom": 'reactDom',
    };
} else {
    config.mode = 'development';
}

module.exports = config;