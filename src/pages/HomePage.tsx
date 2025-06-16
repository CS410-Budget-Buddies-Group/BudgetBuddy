import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import "../css/HomePage.css";
import { useState } from "react";
import { setGlobalUser, setGlobalUserId } from '../components/globals';

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT_URL;

export default function HomePage() {

	const navigate = useNavigate();


	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [creatingAccount, setCreatingAccount] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	function handleLogin() {
		if (creatingAccount)
			setCreatingAccount(false);
		else
			login();
	}

	function login() {
		setIsLoading(true);
		console.log('username', email);
		fetch(`${apiEndpoint}/api/users/`, {
			method: 'GET',
			// body: JSON.stringify({
			// 	email: email
			// })
		})
			.then(res => res.json())
			.then(users => {
				if (!Array.isArray(users))
					throw new Error('Error: invalid response. No users array.');

				const user = users.filter(user => user.email == email)[0];
				if (typeof user != 'object')
					throw new Error('Error: No user with that email.');

				setGlobalUserId(user.id);
				setGlobalUser(user.name);
				console.log('user', user);
				navigate('dash');
				setIsLoading(false);
			})
			.catch(error => {
				console.log('error', error);
				setErrorMessage(error.message ?? 'Error: no error message.');
				setIsLoading(false);
			})
	}

	function handleCreateAccount() {

		if (creatingAccount)
			createAccount();
		else
			setCreatingAccount(true);
	}

	function createAccount() {
		if (!name) {
			setErrorMessage('Name required.');
		} else if (!email) {
			setErrorMessage('Email required.');
		} else {
			console.log('createAccount', name, email);
			setIsLoading(true);
			fetch(`${apiEndpoint}/api/users/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					"name": name,
					"email": email,
				})
			})
				.then(res => res.json())
				.then(res => {
					console.log('createAccount result', res);
					if (Array.isArray(res.email))
						throw new Error(`Error: ${res.email.join(', ')}`);
					// if (!res.name)
					// 	throw new Error('Error: server could not create name.');
					// if (!res.email)
					// 	throw new Error('Error: server could not create email');

					if (!res.id || !res.email || !res.name)
						throw new Error('Error: invalid server response.');

					setGlobalUserId(res.id);
					setGlobalUser(res.name);
					navigate('dash');
					setIsLoading(false);
				})
				.catch(error => {
					console.log('error', error);
					setErrorMessage(error.message ?? 'Error: no error message.');
					setIsLoading(false);
				})
		}
	}

	return (
		<div className="home-page">
			<Navbar><h2>Home</h2></Navbar>
			<div className="block d-flex flex-column gap-4 align-items-start">
				<h3 className="m-0">Welcome to the home page!</h3>
				{creatingAccount && <div className="form-group">
					{/* <div > */}
					<label htmlFor="username-input" className="form-label">
						<span>Name</span>
					</label>
					<input
						id="username-input"
						name="name"
						className="form-control"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>}
				<div className="form-group">
					<label htmlFor="email-input" className="form-label">
						<span>Email</span>
					</label>
					<input
						id="email-input"
						name="name"
						className={`form-control ${errorMessage && 'is-invalid'}`}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					{errorMessage && <span className="invalid-feedback">{errorMessage}</span>}
				</div>
				<button className="btn btn-primary" disabled={isLoading} onClick={handleLogin}>{isLoading ? 'Logging In' : 'Login'}</button>
				<button className="btn btn-primary" disabled={isLoading} onClick={handleCreateAccount}>{isLoading ? 'Creating Account' : 'Create Account'}</button>
				{/* <Link className="btn btn-primary" to="/dash">Dashboard</Link> */}
			</div>
		</div>
	)
}