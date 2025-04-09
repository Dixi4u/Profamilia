import {Schema, model} from "mongoose";

const pacientesSchema = new Schema({
    nombre: {
        type: String,
        require: true
    },
    edad: {
        type: Number,
        require: true
    },
    correo: {
        type: String,
        require: true,
    },
    contrasena: {
        type: String,
        require: true,
    },
    telefono: {
        type: String,
        require: true
    },
    isVerified: {
        type: Boolean,
        require: true
    }
}, {
    timestamps: true,
    strict: false
})

export default model("pacientes", pacientesSchema)