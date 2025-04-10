import doctorsModel from "../models/Doctores.js";
import patientsModel from "../models/Pacientes.js";
import bcrypt from "bcryptjs";
import jsonWebToken from "jsonwebtoken";
import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {

    const { correo, contrasena } = req.body;

    try {
        let userFound; 
        let userType; 

        // 1. ADMIN
        if (correo === config.emailAdmin.email && contrasena === config.emailAdmin.password) {
            userFound = { _id: "admin" };
            userType = "admin";
        } else {
            userFound = await doctorsModel.findOne({ email });
            userType = "doctor";
            if (!userFound) {
                userFound = await patientsModel.findOne({ email });
                userType = "paciente";
            }
        }
        if (!userFound) {
            console.log("User not found");
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        //2. Verificación de contraseña
        //Solo si no es admin
        if (userType !== "admin") {
            const isMatch = await bcrypt.compare(password, userFound.password);
            if (!isMatch) {
                return res.json({ message: "Contraseña incorrecta" });
            }
        }
        //TOken
        jsonWebToken.sign(
            //1- qué voy a guardar
            { id: userFound._id, userType },
            //2- secreto
            config.JWT.secret,
            //3- cuándo expira
            { expiresIn: config.JWT.expiresIn },
            //4- función flecha
            (error, token) => {
                if (error) console.log(error);

                res.cookie("authToken", token);
                res.json({ message: "ji agarró" });
            }
        );

    } catch (error) {
        res.json({ message: "Error: " + error.message });
    }
}

export default loginController;