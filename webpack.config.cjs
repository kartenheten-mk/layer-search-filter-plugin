const path = require('path');

function createConfig({ development, minified = false }) {
  return {
    name: minified ? 'minified' : development ? 'development' : 'readable',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: minified ? 'layer_search_filter.min.js' : 'layer_search_filter.js',
      library: {
        name: 'LayerSearchFilter',
        type: 'var',
        export: 'default'
      },
      chunkLoading: false,
      clean: false
    },
    optimization: {
      minimize: minified,
      runtimeChunk: false,
      splitChunks: false
    },
    devtool: development ? 'inline-source-map' : false,
    performance: {
      hints: false
    }
  };
}

module.exports = (_environment, argv = {}) => {
  const development = argv.mode === 'development';
  const readableConfig = createConfig({ development });

  return development
    ? readableConfig
    : [readableConfig, createConfig({ development, minified: true })];
};
