
// -------------------------------------------------------------------
// :: BASE VIEW
// -------------------------------------------------------------------

import Component from './component.js'

export default class Helper extends Component {

	// ---------------------------------------------------------------
	// :: CONSTRUCTOR
	// ---------------------------------------------------------------

	constructor(selector, children = []) {

		super(selector)

        children.forEach((c) => {
            if (c.all) this[c.key] = [...this.element.querySelectorAll(c.selector)]
            else this[c.key] = this.element.querySelector(c.selector)
        })

    }

}
