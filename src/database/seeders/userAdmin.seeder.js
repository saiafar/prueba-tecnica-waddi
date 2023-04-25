import bcrypt from "bcryptjs";
import { User } from "../../models/User.js";
import Roles from "../../helpers/roles.js";

export const userAdminSeeder = async () => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash("admin.pass23", salt);
    try {
        await User.create({
            username: "Administrador",
            password: hashPassword,
            role:Roles.admin
        })
    } catch(error ) {
    }
    
}