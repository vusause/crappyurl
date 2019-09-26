import React, { Component } from 'react';
import './App.css';

const server_addr = process.env.REACT_APP_SERVER_ADDR;

class App extends Component {
	constructor(props) {
		super(props);
		this.submitURL = this.submitURL.bind(this);
		this.state = {
			original_url: '',
			redirect_url: '',
		};
	}

	submitURL() {
		console.log(server_addr);
		const options = {
			body: JSON.stringify({ url: this.state.original_url }),
			headers: {'content-type': 'application/json'},
			method: 'POST',
		}

		return fetch(server_addr, options)
			.then(response => response.json(),
				  error => console.log('An error occurred.', error))
			.then((response) => {
				console.log(response);
				this.setState({ redirect_url: response.payload });
			}).catch((err) => {
				console.error(err);
			});
	}

	render() {
		return (
			<div className="App">
				<h1 className="App-title">URL Redirector</h1>
				<p><a href='https://tinyurl.com/'>tinyurl</a> but worse</p>
				<p className="App-intro">
					<input type="text" className="inputURL" onChange={ (e) => { this.setState({ original_url: e.target.value }); } } placeholder="https://example.com" />
					<button className="submitURL" onClick={() => this.submitURL()}>
						Submit URL
					</button>
				</p>
				<a href={`${this.state.redirect_url}`}>{this.state.redirect_url}</a>
			</div>
			);
		}
	}

export default App;
