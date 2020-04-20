
// -------------------------------------------------------------------
// :: BASE VIEW
// -------------------------------------------------------------------

import Dispatcher from './../helpers/dispatcher.js'
import Component from './component.js'

export default class Manager extends Component {

	// ---------------------------------------------------------------
	// :: CONSTRUCTOR
	// ---------------------------------------------------------------

	constructor(selector, building) {

		super(selector)

		this.element.classList.add('manager')

		this.onLevelUp = new Dispatcher()
		
		this.building = building

		if (!this.building.description) this.building.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor consequat dictum. Donec quis est vitae mauris fringilla imperdiet quis eu libero. Fusce placerat purus purus, non auctor est egestas nec.'

	}

	click(e) {

		super.click(e)

		

	}

	render() {

		this.element.innerHTML = `
			<div class="img-container">
				<svg><use xlink:href="#${ this.building.name }" /></svg>
				<span class="level">${ this.building.level }</span>
			</div>
			<div class="summary">
				<h1>${ this.building.name }</h1>
				<p>${ this.building.description }</p>
			</div>
		`

	}
	


}
