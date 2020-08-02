<template>
  <div class="chat-window">
		<div class="messages">
			<button class="btn btn-success" @click="scrollToElement">最下部へ↓</button>
			<transition-group enter-active-class="animate__animated animate__rotateIn" appear="">
				
			<div class="message" v-for="message in messages" v-bind:key="message._id">
				<div class="username">{{message.username}}</div>
				<div class="message-text">{{message.msg}}</div>
			</div>
			</transition-group>
			<div class="scroll-to-me"></div>
		</div>
		
		<form class="input-container" v-on:submit="sendMessage">
			<input type="text" v-model="msg">
			<button class="btn btn-primary"
							@click="scrollToElement"
							v-on:click="sendMessage" 
							v-bind:disabled="!msg">送信</button>
		</form>
	</div>
</template>

<script>
export default {
	name: 'chatroom',
	props: ['messages'],
	data: function () {
		return {
			msg: "",
		}
	},
	methods: {
		sendMessage: function () {
			if (!this.msg) {
				alert("Please enter a message");
				return;
			}
			this.$emit('sendMessage', this.msg);
			this.msg = "";
		},
		scrollToElement() {
			const el = this.$el.getElementsByClassName('scroll-to-me')[0];

			if (el) {
				el.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
			}
		}
	},
	mounted() {
		this.scrollToElement(false);
	},
	updated() {
		this.scrollToElement(false);
	}
	
}
</script>

<style lang="scss" scoped>
.chat-window {
	flex: 1;
	display: flex;
	flex-direction: column;
	// background-color: #F9F9F9;
	background-color: #eee6ea50;
	padding: 0 15px 15px;
	// box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
	box-shadow: 3px 6px rgba(255, 102, 0, 0.25);
	overflow: scroll;
	border-radius: 15px;
	.messages {
		flex: 1;
		overflow: scroll;
		.btn.btn-success {
			position: fixed;
			left: 70vw;
			z-index: 1;
			// background-color: rgba(0, 255, 98, 0.712);
			background-color: rgba(255, 0, 119, 0.712);
			border-color: #1886b8;
			&:hover {
				animation-name: heartBeat;
        animation-duration: 1s;
			}
			&:active  {
				animation-name: wobble;
        animation-duration: 2s;
			}
		}
		.message {
			display: flex;
			border-bottom: 1px solid #EFEFEF;
			margin-bottom: 10px;
			padding: 10px;
			// background-color: rgba(7, 243, 231, 0.342);
			background-color: #FFF4F7;
			color: #F2587F;
			border-radius: 35px 20px 30px 0px;
			// box-shadow: inset 0 0 15px rgba(0,0,0,.3);
			box-shadow: inset 0 0 15px rgba(255, 0, 85, 0.3);
			white-space: pre-wrap;
			word-break: break-all;
			&:last-of-type {
				border-bottom: none;
			}
			.username {
				width: 100px;
				margin-right: 15px;
			}
			.message-text {
				flex: 1;
				font-family: 'Lato', 'Noto Sans JP', 'ヒラギノ角ゴ ProN', 'Hiragino Kaku Gothic ProN', 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
			}
		}
	}
	.input-container {
		display: flex;
		input {
			flex: 1;
			height: 35px;
			font-size: 18px;
			box-sizing: border-box;
			border-radius: 0px 16px 0px 16px;
			border-color: #e97bcd;
			background-color: rgb(248, 209, 235);
			&:focus {
				// box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
				// background-color: rgba(230, 18, 18, 0.75);
				// border-radius: 16px 0px 16px 0px;
				// border-color: blue;
				outline: 0;
				box-shadow: none;
				border: 2px solid #e97bcd;
				box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
				background-color: rgba(255, 255, 255, 0.75);
				border-radius: 16px 0px 16px 0px;
			}
		}
		button {
			width: 75px;
			height: 35px;
			box-sizing: border-box;
			// background-color: rgba(0, 255, 98, 0.712);
			background-color: #f17091;
			border-color: #ff597e;
		}
		.btn.btn-primary {
			margin-left: 5px;
		}
	}
}

</style>