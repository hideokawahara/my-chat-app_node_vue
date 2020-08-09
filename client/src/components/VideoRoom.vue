<template>
  <div>
   <h1>test</h1>
   <div id="video-grid">

   </div>
  </div>
</template>

<script>
// import io from 'socket.io-client';
// import Peer from "peerjs";
// import jQuery from "jquery";
// global.jquery = jQuery;
// global.$ = jQuery;
// window.$ = window.jQuery = require("jquery");

export default {
  name: 'videoroom',
	// props: [''],
	data: function () {
		return {
			// msg: "",
		}
	},
	methods: {
    makevideo() {
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
  video {
    flex: 1;
    width: 100px;
    height: 100px;
  }
</style>