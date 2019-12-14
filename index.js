const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') {
        res.end('this is the OVERVIEW');
    } else if (pathName === '/product') {
        res.end('this is the PRODUCT');
    } else if (pathName === '/api') {
        fs.readFile(`${__dirname}/dev-data/data.json`, (err, data) => {
            const productData = JSON.parse(data);   // JSON.parse method transform string to object
            res.writeHeader(200, { 'Content-Type': 'application/json' });
            res.end(data);  // end method needs to send back a string not an object. 
            if (err) {
                throw err;
            }
        })

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