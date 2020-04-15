// -------------------------------------------------------------------
// :: App
// -------------------------------------------------------------------

import * as THREE from 'three'

import Engine from './Engine.js'
import Modal from './components/modal.js'
import Interface from './components/interface.js'
import Cursor from './controls/cursor'
import Game from './game.js'

// -------------------------------------------------------------------

class App {

	constructor() {

		this.url = new URL(window.location.href)
		this.debug = this.url.searchParams.get('debug') || 0

		// elements

        this.$container = document.getElementById('canvas')

		// create new engine: setup scene, camera & lighting

		window.ENGINE = new Engine({ container: this.$container, assetsPath: 'assets/', debug: this.debug })
		window.INTERFACE = new Interface('main.interface')
		window.GAME = new Game()
		window.CURSOR = new Cursor()

		// properties

		this.state = {}

		this.modals = {
			privacy: new Modal('privacy')
		}

		this.shaders = {
			vertex: document.querySelector('[data-shader="vertex"]').textContent,
			fragment: document.querySelector('[data-shader="fragment"]').textContent
		}

		this.uniforms = {
			time: { type: 'f', value: 0.0 },
		}

		// events

		document.body.addEventListener('click', this.click.bind(this))
		
		// setup

		this.setup()

	}

	setup() {

		this.init()

	}

	clear() {

		// ENGINE.clear()
		// ENGINE.scene.background = new THREE.Color(0x222222)

	}

	reset() {

		this.clear()

	}

	init() {

		this.clear()
		this.render()

	}

	click(e) {

	}

	render(timestamp) {

		const dt = CLOCK.getDelta()

        // render ENGINE

		ENGINE.render(dt)
		GAME.render(dt)

		// add self to the requestAnimationFrame

		window.requestAnimationFrame(this.render.bind(this))

	}

	draw() {

        
        
	}

}

export default new App()