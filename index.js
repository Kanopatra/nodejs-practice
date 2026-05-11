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



// import express from 'express'



// const App=express()

// App.get("/",(req, res)=>{
//     return res.send(`Hello welcome to home `)
// })
//  App.get("/about",(req, res)=>{
//     console.log("url====",req.query)
//     return res.send(`Hello welcome to home ${req.query.name}`)
// })


// App.listen(3000,()=>console.log(" server started"))

import express from 'express';
import users from './MOCK_DATA.json' with { type: 'json' };
import fs from 'fs'
const app=express();

const PORT =3000;
//Middleware
app.use(express.urlencoded({extended:false}))
// app.use((req,res,next) => {
//     // it hold the process it wont allow next 
//     console.log("middleware ")

// }
// )
app.use((req,res,next) => {
    // it cmplete the process and passwed to next middleware
        console.log("middleware 1")
    fs.appendFile('logs.txt',`\n ${Date.now()}:${req.method}: ${req.path}`,(err,data)=>{
        next()

    }

    )

}
)

app.use((req,res,next) => {
    // it cmplete the process and end the res
    console.log("middleware 2")
next()

}
)
app.get('/api/users',(req,res)=>{
  return  res.json(users)}
)

// app.get('/api/users/:id',(req,res)=>{
//     const id=Number(req.params.id);
//     console.log("id ",id)
//     const user=users.find(users=>users.id===id)
//     return res.json(user)
// })


// app.patch('/api/users/:id',(req,res)=>{


//     return res.send("pending")
// })



// app.delete('/api/users/:id',(req,res)=>{


//     return res.send("pending")
// })

app.post('/api/users',(req,res)=>{
    const user=req.body;
        console.log("Body",user)
    users.push({...user,id:users.length+1})
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
       return res.json({status:"successfull",id:users.length })  
    })

   
})


//here '/api/users/:id' is common for all method so we need to merge it

app.route('/api/users/:id')

.get((req, res) => {
    const id = Number(req.params.id);

    const user = users.find(
      user => user.id === id
    );

    return res.json(user);
})

.patch((req, res) => {
    const id=Number(req.params.id);
 const user = users.find(user => user.id === id);
if(!user){
       return res.json({ status: "user not found" });
}
 user.first_name=req.body.first_name|| user.first_name;
 user.last_name = req.body.last_name || user.last_name;
    user.email = req.body.email || user.email;

    return res.json({ status: "Updated Successfully",id:user.id });
})


.delete((req, res) => {
    const id= Number(req.params.id);
    const index=users.findIndex(users=>users.id===id)
      const deletedUser = users[index];
users.splice(index,1)
    return res.json({ status: "user Deleted successfully",id:deletedUser.id});
});


app.listen(PORT,()=>{
    console.log("server started on PORT",PORT)
})

