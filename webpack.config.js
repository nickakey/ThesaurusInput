const path = require('path');
 
module.exports = {
  context: path.join(__dirname, 'src'),
  entry: [
    './reusableComponents/ThesaurusInput.jsx',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
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
  externals: {
    'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
  },
};
