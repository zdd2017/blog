const Sequelize = require("sequelize")
const sequelize = require("../utils/db")

const Article = sequelize.define(
  "article",
  {
    id: {
      type: Sequelize.NUMBER,
      field: "id",
      primaryKey: true,
    },
    articleName: {
      type: Sequelize.STRING,
      field: "article_name",
    },
    articleText: {
      type: Sequelize.STRING,
      field: "article_text",
    },
    authorId: {
      type: Sequelize.NUMBER,
      field: "author_id",
    },
    poster: {
      type: Sequelize.STRING,
      filed: "poster",
    },
    updateTime: {
      type: Sequelize.STRING,
      field: "update_time",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
)

const findArticle = function (query) {
  return Article.findAndCountAll({
    offset: (query.pageNum - 1) * query.pageSize,
    limit: +query.pageSize,
  })
}

module.exports = {
  findArticle,
}
