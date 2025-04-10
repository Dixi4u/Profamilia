import doctoresModel from "../models/Doctores.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const registerDoctoresController = {};

registerDoctoresController.register = async (req, res) => {
  const { nombre, especialidad, correo, contrasena } = req.body;

  try {
    const existingDoctor = await doctoresModel.findOne({ email });
    if (existingDoctor) {
      return res.json({ message: "Doctor ya existe" });
    }

    //Encriptar la contraseña
    const passwordHash = await bcryptjs.hash(contrasena, 10);

    const newDoctor = new doctoresModel({ nombre, especialidad, correo, contrasena: passwordHash });

    await newDoctor.save()

    //--> Token <--
    jsonwebtoken.sign(
        //1-Que voy a guardar
        {id: newDoctor._id},
        //2-Secreto
        config.JWT.secret,
        //3-Cuando expira
        {expiresIn: config.JWT.expiresIn},
        //4-Funcion flecha
        (error, token)=>{
            if(error) console.log(error);
            res.cookie("authToken", token);
            res.json({message: "Se inserto esta babosada"});
        }
    )


  } catch (error) {
    console.log(error)
  }
};

export default registerDoctoresController