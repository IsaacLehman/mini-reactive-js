// Author: Isaac Lehman
// ============================================== TESTING ==============================================

// Create a new module
const module = new Module('#app');

// Create a component | Number
const numberComponent = new Component(
	'<h1>Number: <span class="num">{{num}}</span></h1>',
	{
		num: 0
	},
	[
		{
			name: 'click',
			handler: (event, state) => {
				return {
					num: state.num + 1
				};
			}
		}
	]
);

// Add the component to the module
module.addComponent(numberComponent);


// Create a component | Text
const textComponent = new Component(
	'<h1>Text: <span class="text">{{text}}</span></h1>',
	{
		text: 'Say Something!'
	},
	[
		{
			name: 'click',
			handler: (event, state) => {
				return {
					text: 'Hello World!'
				};
			}
		}
	]
);

// Add the component to the module
module.addComponent(textComponent);


// Create a component | Image
const imageComponent = new Component(
	'<img src="{{{src}}}" alt="{{{alt}}}">',
	{
		src: 'https://picsum.photos/200',
		alt: 'Random Image'
	},
	[
		{
			name: 'click',
			handler: (event, state) => {
				return {
					src: `https://picsum.photos/200?random=${Math.random()}`,
					alt: 'Random Image 2'
				};
			}
		}
	]
);

// Add the component to the module
module.addComponent(imageComponent);


// Create a component | Button
const buttonComponent = new Component(
	'<button>{{text}}</button>',
	{
		text: 'Click Me!'
	},
	[
		{
			name: 'click',
			handler: (event, state) => {
				return {
					text: 'Clicked!'
				};
			}
		}
	]
);

// Add the component to the module
module.addComponent(buttonComponent);


// Create a component | Input
const inputComponent = new Component(
	'<label for="input">Input ({{current_value}}):</label> <input id="input" type="text" placeholder="Enter Text...">',
	{
		current_value: 'Type Something!'
	},
	[
		{
			name: 'input', // Update only once the user stops typing
			handler: (event, state) => {
				console.log(event.target.value);
				return {
					current_value: event.target.value
				};
			}
		}
	]
);

// Add the component to the module
module.addComponent(inputComponent);


// ============================================== TESTING ==============================================

// Create a new module
const module2 = new Module('#app2');

// Create a list of components
const components = [
	new Component(
		'<h1>Number: <span class="num">{{num}}</span></h1>', // Template
		{ // State
			num: 0
		},
		[ // Event Listeners
			{
				name: 'click',
				handler: (event, state) => {
					return {
						num: state.num + 1
					}
				}
			}
		]
	),
	new Component(
		'<h1>Text: <span class="text">{{text}}</span></h1>',
		{
			text: 'Say Something!'
		},
		[
			{
				name: 'click',
				handler: (event, state) => {
					return {
						text: 'Hello World!'
					};
				}
			}
		]
	),
];

// Add the components to the module
module2.addComponents(components);


// ============================================== TESTING ==============================================

// Create a new module
const module3 = new Module('#app3');

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
const components2 = [
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
module3.addComponents(components2);
