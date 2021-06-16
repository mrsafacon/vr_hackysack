/*
Song Manager

Loops the song elements and layers additional elements on depeding on how long the combo has been going on.
*/


let SongManager = {
  p1: document.querySelector("#songP1Ent").object3D.el,
  p2: document.querySelector("#songP2Ent").object3D.el,
  p3: document.querySelector("#songP3Ent").object3D.el,
  p4: document.querySelector("#songP4Ent").object3D.el,
  p5: document.querySelector("#songP5Ent").object3D.el,
  loopCount: 0,
  playing: false,


  launch: function () {
    //start first
    loopCount = 0
    this.p1.addEventListener('sound-ended', songLoop)
    this.p1.emit('playSound')
    this.playing = true
  },

  loop: function () {
    loopCount += 1
    this.p1.emit('playSound')

    if (loopCount > 3) this.p2.emit('playSound')
    if (loopCount > 7) this.p3.emit('playSound')
    if (loopCount > 11) this.p4.emit('playSound')
    if (loopCount > 15) this.p5.emit('playSound')


  },

  ground: function () {
    this.playing = false
    this.p1.removeEventListener('sound-ended', songLoop)
    this.p1.components.sound.stopSound()
    this.p2.components.sound.stopSound()
    this.p3.components.sound.stopSound()
    this.p4.components.sound.stopSound()
    this.p5.components.sound.stopSound()
  },

  init: function () {
    //make sure all are loaded
  }
}

function songLoop() {
  SongManager.loop()
}
