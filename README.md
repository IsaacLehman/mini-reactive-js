# Mini Reactive JS

A Mini Reactive JavaScript Library written in Vanilla JS designed to handle dynamically updating content.

Structure:
- Component: A single, reactive element
- Module: A group of reactive elements

To try this out, clone the repo and double click on the `app.html` file to view it in your favorite browser. 

---

## Basic Usage:

1. Import the code

```html
<script src="./mini-reactive.js"></script>
```

2. Write your general HTML page structure

```html
<div class="app-container">
   <div id="app"></div>
</div>
```

3. Add your modules/components

```js
// Create a new module
const module = new Module('#app');

// Create a list of components dynamically
let general_template = '<h1>{{title}}</h1> <p>{{text}}</p> <input type="text" placeholder="Enter Text..."> <button>{{button_text}}</button>';
let general_state = {
	title: 'Title',
	text: 'Text',
	button_text: 'Button'
};
let general_event_listeners = [
	{
		name: 'click',
		handler: (event, state) => {
			// Check if the button was clicked
			if (event.target.tagName.toLowerCase() === 'button') {
				return {
					title: 'Text Cleared!',
					text: 'Enter something new...',
					button_text: 'Nothing to clear...'
				};
			}
			return {
				title: 'Clicked!',
				text: 'Clicked!',
				button_text: 'Clicked!'
			};
		}
	},
	{
		name: 'input',
		handler: (event, state) => {
			return {
				title: 'Entering Text...',
				text: event.target.value,
				button_text: 'Clear Text'
			};
		}
	}
];

// Create a list of components
const components = [
	new Component(
		general_template,
		general_state,
		general_event_listeners
	),
	new Component(
		general_template,
		general_state,
		general_event_listeners
	),
	new Component(
		general_template,
		general_state,
		general_event_listeners
	),
	new Component(
		general_template,
		general_state,
		general_event_listeners
	)
];

// Add the components to the module
module.addComponents(components);
```

4. Last but not least, load the page to see your reactive content! 
