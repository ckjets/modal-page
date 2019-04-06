//Youtube API

      // このコードは 非同期的に読み込まれる
      // このセクションのコードにより IFrame Player API JavaScript コードが読み込まれます。
      //この例では DOM 変更を使って API コードをダウンロードすることで、コードが非同期で取得されるようにします。
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];

      // firstScriptTagの前にtagをいれてる
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 
      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;

      //onYouTubeIframeAPIReady = ページでプレーヤー API 用の JavaScript のダウンロードが完了すると API がこの関数を呼び出します。
      //これにより、ページで API を使用できるようになります。この関数では、ページが読み込まれたときに表示するプレーヤー オブジェクトを作成できます。
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '500',
          width: '500',

          //連想配列にするのかな
          videoId: 'UzuOw50zmbU',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      // 動画が再生できる準備ができたら下のファンクションが呼び出される
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.

      //    このAPIはステータスが変わった時に呼び出される
      //    このファンクションはビデオが流れていることを示している state=1のとき
      //    このプレイヤーは6秒流れたあと止まらなければならない

      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 10000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }




//退避

// プレーヤーのサイズを指定
var ytWidth = 640;
var ytHeight = 390;
 
// 埋め込むyoutubeのIDと埋め込むエリアを指定
var ytData = [
  {
      id: 'UzuOw50zmbU',
      area: 'player01'
  }, {
      id: '8fa_pocBvbk',
      area: 'player02'
  }, {
      id: 'DOacGGRLi64',
      area: 'player03'
  },
];
 
var ytPlayer = [];
var ytPlaying, ytStop, ytPlay;
 
// YouTube Player APIを読み込む
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
 
// API読み込み後に、各エリアにプレーヤーを埋め込む
function onYouTubeIframeAPIReady() {
    for(var i = 0; i < ytData.length; i++) {
        ytPlayer[i] = new YT.Player(ytData[i]['area'], {
            height: ytHeight,
            width: ytWidth,
            videoId: ytData[i]['id'],
            events: {
                'onStateChange': onPlayerStateChange,
                  //合体
                  'onReady': onPlayerReady,
                  //合体
                  'onStateChange': onPlayerStateChange
            }
        });
    }
}
 
// プレーヤーの状態に変化があった時に実行
function onPlayerStateChange(event) {
    // 各プレーヤーの状態を確認
    for(var i = 0; i < ytData.length; i++) {
        var thisState = ytPlayer[i].getPlayerState();
        if( thisState == 1 && ytPlaying == undefined) {
            ytPlaying = i;
        } else if(thisState == 1 && ytPlaying != i) {
            ytStop = ytPlaying;
            ytPlay = i;
        } else {
        }
    }
    // 同時再生があった場合、元々再生していた方を停止する
    if(ytStop != undefined) {
        ytPlayer[ytStop].pauseVideo();
        ytStop = undefined;
    }
    // 現在再生中のプレーヤー番号を保存しておく
    if(ytPlay != undefined) {
        ytPlaying = ytPlay;
        ytPlay = undefined;
    }
}

// YouTubeの準備完了後
function onPlayerReady(e) {
  ytPlayer.playVideo();
  ytPlayer.mute();
}

// 再生完了後
function onPlayerStateChange(e) {
  var ytStatus = e.target.getPlayerState();
  if (ytStatus == YT.PlayerState.ENDED) {
      ytPlayer.playVideo();
      ytPlayer.mute();
  }
}