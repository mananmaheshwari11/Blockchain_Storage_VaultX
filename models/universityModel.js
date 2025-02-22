import mongoose from 'mongoose';

const universityModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'University name is required'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  email:{
    type:String,
    required:true,
    unique:true
    },
  password:{
    type:String,
    required:true,
    }
}, 
{timestamps: true});


export default mongoose.model('universityModel',universityModel);