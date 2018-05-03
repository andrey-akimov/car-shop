import React from 'react'
import logo from '../img/logo.png'

const Header = () => {
	return (
		<div className="header">
			<div className="container header__container">
				<a className="header__logo" href="/">
					<img src={logo} alt="logo" />
				</a>
			</div>
		</div>
	)
}

export default Header
