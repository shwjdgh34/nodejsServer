# Server

# TOC

## implement server with basic http code

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') {
        res.end('this is the OVERVIEW');
    } else if (pathName === '/product') {
        res.end('this is the PRODUCT');
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
```
