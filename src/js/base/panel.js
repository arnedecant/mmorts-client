
// -------------------------------------------------------------------
// :: BASE VIEW
// -------------------------------------------------------------------

import View from './view.js'
import EventDispatcher from './../helpers/dispatcher.js'

export default class Panel extends View {

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

    }


      
    // ---------------------------------------------------------------
	// :: EVENTS
	// ---------------------------------------------------------------

    click(e) {

        if (e.target.name === 'close') this.hide()

    }



	// ---------------------------------------------------------------
	// :: DISPLAY METHODS
	// ---------------------------------------------------------------

  	show() {

        if (!this._hasRendered) this.render()
		this.element.classList.add('active')

	}

	hide() {

        this.element.classList.remove('active')

    }

    

	// ---------------------------------------------------------------
	// :: UTILITIES
	// ---------------------------------------------------------------

  	isActive() {

        return this.element.classList.includes('active')

	}

}
