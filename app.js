const express = require('express');
const app = express();
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

server = app.listen(3000);
const io = require('socket.io')(server);

// listen on all connections
io.on('connection', (socket) => {
  console.log('New user connected');

  // I would typically log to a database, but for brevity we will use a file for this test.
  let emulatedChatLog = JSON.parse(fs.readFileSync('log.json'));

  // set user's default name
  socket.username = "Anonymous";

  socket.on('history', (data) => {
    io.sockets.emit('history', emulatedChatLog.log);
  });

  // listen for the user to change their name
  socket.on('change_username', (data) => {
    if (socket.username != data.username) {
      io.sockets.emit('new_message', {
        message: socket.username + " is now known as " + data.username,
        username: '->'
      });
      socket.username = data.username;
    }
  });

  // listen for new messages
  socket.on('new_message', (data) => {
    // broadcast
    io.sockets.emit('new_message', {
      message: data.message,
      username: socket.username
    });
    // again, I would typially log history to a db, but using a file for this test.
    emulatedChatLog.log.push({message: data.message, username: socket.username});
    fs.writeFile('log.json', JSON.stringify(emulatedChatLog), 'utf-8', function(err) {
	     if (err) {throw err}
    });
  });
});
