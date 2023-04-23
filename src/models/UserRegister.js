import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database.js'
import { Post } from './Post.js';
import { User } from './User.js';
import Roles from '../helpers/roles.js';

export const UserRegister = sequelize.define('userRegisters',  {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    action:{
        type: DataTypes.STRING
    }
});