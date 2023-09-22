export class VideoProcesor {
  private player: YT.Player | undefined
  constructor(
    private foundVideo: boolean = false,
    private talk: Function
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
      console.log('Entrando a play')
      if(this.player?.getPlayerState() == YT.PlayerState.PLAYING){
        this.player?.pauseVideo()
      } else {
        this.player?.playVideo()
      }
    }
  }

  public createPlayer(node: Node){
    let iframe = node as HTMLElement
    this.player = new YT.Player(iframe.id, {})
  }
}
