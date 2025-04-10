import express from "express";
import cookieParser from "cookie-parser";
import doctores from "./src/routes/doctores.js"
import pacientes from "./src/routes/pacientes.js";
import citas from "./src/routes/citas.js";
import login from "./src/routes/logIn.js";
import logout from "./src/routes/logOut.js";
import registerDoctores from "./src/routes/registerDoctores.js";
import registerPacientes from "./src/routes/registerPacientes.js";


const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/api/doctores", doctores)
app.use("/api//pacientes", pacientes)
app.use("/api/citas", citas)
app.use("/api/login", login)
app.use("/api/logout", logout)
app.use("/api/registerDoctores", registerDoctores)
app.use("/api/registerPacientes", registerPacientes)


export default app;