import mongoose from "mongoose";

const certificatesModel=new mongoose.Schema({
    uid: {
        type: mongoose.ObjectId,
        ref:"universityModel",
        required:true
    },
    hash:{
        type:String,
        required:true
    },
    block:{
        type:String,
        required:true
    },
    type:{
        type:mongoose.ObjectId,
        ref:"typeModel",
        required:true
    }
},{timestamps:true})

export default mongoose.model("certificateModel",certificatesModel);