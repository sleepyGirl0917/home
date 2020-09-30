const express = require('express');
const project = express.Router();

// project列表展示页面
project.get('/', require('./project/page/pro-list'));

// 项目详情展示页面
project.get('/:pro', require('./project/page/pro-redirect'));

module.exports = project;