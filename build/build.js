const webpack = require('webpack')
const path = require('path');
const webpackServerConfig = require('./webpack.server.config.js');
const getWebpackClientConfig = require('./webpack.client.config.js');

const compilerServer = webpack(webpackServerConfig)

compilerServer.run(async (err) => {
  if(err) {
    console.log(err)
  } else {

    const AppServer = require('../dist/server').default;
    const App = await AppServer.render()
    App.head += `<style>${App.css.code}</style>`;

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