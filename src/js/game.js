// -------------------------------------------------------------------
// :: Game
// -------------------------------------------------------------------

import * as THREE from 'three'

// import Keyboard from './controls/keyboard'
import Building from './models/building'

// -------------------------------------------------------------------

export default class Game {

	constructor() {

        window.MODES = Object.freeze({
            NONE: Symbol('none'),
			PRELOAD: Symbol('preload'),
			INITIALISING: Symbol('initialising'),
			CREATING_LEVEL: Symbol('creating_level'),
			ACTIVE: Symbol('active'),
			GAMEOVER: Symbol('gameover')
        })

        this.mode = MODES.NONE

        this.assets = {}
        this.buildings = []

        document.body.addEventListener('click', this.click.bind(this))
        document.body.addEventListener('mousemove', this.mousemove.bind(this))

        this.init()

    }

	init() {

        // window.KEYBOARD = new Keyboard()

        this.mode = MODES.INITIALISING

        let geometry = new THREE.PlaneBufferGeometry(2000, 2000)
        let material = new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
        this.plane = new THREE.Mesh(geometry, material)

        this.plane.name = 'plane'
        this.plane.rotation.x = - Math.PI / 2
        this.plane.receiveShadow = true
        
        ENGINE.add(this.plane)

        this.grid = new THREE.GridHelper(30, 30, 0x000000, 0x000000)
        
        this.grid.name = 'grid'
		this.grid.material.transparent = true
        this.grid.material.opacity = 0.2

        ENGINE.add(this.grid)

        // window.ENVIRONMENT = new Environment()

        // ENVIRONMENT.onLoadingFinished.addListener(this.onEnvironmentLoaded.bind(this))
        // ENVIRONMENT.environment.onCutscene.addListener(this.onCutscene.bind(this))
        
    }

    click(e) {

        if (e.target.nodeName !== 'CANVAS') return

        if (!this._building) return
        this._building.state = 'default'
        this._building = null

    }

    mousemove(e) {

        if (!this._building) return

        for (let intersect of CURSOR.intersects) {

            let plane = ['plane', 'grid', 'helper']

            let isNotPlane = (!plane.includes(intersect.object.name))

            if (isNotPlane && intersect.object != this._building.mesh) console.log(intersect)

            // if (!intersect.face) continue

            // console.log(intersect.face)

            // let pos = this._building.position

            // console.log(intersect.object)
            let { x, y, z } = intersect.point
            let pos = new THREE.Vector3(x, y, z)
            
            // console.log(pos)
            this._building.position = pos

            // this._building.position.copy(intersect.point).add(intersect.face.normal)

        }
        // this._building.position = { ...CURSOR.position.canvas }

        // this._building.position.copy(intersect.point).add(intersect.face.normal)

        // rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
        // rollOverMesh.position.divideScalar( 100 ).floor().multiplyScalar( 100 ).addScalar( 50 ); // Changed

    }

    initNewBuilding({ color, size = '1,1,1' }) {

        if (typeof size === 'string') {
            let [w, h, d] = size.split(',')
            size = { w: parseInt(w), h: parseInt(h), d: parseInt(d) }
        }

        if (this._building) this._building.destroy()

        this._building = new Building({ color, size })

    }

    onEnvironmentLoaded() {

        

    }

	render(dt) {
        


    }
    
    

}