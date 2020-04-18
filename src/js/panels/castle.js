// ---------------------------------------------------------------
// :: UNIT
// ---------------------------------------------------------------

import Hammer from 'hammerjs'
import Panel from './../base/panel.js'

export default class CastlePanel extends Panel {


	// ---------------------------------------------------------------
	// :: RENDER
	// ---------------------------------------------------------------

	render(data) {

		

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
