// -------------------------------------------------------------------
// :: App
// -------------------------------------------------------------------

import * as THREE from 'three'

import Engine from './engine.js'
import Modal from './components/modal.js'
import Navigation from './components/navigation.js'
import Router from './helpers/router.js'
import Cursor from './controls/cursor.js'
import Game from './game.js'

import GuildView from './views/guild.js'
import WorldView from './views/world.js'
import VillageView from './views/village.js'
import TroopsView from './views/troops.js'
import GearView from './views/gear.js'

// -------------------------------------------------------------------

class App {

	constructor() {

		this.url = new URL(window.location.href)
		this.debug = this.url.searchParams.get('debug') || 0

		// elements

        this.$container = document.getElementById('canvas')

		// create new engine: setup scene, camera & lighting

		window.ENGINE = new Engine({ container: this.$container, assetsPath: 'assets/', debug: this.debug })
		window.GAME = new Game()
		window.CURSOR = new Cursor()

		window.VIEWS = {
			guild: new GuildView('#guild'),
			world: new WorldView('#world'),
			village: new VillageView('#village'),
			troops: new TroopsView('#troops'),
			gear: new GearView('#gear'),
		}

		window.NAVIGATION = new Navigation('#navigation')
		window.ROUTER = new Router({ views: VIEWS })

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