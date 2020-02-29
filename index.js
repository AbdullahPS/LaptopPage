
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
    if(pathname==='/Products' || pathname==='/'){
        res.writeHead(200,{'Content-type':'text/html'})

        fs.readFile(`${__dirname}/templates/template-overview.html`,'utf-8',(err,data)=>{
            let newOut='';

            fs.readFile(`${__dirname}/templates/template-cards.html`,'utf-8',(err,cards)=>{
               
               let dataNew = laptopdata.map((cur,index)=>fillLaptopdata(cards,index)).join(''); 
               const htmlReplaced=data.replace('{%cards%}',dataNew);
               res.end(htmlReplaced);

            });


        })
      
    }
    ///Laptop page
    else if (pathname==='/Laptop' && query.id< laptopdata.length){
        res.writeHead(200,{'Content-type':'text/html'})

      fs.readFile(`${__dirname}/templates/template-laptop.html`,'utf-8',(err,data)=>{
          let output =fillLaptopdata(data,query.id); //fill the data from the json file
        
          res.end(output);//response to page

      });

    }

    else if((/\.(jpg|jpeg|gif|png)/i).test(pathname)){

        fs.readFile(`${__dirname}/data/img${pathname}`,(err,data)=>{
            res.writeHead(200,{'Content-type':'image/jpg'})
            res.end(data);
        })


    }
    //Error page 
    else{
        res.writeHead(404,{'Content-type':'text/html'})
        res.end('Page is not available')

    }

    console.log('Someone acessesed the server');

})

server.listen(1337,'127.0.0.1',()=>{//

    console.log('listening for request now')

})

const fillLaptopdata=(original,id)=>{ //function for replacing laptopdata

    const laptop=laptopdata[id];
    let output=original.replace(/{%productName%}/g,laptop.productName);
    output=output.replace(/{%image%}/g,laptop.image);
    output=output.replace(/{%price%}/g,laptop.price);
    output=output.replace(/{%cpu%}/g,laptop.cpu);
    output=output.replace(/{%ram%}/g,laptop.ram);
    output=output.replace(/{%description%}/g,laptop.description);
    output=output.replace(/{%id%}/g,id);
    output=output.replace(/{%storage%}/g,laptop.storage);
    output=output.replace(/{%screen%}/g,laptop.screen);




   return output; 
}