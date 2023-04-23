import {DataTypes} from 'sequelize'
import {sequelize} from '../database/database.js'

export const Review = sequelize.define('reviews',  {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    guestName: {
        type: DataTypes.STRING,        
    },
    value:{
        type: DataTypes.SMALLINT,
        validate: {
            min: 1,
            max: 5
        }
    }
})