const express = require("express")
const app = express()
const routeMiddleware = require("./routes")
const session = require("express-session")

// 解决跨域问题
app.all("*", function (req, res, next) {
  // 设置允许跨域的域名,*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*")
  // 允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type")
  // 跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS")
  if (req.method.toLowerCase() == "options")
    res.send(200) // 让options 尝试请求快速结束
  else next()
})

const sessionMiddleware = session({
  secret: "zdd",
})

app.use(sessionMiddleware)
// parse application/json，express@4.16.0内置，替代了 body-parser
app.use(express.json())
// parse application/x-www-form-urlencoded，替代了 body-parser
app.use(express.urlencoded({ extended: false }))

// 路由中间件
routeMiddleware(app)

app.listen("3000")

module.exports = app
