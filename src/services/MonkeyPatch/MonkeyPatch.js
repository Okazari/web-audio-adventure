class MonkeyPatch {

  constructor() {
    this.contexts = []
    this.elements = []
    this.nodes = []
  }

  AudioContext = () => {
    const audioContext = new AudioContext()
    this.contexts.push(audioContext)
    // const original = audioContext.createMediaElementSource
    // audioContext.createMediaElementSource = (...rest) => {
    //   const source = original.bind(audioContext)(...rest)
    //   this.nodes.push(source)
    //   return source
    // }
    return audioContext
  }

  Audio = (...rest) => {
    const audio = new Audio(...rest)
    this.elements.push(audio)
    return audio
  }

  clean = () => {
    this.contexts.forEach(ac => ac.close())
    this.elements.forEach(e => e.pause())
    this.nodes.forEach(n => n.disconnect())
    this.contexts = []
  }
}

export default new MonkeyPatch()
