import Dispatcher from "../helpers/dispatcher"
import { isEqual } from "../utilities/object"

export default class Keyboard {

	constructor() {

        this.onKeyUp = new Dispatcher(this)
        this.onKeyDown = new Dispatcher(this)
        this.onKeyPress = new Dispatcher(this)

        window.addEventListener('keyup', (e) => this.onKeyUp.notify(e))
        window.addEventListener('keydown', (e) => this.onKeyDown.notify(e))
        window.addEventListener('keypress', (e) => this.onKeyPress.notify(e))
        
    }

    getKey(e) {

        if (e.defaultPrevented) return

        if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) return

        switch (e.code || e.key || e.keyCode) {

            // Direction = 'up' when clicking 'W' on QWERTY 
            // keyboards, but 'Z' on AZERTY keyboards

            case 'KeyW': 
            case 'ArrowUp':
            case 38:
                return 'up'

            case 'KeyS': 
            case 'ArrowDown':
                return 'down'

            case 'KeyD': 
            case 'ArrowRight':
                return 'right'

            case 'KeyA': 
            case 'ArrowLeft':
                return 'left'

            default: return

        }

    }
	
	
}