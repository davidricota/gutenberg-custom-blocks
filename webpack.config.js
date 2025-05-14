const defaultConfig = require("@wordpress/scripts/config/webpack.config")
const path = require("path")

module.exports = {
  ...defaultConfig,
  entry: {
    index: path.resolve(__dirname, "src/js/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },
  // Use the default module rules from @wordpress/scripts
  // This avoids conflicts with CSS processing
}
