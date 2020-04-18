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
        this.buildings = []
        this._delta = { x: 0, y: 0 }

        this.events = new Hammer(ENGINE.container)
        this.events.on('tap', this.click.bind(this))
        this.events.on('pan', this.pan.bind(this))
        this.events.on('panstart', this.panstart.bind(this))
        this.events.on('panend', this.panend.bind(this))

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

    click(e) {

        if (e.target.nodeName !== 'CANVAS') return

        if (this._building) this.setBuilding()
        else if (this.buildings.length) this.clickBuilding(e)

    }

    panstart(e) {

        this.panIsFirst = true

        const pointer = ENGINE.setRaycaster(e.center)
        const intersects = RAYCASTER.intersectObject(this._building.mesh)

        if (!intersects[0]) return
        
        this._intersect = intersects[0]
        this.moveBuilding(e)

    }

    panend(e) {

        this.panIsLast = true
        // this._intersect = false

    }

    pan(e) {

        window.requestAnimationFrame(() => this.panOnFrame(e))

    }

    panOnFrame(e) {

        if (!this._building) return

        ENGINE.setRaycaster(e.center)

        if (this._intersect) this.moveBuilding(e)

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
            lumbermill: { size: new Vec3(2, 3, 5) },
            stables: { size: new Vec3(4, 3, 6) }
        }

        this._building = new Building({ name, color: '#2d3436', size: buildings[name].size })

    }

    setBuilding() {

        // const intersects = this.buildings.filter((t) => this._building.box.intersectsBox(t.box))
        // if (intersects.length) return

        // this._building.state = 'default'
        // this.buildings.push(this._building)
        // this._building = null

    }

    clickBuilding(e) {

        const pointer = ENGINE.setRaycaster(CURSOR.position.screen)

        if (!pointer) return

        console.log('meshes:', this.buildings.map((b) => b.mesh))
        console.log('pointer:', pointer)
        const intersects = RAYCASTER.intersectObjects(this.buildings.map((b) => b.mesh))

        if (intersects[0]) {
            console.log('%c--- Intersect found ---', 'background-color: green; color: white')
            console.log('intersect:', intersects[0])
        }

    }

    // mousemove(e) {

    //     if (!this._building) return

    //     for (let intersect of CURSOR.intersects) {

    //         let { x, y, z } = intersect.point
    //         let pos = new THREE.Vector3(x, y, z)

    //         this._building.position = pos

    //     }

    // }
    
    moveBuilding(e) {

        console.log('movebuilding')
        
        if (this._building.mesh != this._intersect.object) return

        console.log(this._intersect)

        const pos = ENGINE.getGridPosition(e.center)

        console.log(pos)

        this._building.position = ENGINE.getGridPosition(e.center)

    }

    onEnvironmentLoaded() {

        

    }

	render(dt) {
        


    }
    
    

}