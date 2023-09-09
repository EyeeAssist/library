// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
      height: '360',
      width: '640',
      videoId: 'zKlZah1n4os'
    });
}

function playVideo() {
  player.playVideo()
}

