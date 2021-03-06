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
		window.Vec2 = THREE.Vector2
		window.Vec3 = THREE.Vector3
		window.Vec4 = THREE.Vector4

		window.RAYCASTER = new THREE.Raycaster()
		this.container = container
		this.pointer = new Vec2(0, 0)

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

		// update camera position point 
		// it to a specific position (center)

		this.camera.position.set(15, 32, 40)
		this.camera.lookAt(new THREE.Vector3(0, 0, 0))

		this.camera.updateProjectionMatrix()

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
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap // options are THREE.BasicShadowMap | THREE.PCFShadowMap | THREE.PCFSoftShadowMap

		// support for HDPI displays

		this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1)

		// append to DOM

		this.container.appendChild(this.renderer.domElement)
		this.canvasRect = this.renderer.domElement.getBoundingClientRect()

		// add controls

		this.controls = new THREE.MapControls(this.camera, this.renderer.domElement)

		this.controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
		this.controls.dampingFactor = 0.05
		this.controls.screenSpacePanning = false
		this.controls.minDistance = 20
		this.controls.maxDistance = 50
		this.controls.maxPolarAngle = Math.PI / 2

		this.controls.update()

	}

	createLights() {

		// http://jsfiddle.net/wp6E3/4/

		// create a new ambient light

		this.ambientLight = new THREE.AmbientLight(0xffffff)

		// create a new directional light

		this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
		this.directionalLight.shadow.mapSize.width = 1024
		this.directionalLight.shadow.mapSize.height = 1024

		// create a new spot light

		// this.spotLight = new THREE.SpotLight(0xffeaa7, 1, 80, Math.PI * 0.25, 1, 2)
		this.spotLight = new THREE.SpotLight(0xffeaa7)
		this.spotLight.intensity = 0.4
		this.spotLight.position.set(50, 50, -50)
		this.spotLight.shadow.mapSize.width = 1024
		this.spotLight.shadow.mapSize.height = 1024
		this.spotLight.castShadow = true

		// add lights to the scene

		this.scene.add(this.ambientLight)
		this.scene.add(this.directionalLight)
		this.scene.add(this.spotLight)

	}

	setSize() {

		// set initial width and height

		let rect = this.container.getBoundingClientRect()
		this.width = rect.width
		this.height = rect.height

		// this.width = this.container === document.body ? window.innerWidth : this.container.offsetWidth
		// this.height = this.container === document.body ? window.innerHeight : this.container.offsetHeight

		// update according to size multiplier

		// this.width *= this.config.size
		// this.height *= this.config.size

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

	getGridPosition({ x, y }) {

		this.setRaycaster({ x, y })
		let intersects = RAYCASTER.intersectObjects(ENGINE.scene.children)
        
        for (let intersect of intersects) {
            if (intersect.object.name !== 'plane') continue
            return intersect.point
        }
		
	}

	setRaycaster({ x, y }, windowCoord = false) {

		if (windowCoord) {
			this.pointer.x = (x / window.innerWidth) * 2 - 1
			this.pointer.y = - (y / window.innerHeight) * 2 + 1
		} else {
			this.pointer.x = ((x - this.canvasRect.left) / this.canvasRect.width) * 2 - 1
			this.pointer.y = - ((y - this.canvasRect.top) / this.canvasRect.height) * 2 + 1
		}

		RAYCASTER.setFromCamera(this.pointer, this.camera)

		return this.pointer

	}

	raycast(pointer, models = []) {

		// NOTE: difference .intersectsBox() and .intersectBox()
		// .intersectsBox() - returns true or false
		// .intersectBox()  - returns vec3 or false

		this.setRaycaster(pointer)

		if (!Array.isArray(models)) models = [models]
		return models.find((m) => RAYCASTER.ray.intersectsBox(m.box))

	}

	render(dt) {

		if (this.controls) this.controls.update()
		if (this.stats) this.stats.update()

		// render

  		this.renderer.render(this.scene, this.camera)

	}

}
