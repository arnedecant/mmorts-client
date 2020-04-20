import Hammer from 'hammerjs'
import Dispatcher from '../helpers/dispatcher'

// -------------------------------------------------------------------
// :: COMPONENT
// -------------------------------------------------------------------

export default class Component {

	// -------------------------------------------------------------------
	// :: CONSTRUCTOR
	// -------------------------------------------------------------------

	constructor(element, options = {}) {

		this.element = element
		this.options = options

		this._enabled = true
		this._hasRendered = false
        
		if (typeof this.element === 'string') this.element = document.querySelector(this.element)

		this.element.classList.add('component')

		// Events dispatchers

		this.onClick = new Dispatcher()
		this.onNavigate = new Dispatcher(this)

		// Event listeners

		this.events = new Hammer(this.element)
		this.events.on('tap', this.click.bind(this))

		// Setup

        // if (this.options.render === undefined) this.options.render = true
		// if (this.options.render) this.render()

	}

	setup() {

		

	}

	init() {



	}



	// -------------------------------------------------------------------
	// :: TEMPLATE
	// -------------------------------------------------------------------

	render() {

		this._hasRendered = true 

	}



	// -------------------------------------------------------------------
	// :: EVENTS
	// -------------------------------------------------------------------

	click(e) {

		this.onClick.notify(e)

	}



	// -------------------------------------------------------------------
	// :: HELPERS
	// -------------------------------------------------------------------
    
    enable() {

		this.element.removeAttribute('disabled')
		this._enabled = true

    }

    disable(value = 'disabled') {

		this.element.setAttribute('disabled', value)
		this._enabled = false

    }
	
	show() {

		if (!this._hasRendered) this.render()
		this.element.classList.add('active')
		this.enable()

	}

    hide() {

		this.element.classList.remove('active')
		this.disable('hidden')

	}

	isActive() {

		return [...this.element.classList].contains('active')

	}



	// -------------------------------------------------------------------
	// :: GETTERS & SETTERS
	// -------------------------------------------------------------------

	get enabled() {

		return this._enabled

	}

	set enabled(bool) {

		if (bool) this.enable()
		else this.disable()

	}



}