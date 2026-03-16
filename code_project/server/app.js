var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const UserRouter = require('./routes/admin/UserRouter');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const JWT = require('./util/JWT');
const NewsRouter = require('./routes/admin/NewsRouter');
const webNewsRouter = require('./routes/web/NewsRouter');
const webProductRouter = require('./routes/web/ProductRouter');
const ProductRouter = require('./routes/admin/ProductRouter');
const CategoryRouter = require('./routes/admin/CategoryRouter');
const RoleRouter = require('./routes/admin/RoleRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// 前端web界面用的新闻路由
app.use(webNewsRouter);
app.use(webProductRouter);

/** 
 /adminapi/*－后台系统用的
 /webapi/*－企业官网用的
 **/


app.use((req, res, next) => {
  //如果token有效，next（）
  //如果token过期了，返回401错误
  if (req.url === '/adminapi/user/login' || req.url === '/adminapi/user/register') {
    next();
    return;
  }
  const token = req.headers['authorization'].split(' ')[1];
  if (token) {
    const payload = JWT.verify(token);
    // console.log(payload)
    if (payload) {
      // const newToken =JWT.generate(payload,'10s')
      const newToken = JWT.generate({
        _id: payload._id,
        username: payload.username
      }, '1d');
      res.header('Authorization', newToken);
      next();
    }
    else {
      res.status(401).send({ errCode: '-1', errorOnfo: 'token过期' });
    }
  }
});

//  后台系统用的用户路由
app.use(UserRouter);
// 后台系统用的新闻路由
app.use(NewsRouter);
// 后台系统用的产品路由
app.use(ProductRouter);
// 后台系统用的分类路由
app.use(CategoryRouter);
// 后台系统用的角色路由
app.use(RoleRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
