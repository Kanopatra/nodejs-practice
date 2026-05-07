// import http from 'http';
// import fs from 'fs';
// import url from 'url';

// const server = http.createServer((req, res) => {

//   const MyUrl = url.parse(req.url, true);

//   const logs = `${req.method}: ${req.url}\n`;

//   // write log
//   fs.appendFile('logs.txt', logs, (err) => {
//     if (err) {
//       console.log('Error writing log');
//     }
//   });
// console.log(MyUrl);
//   // routing
//   switch (MyUrl.pathname) {
//     case '/':
//       res.end('Welcome to the Home Page');
//       break;

//     case '/about':
//       const userName = MyUrl.query.myname || 'Guest';
//       res.end(`Welcome to the About Page, ${userName}!`);
//       break;
//       case '/signup':if(req.method === 'GET'){
//         res.end('Welcome to the Signup Page');
//       }
// else if(req.method === 'POST'){
//         res.end('Signup successful');
//       }
    
// break;
//     default:
//       res.statusCode = 404;
//       res.end('Page Not Found');
//   }

// });

// server.listen(3000, () => {
//   console.log('Server running on port 3000');
// });



import express from 'express'



const App=express()

App.get("/",(req, res)=>{
    return res.send(`Hello welcome to home `)
})
 App.get("/about",(req, res)=>{
    console.log("url====",req.query)
    return res.send(`Hello welcome to home ${req.query.name}`)
})


App.listen(3000,()=>console.log(" server started"))