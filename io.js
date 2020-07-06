module.exports = function (io) {
  io.sockets.on('connection', (socket) => {
    // socket 为每个客户端
    socket.emit('joined', 'Hello');

    // 消息转发
    socket.on('message', (room, data) => {
      console.log('message', room, data);
      socket.to(room).emit('message', room, data);
    });

    socket.on('join', (room) => {
      // 加入房间
      socket.join(room);

      const myRoom = io.sockets.adapter.rooms[room];
      console.log(myRoom);
      // 获取房间用户数
      const users = Object.keys(myRoom.sockets).length;
      logger.log('the number of user in room is: ' + users);
      // // 回复发送者
      // socket.emit('joined',room,socket.id);
      // // 给房间除自己其他人发送
      // socket.to(room).emit('joined',room,socket.id)
      // // 给房间所有人发送
      // io.in(room).emit('joined',room,socket.id);

      // // 给除自己全部人发送
      // socket.broadcast.emit('joined', room, socket.id);

      if (users < USERCOUNT) {
        socket.emit('joined', room, socket.id);
        // 第二个人加入
        if (users > 1) {
          socket.to(room).emit('otherjoin', room, socket.id);
        }
      } else {
        socket.leave(room);
        socket.emit('full', room, socket.id);
      }
    });

    socket.on('leave', (room) => {
      const myRoom = io.sockets.adapter.rooms[room];
      console.log('room', room);
      console.log('myRoom.sockets ', myRoom.sockets);
      // 获取房间用户数
      const users = Object.keys(myRoom.sockets).length;
      logger.log('the number of user in room is: ' + users);
      // 离开房间
      socket.leave(room);
      logger.log('the number of user in room is leave: ' + users);
      // // 回复发送者
      // socket.emit('joined', room, socket.id);
      // // 给房间除自己其他人发送
      // socket.to(room).emit('joined', room, socket.id);
      // // 给房间所有人发送
      // io.in(room).emit('joined', room, socket.id);

      // // 给除自己全部人发送
      // socket.broadcast.emit('leaved', room, socket.id);
    });
  });
};
