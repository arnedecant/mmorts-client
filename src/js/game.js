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

    wheel(e) {

        if (!this._building) return

        let direction = e.deltaY > 0 ? 'right' : 'left'
        this._building.rotate(direction)

        this.mousemove()

    }

    initNewBuilding(name) {

        if (this._building) this._building.destroy()

        const buildings = {
            castle: { size: new Vec3(9, 9, 9) },
            house: { size: new Vec3(2, 2, 2) },
            smith: { size: new Vec3(5, 3, 3) },
            farm: { size: new Vec3(6, 3, 6) },
            sawmill: { size: new Vec3(2, 3, 5) },
            stables: { size: new Vec3(4, 3, 6) }
        }

        this._building = new Building({ color: '#2d3436', size: buildings[name].size })

    }

    onEnvironmentLoaded() {

        

    }

	render(dt) {
        


    }
    
    

}