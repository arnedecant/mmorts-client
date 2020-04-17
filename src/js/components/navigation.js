// -------------------------------------------------------------------
// :: Modal
// -------------------------------------------------------------------

import Component from '../base/component'
import Dispatcher from '../helpers/dispatcher'

export default class Navigation extends Component { 

	constructor(selector) {

        super(selector)

        const $buttons = [...this.element.querySelectorAll('a')]
        this.$buttons = {}

        $buttons.forEach(($btn) => {
            let name = $btn.getAttribute('name')
            this.$buttons[name] = $btn
        })


    }

    click(e) {

        super.click(e)

    }

    setActive(name, active = true) {

        if (active) this.$buttons[name].classList.add('active')
        else  this.$buttons[name].classList.remove('active')

    }

}