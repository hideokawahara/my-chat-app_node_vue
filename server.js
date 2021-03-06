const express = require("express");
const app = express();
const path = require('path');
const serveStatic = require('serve-static');
const http = require("http").Server(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");
let users = [];
let messages = [];

// ここから改造しています。

// cors使うとバグりやすい？？
// const cors = require("cors");
// app.use(cors());

const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(http, {
  debug: true,
});
app.use("/peerjs", peerServer);

// ここまで

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chatapp');

const ChatSchema = mongoose.Schema({
  username: String,
  msg: String
});

const ChatModel = mongoose.model("chat", ChatSchema);

ChatModel.find((err, result) => {
  if (err) throw err;

  messages = result;
});

// ここからがsocketの改造

io.on("connection", (socket) => {
  socket.emit("loggedIn", {
    users: users.map((s) => s.username),
    messages: messages,
  });

  // 1 ここがログインのクライアントにつながってる。
  socket.on("newuser", username => {
    console.log(`${username} がログインしました`);
    socket.username = username;
    users.push(socket);  
    io.emit("userOnline", socket.username);
  });

  socket.on("newuserFromPeer", (roomname, peerId) => {
    // ビデオの実装
    // このままだと同じユーザー名の人同士でしかグループ通話出来ない。ユーザー名がルームIDになる
    // roomnameを作り、同じroomnameを持つ人同士でビデオ通話できる。
    socket.join(roomname);
    socket.to(roomname).broadcast.emit("loggedInSendingVideo", peerId);
  });



  socket.on("msg", (msg) => {
    let message = new ChatModel({
      username: socket.username,
      msg: msg,
    });

    message.save((err, result) => {
      if (err) throw err;

      messages.push(result);

      io.emit("msg", result);
    });
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log(`${socket.username} がログアウトしました`);
    io.emit("userLeft", socket.username);
    users.splice(users.indexOf(socket), 1);
    // socket.to(roomname).broadcast.emit("user-disconnected-video", peerId);
  });
});

// ここまで

if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(serveStatic(__dirname + "/public"));

  // Handle SPA
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  });
}

http.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port %s", process.env.PORT || 3000);
});