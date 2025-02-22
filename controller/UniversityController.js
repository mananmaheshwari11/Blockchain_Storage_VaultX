import { checkPassword, generateHash, hashedPassword } from "../helpers/authMiddleware.js";
import universityModel from "../models/universityModel.js"
import certificateModel from "../models/certificateModel.js";
import studentModel from "../models/studentModel.js"
import jwt from "jsonwebtoken"

export const registerUniversity = async (req, res) => {
  try {
    const { email, name, location, password } = req.body;
    if (!name) {
      return res.status(404).send({ message: "Name is required" });
    }
    if (!email) {
      return res.status(404).send({ message: "E-mail is required" });
    }
    if (!password) {
      return res.status(404).send({ message: "Password is required" });
    }
    if (!location) {
      return res.status(404).send({ message: "Password is required" });
    }
    const same_university = await universityModel.findOne({ email });
    if (same_university) {
      return res.status(404).send({ message: "E-mail already registered" });
    }
    const hashedpassword = await hashedPassword(password);
    const user = await new universityModel({
      name: name,
      email: email,
      password: hashedpassword,
      location: location,
    }).save();
    return res.status(201).send({
      success: true,
      message: "University Registered Successfully",
      user,
    });
  } 
  catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error in university registration",
      error,
    });
  }
};

export const loginUniversity = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email == null) {
      return res.status(400).send({ message: "Enter correct email!" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required!" });
    }
    const university = await universityModel.findOne({ email });
    if (await checkPassword(password, university.password)) {
      const token = jwt.sign({ _id: university._id,email:university.email,role:1}, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(201).send({
        success: true,
        message: "User Logged-In Successfully",
        token,
        user: {
          id: university._id,
          email: university.email,
          code: university.uid,
        },
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Invalid user email or password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error in university Sign-in",
      error,
    });
  }
};

export const getAllUniversity = async (req, res) => {
  try {
    const university = await universityModel.find({});
    return res.status(201).send({
      success: true,
      message: "Getting all the university",
      university,
    });
  } catch (error) {
    return res.status(201).send({
      success: false,
      message: "Error on fetching university",
      error,
    });
  }
};

export const uploadCertificate = async (req, res) => {
  try {
    const { uid } = req.params;
    const { email, dob, block, type } = req.body;
    const hash = await generateHash(email, dob);
    const certificate = await new certificateModel({
      uid: uid,
      hash: hash,
      type: type,
      block: block,
    }).save();
    return res.status(200).send({
      success: true,
      certificate
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error in uploading the certificate",
      error
    });
  }
};

export const getCertificate = async (req, res) => {
  try {
    const { email, dob } = req.body;
    const hash = await generateHash(email, dob);
    const certificate = await certificateModel.findOne({ hash: hash });
    return res.status(200).send({
      success: true,
      message: "Getting your certificate",
      certificate,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error in fetching the certificate",
      error,
    });
  }
};

export const registerStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(404).send({ message: "E-mail is required" });
    }
    if (!password) {
      return res.status(404).send({ message: "Password is required" });
    }

    const student = await studentModel.findOne({ email });
    if (student) {
      return res
        .status(404)
        .send({ success: false, message: "E-mail already registered" });
    }
    const hashedpassword = await hashedPassword(password);
    const user = await new studentModel({
      email: email,
      password: hashedpassword,
    }).save();
    return res.status(201).send({
      success: true,
      message: "Student Registered Successfully",
      user
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "error while signup",
      error,
    });
  }
};

export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email == null) {
      return res.status(400).send({ message: "Enter correct email!" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required!" });
    }
    const user = await studentModel.findOne({ email });
    if (await checkPassword(password, user.password)) {
      const token = jwt.sign({ _id: user._id,email: user.email, role:0}, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        maxAge:7*24*60*60*1000
      })
      return res.status(201).send({
        success: true,
        message: "User Logged-In Successfully",
        token,
        user: {
          id: user._id,
          email: user.email,
        },
      });
    } else {
      return res.status(400).send({
        message: "Invalid user email or password",
      });
    }
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error in student Sign-in",
      error,
    });
  }
};

export const getStudent = async (req, res) => {
  try {
    const { sid } = req.params;
    const student = await studentModel.findById(sid);
    return res.status(200).send({
      success: true,
      message: "Getting the user",
      student,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error in getting the student",
      error
    });
  }
};
