import React from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import logo from '../img/logo.png'

const Header = props => {
	return (
		<div className="header">
			<div className="container header__container">
				<Link className="header__logo" to="/">
					<img src={logo} alt="logo" />
				</Link>
				<Menu {...props} />
			</div>
		</div>
	)
}

export default Header
