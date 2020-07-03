<template>
  <div id="app">
    <div class="header">
      <h1 class="logo">conVer</h1>
      <!-- <img src='./assets/conver.png' class="logo"> -->
      <p class="username">あなたの名前: {{ username }}</p>
      <p class="online">今暇な人: {{ users.length }}</p>
      
    </div>
    
      <ChatRoom v-bind:messages="messages" v-on:sendMessage="this.sendMessage" />
    
  </div>
</template>

<script>
import io from 'socket.io-client';
import ChatRoom from './components/ChatRoom';


export default {
  name: 'App',
  components: {
    ChatRoom
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
  background-image: linear-gradient(to bottom right, rgb(241, 207, 233), rgb(170, 226, 243));
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
  // background-color: #ffffff;
  // opacity: 0.5;
  background: rgba(162, 233, 30, 0.26);
  margin-bottom: 20px;
  border-radius: 30px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  padding: 10px;
  width: auto;
  height: auto;
  h1 {
    color: rgba(74, 248, 6, 0.733);
    text-shadow: 1px 3px rgba(0, 0, 0, 0.25); 
    text-align: center;
    &:hover {
				animation-name: rubberBand;
        animation-duration: 0.5s;
			}
  }
  // .logo {
  //  height: 200px;
  //  width: 400px;
  //  padding: 0;
  // }
  p {
    font-family: 'Lato', 'Noto Sans JP', 'ヒラギノ角ゴ ProN', 'Hiragino Kaku Gothic ProN', 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
    display: inline-block;
    background-color: rgba(187, 255, 0, 0.5);
    box-shadow: inset 0 0 15px rgba(0,0,0,.3);
    border-radius: 40px;
    padding: 3px;
   }
  p.online {
    margin-left: 30%;
  }
  
}

</style>
