const polka = require('polka');
const sirv = require('sirv');
const compress = require('compression')();

const fetch = require('isomorphic-unfetch')
global.fetch = fetch


const CreateApp = require('./dist/server').default

const assets = sirv('dist', {
  maxAge: 31536000, // 1Y
  immutable: true
});

polka()
  .use(compress, assets)
  .get('/', async (req, res) => {
    const App = await CreateApp()
    res.end(`
    <!DOCTYPE html>
      <html lang="en">
        <head>
        <title>Hello</title>
        ${App.head}
        <style>${App.css.code}</style>
        </head>
        <body>
          <div id="server-rendered">
          ${App.html}
          </div>
        </body>
      </html>
    `)
  })
  .listen(3000, err => {
    if (err) throw err;
    console.log(`> Running on localhost:3000`);
  });