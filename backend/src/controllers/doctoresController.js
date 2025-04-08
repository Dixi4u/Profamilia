const  doctoresController = {};
import doctoresModel from "../models/Doctores.js"

//SELECT
doctoresController.getDoctor = async (req, res) => {
   const doctores = await doctoresModel.find()
   res.json(doctores)
}

//INSERT
doctoresController.insertDoctor = async (req, res) => {
    const { nombre, especialidad, correo, contrasena } = req.body;
    const newDoctor = new doctoresModel({ nombre, especialidad, correo, contrasena })
    await newDoctor.save()
    res.json({message: "Doctor saved"})
}

//DELETE
doctoresController.deleteDoctor = async (req, res) => {
    await doctoresModel.findByIdAndDelete(req.params.id)
    res.json({message: "Deleted successfully"})
}

//UPDATE
doctoresController.updateDoctor = async (req, res) => {
    const { nombre, especialidad, correo, contrasena } = req.body;
    const updateDoctor = await doctoresModel.findByIdAndUpdate(req.params.id,
        {nombre, especialidad, correo, contrasena}, {new: true}
    )
    res.json({message: "Doctor updated successfully"})
}

export default doctoresController;