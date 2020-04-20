
// -------------------------------------------------------------------
// :: BASE VIEW
// -------------------------------------------------------------------

import Component from './component.js'
import Manager from './manager.js'

export default class Panel extends Component {

	// ---------------------------------------------------------------
	// :: CONSTRUCTOR
	// ---------------------------------------------------------------

	constructor(selector) {
		
		super(selector)

		this.element.classList.add('panel')

		this.manager = new Manager(this.element.querySelector('[data-manager]'))
        
		// Bind events

		KEYBOARD.onKeyUp.addListener(this.keyup.bind(this))

	}


      
    // ---------------------------------------------------------------
	// :: EVENTS
	// ---------------------------------------------------------------

    click(e) {

        if (e.target.name === 'close') this.hide()

	}
	
	keyup(e) {

		if (!this.isActive()) return
		if (e.key === 'Escape') this.hide()

	}



	// ---------------------------------------------------------------
	// :: DISPLAY METHODS
	// ---------------------------------------------------------------

  	show(building) {

		super.show()

		this.manager.building = building
		this.manager.show()
		ENGINE.controls.enabled = false

	}

	hide() {

		super.hide()
		ENGINE.controls.enabled = true

    }

}
