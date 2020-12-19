const { createProxyMiddleware } = require('http-proxy-middleware');
const { bridge, username } = require('./config.json');

const apiProxy = createProxyMiddleware(['/api'], {
  target: bridge,
  changeOrigin: true,
  pathRewrite: {
    '^/api': `/api/${username}`
  }
});

module.exports = {
  port: 8080,
  cors: true,
  files: [
    "./src/**/*.{html,htm,css,js}"
  ],
  server: {
    // Start from key `10` in order to NOT overwrite the default 2 middleware provided
    // by `lite-server` or any future ones that might be added.
    // Reference: https://github.com/johnpapa/lite-server/blob/master/lib/config-defaults.js#L16
    middleware: {
      10: apiProxy,
    },
    baseDir: "./src"
  }
};