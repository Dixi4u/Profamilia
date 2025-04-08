import express from "express";
import cookieParser from "cookie-parser";
import doctores from "./src/routes/doctores.js"





const app = express();
app.use(express.json());
app.use(cookieParser());



app.use("/api/doctores", doctores)




export default app;