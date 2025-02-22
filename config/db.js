import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connectDb = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("Your Connection has Established!");   
        console.log(`${conn.connection.host}`);
    }
    catch(error){
        console.log("Connection failed!");
    }
}
export default connectDb;