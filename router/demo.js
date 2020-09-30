const express = require('express');
const demo = express.Router();

// demo列表展示页面
demo.get('/', require('./demo/page/demo-list'));

// 单文件上传详情页面
demo.get('/upload/single', require('./demo/page/demo-upload-single'));

// 多文件上传详情页面
demo.get('/upload/multiple', require('./demo/page/demo-upload-mutiple'));

// 文件下载详情页面
demo.get('/download', require('./demo/page/demo-download'));

// 实现单个文件上传功能的路由
demo.post('/upload/single', require('./demo/api/api-upload-single'));

// 实现多个文件上传功能的路由
demo.post('/upload/multiple', require('./demo/api/api-upload-mutiple'));

module.exports = demo;