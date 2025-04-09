const citasController = {};
import citasModel from "../models/Citas.js";

citasController.getCita = async (req, res) => {
    const citas = await citasModel.find().populate('doctorAsignado').populate('pacienteAsignado');
    res.json(citas);
};

citasController.getCita = async (req, res) => {
    const { fecha, hora, motivo, doctorAsignado, pacienteAsignado } = req.body;
    const newAppointment = new citasModel({ fecha, hora, motivo, doctorAsignado, pacienteAsignado });
    await newAppointment.save();
    res.json({ message: "Cita saved" });
};

// DELETE
citasController.getCita = async (req, res) => {
    await citasModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
};

// UPDATE
citasController.getCita = async (req, res) => {
    const {fecha, hora, motivo, doctorAsignado, pacienteAsignado} = req.body;
    const updateCita = await citasModel.findByIdAndUpdate(req.params.id,
        { fecha, hora, motivo, doctorAsignado, pacienteAsignado}, { new: true });
    res.json({ message: "Cita updated successfully" });
};


export default citasController;