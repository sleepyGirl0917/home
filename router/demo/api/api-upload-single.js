// 导入文件集合构造函数
const { File } = require('../../../model/file');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
const sd = require("silly-datetime");

module.exports = (req, res) => {
	// 获取项目根目录
	const rootPath = __dirname.split('router')[0];

	// 创建formidable表单解析对象
	const form = new formidable.IncomingForm({
		encoding: 'utf-8', // 文件编码
		uploadDir: path.join(rootPath, 'public', 'upload'), // 上传文件的存储路径
		keepExtensions: true, // 保留上传文件的后缀
		maxFieldsSize: 2 * 1024 * 1024, // 单文件大小限制
	});

	// 检查目标目录是否存在，不存在则创建
	fs.access(form.uploadDir, (err) => {
		if (err) {
			fs.mkdirSync(form.uploadDir);
		}
		// 解析客户端传递过来的FormData对象
		formParser(form, req, res);
	});
}

function formParser(form, req, res) {
	form.parse(req, (err, fields, files) => {
		// 格式化时间
		var t = sd.format(new Date(), 'YYYYMMDDHHmmss');;
		// 生成随机数
		var ran = parseInt(Math.random() * 8999 + 10000);
		// 拿到扩展名
		var extname = path.extname(files.attrName.name);
		// 旧的路径
		var oldpath = path.normalize(files.attrName.path);
		// 新的路径
		var newfilename = t + ran + extname;
		var newpath = path.join(form.uploadDir, newfilename);
		// 文件改名
		fs.renameSync(oldpath, newpath);
		// 将上传文件信息存储到文件集合中
		File.create({
			fileName: newfilename,
			originName: files.attrName.name,
			fileSize: files.attrName.size,
			fileType: files.attrName.type,
			path: newpath.split('public')[1],
		});
		// 根据上传文件类型给客户端响应数据
		if (files.attrName == undefined) {
			res.send({
				message: '没有接收到文件',
				fields,
				files,
				path: '/img/error.png'
			});
		} else if (/image\/\w+/.test(files.attrName.type)) {
			res.send({
				message: "上传文件为图片",
				fields,
				files,
				path: newpath.split('public')[1]
			});
		} else { // 上传文件为其他类型
			res.send({
				message: "上传其他类型文件",
				fields,
				files,
				path: '/img/ok.jpg'
			});
		};
	})
}
