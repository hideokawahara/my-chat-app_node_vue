<template>
  <div>
   <h1>test</h1>
   <h2>{{ username }}</h2>
   <div id="video-grid">

   </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import Peer from "peerjs";

export default {
  name: 'videoroom',
	props: ['username'],
	data: function () {
		return {
      socket: io(process.env.VUE_APP_API_UR)
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
      console.log('peerの生成は成功。videooから', myPeer)
      const videoGrid = document.getElementById('video-grid')
      const myVideo = document.createElement('video');
      myVideo.muted = true;
      // const peers = {}
      // let myVideoStream;
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then(stream => {
        // myVideoStream = stream;
        addVideoStream(myVideo, stream)

        myPeer.on('call', call => {
          call.answer(stream)
          const video = document.createElement('video')
          call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
          })
        })

        this.socket.on('loggedIn', (peerId) => {
          connectToNewUser(peerId, stream);
        });

      })

      // this.socket.on('user-disconnected', peerId => {
      //   if (peers[peerId]) peers[peerId].close()
      // })

      // this.socket.emit('newuser');
      // this.socket.on('user-connected', () => {
      //   connectToNewUser();
      // })
      myPeer.on('open', id => {
        console.log('peerIdの生成は成功.videoから', id)
        console.log(this.username)
        this.socket.emit('newuser', this.username, id);
      })

     

      const connectToNewUser = (peerId, stream) => {
        console.log(22, peerId)
        const call = myPeer.call(peerId, stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
          addVideoStream(video, userVideoStream)
        })
        call.on('close', () => {
          video.remove()
        })
        // peers[peerId] = call
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