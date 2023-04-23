import { Router } from "express";
import { userRegisters } from "../controllers/userRegister.controller.js";
import auth from "../middlewares/auth.js";
import authRole from "../middlewares/role.js";
import roles from "../helpers/roles.js";

const router = Router()

router.get('/userRegisters', auth, authRole([roles.admin]), userRegisters );

export default router;