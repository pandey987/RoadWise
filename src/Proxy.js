const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = createProxyMiddleware({
    target: 'http://localhost:8080', // GeoServer URL
    changeOrigin: true,
    pathRewrite: {
        '^/geoserver': '' // Strip '/geoserver' from the request path
    }
});

module.exports = function(app) {
    app.use('/geoserver', proxy);
};
