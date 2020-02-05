const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');
const webpackServerConfig = require('./webpack.server.config.js');
const getWebpackClientConfig = require('./webpack.client.config.js');
const { getServerRender } = require('./utils');

const compilerServer = webpack(webpackServerConfig)

compilerServer.run(async (err, stats) => {
  if(err) {
    console.log(err)
  } else {
    const App = await getServerRender();
    const webpackClientConfig = getWebpackClientConfig(App)
    const compileClient = webpack(webpackClientConfig)

    const server = new WebpackDevServer(compileClient, {
      contentBase: path.join(__dirname, 'public'),
      compress: true,
      open: false,
    })

    server.listen(9000, "localhost", function() {});
  }
})