/*
The properties of a "Kick" 

There are 2 sides that determine the direction of the applied force of the kick
- LEFT, RIGHT

And 3 types of kicks each with differnt calculations to forced based on Timing and hit accuracy
- KNEE, KICK_IN, KICK_OUT
*/

Kick.prototype.registerRayHit = function () {
  this.obj.el.addEventListener('raycaster-intersection', (evt) => { this.rayHit() })
}

Kick.prototype.disable = function () {
  this.obj.el.setAttribute('raycaster', { enabled: false, showLine: false })
  this.enabled = false
}

Kick.prototype.enable = function () {
  this.callTime = timestamp
  this.obj.el.setAttribute('raycaster', { enabled: true, showLine: true })
  this.enabled = true
}

Kick.prototype.rayHit = function () {
  addToStreak()


  let yForce = KickForce //
  let mv = 0 // Hit delay
  let xForce = 0
  let xDist = Math.abs(sackObject.position.x - this.hitPoint)

  if (this.type === 'KNEE') { //Knee Hits
    if (timestamp - this.callTime > .15) {
      mv = (4 * ((timestamp - this.callTime) / .07) / 2)
      yForce = yForce - mv
    } else if (timestamp - this.callTime < .07) {
      mv = (4 * ((timestamp - this.callTime) / .07) / 2)
      yForce = yForce - mv
    }

    xForce = this.maxXforce * (xDist / this.maxDistance)


    if (sackObject.position.x > this.hitPoint) xForce = xForce * -1
    if (this.side === 'RIGHT') xForce *= -1 //Right knee
    xForce = xForce * (1 + mv / 12)

  } else if (this.type === 'KICK_IN' || this.type === 'KICK_OUT') {
    if (timestamp - this.callTime > .15) {
      mv = (3 * ((timestamp - this.callTime) / .07) / 2)
      yForce = yForce - mv
    } else if (timestamp - this.callTime < .07) {
      mv = (3 * ((timestamp - this.callTime) / .07) / 2)
      yForce = yForce - mv
    }

    xForce = this.maxXforce * (1 - (xDist / this.maxDistance))
    if (this.side === 'RIGHT') xForce = xForce * -1
    if (this.type === 'KICK_IN') xForce = xForce * (1 + mv / 8) * -1
    else xForce = xForce * (1 + mv / 10)
  }

  xForce = xVeloFix(xForce)
  Sack.forceY = yForce
  Sack.forceX = xForce
  hitSack(yForce)
  this.disable()
}

function Kick(type, side, obj, hitPoint, maxDistance, maxXforce) {
  this.type = type
  this.side = side
  this.obj = document.querySelector(obj).object3D
  this.hitPoint = hitPoint
  this.maxDistance = maxDistance
  this.maxXforce = maxXforce
  this.enabled = false
  this.callTime = 0
  this.disable()
  this.obj.el.addEventListener('raycaster-intersection', (evt) => { this.rayHit() })
}



let smallXVeloMult = 0
function xVeloFix(current) {
  let abs = Math.abs(current)
  if (abs < .01) current = .01
  if (abs < .5) {
    smallXVeloMult += 1
    let mult = smallXVeloMult * .04
    if (current > 0) return current + mult
    else return current - mult
  } else {
    smallXVeloMult = 0
    return current
  }
}
