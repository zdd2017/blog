var Sequelize = require("sequelize")
const sequelize = require("../utils/db")

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.NUMBER,
      field: "id",
      primaryKey: true,
    },
    userName: {
      type: Sequelize.STRING,
      field: "user_name",
    },
    password: {
      type: Sequelize.STRING,
      field: "password",
    },
    token: {
      type: Sequelize.STRING,
      field: "token",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
)

const findUser = function (opts) {
  return User.findAll({
    where: opts,
  })
}

const updateUser = function (options, id) {
  return User.update(options, {
    where: {
      id,
    },
  })
}

module.exports = {
  findUser,
  updateUser,
}
