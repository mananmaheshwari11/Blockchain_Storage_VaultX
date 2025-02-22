import express from "express";
import {
  getAllUniversity,
  getCertificate,
  loginUniversity,
  registerUniversity,
  uploadCertificate,
  registerStudent,
  loginStudent,
  getStudent
} from "../controller/UniversityController.js";
import { checkRole, RequireSignIn } from "../helpers/authMiddleware.js";
const route = express.Router();

route.post("/", registerUniversity);
route.post("/user", loginUniversity);
route.post("/user/:uid",RequireSignIn,checkRole,uploadCertificate);
route.get("/user", getAllUniversity);
route.post("/certificate",RequireSignIn,getCertificate);
route.post('/student',registerStudent);
route.post('/student/login',loginStudent);
route.get('/student/:sid',RequireSignIn,getStudent);

export default route;