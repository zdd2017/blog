const mysql = require("mysql")
const config = require("../config")

const pool = mysql.createPool(config.mysql)

function getConnection() {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err)
        return
      }
      console.log(connection)
      resolve(connection)
    })
  })
}

function query(options) {
  return getConnection()
}

module.exports.query = query
