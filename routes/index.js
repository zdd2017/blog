const crypto = require('crypto')
const User = require('../models/user.js')
const Article = require('../models/article.js')
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
    User.get(user.name).then(userInfo => {
      if (userInfo.length) {
        res.send({
          retcode: 10001,
          text: '用户已存在',
          value: {}
        })
        return;
      }
      // 用户名不存在——新增用户
      user.save().then(() => {
        res.send({
          retcode: 0,
          text: '注册成功'
        })
      })
        .catch(err => {
          res.send({
            retcode: 1,
            text: '注册失败'
          })
        })
    })
      .catch(err => {
        res.send({
          retcode: 1,
          text: '注册失败'
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
      if (!userInfo) {
        res.send({
          retcode: 10001,
          text: '用户名不存在',
          value: {}
        })
        return;
      }
      if (userInfo.pass !== pass) {
        res.send({
          retcode: 10001,
          text: '用户名或密码错误',
          value: {}
        })
        return;
      }
      // 登陆成功，添加token验证
      let _id = userInfo._id.toString();
      // 将用户id传入并生成token
      let jwt = new Jwt(_id);
      let token = jwt.generateToken();
      res.send({
        retcode: 0,
        value: {
          userInfo: userInfo
        },
        token: token
      })
    })
      .catch(err => {
        res.send({
          retcode: 1,
          text: '登录失败'
        })
      })
  })

  // app.post('/logout', checkLogin)
  // app.post('/logout', function (req, res) {

  // })

  app.post('/post', checkLogin)
  app.post('/post', function (req, res) {
    let username = req.body.username,
      title = req.body.title,
      content = req.body.content

    const article = new Article(username, title, content)

    article.save().then(() => {
      res.send({
        retcode: 0,
        value: {}
      })
    })
      .catch(err => {
        res.send({
          retcode: 1,
          text: '发布失败'
        })
      })
  })

  app.get('/getBlogList', function (req, res) {
    Article.getById().then(result => {
      res.send({
        retcode: 0,
        text: '注册成功',
        value: {
          blogs: result
        }
      })
    })
  })

  app.get('/getArticle', function (req, res) {
    let id = req.query.id;
    Article.getById(id).then(result => {
      res.send({
        retcode: 0,
        text: '',
        value: {
          article: result
        }
      })
    })
  })

  app.get('/getMyArticle', function (req, res) {
    let name = req.query.username;
    Article.getByName(name).then(result => {
      res.send({
        retcode: 0,
        text: '',
        value: {
          article: result
        }
      })
    })
  })
}
