var express = require('express');
const NewsController = require('../../controllers/web/NewsController');
var NewsRouter = express.Router();

// 获取新闻列表数据路由
NewsRouter.get('/webapi/news/list', NewsController.getList)
NewsRouter.get('/webapi/news/list/:id', NewsController.getList)
NewsRouter.get('/webapi/news/toplist', NewsController.getTopList)


module.exports = NewsRouter