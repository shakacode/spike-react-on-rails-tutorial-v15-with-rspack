const { generateRspackConfig, merge } = require('shakapacker/rspack')

const clientConfig = generateRspackConfig({
  // Client-specific configuration
  target: 'web',
})

// For server config, we need to ensure proper Node.js configuration
const baseServerConfig = generateRspackConfig()
const serverConfig = merge(baseServerConfig, {
  // Server-specific configuration for SSR
  target: 'node',
  output: {
    globalObject: 'global',
    library: {
      type: 'commonjs2'
    }
  },
  resolve: {
    mainFields: ['main', 'module'],
  },
  optimization: {
    minimize: false
  }
})

// Return appropriate config based on environment variables
if (process.env.WEBPACK_SERVE || process.env.CLIENT_BUNDLE_ONLY) {
  console.log('[React on Rails] Creating only the client bundle for rspack.');
  module.exports = clientConfig;
} else if (process.env.SERVER_BUNDLE_ONLY) {
  console.log('[React on Rails] Creating only the server bundle for rspack.');
  module.exports = serverConfig;
} else {
  console.log('[React on Rails] Creating both client and server bundles for rspack.');
  module.exports = [clientConfig, serverConfig];
}