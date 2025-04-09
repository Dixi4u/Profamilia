const  pacientesController = {};
import pacientesModel from "../models/Pacientes.js"

//SELECT
pacientesController.getPaciente = async (req, res) => {
   const pacientes = await pacientesModel.find()
   res.json(pacientes)
}

//INSERT
pacientesController.insertPaciente = async (req, res) => {
    const { nombre, edad, correo, contrasena, telefono, isVerified } = req.body;
    const newPaciente = new pacientesModel({ nombre, edad, correo, contrasena, telefono, isVerified })
    await newPaciente.save()
    res.json({message: "Pacient saved"})
}

//DELETE
pacientesController.deletePaciente = async (req, res) => {
    await pacientesModel.findByIdAndDelete(req.params.id)
    res.json({message: "Deleted successfully"})
}

//UPDATE
pacientesController.updatePaciente = async (req, res) => {
    const { nombre, edad, correo, contrasena, telefono, isVerified } = req.body;
    const updatePaciente = await pacientesModel.findByIdAndUpdate(req.params.id,
        {nombre, edad, correo, contrasena, telefono, isVerified}, {new: true}
    )
    res.json({message: "Pacient updated successfully"})
}

export default pacientesController;