const { createProxyMiddleware } = require("http-proxy-middleware");
const proxyTarget = process.env.REACT_APP_PROXY_URL || 'https://e-class-webapp.onrender.com/';

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({ target:proxyTarget, changeOrigin: true })
  );
};
