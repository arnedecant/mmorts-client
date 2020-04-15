import Hammer from 'hammerjs'
import Dispatcher from '../helpers/dispatcher'

// -------------------------------------------------------------------
// :: Component
// -------------------------------------------------------------------

export default class Component {

	constructor(selector = null, options = {}) {

        this.selector = selector
		this.element = selector
		this.options = options

		this.onClick = new Dispatcher()
		this.onDrag = new Dispatcher()
        
		if (typeof this.element === 'string') this.element = document.querySelector(this.element)
		
		if (!this.element && selector !== null) console.warn(`No element found for selector: ${ selector }`)
		if (!this.element) return
		
		this.template = document.querySelector(`template[data-name="${ this.element.dataset.component }"]`)
		if (this.template) this.template = this.template.content.cloneNode(true)

		this.events = new Hammer(this.element)
		this.events.on('tap', this.click.bind(this))
		this.events.on('pan', this.pan.bind(this))


        this.init()

	}

	init() {

		

	}
    
    enable() {

        this.element.removeAttribute('disabled')

    }

    disable() {

        this.element.setAttribute('disabled', 'disabled')

    }

    hide() {

        this.element.setAttribute('disabled', 'disabled')

    }

	click(e) {

		this.onClick.notify({ component: this, event: e })

	}

	pan(e) {

		
		this.onDrag.notify({ component: this, event: e })

	}

	render(timestamp) {

		// add self to the requestAnimationFrame

		window.requestAnimationFrame(this.render.bind(this))

	}

}