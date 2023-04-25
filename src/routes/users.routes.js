import { Router } from "express";
import auth from "../middlewares/auth.js";
import authRole from "../middlewares/role.js";
import Roles from "../helpers/roles.js"
import { deleteUser, getUsers, updateUser } from "../controllers/user.controller.js";
const router = Router()

router.get('/users', auth, authRole([Roles.admin]), getUsers);
router.put('/users/:id', auth, authRole([Roles.admin]), updateUser);
router.delete('/users/:id', auth, authRole([Roles.admin]), deleteUser);

export default router;