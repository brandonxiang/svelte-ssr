const webpack = require('webpack')
const webpackServerConfig = require('./webpack.server.config.js');
const getWebpackClientConfig = require('./webpack.client.config.js');
const { getServerRender } = require('./utils');

const compilerServer = webpack(webpackServerConfig)

compilerServer.run(async (err) => {
  if(err) {
    console.log(err)
  } else {
    const App = await getServerRender();
    const webpackClientConfig = getWebpackClientConfig(App)
    const compileClient = webpack(webpackClientConfig)

    compileClient.run(async (err) => {
      if(err) {
        console.log(err)
      } else {

      }
    })
  }
})