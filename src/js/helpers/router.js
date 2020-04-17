// ---------------------------------------------------------------
// :: MODEL
// ---------------------------------------------------------------

import Navigo from 'navigo'
import EventDispatcher from './dispatcher.js'

export default class Router {

	// ---------------------------------------------------------------
	// :: CONSTRUCTOR
	// ---------------------------------------------------------------

  	constructor({ views = VIEWS }) {

		this.views = views

		// Event dispatchers

		this.onPageChange = new EventDispatcher(this)

		// Setup router, hooks & routes
		// https://github.com/krasimir/navigo

		this.router = new Navigo(null, true, '#')
		this.view = this.views['village']

        // Setup

		this.setup()

	}


	// ---------------------------------------------------------------
	// :: SETUP
	// ---------------------------------------------------------------

	setup() {

		this.router.hooks({
			before: (done, params) => {
				// this.navigation.hide()
				this.view.hide()
				done()
			},
			after: (params) => {
				console.log(params)
				this.view.show()
			}
		})


		// -----------------------------------------------------------
		// :: ROUTES
		// -----------------------------------------------------------

		this.router.on({
			'/:view': this.setupView.bind(this),
		}).notFound(this.setup404.bind(this)).resolve()

	}

    setupParams(params = {}, query) {

        // Assign query to params

		params.query = query

		// TODO: do other stuff
		
		// ...

        return params

    }

	setupView(params = { view: 'village' }, query) {

        params = this.setupParams(params, query)
		this.view = this.views[params.view]

	}

	setup404(params, query) {  }


	// ---------------------------------------------------------------
	// :: DISPATCH UPDATES FROM VIEW
	// ---------------------------------------------------------------

	onNavigate(to) {

		this.router.navigate(to)

	}


	// ---------------------------------------------------------------
	// :: UTILITIES
	// ---------------------------------------------------------------

	isValid(view) {

		return !!this.views[view]

	}

}
