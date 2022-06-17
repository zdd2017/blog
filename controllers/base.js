const express = require('express');
const router = express.Router();
const authMap = require('../permissions/auth');
const errcode = require('../utils/errorcode');
const dbUtils = require('../utils/db');
const errorcode = require('../utils/errorcode');

router.use(async (req, res, next) => {
    const authority = authMap.get(req.path);

    // 不需要鉴权
    if(!authority) {
        next()
        return
    }
    // 没有权限
    if(!req.cookies.token) {
        return res.send(errcode.AUTH.UNAUTHORIZED)
    }
    try {
        await dbUtils.query()
    } catch (error) {
        return res.send(errorcode.DB.CONNECT_EXCEPTION)
    }
    
});

module.exports = router;