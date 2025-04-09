import express from "express";
import pacientesController from "../controllers/pacientesController.js";

const router = express.Router();

router.route("/")
.get(pacientesController.getPaciente)
.post(pacientesController.insertPaciente)

router.route("/:id")
.put(pacientesController.updatePaciente)
.delete(pacientesController.deletePaciente)

export default router;