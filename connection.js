import mongoose from "mongoose";

async function connectMonngoDb(url){
   return mongoose.connect(url)
}

export default connectMonngoDb;