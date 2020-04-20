
// -------------------------------------------------------------------
// :: BASE VIEW
// -------------------------------------------------------------------

import View from './view.js'
import EventDispatcher from './../helpers/dispatcher.js'

export default class Panel {

	// ---------------------------------------------------------------
	// :: CONSTRUCTOR
	// ---------------------------------------------------------------

	constructor(selector) {

		this.selector = selector
        this.element = document.querySelector(selector)
        this._hasRendered = false
        
		// Bind events

		this.events = new Hammer(this.element)
		this.events.on('tap', this.click.bind(this))

		KEYBOARD.onKeyUp.addListener(this.keyup.bind(this))

	}
	
	
	
	// ---------------------------------------------------------------
	// :: RENDER
	// ---------------------------------------------------------------

	render() {
        
        this._hasRendered = true

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

        if (!this._hasRendered) this.render()
		this.element.classList.add('active')
		ENGINE.controls.enabled = false

	}

	hide() {

		this.element.classList.remove('active')
		ENGINE.controls.enabled = true

    }

    

	// ---------------------------------------------------------------
	// :: UTILITIES
	// ---------------------------------------------------------------

  	isActive() {

        return [...this.element.classList].includes('active')

	}

}
