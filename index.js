const http = require('http');
const fs = require('fs');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate.js');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data); // JSON.parse method transform string to objec

const tmpltOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  'utf-8'
);
const tmpltProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  'utf-8'
);
const tmpltCard = fs.readFileSync(
  `${__dirname}/templates/product_card.html`,
  'utf-8'
);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview
  if (pathname === '/' || pathname === '/overview') {
    const cardsHtml = dataObj
      .map(el => replaceTemplate(tmpltCard, el))
      .join('');
    const output = tmpltOverview.replace(/{%PRODUCT_CARD%}/g, cardsHtml);
    res.writeHeader(200, { 'Content-Type': 'text/html' });
    res.end(output);
  }
  // Product
  else if (pathname === '/product') {
    const product = dataObj[query.id];
    if (product === undefined) {
      res.writeHeader(200, { 'Content-Type': 'text/html' });
      res.end('no product');
    } else {
      const output = replaceTemplate(tmpltProduct, product);
      res.writeHeader(200, { 'Content-Type': 'text/html' });
      res.end(output);
    }
  }
  // API
  else if (pathname === '/api') {
    res.writeHeader(200, { 'Content-Type': 'application/json' });
    res.end(data); // end method needs to send back a string not an object.
  }
  // Not Founded
  else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
      nono: 'nono'
    });
    res.end('<h1>Page not founded!</h1>');
  }
});
server.listen(8000, '127.0.0.1', () => {
  console.log('listening to requests on port 8000');
});
