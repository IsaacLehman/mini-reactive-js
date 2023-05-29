/**
 * Author: Isaac Lehman | May 29th, 2023
 * ---
 * Class to handle a reactive component | Native Javascript
 * 
 * @param {string} html_template - The HTML template for the component
 * @param {object} state - The state of the component
 * @param {array} events - The events of the component (array of objects with name and handler)
 */
class Component {
	constructor(html_template, state={}, events=[]) {
		this.html_template = html_template;
		this.state = state;
		this.events = events;
		this.uuid = Date.now().toString(36) + Math.random().toString(36).substring(2);
		this.element = null;
	}
	
	// For initial render
	render(parent, append=true) {
		// 1. --- Parse State in HTML and update only the changed parts. Wrap state in span to avoid replacing parts of words
		let html = this.html_template;
		let has_non_span = false;
		for (let key in this.state) {
			// Check if there are any non-span keys
			if (!has_non_span && html.includes(`{{{${key}}}}`)) {
				has_non_span = true;
			}
			// For keys that can't be wrapped in a span
			html = html.replaceAll(`{{{${key}}}}`, this.state[key]);
			// For keys that can be wrapped in a span
			html = html.replaceAll(`{{${key}}}`, `<span data-key="${key}">${this.state[key]}</span>`);
		}

		// 2. --- Add the component to the DOM if needed
		if (!this.element?.parentElement && parent) {

			// Create the component (Only create if it doesn't exist)
			this.element = this.element || document.createElement('div');
			this.element.setAttribute('id', this.uuid);
			console.log(this.element);
			// Set the innerHTML
			this.element.innerHTML = html;

			// Append or prepend
			if (append) {
				parent.appendChild(this.element);
			} else {
				parent.prepend(this.element);
			}

			// Add event listeners (Handler is a function that returns a new state)
			for (let event of this.events) {
				console.log(event, this.element)
				this.element.addEventListener(event.name, (e) => {
					this.update(event.handler(e, this.state));
				});
			}
		}

		// 3. --- Update the html with the new state (Only update if it has changed)
		// For keys that can't be wrapped in a span 
		if (has_non_span && this.element.innerHTML !== html) {
			this.element.innerHTML = html;
		}
		if (has_non_span) return;

		// For keys that can be wrapped in a span
		for (let key in this.state) {
			if (this.element.querySelector(`[data-key="${key}"]`).innerHTML !== this.state[key]) {
				this.element.querySelector(`[data-key="${key}"]`).innerHTML = this.state[key];
			}
		}
	}

	update(state) {
		// Update the component
		this.state = state || this.state;
		// Render the component
		this.render();
	}
}


/**
 * Class to handle a group of reactive components | Native Javascript
 * 
 * @param {string} parentSelector - The selector of the parent element
 */
class Module {
	constructor(parentSelector) {
		this.components = [];
		this.parentSelector = parentSelector;
		this.parent = document.querySelector(parentSelector);
	}

	// Add a single component
	addComponent(component, append=true) {
		this.components.push(component)
		component.render(this.parent, append);
		return component;
	}

	// Add a list of components
	addComponents(components, append=true) {
		for (let component of components) {
			this.addComponent(component, append);
		}
	}

	// Remove a single component
	removeComponent(component) {
		this.components = this.components.filter(c => c !== component);
		this.parent.removeChild(component.element);
	}

	// Remove a list of components
	removeComponents(components) {
		for (let component of components) {
			this.removeComponent(component);
		}
	}
}

