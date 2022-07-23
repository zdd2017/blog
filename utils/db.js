const mysql = require("mysql")
const config = require("../config")
const errcode = require("./errorcode")
const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("blog", "root", "root", {
  host: "localhost",
  dialect: "mysql",
})

const pool = mysql.createPool(config.mysql)

function getConnection() {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err)
        return
      }
      resolve(connection)
    })
  })
}

function execQuery(options, connection) {
  return new Promise((resolve, reject) => {})
}

function query(options) {
  return getConnection().then((connection) => {
    return execQuery(options, connection)
  })
}

module.exports = sequelize
