import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../css/HomePage.css";
import { useState } from "react";

export default function HomePage() {

	const [username, setUsername] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	function login() {
		console.log('username', username);
		fetch('login', {
			method: 'GET',
			body: JSON.stringify({
				username
			})
		})
			.then(res => res.json())
			.then(res => {
				console.log('result', res);
			})
			.catch(error => {
				console.log('error', error);
				setErrorMessage(error.message ?? 'Error: no error message.')
			})
	}

	return (
		<div className="home-page">
			<Navbar><h2>Home</h2></Navbar>
			<div className="block d-flex flex-column gap-4 align-items-start">
				<h3 className="m-0">Welcome to the home page!</h3>
				<div className="form-group">
					{/* <div > */}
					<label htmlFor="username-input" className="form-label">
						<span>Username</span>
					</label>
					<input
						id="username-input"
						name="name"
						className={`form-control ${errorMessage && 'is-invalid'}`}
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					{/* </div> */}

					{errorMessage && <span className="invalid-feedback">{errorMessage}</span>}
				</div>
				<button className="btn btn-primary" onClick={login}>Login</button>
				<Link className="btn btn-primary" to="/dash">Dashboard</Link>
			</div>
		</div>
	)
}