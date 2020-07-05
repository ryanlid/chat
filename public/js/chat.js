const socket = io.connect();

const btn = document.getElementById('btn');

btn.addEventListener('click', function () {
  socket.emit('join', '1111');
});
