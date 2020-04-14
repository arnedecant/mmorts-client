// -------------------------------------------------------------------
// :: Game
// -------------------------------------------------------------------

import * as THREE from 'three'

import Interface from './components/interface'
import Keyboard from './controls/keyboard'
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

        this.init()

    }

	init() {

        window.KEYBOARD = new Keyboard()

        this.mode = MODES.INITIALISING

        let geometry = new THREE.PlaneBufferGeometry(2000, 2000)
        let material = new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
        let mesh = new THREE.Mesh(geometry, material)

        mesh.rotation.x = - Math.PI / 2
        mesh.receiveShadow = true
        
        ENGINE.add(mesh)

        let grid = new THREE.GridHelper(2000, 2000, 0x000000, 0x000000)

		grid.material.transparent = true
        grid.material.opacity = 0.2

        ENGINE.add(grid)

        let test = new Building({})

        // window.ENVIRONMENT = new Environment()

        // ENVIRONMENT.onLoadingFinished.addListener(this.onEnvironmentLoaded.bind(this))
        // ENVIRONMENT.environment.onCutscene.addListener(this.onCutscene.bind(this))
        
    }

    onEnvironmentLoaded() {

        

    }

    click({ action, e }) {

        

    }

	render(dt) {
        


    }
    
    

}