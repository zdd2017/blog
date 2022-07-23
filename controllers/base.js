const express = require("express")
const router = express.Router()
const authMap = require("../permissions/auth")
const errcode = require("../utils/errorcode")
const sequelize = require("../utils/db")

router.use(async (req, res, next) => {
  const authority = authMap.get(req.path)

  // 不需要鉴权
  if (!authority) {
    next()
    return
  }
  // 没有权限
  if (!req.cookies.token) {
    return res.send(errcode.AUTH.UNAUTHORIZED)
  }
  // 鉴权
  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
    return res.send(errcode.DB.CONNECT_EXCEPTION)
  }
})

module.exports = router
