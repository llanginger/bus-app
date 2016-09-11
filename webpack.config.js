module.exports = {

  entry: "./src/js/app.js",
  output: {
    path: __dirname,
    filename: "./dist/js/app.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel",
      query: {
        presets: ["es2015", "react"]
      }
    }]
  }

}
