// ---------------------------------------------------------------
// :: BUILDING
// ---------------------------------------------------------------
// https://threejs.org/docs/#api/en/math/Box3
// https://stackoverflow.com/questions/15492857/any-way-to-get-a-bounding-box-from-a-three-js-object3d

import * as THREE from 'three'

// -------------------------------------------------------------------

export default class Building {

	// ---------------------------------------------------------------
	// :: CONSTRUCTOR
	// ---------------------------------------------------------------
    // state = 'active/default', 'progress', 'selected', 'hover', 'wireframe', ...

  	constructor({ 
            position = new Vec3(0, 0, 0), 
            size = new Vec3(1, 1, 1), 
            state = 'init', 
            color = 0x2194ce,
            name = 'building'
        }) {

        this._color = color
        this._position = new Vec3(position.x, position.y, position.z)
        this._config = {
            bounds: { min: -15, max: 15 },
            position: { min: -15, max: 15 }
        }

        this.name = name

        this.create(state, size)

    }

    create(state = 'init', size) {

        let { x, y, z } = size
        this.geometry = new THREE.BoxGeometry(x, y, z)
        this.material = new THREE.MeshLambertMaterial({ color: this._color })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.name = this.name
        this.mesh.updateMatrixWorld()

        this.geometry.computeBoundingBox()
        this.box = new THREE.Box3(this.geometry.boundingBox.min, this.geometry.boundingBox.max)

        ENGINE.add(this.mesh)
        
        this.setLimits()

        this.state = state
        this.position = new Vec3()

        this.init()

    }

    init() {

        // ...

    }

    setLimits() {

        this.box.setFromObject(this.mesh)

        let { x, y, z } = this.box.max.sub(this.box.min)
        this.size = new Vec3(x, y, z)
        this.halfsize = new Vec3(x / 2, y / 2, z / 2)

        this.position = this._position

        let { min, max } = this._config.bounds
        min = new Vec3(min, min, min)
        max = new Vec3(max, max, max)

        max = max.sub(this.size)

        // max = max.sub(this.halfsize)
        // min = min.add(this.halfsize)

        this._config.position = { min, max }

    }

    rotate(direction = 'left') {

        if (direction == 'left') {
            this.mesh.rotation.y += Math.PI / 2
        } else {
            this.mesh.rotation.y -= Math.PI / 2 
        }  
        
        this.setLimits()

    }

    destroy() {

        ENGINE.remove(this.mesh)

    }

    get position() { return this._position }
    set position(p) {

        // set private variable, round
        // all values, normalize position
        // and update the mesh

        // p.y += this.halfsize.y

        this._position = p.round()
        this._position.clamp(this._config.position.min, this._config.position.max)
        this._position = this._position.add(this.halfsize)

        if (!this._position.x) return

        let { x, y, z } = this._position
        this.mesh.position.set(x, y, z)

        this.box.setFromObject(this.mesh)
        this.mesh.updateMatrixWorld()

    }

    get state() { return this._state }
    set state(s) {

        this._state = s

        switch (s) {
            case 'init':
                this.material.transparent = true
                this.material.opacity = 0.5
                this.mesh.receiveShadow = false
                this.mesh.castShadow = false
                // ENGINE.controls.enabled = false
                break
            default:
                this.material.transparent = false
                this.mesh.receiveShadow = true
                this.mesh.castShadow = true
                // ENGINE.controls.enabled = true
                break
        }

    }

}