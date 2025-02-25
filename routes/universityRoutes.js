import express from "express";
import {
  getAllUniversity,
  getCertificate,
  loginUniversity,
  registerUniversity,
  uploadCertificate,
  registerStudent,
  loginStudent,
  getStudent,
  createTypes,
  getAllTypes,
  updateTypes,
  updateCertificate,
  updateUniversity,
  getUniversity
} from "../controller/UniversityController.js";
import { checkRole, RequireSignIn } from "../helpers/authMiddleware.js";
const route = express.Router();

route.post("/", registerUniversity);
route.post("/user", loginUniversity);
route.put("/user/:uid",RequireSignIn,updateUniversity);
route.post("/user/:uid",RequireSignIn,uploadCertificate);
route.put("/user",RequireSignIn,updateCertificate)
route.get("/user", getAllUniversity);
route.get('/user/:uid',RequireSignIn,getUniversity)
route.post("/certificate",RequireSignIn,getCertificate);
route.post('/individual',registerStudent);
route.post('/individual/login',loginStudent);
route.get('/individual/:sid',RequireSignIn,getStudent);
route.post('/types/:uid',RequireSignIn,createTypes);
route.get('/types/:uid',RequireSignIn,getAllTypes);
route.put('/types/:uid',RequireSignIn,updateTypes)
route.get('/check',RequireSignIn,(req,res)=>{
    res.status(200).send({
      ok:true,
      _id:req.user._id,
      email:req.user.email,
      role:req.user.role
    })
})
export default route;