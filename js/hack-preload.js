let credits =
  `Design, Programming, Sound, Music, 3D
by Omar Lopez
www.safacon.com`

AFRAME.registerComponent('collider-check', {
  dependencies: ['raycaster'],
})

AFRAME.registerComponent('wf', {
  dependencies: ['material'],
  init: function() {
    this.el.components.material.material.wireframe = true;
  }
})

AFRAME.registerComponent('sack', {
  schema : {
    wireframe : { type: 'boolean', default : true },
    color : { type: 'string', default : '#00FF00'},
    opacity : { type: 'number', default : 1 },
    roughness : { type: 'number', default : 1 }
  },
  init: function() {
    let data = this.data
    this.el.addEventListener('model-loaded', () => {
      const obj = this.el.getObject3D('mesh')
      obj.traverse(node => {
        if (node.name === 'Sphere') {
          node.material = new THREE.MeshStandardMaterial()
          node.material.wireframe = data.wireframe
          node.material.color.set(data.color)
          node.material.transparent = true
          node.material.opacity = data.opacity
          node.material.roughness = data.roughness
        }
      })
    })
  }
})

AFRAME.registerComponent('sack-splash', {
  schema : {
    color : { type: 'string', default : '#00FF00'},
    opacity : { type: 'number', default : .15 }
  },
  init: function() {
    let data = this.data
    this.el.addEventListener('model-loaded', () => {
      const obj = this.el.getObject3D('mesh')
      obj.traverse(node => {
        if (node.name === 'Cube') { //legs
          node.material = node.material.clone()
          node.material.color.set(data.color)
          node.material.opacity = data.opacity
          node.material.transparent = true
          node.material.wireframe = true
        }
      })
    })
  }
})

AFRAME.registerComponent('key', {
  init: function() {
    let data = this.data
    this.el.addEventListener('model-loaded', () => {
      const obj = this.el.getObject3D('mesh')
      obj.traverse(node => {
        if (node.name === 'Cube') {
          node.material = new THREE.MeshStandardMaterial()
          node.material.color.set('#33f')
          node.material.roughness = 1
        }
      })
    })
  }
})


AFRAME.registerComponent('dome', {
  schema : {
    color : { type: 'string', default : '#00FF00'},
    opacity : { type: 'number', default : .7 }
  },
  init: function() {
    let data = this.data
    this.el.addEventListener('model-loaded', () => {
      const obj = this.el.getObject3D('mesh')
      obj.traverse(node => {
        if (node.name === 'Icosphere') {
          node.material = new THREE.MeshBasicMaterial()
          node.material.wireframe = true
          node.material.color.set(data.color)
          node.material.opacity = data.opacity
          node.material.transparent = true
        }
      })
    })
  }
})

AFRAME.registerComponent('legs', {
  init: function() {
    this.el.addEventListener('model-loaded', () => {
      const obj = this.el.getObject3D('mesh')
      obj.traverse(node => {
        if (node.name === 'VR-Legs') { //legs
          node.material = node.material.clone()
          node.material.color.set('#00FF00')
          node.material.opacity = 0.55
          node.material.transparent = true
        } else if (node.name === 'VR-Legs001') { //legs wire outline
          node.material.color.set('#FF00FF')
          node.material.roughness = 1
          node.material.metalness = 1
        }
      })
    })
  }
})
