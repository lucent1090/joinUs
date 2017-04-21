import React from 'react'
import ReactDOM from 'react-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import rootReducer from './reducers/reducers.js'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './app';

injectTapEventPlugin();
let store = createStore(rootReducer);
let unsubscribe = store.subscribe(() => {
	console.log(store.getState())
});

function render (App) {
	ReactDOM.render(
		<Provider store={store}>
			<MuiThemeProvider>
				<App />
			</MuiThemeProvider>
		</Provider>, 
		document.getElementById('main')
	);
}

render(App);