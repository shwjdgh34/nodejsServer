# Server

# TOC

## Better practices

1. __dirname

```javascript
fs.readFile('./dev-data/data.json')
fs.readFile(`${__dirname}/dev-data/data.json`) // this is better prctice
```

> the dot is where the script is running, and __dirname is where the current file is located

## JSON.parse

> [JSON.parse MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string.

```javascript
var json = '{"result":true, "count":42}';
obj = JSON.parse(json);

console.log(obj.count);
// expected output: 42

console.log(obj.result);
// expected output: true
```

## Header

### Content-type

1. text/html
2. application/json
3. multipart/form-data

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
