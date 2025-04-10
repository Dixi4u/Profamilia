import express from "express";
import registerPacientesController from "../controllers/registerPacientesController.js";

const router = express.Router();

router.route("/").post(registerPacientesController.register);
router.route("/verifyCodeMail").post(registerPacientesController.verifyCodeEmail);

export default router;