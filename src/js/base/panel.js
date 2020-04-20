
// -------------------------------------------------------------------
// :: BASE VIEW
// -------------------------------------------------------------------

import Component from './component.js'

export default class Panel extends Component {

	// ---------------------------------------------------------------
	// :: CONSTRUCTOR
	// ---------------------------------------------------------------

	constructor(selector) {
		
		super(selector)

		this.element.classList.add('panel')
        
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

  	show() {

        super.show()
		ENGINE.controls.enabled = false

	}

	hide() {

		super.hide()
		ENGINE.controls.enabled = true

    }

}
