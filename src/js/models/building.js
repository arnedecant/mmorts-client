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

  	constructor({ position = { x: 0, y: 0, z: 0 }, state = 'default' }) {

        this._map = { x: 'w', y: 'h', z: 'd', w: 'x', h: 'y', d: 'z' }

        this.create(state)

        this.position = position

    }

    create(state = 'default') {

        this._state = state

        this.geometry = new THREE.BoxGeometry(2, 3, 5)
        this.material = new THREE.MeshPhongMaterial({ color: 0x2194ce })
        this.mesh = new THREE.Mesh(this.geometry, this.material)

        ENGINE.add(this.mesh)

        this.size = {
            w: this.geometry.parameters.width,
            h: this.geometry.parameters.height,
            d: this.geometry.parameters.depth
        }

    }

    destroy() {

        ENGINE.remove(this.mesh)

    }

    get position() { return this._position }
    
    set position(p) {

        // set private variable

        this._position = p

        // normalize position and update mesh

        let { x, y, z } = this.normalize(p)
        this.mesh.position.set(x, y, z)
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

        return values

    }

}