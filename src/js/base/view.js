
// -------------------------------------------------------------------
// :: BASE VIEW
// -------------------------------------------------------------------

import Component from './component.js'

export default class View extends Component {

	// ---------------------------------------------------------------
	// :: CONSTRUCTOR
	// ---------------------------------------------------------------

	constructor(selector, name) {

		super(selector)

		this.element.classList.add('view')
		
		this.name = name
		if (!this.name) this.name = selector.replace('#', '')

  	}



	// ---------------------------------------------------------------
	// :: DISPLAY METHODS
	// ---------------------------------------------------------------

  	show() {

        super.show()
		NAVIGATION.setActive(this.name, true)

	}

	hide() {

        super.hide()
		NAVIGATION.setActive(this.name, false)

	}

}
