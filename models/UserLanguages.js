//imports
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class UserLanguages extends Model {}

//Set rules and fields
UserLanguages.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "user",
            key: "id",
        },
    },
    language_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "language",
            key: "id",
        }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_languages',
  }
);

module.exports = UserLanguages;
