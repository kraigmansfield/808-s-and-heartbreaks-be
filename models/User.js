const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull:false
    },
    email: {
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password: {
        type:DataTypes.STRING,
        allowNull:false,
        validate: {
            len:[8]
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull:false,
        validate:{
            min:[18]
        }
    },

},{
    sequelize,
    hooks:{
        beforeCreate: userObj=>{
            userObj.password = bcrypt.hashSync(userObj.password,4);
        }
    }
});

module.exports=User