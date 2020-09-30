// 导入文件集合构造函数
const {File}=require('../../../model/file');

// 导入分页模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
  // 获取页码值
  const page = req.query.page;

  // 从数据库中查询数据
  let result = await pagination(File).page(page).size(4).display(5).find().sort({'_id':-1}).exec();

  // page 指定当前页
  // size 指定每页显示的数据条数
  // display 指定客户端要显示的页码数量
  // exec 向数据库中发送查询请求查询所有文件数据

  // 读取文件列表
  // let result = await File.find();
  // res.send(result)

  // 渲染文件下载列表页面模板
  res.render('demo/download.art', {
    result: result
  });
}