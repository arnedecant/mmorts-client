// ---------------------------------------------------------------
// :: UNIT
// ---------------------------------------------------------------

import Hammer from 'hammerjs'
import View from './../base/view.js'

export default class VillageView extends View {

	// ---------------------------------------------------------------
	// :: CONSTRUCTOR
	// ---------------------------------------------------------------

  	constructor(selector) {

		super(selector)

		// Bind events

		this.events = new Hammer(this.element)
		this.events.on('tap', this.click.bind(this))

	}


	// ---------------------------------------------------------------
	// :: RENDER
	// ---------------------------------------------------------------

	render(data) {

		

	}


	// ---------------------------------------------------------------
	// :: EVENT-HANDLERS
	// ---------------------------------------------------------------

	click(e) {

		if (!e.target.dataset.building) return
		GAME.initNewBuilding(e.target.dataset.building)

	}


}
