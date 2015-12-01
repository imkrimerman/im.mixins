"use strict";
// retrieving target (npm run `TARGET`)
const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

// dependencies
var path = require('path')
  , _ = require('lodash')
  , webpack = require('webpack')

// helpers
  , join = path.join
  , isArray = Array.isArray
  , isObject = _.isObject
  , merge = _.merge

// paths object
  , paths = {
    root: __dirname,
    bundleFile: 'mixin.js',
    base: function(path) {
      return join.apply(path, [this.root].concat(path));
    },
    src: function(path) {
      return this.base(['src'].concat(path));
    },
    build: function() {
      return this.base(['build']);
    },
    entry: function() {
      return this.src(['delegate.js']);
    },
  };

/**
 * Merges objects
 * @returns {Object}
 */
function merge () {
  var args = _.toArray(arguments).reverse();
  return merge.apply(null, [{}].concat(args).concat([joinArrays]));
};

/**
 * Recursively joins arrays
 * @param {Array} a
 * @param {Array} b
 * @returns {Array|*}
 */
function joinArrays (a, b) {
  if (isArray(a) && isArray(b)) return b.concat(a);
  if (isObject(a) && isObject(b)) return merge(a, b, joinArrays);
  return a;
};

// Common configuration
var common = {
  entry: paths.entry(),
  output: {
    path: paths.build(),
    filename: paths.bundleFile
  },
  module: {
    loaders: [
      { test: /.js?$/, loader: 'babel-loader', exclude: /node_modules/ },
    ]
  }
};

// Development additional configuration
var dev = {
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    // display only errors to reduce the amount of output
    stats: 'errors-only',
    // parse host and port from env so this is easy to customize
    host: process.env.HOST,
    port: process.env.PORT || 3030
  },
  watchOptions: {
    aggregateTimeout: 600
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};

// export config depending on current npm run `TARGET`
module.exports = (TARGET === 'dev' || ! TARGET) ? merge(common, dev) : common;
