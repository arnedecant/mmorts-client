// ---------------------------------------------------------------
// :: UNIT
// ---------------------------------------------------------------

import Hammer from 'hammerjs'
import View from './../base/view.js'
import Building from './../models/building.js'
import Helper from '../base/helper.js'
import CastlePanel from '../panels/castle.js'

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

		this.panels = {
			castle: new CastlePanel('[data-panel="castle"]'),
		}

		// Bind interface events

		this.events = new Hammer(this.element)
		this.events.on('tap', this.onTapInterface.bind(this))

		// Bind game events

		GAME.events.on('tap', this.onTapCanvas.bind(this))
        GAME.events.on('pan', this.onPanCanvas.bind(this))
        GAME.events.on('panstart', this.onPanstartCanvas.bind(this))
		GAME.events.on('panend', this.onPanendCanvas.bind(this))
		
		// Init

		this.init()

	}

	init() {

		this.addBuilding('castle', 'init')
		this.helpers.buildingPlacement.show()
		this.helpers.buildingSelection.hide()

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

			this.addBuilding(building, 'init')

		} else {

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

		let building, panel

		building = ENGINE.raycast(e.center, this.buildings)
		if (building) panel = this.panels[building.name]

		if (panel) {
			panel.show()
			Object.keys(this.helpers).forEach((key) => this.helpers[key].hide())
		}

	}

	onPanstartCanvas(e) {

		if (!this._newBuilding) return
		this._intersected = ENGINE.raycast(e.center, this._newBuilding)

    }

    onPanendCanvas(e) {

    }

    onPanCanvas(e) {

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

			ENGINE.controls.enabled = false

			// Update helpers

			this.helpers.buildingPlacement.show()

			// preserveAspectRatio="xMidYMin meet" not working ?? => should be placed in icons.html? 

			this.helpers.buildingPlacement.$building.innerHTML = `
				<svg preserveAspectRatio="xMidYMin meet"><use xlink:href="#icon-${ name }" /></svg>
				<span>${ name }</span>
			`

		} else {

			// Finalize placing building, start construction

			const intersects = this.buildings.filter((b) => this._newBuilding.box.intersectsBox(b.box))
			if (intersects.length) return

			console.log(this._newBuilding)

			this._newBuilding.state = 'default'
			this.buildings.push(this._newBuilding)
			this._newBuilding = null
			this._intersected = null

			ENGINE.controls.enabled = true

			// Update helpers

			this.helpers.buildingPlacement.hide()

		}

	}

	moveBuilding(pos) {
        
        if (!this._intersected || !this._newBuilding || this._newBuilding != this._intersected) return

		const position = ENGINE.getGridPosition(pos)
		if (position) this._newBuilding.position = position

    }

}
