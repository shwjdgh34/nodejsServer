const http = require('http');
const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const productData = JSON.parse(data);   // JSON.parse method transform string to object


const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') {
        res.end('this is the OVERVIEW');
    } else if (pathName === '/product') {
        res.end('this is the PRODUCT');
    } else if (pathName === '/api') {
        res.writeHeader(200, { 'Content-Type': 'application/json' });
        res.end(data);  // end method needs to send back a string not an object. 
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'nono': 'nono'
        });
        res.end('<h1>Page not founded!</h1>');
    }
})
server.listen(8000, '127.0.0.1', () => {
    console.log('listening to requests on port 8000');
});