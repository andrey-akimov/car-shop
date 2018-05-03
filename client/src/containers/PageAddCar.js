import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import CircularProgress from 'material-ui/CircularProgress'
import axios from 'axios'
import history from '../history'

class PageAddCar extends Component {
	state = {
		loading: false,
		errorSnackbarOpen: false,
		fieldSnackbarOpen: false,
		brandValue: '',
		descriptionValue: '',
		priceValue: '',
		photoValue: ''
	}

	brandFieldHandler = e => {
		this.setState({
			brandValue: e.target.value
		})
	}

	descriptionFieldHandler = e => {
		this.setState({
			descriptionValue: e.target.value
		})
	}

	priceFieldHandler = e => {
		this.setState({
			priceValue: e.target.value
		})
	}

	photoFieldHandler = e => {
		this.setState({
			photoValue: e.target.value
		})
	}

	snackbarHandler = () => {
		this.setState({
			fieldSnackbarOpen: false,
			errorSnackbarOpen: false
		})
	}

	submitHandler = () => {
		if (
			this.state.brandValue.length >= 3 &&
			this.state.descriptionValue.length >= 10 &&
			this.state.priceValue.length >= 3 &&
			!isNaN(+this.state.priceValue)
		) {
			this.setState({ loading: true })
			const image =
				this.state.photoValue.trim() === ''
					? 'https://cdn.bmwblog.com/wp-content/uploads/2017/06/1995-BMW-E34-520i-14.jpg'
					: this.state.photoValue

			axios
				.post('https://cars-shop.herokuapp.com/api', {
					title: this.state.brandValue,
					description: this.state.descriptionValue,
					price: +this.state.priceValue,
					image
				})
				.then(res => {
					this.props.getData()
					history.push('/')
				})
				.catch(err => {
					console.log(err)
				})
		} else {
			this.setState({
				loading: false,
				fieldSnackbarOpen: true
			})
		}
	}

	render() {
		if (this.state.loading) {
			return <CircularProgress size={80} thickness={5} className="spinner" />
		}

		return (
			<div className="container add-car">
				<h1 className="add-car__header">Add a car</h1>
				<TextField
					value={this.state.brandValue}
					onChange={this.brandFieldHandler}
					className="add-car__text-field"
					hintText="Brand*"
				/>
				<TextField
					value={this.state.descriptionValue}
					onChange={this.descriptionFieldHandler}
					className="add-car__text-field"
					hintText="Description*"
					multiLine={true}
					rows={2}
				/>
				<TextField
					value={this.state.priceValue}
					onChange={this.priceFieldHandler}
					className="add-car__text-field"
					hintText="Price*"
				/>
				<TextField
					value={this.state.photoValue}
					onChange={this.photoFieldHandler}
					className="add-car__text-field"
					hintText="Link to the photo"
				/>
				<RaisedButton
					onClick={this.submitHandler}
					className="add-car__btn"
					label="Post an ad"
					primary={true}
				/>
				{/* Snackbar */}
				<Snackbar
					open={this.state.fieldSnackbarOpen}
					message="You must fill out all the fields correctly."
					autoHideDuration={4000}
					onRequestClose={this.snackbarHandler}
					style={{ textAlign: 'center' }}
				/>
				<Snackbar
					open={this.state.errorSnackbarOpen}
					message="Some server error :("
					autoHideDuration={4000}
					onRequestClose={this.snackbarHandler}
					style={{ textAlign: 'center' }}
				/>
			</div>
		)
	}
}

export default PageAddCar
