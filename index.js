
const fs = require('fs'); /// import coremodel file system
const http =  require('http');
const url = require('url') // a module for urls

console.log(__dirname);
const laptopdata=JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`,`utf-8`)); // getting the json data for the laptop from the data/data.jsopn file
//this callback function runs each time everyone accesses the webserver 
const server = http.createServer((req,res)=> {  //request and response variables

    //Routing: responsse in different ways for different urls
    const url_parseObj =url.parse(req.url,true);
    const pathname=url_parseObj.pathname;
    const query = url_parseObj.query;
    console.log(pathname);
    //Product page
    if(pathname==='/Product' || pathname==='/'){
        res.writeHead(200,{'Content-type' : 'text/html'});
        res.end('this is the product page')
      
    }
    ///Laptop page
    else if (pathname==='/Laptop' && query.id< laptopdata.length){
      res.writeHead(200,{'Content-type':'text/html'});
      res.end(`This is laptop page ${query.id}`);
    }
    //Error page 
    else{
        res.writeHead(200,{'Content-type':'text/html'})
        res.end('Page is not available')

    }





    console.log('Someone acessesed the server');

})

server.listen(1337,'127.0.0.1',()=>{

    console.log('listening for request now')

})
