const mysql = require("mysql")


const pool = mysql.createPool(config.mysql)

function getConnection() {
    return new Promise((resolve, reject) => {

    })
}

function query(options) {
    return getConnection()
}

module.exports.query = query