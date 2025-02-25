import express from "express";
import cors from "cors"
import morgan from "morgan";
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import universityRoutes from "./routes/universityRoutes.js"
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from 'path';

dotenv.config()
connectDb();


const app=express();
app.use(cors({credentials:true}))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'certificate/dist')));

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "certificate/dist", "index.html"));
  });
app.get("/help", (req, res) => {
    res.sendFile(path.join(__dirname, "certificate/dist", "index.html"));
  });
app.get("/vault/org/*", (req, res) => {
    res.sendFile(path.join(__dirname, "certificate/dist", "index.html"));
  });
app.get("/vault/*", (req, res) => {
    res.sendFile(path.join(__dirname, "certificate/dist", "index.html"));
  });
app.get("/vault", (req, res) => {
    res.sendFile(path.join(__dirname, "certificate/dist", "index.html"));
  });
app.get("/signin", (req, res) => {
    res.sendFile(path.join(__dirname, "certificate/dist", "index.html"));
  });
app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "certificate/dist", "index.html"));
  });

app.use('/api/auth',universityRoutes);


const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`)
})