const express = require("express")
const app = express()
const routeMiddleware = require("./routes")

// parse application/json，express@4.16.0内置，替代了 body-parser
app.use(express.json())
// parse application/x-www-form-urlencoded，替代了 body-parser
app.use(express.urlencoded({ extended: false }))

// 路由中间件
routeMiddleware(app)

app.listen("3000")

module.exports = app
