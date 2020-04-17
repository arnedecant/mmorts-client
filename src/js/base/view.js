
// -------------------------------------------------------------------
// :: BASE VIEW
// -------------------------------------------------------------------

import EventDispatcher from './../helpers/dispatcher.js'

export default class View {

	// ---------------------------------------------------------------
	// :: CONSTRUCTOR
	// ---------------------------------------------------------------

	constructor(selector, name) {

		this.selector = selector
        this.element = document.querySelector(selector)
		this._hasRendered = false
		
		this.name = name
		if (!this.name) this.name = selector.replace('#', '')

        this.onNavigate = new EventDispatcher(this)

  	}


	// ---------------------------------------------------------------
	// :: RENDER
	// ---------------------------------------------------------------

	render() {
        
        this._hasRendered = true

	}

	// ---------------------------------------------------------------
	// :: DISPLAY METHODS
	// ---------------------------------------------------------------

  	show() {

        if (!this._hasRendered) this.render()
		this.element.classList.add('active')
		NAVIGATION.setActive(this.name, true)

	}

	hide() {

        this.element.classList.remove('active')
		NAVIGATION.setActive(this.name, false)

	}

	// ---------------------------------------------------------------
	// :: UTILITIES
	// ---------------------------------------------------------------

  	isActive() {

        return this.element.classList.includes('active')

	}

}
