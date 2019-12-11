let domeObject = document.querySelector('#dome').object3D
let domeObject2 = document.querySelector('#dome2').object3D
let domeObject3 = document.querySelector('#dome3').object3D

let DomeManager = {
  domeRot : 0,
  dome2Rot : 0,
  dome3Rot : 0,

  update : function(){
    if(SongManager.playing == true){
      this.domeRot = this.domeRot + (deltaTime * .035)
      this.dome2Rot = this.dome2Rot + (deltaTime * .015)
      this.dome3Rot = this.dome3Rot - (deltaTime * .01)
    } else {
      this.domeRot = this.domeRot + (deltaTime * .0075)
      this.dome2Rot = this.dome2Rot + (deltaTime * .0025)
      this.dome3Rot = this.dome3Rot - (deltaTime * .006)
    }


    domeObject.rotation.set(0, this.domeRot, 0)
    domeObject2.rotation.set(0, this.dome2Rot, 0)
    domeObject3.rotation.set(0, this.dome3Rot, 0)
  }
}
