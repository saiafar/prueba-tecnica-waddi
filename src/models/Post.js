import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database.js'
import { Review } from './Review.js';
import { UserRegister } from './UserRegister.js';

export const Post = sequelize.define('posts',  {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING
    },
    body: {
        type: DataTypes.STRING
    },
    published: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

Post.hasMany(Review, {
    foreignKey: 'postId',
    sourceKey: 'id',
})

Review.belongsTo(Post, {
    foreignKey: 'postId',
    sourceKey: 'id'
})

Post.hasMany(UserRegister, {
    foreignKey: 'postId',
    sourceKey: 'id',
})

UserRegister.belongsTo(Post, {
    foreignKey: 'postId',
    sourceKey: 'id'
})