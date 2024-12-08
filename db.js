import mongoose from "mongoose";

const connect =async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
        });
        console.log("Connection Successful");
    }catch(error){
        console.log("error"+error);
    }
}

export default connect;