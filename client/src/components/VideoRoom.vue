<template>
  <div class="mainVideoRoom">
    <div class="videoName">
      <p class="myRoomAndUserName">部屋名：{{ roomname }}</p>
      <p class="myRoomAndUserName">ユーザー名：{{ username }}</p>
    </div>
    <div class="main">
      <div class="main__left">
        <div class="main__videos">
          <div id="video-grid">

          </div>
        </div>
        <div class="main__controls" style="width: 100px">
          <div class="main__controls__block">
            <div @click="muteUnmute" class="main__controls__block__button main__mute_button">
              <i class="fas fa-microphone"></i>
              <button>ミュート</button>
            </div>
            <div @click="playStop" class="main__controls__block__button main__video_button">
              <i class="fas fa-video"></i>
              <button>非表示</button>
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
        // port: '3000'
        port: process.env.VUE_APP_PEER_PORT
      })
      console.log(this.port)
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
        <button>ミュート</button>
      `
      document.querySelector('.main__mute_button').innerHTML = html;
    },
    setUnmuteButton() {
      const html = `
        <i class="unmute fas fa-microphone-slash"></i>
        <button>解除</button>
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
        <button>停止</button>
      `
      document.querySelector('.main__video_button').innerHTML = html;
    },
    setPlayVideo() {
      const html = `
      <i class="stop fas fa-video-slash"></i>
        <button>解除</button>
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

.mainVideoRoom {
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-around;
  .videoName {
    align-items: center;
    display: flex;
    .myRoomAndUserName {
      background-color: #f17091;
      font-family: 'Lato', 'Noto Sans JP', 'ヒラギノ角ゴ ProN', 'Hiragino Kaku Gothic ProN', 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
      color: #fff;
      border-radius: 40px;
      padding: 2px 3px;
      margin-right: 1rem;
    }
  }
  .main {
    .main__left {
      .main__videos {
        display: inline-block;
        // display: flex;
        // margin: auto;
        // margin: 0 auto;
        // justify-content: center;
        #video-grid {
          // display: flex;
          // display:inline-block;
          flex-direction: row-reverse;
          justify-content: center;
        }
      }
    }
    &__controls {
      display: inline-block;
      &__block {
        display: inline-table;
        &__button {
          button {
            background-color: rgba(255, 0, 119, 0.712);
            border-color: #1886b8;
            color: #fff;
            margin-top: 0.5rem;
            border-radius: 20%;
          }
        }
      }
    }
  }
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

@media (max-width: 767px) { 
  .main {
    display: flex;
    justify-content: space-between;
  }
  .main__left {
    display: flex;
    // justify-content: space-between;
  }
  .mainVideoRoom {
    display: inline-block;
  }
  .videoName {
    display: flex;
    justify-content: space-evenly;
  }
  #video-grid {
    // display: flex;
    // display:inline-block;
    display: inline-flex;
    // flex-direction: row;
    // justify-content: center;
    // margin: 0 auto;
    
  }
  video {
    // flex: 1;
    width: 60px;
    height: 60px;
    // border-radius: 100%;
    object-fit: cover;
    // position: absolute;
    border-radius: 50%;
  }
}


</style>