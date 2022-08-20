const express = require("express")
const router = express.Router()
const Article = require("../sql/article")
const User = require("../sql/user")

router.get("/page", async function (req, res, next) {
  const articles = await Article.findArticle(req.query)
  for (let article of articles.rows) {
    const user = await User.findUser({ id: article.authorId })
    article.dataValues.authorName = user[0].dataValues.userName
  }
  res.send({
    code: "200",
    data: articles,
  })
})

module.exports = router
