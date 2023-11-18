export class VideoProcesor {
  private player: YT.Player | undefined
  private interval: NodeJS.Timer | undefined 
  private script: Map<string, string> | undefined
  constructor(
    private foundVideo: boolean = false,
    private talk: Function,
    private token: string,
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
    this.getScript(this.obtenerIdDeYoutube(iframe.src), this.token).then((script) => {
      this.script = script
    })
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
          console.log(currentTime)
          const time = currentTime?.toFixed(1)
          if(this.script?.get(time as string)) {
            //this.player?.pauseVideo()
            this.talk(this.script?.get(time as string))
            //this.player?.playVideo()
          }
        }, 100)
    }
  }

  private async getScript(youtubeId: string | null, token: string) {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };
    const response = await fetch('https://eyeassist-core-production.up.railway.app/videos/' + youtubeId, options)
      .catch((error) => {
       if (error.name === 'AbortError') {
         console.error(error)
       }
      })

    const myMap = new Map<string, string>();
    if (response != undefined) {
      const description = await response.json()
      const result = JSON.parse(description.descripcion)
      result.video.forEach((desc : any) => {
        myMap.set(desc.time.toFixed(1), desc.description)
      })
    }
    console.log(myMap)
    return myMap
  }

  private obtenerIdDeYoutube(url: string): string | null {
    const patrones = [
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];

    for (const patron of patrones) {
      const coincidencia = url.match(patron);
      if (coincidencia && coincidencia[1]) {
        return coincidencia[1];
      }
    }

    return null;
  }
 
}
