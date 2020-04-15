// ---------------------------------------------------------------
// :: ENVIRONMENT
// ---------------------------------------------------------------
// https://threejs.org/docs/#api/en/math/Box3
// https://stackoverflow.com/questions/15492857/any-way-to-get-a-bounding-box-from-a-three-js-object3d

import * as THREE from 'three'

// -------------------------------------------------------------------

export default class Environment {

	// ---------------------------------------------------------------
	// :: CONSTRUCTOR
	// ---------------------------------------------------------------

  	constructor() {

        this.mesh = new THREE.Object3D()
        this.size = 30
        
        this.init()

    }

    init() {

        let geometry = new THREE.PlaneBufferGeometry(100, 100)
        let material = new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
        this.plane = new THREE.Mesh(geometry, material)

        this.plane.name = 'plane'
        this.plane.rotation.x = - Math.PI / 2
        this.plane.receiveShadow = true
        
        ENGINE.add(this.plane)

        this.grid = new THREE.GridHelper(this.size, this.size, 0x000000, 0x000000)
        
        this.grid.name = 'grid'
		this.grid.material.transparent = true
        this.grid.material.opacity = 0.2

        ENGINE.add(this.grid)

    }

}