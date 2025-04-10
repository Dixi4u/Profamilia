import  jsonwebtoken  from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

import pacientesModel from "../models/Pacientes.js";
import { config } from "../config.js";

const registerPacientesController = {};

//Array de funciones
registerPacientesController.register = async (req, res) => {
  const {
    nombre, 
    edad, 
    correo, 
    contrasena, 
    telefono, 
    isVerified
  } = req.body;

  try {
    //Verificamos si el cliente ya existe
    const existingPaciente = await pacientesModel.findOne({ correo });
    if (existingPaciente) {
      return res.json({ message: "Paciente already exists" });
    }

    //Encriptar la contraseña
    const passwordHash =  await bcryptjs.hash(contrasena, 10);

    //Guardo el cliente en la base de datos
    const newPaciente = new pacientesModel({
      nombre,
      edad,
      correo,
      contrasena: passwordHash,
      telefono,
      isVerified: isVerified || false,
    });

    await newPaciente.save();

    //Gemerar uncodigo aleatorio para enviarlo por correo
    const verificationcode = crypto.randomBytes(3).toString("hex");

    //Generar un token que contenga el codigo de verificacion
    const tokenCode = jsonwebtoken.sign(
      //1- ¿Qué voy a guardar?
      { email, verificationcode },
      //2- Secret key
      config.JWT.secret,
      //3- Cuando expira
      { expiresIn: "2h" }
    );

    res.cookie("verificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });

    //Enviar el correo electronico
    //1- Transporter => quien lo envia
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.email_user,
        pass: config.email.email_pass,
      },
    });

    //2- mailoption => quien lo recibe
    const mailoptions = {
      from: config.email.email_user,
      to: email,
      subject: "Verificación de correo",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
          <header style="text-align: center; padding: 10px 0; border-bottom: 1px solid #ddd;">
            <h1 style="color:rgb(36, 179, 223);">Bienvenido al Hospital Proafamilia </h1>
            <p style="font-size: 14px; color: #555;">Estamos emocionados de tenerte con nosotros</p>
          </header>
          <main style="padding: 20px;">
            <h2 style="color: #333;">¡Verifica tu correo electrónico!</h2>
            <p>Hola,</p>
            <p>Gracias por registrarte en nuestra plataforma. Para completar tu registro, por favor verifica tu correo electrónico haciendo clic en el botón de abajo:</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="https://example.com/verify?email=${correo}" style="background-color:rgb(0, 247, 152); color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">Verificar correo</a>
            </div>
            <p>Si no solicitaste este correo, puedes ignorarlo. Tu cuenta no será activada hasta que verifiques tu correo electrónico.</p>
            <p>Si tienes algún problema, no dudes en contactarnos respondiendo a este correo.</p>
          </main>
          <footer style="text-align: center; padding: 10px 0; border-top: 1px solid #ddd; margin-top: 20px;">
            <p style="font-size: 12px; color: #777;">© 2023 [Tu Empresa]. Todos los derechos reservados.</p>
            <p style="font-size: 12px; color: #777;">[Dirección de la empresa] | [Teléfono de contacto]</p>
          </footer>
        </div>
      `,
    };

    //3- Enviar el correo
    transporter.sendMail(mailoptions, (error, info) => {
      if (error) {
        return res.json({ message: "Error sending mail" + error });
      }
      console.log("Email sent" + info);
    });

    res.json({
      message: "Client registered, Please verify you email with the code sent",
    });
  } catch (error) {
    console.log("error" + error);
  }
};

registerPacientesController.verifyCodeEmail = async (req, res) => {
  const { requireCode } = req.body;

  const token = req.cookies.verificationToken;

  try {
    //Verificar y decodificar el token
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const { email, verificationCode: storedCode } = decoded;

    //Comparar el codigo que envie por correo y esta guardado en las cookies, con el codigo que el usuario esta ingresando
    if (requireCode !== storedCode) {
      return res.json({ message: "Invalid code" });
    }

    //Marcamos al cliente como verificado
    const paciente = await pacientesModelModel.findOne({email});
    paciente.isVerified = true;
    await paciente.save();                                 


    res.clearCookie("verificationToken");

    res.json({message: "Email verified Successfully"});



  } catch (error) {
    console.log("error"+error);
  }
};

export default registerPacientesController;