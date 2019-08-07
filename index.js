const polka = require('polka');
const App = require('./dist/server').default
const sirv = require('sirv');
const compress = require('compression')();

const assets = sirv('dist', {
  maxAge: 31536000, // 1Y
  immutable: true
});

polka()
  .use(compress, assets)
  .get('/',(req, res) => {
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
          <script src="./bundle.js"></script>
        </body>
      </html>
    `)
  })
  .listen(3000, err => {
    if (err) throw err;
    console.log(`> Running on localhost:3000`);
  });