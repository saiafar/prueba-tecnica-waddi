import "dotenv/config.js";
import Sequelize  from 'sequelize'

export const sequelize = new Sequelize(
    process.env.NAME_DB,
    process.env.USER_DB,
    process.env.PASS_DB, 
    {
    host: process.env.HOST_DB,
    dialect: "postgres",
    logging: false
    }
);