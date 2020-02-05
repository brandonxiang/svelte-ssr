const getServerRender = async () => {
  const { default: AppServer, preload } = require('../dist/server');
  let propsData = {};
  if (preload) {
    propsData = await preload();
  }
  const App = await AppServer.render(propsData);
  App.head += `<style>${App.css.code}</style>`;
  App.context += `<script>window.context = ${JSON.stringify(
    propsData
  )}</script>`;
  return App;
};

module.exports = {
  getServerRender,
};
