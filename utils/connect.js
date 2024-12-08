import mongoose from "mongoose";

export async function connectDb(){
    try{
       await mongoose.connect()
       console.log("Connected Successfully");
    }
    catch(error){
        console.log("Error",error);
    }
}