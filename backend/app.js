import express from "express";
import cookieParser from "cookie-parser";
import doctores from "./src/routes/doctores.js"
import pacientes from "./src/routes/pacientes.js";
import citas from "./src/routes/citas.js";





const app = express();
app.use(express.json());
app.use(cookieParser());



app.use("/api/doctores", doctores)
app.use("/api//pacientes", pacientes)
app.use("/api/citas", pacientes)





export default app;