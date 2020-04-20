// ---------------------------------------------------------------
// :: CASTLE
// ---------------------------------------------------------------

import Hammer from 'hammerjs'
import Panel from './../base/panel.js'

export default class CastlePanel extends Panel {

	constructor(selector, options) {

		super(selector)

		this.$manager = this.element.querySelector('.building-manager')

	}

	init() {

		this.setup()

	}

	setup() {

		let html = ''

		html = `
			
		`

		this.$manager.innerHTML = html

	}


	// ---------------------------------------------------------------
	// :: EVENT-HANDLERS
	// ---------------------------------------------------------------

	click(e) {

        super.click(e)

		if (!e.target.dataset.building) return
		GAME.initNewBuilding(e.target.dataset.building)

	}


}
