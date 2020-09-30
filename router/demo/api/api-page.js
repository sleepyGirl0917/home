// // 普通分页
// // 导入文件集合构造函数
// const {File}=require('../../../model/file');

// module.exports = async (req, res) => {
// 	// 接收客户端传递过来的当前页参数
// 	let page = req.query.page || 1;
// 	// 每一页显示的数据条数
// 	let pagesize = 10;
// 	// 查询用户数据的总数
// 	let count = await File.countDocuments({});
// 	// 总页数
//   let total = Math.ceil(count / pagesize);
  
// 	// 页码对应的数据查询开始位置
// 	let start = (page - 1) * pagesize; 

// 	// 将文件信息从数据库中查询出来
//   let files = await File.find({}).limit(pagesize).skip(start)
  
// 	// 渲染文件下载列表页面模板
//   res.render('demo/download.art', {
// 		files: files,
// 		page: page,
// 		total: total
// 	});
// }