// -------------------------------------------------------------------
// :: Engine
// -------------------------------------------------------------------

import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js'

THREE.MapControls = MapControls
THREE.Stats = Stats

// -------------------------------------------------------------------

export default class Engine {

	constructor({ container = document.body, size = 1, background = null, debug = false, assetsPath = null }) {

		// set properties

		this.config = { container, size, background, debug, assetsPath }
		
		window.CLOCK = new THREE.Clock()
		// window.MOUSE = new THREE.Vector2()
		window.RAYCASTER = new THREE.Raycaster()
		window.Vec2 = THREE.Vector2
		window.Vec3 = THREE.Vector3
		window.Vec4 = THREE.Vector4

		this.container = container

		if (typeof this.container === 'string') this.container = document.querySelector(this.container)

		// init

		this.init()

	}

	init() {

		// set up scene, camera and renderer

		this.createScene()

		// setup loader(s)

		this.loader = new THREE.TextureLoader()

		if (this.config.assetsPath) this.loader.setPath(this.config.assetsPath)

		// add events

		window.addEventListener('resize', this.resize.bind(this), false)
		// window.addEventListener('click', this.click.bind(this), false)
		// window.addEventListener('mousemove', this.mousemove.bind(this), false)
		// window.addEventListener('mousedown', this.mousedown.bind(this), false)
		// window.addEventListener('mouseup', this.mouseup.bind(this), false)
		// window.addEventListener('mousewheel', this.scroll.bind(this), { passive: true })

		// render

		this.render()

	}

	createScene() {

		// create new scene

		this.scene = window.SCENE = new THREE.Scene()

		// set background color

		if (this.config.background) this.scene.background = new THREE.Color(this.config.background)

		// add fog to the scene

		this.scene.fog = new THREE.Fog(0xf7d9aa, 500, 1500)

		// create the camera

		this.createCamera()

		// add lights

		this.createLights()

		// create the renderer

		this.createRenderer()

		// add debug helpers

		if (this.config.debug) this.debug()

	}

	debug() {

		let axes = new THREE.AxesHelper(50)
		// let grid = new THREE.GridHelper(2000, 100, 0x000000, 0x000000)

		// grid.material.opacity = 0.2
		// grid.material.transparent = true
		axes.name = 'helper'

		this.scene.add(axes)
		// this.scene.add(grid)
		
		this.stats = new THREE.Stats()
		this.container.appendChild(this.stats.dom)

	}

	createCamera() {

		// set values to init the camera

		this.aspectRatio = this.width / this.height
		this.fieldOfView = 45
		this.nearPlane = 0.1
		this.farPlane = 2000

		// create a new camera

		this.camera = new THREE.PerspectiveCamera(
			this.fieldOfView,
			this.aspectRatio,
			this.nearPlane,
			this.farPlane
		)

		// update camera position

		this.camera.position.set(20, 20, 20);

		// point camera to center

		this.camera.lookAt(new THREE.Vector3(0,0,0))

	}

	createRenderer() {

		// create new renderer

		this.renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true
		})

		// set the size

		this.resize()

		// enable shadowMap

		this.renderer.shadowMap.enabled = true

		// support for HDPI displays

		this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1)

		// append to DOM

		this.container.appendChild(this.renderer.domElement)

		// add controls

		this.controls = new THREE.MapControls(this.camera, this.renderer.domElement)

		this.controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
		this.controls.dampingFactor = 0.05
		this.controls.screenSpacePanning = false
		this.controls.minDistance = 20
		this.controls.maxDistance = 100
		this.controls.maxPolarAngle = Math.PI / 2

		// this.controls.enabled = false => to disable when interacting...

	}

	createLights() {

		// create a new ambient light

		this.ambientLight = new THREE.AmbientLight(0xffffff)

		// create a new hemisphere light

		this.hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444)
		this.hemisphereLight.position.set(0, 200, 0)

		// create a new shadow light

		this.directionalLight = new THREE.DirectionalLight(0x707070)
		this.directionalLight.position.set(0, 200, 100)
		this.directionalLight.shadow.camera.top = 3000
		this.directionalLight.shadow.camera.bottom = -3000
		this.directionalLight.shadow.camera.left = -3000
		this.directionalLight.shadow.camera.right = 3000
		this.directionalLight.shadow.mapSize.width = 2048
		this.directionalLight.shadow.mapSize.height = 2048
		this.directionalLight.castShadow = true

		// create a new back light

		// this.backLight = new THREE.DirectionalLight(0xffffff, 0.2)
		// this.backLight.position.set(-100, 200, 50)
		// this.backLight.castShadow = true

		// create a new spot light

		// this.spotLight = new THREE.SpotLight(0xffffff, 1, 80, Math.PI * 0.25, 1, 2)
		// this.spotLight.position.set(0, 40, 0)

		// add lights to the scene

		this.scene.add(this.ambientLight)
		this.scene.add(this.hemisphereLight)
		this.scene.add(this.directionalLight)
		// this.scene.add(this.spotLight)
		// this.scene.add(this.shadowLight)
		// this.scene.add(this.backLight)

	}

	setSize() {

		// set initial width and height

		this.width = this.container === document.body ? window.innerWidth : this.container.offsetWidth
		this.height = this.container === document.body ? window.innerHeight : this.container.offsetHeight

		// update according to size multiplier

		this.width *= this.config.size
		this.height *= this.config.size

		// set renderer dimensions

		this.renderer.setSize(this.width, this.height)

	}

	resize(e) {

		// set canvas dimensions

		this.setSize()

		// set camera

		this.aspectRatio = this.width / this.height
		this.camera.aspect = this.aspectRatio
		this.camera.updateProjectionMatrix()

		// render

		// this.render()

	}

	mousemove(e) {

		// e.preventDefault()

		// calculate mouse position in normalized device coordinates
		// (-1 to +1) for both components

		MOUSE.x = (e.clientX / window.innerWidth) * 2 - 1
		MOUSE.y = - (e.clientY / window.innerHeight) * 2 + 1

		// console.log({ x: this.mouse.x, y: this.mouse.y })

	}


	add(mesh) { this.scene.add(mesh) }

	remove(mesh) {

		// if (!(mesh instanceof THREE.Mesh)) return

		mesh.geometry.dispose()
		mesh.geometry = null
		mesh.material.dispose()
		mesh.material = null
		// try { mesh.dispose() } catch(e) { console.error('Could not dispose of mesh: ', mesh) }
		this.scene.remove(mesh)
		mesh = null

	}

	clear(obj = this.scene) {

		if (obj instanceof THREE.Mesh) {

			this.remove(obj)

		} else {

			if (obj.children == undefined) return 
			
			while (obj.children.length > 0) {
				this.clear(obj.children[0])
				obj.remove(obj.children[0])
			}

		}

	}

	load(path, fn) {

		let loader = this.loader

		if (Array.isArray(path)) loader = this.cubeLoader

		return loader.load(path, fn)

	}

	checkIntersection({ model, targets }) {

		if (!targets || targets.length <= 0) return false

		const intersects = targets.filter((t) => model.box.intersectsBox(t.box))

		return (intersects.length > 0) ? intersects : false

	}

	render(dt) {

		if (this.controls) this.controls.update()
		if (this.stats) this.stats.update()

		// render

  		this.renderer.render(this.scene, this.camera)

	}

}
