const express = require("express")
const router = express.Router()
const User = require("../sql/user")
const errcode = require("../utils/errorcode")
const config = require("../config")

router.post("/login", async function (req, res) {
  try {
    // 校验用户名密码是否正确
    const users = await User.findUser(req.body.username, req.body.password)
    if (!users.length) {
      res.send({
        code: "001003",
        data: null,
        msg: "用户名或密码错误",
      })
      return
    }
    // 更新token
    User.updateUser({ token: req.session.id }, users[0].dataValues.id)
    // 设置过期时间
    const expireTime = new Date(Date.now() + 86400000 * config.cookieExpireDate)
    // 设置cookie
    res.cookie("token", req.session.id, {
      expires: expireTime,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    })
    res.send({
      code: "200",
      data: users[0].dataValues,
    })
  } catch (error) {
    console.log("error", error)
    return res.send(errcode.DB.CONNECT_EXCEPTION)
  }
})

module.exports = router
