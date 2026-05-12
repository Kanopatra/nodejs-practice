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
import mongoose from 'mongoose'


const app=express();

const PORT =3000;
mongoose.connect("mongodb://127.0.0.1:27017/NodeJs_Practice").then(()=>console.log("Mongoose connected")).catch((err)=>console.log("Mongoose err",err))
//Schema
const UsersSchema= new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String
    },
   email: {
    type:String,
    required:true,
    unique:true

    },
    job_title:{
        type:String
    },
    gender:{
        type:String
    }
},{timestamps:true})

const User=mongoose.model("user",UsersSchema)

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



app.get('/api/users',async(req,res)=>{
       const allUsers = await User.find({});
       if(!allUsers){
        return res.status(200).json({StatusMsg})
       }
    // console.log("headers",req.headers)
  return  res.status(200).json(allUsers)
}
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

app.post('/api/users',async(req,res)=>{
    const body=req.body;
        console.log("Body",body)
        if(!body||!body.first_name||!body.last_name||!body.email||!body.gender||!body.job_title){
         return res.status(400).json({status:"All field are required"})
        }

const result=await User.create({
    first_name:body.first_name,
    last_name:body.last_name,
    email:body.email,
    gender:body.gender,
    job_title:body.job_title
})
console.log("result",result)
return res.status(200).json({status:"created Successfully",result})
   
})


//here '/api/users/:id' is common for all method so we need to merge it

app.route('/api/users/:id')

.get(async(req, res) => {
   

    const user = await User.findById(req.params.id);
if(!user){
    res.status(404).json({status:'Not Found'})
}
    return res.status(200).json(user);
})

.patch(async(req, res) => {
    const id=Number(req.params.id);
 const user = await User.findByIdAndUpdate(req.params.id,{last_name:"changed"});
if(!user){
       return res.json({ status: "user not found" });
}
//  user.first_name=req.body.first_name|| user.first_name;
//  user.last_name = req.body.last_name || user.last_name;
//     user.email = req.body.email || user.email;

    return res.json({ status: "Updated Successfully",id:user.id });
})


.delete(async(req, res) => {
//     const id= Number(req.params.id);
//     const index=users.findIndex(users=>users.id===id)
//       const deletedUser = users[index];
// users.splice(index,1)
const deletedUser=await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "user Deleted successfully",id:deletedUser.id});
});


app.listen(PORT,()=>{
    console.log("server started on PORT",PORT)
})

