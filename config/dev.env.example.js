module.exports = {
  allowClient: ["localhost:3000", "127.0.0.1:3000"],
  mysql: {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "blog",
    multipleStatements: true,
    waitForConnections: true,
    charset: "UTF8MB4_UNICODE_CI",
  },
}
