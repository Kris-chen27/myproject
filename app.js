// 1.
var express = require('express');
var fs = require('fs');
// 2.
var app = express();
//3.配置框架
app.use('/public', express.static('public'))
app.engine('html', require('express-art-template'))
// 4. 路由
// 首页
app.get('/index', (req, res) => {
    // res.send('hello');
    res.render('index.html');
})
// 列表页
app.get('/list', (req, res) => {
    res.render('list.html');
})
// 购物车页
app.get('/car', (req, res) => {
    res.render('car.html');
})
// 登录页
app.get('/login', (req, res) => {
    res.render('logon.html');
})
// 注册页
app.get('/sign', (req, res) => {
    res.render('sign.html');
})
// 5. 监听服务
app.listen(8080, () => {
    console.log('服务器启动成功...');
})