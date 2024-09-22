var express = require('express');
var UserRouter = express.Router();
const UserController =require('../../controllers/admin/UserController')

// 图片上传 
const multer  = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })

// 用户登录路由 
UserRouter.post('/adminapi/user/login', UserController.login);
// 更新用户信息路由
UserRouter.post('/adminapi/user/upload',upload.single('file') ,UserController.upload);
// 添加用户路由
UserRouter.post('/adminapi/user/add',upload.single('file') ,UserController.add);



module.exports = UserRouter;
