import express from "express";
import doctoresController from "../controllers/doctoresController.js";

const router = express.Router();

router.route("/")
.get(doctoresController.getDoctor)
.post(doctoresController.insertDoctor)

router.route("/:id")
.put(doctoresController.updateDoctor)
.delete(doctoresController.deleteDoctor)

export default router;