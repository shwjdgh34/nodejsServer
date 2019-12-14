const http = require('http');

const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') {
        res.end('this is the OVERVIEW');
    } else if (pathName === '/product') {
        res.end('this is the PRODUCT');
    }
})
server.listen(8000, '127.0.0.1', () => {
    console.log('listening to requests on port 8000');
});