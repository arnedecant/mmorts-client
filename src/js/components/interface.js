// -------------------------------------------------------------------
// :: Modal
// -------------------------------------------------------------------

import Component from '../base/component'
import Dispatcher from '../helpers/dispatcher'

export default class Interface extends Component { 

	constructor(selector) {

        super(selector)

        this.settings = {
            
        }

        this.ALLOWED_ELEMENTS = ['BUTTON', 'SELECT', 'ANCHOR', 'INPUT', 'LI']

    }

    click(e) {

        // e.preventDefault()

        if (!this.ALLOWED_ELEMENTS.includes(e.target.nodeName)) return

        GAME.initNewBuilding(e.target.dataset)

        super.click(e)

    }

}