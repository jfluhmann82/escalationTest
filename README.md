# Escalation Test Chat App

This is Justin Fluhmann's chat app for the Escalation test

### Tech

This library used the following technologies:

* [node.js](http://www.nodejs.org) - evented I/O for the backend
* [Express](http://www.expressjs.com) - fast node.js network app framework [@tjholowaychuk]
* [socket.io](http://www.socket.io) - Javascript websockets library.

### Installation

This app was built using node v9.10

Install the dependencies and start the server.

```sh
$ cd escalationTest
$ npm install
$ npm run start
```
Once running, open as many browser windows as you like, and navigate to `localhost:3000`

You my enter chat messages in the input at the bottom, or change your users name inn the input at the top.

I have included the client code in this repo to keep it self contained.

The socket interface has 3 endpoints
 * history - When the client emits a call to history, it will send a history of the chat log to the client.
 * change_username - When the client emits a call to change_username, it will allow the user to change their display
 name, and alert all other clients if the user is changing it to a new name.
 * new_message - When the client emits a call to new_message, it will send the chat message to the server and emit to all
 the clients as well as log to the chat log.

app.js is the server
public/chat.js is the client code.
