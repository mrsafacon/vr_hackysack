/*
Credits manager

Rotates the #credits object on/off the screen depending on how long the game has been idle.
*/

let creditsObject = document.querySelector("#credits").object3D
creditsObject.el.setAttribute('text', { value: credits })

let CreditsManager = {
  showing: true,
  off: true,
  creditsParent: document.querySelector("#creditsParent").object3D,
  currentPosition: 1,

  show: function () {
    if (Sack.grounded == true) {
      this.showing = true
      this.off = false
    }
  },

  hide: function () {
    this.showing = false
    this.off = false
  },

  update: function () {
    if (this.off == true) return

    let currentPercent = deltaTime / 1

    if (this.showing == true) {
      this.currentPosition += currentPercent
      if (this.currentPosition > 1) {
        this.currentPosition = 1
        this.off = true
      }
    } else {
      this.currentPosition -= currentPercent
      if (this.currentPosition < 0) {
        this.currentPosition = 0
        this.off = true
      }
    }

    this.creditsParent.rotation.set(lerp(-2, 0, this.currentPosition), 0, 0)
    this.creditsParent.position.set(0, lerp(-3, 0, this.currentPosition), lerp(-6, -.1, this.currentPosition))

  }
}

function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t
}
