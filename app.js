const path = require('path');
const http = require('http');
const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const socketio = require('socket.io');

const app = express();
const indexRouter = require('./routes/index');
const chatRouter = require('./routes/chat');
const transferRouter = require('./routes/transfer');

const http_server = http.createServer(app);
const io = socketio.listen(http_server);

require('./io')(io);

// 模版引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/chat', chatRouter);
app.use('/transfer', transferRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.error_message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

http_server.listen(3000);
