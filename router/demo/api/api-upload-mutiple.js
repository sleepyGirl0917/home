// 导入文件集合构造函数
const { File } = require('../../../model/file');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
const sd = require("silly-datetime");

module.exports = (req, res, next) => {
	// 获取项目根目录
	const rootPath = __dirname.split('router')[0];

	// 创建formidable表单解析对象
	const form = new formidable.IncomingForm({
		encoding: 'utf-8', // 文件编码
		uploadDir: path.join(rootPath, 'public', 'upload'), // 上传文件的存储路径
		keepExtensions: true, // 保留上传文件的后缀
		maxFieldsSize: 2 * 1024 * 1024, // 单文件大小限制
		multiples:true  // 允许多文件上传
	});

	// 检查目标目录是否存在，不存在则创建
	fs.access(form.uploadDir, (err) => {
		if (err) {
			fs.mkdirSync(form.uploadDir);
		}
		_fileParseMultiple();
	});

	// 文件解析与保存
	function _fileParseMultiple() {
		const fileAttr = async (file) => {
			// 格式化时间
			var t = sd.format(new Date(), 'YYYYMMDDHHmmss');;
			// 生成随机数
			var ran = parseInt(Math.random() * 8999 + 10000);
			// 拿到扩展名
			var extname = path.extname(file.name);
			// 旧的路径
			var oldpath = path.normalize(file.path);
			// 新的路径
			var newfilename = t + ran + extname;
			var newpath = path.join(form.uploadDir, newfilename);
			// 文件改名
			// fs.renameSync(oldpath, newpath);
			await fs.rename(oldpath, newpath, () => {
				console.log({
					fileName: newfilename,
					originName: file.name,
					fileSize: file.size,
					fileType: file.type,
					path: newpath.split('public')[1]
				});
			});
			// 将上传文件信息存储到文件集合中
			await File.create({
				fileName: newfilename,
				originName: file.name,
				fileSize: file.size,
				fileType: file.type,
				path: newpath.split('public')[1]
			});
		};

		// 解析客户端传递过来的FormData对象
		form.parse(req, (err, fields, files) => {
			if (err) throw err;
			if (files.attrName == undefined) {
				res.send({ message: '没有接收到文件', fields, files, path: '/img/error.png' });
			} else if (files.attrName instanceof Array) {
				// 遍历文件数组
				files.attrName.forEach(fileAttr);
				res.send({ message: "上传多个文件", fields, files, path: '/img/ok_1.jpg' })
			} else if (files.attrName) {
				fileAttr(files.attrName);
				res.send({ message: "上传单个文件", fields, files, path: '/img/ok_2.jpg' })
			}
		});
	}
}

// files:{attrName:[file:{},file:{},file:{}],other:...}
// var keys = Object.keys(files); 
// keys:["attrName","other"]

