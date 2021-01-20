var User = require('../models/user.js')

// 因为是单页应用 所有请求都走/dist/index.html
// module.exports = function (app) {
//   app.get('*', function (req, res) {
//     const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
//   res.send(html)
//   });
// };

module.exports = function (app) {
  app.post('/register', function (req, res) {
    // let name = req.body.name;
    // let password = req.body.password;
    // let 
    res.send('register')
  });
};
