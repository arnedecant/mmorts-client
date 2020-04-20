// -------------------------------------------------------------------
// :: Modal
// -------------------------------------------------------------------

import Component from '../base/component'
import Dispatcher from '../helpers/dispatcher'

export default class Navigation extends Component { 

	constructor(selector) {

        super(selector)

        this.show()

        const $buttons = [...this.element.querySelectorAll('a')]
        this.$buttons = {}

        $buttons.forEach(($btn) => {
            let name = $btn.getAttribute('name')
            this.$buttons[name] = $btn
        })


    }

    setActive(name, active = true) {

        if (active) this.$buttons[name].classList.add('active')
        else this.$buttons[name].classList.remove('active')

    }

}