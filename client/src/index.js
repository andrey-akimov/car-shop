import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router-dom'
import './style.css'
import App from './containers/App'
import history from './history'

render(
	<Router history={history}>
		<App />
	</Router>,
	document.getElementById('app')
)
