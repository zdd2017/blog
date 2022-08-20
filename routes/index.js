const BaseController = require("../controllers/base")
const ValidatorController = require("../controllers/validator")
const UserController = require("../controllers/user")
const ArticleController = require("../controllers/article")

module.exports = function (app) {
  app.use(BaseController)
  // app.use(ValidatorController)
  // 登录
  app.use("/user", UserController)
  app.use("/article", ArticleController)
}
