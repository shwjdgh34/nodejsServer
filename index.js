const http = require('http');
const fs = require('fs');


const replaceTemplate = (tmplt, product) => {
    let output = tmplt.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%NUTRIENT%}/g, product.nutrients);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    //if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    output = output.replace(/{%NOT_ORGANIC%}/g, product.organic ? '' : 'not-organic');
    return output;
};

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);   // JSON.parse method transform string to objec

const tmpltOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tmpltProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const tmpltCard = fs.readFileSync(`${__dirname}/templates/product_card.html`, 'utf-8');


const server = http.createServer((req, res) => {
    const pathName = req.url;
    // Overview
    if (pathName === '/' || pathName === '/overview') {
        const cardsHtml = dataObj.map(el => replaceTemplate(tmpltCard, el)).join('');
        const output = tmpltOverview.replace(/{%PRODUCT_CARD%}/g, cardsHtml);
        res.writeHeader(200, { 'Content-Type': 'text/html' });
        res.end(output);
    }
    // Product
    else if (pathName === '/product') {
        res.writeHeader(200, { 'Content-Type': 'text/html' });
        res.end(tmpltProduct);
    }
    // API 
    else if (pathName === '/api') {
        res.writeHeader(200, { 'Content-Type': 'application/json' });
        res.end(data);  // end method needs to send back a string not an object.  
    }
    // Not Founded    
    else {
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