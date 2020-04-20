
// -------------------------------------------------------------------
// :: BASE VIEW
// -------------------------------------------------------------------

import Dispatcher from './../helpers/dispatcher.js'

export default class Helper {

	// ---------------------------------------------------------------
	// :: CONSTRUCTOR
	// ---------------------------------------------------------------

	constructor(selector, children = []) {

		this.selector = selector
        this.element = document.querySelector(selector)
        this._hasRendered = false

        children.forEach((c) => {
            if (c.all) this[c.key] = [...this.element.querySelectorAll(c.selector)]
            else this[c.key] = this.element.querySelector(c.selector)
        })

        // Set dispatchers

        this.onClick = new Dispatcher()
        
		// Bind events

		this.events = new Hammer(this.element)
		this.events.on('tap', (e) => this.onClick.notify(e))

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

	}

	hide() {

        this.element.classList.remove('active')

    }

    

	// ---------------------------------------------------------------
	// :: UTILITIES
	// ---------------------------------------------------------------

  	isActive() {

        return [...this.element.classList].includes('active')

	}

}
