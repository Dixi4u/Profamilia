import express from "express";
import pacientesController from "../controllers/citasController.js";

const router = express.Router();

router.route("/")
.get(pacientesController.getCita)
.post(pacientesController.insertCita)

router.route("/:id")
.put(pacientesController.updateCita)
.delete(pacientesController.deleteCita)

export default router;