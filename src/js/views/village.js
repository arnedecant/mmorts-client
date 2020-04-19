// ---------------------------------------------------------------
// :: UNIT
// ---------------------------------------------------------------

import Hammer from 'hammerjs'
import View from './../base/view.js'
import Building from './../models/building.js'
import Helper from '../base/helper.js'

export default class VillageView extends View {

	// ---------------------------------------------------------------
	// :: CONSTRUCTOR
	// ---------------------------------------------------------------

  	constructor(selector) {

		super(selector)

		// Private properties

		this._newBuilding = null
		this._intersected = null

		// Public properties

		this.buildings = []

		this.helpers = {
			buildingSelection: new Helper('[data-helper="building-selection"]'),
			buildingPlacement: new Helper('[data-helper="building-placement"]', [{ key: '$building', selector: '.building' }]),
		}

		// Bind interface events

		this.events = new Hammer(this.element)
		this.events.on('tap', this.onTapInterface.bind(this))

		// Bind game events

		GAME.events.on('tap', this.onTapCanvas.bind(this))
        GAME.events.on('pan', this.onPanCanvas.bind(this))
        GAME.events.on('panstart', this.onPanstartCanvas.bind(this))
        GAME.events.on('panend', this.onPanendCanvas.bind(this))

	}


	// ---------------------------------------------------------------
	// :: RENDER LOOPS
	// ---------------------------------------------------------------

	render(data) {

		

	}


	// ---------------------------------------------------------------
	// :: EVENT-HANDLERS
	// ---------------------------------------------------------------

	onTapInterface(e) {

		let building = e.target.dataset.building

		if (building) {

			this.helpers.buildingPlacement.show()
			this.helpers.buildingSelection.hide()

			// preserveAspectRatio="xMidYMin meet" not working ?? => should be placed in icons.html? 

			this.helpers.buildingPlacement.$building.innerHTML = `
				<svg preserveAspectRatio="xMidYMin meet"><use xlink:href="#icon-${ building }" /></svg>
				<span>${ building }</span>
			`

			this.addBuilding(building, 'init')

		} else {

			this.helpers.buildingPlacement.hide()
			this.helpers.buildingSelection.show()

			if (e.target.name == 'confirm') {

				this.addBuilding(this._newBuilding)

			} else if (e.target.name == 'cancel') {

				this._newBuilding.destroy()
				this._intersected = null
				this._newBuilding = null

			}
		}

	}

	onTapCanvas(e) {

		ENGINE.setRaycaster({ ...e.center })
		const test = RAYCASTER.ray.intersectBox(this._newBuilding.box)
		console.log(test)

		return
		const intersects = RAYCASTER.intersectObjects(this.buildings.map((b) => b.mesh))

		console.log(intersects[0])

		return

		if (!intersects.length) return

		console.log(
			'%cINTERSECTED BUILDING', 
			'padding: 0.2rem 0.4rem; margin-bottom: 0.2rem; background-color: green; color: white', 
			this.buildings.find((b) => b.mesh == intersects[0].object)
		)

	}

	onPanstartCanvas(e) {

		// this._panIsFirst = true

		if (!this._newBuilding) return
		this._intersected = ENGINE.raycast(e.center, this._newBuilding)

    }

    onPanendCanvas(e) {

        // this._panIsLast = true
        // this._intersected = null

    }

    onPanCanvas(e) {

		// this._panIsFirst = false
		// this._panIsLast = false
        window.requestAnimationFrame(() => this.moveBuilding(e.center))

    }


	// ---------------------------------------------------------------
	// :: LOGICS
	// ---------------------------------------------------------------

	addBuilding(name, state = 'default') {

		if (state == 'init') {

			// User gets to choose place

			if (this._newBuilding) this._newBuilding.destroy()

			const buildings = {
				castle: { size: new Vec3(9, 9, 9) },
				house: { size: new Vec3(2, 2, 2) },
				smith: { size: new Vec3(5, 3, 3) },
				farm: { size: new Vec3(6, 3, 6) },
				lumbermill: { size: new Vec3(2, 3, 5) },
				stables: { size: new Vec3(4, 3, 6) }
			}

			this._newBuilding = new Building({ name, state, color: '#2d3436', size: buildings[name].size })

		} else {

			// Finalize placing building, start construction

			const intersects = this.buildings.filter((b) => this._newBuilding.box.intersectsBox(b.box))
			console.log(intersects)
			if (intersects.length) return

			this._newBuilding.state = 'default'
			this.buildings.push(this._newBuilding)
			this._newBuilding = null
			this._intersected = null

		}

	}

	moveBuilding(pos) {
        
        if (!this._intersected || !this._newBuilding || this._newBuilding != this._intersected) return

		const position = ENGINE.getGridPosition(pos)
		if (position) this._newBuilding.position = position

    }

}
