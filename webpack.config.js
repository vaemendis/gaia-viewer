const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const distDir = path.join(__dirname, "dist/public/");

module.exports = {
  context: path.join(__dirname, 'app/assets'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  output: {
    path: distDir,
    filename: "javascript/[name].js"
  },
  entry: {
    main: "./typescript/index"
  },
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader?configFile=app/assets/tsconfig.json"
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader", "resolve-url-loader"],
          fallback: "style-loader"
        })
      },
      // {
      //   test: /\.scss$/,
      //   use: ExtractTextPlugin.extract({
      //     use: [{
      //       loader: "css-loader"
      //     }, {
      //       loader: "resolve-url-loader"
      //     }, {
      //       loader: "sass-loader?sourceMap"
      //     }],
      //     fallback: "style-loader"
      //   })
      // },
      {
        test: /\.(ttf|eot|svg|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "file-loader?publicPath=../&name=./files/[hash].[ext]"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "url-loader?publicPath=../&name=./files/[hash].[ext]&limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.png$/,
        use: "url-loader?publicPath=../&name=./files/[hash].[ext]&limit=10000&mimetype=image/png"
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
      context: __dirname,
      from: "node_modules/jquery/dist/jquery.min.js",
      to: "javascript"
    // }, {
    //   context: __dirname,
    //   from: "node_modules/popper.js/dist/umd/popper.min.js",
    //   to: "javascript"
    // }, {
    //   from: 'images/profile-joined-litnovel.png',
    //   to: 'images'
    }]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      // Popper: ['popper.js', 'default']
    }),
    // new ExtractTextPlugin("stylesheets/styles.css"),
    new HtmlWebpackPlugin({
      // minify: {removeAttributeQuotes: false}, // pour conserver les quotes dans les contenus remplacés par node
      // HtmlWebpackPlugin, par défaut, essaie de parser les fichiers avec le template lodash qui ressemble à ejs
      // Au contraire, on ne veux que pas que l'ejs soit parsé et templaté par webpack, on le traite comme du html simple
      template: 'views/index.html',
      filename: path.join(distDir, 'index.html')
    })
  ],
  // externals: {
  //   jquery: 'jQuery'
  // }
}