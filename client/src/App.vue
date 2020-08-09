<template>
  <div id="app">
   
    <div class="header">
      <h1 class="logo">conVer</h1>
      <p class="username">あなたの名前: {{ username }}</p>
      <p class="online">今暇な人: {{ users.length }}</p>
      <div class="heart"></div>
    </div>
      <ChatRoom v-bind:messages="messages" v-on:sendMessage="this.sendMessage" />
      <VideoRoom />
  </div>
</template>
<script>
import io from 'socket.io-client';
import ChatRoom from './components/ChatRoom';
import VideoRoom from './components/VideoRoom';
export default {
  name: 'App',
  components: {
    ChatRoom,
    VideoRoom
  },
  data: function () {
    return {
      username: "",
      socket: io(process.env.VUE_APP_API_UR),
      messages: [],
      users: []
    }
  },
  methods: {
    joinServer: function () {
      this.socket.on('loggedIn', data => {
        this.messages = data.messages;
				this.users = data.users;
				this.socket.emit('newuser', this.username);
      });
      this.listen();
    },
    listen: function () {
      this.socket.on('userOnline', user => {
				this.users.push(user);
      });
      this.socket.on('userLeft', user => {
				this.users.splice(this.users.indexOf(user), 1);
      });
      this.socket.on('msg', message => {
				this.messages.push(message);
			});
    },
    sendMessage: function (message) {
			this.socket.emit('msg', message);
		}
   },
  mounted: function () {
    this.username = prompt("あなたの名前は?", "ゲスト");

    if (!this.username) {
			this.username = "ゲスト";
    }
    this.joinServer();
  }
}
</script>
<style lang="scss">
body {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	color: #2C3E50;
	margin: 0;
	padding: 0;
  // background-image: linear-gradient(to bottom right, rgb(241, 207, 233), rgb(170, 226, 243));
  background-image: linear-gradient(-45deg,#ffc2d2 0,#feceda 50%,#f890aa 100%);
}
#app {
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100%;
	max-width: 768px;
	margin: 0 auto;
  padding: 0 15px 15px;
  box-sizing: border-box;
}
.header {
  margin-top: 10px;
  background-color: #fdedf1;
  margin-bottom: 20px;
  border-radius: 30px;
  // box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  box-shadow: 3px 6px rgba(247, 72, 3, 0.25);
  padding: 10px;
  width: auto;
  height: auto;
  h1 {
    color: #ff597e;
    text-shadow: 1px 3px rgba(0, 0, 0, 0.25); 
    text-align: center;
    &:hover {
				animation-name: rubberBand;
        animation-duration: 0.5s;
			}
  }
  p {
    font-family: 'Lato', 'Noto Sans JP', 'ヒラギノ角ゴ ProN', 'Hiragino Kaku Gothic ProN', 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
    display: inline-block;
    background-color: #f17091;
    color: #fff;
    // box-shadow: inset 0 0 15px rgba(0,0,0,.3);
    // border-radius: 40px;
    border: 2px solid #f17091;
    border-radius: 40px;
    border: 2px solid #f17091;
    padding: 3px;
   }
  p.online {
    margin-left: 30%;
  }
}

.heart {
  position: absolute;
  // width: 100px;
  // height: 90px;
  width: 100px;
  height: 90px;
  left: 75%;
  margin-top: -45px;
  margin-left: -50px;
}
.heart:before,
.heart:after {
  position: absolute;
  content: "";
  left: 50px;
  top: 0;
  // width: 50px;
  // height: 80px;
  width: 50px;
  height: 80px;
  background: #f78cc7f3;
  border-radius: 50px 50px 0 0;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
}
.heart:after {
  left: 0;
  transform: rotate(45deg);
  transform-origin :100% 100%;
}

.heart {
  animation: pounding .5s linear infinite alternate;
}
 
@keyframes pounding{
  0%{ transform: scale(1.5); }
  100%{ transform: scale(1); }
}
</style>
