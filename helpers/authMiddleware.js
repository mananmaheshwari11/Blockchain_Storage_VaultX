import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

export const hashedPassword=async(string)=>{
    try{
        const salt_value=10
        const hashed= await bcrypt.hash(string,salt_value)
        return hashed;
    }
    catch(error){
        console.log("error in password encryption")
        console.log(error)
    }
}

export const checkPassword=async(password1,password2)=>{
    try {
        const value= await bcrypt.compare(password1,password2)
        return value;
    } catch (error) {
        console.log("Error in password decryption")
    }
}

export const generateHash=async(email,dob,type)=>{
    try {
        const value=email+dob+(type.toString());
        return crypto.createHash("sha256").update(value).digest("hex")
    } catch (error) {
        console.log("error in creating credentials")
    }
}

dotenv.config()

export const RequireSignIn=async(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token){
        return res.status(402).send({message:"Unauthorized user,Access Denied!"})
    }
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    req.user= decode;
    next();
}

// 🔹 Middleware to Check User Role
export const checkRole = () => {
    return (req, res, next) => {
      if (!req.user || req.user.role !== 1) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }
      next();
    };
  };
  