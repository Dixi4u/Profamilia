import {Schema, model} from "mongoose";

const citasSchema = new Schema({
    fecha: {
        type: String,
        require: true
    },
    hora: {
        type: String,
        require: true
    },
    motivo: {
        type: String,
        require: true,
    },
    doctorAsignado: {
        type: Schema.Types.ObjectId,
             ref: "doctores",
             required: true,
    },
    pacienteAsignado: {
        type: Schema.Types.ObjectId,
             ref: "pacientes",
             required: true,
    }
}, {
    timestamps: true,
    strict: false
})

export default model("citas", citasSchema)