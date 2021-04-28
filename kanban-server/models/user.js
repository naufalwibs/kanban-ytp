'use strict';
const { hashPassword } = require('../helpers/bcryptjs')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task, { foreignKey : 'UserId' })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          args: false,
          msg: "Please insert only email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        notEmpty: {
          args: true,
          msg: "Password can't be empty"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate: ((instance, option) => {
        instance.password = hashPassword(instance.password)
      })
    }
  });
  return User;
};