import mongoose, { mongo } from "mongoose";

const typeModel=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    uid:{
        type: mongoose.ObjectId,
        ref:"universityModel",
        required:true
    }
},{timestamps:true})

export default mongoose.model('typeModel',typeModel);