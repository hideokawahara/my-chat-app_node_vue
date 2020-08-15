<template>
  <div>
    <p>部屋名：{{ roomname }}</p>
    <h2>ユーザー名：{{ username }}</h2>
    <div class="main">
      <div class="main__left">
        <div class="main__videos">
          <div id="video-grid">

          </div>
        </div>
        <div class="main__controls" style="width: 100px">
          <div class="main__controls__block">
            <div @click="muteUnmute" class="main__controls__button main__mute_button">
              <i class="fas fa-microphone"></i>
              <span>ミュート</span>
            </div>
            <div @click="playStop" class="main__controls__button main__video_button">
              <i class="fas fa-video"></i>
              <span>非表示</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Peer from "peerjs";
let myVideoStream;
export default {
  name: 'videoroom',
	props: ['username', 'socket', 'roomname'],
	data: function () {
		return {
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
      const peers = {}
      // let myVideoStream;
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then(stream => {
        myVideoStream = stream;
        addVideoStream(myVideo, stream)
        myPeer.on('call', call => {
          call.answer(stream)
          const video = document.createElement('video')
          call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
          })
        })
        this.socket.on('loggedInSendingVideo', (peerId) => {
          connectToNewUser(peerId, stream);
        });
      })
      // ここから生成するIDをnodeに送る。スタート。
      myPeer.on('open', id => {
        console.log('peerIdの生成は成功.videoから', id)
        console.log(this.username)
        console.log(this.roomname)
        // this.socket.emit('newuserFromPeer', this.username, id);
        this.socket.emit('newuserFromPeer', this.roomname, id);
      })

      // this.socket.on('user-disconnected-video', peerId => {
      //   if (peers[peerId]) peers[peerId].close()
      // })

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
        // 別になくても動く。よう分からない。
        peers[peerId] = call
      }
      const addVideoStream = (video, stream) => {
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
          video.play()
        })
        videoGrid.append(video)
      }
    },
    muteUnmute() {
      const enabled = myVideoStream.getAudioTracks()[0].enabled;
      if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        this.setUnmuteButton();
      } else {
        this.setMuteButton();
        myVideoStream.getAudioTracks()[0].enabled = true;
      }
    },
    setMuteButton() {
      const html = `
        <i class="fas fa-microphone"></i>
        <span>Mute</span>
      `
      document.querySelector('.main__mute_button').innerHTML = html;
    },
    setUnmuteButton() {
      const html = `
        <i class="unmute fas fa-microphone-slash"></i>
        <span>Unmute</span>
      `
      document.querySelector('.main__mute_button').innerHTML = html;
    },
    playStop() {
      console.log('object')
      let enabled = myVideoStream.getVideoTracks()[0].enabled;
      if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        this.setPlayVideo()
      } else {
        this.setStopVideo()
        myVideoStream.getVideoTracks()[0].enabled = true;
      }
    },
    setStopVideo() {
      const html = `
        <i class="fas fa-video"></i>
        <span>Stop Video</span>
      `
      document.querySelector('.main__video_button').innerHTML = html;
    },
    setPlayVideo() {
      const html = `
      <i class="stop fas fa-video-slash"></i>
        <span>Play Video</span>
      `
      document.querySelector('.main__video_button').innerHTML = html;
    },
    // movingTheVideo(event) {
    //   console.log(event)
    //   const moveVideo = document.querySelector('video')
    //   console.log(moveVideo)
    //   moveVideo.style.left = `${event.clientX - 100}px`;
    //   moveVideo.style.top = `${event.clientY - 100}px`;
    // }
  },
	mounted() {
		this.makevideo();
	}
}
document.addEventListener('mousedown', () => {
  document.addEventListener('mousemove', movingTheVideo)
  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', movingTheVideo)
  })
})

const movingTheVideo = (event) => {
  // console.log(event)
  const moveVideo = document.querySelector('video')
  console.log(moveVideo)
  moveVideo.style.left = `${event.clientX - 100}px`;
  moveVideo.style.top = `${event.clientY - 100}px`;
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
  // position: absolute;
  border-radius: 50%;
}


</style>