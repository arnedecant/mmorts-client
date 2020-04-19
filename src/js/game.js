// -------------------------------------------------------------------
// :: Game
// -------------------------------------------------------------------

import * as THREE from 'three'

// import Keyboard from './controls/keyboard'
import Building from './models/building'
import Environment from './models/environment'

// -------------------------------------------------------------------

export default class Game {

	constructor() {

        this.raycaster = new THREE.Raycaster()

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
        this._delta = { x: 0, y: 0 }

        this.events = new Hammer(ENGINE.container)

        // document.body.addEventListener('mousemove', this.mousemove.bind(this))
        document.body.addEventListener('wheel', this.wheel.bind(this))

        this.init()

    }

	init() {

        // window.KEYBOARD = new Keyboard()

        this.mode = MODES.INITIALISING
        this.environment = new Environment()

        // window.ENVIRONMENT = new Environment()

        // ENVIRONMENT.onLoadingFinished.addListener(this.onEnvironmentLoaded.bind(this))
        // ENVIRONMENT.environment.onCutscene.addListener(this.onCutscene.bind(this))
        
    }

    wheel(e) {

        if (!this._building) return

        let direction = e.deltaY > 0 ? 'right' : 'left'
        this._building.rotate(direction)

        this.mousemove()

    }

    onEnvironmentLoaded() {

        

    }

	render(dt) {
        


    }
    
    

}