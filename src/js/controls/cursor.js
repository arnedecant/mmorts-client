import * as THREE from 'three'

export default class Cursor {

    constructor() {

        this._type = 'default'

        this.left = false
        this.right = false
        this.isMoving = false
        this.velocity = 0
        this.position = {
            screen: new THREE.Vector2(0, 0),
            canvas: new THREE.Vector3(0, 0, 0)
        }

        document.addEventListener('mousemove', this.mousemove.bind(this))
        document.addEventListener('mousedown', this.mousedown.bind(this))
        document.addEventListener('mouseup', this.mouseup.bind(this))
		// window.addEventListener('mousewheel', this.scroll.bind(this), { passive: true })

    }

    mousedown(e, button = 'left') {

        this[button] = true

    }

    mouseup(e, button = 'left') {

        this[button] = false

    }

    click(e) {



    }

    mousemove(e) {

        this.clientX = e.clientX
        this.clientY = e.clientY

        window.requestAnimationFrame(this.raycast.bind(this))

    }

    raycast() {

        this.position.screen = ENGINE.setRaycaster({ x: this.clientX, y: this.clientY })

        try {
            this.intersects = RAYCASTER.intersectObjects(ENGINE.scene.children)
        } catch (e) {}
        
        for (let intersect of this.intersects) {

            if (intersect.object.name !== 'grid') continue

            let { x, y, z } = intersect.point
            this.position.canvas.set(x, y, z)

        }

    }

    get type() { return this._type }
    set type(type) {

        this._type = type
        document.body.dataset.cursor = type

    }


}