var crypto = require('crypto')
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
    let name = req.body.name;
    let pass = req.body.pass;
    let checkPass = req.body.checkPass;
    // 验证两次输入密码是否一致
    if (pass !== checkPass) {
      req.flash('error', '两次输入的密码不一致！')
    }
    // 对密码进行加密
    let md5 = crypto.createHash('md5')
    pass = md5.update(pass).digest('hex')
    let user = new User({
      'name': name,
      'pass': pass
    })

    // 判断用户是否已存在
    User.get(user.name, function (err, userInfo) {
      if (err) {
        req.flash('error', err);
        return
      }
      if (userInfo.length) {
        req.flash('error', '用户名已存在！')
        res.send({
          retcode: 10001,
          text: '用户已存在',
          value: {}
        })
        return;
      }
      // 新增用户
      user.save(function (err, result) {
        console.log(result, 'result')
        if (err) {
          req.flash('error', err)
          return;
        }
        req.session.user = user; //用户信息存入 session
        req.flash('success', '注册成功！')
      })
    })
  });

  app.post('/login', function (req, res) {
    let name = req.body.name;
    let pass = req.body.pass;

    // 对密码进行加密
    let md5 = crypto.createHash('md5');
    pass = md5.update(pass).digest('hex');

    let user = new User({
      'name': name,
      'pass': pass
    })
    // 查询密码是否正确
    User.get(user.name, function (err, userInfo) {
      if (err) {
        req.flash('error', err);
        return
      }
      if (!userInfo.length) {
        res.send({
          retcode: 10001,
          text: '用户名不存在',
          value: {}
        })
        return;
      }
      if (userInfo[0].pass !== pass) {
        console.log(userInfo[0].pass, pass)
        res.send({
          retcode: 10001,
          text: '用户名或密码错误',
          value: {}
        })
        return;
      }
      res.send({
        retcode: 0,
        value: userInfo[0]
      })
    })
  })
};
