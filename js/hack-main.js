let leftKneeKick = new Kick('KNEE', 'LEFT', '#leftKneeRay', -.08, .21, .6)
let rightKneeKick = new Kick('KNEE', 'RIGHT', '#rightKneeRay', .08, .21, .6)
let leftInKick = new Kick('KICK_IN', 'LEFT', '#leftInRay', .4, .17, .7)
let rightInKick = new Kick('KICK_IN', 'RIGHT', '#rightInRay', -.4, .17, .7)
let leftOutKick = new Kick('KICK_OUT', 'LEFT', '#leftOutRay', -.89, .46, 1.175)
let rightOutKick = new Kick('KICK_OUT', 'RIGHT', '#rightOutRay', .89, .46, 1.175)

let streakText = document.querySelector('#streak').object3D
let cameraObject = document.querySelector('#camera').object3D
let cameraRig = document.querySelector('#cameraRig').object3D
let legsObject = document.querySelector('#legs').object3D
let sackObject = document.querySelector('#sack').object3D
let sackSpinObject = document.querySelector('#sackSpin').object3D
let sackSplashObject1 = document.querySelector('#sackSplash1').object3D
let sackSplashObject2 = document.querySelector('#sackSplash2').object3D

let Physics = {
  gravity : 11 ,
  xForceDamp : .4,
  yForceDamp : 4
}


let currentStreak = -1
let KickForce = 14.9
let Ready = false
let AllowKick = false
let timestamp = -10
let deltaTime = 0

let Sack = {
  forceX : 0,
  forceY : 0,
  grounded: true,
  spinMult: 10,
  currentSpinX: 0,
  currentSpinY: 0,
  lastForceYHit: 0,
  applyDamp : function(){
    if(this.forceY > 0 ){
      let yda = Physics.yForceDamp * deltaTime
      this.forceY -= yda
      if(this.forceY < 0) this.forceY = 0
    } else this.forceY = 0

    if (this.forceX > 0) {
      let xda = Physics.xForceDamp * deltaTime
      this.forceX -= xda
      if(this.forceX < 0) this.forceX = 0
    } else  if(this.forceX < 0){
      let xda = Physics.xForceDamp * deltaTime
      this.forceX += xda
      if(this.forceX > 0) this.forceX = 0
    }
  },

  applySpin : function(){
    let y = (this.grounded === false) ? Math.abs(this.lastForceYHit) : 0
    this.currentSpinX += this.forceX * deltaTime * 10
    this.currentSpinY += y * deltaTime * this.spinMult * .01
    sackSpinObject.rotation.set(this.currentSpinY, 0, this.currentSpinX)
  }
}

addToStreak() //init streak
CreditsManager.show() //init Credits

window.requestAnimationFrame(update) //start loop
function update(ts) {
  let cts = ts /1000
  deltaTime = cts - timestamp
  timestamp = cts
  cameraRig.position.set(0, -0.3, .9) //lock camera pos
  cameraObject.position.set(0,1.6,0)

  Sack.applyDamp() //apply 'air resistance' Physics dampening
  let currentPosition = sackObject.el.getAttribute('position') //ap ply Physics to the sack
  let x = currentPosition.x + (Sack.forceX * deltaTime)
  let y = currentPosition.y + (Sack.forceY * deltaTime) - (Physics.gravity * deltaTime)
  if( y < 0) {
    y = 0 //ground
    if(Sack.grounded == false){
      Sack.grounded = true
      document.querySelector(`#groundSoundEnt`).object3D.el.emit('playSound')
      SongManager.ground()
      hitAnimation()
      setTimeout(()=>{
        CreditsManager.show()
      }, 7500)
    }
  }

  Sack.applySpin()
  sackObject.position.set(x,  y, 0)
  DomeManager.update()
  CreditsManager.update()
  window.requestAnimationFrame(update)
}

function hitSack(fY){
  let id = getRandomInt(4) + 1
  Sack.lastForceYHit = fY
  document.querySelector(`#sh${id}ent`).object3D.el.emit('playSound')
  hitAnimation()
}

function hitAnimation(){
  sackSplashObject1.el.setAttribute('animation-mixer', {clip:'Hit' + (getRandomInt(4) + 1)})
  sackSplashObject2.el.setAttribute('animation-mixer', {clip:'Hit' + (getRandomInt(4) + 1)})
}

function addToStreak(){
  currentStreak += 1
  streakText.el.setAttribute('text', {value: currentStreak})
}

document.body.onkeydown = function(e){
  if(Sack.grounded  == true && e.keyCode == 82) sackObject.position.set(0,  0, 0)


  if(Sack.grounded  == true && e.keyCode == 32){
      Sack.forceY = KickForce
      Sack.forceX = (getRandomInt(3  ) - 1) * .3
      legsObject.el.play()
      currentStreak = -1
      addToStreak()
      Sack.grounded = false
      document.querySelector("#launchSoundEnt" ).object3D.el.emit('playSound')
      CreditsManager.hide()
      SongManager.launch()
  }

    if(AllowKick != true) return

    if(e.keyCode == 83) { //S
      legsObject.el.setAttribute('animation-mixer', {clip:'LeftOut'})
      AllowKick = false
      leftOutKick.enable()
      setTimeout(()=>{leftOutKick.disable()},300)
    } else if(e.keyCode == 68){ //D
      legsObject.el.setAttribute('animation-mixer', {clip:'RightIn'})
      rightInKick.enable()
      setTimeout(()=>{rightInKick.disable()},300)
      AllowKick = false
    } else if(e.keyCode == 70){ //F
      legsObject.el.setAttribute('animation-mixer', {clip:'LeftKnee'})
      leftKneeKick.enable()
      setTimeout(()=>{leftKneeKick.disable()},300)
      AllowKick = false
    } else if(e.keyCode == 74){ //J
      legsObject.el.setAttribute('animation-mixer', {clip:'RightKnee'})
      rightKneeKick.enable()
      setTimeout(()=>{rightKneeKick.disable()},300)
      AllowKick = false
    } else if(e.keyCode == 75){ //K
      legsObject.el.setAttribute('animation-mixer', {clip:'LeftIn'})
      leftInKick.enable()
      setTimeout(()=>{leftInKick.disable()},300)
      AllowKick = false
    } else if(e.keyCode == 76){ //L
      legsObject.el.setAttribute('animation-mixer', {clip:'RightOut'})
      rightOutKick.enable()
      setTimeout(()=>{rightOutKick.disable()},300)
      AllowKick = false
    }
}

legsObject.el.addEventListener('animation-loop', function (evt) { //when animation is done change to stand and allow another kick
  legsObject.el.setAttribute('animation-mixer', {clip:'Stand'})
  AllowKick = true
});

sackSplashObject1.el.addEventListener('animation-loop', function (evt) { //when animation is done change to idle
  sackSplashObject1.el.setAttribute('animation-mixer', {clip:'Idle'})
});

sackSplashObject2.el.addEventListener('animation-loop', function (evt) { //when animation is done change to idle
  sackSplashObject2.el.setAttribute('animation-mixer', {clip:'Idle'})
});

function getRandomInt(max) { // 0 through max - 1
  return Math.floor(Math.random() * Math.floor(max));
}
