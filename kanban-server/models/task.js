'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, { foreignKey : 'UserId' })
    }
  };
  Task.init({
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users'
        }
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    title: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Task can't be empty"
        }
      }
    },
    category: {
      type : DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};