# Name
 
conVerはコミュニケーションアプリケーションです。
アプリ名の語源は会話するという意味を持つ『conversation』をという文字をもじったものです。
またVue.jsをしようしているので関連性を持たせるために、Vの文字だけを大文字にしてます。

# DEMO
デモ動画はTwitterのリンクを載せています。そちらで実際の動作をご確認いただけます。

# Description

第一段階はチャット、第二段階はビデオ通話へと段階を踏ませてコミュニケーションを取れるように作成致しました。
文章だけのコミュニケーションを通じて、ビデオ通話へと段階を踏ませて、信頼のできる相手と実際に会話出来て、
互いにギャップが少なく楽しめるように作成したアプリです。

 
# Features
 
URLにアクセスしたと同時に、プロンプトでユーザーネームとルームネームを決めるだけでログインが可能である。
テストログインの場合は、デフォルトでユーザーネームとルームネームが元々決まってるので、何も入力せずに
Enterボタンを押し進めていただいて問題ありません。
ログイン後、カメラとマイク機能の許可について問われる場合は、許可するように設定していただくと、ビデオ通話機能をお使いいただけます。
ログイン後は自分の顔だけが見える状態でチャットすることが可能です。
チャットで意気投合すれば、相手に自身のルームネームを教え、
再度URLにアクセスとログインして、そのユーザーネームを入力すると、ビデオ通話へと移行することが出来ます。

 
# Environment

Herokuでデプロイしました。
URLにアクセスすると、プロンプトでユーザーネームとルームネームの入力が求められますが、
テストログインや機能の確認の場合、デフォルトで設定されているため、そのまま、Enterボタンで押し進めていただいて問題ありません。

# Background about my works

チャットより電話で気軽にコミュニケーションを取れるものがあったらいいなあと思い、作成しました。
いきなり知らない人と電話で交流するよりも、チャットでの文章コミュニーケーションを通じて、互いの相性を確認した後、
電話へと移ることでより円滑で楽しいものになれるのではないかと思い、こういった制限する機能を実装しました。
知り合い同士の活用の場合、事前にルームネームを知っていれば、すぐにビデオ通話としての利用も可能です。

# Scheme

操作のしやすさを重視して、ログイン機能をメールアドレスやパスワードのものではなく、プロンプトでその場で思いついた物を打ってもログイン出来るようにしました。
また、アプリ自体のページも一つにして、操作の箇所を少なくして、操作性について複雑なものにしないように心がけました。
一部の人とは、チャットで交流し、別の人とは同時並行でビデオ通話で交流という二重コミュニケーションも楽しめるように、
チャットページとビデオ通話のページを一つにしました。

# Functions that I want to put in the Future
 
ログイン時にユーザーネームが重複した場合のバリデーションや、
デフォルトのユーザーネームとルームネームも重複しないよう、ランダム生成するように実装していきたいです。

# App URL
 https://conver-chat-hinoizu.herokuapp.com/

# Requirement
  
* Vue.js 2.6.11
* VueCli 4.5.0
* Node.js 14.0.0
 
# Usage

`$ git clone https://github.com/hideokawahara/my-chat-app_node_vue.git`  

`$ cd my-chat-app_node_vue`

`$ npm install`

`$ npm run dev`

`$ cd client`

`$ npm install`

`$ npm run serve`

# Note
 
動作に少しタイムタグが発生する場合があります。
 
# Author
  
* hideokawahara

 
# License
ライセンスを明示する
 
"conVer" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).
