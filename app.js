// 引用expess框架
const express = require('express');
// 数据库连接
const connect = require('./model/connect');
// 处理路径
const path = require('path');
// 引入body-parser模块 用来处理post请求参数
const bodyPaser = require('body-parser');
// 导入art-tempate模板引擎
const template = require('art-template');
// 导入dateformat第三方模块
const dateFormat = require('dateformat');
// 导入morgan这个第三方模块
const morgan = require('morgan');

const app = express();

// 当渲染后缀为art的模板时，使用express-art-template
app.engine('art', require('express-art-template'));
// 设置模板存放目录
app.set('views', path.join(__dirname, 'views'));
// 渲染模板时不写后缀，默认拼接art后缀
app.set('view engine', 'art');
// 向模板内部导入dateFormate变量：处理日期格式的方法
template.defaults.imports.dateFormat = dateFormat;

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));
// 将请求信息打印在控制台
app.use(morgan('dev'));
// http -> https
app.all('*', ensureSecure);

// 处理post请求参数
app.use(bodyPaser.urlencoded({ extended: false }));

// 配置跨域
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get('/', (req, res) => {res.render('index.art')});

// 引入路由模块
const demo = require('./router/demo');
const project = require('./router/project');

// 为路由匹配请求路径
app.use('/demo', demo);
app.use('/project', project);

// 监听端口
app.listen(82, () => {
  console.log('homePage is running on port 82...');
});

const https = require('https');
const fs = require('fs');

const HTTPS_OPTOIN = {
  key: fs.readFileSync(path.join(process.cwd(), 'https/2_xujing917.xyz.key'), 'utf8'),
  cert: fs.readFileSync(path.join(process.cwd(), 'https/1_xujing917.xyz_bundle.crt'), 'utf8')
};
const SSL_PORT = 443;

https.createServer(HTTPS_OPTOIN, app).listen(SSL_PORT, () => {
  console.log(`HTTPS Server is running on port ${SSL_PORT}...`);
});

function ensureSecure(req, res, next) {
  if (req.secure) {
    return next();
  };
  // res.redirect('https://' + req.host + req.url); // express 3.x
  res.redirect('https://' + req.hostname + req.url); // express 4.x
}