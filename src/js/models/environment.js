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
        this.mesh.receiveShadow = true
        this.mesh.castShadow = true

        this.size = 30
        
        this.init()

    }

    init() {

        this.initPlane()
        this.initForest()
        // this.initMine()

        ENGINE.add(this.mesh)

    }

    initPlane() {

        let geometry = new THREE.PlaneBufferGeometry(100, 100, 100, 100)
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

    initForest() {

        this.forest = new THREE.Object3D()

        let geometry, material, mesh

        geometry = new THREE.BoxGeometry(43, 3, 3)
        material = new THREE.MeshPhongMaterial({ color: 0x107763 })

        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(0, 1, -20)
        this.forest.add(mesh)

        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(0, 1, 20)
        this.forest.add(mesh)

        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(-20, 1, 0)
        mesh.rotation.y = Math.PI / 2
        this.forest.add(mesh)

        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(20, 1, 0)
        mesh.rotation.y = Math.PI / 2
        this.forest.add(mesh)

        this.mesh.add(this.forest)

    }

    initMine() {

        let geometry = new THREE.BoxGeometry(6, 6, 6)
        let material = new THREE.MeshPhongMaterial({ color: 0x222222 })

        this.mine = new THREE.Mesh(geometry, material)
        this.mine.position.set(-14, 3, -14)

        this.mesh.add(this.mine)

    }

}