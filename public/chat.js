$(function(){
  var socket = io.connect('http://localhost:3000');

  var message = $('#message');
  var username = $('#username');
  var send_message = $('#send_message');
  var send_username = $('#send_username');
  var chatroom = $('#chatroom');
  var getHistory = true;

  socket.emit('history');

  // listen for history on first time connecting
  socket.on('history', (data) => {
    if (getHistory == true) {
      for (var i =0; i < data.length; i++) {
        chatroom.append("<p class='message'>" + data[i].username + ": " + data[i].message + "</p>");
      }
      getHistory = false;
    }
  });

  // update username
  send_username.click(function() {
    socket.emit('change_username', {
      username: username.val()
    });
  });

  // send a new message
  send_message.click(function() {
    socket.emit('new_message', {
      message: message.val()
    });
    message.val('');
  });

  // listen for new messages from server
  socket.on('new_message', (data) => {
    console.log(data);
    chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>");
  });
});
