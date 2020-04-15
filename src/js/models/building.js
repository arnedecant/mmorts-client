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
            position = new Vec3(0, -300, 0), 
            size = new Vec3(1, 1, 1), 
            state = 'init', 
            color = 0x2194ce 
        }) {

        this._color = color
        this._position = new Vec3(position.x, position.y, position.z)
        this._config = {
            position: { min: -15, max: 15 }
        }

        this.create(state, size)

    }

    create(state = 'init', size) {

        let { x, y, z } = size
        this.geometry = new THREE.BoxGeometry(x, y, z)
        this.material = new THREE.MeshPhongMaterial({ color: this._color })
        this.mesh = new THREE.Mesh(this.geometry, this.material)

        ENGINE.add(this.mesh)

        let { width, height, depth } = this.geometry.parameters

        this.state = state
        this.size = new Vec3(width, height, depth)
        this.halfsize = new Vec3(width / 2, height / 2, depth / 2)

        this.init()

    }

    init() {

        this.position = this._position

        let { min, max } = this._config.position

        min = new Vec3(min, min, min)
        max = new Vec3(max, max, max)

        max = max.sub(this.size)

        this._config.position = { min, max }

        this.geometry.computeBoundingBox()
        this.box = new THREE.Box3(this.geometry.boundingBox.min, this.geometry.boundingBox.max)

    }

    destroy() {

        ENGINE.remove(this.mesh)
        // ENGINE.scene.remove(this.mesh)

    }

    get position() { return this._position }
    set position(p) {

        // set private variable, round
        // all values, normalize position
        // and update the mesh

        this._position = p.round()
        this._position.clamp(this._config.position.min, this._config.position.max)
        this._position = this._position.add(this.halfsize)

        if (!this._position.x) return

        let { x, y, z } = this._position
        this.mesh.position.set(x, y, z)

        this.box.setFromObject(this.mesh)

    }

    get state() { return this._state }
    set state(s) {

        this._state = s

        switch (s) {
            case 'init':
                this.material.transparent = true
                this.material.opacity = 0.5
                ENGINE.controls.enabled = false
                break
            default:
                this.material.transparent = false
                ENGINE.controls.enabled = true
                break
        }

    }

}