import app from './app.js'
import "dotenv/config.js";
import {sequelize} from "./database/database.js";
import {userAdminSeeder} from './database/seeders/userAdmin.seeder.js';

async function main(){
    try{
        //await sequelize.sync({force: true})
        await sequelize.sync({alter: true})
        .then(() => {
            return userAdminSeeder();
        });
        console.log("conexion con BD exitosa");
        app.listen(3000);
        console.log("El servidor se ha iniciado con exito en el puerto ", 3000);
    }catch (error) {
        console.log("no se puede conectar a la BD: ", error);
    }
    
}

main();