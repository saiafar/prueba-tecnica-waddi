import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database.js'
import { Post } from './Post.js';
import { Review } from './Review.js';
import Roles from '../helpers/roles.js';
import { UserRegister } from './UserRegister.js';

export const User = sequelize.define('users',  {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        unique: true
    },
    password:{
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: Roles.User,
    }
});

User.hasMany(Post, {
    foreignKey: 'userId',
    sourceKey: 'id'
})

Post.belongsTo(User, {
    foreignKey: 'userId',
    sourceKey: 'id'
})

User.hasMany(Review, {
    foreignKey: 'userId',
    sourceKey: 'id',
    constraints: false, 
    allowNull:true, 
    defaultValue:null
})

Review.belongsTo(User, {
    foreignKey: 'userId',
    sourceKey: 'id'
})

User.hasMany(UserRegister, {
    foreignKey: 'userId',
    sourceKey: 'id'
})

UserRegister.belongsTo(User, {
    foreignKey: 'userId',
    sourceKey: 'id'
})