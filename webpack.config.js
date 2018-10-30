const path = require('path');
 
module.exports = {
  context: path.join(__dirname, 'CLIENT'),
  entry: [
    './components/main.jsx',
  ],
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]    
    // rules: [
    //   {
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     use: [
    //       'babel-loader',
    //     ],
    //   },
    // ],
  },
  resolve: {
    extensions: [".js", ".json", ".jsx"],
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
  },
};