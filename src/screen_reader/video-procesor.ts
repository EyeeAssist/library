export class VideoProcesor {
  private player: YT.Player | undefined
  private interval: NodeJS.Timer | undefined 
  private script: Map<string, string> | undefined
  constructor(
    private foundVideo: boolean = false,
    private talk: Function,
  ) {
  }

  public toggleStatus() {
    this.foundVideo = !this.foundVideo
  }

  public turnOff(){
    this.foundVideo = false
  }
  public startAudioDescription(event: KeyboardEvent) {
    if(this.foundVideo && event.shiftKey === true && event.key.toLowerCase() === "k"){
      if(this.player?.getPlayerState() == YT.PlayerState.PLAYING){
        this.player?.pauseVideo()
      } else {
        this.player?.playVideo()
      }
    }
  }

  public createPlayer(node: Node){
    let iframe = node as HTMLIFrameElement 
    iframe.id = 'single-video-eyeeassit'
    this.script = this.getScript(iframe.src)
    const questionMarkIndex = iframe.src.indexOf('?');
    iframe.src = iframe.src.substring(0, questionMarkIndex + 1) + 'enablejsapi=1&' + iframe.src.substring(questionMarkIndex + 1);
    this.player = new YT.Player(iframe.id, {
      events: {
        'onStateChange': this.onPlayerStateChange
      }
    })
  }
  onPlayerStateChange = (event: YT.OnStateChangeEvent)=> {
    if (event.data === YT.PlayerState.PAUSED) {
      clearInterval(this.interval)
    }
    if(event.data == YT.PlayerState.ENDED) {
      clearInterval(this.interval)
    }
    if (event.data === YT.PlayerState.PLAYING) {
        this.interval = setInterval(() => {
          const currentTime = this.player?.getCurrentTime();
          const time = currentTime?.toFixed(1)
          if(this.script?.get(time as string)) {
            //this.player?.pauseVideo()
            this.talk(this.script?.get(time as string))
            //this.player?.playVideo()
          }
        }, 100)
    }
  }

  private getScript(url: string) {
    const myMap = new Map<string, string>();
    myMap.set('1.0', 'Paisaje de una playa')
    myMap.set('13.0', 'Paisaje de unas motañas y una bandera ondeando')
    myMap.set('28.0', 'Paisaje con una costa y olas rompiendo')
    myMap.set('40.0', 'Una laguna artificial')
    myMap.set('56.0', 'Un rio largo')
    return myMap
  }
 
}
