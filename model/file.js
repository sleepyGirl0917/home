// 1.引入mongoose模块
const mongoose = require('mongoose');

// 2.创建文件集合规则
const fileSchema = new mongoose.Schema({
	fileName: {
		type: String,
		maxlength: 32,
		minlength: 1,
		required: [true, '请填写文件名']
  },
  originName:{
    type: String,
		maxlength: 32,
		minlength: 1,
		required: [true, '请填写文件名']
  },
  fileSize:{
    type:Number,
    required:[true]
  },
  fileType:{
    type:String,
    required:[true]
  },
  path:{
    type:String,
    required:[true,'请填写文件地址']
  }
}, {
  timestamps: {createdAt: 'created', updatedAt: 'updated'}
});

// 3.根据规则创建集合
const File = mongoose.model('File', fileSchema);

// 4.将集合做为模块成员进行导出
module.exports = {
	File
}