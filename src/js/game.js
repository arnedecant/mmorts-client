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
        this.environment = new Environment()

        // window.ENVIRONMENT = new Environment()

        // ENVIRONMENT.onLoadingFinished.addListener(this.onEnvironmentLoaded.bind(this))
        // ENVIRONMENT.environment.onCutscene.addListener(this.onCutscene.bind(this))
        
    }

    click(e) {

        if (e.target.nodeName !== 'CANVAS') return

        if (!this._building) return

        const intersects = this.buildings.filter((t) => this._building.box.intersectsBox(t.box))
        if (intersects.length) return

        this._building.state = 'default'
        this.buildings.push(this._building)
        this._building = null

    }

    mousemove(e) {

        if (!this._building) return

        for (let intersect of CURSOR.intersects) {

            let { x, y, z } = intersect.point
            let pos = new THREE.Vector3(x, y, z)

            this._building.position = pos

        }

    }

    initNewBuilding({ color, size = '1,1,1' }) {

        if (typeof size === 'string') {
            let [x, y, z] = size.split(',')
            size = new Vec3(x, y, z)
        }

        if (this._building) this._building.destroy()

        this._building = new Building({ color, size })

    }

    onEnvironmentLoaded() {

        

    }

	render(dt) {
        


    }
    
    

}