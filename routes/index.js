var crypto = require('crypto')
var User = require('../models/user.js')
const Jwt = require('../utils/jwt')

// 因为是单页应用 所有请求都走/dist/index.html
// module.exports = function (app) {
//   app.get('*', function (req, res) {
//     const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
//   res.send(html)
//   });
// };

const checkLogin = function (req, res, next) {
  let token = req.headers.token;
  let jwt = new Jwt(token);
  let result = jwt.verifyToken();
  // 如果考验通过就next，否则就返回登陆信息不正确
  if (result == 'err') {
    console.log(result);
    res.send({ retcode: 403, text: '登录已过期,请重新登录' });
    // res.render('login.html');
  } else {
    next();
  }
}

const checkNotLogin = function (req, res, next) {
  let token = req.headers.token;
  let jwt = new Jwt(token);
  let result = jwt.verifyToken();
  // 如果考验通过就next，否则就返回登陆信息不正确
  if (result != 'err') {
    console.log(result);
    res.send({ retcode: 403, text: '请先退出登录' });
    // res.render('login.html');
  } else {
    next();
  }
}

module.exports = function (app) {
  app.post('/register', checkNotLogin)
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
        // req.session.user = user; //用户信息存入 session
        req.flash('success', '注册成功！')
      })
    })
  });

  app.post('/login', checkNotLogin)
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
    User.get(user.name).then(userInfo => {

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
      //用户名密码都匹配后，将用户信息存入 session
      // req.session.user = user;
      // 登陆成功，添加token验证
      let _id = userInfo[0]._id.toString();
      // 将用户id传入并生成token
      let jwt = new Jwt(_id);
      let token = jwt.generateToken();
      res.send({
        retcode: 0,
        value: userInfo[0],
        token: token
      })
    })
  })
}
