import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import authRole from "../middlewares/role.js";
import auth from "../middlewares/auth.js";
import roles from "../helpers/roles.js";

const router = Router()

router.post('/login', login);
router.post('/register', auth, authRole([roles.admin]), register);

export default router;