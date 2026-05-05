// =======first approch
// const math=require('./math');
// console.log( "Add value",math.add(3,5),math.subtract(10,4));
// Second approch  =========
// const {add,subtract}=require('./math');
// console.log( "Add value",add(3,5),subtract(10,4));

import  http from 'http';
import fs from 'fs';
const server=http.createServer((req,res)=>{{
   const logs= fs.appendFile('requests.log', `${req.method} ${req.url}\n`, (err) => {});
console.log(`Received ${req.method} request for ${req.url}`);
res.end("Welcome to Node.js server!")


}})
server.listen(3000);