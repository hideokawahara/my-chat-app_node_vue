<template>
  <div>
   <h1>test</h1>
   <div id="video-grid">

   </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import Peer from "peerjs";
// import jQuery from "jquery";
// global.jquery = jQuery;
// global.$ = jQuery;
// window.$ = window.jQuery = require("jquery");

export default {
  name: 'videoroom',
	props: ['username'],
	data: function () {
		return {
      socket: io(process.env.VUE_APP_API_UR),
      // myPeer: new Peer(undefined, {
      //   path: '/peerjs',
      //   host: '/',
      //   port: '3000'
      // })
		}
	},
	methods: {
    makevideo() {
      const myPeer = new Peer(undefined, {
        path: '/peerjs',
        host: '/',
        // port: '443'
        port: '3000'
      })
      console.log(1, myPeer)
      const videoGrid = document.getElementById('video-grid')
      const myVideo = document.createElement('video');
      myVideo.muted = true;

      // let myVideoStream;
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then(stream => {
        // myVideoStream = stream;
        addVideoStream(myVideo, stream)
      })

      // this.socket.emit('newuser');
      // this.socket.on('user-connected', () => {
      //   connectToNewUser();
      // })
      myPeer.on('open', id => {
        console.log(3, id)
      })

      this.socket.on('loggedIn', () => {
        // this.socket.emit('newuser', this.props.username);
        connectToNewUser();
      });

      const connectToNewUser = () => {
        console.log('new user')
      }

      const addVideoStream = (video, stream) => {
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
          video.play()
        })
        videoGrid.append(video)
      }
    }
  },
	mounted() {
		this.makevideo();
	}
}
</script>

<style lang="scss">
#video-grid {
  display: flex;
  justify-content: center;
}

video {
  // flex: 1;
  width: 100px;
  height: 100px;
  // border-radius: 100%;
  object-fit: cover;
}
</style>