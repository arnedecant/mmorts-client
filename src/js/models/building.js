// ---------------------------------------------------------------
// :: BUILDING
// ---------------------------------------------------------------

import * as THREE from 'three'

// -------------------------------------------------------------------

export default class Building {

	// ---------------------------------------------------------------
	// :: CONSTRUCTOR
	// ---------------------------------------------------------------
    // state = 'active/default', 'progress', 'selected', 'hover', 'wireframe', ...

  	constructor({ 
          position = { x: 0, y: -300, z: 0 }, 
          size = { w: 1, h: 1, d: 1 }, 
          state = 'init', 
          color = 0x2194ce 
        }) {

        this._map = { x: 'w', y: 'h', z: 'd', w: 'x', h: 'y', d: 'z' }
        this._color = color
        this._position = new THREE.Vector3(position.x, position.y, position.z)
        this._config = {
            position: { min: -15, max: 15 }
        }

        this.create(state, size)

    }

    create(state = 'init', size) {

        let { w, h, d } = size
        this.geometry = new THREE.BoxGeometry(w, h, d)
        this.material = new THREE.MeshPhongMaterial({ color: this._color })

        this.mesh = new THREE.Mesh(this.geometry, this.material)

        ENGINE.add(this.mesh)

        this.state = state
        this.size = {
            w: this.geometry.parameters.width,
            h: this.geometry.parameters.height,
            d: this.geometry.parameters.depth
        }

        this.init()

    }

    init() {

        this.position = this._position

        let { min, max } = this._config.position

        min = new THREE.Vector3(min, min, min)
        max = new THREE.Vector3(max, max, max)

        max.x -= this.size.w
        max.y -= this.size.h
        max.z -= this.size.d

        this._config.position = { min, max }

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
        this._position = this.normalize(this._position)

        console.log(this._position)

        let { x, y, z } = this._position
        this.mesh.position.set(x, y, z)

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

    normalize(values, type = 'position') {

        // kill the reference

        values = { ...values }

        // loop all axes

        for (let key in values) {

            // add half of each dimension to each axis

            let dimension = this._map[key]
            values[key] += this.size[dimension] / 2
            
        }

        // return new values

        let { x, y, z } = values
        return new THREE.Vector3(x, y, z)

    }

}