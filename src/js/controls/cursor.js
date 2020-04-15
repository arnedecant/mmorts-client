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
        this.raycaster = new THREE.Raycaster()

        document.addEventListener('mousemove', this.mousemove.bind(this))
        document.addEventListener('mousedown', this.mousedown.bind(this))
        document.addEventListener('mouseup', this.mouseup.bind(this))

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

        this.position.screen.x = (e.clientX / window.innerWidth) * 2 - 1
        this.position.screen.y = - (e.clientY / window.innerHeight) * 2 + 1

        window.requestAnimationFrame(this.raycast.bind(this))

    }

    raycast() {

        this.raycaster.setFromCamera(this.position.screen, ENGINE.camera)

        try {
            this.intersects = this.raycaster.intersectObjects(ENGINE.scene.children)
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