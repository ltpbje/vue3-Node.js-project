var express = require('express');
var UserRouter = express.Router();
const UserController =require('../../controllers/admin/UserController')


var path = require('path')
// 图片上传处理
const multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/avataruploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})
var upload = multer({ storage: storage });

// 用户登录路由 
UserRouter.post('/adminapi/user/login', UserController.login);
// 用户注册路由
UserRouter.post('/adminapi/user/register', UserController.register);
// 更新用户信息路由
UserRouter.post('/adminapi/user/upload',upload.single('file') ,UserController.upload);
// 添加用户路由
UserRouter.post('/adminapi/user/add',upload.single('file') ,UserController.add);
// 获取用户信息列表
UserRouter.get('/adminapi/user/list', UserController.getList);
//  获取含有密码的单个用户信息
UserRouter.get('/adminapi/user/list/:id' ,UserController.getList);
// 删除用户
UserRouter.delete('/adminapi/user/list/:id' ,UserController.delList);
// 编辑用户
UserRouter.put('/adminapi/user/list/:id' ,UserController.putList);



module.exports = UserRouter;
